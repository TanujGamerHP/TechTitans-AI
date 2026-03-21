import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

export default function CaseStudy() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const project = projects.find((p) => p.id === params.id);
  const otherProjects = projects.filter((p) => p.id !== params.id).slice(0, 2);

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Project not found</h1>
          <button onClick={() => navigate("/portfolio")} className="text-primary hover:underline">
            Back to Portfolio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Cover */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </button>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/40 text-primary">
                {project.category}
              </span>
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-foreground-muted text-xl md:text-2xl max-w-2xl">{project.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-8 glass-card rounded-3xl"
        >
          <div>
            <p className="text-foreground-muted text-xs uppercase tracking-widest mb-2">Category</p>
            <p className="text-white font-semibold">{project.category}</p>
          </div>
          <div>
            <p className="text-foreground-muted text-xs uppercase tracking-widest mb-2 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Year
            </p>
            <p className="text-white font-semibold">{project.year}</p>
          </div>
          <div>
            <p className="text-foreground-muted text-xs uppercase tracking-widest mb-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Duration
            </p>
            <p className="text-white font-semibold">{project.duration}</p>
          </div>
          <div>
            <p className="text-foreground-muted text-xs uppercase tracking-widest mb-2">Services</p>
            <p className="text-white font-semibold">{project.services.length} services</p>
          </div>
        </motion.div>

        {/* Results Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-8">The Results</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.results.map((result, i) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                  {result.value}
                </p>
                <p className="text-foreground-muted text-sm">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Study Text */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-12"
          >
            <div>
              <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Overview</p>
              <p className="text-foreground-muted text-lg leading-relaxed">{project.overview}</p>
            </div>

            <div>
              <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">The Challenge</p>
              <p className="text-foreground-muted text-lg leading-relaxed">{project.challenge}</p>
            </div>

            <div>
              <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Solution</p>
              <p className="text-foreground-muted text-lg leading-relaxed">{project.solution}</p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <p className="text-foreground-muted text-xs uppercase tracking-widest mb-5">Services Provided</p>
              <ul className="space-y-3">
                {project.services.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-foreground-muted text-xs uppercase tracking-widest mb-5">Tech Stack / Tools</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => navigate("/#contact")}
              className="block w-full text-center py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start a Similar Project
            </a>
          </motion.div>
        </div>

        {/* More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="border-t border-white/10 pt-16">
            <div className="flex items-center justify-between mb-10">
              <p className="text-2xl md:text-3xl font-display font-bold">More Projects</p>
              <button
                onClick={() => navigate("/portfolio")}
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors group text-sm"
              >
                View All
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/portfolio/${p.id}`)}
                  className="group cursor-pointer glass-card rounded-2xl overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-accent text-xs font-semibold mb-1">{p.category}</p>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors flex items-center justify-between">
                      {p.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
