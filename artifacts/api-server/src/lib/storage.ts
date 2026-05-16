import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../../data");
const PROJECTS_FILE = join(DATA_DIR, "projects.json");

export interface StoredProject {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  serviceId: string;
  subServiceId: string;
  category: string;
  subCategory: string;
  tags: string[];
  image: string;
  coverImage: string;
  results: { label: string; value: string }[];
  services: string[];
  year: string;
  duration: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  // Extra client & project details
  clientName?: string;
  industry?: string;
  budget?: string;
  ctaLink?: string;
  liveLink?: string;
  behanceLink?: string;
  toolsUsed?: string[];
  createdAt: string;
  updatedAt: string;
}

const SEED: StoredProject[] = [
  { id: "aura-brand", title: "Aura Collective", tagline: "A brand identity built to dominate every room it enters.", overview: "Aura Collective is a lifestyle brand launching across India. They needed a complete brand identity system plus a go-to-market digital marketing strategy.", challenge: "The founders had zero brand presence and needed a recognizable identity fast — before a national launch at a major trade fair.", solution: "We created a bold, modern brand system including logo, color palette, typography, and brand guidelines, then ran targeted Instagram and Google ad campaigns reaching over 200k users in month 1.", serviceId: "branding", subServiceId: "identity", category: "Creative Branding & Marketing", subCategory: "Brand Identity", tags: ["Brand Identity", "Logo Design", "Typography", "Color Systems"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=90", results: [{ label: "Reach in Month 1", value: "200k+" }, { label: "Brand Recall", value: "84%" }, { label: "Ad ROAS", value: "4.2x" }, { label: "Assets Delivered", value: "80+" }], services: ["Brand Identity", "Logo Design", "Digital Marketing"], year: "2024", duration: "8 weeks", status: "published", featured: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: "neon-brand", title: "Neon Dynamics", tagline: "A brand that charges up every room it enters.", overview: "Neon Dynamics needed a complete brand identity, launch video, and digital marketing strategy for a major trade show.", challenge: "Zero brand recognition with a major trade show deadline in 6 weeks.", solution: "We built a high-contrast visual system with electric neon colors, produced a 90-second launch film, and ran a 2-week awareness campaign on LinkedIn and Instagram.", serviceId: "branding", subServiceId: "marketing", category: "Creative Branding & Marketing", subCategory: "Marketing Creatives", tags: ["Brand Identity", "Marketing", "Video", "Product Launch"], image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=90", results: [{ label: "Trade Show Leads", value: "340+" }, { label: "Launch Film Views", value: "95k" }, { label: "LinkedIn Impressions", value: "180k" }, { label: "Turnaround", value: "6 weeks" }], services: ["Brand Identity", "Marketing Creatives", "Social Media"], year: "2024", duration: "6 weeks", status: "published", featured: false, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-02-01T00:00:00Z" },
  { id: "honey-packaging", title: "Golden Hive Honey", tagline: "Premium organic honey — packaged to feel as pure as it tastes.", overview: "Golden Hive needed packaging that would stand out on shelf and communicate their natural, artisan story.", challenge: "The market is flooded with look-alike honey brands — they needed to break through with minimal elements.", solution: "We designed a hexagonal label system with hand-lettered typography, warm gold tones, and botanical illustration.", serviceId: "branding", subServiceId: "packaging", category: "Creative Branding & Marketing", subCategory: "Product Packaging Design", tags: ["Packaging Design", "Label Design", "FMCG"], image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1600&q=90", results: [{ label: "Retail Listings", value: "12" }, { label: "DTC Sales Uplift", value: "+165%" }, { label: "Social Shares", value: "4,800+" }, { label: "Label Variants", value: "6" }], services: ["Packaging Design", "Label Design", "Logo Design"], year: "2024", duration: "4 weeks", status: "published", featured: false, createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-03-01T00:00:00Z" },
  { id: "skincare-social", title: "Velvet Skin Co.", tagline: "90-day Instagram transformation — from invisible to iconic.", overview: "Complete social content overhaul for a D2C skincare brand with zero engagement.", challenge: "Inconsistent content with no visual language and 0.3% engagement rate.", solution: "Created a cohesive Instagram design system with consistent grid layout, branded templates, and 3-month content calendar.", serviceId: "branding", subServiceId: "social", category: "Creative Branding & Marketing", subCategory: "Social Media Design", tags: ["Social Media Design", "Instagram", "Content Strategy", "Beauty"], image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600&q=90", results: [{ label: "Engagement Rate", value: "4.7%" }, { label: "Follower Growth", value: "+12,400" }, { label: "Profile Link Clicks", value: "+380%" }, { label: "Creatives Delivered", value: "120+" }], services: ["Social Media Design", "Content Strategy", "Brand Templates"], year: "2025", duration: "3 months", status: "published", featured: true, createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "lumina-ecommerce", title: "Lumina Lifestyle", tagline: "Elegant by design. Powerful by default.", overview: "Premium wellness brand DTC e-commerce store designed and developed from scratch.", challenge: "Strong product but no digital presence — needed luxury feel, fast mobile load, and high conversions before Black Friday.", solution: "Mobile-first UI with warm ivory tones, custom Shopify storefront with optimized checkout flows, CRM and email automation.", serviceId: "web", subServiceId: "ecommerce", category: "Web & App Development", subCategory: "E-commerce Stores", tags: ["E-Commerce", "Shopify", "UI/UX Design", "Mobile-First"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=90", results: [{ label: "Launch Day Revenue", value: "₹2.1L" }, { label: "Mobile Conversion", value: "4.8%" }, { label: "Session Duration", value: "3m 42s" }, { label: "Cart Abandonment", value: "-38%" }], services: ["E-commerce Development", "UI/UX Design", "Shopify", "CRM Integration"], year: "2023", duration: "10 weeks", status: "published", featured: true, createdAt: "2023-10-01T00:00:00Z", updatedAt: "2023-10-01T00:00:00Z" },
  { id: "saas-dashboard", title: "FlowMetrics AI Dashboard", tagline: "Complex analytics. Stunningly simple interface.", overview: "Custom B2B SaaS analytics dashboard with real-time data visualization and multi-tenant architecture.", challenge: "Excel-based reporting was blocking enterprise sales — prospects wanted a live dashboard before signing.", solution: "Fully custom React dashboard with real-time charts, role-based access, CSV export, and white-label option.", serviceId: "web", subServiceId: "webapp", category: "Web & App Development", subCategory: "Custom Web Apps", tags: ["Web App", "SaaS", "Dashboard", "React", "Data Viz"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90", results: [{ label: "Enterprise Deals", value: "8" }, { label: "Load Time (P95)", value: "< 800ms" }, { label: "Onboarding Drop-off", value: "-62%" }, { label: "Features Shipped", value: "34" }], services: ["Custom Web App", "UI/UX Design", "React", "Serverless Backend"], year: "2024", duration: "12 weeks", status: "published", featured: true, createdAt: "2024-04-01T00:00:00Z", updatedAt: "2024-04-01T00:00:00Z" },
  { id: "hotel-website", title: "Maison Blanc Hotel", tagline: "A luxury hotel website that books itself.", overview: "Boutique luxury hotel website with direct booking engine to cut OTA commissions.", challenge: "OTA platforms taking 18–22% commission on every booking with no direct digital channel.", solution: "Luxury full-screen website with integrated booking engine, virtual room tour, and automated email sequences.", serviceId: "web", subServiceId: "business", category: "Web & App Development", subCategory: "Business Websites", tags: ["Business Website", "Hotel", "Booking Integration", "Luxury UI"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90", results: [{ label: "Direct Bookings", value: "41%" }, { label: "Commission Saved", value: "₹1.8L/mo" }, { label: "Email List", value: "2,100+" }, { label: "Bounce Rate", value: "-44%" }], services: ["Business Website", "Booking Integration", "UI/UX Design"], year: "2024", duration: "6 weeks", status: "published", featured: false, createdAt: "2024-05-01T00:00:00Z", updatedAt: "2024-05-01T00:00:00Z" },
  { id: "pulse-video", title: "Pulse Energy", tagline: "Content that converts — at the speed of light.", overview: "Complete video content pipeline for a sustainable energy startup — product explainers, social ads, long-form YouTube.", challenge: "Raw footage but no editing team, no visual style, and a product launch deadline in 8 weeks.", solution: "Signature motion-graphic style using brand colors, 14 videos across formats from 15-second reels to 6-minute YouTube documentary.", serviceId: "video", subServiceId: "longform", category: "Video Production & Editing", subCategory: "Long-form Video Editing", tags: ["Motion Graphics", "YouTube", "Brand Film", "Documentary"], image: "https://images.unsplash.com/photo-1535016120720-40c746a5024b?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1535016120720-40c746a5024b?w=1600&q=90", results: [{ label: "Total Views (30 days)", value: "2.4M" }, { label: "Watch Time Increase", value: "+210%" }, { label: "Subscriber Growth", value: "+8,300" }, { label: "Videos Delivered", value: "14" }], services: ["Long-form Editing", "Motion Graphics", "Color Grading"], year: "2024", duration: "8 weeks", status: "published", featured: true, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "realestate-reel", title: "Prestige Realty Reels", tagline: "Reels that sell properties before showings.", overview: "Cinematic Instagram reels for a premium real estate agency targeting high-net-worth buyers.", challenge: "Competitors were using cinematic reels to sell ₹2Cr+ properties while Prestige got zero traction.", solution: "Cinematic reel format with drone footage, color grading for warmth, trending audio, and 3 reels per week on retainer.", serviceId: "video", subServiceId: "reels", category: "Video Production & Editing", subCategory: "Reels Editing", tags: ["Reels", "Real Estate", "Instagram", "High-retention"], image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=90", results: [{ label: "Reach per Reel", value: "85k+" }, { label: "Inquiry Calls/week", value: "+28" }, { label: "Views Booked", value: "+190%" }, { label: "Reels per Month", value: "12" }], services: ["Reels Editing", "Color Grading", "Motion Text"], year: "2024", duration: "Ongoing", status: "published", featured: false, createdAt: "2024-07-01T00:00:00Z", updatedAt: "2024-07-01T00:00:00Z" },
  { id: "server-migration", title: "CloudNova Enterprise Migration", tagline: "Zero downtime. Zero data loss. Done.", overview: "Full infrastructure migration from shared hosting to AWS for a logistics SaaS with 3,000+ users.", challenge: "Outdated hardware with no backup strategy — migration had to happen during business hours with live users.", solution: "Blue-green deployment architecture, AWS DMS live replication, auto-scaling groups, 4-minute maintenance window cutover.", serviceId: "infrastructure", subServiceId: "server", category: "Digital Infrastructure", subCategory: "Server Management", tags: ["Server Migration", "AWS", "Zero Downtime", "DevOps"], image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=90", results: [{ label: "Downtime", value: "0 min" }, { label: "Response Time", value: "-68%" }, { label: "Infra Cost", value: "-35%" }, { label: "Uptime", value: "99.98%" }], services: ["Server Management", "AWS Migration", "Database Management"], year: "2024", duration: "4 weeks", status: "published", featured: false, createdAt: "2024-08-01T00:00:00Z", updatedAt: "2024-08-01T00:00:00Z" },
  { id: "vertex-ai-automation", title: "Vertex Ops", tagline: "Turning 40-hour workweeks into automated pipelines.", overview: "Full AI-powered process automation for a mid-sized logistics company drowning in manual tasks.", challenge: "Team spending 60% of time on repetitive tasks — copy-pasting data, generating reports, responding to standard queries.", solution: "Automated pipelines using AI tools, custom GPT assistants for client queries, automated data sync, reports, and invoice generation.", serviceId: "ai", subServiceId: "workflow", category: "AI Automation Solutions", subCategory: "Workflow Automation", tags: ["AI Integration", "Workflow Automation", "n8n", "GPT"], image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90", results: [{ label: "Hours Saved/Week", value: "32 hrs" }, { label: "Report Time", value: "-95%" }, { label: "Response Time", value: "< 2 min" }, { label: "ROI in 3 Months", value: "6.1x" }], services: ["Workflow Automation", "AI Integration", "Custom GPT"], year: "2024", duration: "6 weeks", status: "published", featured: true, createdAt: "2024-09-01T00:00:00Z", updatedAt: "2024-09-01T00:00:00Z" },
  { id: "ai-chatbot", title: "SwiftServe AI Chatbot", tagline: "24/7 support. Zero extra headcount.", overview: "Custom AI chatbot for a D2C e-commerce brand handling 80,000+ monthly orders to scale support without hiring.", challenge: "1,200+ tickets/day during sales, 48-hour response times, declining customer satisfaction.", solution: "Custom AI chatbot trained on product catalog, FAQ, return policy, and order data — integrated with Shopify and Zendesk.", serviceId: "ai", subServiceId: "chatbots", category: "AI Automation Solutions", subCategory: "AI Chatbots", tags: ["AI Chatbot", "Customer Support", "Lead Capture", "NLP"], image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=90", results: [{ label: "Tickets Resolved", value: "78%" }, { label: "Avg Response", value: "< 30 sec" }, { label: "Team Hires", value: "0" }, { label: "CSAT Score", value: "4.7/5" }], services: ["AI Chatbot", "Shopify Integration", "NLP Training"], year: "2024", duration: "5 weeks", status: "published", featured: false, createdAt: "2024-10-01T00:00:00Z", updatedAt: "2024-10-01T00:00:00Z" },
  { id: "design-internship", title: "Design Internship Cohort 01", tagline: "12 students. 8 weeks. Industry-ready portfolios.", overview: "Structured design internship program for 12 aspiring designers covering UI/UX, branding, and real client delivery.", challenge: "Graduates have academic projects but no client-facing experience — agencies won't hire without portfolios.", solution: "Program structured around live client briefs, weekly critiques, tool masterclasses, and 1-on-1 mentorship.", serviceId: "mentorship", subServiceId: "internship", category: "Mentorship & Career Guidance", subCategory: "Internship Programs", tags: ["Internship", "UI/UX Design", "Branding", "Training"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=90", results: [{ label: "Interns Trained", value: "12" }, { label: "Placed", value: "9/12" }, { label: "Avg Stipend", value: "₹18k/mo" }, { label: "Projects Shipped", value: "28" }], services: ["Internship Program", "Design Training", "Portfolio Building"], year: "2024", duration: "8 weeks", status: "published", featured: false, createdAt: "2024-11-01T00:00:00Z", updatedAt: "2024-11-01T00:00:00Z" },
];

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadProjects(): StoredProject[] {
  ensureDataDir();
  if (!existsSync(PROJECTS_FILE)) {
    saveProjects(SEED);
    return SEED;
  }
  try {
    return JSON.parse(readFileSync(PROJECTS_FILE, "utf-8"));
  } catch {
    return SEED;
  }
}

export function saveProjects(projects: StoredProject[]): void {
  ensureDataDir();
  writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

export function getProjects(): StoredProject[] {
  return loadProjects();
}

export function getPublishedProjects(): StoredProject[] {
  return loadProjects().filter((p) => p.status === "published");
}

export function getProjectById(id: string): StoredProject | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function createProject(data: Omit<StoredProject, "createdAt" | "updatedAt">): StoredProject {
  const projects = loadProjects();
  const now = new Date().toISOString();
  const project: StoredProject = { ...data, createdAt: now, updatedAt: now };
  projects.unshift(project);
  saveProjects(projects);
  return project;
}

export function updateProject(id: string, data: Partial<StoredProject>): StoredProject | null {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
  saveProjects(projects);
  return projects[idx];
}

export function deleteProject(id: string): boolean {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  projects.splice(idx, 1);
  saveProjects(projects);
  return true;
}
