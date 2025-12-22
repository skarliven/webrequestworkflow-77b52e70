import { CheckCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const passNotices = [
  {
    name: "PASS Course Notice",
    description: "Course announcement with PDF link",
    template: `<h2><a href="https://post.ca.gov/Portals/0/post_docs/PASS_Notices/xx.pdf" target="_blank">Lorem text</a></h2>

<p>Course will be held January 15, 2026 in Long Beach, CA</p>`,
  },
  {
    name: "Standard PASS Notice",
    description: "Official notice template",
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
    description: "Conditional approval template",
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
    description: "Distinction award template",
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
            description={notice.description}
          />
        ))}
      </div>
    </section>
  );
};
