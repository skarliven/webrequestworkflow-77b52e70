import { ReactNode } from "react";
import { CopyButton } from "./CopyButton";

interface TemplateCardProps {
  title: string;
  code: string;
  icon?: ReactNode;
  description?: string;
}

export const TemplateCard = ({ title, code, icon, description }: TemplateCardProps) => {
  return (
    <div className="group relative bg-card-gradient rounded-lg border border-border/50 p-4 hover:border-primary/50 transition-all duration-300 hover:glow-primary">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex-shrink-0 h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-medium text-foreground text-sm">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <CopyButton text={code} label={title} />
      </div>
      <div className="mt-3 code-block overflow-x-auto">
        <code className="text-xs text-primary/90 whitespace-pre-wrap break-all">
          {code}
        </code>
      </div>
    </div>
  );
};
