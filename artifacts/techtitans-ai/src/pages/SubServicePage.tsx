import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { servicesData } from "@/data/servicesData";
import { useProjects } from "@/hooks/useProjects";

export default function SubServicePage() {
  const params = useParams<{ serviceId: string; subServiceId: string }>();
  const [, navigate] = useLocation();

  const service = servicesData.find((s) => s.id === params.serviceId);
  const subService = service?.subServices.find((ss) => ss.id === params.subServiceId);

  const { data: allProjects = [], isLoading } = useProjects();

  const filteredProjects = allProjects.filter(
    (p: any) => p.serviceId === params.serviceId && p.subServiceId === params.subServiceId
  );
  const allServiceProjects = allProjects.filter((p: any) => p.serviceId === params.serviceId);
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : allServiceProjects;

  if (!service || !subService) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Back to Home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, transparent 60%)` }} />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-[120px] opacity-15" style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})` }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground-muted mb-10 flex-wrap">
            <button onClick={() => navigate("/")} className="hover:text-white transition-colors">Home</button>
            <span className="opacity-40">›</span>
            <button onClick={() => navigate(`/services/${service.id}`)} className="hover:text-white transition-colors">{service.shortTitle}</button>
            <span className="opacity-40">›</span>
            <span className="text-white">{subService.title}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} items-center justify-center text-lg font-bold text-white mb-5`}>
              {subService.icon}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
              {subService.title}
            </h1>
            <p className="text-foreground-muted text-lg md:text-xl max-w-2xl mb-4">{subService.description}</p>
            <div className="flex items-center gap-3">
              <div className={`h-0.5 w-12 bg-gradient-to-r ${service.color} rounded-full`} />
              <span className="text-sm text-foreground-muted">{service.shortTitle}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-foreground-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading projects…
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-2">Our Work</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  {filteredProjects.length > 0 ? `${subService.title} Projects` : `${service.shortTitle} Projects`}
                </h2>
              </div>
              {displayProjects.length > 0 && (
                <span className="text-foreground-muted text-sm">{displayProjects.length} project{displayProjects.length !== 1 ? "s" : ""}</span>
              )}
            </div>

            {displayProjects.length === 0 ? (
              <div className="glass-card rounded-3xl p-16 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl mx-auto mb-4`}>
                  {subService.icon}
                </div>
                <p className="text-white text-lg font-semibold mb-2">Projects coming soon</p>
                <p className="text-foreground-muted text-sm mb-6 max-w-sm mx-auto">
                  We're completing work in this area — add projects from the admin panel and they'll appear here instantly.
                </p>
                <button
                  onClick={() => navigate("/portfolio")}
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                >
                  View All Work <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayProjects.map((project: any, index: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => navigate(`/portfolio/${project.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="glass-card rounded-3xl overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto block opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            {project.subCategory}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="p-7">
                        <p className="text-accent text-xs font-semibold mb-2">{project.year} · {project.duration}</p>
                        <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-foreground-muted text-sm mb-5 line-clamp-2">{project.tagline}</p>

                        {project.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.results?.length >= 2 && (
                          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/10">
                            {project.results.slice(0, 2).map((r: any) => (
                              <div key={r.label}>
                                <p className="text-xl font-display font-bold text-gradient">{r.value}</p>
                                <p className="text-xs text-foreground-muted mt-0.5">{r.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 glass-card rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-3xl`} />
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-bold mb-3">
              Need <span className="text-gradient">{subService.title}</span>?
            </h3>
            <p className="text-foreground-muted mb-6 max-w-md mx-auto">Let's talk about what you're building and how we can help you get there.</p>
            <button
              onClick={() => navigate("/#contact")}
              className={`inline-flex items-center gap-2 py-3 px-7 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300`}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
