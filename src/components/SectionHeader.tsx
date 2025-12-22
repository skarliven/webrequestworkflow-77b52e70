import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  count?: number;
}

export const SectionHeader = ({ title, icon, count }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary glow-primary">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground">{count} items</span>
        )}
      </div>
    </div>
  );
};
