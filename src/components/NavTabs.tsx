import { Code2, Sparkles, FolderOpen, Mail, CheckCircle, LayoutGrid, Type } from "lucide-react";

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "code", label: "Code", icon: Code2 },
  { id: "icons", label: "Icons", icon: Sparkles },
  { id: "paths", label: "Paths", icon: FolderOpen },
  { id: "email", label: "Email", icon: Mail },
  { id: "pass", label: "PASS", icon: CheckCircle },
  { id: "modules", label: "Modules", icon: LayoutGrid },
  { id: "text", label: "Text", icon: Type },
];

export const NavTabs = ({ activeTab, onTabChange }: NavTabsProps) => {
  return (
    <nav className="flex gap-1 p-1 bg-card rounded-lg border border-border/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
