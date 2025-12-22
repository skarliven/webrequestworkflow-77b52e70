import { FolderOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const paths = [
  { name: "Certification Actions", path: "/Portals/0/post_docs/Certification_Actions/" },
  { name: "POST Docs Root", path: "/Portals/0/post_docs/" },
  { name: "Documents Root", path: "/Portals/0/Documents/" },
  { name: "Images Root", path: "/Portals/0/Images/" },
  { name: "Resources", path: "/Portals/0/Resources/" },
];

export const PathsSection = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <SectionHeader title="Source Paths" icon={<FolderOpen className="h-5 w-5" />} count={paths.length} />
      <div className="grid grid-cols-1 gap-3">
        {paths.map((item) => (
          <TemplateCard 
            key={item.name} 
            title={item.name} 
            code={item.path}
            description="File path reference"
          />
        ))}
      </div>
    </section>
  );
};
