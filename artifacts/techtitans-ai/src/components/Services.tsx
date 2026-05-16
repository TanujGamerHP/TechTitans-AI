import { Megaphone, Code2, Video, Server, GraduationCap, Bot } from "lucide-react";
import { FadeIn } from "./ui/fade-in";

const services = [
  {
    title: "Creative Branding & Marketing",
    description: "Build a brand that commands attention and drives growth.",
    subServices: ["Logo Design", "Brand Identity", "Social Media Design", "Product Packaging", "Banner & Editorial Design", "Marketing Creatives"],
    icon: Megaphone,
    color: "from-purple-500 to-indigo-500",
    delay: 0.1,
  },
  {
    title: "Web & App Development",
    description: "Blazing-fast, stunning digital products built to convert.",
    subServices: ["Business Websites", "Landing Pages", "E-commerce Stores", "Custom Web Apps", "Portfolio Websites", "Mobile UI Design"],
    icon: Code2,
    color: "from-primary to-accent",
    delay: 0.2,
  },
  {
    title: "Video Production & Editing",
    description: "Cinematic, high-retention content for every platform.",
    subServices: ["Reels Editing", "Long-form Video Editing", "Motion Graphics", "Promotional Videos", "Cinematic Editing"],
    icon: Video,
    color: "from-pink-500 to-rose-500",
    delay: 0.3,
  },
  {
    title: "Digital Infrastructure",
    description: "Reliable backend systems keeping your business always online.",
    subServices: ["Server Management", "Domain Setup", "Website Maintenance", "Hosting Support", "Security Monitoring", "Performance Optimization"],
    icon: Server,
    color: "from-amber-500 to-orange-500",
    delay: 0.4,
  },
  {
    title: "Mentorship & Career Guidance",
    description: "Empowering the next generation of digital professionals.",
    subServices: ["Internship Programs", "Placement Guidance", "Personalized Learning", "Portfolio Reviews", "Career Mentorship"],
    icon: GraduationCap,
    color: "from-green-500 to-teal-500",
    delay: 0.5,
  },
  {
    title: "AI Automation Solutions",
    description: "Intelligent workflows that eliminate manual work at scale.",
    subServices: ["Workflow Automation", "AI Chatbots & Assistants", "Lead Automation", "CRM Automation", "Business Process Automation"],
    icon: Bot,
    color: "from-cyan-500 to-blue-500",
    delay: 0.6,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            What We <span className="text-gradient">Do</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Six core service pillars — each built to elevate your brand, accelerate your growth, and deliver world-class results.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={service.delay}>
              <div className="glass-card glow-border group rounded-3xl p-8 lg:p-10 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden flex-shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <service.icon className="w-7 h-7 text-white relative z-10" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {service.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Sub-services */}
                <ul className="mt-auto space-y-1.5">
                  {service.subServices.map((sub) => (
                    <li key={sub} className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.color} flex-shrink-0`} />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
