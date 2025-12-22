import { Code2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const codeTemplates = [
  {
    name: "Accordion Component",
    description: "Expandable content section",
    code: `<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span class="ca-gov-icon-plus"></span>
      Section Title
    </button>
    <div class="accordion-content">
      Content goes here...
    </div>
  </div>
</div>`,
  },
  {
    name: "Alert Banner",
    description: "Notification banner",
    code: `<div class="alert-banner alert-info">
  <span aria-hidden="true" class="ca-gov-icon-info"></span>
  <p>Important information message here.</p>
</div>`,
  },
  {
    name: "Download Link",
    description: "File download with icon",
    code: `<a href="/Portals/0/post_docs/Certification_Actions/document.pdf" class="download-link">
  <span aria-hidden="true" class="ca-gov-icon-download"></span>
  Download Document (PDF)
</a>`,
  },
  {
    name: "Contact Card",
    description: "Contact information block",
    code: `<div class="contact-card">
  <span aria-hidden="true" class="ca-gov-icon-contact-us"></span>
  <h3>Contact Us</h3>
  <p>Email: info@example.gov</p>
  <p>Phone: (555) 123-4567</p>
</div>`,
  },
  {
    name: "Date Event",
    description: "Calendar event display",
    code: `<div class="event-item">
  <span aria-hidden="true" class="ca-gov-icon-calendar"></span>
  <div class="event-details">
    <span class="event-date">January 15, 2025</span>
    <span class="event-title">Event Title Here</span>
  </div>
</div>`,
  },
];

export const CodeTemplatesSection = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0s" }}>
      <SectionHeader title="Code Templates" icon={<Code2 className="h-5 w-5" />} count={codeTemplates.length} />
      <div className="grid grid-cols-1 gap-4">
        {codeTemplates.map((template) => (
          <TemplateCard 
            key={template.name} 
            title={template.name} 
            code={template.code}
            description={template.description}
          />
        ))}
      </div>
    </section>
  );
};
