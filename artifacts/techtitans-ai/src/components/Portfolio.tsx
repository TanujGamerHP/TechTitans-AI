import { useLocation } from "wouter";
import { FadeIn } from "./ui/fade-in";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

export function Portfolio() {
  const [, navigate] = useLocation();
  const { data: allProjects = [], isLoading } = useProjects();

  // Show up to 6 published projects — featured ones first
  const projects = [...allProjects]
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  return (
    <section id="portfolio" className="py-24 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              Our <span className="text-gradient">Work</span>
            </h2>
            <p className="text-foreground-muted max-w-xl">
              A selection of our latest projects. We push the boundaries of design and technology to deliver outstanding results.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <button
              onClick={() => navigate("/portfolio")}
              className="text-white font-medium inline-flex items-center gap-2 hover:text-primary transition-colors group"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-foreground-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading projects...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.1 * (index + 1)}>
                <div
                  onClick={() => navigate(`/portfolio/${project.id}`)}
                  className="group relative rounded-3xl overflow-hidden glass-card cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-accent text-sm font-semibold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white flex items-center justify-between">
                        {project.title}
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                      </h3>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 text-foreground-muted">
            <p>No published projects yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
