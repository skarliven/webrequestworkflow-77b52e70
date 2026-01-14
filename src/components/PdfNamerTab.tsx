import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Upload, FileText, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker for version 3.x
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

type DocumentType = "course" | "bulletin";
type ExtractionConfidence = "high" | "medium" | "low";

interface ExtractionResult {
  date: string;
  courseName: string;
  confidence: ExtractionConfidence;
}

const PdfNamerTab = () => {
  const [documentType, setDocumentType] = useState<DocumentType>("course");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedDate, setExtractedDate] = useState("");
  const [extractedCourseName, setExtractedCourseName] = useState("");
  const [bulletinNumber, setBulletinNumber] = useState("");
  const [generatedFilename, setGeneratedFilename] = useState("");
  const [confidence, setConfidence] = useState<ExtractionConfidence | null>(null);
  const [pdfText, setPdfText] = useState("");

  // Convert course name to kebab-case
  const toKebabCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  // Extract text from PDF using PDF.js
  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = "";
    const maxPages = Math.min(pdf.numPages, 5); // Only process first 5 pages for efficiency
    
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }
    
    return fullText.trim();
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setPdfFile(file);
    setGeneratedFilename("");
    setConfidence(null);

    try {
      setIsExtracting(true);
      toast.info("Extracting text from PDF...");
      
      // Extract text from PDF
      const text = await extractTextFromPdf(file);
      setPdfText(text);
      
      if (!text.trim()) {
        toast.error("Could not extract text from PDF. The file may be scanned or image-based.");
        setIsExtracting(false);
        return;
      }

      toast.info("Analyzing document with AI...");
      
      // Call the edge function to analyze the text
      const { data, error } = await supabase.functions.invoke("parse-pdf-filename", {
        body: { pdfText: text, documentType }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to analyze document");
      }

      const result = data as ExtractionResult;
      
      setExtractedDate(result.date);
      setExtractedCourseName(result.courseName);
      setConfidence(result.confidence);
      
      // Auto-generate filename
      generateFilename(result.date, result.courseName, documentType, "");
      
      toast.success("Document analyzed successfully!");
      
    } catch (err: any) {
      console.error("Error processing PDF:", err);
      toast.error(err.message || "Failed to process PDF");
    } finally {
      setIsExtracting(false);
    }
  }, [documentType]);

  // Generate filename based on document type
  const generateFilename = (date: string, courseName: string, type: DocumentType, bulletinNum: string) => {
    if (type === "course") {
      if (!date || !courseName) return;
      const kebabName = toKebabCase(courseName);
      const filename = `${date}_${kebabName}.pdf`;
      setGeneratedFilename(filename);
    } else {
      // Bulletin format: YYYY-XX.pdf
      if (!date) return;
      const year = date.split("-")[0];
      const num = bulletinNum.padStart(2, "0");
      const filename = `${year}-${num}.pdf`;
      setGeneratedFilename(filename);
    }
  };

  // Handle manual regeneration
  const handleRegenerate = () => {
    if (documentType === "course") {
      generateFilename(extractedDate, extractedCourseName, documentType, "");
    } else {
      generateFilename(extractedDate, "", documentType, bulletinNumber);
    }
  };

  // Copy filename to clipboard
  const handleCopyFilename = async () => {
    if (!generatedFilename) {
      toast.error("No filename to copy");
      return;
    }
    await navigator.clipboard.writeText(generatedFilename);
    toast.success("Filename copied to clipboard!");
  };

  // Get confidence badge color
  const getConfidenceBadge = () => {
    if (!confidence) return null;
    
    const colors = {
      high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    
    const icons = {
      high: <CheckCircle2 className="h-3 w-3" />,
      medium: <AlertCircle className="h-3 w-3" />,
      low: <AlertCircle className="h-3 w-3" />
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[confidence]}`}>
        {icons[confidence]}
        {confidence} confidence
      </span>
    );
  };

  // Clear all
  const handleClear = () => {
    setPdfFile(null);
    setPdfText("");
    setExtractedDate("");
    setExtractedCourseName("");
    setBulletinNumber("");
    setGeneratedFilename("");
    setConfidence(null);
    // Reset file input
    const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    toast.success("Cleared");
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
        <p className="font-medium mb-1">PDF Filename Generator</p>
        <p className="text-muted-foreground text-xs">
          Upload a PDF and this tool will use AI to extract the date and course name, 
          then generate a standardized filename following the naming convention.
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Document Type</Label>
        <RadioGroup
          value={documentType}
          onValueChange={(value) => {
            setDocumentType(value as DocumentType);
            setGeneratedFilename("");
          }}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="course" id="course" />
            <Label htmlFor="course" className="text-sm cursor-pointer">
              Course/Training
              <span className="block text-xs text-muted-foreground">Format: YYYY-MM-DD_course-name.pdf</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bulletin" id="bulletin" />
            <Label htmlFor="bulletin" className="text-sm cursor-pointer">
              Bulletin
              <span className="block text-xs text-muted-foreground">Format: YYYY-XX.pdf</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="pdf-upload" className="text-sm font-medium">Upload PDF</Label>
        <div className="relative">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            disabled={isExtracting}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isExtracting ? "bg-muted/50 border-muted" : "hover:border-primary/50 hover:bg-muted/30"
          }`}>
            {isExtracting ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Analyzing document...</p>
              </div>
            ) : pdfFile ? (
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium">{pdfFile.name}</p>
                <p className="text-xs text-muted-foreground">Click to upload a different file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click or drag to upload PDF</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Data Display (for courses) */}
      {documentType === "course" && (extractedDate || extractedCourseName) && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Extracted Data
            </h4>
            {getConfidenceBadge()}
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="extracted-date" className="text-xs text-muted-foreground">Date</Label>
              <Input
                id="extracted-date"
                type="date"
                value={extractedDate}
                onChange={(e) => {
                  setExtractedDate(e.target.value);
                  generateFilename(e.target.value, extractedCourseName, documentType, "");
                }}
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="extracted-name" className="text-xs text-muted-foreground">Course Name</Label>
              <Input
                id="extracted-name"
                type="text"
                value={extractedCourseName}
                onChange={(e) => {
                  setExtractedCourseName(e.target.value);
                  generateFilename(extractedDate, e.target.value, documentType, "");
                }}
                placeholder="Course name"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bulletin Number Input */}
      {documentType === "bulletin" && extractedDate && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="bulletin-year" className="text-xs text-muted-foreground">Year</Label>
              <Input
                id="bulletin-year"
                type="text"
                value={extractedDate.split("-")[0]}
                onChange={(e) => {
                  const newDate = `${e.target.value}-01-01`;
                  setExtractedDate(newDate);
                  generateFilename(newDate, "", documentType, bulletinNumber);
                }}
                placeholder="YYYY"
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bulletin-number" className="text-xs text-muted-foreground">Bulletin Number</Label>
              <Input
                id="bulletin-number"
                type="number"
                min="1"
                max="99"
                value={bulletinNumber}
                onChange={(e) => {
                  const num = e.target.value;
                  setBulletinNumber(num);
                  generateFilename(extractedDate, "", documentType, num);
                }}
                placeholder="XX"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Generated Filename Display */}
      {generatedFilename && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generated Filename</Label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-primary/10 border border-primary/20 rounded-lg font-mono text-sm break-all">
              {generatedFilename}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleCopyFilename}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleRegenerate}
          disabled={!extractedDate}
          className="text-xs"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          Regenerate
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyFilename}
          disabled={!generatedFilename}
          className="text-xs"
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy Filename
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClear}
          className="text-xs"
        >
          Clear
        </Button>
      </div>

      {/* PDF Text Preview (collapsible) */}
      {pdfText && (
        <details className="text-xs">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
            View extracted text ({pdfText.length} characters)
          </summary>
          <pre className="mt-2 p-2 bg-muted/50 rounded text-xs max-h-32 overflow-auto whitespace-pre-wrap">
            {pdfText.substring(0, 2000)}
            {pdfText.length > 2000 && "..."}
          </pre>
        </details>
      )}
    </div>
  );
};

export default PdfNamerTab;
