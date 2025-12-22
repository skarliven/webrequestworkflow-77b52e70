import { Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TemplateCard } from "./TemplateCard";

const icons = [
  { name: "Download", code: '<span aria-hidden="true" class="ca-gov-icon-download"></span>' },
  { name: "Link", code: '<span aria-hidden="true" class="ca-gov-icon-link"></span>' },
  { name: "Calendar", code: '<span aria-hidden="true" class="ca-gov-icon-calendar"></span>' },
  { name: "Info", code: '<span aria-hidden="true" class="ca-gov-icon-info"></span>' },
  { name: "Justice/Legal", code: '<span aria-hidden="true" class="ca-gov-icon-justice-legal"></span>' },
  { name: "Contact Us", code: '<span aria-hidden="true" class="ca-gov-icon-contact-us"></span>' },
  { name: "Favorite", code: '<span aria-hidden="true" class="ca-gov-icon-favorite"></span>' },
  { name: "YouTube", code: '<span aria-hidden="true" class="ca-gov-icon-youtube"></span>' },
];

export const IconsSection = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <SectionHeader title="CA Gov Icons" icon={<Sparkles className="h-5 w-5" />} count={icons.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {icons.map((icon) => (
          <TemplateCard key={icon.name} title={icon.name} code={icon.code} />
        ))}
      </div>
    </section>
  );
};
