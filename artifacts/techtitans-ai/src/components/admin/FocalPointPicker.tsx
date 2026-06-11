import { motion } from "framer-motion";

const POINTS = [
  { label: "Top Left",     value: "top left",     row: 0, col: 0 },
  { label: "Top Center",   value: "top center",   row: 0, col: 1 },
  { label: "Top Right",    value: "top right",    row: 0, col: 2 },
  { label: "Left",         value: "center left",  row: 1, col: 0 },
  { label: "Center",       value: "center",       row: 1, col: 1 },
  { label: "Right",        value: "center right", row: 1, col: 2 },
  { label: "Bottom Left",  value: "bottom left",  row: 2, col: 0 },
  { label: "Bottom",       value: "bottom center",row: 2, col: 1 },
  { label: "Bottom Right", value: "bottom right", row: 2, col: 2 },
];

interface FocalPointPickerProps {
  value: string;
  onChange: (v: string) => void;
  imageUrl?: string;
}

export function FocalPointPicker({ value, onChange, imageUrl }: FocalPointPickerProps) {
  const active = value || "center";

  return (
    <div className="space-y-2.5">
      <div className="flex items-start gap-4">
        {/* Grid */}
        <div className="flex-shrink-0">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-2">Focal Point</p>
          <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-white/5 border border-white/10 rounded-xl w-fit">
            {POINTS.map((pt) => {
              const isActive = active === pt.value;
              return (
                <button
                  key={pt.value}
                  type="button"
                  title={pt.label}
                  onClick={() => onChange(pt.value)}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? "bg-primary shadow-lg shadow-primary/40"
                      : "bg-white/5 hover:bg-white/15 border border-white/10"
                  }`}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="focal-dot"
                      className="w-2.5 h-2.5 rounded-full bg-white"
                    />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-foreground-muted mt-2 text-center">
            {POINTS.find((p) => p.value === active)?.label ?? "Center"}
          </p>
        </div>

        {/* Live preview */}
        {imageUrl && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-2">Card Preview</p>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-[16/9] relative">
              <img
                src={imageUrl}
                alt="focal preview"
                className="w-full h-full object-cover transition-all duration-300"
                style={{ objectPosition: active }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <p className="absolute bottom-1.5 left-2 text-white/50 text-xs font-mono">{active}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
