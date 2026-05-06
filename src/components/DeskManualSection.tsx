import { useEffect, useRef } from "react";
import { BookOpen, Mail, FileCheck, Briefcase, Bell, Heart, FileText, Calendar, Wrench, GraduationCap, FormInput, Monitor, FileSearch, Users, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import passNoticesReference from "@/assets/pass-notices-reference.png";

const SectionCard = ({ icon: Icon, title, children, searchQuery = "" }: { icon: any; title: string; children: React.ReactNode; searchQuery?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setHidden(false); return; }
    const text = (ref.current?.innerText || "").toLowerCase();
    setHidden(!text.includes(q));
  }, [searchQuery]);
  return (
    <Card ref={ref} className={`p-6 bg-card/50 border-border/50 hover:border-primary/30 transition-colors ${hidden ? "hidden" : ""}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground font-mono">{title}</h3>
      </div>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">{children}</div>
    </Card>
  );
};

interface DeskManualSectionProps {
  searchQuery?: string;
}

const DeskManualSection = ({ searchQuery = "" }: DeskManualSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gradient-primary font-mono mb-2">
              Desk Procedure Manual
            </h2>
            <p className="text-sm text-foreground/80 mb-1">
              <span className="text-primary font-semibold">ITT - Website Administrator</span> – Skarli P-L
            </p>
            <div className="text-xs text-muted-foreground space-y-0.5 font-mono mt-2">
              <div><span className="text-primary">Prepared For:</span> Coverage in case of leave or absence</div>
              <div><span className="text-primary">Position:</span> Information Technology Technician – Website Administrator</div>
              <div><span className="text-primary">Department:</span> Computer Services Bureau</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <SectionCard icon={Lightbulb} title="I. Overview of Role">
        <p>
          As the Website Administrator, I oversee and manage web-related requests, ensure accessibility compliance,
          update job postings, maintain website content, support internal communications (lobby slides), and
          create/approve interactive elements like live forms and SBSLI class access. I am also responsible for
          updating the In Memoriam page for fallen officers and maintaining naming conventions for newly posted
          bulletins. This document outlines the key procedures required to fulfill this role during my absence.
        </p>
      </SectionCard>

      {/* Routing Quick Guide */}
      <SectionCard icon={FileSearch} title="Routing Quick Guide">
        <p className="mb-2">
          After visiting the{" "}
          <a
            href="https://post.ca.gov/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Contact Us page
          </a>
          , use the recommendations below to route common requests:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="text-foreground font-semibold">SBSLI network access request:</span> Copy the user's link, then in DNN click <span className="text-primary">Users</span>, add the email, and assign the user role (e.g., <code className="text-primary text-xs">SLI_576</code>).
          </li>
          <li>
            <span className="text-foreground font-semibold">Name change or login access:</span> Send to the <span className="text-primary">EDI desk</span>.
          </li>
          <li>
            <span className="text-foreground font-semibold">Microsoft Teams, printers, or computer issues:</span> Send to the <span className="text-primary">Help Desk</span>.
          </li>
          <li>
            <span className="text-foreground font-semibold">Abroad Diplomas &amp; Background Waivers:</span> Send to Kelli Surawski —{" "}
            <a href="mailto:kelli.surawski@post.ca.gov" className="text-primary hover:underline">
              kelli.surawski@post.ca.gov
            </a>
          </li>
          <li>
            <span className="text-foreground font-semibold">POST 2-364 Psychological Suitability Declaration:</span> Send directly to Frances Melendez —{" "}
            <a href="mailto:frances.melendez@post.ca.gov" className="text-primary hover:underline">
              frances.melendez@post.ca.gov
            </a>
          </li>
          <li>
            <span className="text-foreground font-semibold">PELLETB requests, questions, or inquiries:</span> Contact our proctor request team at{" "}
            <a href="mailto:proctorrequest@post.ca.gov" className="text-primary hover:underline">
              proctorrequest@post.ca.gov
            </a>
          </li>
          <li>
            <span className="text-foreground font-semibold">Dispatcher Proctor Training requests, questions, or inquiries:</span> Contact our proctor request team at{" "}
            <a href="mailto:proctorrequest@post.ca.gov" className="text-primary hover:underline">
              proctorrequest@post.ca.gov
            </a>
          </li>
        </ul>
      </SectionCard>

      {/* Daily Responsibilities */}
      <div>
        <h2 className="text-lg font-bold text-gradient-primary font-mono mb-4">II. Daily Responsibilities</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SectionCard icon={Mail} title="1. Monitor WebRequests Inbox">
            <ul className="list-disc list-inside space-y-1">
              <li>Check the WebRequests@post.ca.gov inbox throughout the day.</li>
              <li>Route requests to the appropriate bureau based on the content.</li>
              <li>Follow up if the request lacks clarity.</li>
              <li>
                Refer to the{" "}
                <a
                  href="https://post.ca.gov/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Contact Us page
                </a>{" "}
                to determine correct routing.
              </li>
            </ul>
          </SectionCard>

          <SectionCard icon={FileCheck} title="2. Approve Web Content Submissions">
            <p>Review incoming content for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Correct and updated information</li>
              <li>Accessibility compliance (headers, alt text, font clarity)</li>
              <li>Relative internal links formatting (e.g., <code className="text-primary text-xs">/Portals/0/post_docs/bulletin/2025-XX.pdf</code>)</li>
              <li>External links and PDFs must open in a new tab (<code className="text-primary text-xs">target="_blank"</code>)</li>
              <li>Fix formatting issues caused by user edits (e.g., missing icons, alignment)</li>
              <li>If assistance is needed, contact Nic or Sam via Microsoft Teams</li>
              <li>Use Siteimprove to check for accessibility</li>
            </ul>
          </SectionCard>

          <SectionCard icon={Briefcase} title="3. Handle Law Enforcement Job Postings">
            <ul className="list-disc list-inside space-y-1">
              <li>Format job submissions as needed.</li>
              <li>Post jobs under the Law Enforcement Jobs section.</li>
              <li>Add submission dates and contact details if missing.</li>
              <li>Remove expired job postings. Some jobs are continuous and should remain posted.</li>
            </ul>
          </SectionCard>

          <SectionCard icon={Bell} title="4. PASS Notices for Regions">
            <p>
              When Katie from Public Affairs reaches out, she will provide PDFs to be saved in the{" "}
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("workflowhub:set-tab", { detail: "pass" }))
                }
                className="text-primary hover:underline font-mono text-xs"
              >
                PASS_notices
              </button>{" "}
              folder following naming conventions.
            </p>
            <p className="mt-3 font-semibold text-foreground">Posting steps in POSTPASS:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li><span className="text-foreground">Notice Type:</span> Default</li>
              <li><span className="text-foreground">Priority:</span> Default</li>
              <li><span className="text-foreground">Sites:</span> POST Website</li>
              <li><span className="text-foreground">Notification Group:</span> select the relevant region (e.g., Region 9 Self Enlist + Region 9 Auto Enlist)</li>
              <li><span className="text-foreground">Message:</span> paste the HTML code (see PASS tab for the template) and update the course date/location</li>
              <li><span className="text-foreground">Effective Date:</span> today &nbsp;|&nbsp; <span className="text-foreground">Expiration Date:</span> course end date (or as instructed)</li>
              <li>Click <span className="text-primary font-semibold">Save</span></li>
            </ol>
            <div className="mt-3 rounded-lg border border-border/50 overflow-hidden bg-muted/20">
              <img
                src={passNoticesReference}
                alt="POSTPASS notice form reference showing Notice Type, Priority, Sites, Notification Group, Message HTML, Effective and Expiration Date fields"
                className="w-full h-auto"
                loading="lazy"
              />
              <p className="text-[10px] text-muted-foreground px-2 py-1 font-mono">Reference: POSTPASS notice form</p>
            </div>
          </SectionCard>

          <SectionCard icon={Heart} title="5. Update In Memoriam Page">
            <p>Add new fallen officers when notified. To update:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Go to shared folder <code className="text-primary text-xs">post_docs/inmemoriam</code></li>
              <li>Edit the <code className="text-primary text-xs">inmemoriam.js</code> file using Sublime Text Editor</li>
              <li>Save the photo in <code className="text-primary text-xs">post_images/InMemoriam</code> following naming conventions</li>
              <li>Verify and link to the homepage</li>
              <li>Update the In Memoriam page</li>
            </ul>
          </SectionCard>

          <SectionCard icon={FileText} title="6. Bulletin & Regulation Naming">
            <ul className="list-disc list-inside space-y-1">
              <li>Save new bulletins and regulation notices to the server using the designated naming structure.</li>
              <li>Reference the Bulletins page for the latest versions.</li>
              <li>PDFs must be ADA-compliant — handle directly or ask the Graphics Unit for assistance.</li>
            </ul>
          </SectionCard>
        </div>
      </div>

      {/* Weekly */}
      <SectionCard icon={Calendar} title="III. Weekly Responsibilities">
        <p className="font-semibold text-foreground">Thursdays: Send Jobs Summary to Public Affairs</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Export all job listings posted that week.</li>
          <li>
            Under the Web Unit Module on{" "}
            <a href="https://post.ca.gov/POST-Staff" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">post.ca.gov/POST-Staff</a>, use the{" "}
            <a href="https://post.ca.gov/Job-Newsletter-HTML-Generator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Job Newsletter HTML Generator</a>{" "}
            (job listings are managed at{" "}
            <a href="https://post.ca.gov/POST-Staff/Content-Management/Manage-Law-Enforcement-Jobs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Manage Law Enforcement Jobs</a>):
            <ul className="list-disc list-inside ml-5 mt-1">
              <li>Type the number of job postings</li>
              <li>Click the Generate button</li>
            </ul>
          </li>
          <li>Send to Public Affairs in both Plain Text format (email body) and HTML format (attachment or formatted email).</li>
          <li>Confirm receipt.</li>
        </ul>
      </SectionCard>

      {/* As-Needed */}
      <div>
        <h2 className="text-lg font-bold text-gradient-primary font-mono mb-4">IV. As-Needed Tasks</h2>
        <Accordion type="multiple" className="space-y-3">
          <AccordionItem value="icons" className="border border-border/50 rounded-lg px-4 bg-card/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="font-mono">Fixing Missing Icons on Right Side Navigation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>When users edit pages — especially the right side navigation bar — icons often go missing. Correct these during content approval.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Open the page using the Advanced Editor and click on Source Code to view the HTML.</li>
                <li>Restore missing icon HTML snippets manually.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sbsli" className="border border-border/50 rounded-lg px-4 bg-card/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="font-mono">1. SBSLI Class Management</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Create new classes using the DMX module on the POST Website based on the upcoming class schedule.</li>
                <li>Grant access to SBSLI participants.</li>
                <li>Use the provided Excel spreadsheet to maintain and track class schedules.</li>
                <li>Add link to SLI schedule saved in Teams for all staff to reference.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="forms" className="border border-border/50 rounded-lg px-4 bg-card/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <FormInput className="h-4 w-4 text-primary" />
                <span className="font-mono">2. Create Live Forms</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Use the internal form builder tool to develop and publish forms.</li>
                <li>Ensure proper field validation and mobile responsiveness.</li>
                <li>Have Sam add the CAPTCHA key to each new one.</li>
                <li>Page permissions should be "registered users" for all pages with a Live Form.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lobby" className="border border-border/50 rounded-lg px-4 bg-card/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Monitor className="h-4 w-4 text-primary" />
                <span className="font-mono">3. Create and Update Lobby Slides</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>Design slides for: New employees, Service Awards, POST Events, Job Opportunities.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use PowerPoint to create and format slides.</li>
                <li>Once your slide is created from the PowerPoint template, submit it via Microsoft Teams: go to <strong>POST Knowledge Library → Templates and Logos channel → Lobby Slides</strong> tab at the top.</li>
                <li>On the <strong>Lobby Display Submissions</strong> screen, click <strong>New</strong>, choose the slide <strong>Type</strong> (e.g., New Employee), add a comment, attach your template file, and set the <strong>Go Live</strong> and <strong>Expire</strong> dates.</li>
                <li>Slides are routed through the Web Team for final approval and publishing.</li>
                <li>
                  Post to the lobby system using Mvix at{" "}
                  <a href="https://cms.mvix.com/sign-in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://cms.mvix.com/sign-in</a>:
                  <ul className="list-[circle] list-inside ml-6 mt-1 space-y-1">
                    <li>Click <strong>Media → Add Media</strong>, set <strong>File Type</strong> to <em>Microsoft Office</em>, and upload the file.</li>
                    <li>Add <strong>Validity</strong> with an <strong>Activate Date</strong> and <strong>Expiration Date</strong> (usually 2 weeks out).</li>
                    <li>Go to <strong>Devices</strong>, find <strong>Internal (new)</strong>, click the <strong>3 dots</strong> on the right, and select <strong>Schedules</strong>.</li>
                    <li>Click <strong>Edit</strong>, drag in the file you just added, then <strong>preview</strong> and <strong>save</strong> the schedule.</li>
                  </ul>
                </li>
                <li>Use templates located in <code className="text-primary text-xs">Web Design Doc Team / Lobby Display</code> documentation.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pdf" className="border border-border/50 rounded-lg px-4 bg-card/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <FileSearch className="h-4 w-4 text-primary" />
                <span className="font-mono">4. Assist with PDF Accessibility</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>Use Adobe Acrobat Pro and the CommonLook plugin to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tag headings, paragraphs, and images</li>
                <li>Add bookmarks and alt text</li>
                <li>Check and resolve accessibility issues</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tools */}
      <SectionCard icon={Wrench} title="V. Tools & Systems Used">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {[
            ["Website Platform", "Evoq DNN"],
            ["HTML/CSS/JS Editor", "Sublime Text Editor"],
            ["Email", "Outlook"],
            ["PDF Accessibility", "Adobe Acrobat Pro + CommonLook"],
            ["Lobby Slide Management", "Mvix"],
            ["Slide Design", "PowerPoint"],
            ["SBSLI Schedule Tracking", "Excel Spreadsheets"],
            ["Accessibility Checker", "Siteimprove"],
            ["Communication", "Microsoft Teams"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 py-1 border-b border-border/30">
              <span className="text-foreground/80">{k}</span>
              <span className="text-primary font-mono text-xs">{v}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Contacts */}
      <SectionCard icon={Users} title="VI. Support Contacts">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <div className="font-semibold text-foreground">Nic Barrios</div>
            <div className="text-xs">ITS Web Developer</div>
            <div className="text-xs text-primary mt-1">Contact via Microsoft Teams</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <div className="font-semibold text-foreground">Sam Judkis</div>
            <div className="text-xs">ITS Web Developer</div>
            <div className="text-xs text-primary mt-1">Contact via Microsoft Teams</div>
          </div>
        </div>
      </SectionCard>

      {/* Notes & Tips */}
      <SectionCard icon={Lightbulb} title="VII. Notes & Tips">
        <ul className="list-disc list-inside space-y-1">
          <li>Keep a clean inbox for WebRequests with folders by bureau.</li>
          <li>Keep POST notices folder updated.</li>
          <li>Double-check external links after pasting content into CMS.</li>
          <li>Use Siteimprove tools for accessibility spot checks.</li>
          <li>Maintain consistent formatting and naming conventions across posted documents.</li>
        </ul>
      </SectionCard>
    </div>
  );
};

export default DeskManualSection;
