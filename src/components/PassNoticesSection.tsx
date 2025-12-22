import { CheckCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const passNotices = [
  {
    name: "Standard PASS Notice",
    template: `PASS NOTICE

Applicant Name: [Name]
Application ID: [ID]
Date: [Date]

This notice confirms that the applicant has successfully passed all required examinations and meets the certification requirements.

Certification Type: [Type]
Effective Date: [Date]
Expiration Date: [Date]

Authorized by: [Authority Name]`,
  },
  {
    name: "Conditional PASS Notice",
    template: `CONDITIONAL PASS NOTICE

Applicant Name: [Name]
Application ID: [ID]
Date: [Date]

This notice confirms conditional approval pending completion of:
- [ ] Background verification
- [ ] Additional documentation
- [ ] Training completion

Deadline for completion: [Date]

Contact: [Contact Info]`,
  },
  {
    name: "PASS with Commendation",
    template: `PASS NOTICE - WITH DISTINCTION

Applicant Name: [Name]
Application ID: [ID]
Date: [Date]

Congratulations! The applicant has demonstrated exceptional performance and is hereby awarded certification WITH DISTINCTION.

Score: [Score]
Percentile: [Percentile]

This achievement recognizes outstanding dedication and expertise.

Authorized by: [Authority Name]`,
  },
];

export const PassNoticesSection = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <SectionHeader title="PASS Notices" icon={<CheckCircle className="h-5 w-5" />} count={passNotices.length} />
      <div className="grid grid-cols-1 gap-4">
        {passNotices.map((notice) => (
          <TemplateCard 
            key={notice.name} 
            title={notice.name} 
            code={notice.template}
            description="Official notice template"
          />
        ))}
      </div>
    </section>
  );
};
