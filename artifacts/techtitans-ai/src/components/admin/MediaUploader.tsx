import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Link2, X, Image, Film, FileText,
  CheckCircle2, AlertCircle, Loader2, FolderOpen
} from "lucide-react";

interface UploadResult {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  type: "image" | "video" | "pdf";
}

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: "image" | "image+video" | "all";
  hint?: string;
}

const ACCEPT_MAPS = {
  image: "image/jpeg,image/png,image/gif,image/webp,image/svg+xml",
  "image+video": "image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime",
  all: "image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime,application/pdf",
};

const LABEL = "block text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-2";
const INPUT = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all text-sm";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type }: { type: string }) {
  if (type === "video") return <Film className="w-5 h-5 text-pink-400" />;
  if (type === "pdf") return <FileText className="w-5 h-5 text-amber-400" />;
  return <Image className="w-5 h-5 text-blue-400" />;
}

export function MediaUploader({ label, value, onChange, accept = "image", hint }: MediaUploaderProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = value && (
    value.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) ||
    (uploaded?.type === "image")
  );
  const isVideo = value && (value.match(/\.(mp4|webm|mov)(\?.*)?$/i) || uploaded?.type === "video");
  const isPdf = value && (value.match(/\.pdf(\?.*)?$/i) || uploaded?.type === "pdf");

  const uploadFile = useCallback(async (file: File) => {
    setError("");
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("admin_token") || "";

    return new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/upload");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const result: UploadResult = JSON.parse(xhr.responseText);
          setUploaded(result);
          onChange(result.url);
          setProgress(100);
        } else {
          const err = JSON.parse(xhr.responseText);
          setError(err.error || "Upload failed");
        }
        resolve();
      };

      xhr.onerror = () => {
        setUploading(false);
        setError("Network error. Please try again.");
        resolve();
      };

      xhr.send(formData);
    });
  }, [onChange]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    uploadFile(files[0]);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const clearFile = () => {
    setUploaded(null);
    setError("");
    setProgress(0);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={LABEL}>{label}</label>
        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          <button type="button" onClick={() => setMode("upload")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${mode === "upload" ? "bg-primary text-white" : "text-foreground-muted hover:text-white"}`}>
            <Upload className="w-3 h-3" /> Upload
          </button>
          <button type="button" onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${mode === "url" ? "bg-primary text-white" : "text-foreground-muted hover:text-white"}`}>
            <Link2 className="w-3 h-3" /> URL
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === "url" ? (
          <motion.div key="url" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            <input
              className={INPUT}
              value={value}
              onChange={(e) => { onChange(e.target.value); setUploaded(null); }}
              placeholder="https://images.unsplash.com/..."
            />
          </motion.div>
        ) : (
          <motion.div key="upload" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            {/* Drop zone */}
            {!value || uploading ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !uploading && inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragging
                    ? "border-primary bg-primary/10 scale-[1.01]"
                    : uploading
                    ? "border-white/10 bg-white/3 cursor-not-allowed"
                    : "border-white/15 bg-white/3 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPT_MAPS[accept]}
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                {uploading ? (
                  <div className="space-y-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <p className="text-white text-sm font-medium">Uploading... {progress}%</p>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                      <FolderOpen className="w-6 h-6 text-foreground-muted" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Drop your file here or{" "}
                        <span className="text-primary underline underline-offset-2">browse files</span>
                      </p>
                      <p className="text-foreground-muted text-xs mt-1">
                        {accept === "image" && "JPG, PNG, GIF, WebP, SVG — max 50MB"}
                        {accept === "image+video" && "JPG, PNG, GIF, WebP, MP4, WebM — max 50MB"}
                        {accept === "all" && "Images, Videos (MP4/WebM), PDFs — max 50MB"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Preview of uploaded file */
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/3">
                {isImage && (
                  <img src={value} alt="uploaded" className="w-full h-48 object-cover" />
                )}
                {isVideo && (
                  <video src={value} className="w-full h-48 object-cover" controls />
                )}
                {isPdf && (
                  <div className="h-20 flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-amber-400" />
                    <span className="text-white text-sm font-medium">PDF uploaded</span>
                  </div>
                )}

                {/* Overlay info bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-background/80 backdrop-blur-sm border-t border-white/10">
                  <div className="flex items-center gap-2 min-w-0">
                    {uploaded ? <FileIcon type={uploaded.type} /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    <div className="min-w-0">
                      <p className="text-white text-xs font-medium truncate">
                        {uploaded?.originalName || "Uploaded file"}
                      </p>
                      {uploaded && (
                        <p className="text-foreground-muted text-xs">{formatBytes(uploaded.size)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button type="button" onClick={() => inputRef.current?.click()}
                      className="text-xs text-primary hover:underline">
                      Replace
                    </button>
                    <button type="button" onClick={clearFile}
                      className="p-1 rounded-md text-foreground-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hidden input for replace */}
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPT_MAPS[accept]}
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mt-2">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {hint && <p className="text-xs text-foreground-muted">{hint}</p>}
    </div>
  );
}
