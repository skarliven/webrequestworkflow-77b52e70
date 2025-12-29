import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2, Type } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";

const TextFormatterSection = () => {
  const [text, setText] = useState("");

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

  return (
    <div>
      <SectionHeader
        title="Text Formatter"
        icon={<Type className="h-5 w-5" />}
      />

      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default TextFormatterSection;
