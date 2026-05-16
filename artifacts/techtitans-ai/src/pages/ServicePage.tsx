import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { servicesData } from "@/data/servicesData";

export default function ServicePage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const service = servicesData.find((s) => s.id === params.id);

  if (!service) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Service not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Back to Home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[75vh] min-h-[550px] overflow-hidden">
        <img src={service.heroImage} alt={service.shortTitle} className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, transparent)` }} />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full blur-[60px] opacity-15" style={{ background: `linear-gradient(135deg, transparent, ${service.gradientTo})` }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => navigate("/#services")}
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Services
            </button>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold border border-white/20 bg-white/5 text-white mb-5 backdrop-blur-sm">
              {service.shortTitle}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight max-w-4xl">
              {service.title}
            </h1>
            <p className="text-foreground-muted text-lg md:text-xl max-w-2xl">{service.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">

        {/* Sub-services Grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-24">
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">What's Included</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">Our {service.shortTitle} Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.subServices.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-4 text-lg font-bold text-white`}>
                  {sub.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                  {sub.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{sub.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Portfolio</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Projects</h2>
            </div>
            <button
              onClick={() => navigate("/portfolio")}
              className="hidden md:inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors group text-sm"
            >
              View All Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.demoProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                onClick={() => navigate("/portfolio")}
                className="group cursor-pointer glass-card rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      {project.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-16 text-center"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 rounded-3xl`} />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, transparent)` }} />

          <div className="relative z-10">
            <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Ready to Start?</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
              Let's Build Something <span className="text-gradient">Exceptional Together.</span>
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto mb-8">
              Get in touch today for a free consultation. We'll understand your goals and show you exactly how we can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/#contact")}
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/portfolio")}
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:border-white/40 hover:bg-white/10 transition-all duration-300"
              >
                View Our Portfolio
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}
