import type { Movie } from "../../types/movie.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : null;
  const mins = movie.runtime ? movie.runtime % 60 : null;
  const runtimeStr =
    hours != null && mins != null ? `${hours}h ${mins}m` : null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="cursor-pointer border border-lilac-ash-700 rounded-lg overflow-hidden bg-lilac-ash-800/50 transition-all duration-300 hover:-translate-y-1 hover:border-lilac-ash-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group relative"
    >
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-lilac-ash-700 flex items-center justify-center">
          <span className="text-lilac-ash-400">No poster</span>
        </div>
      )}

      {/* Favorite button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}
        aria-label={favorited ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        aria-pressed={favorited}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 ${favorited ? "opacity-100 bg-black/60 text-red-400" : "bg-black/40 text-white/70 hover:text-red-400"}`}
      >
        <span aria-hidden="true">{favorited ? "♥" : "♡"}</span>
      </button>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-lilac-ash-50 leading-tight">
          {movie.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-lilac-ash-400 mt-1">
          <span>{movie.releaseYear}</span>
          {runtimeStr && (
            <>
              <span>·</span>
              <span>{runtimeStr}</span>
            </>
          )}
          <span>·</span>
          <span className="text-yellow-400 font-medium">★ {movie.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-lilac-ash-300 mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};
