import { CheckCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { PassNoticeGenerator } from "./PassNoticeGenerator";

interface PassNoticesSectionProps {
  searchQuery?: string;
}

export const PassNoticesSection = ({ searchQuery = "" }: PassNoticesSectionProps) => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <SectionHeader title="PASS Notices" icon={<CheckCircle className="h-5 w-5" />} />
      <div className="grid grid-cols-1 gap-4">
        <PassNoticeGenerator />
      </div>
    </section>
  );
};
