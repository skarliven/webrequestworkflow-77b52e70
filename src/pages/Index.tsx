import { useState } from "react";
import { Terminal } from "lucide-react";
import { NavTabs } from "@/components/NavTabs";
import { CodeTemplatesSection } from "@/components/CodeTemplatesSection";
import { IconsSection } from "@/components/IconsSection";
import { PathsSection } from "@/components/PathsSection";
import { EmailTemplatesSection } from "@/components/EmailTemplatesSection";
import { PassNoticesSection } from "@/components/PassNoticesSection";
import { ModulesSection } from "@/components/ModulesSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("code");

  const renderContent = () => {
    switch (activeTab) {
      case "code":
        return <CodeTemplatesSection />;
      case "icons":
        return <IconsSection />;
      case "paths":
        return <PathsSection />;
      case "email":
        return <EmailTemplatesSection />;
      case "pass":
        return <PassNoticesSection />;
      case "modules":
        return <ModulesSection />;
      default:
        return <CodeTemplatesSection />;
    }
  };

  return (
    <div className="min-h-screen bg-terminal relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center animate-glow border border-primary/30">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient-primary font-mono">
                WorkflowHub
              </h1>
              <p className="text-muted-foreground text-sm">
                Templates • Icons • Paths • Email • PASS Notices
              </p>
            </div>
          </div>
          
          {/* Status bar */}
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              System Online
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Ready to copy</span>
          </div>
        </header>

        {/* Navigation */}
        <div className="mb-8">
          <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="space-y-6">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">$</span> Quick access to your workflow templates
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
