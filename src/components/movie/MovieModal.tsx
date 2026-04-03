import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";
import { useFocusTrap } from "../../hooks/useFocusTrap.ts";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // prevent scrolling when modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : null;
  const mins = movie.runtime ? movie.runtime % 60 : null;
  const runtimeStr =
    hours != null && mins != null ? `${hours}h ${mins}m` : null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/45 backdrop-blur-lg"
      style={{ animation: "modal-backdrop-enter 0.25s ease both" }}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        className="relative w-full sm:max-w-2xl rounded-2xl bg-lilac-ash-900 border border-white/8"
        style={{
          animation: "modal-card-enter 0.35s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="false"
      >
        {/* Backdrop image */}
        {movie.backdropUrl ? (
          <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-6" />
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => toggleFavorite(movie)}
            aria-label={
              favorited
                ? `Remove ${movie.title} from favorites`
                : `Add ${movie.title} to favorites`
            }
            aria-pressed={favorited}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${favorited ? "bg-black/60 text-red-400" : "bg-black/40 text-white/60 hover:text-red-400"}`}
          >
            <span aria-hidden="true">{favorited ? "♥" : "♡"}</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-5 px-6 pb-2 mt-2">
          {/* Poster */}
          {movie.posterUrl && (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-24 shrink-0 rounded-xl shadow-2xl aspect-2/3 object-cover self-end"
            />
          )}

          {/* Title block */}
          <div className="flex flex-col justify-center">
            <h2
              id="movie-modal-title"
              className="text-xl font-bold text-white leading-tight"
            >
              {movie.title}
            </h2>
            {movie.tagline && (
              <p className="text-white/45 text-sm italic mt-1">
                {movie.tagline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-sm text-white/55">
              <span>{movie.releaseYear}</span>
              {runtimeStr && (
                <>
                  <span>·</span>
                  <span>{runtimeStr}</span>
                </>
              )}
              <span>·</span>
              <span className="text-yellow-400 font-medium">
                ★ {movie.rating.toFixed(1)}
              </span>
            </div>
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2.5 py-1 rounded-full text-white/65 bg-white/7 border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Overview */}
        {movie.overview && (
          <p className="px-6 mt-2 pb-6 text-white/65 text-sm leading-relaxed">
            {movie.overview}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
};
