import { ReactNode, useState } from "react";
import { CopyButton } from "./CopyButton";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TemplateCardProps {
  title: string;
  code: string;
  icon?: ReactNode;
  description?: string;
}

export const TemplateCard = ({ title, code, icon, description }: TemplateCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-card-gradient rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 h-8 w-8 rounded-md bg-accent/10 flex items-center justify-center text-accent">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground text-sm truncate">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
            )}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <CopyButton text={code} label={title} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="code-block overflow-x-auto rounded-md bg-background/50 p-3 border border-border/30">
            <code className="text-xs text-primary/90 whitespace-pre-wrap break-all">
              {code}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
