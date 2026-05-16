import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

const words = ["Digital", "Excellence"];

function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.015 + 0.005,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const orbs = [
      { x: w * 0.15, y: h * 0.3, r: 180, vx: 0.08, vy: 0.05, color: "59,130,246" },
      { x: w * 0.8, y: h * 0.6, r: 220, vx: -0.06, vy: 0.07, color: "34,211,238" },
      { x: w * 0.5, y: h * 0.8, r: 150, vx: 0.05, vy: -0.08, color: "139,92,246" },
    ];

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);

      // Orbs
      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `rgba(${o.color},0.07)`);
        g.addColorStop(1, `rgba(${o.color},0)`);
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Particles
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.pulse += p.ps;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const op = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        const pr = p.r * (0.85 + 0.15 * Math.sin(p.pulse * 1.2));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 4);
        g.addColorStop(0, `rgba(147,197,253,${op})`);
        g.addColorStop(1, `rgba(59,130,246,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pr * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.05 * (1 - d / 90)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    }

    tick();

    const onResize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);
  const glowX = useTransform(springX, [-500, 500], ["-20%", "120%"]);
  const glowY = useTransform(springY, [-500, 500], ["-20%", "120%"]);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic canvas background */}
      <CinematicCanvas />

      {/* Ambient grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Cursor-reactive glow */}
      {mounted && (
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            left: glowX,
            top: glowY,
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Static blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none" style={{ animation: "pulse 6s ease-in-out infinite reverse" }} />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Content */}
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground-muted">Available for new projects</span>
            </div>
          </motion.div>

          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                <motion.span variants={wordVariants} className="inline-block mr-4">We</motion.span>
                <motion.span variants={wordVariants} className="inline-block mr-4">Build</motion.span>
                <br />
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    className={`inline-block mr-3 ${i === 0 ? "text-gradient" : "text-gradient"}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Creative branding, web development, video production, AI automation, digital infrastructure & career mentorship — all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <a href="/#contact" tabIndex={-1}>
              <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Button>
            </a>
            <a href="/portfolio" tabIndex={-1}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto glow-border group">
                <span className="group-hover:text-white transition-colors">View Portfolio</span>
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative lg:h-[600px] flex justify-center items-center"
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            animate={{ y: [0, -18, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback visual */}
                <div className="flex flex-col gap-3 py-4">
                  {[0.9, 0.6, 0.75, 0.45].map((w, i) => (
                    <motion.div
                      key={i}
                      className="h-2 rounded-full bg-gradient-to-r from-primary/60 to-accent/40"
                      style={{ width: `${w * 100}%` }}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 z-10">
                <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* Floating metric card */}
            <motion.div
              animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -top-8 -right-8 glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs text-foreground-muted">Conversion Rate</div>
                <div className="text-sm font-bold text-white">+248%</div>
              </div>
            </motion.div>

            {/* Floating chart */}
            <motion.div
              animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-12 -left-12 glass-card p-4 rounded-2xl border border-white/10"
            >
              <div className="flex items-end gap-1.5">
                {[8, 12, 6, 16, 10, 18].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-3 rounded-sm"
                    style={{ height: `${h * 2}px`, background: i % 2 === 0 ? "rgb(59,130,246)" : "rgb(34,211,238)" }}
                    animate={{ height: [`${h * 2}px`, `${(h + 4) * 2}px`, `${h * 2}px`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
