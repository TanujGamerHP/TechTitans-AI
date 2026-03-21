import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Eye, Heart, Users, Award, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const team = [
  {
    name: "Aryan Sharma",
    role: "Founder & Creative Director",
    bio: "Visionary behind TechTitans AI. Leads brand strategy and creative direction for all client projects.",
    initials: "AS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Rahul Verma",
    role: "Lead Web Developer",
    bio: "Full-stack engineer with expertise in React, Node.js, and scalable cloud architectures.",
    initials: "RV",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "Priya Singh",
    role: "Head of Design",
    bio: "Award-winning designer specializing in brand identity, UI/UX, and motion graphics.",
    initials: "PS",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Karan Thakur",
    role: "Video Production Lead",
    bio: "Cinematic storyteller with 5+ years of experience in video editing, color grading, and motion design.",
    initials: "KT",
    color: "from-green-500 to-teal-500",
  },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    desc: "Every decision we make is rooted in achieving measurable outcomes for our clients — not just pretty deliverables.",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    desc: "We move fast without cutting corners. Our streamlined workflows let us deliver premium work on tight timelines.",
  },
  {
    icon: Heart,
    title: "Client-First Always",
    desc: "We treat every project as if it were our own business. Your success is our success, and we never forget that.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "We set the bar high and hold ourselves to it — every pixel, every line of code, every frame of video.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "4+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function AboutUs() {
  const [, navigate] = useLocation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* Back */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">About Us</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight max-w-4xl">
            We Are the Titans <br />
            <span className="text-gradient">Behind Your Brand.</span>
          </h1>
          <p className="text-foreground-muted text-lg md:text-xl max-w-3xl leading-relaxed">
            TechTitans AI is a premium digital agency based in Solan, Himachal Pradesh. Founded with one mission —
            to help ambitious brands look world-class and grow faster through intelligent design, cutting-edge
            development, and powerful storytelling.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-foreground-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center"
        >
          <div>
            <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-5">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Built from Passion, <br /> Driven by Purpose
            </h2>
            <div className="space-y-5 text-foreground-muted leading-relaxed">
              <p>
                TechTitans AI was born out of a simple frustration — too many great businesses were being held back
                by poor digital presence. We saw startups with amazing products losing to competitors simply because
                of weaker branding, slower websites, and no content strategy.
              </p>
              <p>
                So we built a team of specialists across branding, web development, graphic design, and video
                production — all under one roof. Today, we partner with startups, creators, and growing businesses
                to build digital identities that demand attention and drive real results.
              </p>
              <p>
                Based in Solan, H.P., we serve clients across India and beyond, combining the discipline of a
                big-city agency with the personal care of a boutique studio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 flex flex-col items-start gap-3">
              <Target className="w-8 h-8 text-primary" />
              <h4 className="font-display font-bold text-white">Our Mission</h4>
              <p className="text-foreground-muted text-sm">To make world-class digital design accessible to every ambitious brand.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-start gap-3 mt-8">
              <Eye className="w-8 h-8 text-accent" />
              <h4 className="font-display font-bold text-white">Our Vision</h4>
              <p className="text-foreground-muted text-sm">To become the most trusted digital partner for the next generation of brands.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-start gap-3">
              <Users className="w-8 h-8 text-accent" />
              <h4 className="font-display font-bold text-white">Who We Serve</h4>
              <p className="text-foreground-muted text-sm">Startups, entrepreneurs, creators, and SMEs ready to invest in their brand.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-start gap-3 mt-8">
              <Heart className="w-8 h-8 text-primary" />
              <h4 className="font-display font-bold text-white">What We Love</h4>
              <p className="text-foreground-muted text-sm">Complex problems with elegant solutions and clients who care about quality.</p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-24"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Values</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <val.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display font-bold text-white mb-3">{val.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-24"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">The Team</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">The Titans Behind the Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-display font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="font-display font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-foreground-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Work With <span className="text-gradient">Titans?</span>
          </h2>
          <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
            Let's build something extraordinary together. Reach out today and get a free consultation.
          </p>
          <a
            href="/#contact"
            className="inline-block py-4 px-10 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
