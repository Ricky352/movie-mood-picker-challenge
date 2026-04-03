import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CustomMoodConfig } from "../types/customMood";

interface CreateMoodModalProps {
  onClose: () => void;
  onCreate: (mood: CustomMoodConfig) => void;
}

const TMDB_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 37, name: "Western" },
];

const COLOR_PRESETS = [
  { color1: "#f59e0b", color2: "#d97706" },
  { color1: "#ef4444", color2: "#dc2626" },
  { color1: "#8b5cf6", color2: "#7c3aed" },
  { color1: "#3b82f6", color2: "#2563eb" },
  { color1: "#10b981", color2: "#059669" },
  { color1: "#ec4899", color2: "#db2777" },
  { color1: "#f97316", color2: "#ea580c" },
  { color1: "#06b6d4", color2: "#0891b2" },
];

export const CreateMoodModal = ({ onClose, onCreate }: CreateMoodModalProps) => {
  const [emoji, setEmoji] = useState("✨");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const canSubmit = name.trim().length > 0 && selectedGenres.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const preset = COLOR_PRESETS[selectedColor];
    const mood: CustomMoodConfig = {
      id: `custom-${Date.now()}`,
      label: name.trim(),
      emoji: emoji || "✨",
      description: description.trim(),
      genreIds: selectedGenres,
      theme: {
        color1: preset.color1,
        color2: preset.color2,
      },
    };
    onCreate(mood);
  };

  const activePreset = COLOR_PRESETS[selectedColor];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/45 backdrop-blur-lg"
      style={{ animation: "modal-backdrop-enter 0.25s ease both" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg rounded-2xl bg-lilac-ash-900 border border-white/8 overflow-hidden"
        style={{
          animation: "modal-card-enter 0.35s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
          <h2 className="text-lg font-bold text-white">Create custom mood</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/6 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Emoji + Name */}
          <div className="flex gap-3 items-start">
            <div className="flex flex-col items-center gap-1">
              <label className="text-xs text-white/40 uppercase tracking-wider">
                Emoji
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmoji(val.slice(-2) || "✨");
                }}
                className="w-16 h-16 text-3xl text-center bg-white/6 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/25 cursor-text"
                placeholder="✨"
                maxLength={4}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs text-white/40 uppercase tracking-wider">
                Name <span className="text-red-400/70">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cozy night in"
                className="w-full px-3 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/25 text-sm"
              />
              <label className="text-xs text-white/40 uppercase tracking-wider mt-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional tagline"
                className="w-full px-3 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/25 text-sm"
              />
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
              Genres <span className="text-red-400/70">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TMDB_GENRES.map((genre) => {
                const active = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      active
                        ? "border-white/30 bg-white/15 text-white"
                        : "border-white/8 bg-white/4 text-white/50 hover:border-white/20 hover:text-white/75"
                    }`}
                    style={
                      active
                        ? {
                            borderColor: activePreset.color1 + "66",
                            backgroundColor: activePreset.color1 + "22",
                            color: activePreset.color1,
                          }
                        : undefined
                    }
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colour */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
              Color
            </label>
            <div className="flex gap-2.5">
              {COLOR_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className="w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2})`,
                    outline:
                      selectedColor === i
                        ? `2px solid ${preset.color1}`
                        : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/6 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-black transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
            style={{
              background: canSubmit
                ? `linear-gradient(135deg, ${activePreset.color1}, ${activePreset.color2})`
                : "rgba(255,255,255,0.2)",
            }}
          >
            Create Mood
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
