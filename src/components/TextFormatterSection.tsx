import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2, Type, Code, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextFormatterSection = () => {
  const [text, setText] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  // Text case transformations
  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toLowerCase = (str: string) => str.toLowerCase();

  const toUpperCase = (str: string) => str.toUpperCase();

  const toCapitalizedCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
  };

  const toTitleCase = (str: string) => {
    const smallWords = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "of"];
    return str
      .toLowerCase()
      .split(" ")
      .map((word, i) => {
        if (i === 0 || !smallWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(" ");
  };

  const toInverseCase = (str: string) => {
    return str
      .split("")
      .map((char) => (char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()))
      .join("");
  };

  const handleCopy = async () => {
    if (!text) {
      toast.error("No text to copy");
      return;
    }
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    if (!text) {
      toast.error("No text to download");
      return;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Text downloaded");
  };

  const handleClear = () => {
    setText("");
    toast.success("Text cleared");
  };

  const applyTransform = (transformFn: (str: string) => string) => {
    setText(transformFn(text));
  };

  // HTML Formatter functions
  const formatHTML = (html: string): string => {
    if (!html.trim()) return "";

    // Self-closing tags
    const selfClosingTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
    
    let formatted = "";
    let indent = 0;
    const indentSize = 2;

    // Normalize the HTML first
    let normalized = html
      .replace(/>\s+</g, "><") // Remove whitespace between tags
      .replace(/\s+/g, " ") // Normalize all whitespace to single spaces
      .trim();

    // Split into tokens (tags and text)
    const tokens = normalized.match(/<[^>]+>|[^<]+/g) || [];

    tokens.forEach((token) => {
      token = token.trim();
      if (!token) return;

      if (token.startsWith("</")) {
        // Closing tag
        indent = Math.max(0, indent - 1);
        formatted += "  ".repeat(indent) + token + "\n";
      } else if (token.startsWith("<")) {
        // Opening tag or self-closing
        const tagMatch = token.match(/<(\w+)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
        const isSelfClosing = selfClosingTags.includes(tagName) || token.endsWith("/>");

        formatted += "  ".repeat(indent) + token + "\n";

        if (!isSelfClosing && !token.startsWith("<!") && !token.startsWith("<?")) {
          indent++;
        }
      } else {
        // Text content
        if (token.trim()) {
          formatted += "  ".repeat(indent) + token.trim() + "\n";
        }
      }
    });

    return formatted.trim();
  };

  const minifyHTML = (html: string): string => {
    if (!html.trim()) return "";
    return html
      .replace(/\s+/g, " ") // Collapse all whitespace to single space
      .replace(/>\s+</g, "><") // Remove whitespace between tags
      .replace(/\s*\/>/g, "/>") // Clean self-closing tags
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .trim();
  };

  const handleFormatHTML = () => {
    if (!htmlInput.trim()) {
      toast.error("Please enter HTML to format");
      return;
    }
    const formatted = formatHTML(htmlInput);
    setHtmlOutput(formatted);
    toast.success("HTML formatted successfully");
  };

  const handleMinifyHTML = () => {
    if (!htmlInput.trim()) {
      toast.error("Please enter HTML to minify");
      return;
    }
    const minified = minifyHTML(htmlInput);
    setHtmlOutput(minified);
    toast.success("HTML minified successfully");
  };

  const handleCopyHTML = async () => {
    if (!htmlOutput) {
      toast.error("No formatted HTML to copy");
      return;
    }
    await navigator.clipboard.writeText(htmlOutput);
    toast.success("Copied to clipboard");
  };

  const handleDownloadHTML = () => {
    if (!htmlOutput) {
      toast.error("No formatted HTML to download");
      return;
    }
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };

  const handleClearHTML = () => {
    setHtmlInput("");
    setHtmlOutput("");
    toast.success("Cleared");
  };

  return (
    <div>
      <SectionHeader
        title="Text & Code Formatter"
        icon={<Type className="h-5 w-5" />}
      />

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="text" className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            Text Case
          </TabsTrigger>
          <TabsTrigger value="html" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            HTML Formatter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
            className="min-h-[150px] font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toSentenceCase)}
              className="text-xs"
            >
              Sentence case
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toLowerCase)}
              className="text-xs"
            >
              lower case
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => applyTransform(toUpperCase)}
              className="text-xs"
            >
              UPPER CASE
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toCapitalizedCase)}
              className="text-xs"
            >
              Capitalized Case
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toAlternatingCase)}
              className="text-xs"
            >
              aLtErNaTiNg cAsE
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toTitleCase)}
              className="text-xs"
            >
              Title Case
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyTransform(toInverseCase)}
              className="text-xs"
            >
              InVeRsE CaSe
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download Text
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy to Clipboard
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClear}
              className="text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Input HTML</label>
              <Textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Paste your HTML code here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Formatted Output</label>
              <Textarea
                value={htmlOutput}
                readOnly
                placeholder="Formatted HTML will appear here..."
                className="min-h-[200px] font-mono text-sm bg-muted/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleFormatHTML}
              className="text-xs"
            >
              <Wand2 className="h-3 w-3 mr-1" />
              Format HTML
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMinifyHTML}
              className="text-xs"
            >
              <Code className="h-3 w-3 mr-1" />
              Minify HTML
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyHTML}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Output
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadHTML}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download HTML
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearHTML}
              className="text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
            <strong>How it works:</strong> The formatter parses your HTML, normalizes whitespace, and applies proper indentation based on tag nesting. Self-closing tags are handled correctly, and all original content and attributes are preserved.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextFormatterSection;
