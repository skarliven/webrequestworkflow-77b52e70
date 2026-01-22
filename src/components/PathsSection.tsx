import { FolderOpen, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PathItem {
  name: string;
  path: string;
}

interface PathGroup {
  groupName: string;
  paths: PathItem[];
}

const pathGroups: PathGroup[] = [
  {
    groupName: "Certification Actions",
    paths: [
      { name: "Certification Actions (Root)", path: "/Portals/0/post_docs/Certification_Actions/" },
      { name: "Determination Notices", path: "/Portals/0/post_docs/Certification_Actions/Determination_Notices/" },
      { name: "Pleadings Orders", path: "/Portals/0/post_docs/Certification_Actions/Pleadings_Orders/" },
      { name: "Revocation Orders", path: "/Portals/0/post_docs/Certification_Actions/Revocation_Orders/" },
      { name: "Statement of Findings", path: "/Portals/0/post_docs/Certification_Actions/Statement_of_Findings/" },
      { name: "Suspension Orders", path: "/Portals/0/post_docs/Certification_Actions/Suspension_Orders/" },
    ],
  },
  {
    groupName: "Publications",
    paths: [
      { name: "Commission Meetings", path: "/Portals/0/post_docs/commissionmeetings/2025/xx.pdf" },
      { name: "Regulation Notices", path: "/Portals/0/post_docs/regulationnotices/2026/XX.pdf" },
      { name: "Bulletin", path: "/Portals/0/post_docs/bulletin/2026-xx.pdf" },
    ],
  },
  {
    groupName: "Root Directories",
    paths: [
      { name: "POST Docs Root", path: "/Portals/0/post_docs/" },
      { name: "Documents Root", path: "/Portals/0/Documents/" },
      { name: "Images Root", path: "/Portals/0/Images/" },
      { name: "Resources", path: "/Portals/0/Resources/" },
    ],
  },
];

interface PathsSectionProps {
  searchQuery?: string;
}

export const PathsSection = ({ searchQuery = "" }: PathsSectionProps) => {
  const query = searchQuery.toLowerCase();

  // Filter groups and paths based on search query
  const filteredGroups = pathGroups
    .map((group) => ({
      ...group,
      paths: group.paths.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.path.toLowerCase().includes(query)
      ),
    }))
    .filter((group) => group.paths.length > 0);

  const totalCount = filteredGroups.reduce((acc, group) => acc + group.paths.length, 0);

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <SectionHeader title="Source Paths" icon={<FolderOpen className="h-5 w-5" />} count={totalCount} />
      {filteredGroups.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No paths found matching "{searchQuery}"</p>
      ) : (
        <Accordion type="multiple" defaultValue={filteredGroups.map((g) => g.groupName)} className="space-y-3">
          {filteredGroups.map((group) => (
            <AccordionItem
              key={group.groupName}
              value={group.groupName}
              className="border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  <span>{group.groupName}</span>
                  <span className="text-xs text-muted-foreground ml-1">({group.paths.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="grid grid-cols-1 gap-2">
                  {group.paths.map((item) => (
                    <TemplateCard
                      key={item.path}
                      title={item.name}
                      code={item.path}
                      description="File path reference"
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
};
