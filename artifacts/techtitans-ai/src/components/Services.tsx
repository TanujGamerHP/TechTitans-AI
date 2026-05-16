import { Megaphone, Code2, Video, Server, GraduationCap, Bot } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const services = [
  {
    id: "branding",
    title: "Creative Branding & Marketing",
    description: "Build a brand that commands attention and drives growth.",
    subServices: ["Logo Design", "Brand Identity", "Social Media Design", "Product Packaging", "Banner & Editorial Design", "Marketing Creatives"],
    icon: Megaphone,
    color: "from-purple-500 to-indigo-500",
    delay: 0.1,
  },
  {
    id: "web",
    title: "Web & App Development",
    description: "Blazing-fast, stunning digital products built to convert.",
    subServices: ["Business Websites", "Landing Pages", "E-commerce Stores", "Custom Web Apps", "Portfolio Websites", "Mobile UI Design"],
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    id: "video",
    title: "Video Production & Editing",
    description: "Cinematic, high-retention content for every platform.",
    subServices: ["Reels Editing", "Long-form Video Editing", "Motion Graphics", "Promotional Videos", "Cinematic Editing"],
    icon: Video,
    color: "from-pink-500 to-rose-500",
    delay: 0.3,
  },
  {
    id: "infrastructure",
    title: "Digital Infrastructure",
    description: "Reliable backend systems keeping your business always online.",
    subServices: ["Server Management", "Domain Setup", "Website Maintenance", "Hosting Support", "Security Monitoring", "Performance Optimization"],
    icon: Server,
    color: "from-amber-500 to-orange-500",
    delay: 0.4,
  },
  {
    id: "mentorship",
    title: "Mentorship & Career Guidance",
    description: "Empowering the next generation of digital professionals.",
    subServices: ["Internship Programs", "Placement Guidance", "Personalized Learning", "Portfolio Reviews", "Career Mentorship"],
    icon: GraduationCap,
    color: "from-green-500 to-teal-500",
    delay: 0.5,
  },
  {
    id: "ai",
    title: "AI Automation Solutions",
    description: "Intelligent workflows that eliminate manual work at scale.",
    subServices: ["Workflow Automation", "AI Chatbots & Assistants", "Lead Automation", "CRM Automation", "Business Process Automation"],
    icon: Bot,
    color: "from-cyan-500 to-blue-500",
    delay: 0.6,
  },
];

export function Services() {
  const [, navigate] = useLocation();

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Six Pillars of <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Six core service pillars — each built to elevate your brand, accelerate your growth, and deliver world-class results.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <FadeIn key={service.id} delay={service.delay}>
              <motion.div
                onClick={() => navigate(`/services/${service.id}`)}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="glass-card glow-border group rounded-3xl p-8 lg:p-10 h-full cursor-pointer flex flex-col relative overflow-hidden"
              >
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />

                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{ boxShadow: `inset 0 0 30px rgba(59,130,246,0.05)` }} />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden flex-shrink-0 group-hover:border-white/20 transition-colors duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <service.icon className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Sub-services */}
                <ul className="mt-auto space-y-1.5 mb-6">
                  {service.subServices.map((sub) => (
                    <li key={sub} className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.color} flex-shrink-0`} />
                      {sub}
                    </li>
                  ))}
                </ul>

                {/* Explore link */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore Service
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
