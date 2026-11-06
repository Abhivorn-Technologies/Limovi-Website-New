import fs from "node:fs";
import path from "node:path";

export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  group: "Platform" | "Products" | "Strategies";
};

// Every document below is published as supplied by LIMOVI. The summaries are
// taken from each document's own opening lines; nothing here adds terms.
export const legalDocs: LegalDoc[] = [
  {
    slug: "master-customer-agreement",
    title: "Master Customer & Platform Agreement",
    summary: "Terms governing use of the LIMOVI Website, Mobile Application and Gold Ecosystem Services.",
    group: "Platform",
  },
  {
    slug: "website-app-terms",
    title: "Website & Mobile Application Terms of Use",
    summary: "Govern access to and use of the website, mobile application and other digital interfaces operated by LIMOVI.",
    group: "Platform",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How LIMOVI collects, uses, processes, stores, retains, discloses and protects Personal Data.",
    group: "Platform",
  },
  {
    slug: "grievance-redressal-policy",
    title: "Grievance Redressal Policy",
    summary: "The mechanism through which a Customer, Registered User, Visitor or other person may raise a grievance with LIMOVI.",
    group: "Platform",
  },
  {
    slug: "digital-gold-terms",
    title: "Digital Gold Agreement & Terms",
    summary: "Govern the purchase and holding of Digital Gold by an eligible Customer through LIMOVI.",
    group: "Products",
  },
  {
    slug: "gold-liquidity-and-sale-terms",
    title: "Gold Liquidity and Sale Terms",
    summary: "Apply to every Gold Liquidity Transaction initiated or confirmed by a Customer through the LIMOVI Platform.",
    group: "Products",
  },
  {
    slug: "investment-only-strategy",
    title: "Investment Only Strategy Agreement",
    summary: "Strategy-specific terms governing the creation, maintenance and use of Gold Balance.",
    group: "Strategies",
  },
  {
    slug: "investment-and-experience-strategy",
    title: "Investment & Experience Strategy Agreement",
    summary: "Strategy-specific terms governing investment-linked jewellery ownership and Experience.",
    group: "Strategies",
  },
  {
    slug: "enrol-and-experience-strategy",
    title: "Enrol & Experience Strategy Agreement",
    summary: "Strategy-specific terms governing enrolment, custody and Experience of customer-owned jewellery.",
    group: "Strategies",
  },
  {
    slug: "experience-only-strategy",
    title: "Experience Only Strategy Agreement",
    summary: "Govern the Experience, meaning the temporary use of Jewellery by the Customer, and the Security provided for it.",
    group: "Strategies",
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}

export type LegalHeading = { id: string; label: string };

export function loadLegalHtml(slug: string): { html: string; headings: LegalHeading[] } {
  const file = path.join(process.cwd(), "content", "legal", `${slug}.html`);
  let html = fs.readFileSync(file, "utf8");
  // let wide schedules scroll on small screens
  html = html.replace(/<table>/g, '<div class="lm-legal-table"><table>').replace(/<\/table>/g, "</table></div>");
  const headings: LegalHeading[] = [];
  for (const m of html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)) {
    headings.push({ id: m[1], label: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&") });
  }
  return { html, headings };
}
