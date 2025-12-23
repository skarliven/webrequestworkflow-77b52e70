import { TemplateCard } from "./TemplateCard";
import { SectionHeader } from "./SectionHeader";
import { LayoutGrid } from "lucide-react";

const ModulesIcon = <LayoutGrid className="h-5 w-5" />;

const modules = [
  {
    title: "Management Team Module",
    description: "Leadership team member profile card with image and bio",
    code: `<div class="float-md-start me-3">
  <img
    alt="Robert Tripp"
    src="/portals/0/post_images/Leadership Team/Robert_Tripp_mgr.jpg"
    style="width: 175px; height: auto;"
    title="Robert Tripp"
    unselectable="on"
  />
</div>
<h3 class="mb-0">Robert Tripp</h3>
<h4 class="mt-0">
  Bureau Chief<br>
  Compliance Audit and Accountability Bureau
</h4>
<p>
  Lorem
</p>
<p>
  Lorem
</p>`,
  },
];

interface ModulesSectionProps {
  searchQuery?: string;
}

export const ModulesSection = ({ searchQuery = "" }: ModulesSectionProps) => {
  const filteredModules = modules.filter((module) => {
    const query = searchQuery.toLowerCase();
    return (
      module.title.toLowerCase().includes(query) ||
      module.description?.toLowerCase().includes(query) ||
      module.code.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Modules"
        icon={ModulesIcon}
        count={filteredModules.length}
      />
      {filteredModules.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No modules found matching "{searchQuery}"</p>
      ) : (
        <div className="grid gap-4">
          {filteredModules.map((module, index) => (
            <TemplateCard
              key={index}
              title={module.title}
              code={module.code}
              description={module.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
