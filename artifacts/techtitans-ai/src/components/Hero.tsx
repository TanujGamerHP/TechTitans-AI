import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { FadeIn } from "./ui/fade-in";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Animated Glow Blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[128px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none" style={{ animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground-muted">Available for new projects</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1]">
              We Build <br />
              <span className="text-gradient">Digital Excellence</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg sm:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium branding & marketing, video editing, AI automation, product development & project management for startups and creators who want to stand out.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#contact" tabIndex={-1}>
                <Button size="lg" className="w-full sm:w-auto group">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#portfolio" tabIndex={-1}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto glow-border">
                  View Portfolio
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Right Visual */}
        <FadeIn delay={0.5} direction="left" className="relative lg:h-[600px] flex justify-center items-center">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full max-w-md aspect-square"
          >
            {/* Main Glass Card */}
            <div className="absolute inset-0 glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex justify-between items-start z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-primary border-t-accent rounded-full"
                  />
                </div>
                <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/20">
                  AI Powered
                </div>
              </div>

              <div className="relative z-10">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero-visual.png`}
                  alt="3D Abstract AI Visualization"
                  className="w-full h-full object-contain drop-shadow-2xl mix-blend-lighten"
                />
              </div>

              <div className="space-y-2 z-10">
                <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -top-8 -right-8 glass-card p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent" />
              <div className="space-y-1">
                <div className="text-xs text-foreground-muted">Conversion Rate</div>
                <div className="text-sm font-bold text-white">+248%</div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-12 -left-12 glass-card p-4 rounded-2xl"
            >
              <div className="flex items-end gap-2">
                <div className="w-3 h-8 bg-primary rounded-sm" />
                <div className="w-3 h-12 bg-primary/80 rounded-sm" />
                <div className="w-3 h-6 bg-accent/60 rounded-sm" />
                <div className="w-3 h-16 bg-accent rounded-sm" />
              </div>
            </motion.div>
          </motion.div>
        </FadeIn>

      </div>
    </section>
  );
}
