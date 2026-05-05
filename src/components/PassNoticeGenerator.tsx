import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

export const PassNoticeGenerator = () => {
  const [pdfName, setPdfName] = useState("");
  const [linkText, setLinkText] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [location, setLocation] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date>();

  const cleanPdf = useMemo(() => {
    let n = pdfName.trim();
    if (!n) return "year-month-day_xx.pdf";
    if (!n.toLowerCase().endsWith(".pdf")) n += ".pdf";
    return n;
  }, [pdfName]);

  const generated = useMemo(() => {
    const link = linkText.trim() || "Lorem text";
    const date = courseDate.trim() || "Month xx, 2026";
    const loc = location.trim() || "XXxxx, CA";
    const expLine = expirationDate
      ? `\n\n<!-- Expiration Date: ${format(expirationDate, "MM/dd/yyyy")} -->`
      : "";
    return `<h2><a href="https://post.ca.gov/Portals/0/post_docs/PASS_Notices/${cleanPdf}" target="_blank">${link}</a></h2>

<p>Course will be held ${date} in ${loc}</p>${expLine}`;
  }, [cleanPdf, linkText, courseDate, location, expirationDate]);

  return (
    <div className="bg-card-gradient rounded-lg border border-border/50 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium text-foreground text-sm">PASS Notice Generator</h3>
          <p className="text-xs text-muted-foreground">Fill in the fields to generate the HTML code</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="pdf-name" className="text-xs">PDF File Name</Label>
          <Input
            id="pdf-name"
            placeholder="2026-04-10_Post-Evaluators.pdf"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            className="font-mono text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="link-text" className="text-xs">Link Text (Title)</Label>
          <Input
            id="link-text"
            placeholder="POST Evaluators Course"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="course-date" className="text-xs">Course Date</Label>
          <Input
            id="course-date"
            placeholder="April 10, 2026"
            value={courseDate}
            onChange={(e) => setCourseDate(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs">Location</Label>
          <Input
            id="location"
            placeholder="Bell Gardens, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label className="text-xs">Expiration Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-xs",
                  !expirationDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expirationDate ? format(expirationDate, "PPP") : <span>Pick expiration date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={expirationDate}
                onSelect={setExpirationDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-md bg-background/50 p-3 border border-border/30 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-mono">Generated HTML</span>
          <CopyButton text={generated} label="Generated PASS notice" />
        </div>
        <code className="text-xs text-primary/90 whitespace-pre-wrap break-all block">
          {generated}
        </code>
      </div>
    </div>
  );
};
