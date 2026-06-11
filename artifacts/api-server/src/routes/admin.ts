import { Router } from "express";
import { createHmac, randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";
import {
  getProjects, getPublishedProjects, getProjectById,
  createProject, updateProject, deleteProject,
  type StoredProject,
} from "../lib/storage.js";

const router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] || "techtitans2024";
const SECRET = process.env["ADMIN_SECRET"] || "tt_secret_key_2024";

function makeToken(password: string): string {
  return createHmac("sha256", SECRET).update(password).digest("hex");
}

const VALID_TOKEN = makeToken(ADMIN_PASSWORD);

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  if (token !== VALID_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
  next();
}

// ─── Public routes ────────────────────────────────────────────────────────────

router.get("/projects", (_req, res) => {
  res.json(getPublishedProjects());
});

router.get("/projects/:id", (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project || project.status !== "published") {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

router.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  res.json({ token: VALID_TOKEN });
});

// ─── Admin routes (authenticated) ─────────────────────────────────────────────

router.get("/admin/projects", requireAdmin, (_req, res) => {
  res.json(getProjects());
});

router.get("/admin/projects/:id", requireAdmin, (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

router.post("/admin/projects", requireAdmin, (req, res) => {
  const body = req.body as Partial<StoredProject>;
  const title = body.title?.trim();
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const id = `${slug}-${randomUUID().slice(0, 6)}`;

  const project = createProject({
    id,
    title,
    tagline: body.tagline || "",
    overview: body.overview || "",
    challenge: body.challenge || "",
    solution: body.solution || "",
    serviceId: body.serviceId || "branding",
    subServiceId: body.subServiceId || "",
    category: body.category || "",
    subCategory: body.subCategory || "",
    tags: body.tags || [],
    image: body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    coverImage: body.coverImage || body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90",
    results: body.results || [],
    services: body.services || [],
    year: body.year || new Date().getFullYear().toString(),
    duration: body.duration || "",
    status: body.status || "draft",
    featured: body.featured ?? false,
    imagePosition: body.imagePosition || "center",
    coverImagePosition: body.coverImagePosition || "center",
    gallery: body.gallery || [],
  });

  res.status(201).json(project);
});

router.put("/admin/projects/:id", requireAdmin, (req, res) => {
  const body = req.body as Partial<StoredProject>;
  const updated = updateProject(req.params.id, body);
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(updated);
});

router.patch("/admin/projects/:id/featured", requireAdmin, (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  const updated = updateProject(req.params.id, { featured: !project.featured });
  res.json(updated);
});

router.patch("/admin/projects/:id/publish", requireAdmin, (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  const next = project.status === "published" ? "draft" : "published";
  const updated = updateProject(req.params.id, { status: next });
  res.json(updated);
});

router.post("/admin/projects/:id/duplicate", requireAdmin, (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const newId = `${slug}-copy-${randomUUID().slice(0, 6)}`;
  const duplicate = createProject({
    ...project,
    id: newId,
    title: `${project.title} (Copy)`,
    status: "draft",
    featured: false,
  });
  res.status(201).json(duplicate);
});

router.patch("/admin/projects/:id/archive", requireAdmin, (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  const next = project.status === "archived" ? "draft" : "archived";
  const updated = updateProject(req.params.id, { status: next });
  res.json(updated);
});

router.delete("/admin/projects/:id", requireAdmin, (req, res) => {
  const ok = deleteProject(req.params.id);
  if (!ok) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ success: true });
});

export default router;
