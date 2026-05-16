export interface DemoProject {
  title: string;
  image: string;
  tag: string;
}

export interface SubService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceData {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  heroImage: string;
  subServices: SubService[];
  demoProjects: DemoProject[];
}

export const servicesData: ServiceData[] = [
  {
    id: "branding",
    shortTitle: "Creative Branding & Marketing",
    title: "Creative Branding That Makes Businesses Unforgettable.",
    tagline: "Your brand is your biggest asset. We build it to last.",
    description:
      "We craft complete brand identities that command attention — from logo design and packaging to full marketing creative systems that drive growth across every channel.",
    color: "from-purple-500 to-indigo-500",
    gradientFrom: "rgba(139,92,246,0.15)",
    gradientTo: "rgba(99,102,241,0.05)",
    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=90",
    subServices: [
      { id: "logo", title: "Logo Design", description: "Distinctive, timeless logos built to own their space in any market.", icon: "✦" },
      { id: "social", title: "Social Media Design", description: "Scroll-stopping creatives designed for Instagram, LinkedIn, and beyond.", icon: "◈" },
      { id: "packaging", title: "Product Packaging Design", description: "Packaging that sells before the product is even opened.", icon: "⬡" },
      { id: "label", title: "Label Design", description: "Premium label design for products that stand out on shelves.", icon: "◉" },
      { id: "banner", title: "Banner Design", description: "High-impact banners for digital ads, events, and storefronts.", icon: "▣" },
      { id: "editorial", title: "Editorial Design", description: "E-books, digital magazines, and PDF presentations crafted with precision.", icon: "◫" },
      { id: "identity", title: "Brand Identity", description: "Complete visual systems — colors, typography, guidelines, and brand voice.", icon: "⬟" },
      { id: "marketing", title: "Marketing Creatives", description: "Ad creatives, campaign assets, and promotional materials that convert.", icon: "◆" },
    ],
    demoProjects: [
      { title: "Organic Honey Packaging", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80", tag: "Packaging" },
      { title: "Luxury Coffee Branding", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", tag: "Brand Identity" },
      { title: "Fitness Supplement Label", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80", tag: "Label Design" },
      { title: "Minimal Skincare Brand", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", tag: "Brand Identity" },
    ],
  },
  {
    id: "web",
    shortTitle: "Web & App Development",
    title: "Digital Products Built to Perform at the Highest Level.",
    tagline: "From concept to launch — fast, beautiful, and scalable.",
    description:
      "We design and develop websites, web apps, and e-commerce stores that load fast, look stunning, and convert visitors into customers. Every pixel is intentional.",
    color: "from-blue-500 to-cyan-500",
    gradientFrom: "rgba(59,130,246,0.15)",
    gradientTo: "rgba(34,211,238,0.05)",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90",
    subServices: [
      { id: "business", title: "Business Websites", description: "Professional, conversion-optimized websites for growing businesses.", icon: "◈" },
      { id: "portfolio", title: "Portfolio Websites", description: "Stunning personal or agency portfolios that win clients.", icon: "⬡" },
      { id: "landing", title: "Landing Pages", description: "High-converting landing pages designed to capture leads and close sales.", icon: "▣" },
      { id: "ecommerce", title: "E-commerce Stores", description: "Full-featured online stores built on Shopify, WooCommerce, or custom stacks.", icon: "◉" },
      { id: "webapp", title: "Custom Web Apps", description: "Scalable SaaS platforms and web applications built with modern stacks.", icon: "⬟" },
      { id: "mobileui", title: "Mobile UI Design", description: "Beautiful mobile-first UI/UX design for iOS and Android applications.", icon: "◆" },
    ],
    demoProjects: [
      { title: "AI SaaS Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", tag: "Web App" },
      { title: "Luxury Hotel Website", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", tag: "Business Website" },
      { title: "Creative Agency Portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", tag: "Portfolio" },
      { title: "Startup Landing Page", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", tag: "Landing Page" },
    ],
  },
  {
    id: "video",
    shortTitle: "Video Production & Editing",
    title: "Cinematic Video Content That Stops Scrolling.",
    tagline: "Content that converts — at the speed of light.",
    description:
      "We create and edit video content that grabs attention, holds it, and drives action. From reels to long-form documentaries, every frame is crafted with purpose.",
    color: "from-pink-500 to-rose-500",
    gradientFrom: "rgba(236,72,153,0.15)",
    gradientTo: "rgba(244,63,94,0.05)",
    heroImage: "https://images.unsplash.com/photo-1535016120720-40c746a5024b?w=1600&q=90",
    subServices: [
      { id: "reels", title: "Reels Editing", description: "Hook-optimized Instagram and YouTube Shorts reels that go viral.", icon: "◈" },
      { id: "longform", title: "Long-form Video Editing", description: "Documentary-quality editing for YouTube, courses, and brand films.", icon: "⬡" },
      { id: "motion", title: "Motion Graphics", description: "Animated titles, transitions, and brand elements that elevate production value.", icon: "◉" },
      { id: "promo", title: "Promotional Videos", description: "Product and service promo videos that convert viewers into buyers.", icon: "▣" },
      { id: "cinematic", title: "Cinematic Editing", description: "High-end color grading and cinematic treatment for premium productions.", icon: "◆" },
    ],
    demoProjects: [
      { title: "Real Estate Cinematic Reel", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", tag: "Reels" },
      { title: "Fitness Brand Promo", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", tag: "Promotional" },
      { title: "YouTube Documentary Edit", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80", tag: "Long-form" },
      { title: "Product Launch Film", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80", tag: "Cinematic" },
    ],
  },
  {
    id: "infrastructure",
    shortTitle: "Digital Infrastructure",
    title: "Reliable Infrastructure That Keeps Your Business Always Online.",
    tagline: "Your digital backbone — built secure, fast, and resilient.",
    description:
      "From server management and domain setup to security monitoring and performance optimization, we handle the technical foundation so you can focus on growing your business.",
    color: "from-amber-500 to-orange-500",
    gradientFrom: "rgba(245,158,11,0.15)",
    gradientTo: "rgba(249,115,22,0.05)",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90",
    subServices: [
      { id: "server", title: "Server Management", description: "Dedicated server setup, configuration, and ongoing management for peak performance.", icon: "◈" },
      { id: "domain", title: "Domain Setup", description: "Domain registration, DNS configuration, and email setup done right the first time.", icon: "⬡" },
      { id: "maintenance", title: "Website Maintenance", description: "Regular updates, backups, and proactive monitoring to keep your site healthy.", icon: "◉" },
      { id: "hosting", title: "Hosting Support", description: "Optimized hosting solutions with fast load times and 99.9% uptime.", icon: "▣" },
      { id: "security", title: "Security Monitoring", description: "24/7 threat detection, SSL management, and security hardening for your digital assets.", icon: "⬟" },
      { id: "performance", title: "Performance Optimization", description: "Speed audits, CDN setup, and code optimization to make your site lightning-fast.", icon: "◆" },
    ],
    demoProjects: [
      { title: "Enterprise Server Migration", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", tag: "Server" },
      { title: "E-commerce Security Audit", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80", tag: "Security" },
      { title: "SaaS Performance Overhaul", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", tag: "Performance" },
      { title: "Multi-domain Setup & DNS", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80", tag: "Domain" },
    ],
  },
  {
    id: "mentorship",
    shortTitle: "Mentorship & Career Guidance",
    title: "Empowering the Next Generation of Digital Professionals.",
    tagline: "Real skills. Real guidance. Real careers.",
    description:
      "We offer structured mentorship programs, internship opportunities, and personalized career guidance to help aspiring designers, developers, and creators break into the industry.",
    color: "from-green-500 to-teal-500",
    gradientFrom: "rgba(34,197,94,0.15)",
    gradientTo: "rgba(20,184,166,0.05)",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90",
    subServices: [
      { id: "internship", title: "Internship Programs", description: "Hands-on internship programs in design, development, video, and marketing.", icon: "◈" },
      { id: "placement", title: "Placement Guidance", description: "Resume reviews, interview prep, and direct placement support for top talent.", icon: "⬡" },
      { id: "learning", title: "Personalized Learning Sessions", description: "1-on-1 and group learning sessions tailored to your skill level and goals.", icon: "◉" },
      { id: "portfolioreview", title: "Portfolio Reviews", description: "Expert critique and improvement of your creative or development portfolio.", icon: "▣" },
      { id: "career", title: "Career Mentorship", description: "Long-term mentorship relationships with industry professionals who've been there.", icon: "◆" },
    ],
    demoProjects: [
      { title: "Design Internship Batch", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80", tag: "Internship" },
      { title: "Developer Career Cohort", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", tag: "Career" },
      { title: "Portfolio Review Program", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", tag: "Portfolio" },
      { title: "1-on-1 Mentorship Sessions", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80", tag: "Mentorship" },
    ],
  },
  {
    id: "ai",
    shortTitle: "AI Automation Solutions",
    title: "Intelligent Automation That Works While You Sleep.",
    tagline: "Turn 40-hour workweeks into automated pipelines.",
    description:
      "We build AI-powered workflows, chatbots, and automation systems that eliminate manual work, accelerate operations, and let your team focus on what actually matters.",
    color: "from-cyan-500 to-blue-500",
    gradientFrom: "rgba(34,211,238,0.15)",
    gradientTo: "rgba(59,130,246,0.05)",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90",
    subServices: [
      { id: "workflow", title: "Workflow Automation", description: "End-to-end automation of repetitive business processes using no-code and AI tools.", icon: "◈" },
      { id: "chatbots", title: "AI Chatbots", description: "Intelligent chatbots that handle customer support, lead capture, and FAQs 24/7.", icon: "⬡" },
      { id: "assistants", title: "AI Assistants", description: "Custom GPT-powered assistants built for your team's specific workflows.", icon: "◉" },
      { id: "leads", title: "Lead Automation", description: "Automated lead capture, scoring, and nurturing pipelines that sell while you sleep.", icon: "▣" },
      { id: "crm", title: "CRM Automation", description: "Seamless CRM integrations that auto-update records, send follow-ups, and track deals.", icon: "⬟" },
      { id: "process", title: "Business Process Automation", description: "Full business process mapping and automation for maximum operational efficiency.", icon: "◆" },
    ],
    demoProjects: [
      { title: "AI Lead Generation System", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", tag: "Lead Automation" },
      { title: "AI Chatbot Dashboard", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80", tag: "Chatbot" },
      { title: "CRM Automation Pipeline", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", tag: "CRM" },
      { title: "Business Process Overhaul", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", tag: "Automation" },
    ],
  },
];
