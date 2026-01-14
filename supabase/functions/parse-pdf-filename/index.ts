import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfText, documentType } = await req.json();
    
    if (!pdfText || typeof pdfText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'PDF text content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing PDF text, length:', pdfText.length, 'type:', documentType);

    // Use AI to extract date and course name from the PDF text
    const systemPrompt = `You are a document analyzer that extracts specific information from PDF text content.
Your task is to extract:
1. A date mentioned in the document (training date, event date, meeting date, etc.)
2. The course/training name or document title

Respond ONLY with a valid JSON object in this exact format:
{
  "date": "YYYY-MM-DD",
  "courseName": "name of the course or training",
  "confidence": "high" | "medium" | "low"
}

Rules:
- For dates: Look for dates in any format (MM/DD/YYYY, Month Day, Year, etc.) and convert to YYYY-MM-DD
- If multiple dates are found, prefer dates that seem to be the main event/training date
- If no date is found, use today's date and set confidence to "low"
- For course names: Extract the main course/training/document title
- Clean up the course name: remove extra spaces, normalize capitalization
- If the document type is "bulletin", just extract the date
- Keep the course name concise but descriptive`;

    const userPrompt = `Extract the date and ${documentType === 'course' ? 'course name' : 'document info'} from this document text:

---
${pdfText.substring(0, 8000)}
---`;

    console.log('Calling AI gateway for extraction');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to analyze document' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    console.log('AI response:', content);

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from AI
    let extractedData;
    try {
      // Try to find JSON in the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to defaults
      const today = new Date().toISOString().split('T')[0];
      extractedData = {
        date: today,
        courseName: 'Untitled Document',
        confidence: 'low'
      };
    }

    console.log('Extracted data:', extractedData);

    return new Response(
      JSON.stringify({
        date: extractedData.date || new Date().toISOString().split('T')[0],
        courseName: extractedData.courseName || 'Untitled Document',
        confidence: extractedData.confidence || 'low'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in parse-pdf-filename:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
