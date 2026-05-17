import { Router } from "express";
import multer from "multer";
import { createHmac } from "crypto";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";
import type { Request, Response, NextFunction } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = join(__dirname, "../../uploads");

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] || "techtitans2024";
const SECRET = process.env["ADMIN_SECRET"] || "tt_secret_key_2024";
const VALID_TOKEN = createHmac("sha256", SECRET).update(ADMIN_PASSWORD).digest("hex");

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer ")) { res.status(401).json({ error: "Unauthorized" }); return; }
  if (auth.slice(7) !== VALID_TOKEN) { res.status(401).json({ error: "Invalid token" }); return; }
  next();
}

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "application/pdf": ".pdf",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED_TYPES[file.mimetype] || extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`));
    }
  },
});

const router = Router();

router.post("/admin/upload", requireAdmin, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const url = `/api/uploads/${req.file.filename}`;
    const type = req.file.mimetype.startsWith("image/") ? "image"
      : req.file.mimetype.startsWith("video/") ? "video"
      : "pdf";
    res.json({
      url,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      type,
    });
  });
});

export { UPLOADS_DIR };
export default router;
