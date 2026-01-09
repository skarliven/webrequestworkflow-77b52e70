import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2, Type, Code, Wand2, Palette, Braces, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextFormatterSection = () => {
  const [text, setText] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [cssOutput, setCssOutput] = useState("");
  const [jsInput, setJsInput] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [iconFixInput, setIconFixInput] = useState("");
  const [iconFixOutput, setIconFixOutput] = useState("");
  const [iconFixCount, setIconFixCount] = useState(0);

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
    return str.split("").map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase())).join("");
  };

  const toTitleCase = (str: string) => {
    const smallWords = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "of"];
    return str.toLowerCase().split(" ").map((word, i) => {
      if (i === 0 || !smallWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    }).join(" ");
  };

  const toInverseCase = (str: string) => {
    return str.split("").map((char) => (char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase())).join("");
  };

  const handleCopy = async () => {
    if (!text) { toast.error("No text to copy"); return; }
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    if (!text) { toast.error("No text to download"); return; }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Text downloaded");
  };

  const handleClear = () => { setText(""); toast.success("Text cleared"); };
  const applyTransform = (transformFn: (str: string) => string) => { setText(transformFn(text)); };

  // HTML Formatter
  const formatHTML = (html: string): string => {
    if (!html.trim()) return "";
    const selfClosingTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
    let formatted = "";
    let indent = 0;
    let normalized = html.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
    const tokens = normalized.match(/<[^>]+>|[^<]+/g) || [];
    tokens.forEach((token) => {
      token = token.trim();
      if (!token) return;
      if (token.startsWith("</")) {
        indent = Math.max(0, indent - 1);
        formatted += "  ".repeat(indent) + token + "\n";
      } else if (token.startsWith("<")) {
        const tagMatch = token.match(/<(\w+)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
        const isSelfClosing = selfClosingTags.includes(tagName) || token.endsWith("/>");
        formatted += "  ".repeat(indent) + token + "\n";
        if (!isSelfClosing && !token.startsWith("<!") && !token.startsWith("<?")) indent++;
      } else {
        if (token.trim()) formatted += "  ".repeat(indent) + token.trim() + "\n";
      }
    });
    return formatted.trim();
  };

  const minifyHTML = (html: string): string => {
    if (!html.trim()) return "";
    return html.replace(/\s+/g, " ").replace(/>\s+</g, "><").replace(/\s*\/>/g, "/>").replace(/<!--[\s\S]*?-->/g, "").trim();
  };

  const handleFormatHTML = () => {
    if (!htmlInput.trim()) { toast.error("Please enter HTML to format"); return; }
    setHtmlOutput(formatHTML(htmlInput));
    toast.success("HTML formatted");
  };

  const handleMinifyHTML = () => {
    if (!htmlInput.trim()) { toast.error("Please enter HTML to minify"); return; }
    setHtmlOutput(minifyHTML(htmlInput));
    toast.success("HTML minified");
  };

  const handleCopyHTML = async () => {
    if (!htmlOutput) { toast.error("No formatted HTML to copy"); return; }
    await navigator.clipboard.writeText(htmlOutput);
    toast.success("Copied to clipboard");
  };

  const handleDownloadHTML = () => {
    if (!htmlOutput) { toast.error("No formatted HTML to download"); return; }
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };

  const handleClearHTML = () => { setHtmlInput(""); setHtmlOutput(""); toast.success("Cleared"); };

  // CSS Formatter
  const formatCSS = (css: string): string => {
    if (!css.trim()) return "";
    let formatted = css
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/\s*}\s*/g, "\n}\n\n")
      .replace(/;\s*/g, ";\n  ")
      .replace(/,\s*/g, ",\n")
      .replace(/\n\s*\n/g, "\n")
      .replace(/  \n}/g, "\n}")
      .trim();
    return formatted;
  };

  const minifyCSS = (css: string): string => {
    if (!css.trim()) return "";
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*;\s*/g, ";")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",")
      .trim();
  };

  const handleFormatCSS = () => {
    if (!cssInput.trim()) { toast.error("Please enter CSS to format"); return; }
    setCssOutput(formatCSS(cssInput));
    toast.success("CSS formatted");
  };

  const handleMinifyCSS = () => {
    if (!cssInput.trim()) { toast.error("Please enter CSS to minify"); return; }
    setCssOutput(minifyCSS(cssInput));
    toast.success("CSS minified");
  };

  const handleCopyCSS = async () => {
    if (!cssOutput) { toast.error("No formatted CSS to copy"); return; }
    await navigator.clipboard.writeText(cssOutput);
    toast.success("Copied to clipboard");
  };

  const handleDownloadCSS = () => {
    if (!cssOutput) { toast.error("No formatted CSS to download"); return; }
    const blob = new Blob([cssOutput], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.css";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSS downloaded");
  };

  const handleClearCSS = () => { setCssInput(""); setCssOutput(""); toast.success("Cleared"); };

  // JavaScript Formatter
  const formatJS = (js: string): string => {
    if (!js.trim()) return "";
    let formatted = js
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/;\s*/g, ";\n  ")
      .replace(/,\s*/g, ", ")
      .replace(/\n\s*\n/g, "\n")
      .replace(/  \n}/g, "\n}")
      .replace(/\(\s*/g, "(")
      .replace(/\s*\)/g, ")")
      .trim();
    return formatted;
  };

  const minifyJS = (js: string): string => {
    if (!js.trim()) return "";
    return js
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*;\s*/g, ";")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",")
      .replace(/\s*=\s*/g, "=")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .trim();
  };

  const handleFormatJS = () => {
    if (!jsInput.trim()) { toast.error("Please enter JavaScript to format"); return; }
    setJsOutput(formatJS(jsInput));
    toast.success("JavaScript formatted");
  };

  const handleMinifyJS = () => {
    if (!jsInput.trim()) { toast.error("Please enter JavaScript to minify"); return; }
    setJsOutput(minifyJS(jsInput));
    toast.success("JavaScript minified");
  };

  const handleCopyJS = async () => {
    if (!jsOutput) { toast.error("No formatted JavaScript to copy"); return; }
    await navigator.clipboard.writeText(jsOutput);
    toast.success("Copied to clipboard");
  };

  const handleDownloadJS = () => {
    if (!jsOutput) { toast.error("No formatted JavaScript to download"); return; }
    const blob = new Blob([jsOutput], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.js";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JavaScript downloaded");
  };

  const handleClearJS = () => { setJsInput(""); setJsOutput(""); toast.success("Cleared"); };

  // Bulk Icon Fix - adds zero-width space to empty icon spans and spans with only whitespace
  const fixIconSpans = (html: string): { fixed: string; count: number } => {
    if (!html.trim()) return { fixed: "", count: 0 };
    let count = 0;
    
    // Match spans with icon classes that are empty or contain only whitespace
    const fixed = html.replace(
      /<span([^>]*class="[^"]*(?:ca-gov-icon-|external-link-icon|icon-)[^"]*"[^>]*)>(\s*)<\/span>/gi,
      (match, attributes, content) => {
        // Only fix if empty or whitespace-only (doesn't already have &#8203;)
        if (!content.includes('&#8203;') && !content.includes('\u200B')) {
          count++;
          return `<span${attributes}>&#8203;</span>`;
        }
        return match;
      }
    );
    return { fixed, count };
  };

  const handleFixIcons = () => {
    if (!iconFixInput.trim()) { toast.error("Please enter HTML with icon spans"); return; }
    const { fixed, count } = fixIconSpans(iconFixInput);
    setIconFixOutput(fixed);
    setIconFixCount(count);
    if (count > 0) {
      toast.success(`Fixed ${count} empty icon span${count > 1 ? "s" : ""}`);
    } else {
      toast.info("No empty icon spans found to fix");
    }
  };

  const handleCopyIconFix = async () => {
    if (!iconFixOutput) { toast.error("No fixed HTML to copy"); return; }
    await navigator.clipboard.writeText(iconFixOutput);
    toast.success("Copied to clipboard");
  };

  const handleDownloadIconFix = () => {
    if (!iconFixOutput) { toast.error("No fixed HTML to download"); return; }
    const blob = new Blob([iconFixOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fixed-icons.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };

  const handleClearIconFix = () => { 
    setIconFixInput(""); 
    setIconFixOutput(""); 
    setIconFixCount(0);
    toast.success("Cleared"); 
  };

  return (
    <div>
      <SectionHeader title="Text & Code Formatter" icon={<Type className="h-5 w-5" />} />

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="mb-4 flex-wrap h-auto">
          <TabsTrigger value="text" className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            Text Case
          </TabsTrigger>
          <TabsTrigger value="html" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            CSS
          </TabsTrigger>
          <TabsTrigger value="js" className="flex items-center gap-1">
            <Braces className="h-4 w-4" />
            JavaScript
          </TabsTrigger>
          <TabsTrigger value="iconfix" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Icon Fix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter or paste your text here..." className="min-h-[150px] font-mono text-sm" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => applyTransform(toSentenceCase)} className="text-xs">Sentence case</Button>
            <Button variant="outline" size="sm" onClick={() => applyTransform(toLowerCase)} className="text-xs">lower case</Button>
            <Button variant="default" size="sm" onClick={() => applyTransform(toUpperCase)} className="text-xs">UPPER CASE</Button>
            <Button variant="outline" size="sm" onClick={() => applyTransform(toCapitalizedCase)} className="text-xs">Capitalized Case</Button>
            <Button variant="outline" size="sm" onClick={() => applyTransform(toAlternatingCase)} className="text-xs">aLtErNaTiNg cAsE</Button>
            <Button variant="outline" size="sm" onClick={() => applyTransform(toTitleCase)} className="text-xs">Title Case</Button>
            <Button variant="outline" size="sm" onClick={() => applyTransform(toInverseCase)} className="text-xs">InVeRsE CaSe</Button>
            <Button variant="secondary" size="sm" onClick={handleDownload} className="text-xs"><Download className="h-3 w-3 mr-1" />Download</Button>
            <Button variant="secondary" size="sm" onClick={handleCopy} className="text-xs"><Copy className="h-3 w-3 mr-1" />Copy</Button>
            <Button variant="destructive" size="sm" onClick={handleClear} className="text-xs"><Trash2 className="h-3 w-3 mr-1" />Clear</Button>
          </div>
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Input HTML</label>
              <Textarea value={htmlInput} onChange={(e) => setHtmlInput(e.target.value)} placeholder="Paste your HTML code here..." className="min-h-[200px] font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Output</label>
              <Textarea value={htmlOutput} readOnly placeholder="Formatted HTML will appear here..." className="min-h-[200px] font-mono text-sm bg-muted/50" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={handleFormatHTML} className="text-xs"><Wand2 className="h-3 w-3 mr-1" />Format</Button>
            <Button variant="outline" size="sm" onClick={handleMinifyHTML} className="text-xs"><Code className="h-3 w-3 mr-1" />Minify</Button>
            <Button variant="secondary" size="sm" onClick={handleCopyHTML} className="text-xs"><Copy className="h-3 w-3 mr-1" />Copy</Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadHTML} className="text-xs"><Download className="h-3 w-3 mr-1" />Download</Button>
            <Button variant="destructive" size="sm" onClick={handleClearHTML} className="text-xs"><Trash2 className="h-3 w-3 mr-1" />Clear</Button>
          </div>
        </TabsContent>

        <TabsContent value="css" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Input CSS</label>
              <Textarea value={cssInput} onChange={(e) => setCssInput(e.target.value)} placeholder="Paste your CSS code here..." className="min-h-[200px] font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Output</label>
              <Textarea value={cssOutput} readOnly placeholder="Formatted CSS will appear here..." className="min-h-[200px] font-mono text-sm bg-muted/50" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={handleFormatCSS} className="text-xs"><Wand2 className="h-3 w-3 mr-1" />Format</Button>
            <Button variant="outline" size="sm" onClick={handleMinifyCSS} className="text-xs"><Code className="h-3 w-3 mr-1" />Minify</Button>
            <Button variant="secondary" size="sm" onClick={handleCopyCSS} className="text-xs"><Copy className="h-3 w-3 mr-1" />Copy</Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadCSS} className="text-xs"><Download className="h-3 w-3 mr-1" />Download</Button>
            <Button variant="destructive" size="sm" onClick={handleClearCSS} className="text-xs"><Trash2 className="h-3 w-3 mr-1" />Clear</Button>
          </div>
        </TabsContent>

        <TabsContent value="js" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Input JavaScript</label>
              <Textarea value={jsInput} onChange={(e) => setJsInput(e.target.value)} placeholder="Paste your JavaScript code here..." className="min-h-[200px] font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Output</label>
              <Textarea value={jsOutput} readOnly placeholder="Formatted JavaScript will appear here..." className="min-h-[200px] font-mono text-sm bg-muted/50" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={handleFormatJS} className="text-xs"><Wand2 className="h-3 w-3 mr-1" />Format</Button>
            <Button variant="outline" size="sm" onClick={handleMinifyJS} className="text-xs"><Code className="h-3 w-3 mr-1" />Minify</Button>
            <Button variant="secondary" size="sm" onClick={handleCopyJS} className="text-xs"><Copy className="h-3 w-3 mr-1" />Copy</Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadJS} className="text-xs"><Download className="h-3 w-3 mr-1" />Download</Button>
            <Button variant="destructive" size="sm" onClick={handleClearJS} className="text-xs"><Trash2 className="h-3 w-3 mr-1" />Clear</Button>
          </div>
        </TabsContent>

        <TabsContent value="iconfix" className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
            <p className="font-medium mb-1">Bulk Icon Fix for DNN Classic Editor</p>
            <p className="text-muted-foreground text-xs">
              Paste HTML containing empty icon spans (e.g., <code className="bg-background px-1 rounded">&lt;span class="ca-gov-icon-..."&gt;&lt;/span&gt;</code>). 
              This tool adds a zero-width space character (<code className="bg-background px-1 rounded">&amp;#8203;</code>) to prevent the DNN editor from removing them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Input HTML</label>
              <Textarea value={iconFixInput} onChange={(e) => setIconFixInput(e.target.value)} placeholder="Paste HTML with empty icon spans here..." className="min-h-[200px] font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">Fixed Output</label>
                {iconFixCount > 0 && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {iconFixCount} icon{iconFixCount > 1 ? "s" : ""} fixed
                  </span>
                )}
              </div>
              <Textarea value={iconFixOutput} readOnly placeholder="Fixed HTML will appear here..." className="min-h-[200px] font-mono text-sm bg-muted/50" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={handleFixIcons} className="text-xs"><Sparkles className="h-3 w-3 mr-1" />Fix Icons</Button>
            <Button variant="secondary" size="sm" onClick={handleCopyIconFix} className="text-xs"><Copy className="h-3 w-3 mr-1" />Copy</Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadIconFix} className="text-xs"><Download className="h-3 w-3 mr-1" />Download</Button>
            <Button variant="destructive" size="sm" onClick={handleClearIconFix} className="text-xs"><Trash2 className="h-3 w-3 mr-1" />Clear</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextFormatterSection;
