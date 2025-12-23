import { Mail } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const emailTemplates = [
  {
    name: "Acknowledgment Response",
    template: `Dear [Name],

Thank you for your inquiry. We have received your request and will review it within 3-5 business days.

If you have any additional questions, please do not hesitate to contact us.

Best regards,
[Your Name]`,
  },
  {
    name: "Document Request Follow-up",
    template: `Dear [Name],

This is a follow-up regarding your document request submitted on [Date]. 

We are currently processing your request and expect to have an update by [Expected Date].

Thank you for your patience.

Best regards,
[Your Name]`,
  },
  {
    name: "Certification Status Update",
    template: `Dear [Name],

We are writing to inform you about the status of your certification application.

Status: [PENDING/APPROVED/REQUIRES ADDITIONAL INFO]

[Additional details here]

Please contact us if you have any questions.

Best regards,
[Your Name]`,
  },
];

interface EmailTemplatesSectionProps {
  searchQuery?: string;
}

export const EmailTemplatesSection = ({ searchQuery = "" }: EmailTemplatesSectionProps) => {
  const filteredTemplates = emailTemplates.filter((email) => {
    const query = searchQuery.toLowerCase();
    return email.name.toLowerCase().includes(query) || email.template.toLowerCase().includes(query);
  });

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <SectionHeader title="Email Templates" icon={<Mail className="h-5 w-5" />} count={filteredTemplates.length} />
      {filteredTemplates.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No templates found matching "{searchQuery}"</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((email) => (
            <TemplateCard 
              key={email.name} 
              title={email.name} 
              code={email.template}
              description="Click to copy full template"
            />
          ))}
        </div>
      )}
    </section>
  );
};
