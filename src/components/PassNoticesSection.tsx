import { CheckCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";
import { PassNoticeGenerator } from "./PassNoticeGenerator";

const passNotices = [
  {
    name: "PASS Course Notice",
    description: "Course announcement with PDF link. Filename convention: 2026-04-10_Post-Evaluators.pdf",
    template: `<h2><a href="https://post.ca.gov/Portals/0/post_docs/PASS_Notices/year-month-day_xx.pdf" target="_blank">Lorem text</a></h2>

<p>Course will be held Month xx, 2026 in XXxxx, CA</p>`,
  },
];

interface PassNoticesSectionProps {
  searchQuery?: string;
}

export const PassNoticesSection = ({ searchQuery = "" }: PassNoticesSectionProps) => {
  const filteredNotices = passNotices.filter((notice) => {
    const query = searchQuery.toLowerCase();
    return (
      notice.name.toLowerCase().includes(query) ||
      notice.description?.toLowerCase().includes(query) ||
      notice.template.toLowerCase().includes(query)
    );
  });

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <SectionHeader title="PASS Notices" icon={<CheckCircle className="h-5 w-5" />} count={filteredNotices.length} />
      {filteredNotices.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No notices found matching "{searchQuery}"</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((notice) => (
            <TemplateCard 
              key={notice.name} 
              title={notice.name} 
              code={notice.template}
              description={notice.description}
            />
          ))}
          <PassNoticeGenerator />
        </div>
      )}
    </section>
  );
};
