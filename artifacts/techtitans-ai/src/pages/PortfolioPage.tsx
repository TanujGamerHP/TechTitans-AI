import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const FILTERS = [
  { label: "All Work", value: "all" },
  { label: "Branding & Marketing", value: "branding" },
  { label: "Web & App Dev", value: "web" },
  { label: "Video", value: "video" },
  { label: "Infrastructure", value: "infrastructure" },
  { label: "Mentorship", value: "mentorship" },
  { label: "AI Automation", value: "ai" },
];

export default function PortfolioPage() {
  const [, navigate] = useLocation();
  const [active, setActive] = useState("all");
  const { data: projects = [], isLoading } = useProjects();

  const filtered = active === "all" ? projects : projects.filter((p: any) => p.serviceId === active);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Work</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Every Project, <br />
            <span className="text-gradient">A Story Told.</span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            We don't just deliver files — we deliver results. Explore our case studies and see the strategy, craft, and outcomes behind every project.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                active === f.value
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "border-white/10 bg-white/5 text-foreground-muted hover:border-white/30 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24 text-foreground-muted">
            <Loader2 className="w-6 h-6 animate-spin mr-3" /> Loading projects...
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => navigate(`/portfolio/${project.id}`)}
                className="group cursor-pointer"
              >
                <div className="rounded-3xl overflow-hidden glass-card relative">
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                      style={{ objectPosition: project.imagePosition || "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                        {project.subCategory}
                      </span>
                    </div>
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-accent text-sm font-semibold mb-2">{project.year} · {project.duration}</p>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-foreground-muted text-sm mb-6 line-clamp-2">{project.tagline}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      {project.results.slice(0, 2).map((result) => (
                        <div key={result.label}>
                          <p className="text-2xl font-display font-bold text-gradient">{result.value}</p>
                          <p className="text-xs text-foreground-muted mt-1">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-foreground-muted">
            <p className="text-lg">No projects yet in this category.</p>
            <p className="text-sm mt-2">We're completing work in this area — check back soon.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
