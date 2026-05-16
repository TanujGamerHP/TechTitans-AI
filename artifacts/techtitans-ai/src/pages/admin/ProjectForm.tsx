import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Save, Eye, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { servicesData } from "@/data/servicesData";

const INPUT = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all text-sm";
const TEXTAREA = INPUT + " resize-none";
const LABEL = "block text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-2";
const SECTION = "glass-card rounded-2xl p-7 space-y-5";

const EMPTY = {
  title: "", tagline: "", overview: "", challenge: "", solution: "",
  serviceId: "branding", subServiceId: "", category: "", subCategory: "",
  tags: "", image: "", coverImage: "", year: new Date().getFullYear().toString(),
  duration: "", status: "draft" as const, featured: false,
  services: "",
  results: [{ label: "", value: "" }],
};

export default function ProjectForm() {
  const params = useParams<{ id?: string }>();
  const [, navigate] = useLocation();
  const isEdit = !!params.id && params.id !== "new";

  const [form, setForm] = useState(EMPTY);
  const [results, setResults] = useState([{ label: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentService = servicesData.find((s) => s.id === form.serviceId);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api.admin.projects.get(params.id!).then((p) => {
      setForm({
        title: p.title || "",
        tagline: p.tagline || "",
        overview: p.overview || "",
        challenge: p.challenge || "",
        solution: p.solution || "",
        serviceId: p.serviceId || "branding",
        subServiceId: p.subServiceId || "",
        category: p.category || "",
        subCategory: p.subCategory || "",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
        image: p.image || "",
        coverImage: p.coverImage || "",
        year: p.year || "",
        duration: p.duration || "",
        status: p.status || "draft",
        featured: p.featured ?? false,
        services: Array.isArray(p.services) ? p.services.join(", ") : "",
        results: [],
      });
      setResults(p.results?.length ? p.results : [{ label: "", value: "" }]);
    }).catch(() => navigate("/admin/dashboard")).finally(() => setLoading(false));
  }, [params.id]);

  const set = (key: string, val: any) => setForm((f) => ({ ...f, [key]: val }));

  const handleServiceChange = (serviceId: string) => {
    const svc = servicesData.find((s) => s.id === serviceId);
    set("serviceId", serviceId);
    set("category", svc?.shortTitle || "");
    set("subServiceId", "");
    set("subCategory", "");
  };

  const handleSubServiceChange = (subServiceId: string) => {
    const svc = servicesData.find((s) => s.id === form.serviceId);
    const sub = svc?.subServices.find((ss) => ss.id === subServiceId);
    set("subServiceId", subServiceId);
    set("subCategory", sub?.title || "");
  };

  const addResult = () => setResults((r) => [...r, { label: "", value: "" }]);
  const removeResult = (i: number) => setResults((r) => r.filter((_, idx) => idx !== i));
  const updateResult = (i: number, key: "label" | "value", val: string) =>
    setResults((r) => r.map((item, idx) => idx === i ? { ...item, [key]: val } : item));

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        services: form.services.split(",").map((t) => t.trim()).filter(Boolean),
        results: results.filter((r) => r.label && r.value),
        status: publish ? "published" : form.status,
      };
      if (isEdit) {
        await api.admin.projects.update(params.id!, payload);
        setSuccess("Project updated successfully!");
      } else {
        await api.admin.projects.create(payload);
        setSuccess("Project created successfully!");
        setTimeout(() => navigate("/admin/dashboard"), 1200);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/admin/dashboard")} className="p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/5 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-white">{isEdit ? "Edit Project" : "New Project"}</h1>
                <p className="text-foreground-muted text-xs">Fill in the details below</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={(e) => handleSubmit(e as any, false)} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Draft"}
            </button>
            <button type="button" onClick={(e) => handleSubmit(e as any, true)} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              <Eye className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        {error && <div className="mb-5 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}
        {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">{success}</motion.div>}

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Basic Info */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-2">Basic Information</h2>
            <div>
              <label className={LABEL}>Project Title *</label>
              <input className={INPUT} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Organic Honey Packaging" required />
            </div>
            <div>
              <label className={LABEL}>Short Tagline</label>
              <input className={INPUT} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="One punchy line that sells the result" />
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

          {/* Category */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-2">Service Category</h2>
            <div>
              <label className={LABEL}>Main Service *</label>
              <select value={form.serviceId} onChange={(e) => handleServiceChange(e.target.value)} className={INPUT + " cursor-pointer"}>
                {servicesData.map((s) => <option key={s.id} value={s.id}>{s.shortTitle}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Sub-Service</label>
              <select value={form.subServiceId} onChange={(e) => handleSubServiceChange(e.target.value)} className={INPUT + " cursor-pointer"}>
                <option value="">Select a sub-service...</option>
                {currentService?.subServices.map((ss) => <option key={ss.id} value={ss.id}>{ss.title}</option>)}
              </select>
            </div>
          </div>

          {/* Case Study */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-2">Case Study Content</h2>
            <div>
              <label className={LABEL}>Project Overview</label>
              <textarea className={TEXTAREA} rows={4} value={form.overview} onChange={(e) => set("overview", e.target.value)} placeholder="Describe what this project was about and who the client is..." />
            </div>
            <div>
              <label className={LABEL}>The Challenge</label>
              <textarea className={TEXTAREA} rows={3} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} placeholder="What problem were you solving? What made it hard?" />
            </div>
            <div>
              <label className={LABEL}>Our Solution</label>
              <textarea className={TEXTAREA} rows={3} value={form.solution} onChange={(e) => set("solution", e.target.value)} placeholder="What did you build, design, or execute? How did you approach it?" />
            </div>
          </div>

          {/* Results */}
          <div className={SECTION}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-display font-bold text-base">Results & Impact</h2>
              <button type="button" onClick={addResult} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>
            {results.map((r, i) => (
              <div key={i} className="grid grid-cols-5 gap-3 items-center">
                <input className={INPUT + " col-span-2"} value={r.value} onChange={(e) => updateResult(i, "value", e.target.value)} placeholder="Value (e.g. 4.8x)" />
                <input className={INPUT + " col-span-2"} value={r.label} onChange={(e) => updateResult(i, "label", e.target.value)} placeholder="Label (e.g. ROAS)" />
                <button type="button" onClick={() => removeResult(i)} className="p-2 text-foreground-muted hover:text-red-400 transition-colors justify-self-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Media */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-2">Media</h2>
            <div>
              <label className={LABEL}>Thumbnail Image URL</label>
              <input className={INPUT} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://images.unsplash.com/..." />
              {form.image && <img src={form.image} alt="preview" className="mt-3 w-full h-36 object-cover rounded-xl opacity-70" />}
            </div>
            <div>
              <label className={LABEL}>Cover / Hero Image URL <span className="text-white/30 normal-case font-normal">(optional — defaults to thumbnail)</span></label>
              <input className={INPUT} value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://images.unsplash.com/...?w=1600" />
            </div>
          </div>

          {/* Tags & Services */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-2">Tags & Services</h2>
            <div>
              <label className={LABEL}>Tags <span className="text-white/30 normal-case font-normal">(comma-separated)</span></label>
              <input className={INPUT} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Brand Identity, Logo Design, Typography" />
            </div>
            <div>
              <label className={LABEL}>Services Used <span className="text-white/30 normal-case font-normal">(comma-separated)</span></label>
              <input className={INPUT} value={form.services} onChange={(e) => set("services", e.target.value)} placeholder="UI/UX Design, React, Shopify" />
            </div>
          </div>

          {/* Settings */}
          <div className={SECTION}>
            <h2 className="text-white font-display font-bold text-base mb-4">Settings</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? "bg-amber-500" : "bg-white/10"}`}
                  onClick={() => set("featured", !form.featured)}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? "left-5" : "left-1"}`} />
                </div>
                <span className="text-sm text-white">Featured Project</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full transition-colors relative ${form.status === "published" ? "bg-green-500" : "bg-white/10"}`}
                  onClick={() => set("status", form.status === "published" ? "draft" : "published")}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.status === "published" ? "left-5" : "left-1"}`} />
                </div>
                <span className="text-sm text-white">Publish immediately</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pb-10">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all">
              <Save className="w-4 h-4" /> {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
            </button>
            <button type="button" onClick={() => navigate("/admin/dashboard")}
              className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
