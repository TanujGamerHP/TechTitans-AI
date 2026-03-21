import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

export default function PortfolioPage() {
  const [, navigate] = useLocation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Work</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Every Project, <br />
            <span className="text-gradient">A Story Told.</span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            We don't just deliver files — we deliver results. Explore our case studies and see the
            strategy, craft, and outcomes behind every project.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Arrow Icon */}
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results Preview */}
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
