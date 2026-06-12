import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, ArrowUpRight, Loader2,
  X, ChevronLeft, ChevronRight, Maximize2, ExternalLink,
  Tag, Layers, ZoomIn
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects, useProject } from "@/hooks/useProjects";
import { servicesData } from "@/data/servicesData";

/* ─── Lightbox ───────────────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  // Prevent scroll while lightbox open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
        onClick={onClose}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <span className="text-white/50 text-sm font-medium">{idx + 1} / {images.length}</span>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-16 min-h-0 relative" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={images[idx]}
              alt={`Preview ${idx + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 justify-center px-4 py-4 overflow-x-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? "border-primary scale-110" : "border-white/20 opacity-50 hover:opacity-80"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Image Gallery Grid ──────────────────────────────────────── */
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!images.length) return null;

  const open = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);

  /* Layout variants */
  const single = images.length === 1;
  const two = images.length === 2;

  return (
    <>
      {lightboxIdx !== null && (
        <Lightbox images={images} startIndex={lightboxIdx} onClose={close} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mb-16 md:mb-24"
      >
        <div className="flex items-center justify-between mb-6">
          <p className="text-primary font-semibold tracking-widest text-sm uppercase">Project Preview</p>
          <span className="text-foreground-muted text-xs">{images.length} image{images.length !== 1 ? "s" : ""} · Click to zoom</span>
        </div>

        {single ? (
          <div
            onClick={() => open(0)}
            className="group relative cursor-zoom-in rounded-2xl md:rounded-3xl overflow-hidden glass-card"
          >
            <img src={images[0]} alt={title} className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : two ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {images.map((src, i) => (
              <div key={i} onClick={() => open(i)} className="group relative cursor-zoom-in rounded-2xl overflow-hidden glass-card">
                <img src={src} alt={`${title} ${i + 1}`} className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 3+ images: featured first, rest in grid */
          <div className="space-y-3 md:space-y-4">
            {/* Main image */}
            <div onClick={() => open(0)} className="group relative cursor-zoom-in rounded-2xl md:rounded-3xl overflow-hidden glass-card">
              <img src={images[0]} alt={title} className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Rest in 2/3/4-col grid */}
            <div className={`grid gap-3 md:gap-4 ${images.length - 1 === 1 ? "grid-cols-1" : images.length - 1 === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
              {images.slice(1).map((src, i) => {
                const isLast = i === images.length - 2 && images.length > 4;
                const remaining = images.length - 4;
                return (
                  <div
                    key={i + 1}
                    onClick={() => open(i + 1)}
                    className="group relative cursor-zoom-in rounded-xl md:rounded-2xl overflow-hidden glass-card"
                  >
                    <img src={src} alt={`${title} ${i + 2}`} className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500" />
                    {isLast && remaining > 0 ? (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-white text-2xl font-bold">+{remaining}</p>
                          <p className="text-white/70 text-sm">more</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ─── Main CaseStudy page ─────────────────────────────────────── */
export default function CaseStudy() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const { data: project, isLoading } = useProject(params.id);
  const { data: allProjects = [] } = useProjects();

  const otherProjects = allProjects
    .filter((p: any) => p.id !== params.id)
    .slice(0, 3);

  const service = servicesData.find((s) => s.id === project?.serviceId);

  /* Build gallery: main image + gallery extras */
  const galleryImages: string[] = project
    ? [
        ...(project.image ? [project.image] : []),
        ...(project.gallery?.filter((g: string) => g && g !== project.image) || []),
      ]
    : [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-display font-bold mb-4">Project not found</h1>
          <button onClick={() => navigate("/portfolio")} className="text-primary hover:underline">
            Back to Portfolio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative min-h-[55vh] md:min-h-[70vh] overflow-hidden flex flex-col justify-end">
        {/* Cover image */}
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            style={{ objectPosition: project.coverImagePosition || "center" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

        {/* Glow orbs */}
        {service && (
          <>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[100px] opacity-10 pointer-events-none"
              style={{ background: service.gradientFrom }} />
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full blur-[80px] opacity-8 pointer-events-none"
              style={{ background: service.gradientTo }} />
          </>
        )}

        <div className="relative z-10 px-4 sm:px-8 md:px-16 pb-10 md:pb-16 pt-28 md:pt-36 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-6 md:mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </button>

            <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/40 text-primary">
                {project.category}
              </span>
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-3 md:mb-4 leading-[1.1] max-w-5xl">
              {project.title}
            </h1>
            <p className="text-foreground-muted text-base md:text-xl max-w-2xl leading-relaxed">{project.tagline}</p>

            {/* Quick links */}
            <div className="flex flex-wrap gap-3 mt-5 md:mt-7">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all">
                  <ExternalLink className="w-3.5 h-3.5" /> View Live
                </a>
              )}
              {project.behanceLink && (
                <a href={project.behanceLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" /> View on Behance
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-10 md:py-16">

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mb-12 md:mb-20 border border-white/8"
        >
          {[
            { label: "Category", value: project.subCategory || project.category, icon: <Layers className="w-3 h-3" /> },
            { label: "Year", value: project.year, icon: <Calendar className="w-3 h-3" /> },
            { label: "Duration", value: project.duration, icon: <Clock className="w-3 h-3" /> },
            { label: "Services", value: `${project.services.length} delivered`, icon: <Tag className="w-3 h-3" /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-background/80 backdrop-blur-sm px-5 md:px-8 py-5 md:py-6">
              <p className="text-foreground-muted text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                {icon} {label}
              </p>
              <p className="text-white font-semibold text-sm md:text-base">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Results */}
        {project.results?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-12 md:mb-20"
          >
            <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-6 md:mb-8">The Results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {project.results.map((result: any, i: number) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="glass-card rounded-2xl p-5 md:p-6 text-center relative overflow-hidden group"
                >
                  {service && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                  )}
                  <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1.5 md:mb-2">
                    {result.value}
                  </p>
                  <p className="text-foreground-muted text-xs md:text-sm">{result.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Image Gallery ─────────────────────────────────── */}
        {galleryImages.length > 0 && (
          <ImageGallery images={galleryImages} title={project.title} />
        )}

        {/* ── Case Study Content + Sidebar ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">

          {/* Main text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-10 md:space-y-14"
          >
            {project.overview && (
              <div>
                <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Overview</p>
                <p className="text-foreground-muted text-base md:text-lg leading-relaxed">{project.overview}</p>
              </div>
            )}
            {project.challenge && (
              <div>
                <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">The Challenge</p>
                <p className="text-foreground-muted text-base md:text-lg leading-relaxed">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Our Solution</p>
                <p className="text-foreground-muted text-base md:text-lg leading-relaxed">{project.solution}</p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4 md:space-y-5"
          >
            {/* Services */}
            {project.services?.length > 0 && (
              <div className="glass-card rounded-2xl p-5 md:p-6">
                <p className="text-foreground-muted text-xs uppercase tracking-widest mb-4">Services Provided</p>
                <ul className="space-y-2.5">
                  {project.services.map((svc: string) => (
                    <li key={svc} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-white text-sm font-medium">{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools */}
            {(project.toolsUsed?.length > 0 || project.tags?.length > 0) && (
              <div className="glass-card rounded-2xl p-5 md:p-6">
                <p className="text-foreground-muted text-xs uppercase tracking-widest mb-4">Tools & Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {(project.toolsUsed?.length > 0 ? project.toolsUsed : project.tags).map((t: string) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-foreground-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Client info */}
            {(project.clientName || project.industry) && (
              <div className="glass-card rounded-2xl p-5 md:p-6 space-y-3">
                <p className="text-foreground-muted text-xs uppercase tracking-widest">Client</p>
                {project.clientName && <p className="text-white font-semibold">{project.clientName}</p>}
                {project.industry && <p className="text-foreground-muted text-sm">{project.industry}</p>}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => navigate("/#contact")}
              className={`block w-full text-center py-4 px-6 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 ${service ? `bg-gradient-to-r ${service.color}` : "bg-gradient-to-r from-primary to-accent"}`}
            >
              Start a Similar Project
            </button>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> View Live Project
              </a>
            )}
          </motion.div>
        </div>

        {/* ── More Projects ─────────────────────────────────── */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="border-t border-white/10 pt-12 md:pt-16">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <p className="text-xl md:text-3xl font-display font-bold">More Projects</p>
                <button
                  onClick={() => navigate("/portfolio")}
                  className="inline-flex items-center gap-1.5 text-foreground-muted hover:text-white transition-colors group text-sm"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {otherProjects.map((p: any, i: number) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                    onClick={() => { navigate(`/portfolio/${p.id}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="group cursor-pointer glass-card rounded-2xl overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-auto block opacity-70 group-hover:opacity-95 group-hover:scale-[1.04] transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                          {p.subCategory}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-400">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <div className="p-4 md:p-5">
                      <p className="text-accent text-xs font-semibold mb-1">{p.year}</p>
                      <h3 className="text-base md:text-lg font-display font-bold text-white group-hover:text-primary transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-foreground-muted text-xs mt-1 line-clamp-1">{p.tagline}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
