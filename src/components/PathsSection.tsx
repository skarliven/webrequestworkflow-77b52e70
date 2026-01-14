import { FolderOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const paths = [
  { name: "Certification Actions", path: "/Portals/0/post_docs/Certification_Actions/" },
  { name: "Determination Notices", path: "/Portals/0/post_docs/Certification_Actions/Determination_Notices/" },
  { name: "Pleadings Orders", path: "/Portals/0/post_docs/Certification_Actions/Pleadings_Orders/" },
  { name: "Revocation Orders", path: "/Portals/0/post_docs/Certification_Actions/Revocation_Orders/" },
  { name: "Statement of Findings", path: "/Portals/0/post_docs/Certification_Actions/Statement_of_Findings/" },
  { name: "Suspension Orders", path: "/Portals/0/post_docs/Certification_Actions/Suspension_Orders/" },
  { name: "Commission Meetings", path: "/Portals/0/post_docs/commissionmeetings/2025/xx.pdf" },
  { name: "POST Docs Root", path: "/Portals/0/post_docs/" },
  { name: "Documents Root", path: "/Portals/0/Documents/" },
  { name: "Images Root", path: "/Portals/0/Images/" },
  { name: "Resources", path: "/Portals/0/Resources/" },
];

interface PathsSectionProps {
  searchQuery?: string;
}

export const PathsSection = ({ searchQuery = "" }: PathsSectionProps) => {
  const filteredPaths = paths.filter((item) => {
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query) || item.path.toLowerCase().includes(query);
  });

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <SectionHeader title="Source Paths" icon={<FolderOpen className="h-5 w-5" />} count={filteredPaths.length} />
      {filteredPaths.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No paths found matching "{searchQuery}"</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredPaths.map((item) => (
            <TemplateCard 
              key={item.name} 
              title={item.name} 
              code={item.path}
              description="File path reference"
            />
          ))}
        </div>
      )}
    </section>
  );
};
