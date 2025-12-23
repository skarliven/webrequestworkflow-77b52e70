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
  {
    name: "Bulletin Connect/Subscribe",
    description: "Social media and subscription links section",
    code: `<div class="card-body">
  <div class="post-connect-subscribe">
    <a href="https://www.facebook.com/CaliforniaPOST">
      <span aria-hidden="true" class="ca-gov-icon-facebook"></span>
      <span class="sr-only">Facebook</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <a href="/e-mail-alerts">
      <span aria-hidden="true" class="ca-gov-icon-email"></span>
      <span class="sr-only">Email</span>
    </a>
    <a href="https://www.youtube.com/user/CaliforniaPOST/">
      <span aria-hidden="true" class="ca-gov-icon-youtube"></span>
      <span class="sr-only">Youtube</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <a href="https://www.instagram.com/commissiononpost/">
      <span aria-hidden="true" class="ca-gov-icon-instagram"></span>
      <span class="sr-only">Instagram</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <a href="https://www.linkedin.com/company/commissiononpost/">
      <span aria-hidden="true" class="ca-gov-icon-linkedin"></span>
      <span class="sr-only">LinkedIn</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
  </div>
</div>`,
  },
  {
    name: "Right Sidebar - Regulation Page",
    description: "Social connect sidebar with flexbox layout",
    code: `<div class="card-body">
  <div class="post-connect-subscribe" style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
    <!-- Facebook -->
    <a href="https://www.facebook.com/CaliforniaPOST" target="_blank" rel="noopener" title="Facebook">
      <span aria-hidden="true" class="ca-gov-icon-facebook"></span>
      <span class="sr-only">Facebook</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <!-- Email Alerts -->
    <a href="/e-mail-alerts" title="Email Alerts">
      <span aria-hidden="true" class="ca-gov-icon-email"></span>
      <span class="sr-only">Email</span>
    </a>
    <!-- YouTube -->
    <a href="https://www.youtube.com/user/CaliforniaPOST/" target="_blank" rel="noopener" title="YouTube">
      <span aria-hidden="true" class="ca-gov-icon-youtube"></span>
      <span class="sr-only">YouTube</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <!-- Instagram -->
    <a href="https://www.instagram.com/commissiononpost/" target="_blank" rel="noopener" title="Instagram">
      <span aria-hidden="true" class="ca-gov-icon-instagram"></span>
      <span class="sr-only">Instagram</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
    <!-- LinkedIn -->
    <a href="https://www.linkedin.com/company/california-post/" target="_blank" rel="noopener" title="LinkedIn">
      <span aria-hidden="true" class="ca-gov-icon-linkedin"></span>
      <span class="sr-only">LinkedIn</span>
      <span class="external-link-icon" aria-hidden="true"></span>
    </a>
  </div>
</div>`,
  },
  {
    name: "PMR Top Articles Section",
    description: "Multi-article layout with lightbox images",
    code: `<section class="top-articles">
  <!-- 1 -->
  <article aria-labelledby="article-1-title">
    <h3 id="article-1-title">Article 1</h3>
    <figure data-src="/portals/0/post_images/APRphotos/template-post.png" data-toggle="lightbox">
      <img
        src="/portals/0/post_images/APRphotos/template-post.png"
        alt="Template placeholder image"
        loading="lazy"
      />
      <figcaption>Image caption goes here</figcaption>
    </figure>
    <p>Text here</p>
    <p>Text here</p>
  </article>
  <!-- 2 -->
  <article aria-labelledby="article-2-title">
    <h3 id="article-2-title">Article 2</h3>
    <figure data-src="/portals/0/post_images/APRphotos/template-post.png" data-toggle="lightbox">
      <img
        src="/portals/0/post_images/APRphotos/template-post.png"
        alt="Template placeholder image"
        loading="lazy"
      />
      <figcaption>Image caption goes here</figcaption>
    </figure>
    <p>Text here</p>
    <p>Text here</p>
  </article>
  <!-- 3 -->
  <article aria-labelledby="article-3-title">
    <h3 id="article-3-title">Article 3</h3>
    <figure data-src="/portals/0/post_images/APRphotos/template-post.png" data-toggle="lightbox">
      <img
        src="/portals/0/post_images/APRphotos/template-post.png"
        alt="Template placeholder image"
        loading="lazy"
      />
      <figcaption>Image caption goes here</figcaption>
    </figure>
    <p>Text here</p>
    <p>Text here</p>
  </article>
  <!-- Add more articles as needed -->
</section>`,
  },
  {
    name: "PMR Single Article",
    description: "Individual article with lightbox image",
    code: `<article aria-labelledby="article-1-title">
  <h3 id="article-1-title">Article Title</h3>
  <figure data-src="/portals/0/post_images/APRphotos/template-post.png" data-toggle="lightbox">
    <img
      src="/portals/0/post_images/APRphotos/template-post.png"
      alt="Template placeholder image"
      loading="lazy"
    />
    <figcaption>Image caption goes here</figcaption>
  </figure>
  <p>Text here</p>
  <p>Text here</p>
</article>`,
  },
  {
    name: "Upcoming Meetings Page",
    description: "Full meetings page with Commission and POSAAB tables",
    code: `<h1>Upcoming Meetings</h1>

<p><em>Unless otherwise noted, all meetings are open to the public and hosted at the locations below.</em></p>

<h2 id="Commission">POST Commission and Advisory Committee</h2>

<p>
  The POST Commission meets four times a year to establish standards, regulations, and to give direction to Commission staff.
  Commissioners serve without pay but are reimbursed for expenses incurred while attending meetings.
</p>

<p>
  The Advisory Committee, comprised of Commission stakeholders, meets before the Commission meeting to review agenda items
  and make recommendations to the Commission.
</p>

<p class="textRed">
  <strong>Agendas are posted 10 days prior to the Commission meeting date.</strong>
</p>

<h3>Upcoming Meetings</h3>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Session</th>
      <th scope="col">Time</th>
      <th scope="col">Location</th>
      <th scope="col">Agenda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Advisory Committee</strong><br>December 02, 2025</td>
      <td>10:00 AM – 5:00 PM</td>
      <td>
        <strong>POST</strong><br>
        860 Stillwater Road<br>
        West Sacramento, CA 95605
      </td>
      <td></td>
    </tr>
    <tr>
      <td><strong>POST Commission</strong><br>December 03, 2025</td>
      <td>10:00 AM – 5:00 PM</td>
      <td>
        <strong>POST</strong><br>
        860 Stillwater Road<br>
        West Sacramento, CA 95605
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

<h2 id="POSAAB">Peace Officer Standards Accountability Advisory Board</h2>

<p>
  The Board serves as an advisory body to the Commission and reviews serious misconduct cases involving peace officers.
  Public hearings are conducted to formulate decertification recommendations based on investigative findings.
</p>

<h3>Upcoming Meetings</h3>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Session</th>
      <th scope="col">Time</th>
      <th scope="col">Location</th>
      <th scope="col">Agenda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>POSAAB Serious Misconduct Hearing</strong><br>February 04–05, 2026</td>
      <td>9:00 AM – 5:00 PM</td>
      <td>
        <strong>POST</strong><br>
        860 Stillwater Road<br>
        West Sacramento, CA 95605
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

<p>
  <em><strong>
    Board meeting dates are tentative and subject to cancellation pending requests from subject officers.
  </strong></em>
</p>`,
  },
  {
    name: "Meeting Table Row",
    description: "Single meeting row for tables",
    code: `<tr>
  <td><strong>Advisory Committee</strong><br>December 02, 2025</td>
  <td>10:00 AM – 5:00 PM</td>
  <td>
    <strong>POST</strong><br>
    860 Stillwater Road<br>
    West Sacramento, CA 95605
  </td>
  <td></td>
</tr>`,
  },
  {
    name: "Netlify Deployment Guide (Lovable/Vite)",
    description: "Step-by-step Netlify configuration for Vite projects",
    code: `## How to Configure a Lovable Vite Project for Netlify Deployment

### 1. Open the Netlify Project
- Log in to Netlify.
- Open your project.

### 2. Navigate to Build Settings
- In the left sidebar, click **Build and deploy**.
- Click **Continuous deployment**.

### 3. Configure Build Settings
Scroll to the **Build settings** section and set the fields exactly as follows:

| Field             | Value           |
|-------------------|-----------------|
| Base directory    | *(leave empty)* |
| Build command     | npm run build   |
| Publish directory | dist            |

⚠️ **Important:** Do not use \`public\`, \`build\`, or \`/\`.
Vite outputs production files into the \`dist\` folder.

### 4. Save the Configuration
Click **Save** to apply the changes.

### 5. Trigger a Clean Deploy
- In the left sidebar, click **Deploys**.
- Click **Trigger deploy**.
- Select **Clear cache and deploy site**.

### 6. Verify Deployment Success
- Wait for the deploy to complete.
- The status should show **Published**.
- Open the deploy details and confirm these files exist:
  - \`dist/index.html\`
  - \`dist/assets/\`

### 7. Test the Netlify URL
Open the Netlify-generated URL, for example:
\`your-site-name.netlify.app\`

If the page loads correctly, the deployment is successful.`,
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
