/** FAQ and documentation link content for the help center. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: "faq_01",
    question: "How do I set up and track my construction budget?",
    answer:
      "Head to Expenses and set a total budget for the project, then allocate amounts per category (structure, electrical, plumbing, interior). Every expense you log is counted against its category, and BuildNest alerts you when a category passes 85% of its allocation so surprises never reach the closing invoice.",
  },
  {
    id: "faq_02",
    question: "How do contractors collaborate with me in BuildNest?",
    answer:
      "Invite a contractor from the Contractors page with just their email. They get a scoped view — only the tasks, documents, and photo albums you share with them. Messages, quotes, and schedule changes stay attached to the project instead of being buried in text threads.",
  },
  {
    id: "faq_03",
    question: "What file types can I upload to Documents, and is there a size limit?",
    answer:
      "PDFs, images (PNG, JPG), and spreadsheets (XLSX, CSV) up to 25 MB per file. Documents are organized by category — permits, contracts, invoices, plans, and reports — and contracts can be flagged as awaiting signature so nothing stalls the schedule.",
  },
  {
    id: "faq_04",
    question: "Can I export my project data?",
    answer:
      "Yes. From Settings → General you can export the full project — expenses, tasks, documents metadata, and the photo index — as a ZIP containing CSV files and your original uploads. Weekly progress reports can also be downloaded as PDFs from the Dashboard.",
  },
  {
    id: "faq_05",
    question: "How do I invite family members to follow the build?",
    answer:
      "Open Settings → General and use “Invite members” to add family by email. Viewers can follow progress, browse photo albums, and comment on selections without being able to edit budgets or delete documents. You can change or revoke access at any time.",
  },
  {
    id: "faq_06",
    question: "Is there a mobile app for uploading photos from the site?",
    answer:
      "BuildNest is fully responsive, so the web app works great from a phone browser — including camera uploads straight into an album. Native iOS and Android apps with offline photo queueing are in beta; join the waitlist from your profile menu.",
  },
];

export interface DocLink {
  id: string;
  title: string;
  description: string;
  href: string;
}

export const docLinks: DocLink[] = [
  {
    id: "dl_01",
    title: "Getting started guide",
    description: "Set up your project, phases, and budget in 15 minutes.",
    href: "#",
  },
  {
    id: "dl_02",
    title: "Budget & expense tracking",
    description: "Categories, alerts, and monthly budget-vs-actual reports.",
    href: "#",
  },
  {
    id: "dl_03",
    title: "Working with contractors",
    description: "Invites, shared tasks, quotes, and approval workflows.",
    href: "#",
  },
  {
    id: "dl_04",
    title: "Exports & backups",
    description: "Download your full project data whenever you need it.",
    href: "#",
  },
];

export const supportEmail = "support@buildnest.app";
