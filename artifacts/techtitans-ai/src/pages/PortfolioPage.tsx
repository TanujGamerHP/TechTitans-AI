import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Loader2, Layers } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";
import { servicesData } from "@/data/servicesData";

const SERVICE_FILTERS = [
  { label: "All Work", value: "all", icon: "◈", color: "from-white/20 to-white/5" },
  ...servicesData.map((s) => ({ label: s.shortTitle, value: s.id, icon: s.subServices[0]?.icon ?? "✦", color: s.color })),
];

export default function PortfolioPage() {
  const [, navigate] = useLocation();
  const [active, setActive] = useState("all");
  const { data: allProjects = [], isLoading } = useProjects();

  const filtered = active === "all" ? allProjects : allProjects.filter((p: any) => p.serviceId === active);
  const activeService = servicesData.find((s) => s.id === active);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Work</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-5 leading-tight">
            Every Project, <br />
            <span className="text-gradient">A Story Told.</span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            We don't just deliver files — we deliver results. Choose a service category to explore case studies from that domain.
          </p>
        </motion.div>

        {/* ── Category Cards — same visual approach as services section ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {SERVICE_FILTERS.map((f, i) => {
              const count = f.value === "all" ? allProjects.length : allProjects.filter((p: any) => p.serviceId === f.value).length;
              const isActive = active === f.value;
              return (
                <motion.button
                  key={f.value}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  onClick={() => setActive(f.value)}
                  className={`group relative glass-card rounded-2xl p-4 text-left transition-all duration-300 border ${
                    isActive
                      ? "border-primary/50 shadow-lg shadow-primary/15 scale-[1.02]"
                      : "border-white/8 hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  {isActive && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.color} opacity-10`} />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-sm font-bold text-white mb-3 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90"} transition-opacity`}>
                    {f.value === "all" ? <Layers className="w-4 h-4" /> : f.icon}
                  </div>
                  <p className={`relative z-10 text-xs font-semibold leading-tight transition-colors ${isActive ? "text-white" : "text-foreground-muted group-hover:text-white"}`}>
                    {f.label}
                  </p>
                  {count > 0 && (
                    <p className={`relative z-10 text-xs mt-1 font-medium ${isActive ? "text-primary" : "text-foreground-muted/60"}`}>
                      {count} project{count !== 1 ? "s" : ""}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active category context bar */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 mb-10 px-5 py-3 rounded-2xl glass-card border border-white/8"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeService.color} flex items-center justify-center text-sm text-white font-bold flex-shrink-0`}>
                {activeService.subServices[0]?.icon}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold">{activeService.shortTitle}</p>
                <p className="text-foreground-muted text-xs truncate">{activeService.description}</p>
              </div>
              <button
                onClick={() => navigate(`/services/${activeService.id}`)}
                className="ml-auto flex-shrink-0 flex items-center gap-1.5 text-xs text-primary hover:text-white transition-colors font-medium"
              >
                View Service Page <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 text-foreground-muted">
            <Loader2 className="w-6 h-6 animate-spin mr-3" /> Loading projects...
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {filtered.map((project: any, index: number) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    onClick={() => navigate(`/portfolio/${project.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="rounded-3xl overflow-hidden glass-card relative">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto block opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                        {activeService && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${activeService.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        )}
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

                        {project.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.results?.length >= 2 && (
                          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                            {project.results.slice(0, 2).map((result: any) => (
                              <div key={result.label}>
                                <p className="text-2xl font-display font-bold text-gradient">{result.value}</p>
                                <p className="text-xs text-foreground-muted mt-1">{result.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-3xl p-16 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeService?.color || "from-white/10 to-white/5"} flex items-center justify-center text-2xl mx-auto mb-5`}>
                  {activeService ? activeService.subServices[0]?.icon : "◈"}
                </div>
                <p className="text-white text-lg font-semibold mb-2">
                  {active === "all" ? "No projects yet" : `No ${activeService?.shortTitle} projects yet`}
                </p>
                <p className="text-foreground-muted text-sm max-w-sm mx-auto mb-6">
                  {active === "all"
                    ? "Projects added from the admin panel will appear here instantly once published."
                    : `Projects tagged under ${activeService?.shortTitle} in the admin panel will appear here once published.`}
                </p>
                {activeService && (
                  <button
                    onClick={() => navigate(`/services/${activeService.id}`)}
                    className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
                  >
                    Explore {activeService.shortTitle} services <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      <Footer />
    </main>
  );
}
