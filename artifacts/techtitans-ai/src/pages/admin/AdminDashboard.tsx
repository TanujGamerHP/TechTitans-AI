import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, LogOut, Star, Globe, Edit3, Trash2,
  LayoutDashboard, Eye, EyeOff, Zap, FileText, Layers,
  Copy, Archive, ArchiveRestore, ChevronDown
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/lib/api";

const SERVICE_COLORS: Record<string, string> = {
  branding: "from-purple-500 to-indigo-500",
  web: "from-blue-500 to-cyan-500",
  video: "from-pink-500 to-rose-500",
  infrastructure: "from-amber-500 to-orange-500",
  mentorship: "from-green-500 to-teal-500",
  ai: "from-cyan-500 to-blue-500",
};
const SERVICE_LABELS: Record<string, string> = {
  branding: "Branding", web: "Web & App", video: "Video",
  infrastructure: "Infra", mentorship: "Mentorship", ai: "AI Auto",
};

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <motion.div initial={{ opacity: 0, y: -16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}
      className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-primary/20 border border-primary/40 text-white text-sm backdrop-blur-sm shadow-xl">
      {msg}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const showToast = (msg: string) => setToast(msg);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await api.admin.projects.delete(id);
    setProjects((p) => p.filter((x) => x.id !== id));
    invalidate();
    showToast("Project deleted.");
  };

  const handleDuplicate = async (id: string) => {
    const dup = await api.admin.projects.duplicate(id);
    setProjects((p) => [dup, ...p]);
    invalidate();
    showToast("Project duplicated as draft.");
  };

  const handleArchive = async (id: string) => {
    const updated = await api.admin.projects.archive(id);
    setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
    invalidate();
    showToast(updated.status === "archived" ? "Project archived." : "Project restored.");
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = await api.admin.projects.toggleFeatured(id);
    setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
    invalidate();
    showToast(updated.featured ? "Marked as featured." : "Removed from featured.");
  };

  const handleTogglePublish = async (id: string) => {
    const updated = await api.admin.projects.togglePublish(id);
    setProjects((p) => p.map((x) => (x.id === id ? updated : x)));
    invalidate();
    showToast(updated.status === "published" ? "Published." : "Set to draft.");
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) ||
      (p.clientName || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(q));
    const matchStatus =
      filter === "all" ||
      (filter === "published" && p.status === "published") ||
      (filter === "draft" && p.status === "draft") ||
      (filter === "featured" && p.featured) ||
      (filter === "archived" && p.status === "archived");
    const matchService = serviceFilter === "all" || p.serviceId === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  const stats = {
    total: projects.filter((p) => p.status !== "archived").length,
    published: projects.filter((p) => p.status === "published").length,
    drafts: projects.filter((p) => p.status === "draft").length,
    featured: projects.filter((p) => p.featured).length,
    archived: projects.filter((p) => p.status === "archived").length,
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
      published: "border-green-500/30 bg-green-500/10 text-green-400",
      draft: "border-amber-500/30 bg-amber-500/10 text-amber-400",
      archived: "border-white/10 bg-white/5 text-foreground-muted",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${map[status] || map.draft}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast + Date.now()} msg={toast} onDone={() => setToast("")} />}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-8">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">TechTitans CMS</h1>
              <p className="text-foreground-muted text-xs">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.open("/", "_blank")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-foreground-muted hover:text-white text-sm transition-all">
              <Globe className="w-4 h-4" /> <span className="hidden sm:inline">View Site</span>
            </button>
            <button onClick={() => { logout(); navigate("/admin"); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-foreground-muted hover:text-red-400 text-sm transition-all">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Active", value: stats.total, icon: Layers, g: "from-blue-500 to-cyan-500" },
            { label: "Published", value: stats.published, icon: Globe, g: "from-green-500 to-teal-500" },
            { label: "Drafts", value: stats.drafts, icon: FileText, g: "from-amber-500 to-orange-500" },
            { label: "Featured", value: stats.featured, icon: Star, g: "from-purple-500 to-pink-500" },
            { label: "Archived", value: stats.archived, icon: Archive, g: "from-gray-500 to-gray-600" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => setFilter(s.label.toLowerCase())}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-foreground-muted text-xs uppercase tracking-widest">{s.label}</p>
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.g} flex items-center justify-center opacity-80`}>
                  <s.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-white">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, client, tag..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 text-sm transition-all" />
          </div>
          {/* Status filter */}
          <div className="flex gap-1.5 flex-wrap">
            {[
              { label: "All", value: "all" },
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Featured", value: "featured" },
              { label: "Archived", value: "archived" },
            ].map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${filter === f.value ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-white/10 bg-white/5 text-foreground-muted hover:text-white"}`}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Service filter */}
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all cursor-pointer">
            <option value="all" className="bg-gray-900">All Services</option>
            {Object.entries(SERVICE_LABELS).map(([k, v]) => (
              <option key={k} value={k} className="bg-gray-900">{v}</option>
            ))}
          </select>
          {/* Add button */}
          <button onClick={() => navigate("/admin/projects/new")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* ── Project Table ── */}
        {loading ? (
          <div className="glass-card rounded-2xl p-16 text-center text-foreground-muted animate-pulse">
            Loading projects...
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-16 text-center text-foreground-muted">
                <LayoutDashboard className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">No projects match your filters</p>
                <button onClick={() => navigate("/admin/projects/new")}
                  className="mt-4 text-primary text-sm hover:underline">Add your first project →</button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {/* Table header */}
                <div className="px-6 py-3 grid grid-cols-12 gap-4 text-[10px] font-bold text-foreground-muted uppercase tracking-widest bg-white/2">
                  <div className="col-span-5">Project</div>
                  <div className="col-span-2 hidden lg:block">Service</div>
                  <div className="col-span-2 hidden md:block">Status</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>
                {filtered.map((project, i) => (
                  <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                    className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors group">
                    {/* Project info */}
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                        {project.image ? (
                          <img src={project.image} alt={project.title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm truncate">{project.title}</p>
                        <p className="text-foreground-muted text-xs truncate">
                          {project.clientName ? `${project.clientName} · ` : ""}{project.year}
                        </p>
                      </div>
                      {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-current flex-shrink-0 ml-1" />}
                    </div>
                    {/* Service badge */}
                    <div className="col-span-2 hidden lg:block">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${SERVICE_COLORS[project.serviceId] || "from-gray-500 to-gray-600"} bg-opacity-10 text-white/80`}>
                        {SERVICE_LABELS[project.serviceId] || project.serviceId}
                      </span>
                    </div>
                    {/* Status */}
                    <div className="col-span-2 hidden md:block">
                      <StatusBadge status={project.status} />
                    </div>
                    {/* Actions */}
                    <div className="col-span-3 flex items-center justify-end gap-1">
                      {/* Featured toggle */}
                      <button onClick={() => handleToggleFeatured(project.id)} title="Toggle featured"
                        className={`p-1.5 rounded-lg transition-all ${project.featured ? "text-amber-400 bg-amber-400/10" : "text-white/20 hover:text-amber-400 hover:bg-white/5"}`}>
                        <Star className="w-4 h-4" />
                      </button>
                      {/* Publish toggle */}
                      <button onClick={() => handleTogglePublish(project.id)} title="Toggle publish"
                        className={`p-1.5 rounded-lg transition-all ${project.status === "published" ? "text-green-400 bg-green-400/10" : "text-white/20 hover:text-green-400 hover:bg-white/5"}`}>
                        {project.status === "published" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      {/* Edit */}
                      <button onClick={() => navigate(`/admin/projects/${project.id}/edit`)} title="Edit project"
                        className="p-1.5 rounded-lg text-white/20 hover:text-primary hover:bg-white/5 transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {/* More actions dropdown */}
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === project.id ? null : project.id); }}
                          className="p-1.5 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                          {openMenu === project.id && (
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-full mt-1 w-44 glass-card rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl"
                              onClick={(e) => e.stopPropagation()}>
                              <button onClick={() => { handleDuplicate(project.id); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white hover:bg-white/5 transition-colors">
                                <Copy className="w-4 h-4 text-blue-400" /> Duplicate
                              </button>
                              <button onClick={() => { handleArchive(project.id); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white hover:bg-white/5 transition-colors">
                                {project.status === "archived"
                                  ? <><ArchiveRestore className="w-4 h-4 text-green-400" /> Unarchive</>
                                  : <><Archive className="w-4 h-4 text-amber-400" /> Archive</>
                                }
                              </button>
                              <div className="border-t border-white/5" />
                              <button onClick={() => { handleDelete(project.id, project.title); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors">
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {/* Table footer */}
            {filtered.length > 0 && (
              <div className="px-6 py-3 border-t border-white/5 text-xs text-foreground-muted flex justify-between">
                <span>Showing {filtered.length} of {projects.length} projects</span>
                <button onClick={() => navigate("/admin/projects/new")} className="text-primary hover:underline">
                  + Add new project
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
