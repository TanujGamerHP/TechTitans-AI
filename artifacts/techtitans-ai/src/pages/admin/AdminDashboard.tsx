import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Plus, Search, LogOut, Star, Globe, Archive, Edit3, Trash2,
  LayoutDashboard, Eye, EyeOff, Zap, TrendingUp, FileText, Layers
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/lib/api";

const SERVICE_LABELS: Record<string, string> = {
  branding: "Branding", web: "Web & App", video: "Video",
  infrastructure: "Infrastructure", mentorship: "Mentorship", ai: "AI Automation",
};

const SERVICE_COLORS: Record<string, string> = {
  branding: "from-purple-500 to-indigo-500",
  web: "from-blue-500 to-cyan-500",
  video: "from-pink-500 to-rose-500",
  infrastructure: "from-amber-500 to-orange-500",
  mentorship: "from-green-500 to-teal-500",
  ai: "from-cyan-500 to-blue-500",
};

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");

  const load = async () => {
    try {
      const data = await api.admin.projects.list();
      setProjects(data);
    } catch {
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await api.admin.projects.delete(id);
    setProjects((p) => p.filter((x) => x.id !== id));
    showToast("Project deleted.");
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = await api.admin.projects.toggleFeatured(id);
    setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
    showToast(updated.featured ? "Marked as featured." : "Removed from featured.");
  };

  const handleTogglePublish = async (id: string) => {
    const updated = await api.admin.projects.togglePublish(id);
    setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
    showToast(updated.status === "published" ? "Project published." : "Project set to draft.");
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "published" && p.status === "published") || (filter === "draft" && p.status === "draft") || (filter === "featured" && p.featured) || p.serviceId === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === "published").length,
    drafts: projects.filter((p) => p.status === "draft").length,
    featured: projects.filter((p) => p.featured).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient bg */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Toast */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-primary/20 border border-primary/40 text-white text-sm font-medium backdrop-blur-sm">
          {toast}
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">TechTitans Admin</h1>
              <p className="text-foreground-muted text-xs">Content Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.open("/", "_blank")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-foreground-muted hover:text-white text-sm transition-all">
              <Globe className="w-4 h-4" /> View Site
            </button>
            <button onClick={() => { logout(); navigate("/admin"); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-foreground-muted hover:text-red-400 text-sm transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: stats.total, icon: Layers, color: "from-blue-500 to-cyan-500" },
            { label: "Published", value: stats.published, icon: Globe, color: "from-green-500 to-teal-500" },
            { label: "Drafts", value: stats.drafts, icon: FileText, color: "from-amber-500 to-orange-500" },
            { label: "Featured", value: stats.featured, icon: Star, color: "from-purple-500 to-pink-500" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-foreground-muted text-xs uppercase tracking-widest">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center opacity-80`}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-white">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 text-sm transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "All", value: "all" },
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Featured", value: "featured" },
            ].map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${filter === f.value ? "bg-primary border-primary text-white" : "border-white/10 bg-white/5 text-foreground-muted hover:text-white"}`}>
                {f.label}
              </button>
            ))}
          </div>
          <button onClick={() => navigate("/admin/projects/new")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Project Table */}
        {loading ? (
          <div className="glass-card rounded-2xl p-12 text-center text-foreground-muted">Loading projects...</div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-foreground-muted">
                <LayoutDashboard className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No projects found.</p>
                <button onClick={() => navigate("/admin/projects/new")}
                  className="mt-4 text-primary text-sm hover:underline">Add your first project →</button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {/* Table header */}
                <div className="px-6 py-3 grid grid-cols-12 gap-4 text-xs font-semibold text-foreground-muted uppercase tracking-widest">
                  <div className="col-span-5">Project</div>
                  <div className="col-span-2 hidden md:block">Service</div>
                  <div className="col-span-2 hidden md:block">Status</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>
                {filtered.map((project, i) => (
                  <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/3 transition-colors group">
                    {/* Project */}
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm truncate">{project.title}</p>
                        <p className="text-foreground-muted text-xs truncate">{project.tagline}</p>
                      </div>
                      {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-current flex-shrink-0" />}
                    </div>
                    {/* Service */}
                    <div className="col-span-2 hidden md:block">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${SERVICE_COLORS[project.serviceId] || "from-gray-500 to-gray-600"} bg-opacity-20 text-white/80 border border-white/10`}>
                        {SERVICE_LABELS[project.serviceId] || project.serviceId}
                      </span>
                    </div>
                    {/* Status */}
                    <div className="col-span-2 hidden md:block">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${project.status === "published" ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-amber-500/30 bg-amber-500/10 text-amber-400"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {project.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    {/* Actions */}
                    <div className="col-span-3 flex items-center justify-end gap-1.5">
                      <button onClick={() => handleToggleFeatured(project.id)} title="Toggle featured"
                        className={`p-2 rounded-lg transition-all ${project.featured ? "text-amber-400 bg-amber-400/10" : "text-foreground-muted hover:text-amber-400 hover:bg-white/5"}`}>
                        <Star className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleTogglePublish(project.id)} title="Toggle publish"
                        className={`p-2 rounded-lg transition-all ${project.status === "published" ? "text-green-400 bg-green-400/10" : "text-foreground-muted hover:text-green-400 hover:bg-white/5"}`}>
                        {project.status === "published" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => navigate(`/admin/projects/${project.id}/edit`)} title="Edit"
                        className="p-2 rounded-lg text-foreground-muted hover:text-primary hover:bg-white/5 transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(project.id, project.title)} title="Delete"
                        className="p-2 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
