import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Trash2, Save, Eye, Zap,
  Link, Users, Briefcase, Wrench, Tag
} from "lucide-react";
import { api } from "@/lib/api";
import { servicesData } from "@/data/servicesData";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { FocalPointPicker } from "@/components/admin/FocalPointPicker";

const INPUT = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all text-sm";
const TEXTAREA = INPUT + " resize-none";
const LABEL = "block text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-2";
const SECTION = "glass-card rounded-2xl p-7 space-y-5";

interface FormState {
  title: string; tagline: string; overview: string; challenge: string; solution: string;
  serviceId: string; subServiceId: string; category: string; subCategory: string;
  tags: string; image: string; coverImage: string; year: string; duration: string;
  status: "draft" | "published" | "archived"; featured: boolean; services: string;
  imagePosition: string; coverImagePosition: string;
  // Extended fields
  clientName: string; industry: string; budget: string;
  ctaLink: string; liveLink: string; behanceLink: string; toolsUsed: string;
}

const EMPTY: FormState = {
  title: "", tagline: "", overview: "", challenge: "", solution: "",
  serviceId: "branding", subServiceId: "", category: "", subCategory: "",
  tags: "", image: "", coverImage: "", year: new Date().getFullYear().toString(),
  duration: "", status: "draft", featured: false, services: "",
  imagePosition: "center", coverImagePosition: "center",
  clientName: "", industry: "", budget: "", ctaLink: "", liveLink: "", behanceLink: "", toolsUsed: "",
};

export default function ProjectForm() {
  const params = useParams<{ id?: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const isEdit = !!params.id && params.id !== "new";

  const [form, setForm] = useState<FormState>(EMPTY);
  const [results, setResults] = useState([{ label: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "error" | "success" } | null>(null);

  const showToast = (msg: string, type: "error" | "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const currentService = servicesData.find((s) => s.id === form.serviceId);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api.admin.projects.get(params.id!).then((p) => {
      setForm({
        title: p.title || "", tagline: p.tagline || "",
        overview: p.overview || "", challenge: p.challenge || "", solution: p.solution || "",
        serviceId: p.serviceId || "branding", subServiceId: p.subServiceId || "",
        category: p.category || "", subCategory: p.subCategory || "",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
        image: p.image || "", coverImage: p.coverImage || "",
        year: p.year || "", duration: p.duration || "",
        status: p.status || "draft", featured: p.featured ?? false,
        services: Array.isArray(p.services) ? p.services.join(", ") : "",
        imagePosition: p.imagePosition || "center",
        coverImagePosition: p.coverImagePosition || "center",
        clientName: p.clientName || "", industry: p.industry || "",
        budget: p.budget || "", ctaLink: p.ctaLink || "",
        liveLink: p.liveLink || "", behanceLink: p.behanceLink || "",
        toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed.join(", ") : "",
      });
      setResults(p.results?.length ? p.results : [{ label: "", value: "" }]);
    }).catch(() => navigate("/admin/dashboard")).finally(() => setLoading(false));
  }, [params.id]);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleServiceChange = (serviceId: string) => {
    const svc = servicesData.find((s) => s.id === serviceId);
    setForm((f) => ({ ...f, serviceId, category: svc?.shortTitle || "", subServiceId: "", subCategory: "" }));
  };

  const handleSubServiceChange = (subServiceId: string) => {
    const svc = servicesData.find((s) => s.id === form.serviceId);
    const sub = svc?.subServices.find((ss) => ss.id === subServiceId);
    setForm((f) => ({ ...f, subServiceId, subCategory: sub?.title || "" }));
  };

  const addResult = () => setResults((r) => [...r, { label: "", value: "" }]);
  const removeResult = (i: number) => setResults((r) => r.filter((_, idx) => idx !== i));
  const updateResult = (i: number, key: "label" | "value", val: string) =>
    setResults((r) => r.map((item, idx) => idx === i ? { ...item, [key]: val } : item));

  const handleSubmit = async (publishOverride?: boolean) => {
    if (!form.title.trim()) { showToast("Project title is required.", "error"); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        services: form.services.split(",").map((t) => t.trim()).filter(Boolean),
        toolsUsed: form.toolsUsed.split(",").map((t) => t.trim()).filter(Boolean),
        results: results.filter((r) => r.label && r.value),
        status: publishOverride === true ? "published" : publishOverride === false ? "draft" : form.status,
        coverImage: form.coverImage || form.image,
      };
      if (isEdit) {
        await api.admin.projects.update(params.id!, payload);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.refetchQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", params.id!] });
        if (publishOverride === true) {
          showToast("Published! Redirecting…", "success");
          setTimeout(() => navigate("/admin/dashboard"), 600);
        } else {
          showToast("Changes saved!", "success");
        }
      } else {
        const created = await api.admin.projects.create(payload);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.refetchQueries({ queryKey: ["projects"] });
        if (publishOverride === true) {
          showToast(`"${created.title}" is now live!`, "success");
          setTimeout(() => navigate("/admin/dashboard"), 600);
        } else {
          showToast("Draft saved! Redirecting…", "success");
          setTimeout(() => navigate("/admin/dashboard"), 800);
        }
      }
    } catch (err: any) {
      showToast(err.message || "Something went wrong — check that you are logged in.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-foreground-muted">
      Loading project...
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed toast — always visible regardless of scroll */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl text-sm font-medium max-w-sm ${
              toast.type === "error"
                ? "bg-red-500/20 border-red-500/40 text-red-300"
                : "bg-green-500/20 border-green-500/40 text-green-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === "error" ? "bg-red-400" : "bg-green-400"}`} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/dashboard")} className="p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/5 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-display font-bold text-white">{isEdit ? "Edit Project" : "New Project"}</h1>
              <p className="text-foreground-muted text-xs">TechTitans Admin</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => handleSubmit(false)} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-50">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button type="button" onClick={() => handleSubmit(true)} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50">
            {saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Eye className="w-4 h-4" />}
            {saving ? "Publishing…" : "Publish & Go Live"}
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-8 space-y-6 pb-20">

        {/* ── SECTION 1: Basic Info ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" /> Basic Information
          </h2>
          <div>
            <label className={LABEL}>Project Title *</label>
            <input className={INPUT} value={form.title} onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Organic Honey Packaging" required />
          </div>
          <div>
            <label className={LABEL}>Short Tagline</label>
            <input className={INPUT} value={form.tagline} onChange={(e) => set("tagline", e.target.value)}
              placeholder="One punchy line that sells the result" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Year</label>
              <input className={INPUT} value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2024" />
            </div>
            <div>
              <label className={LABEL}>Timeline / Duration</label>
              <input className={INPUT} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="6 weeks" />
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Client Details ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Client Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Client Name</label>
              <input className={INPUT} value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="e.g. Aura Collective" />
            </div>
            <div>
              <label className={LABEL}>Industry</label>
              <input className={INPUT} value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="e.g. FMCG, SaaS, Real Estate" />
            </div>
          </div>
          <div>
            <label className={LABEL}>Project Budget</label>
            <input className={INPUT} value={form.budget} onChange={(e) => set("budget", e.target.value)} placeholder="e.g. ₹50,000 – ₹1,00,000" />
          </div>
        </div>

        {/* ── SECTION 3: Service Category ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" /> Service Category
          </h2>
          <div>
            <label className={LABEL}>Main Service *</label>
            <select value={form.serviceId} onChange={(e) => handleServiceChange(e.target.value)}
              className={INPUT + " cursor-pointer"} style={{ backgroundImage: "none" }}>
              {servicesData.map((s) => <option key={s.id} value={s.id} className="bg-gray-900">{s.shortTitle}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Sub-Service</label>
            <select value={form.subServiceId} onChange={(e) => handleSubServiceChange(e.target.value)}
              className={INPUT + " cursor-pointer"} style={{ backgroundImage: "none" }}>
              <option value="" className="bg-gray-900">Select a sub-service...</option>
              {currentService?.subServices.map((ss) => (
                <option key={ss.id} value={ss.id} className="bg-gray-900">{ss.title}</option>
              ))}
            </select>
          </div>
          {form.subCategory && (
            <p className="text-xs text-foreground-muted">
              Will appear under: <span className="text-primary">{form.category}</span> → <span className="text-accent">{form.subCategory}</span>
            </p>
          )}
        </div>

        {/* ── SECTION 4: Case Study ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base">Case Study Content</h2>
          <div>
            <label className={LABEL}>Project Overview</label>
            <textarea className={TEXTAREA} rows={4} value={form.overview}
              onChange={(e) => set("overview", e.target.value)}
              placeholder="Describe what this project was about and who the client is..." />
          </div>
          <div>
            <label className={LABEL}>The Challenge</label>
            <textarea className={TEXTAREA} rows={3} value={form.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              placeholder="What problem were you solving? What made it hard?" />
          </div>
          <div>
            <label className={LABEL}>Our Solution</label>
            <textarea className={TEXTAREA} rows={3} value={form.solution}
              onChange={(e) => set("solution", e.target.value)}
              placeholder="What did you build, design, or execute? How did you approach it?" />
          </div>
        </div>

        {/* ── SECTION 5: Results ── */}
        <div className={SECTION}>
          <div className="flex items-center justify-between">
            <h2 className="text-white font-display font-bold text-base">Results & Impact Metrics</h2>
            <button type="button" onClick={addResult}
              className="flex items-center gap-1.5 text-xs text-primary border border-primary/30 bg-primary/10 rounded-lg px-3 py-1.5 hover:bg-primary/20 transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Metric
            </button>
          </div>
          <div className="text-xs text-foreground-muted mb-1">Enter the value first (e.g. "4.8x"), then the label (e.g. "ROAS")</div>
          {results.map((r, i) => (
            <div key={i} className="grid grid-cols-11 gap-2 items-center">
              <div className="col-span-4">
                <input className={INPUT} value={r.value} onChange={(e) => updateResult(i, "value", e.target.value)}
                  placeholder="Value (e.g. 4.8x, 2.4M)" />
              </div>
              <span className="text-foreground-muted text-center text-xs">—</span>
              <div className="col-span-5">
                <input className={INPUT} value={r.label} onChange={(e) => updateResult(i, "label", e.target.value)}
                  placeholder="Label (e.g. Total ROAS, Views/Month)" />
              </div>
              <button type="button" onClick={() => removeResult(i)}
                className="p-2 text-foreground-muted hover:text-red-400 transition-colors justify-self-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* ── SECTION 6: Media ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base">Media & Images</h2>
          <p className="text-xs text-foreground-muted -mt-2">
            Upload from device or paste a URL. After upload, pick a <span className="text-white/70">focal point</span> so the important part is never cut off on portfolio cards.
          </p>

          {/* Thumbnail */}
          <div className="space-y-4 p-5 rounded-2xl border border-white/8 bg-white/2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-white text-sm font-semibold">Thumbnail Image *</span>
              <span className="text-xs text-foreground-muted">(shown on portfolio grid cards)</span>
            </div>
            <MediaUploader
              label=""
              value={form.image}
              onChange={(url) => set("image", url)}
              accept="image+video"
              hint="This is the card image visitors see when browsing your portfolio."
            />
            {form.image && (
              <FocalPointPicker
                value={form.imagePosition}
                onChange={(v) => set("imagePosition", v)}
                imageUrl={form.image}
              />
            )}
          </div>

          {/* Cover / Hero */}
          <div className="space-y-4 p-5 rounded-2xl border border-white/8 bg-white/2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-white text-sm font-semibold">Cover / Hero Image</span>
              <span className="text-xs text-foreground-muted">(full-width banner on the case study page)</span>
            </div>
            <MediaUploader
              label=""
              value={form.coverImage}
              onChange={(url) => set("coverImage", url)}
              accept="image+video"
              hint="Defaults to the thumbnail if left empty. Use a wide landscape image for best results."
            />
            {form.coverImage && (
              <FocalPointPicker
                value={form.coverImagePosition}
                onChange={(v) => set("coverImagePosition", v)}
                imageUrl={form.coverImage}
              />
            )}
          </div>
        </div>

        {/* ── SECTION 7: Links ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base flex items-center gap-2">
            <Link className="w-4 h-4 text-primary" /> External Links
          </h2>
          <div>
            <label className={LABEL}>Live Website / Project URL</label>
            <input className={INPUT} value={form.liveLink} onChange={(e) => set("liveLink", e.target.value)}
              placeholder="https://client-website.com" />
          </div>
          <div>
            <label className={LABEL}>Behance / Portfolio Link</label>
            <input className={INPUT} value={form.behanceLink} onChange={(e) => set("behanceLink", e.target.value)}
              placeholder="https://behance.net/..." />
          </div>
          <div>
            <label className={LABEL}>CTA Button Link <span className="normal-case font-normal text-white/30">(shown on case study page)</span></label>
            <input className={INPUT} value={form.ctaLink} onChange={(e) => set("ctaLink", e.target.value)}
              placeholder="https://... or /#contact" />
          </div>
        </div>

        {/* ── SECTION 8: Tags & Tools ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" /> Tags, Services & Tools
          </h2>
          <div>
            <label className={LABEL}>Project Tags <span className="normal-case font-normal text-white/30">(comma-separated)</span></label>
            <input className={INPUT} value={form.tags} onChange={(e) => set("tags", e.target.value)}
              placeholder="Brand Identity, Logo Design, Typography, Color Systems" />
          </div>
          <div>
            <label className={LABEL}>Services Delivered <span className="normal-case font-normal text-white/30">(comma-separated)</span></label>
            <input className={INPUT} value={form.services} onChange={(e) => set("services", e.target.value)}
              placeholder="UI/UX Design, React Development, Shopify Integration" />
          </div>
          <div>
            <label className={LABEL}>Tools & Technologies Used <span className="normal-case font-normal text-white/30">(comma-separated)</span></label>
            <input className={INPUT} value={form.toolsUsed} onChange={(e) => set("toolsUsed", e.target.value)}
              placeholder="Figma, Adobe XD, React, Tailwind CSS, n8n, GPT-4" />
          </div>
        </div>

        {/* ── SECTION 9: Settings ── */}
        <div className={SECTION}>
          <h2 className="text-white font-display font-bold text-base mb-2">Publish Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Status */}
            <div className="glass-card rounded-xl p-4 border border-white/5">
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-3">Status</p>
              <div className="flex flex-col gap-2">
                {(["draft", "published", "archived"] as const).map((s) => (
                  <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.status === s ? "border-primary bg-primary" : "border-white/20 group-hover:border-white/40"}`}
                      onClick={() => set("status", s)}>
                      {form.status === s && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm text-white capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Featured */}
            <div className="glass-card rounded-xl p-4 border border-white/5 flex flex-col justify-between">
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-3">Featured</p>
              <div>
                <div className={`w-12 h-7 rounded-full transition-all relative cursor-pointer ${form.featured ? "bg-amber-500" : "bg-white/10"}`}
                  onClick={() => set("featured", !form.featured)}>
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${form.featured ? "left-6" : "left-1"}`} />
                </div>
                <p className="text-xs text-foreground-muted mt-2">{form.featured ? "Shown in featured sections" : "Not featured"}</p>
              </div>
            </div>
            {/* Quick preview */}
            <div className="glass-card rounded-xl p-4 border border-white/5">
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-3">Preview</p>
              {form.image ? (
                <img src={form.image} className="w-full h-16 object-cover rounded-lg opacity-70" alt="preview" />
              ) : (
                <div className="w-full h-16 rounded-lg bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                  <span className="text-xs text-foreground-muted">No image</span>
                </div>
              )}
              <p className="text-xs text-white mt-2 truncate">{form.title || "Untitled Project"}</p>
            </div>
          </div>
        </div>

        {/* ── Submit row ── */}
        <div className="flex gap-3">
          <button type="button" onClick={() => handleSubmit()} disabled={saving || !form.title}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
          </button>
          <button type="button" onClick={() => navigate("/admin/dashboard")}
            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
