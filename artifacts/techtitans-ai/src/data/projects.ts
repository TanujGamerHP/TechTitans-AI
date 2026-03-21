export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  coverImage: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  services: string[];
  year: string;
  duration: string;
}

export const projects: Project[] = [
  {
    id: "aura-fintech",
    title: "Aura Fintech",
    category: "Web Development",
    tags: ["React", "Node.js", "UI/UX", "Dashboard"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90",
    tagline: "Reimagining the future of financial dashboards.",
    overview:
      "Aura Fintech needed a next-generation web platform that could visualize complex financial data in real time, serve thousands of concurrent users, and look stunning doing it. We designed and built their entire frontend and backend from scratch.",
    challenge:
      "Their legacy platform was slow, confusing, and losing users to competitors with cleaner UX. They needed a complete overhaul — fast — without disrupting existing customers.",
    solution:
      "We built a modular React dashboard with real-time WebSocket data feeds, animated chart components, and a clean glassmorphism design system. The backend was re-architected using Node.js microservices with Redis caching to handle peak loads.",
    results: [
      { label: "User Retention", value: "+62%" },
      { label: "Load Time", value: "0.8s" },
      { label: "Daily Active Users", value: "18k+" },
      { label: "Bug Reports", value: "-91%" },
    ],
    services: ["Web Development", "UI/UX Design", "Backend Architecture"],
    year: "2024",
    duration: "3 months",
  },
  {
    id: "neon-dynamics",
    title: "Neon Dynamics",
    category: "Branding",
    tags: ["Brand Identity", "Logo", "Visual System", "Neon"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=90",
    tagline: "A brand identity that charges up every room it enters.",
    overview:
      "Neon Dynamics is an emerging tech hardware company that needed a brand identity that would resonate with Gen Z gamers and pro creators alike. We created their complete visual language from the ground up.",
    challenge:
      "The client had zero brand recognition and was about to launch at a major trade show. They needed a striking identity that could work across merch, screens, and physical packaging in 6 weeks.",
    solution:
      "We developed a high-contrast visual system built on electric neon colors, custom glitch-style typography, and modular logo variants. Every asset was delivered production-ready for both digital and print.",
    results: [
      { label: "Brand Recall (Survey)", value: "87%" },
      { label: "Trade Show Leads", value: "340+" },
      { label: "Assets Delivered", value: "120+" },
      { label: "Turnaround", value: "6 weeks" },
    ],
    services: ["Brand Identity", "Logo Design", "Packaging Design", "Typography"],
    year: "2024",
    duration: "6 weeks",
  },
  {
    id: "pulse-energy",
    title: "Pulse Energy",
    category: "Video Editing",
    tags: ["Motion Graphics", "YouTube", "Brand Films", "Ads"],
    image: "https://images.unsplash.com/photo-1535016120720-40c746a5024b?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1535016120720-40c746a5024b?w=1600&q=90",
    tagline: "Content that converts — at the speed of light.",
    overview:
      "Pulse Energy, a sustainable energy startup, hired us to build their entire video content pipeline — from product explainer videos and social ads to long-form YouTube content and investor pitch films.",
    challenge:
      "They had raw footage but no editing team, no visual style, and a product launch deadline in 8 weeks. The content needed to educate while entertaining a skeptical, tech-savvy audience.",
    solution:
      "We created a signature motion-graphic style using their brand colors, built templates for consistent output, and edited 14 videos across formats — from 15-second Instagram reels to a 6-minute YouTube documentary.",
    results: [
      { label: "Total Views (30 days)", value: "2.4M" },
      { label: "Watch Time", value: "+210%" },
      { label: "Subscriber Growth", value: "+8,300" },
      { label: "Videos Delivered", value: "14" },
    ],
    services: ["Video Editing", "Motion Graphics", "Script Consulting", "Color Grading"],
    year: "2024",
    duration: "8 weeks",
  },
  {
    id: "vertex-ai",
    title: "Vertex AI",
    category: "Graphic Design",
    tags: ["Infographics", "UI Graphics", "AI Product", "3D"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90",
    tagline: "Designing the visual language of artificial intelligence.",
    overview:
      "Vertex AI is an enterprise AI platform that processes network data at scale. They needed a complete visual overhaul of their product — from in-app UI graphics and iconography to marketing illustrations and pitch deck visuals.",
    challenge:
      "AI products are notoriously hard to visualize in a way that's both accurate and accessible. Their existing visuals were bland stock art that failed to communicate their technical edge.",
    solution:
      "We designed a bespoke library of 3D-rendered data visualizations, custom icon sets, and animated infographics. Each asset was built to work seamlessly inside their React frontend and in marketing materials.",
    results: [
      { label: "Demo Conversion Rate", value: "+44%" },
      { label: "Assets Created", value: "200+" },
      { label: "Investor Deck Score", value: "9.2/10" },
      { label: "Design Delivery", value: "On time" },
    ],
    services: ["Graphic Design", "Iconography", "3D Illustration", "Pitch Deck Design"],
    year: "2023",
    duration: "4 months",
  },
  {
    id: "lumina-lifestyle",
    title: "Lumina Lifestyle",
    category: "Web & Branding",
    tags: ["E-Commerce", "Brand Identity", "Shopify", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=90",
    tagline: "Elegant by design. Powerful by default.",
    overview:
      "Lumina Lifestyle is a premium wellness and lifestyle brand launching their DTC (direct-to-consumer) e-commerce store. We were responsible for their full brand identity and a custom Shopify storefront.",
    challenge:
      "The founder had a strong product but no brand foundation. The store needed to feel luxury, load fast on mobile, and convert first-time visitors — all before a Black Friday launch.",
    solution:
      "We built their brand system around a minimal serif identity with warm ivory tones and gold accents. The Shopify store was built with custom liquid templates, optimized for mobile-first performance and conversion rate.",
    results: [
      { label: "Launch Day Revenue", value: "$24k" },
      { label: "Mobile Conversion", value: "4.8%" },
      { label: "Avg. Session Duration", value: "3m 42s" },
      { label: "Cart Abandonment", value: "-38%" },
    ],
    services: ["Brand Identity", "Web Development", "Shopify", "UI/UX Design"],
    year: "2023",
    duration: "10 weeks",
  },
  {
    id: "quantum-vr",
    title: "Quantum VR",
    category: "Complete Package",
    tags: ["VR", "Branding", "Web App", "Motion"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90",
    tagline: "The complete digital identity for the next dimension.",
    overview:
      "Quantum VR is a virtual reality studio building immersive enterprise training simulations. They engaged us for our complete package — branding, web development, graphic design, and video content — to launch their platform.",
    challenge:
      "No one on their team had marketing experience. They needed everything built from zero and needed it to look like an established, trusted brand to win enterprise clients from day one.",
    solution:
      "We delivered an end-to-end brand ecosystem: a dark futuristic identity, a Three.js-powered interactive website, a full motion graphics library, and a 5-minute cinematic brand film — all in under 12 weeks.",
    results: [
      { label: "Enterprise Pilots Signed", value: "7" },
      { label: "Website Traffic (M1)", value: "52k visits" },
      { label: "Press Features", value: "4 outlets" },
      { label: "Fundraising Round", value: "$1.2M" },
    ],
    services: ["Brand Identity", "Web Development", "Video Production", "Graphic Design"],
    year: "2024",
    duration: "12 weeks",
  },
];
