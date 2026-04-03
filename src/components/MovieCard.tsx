import type { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  return (
    <div
      onClick={onClick}
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
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 ${favorited ? "opacity-100 bg-black/60 text-red-400" : "bg-black/40 text-white/70 hover:text-red-400"}`}
      >
        {favorited ? "♥" : "♡"}
      </button>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-lilac-ash-50 leading-tight">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-lilac-ash-400 mt-1">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>★ {movie.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-lilac-ash-300 mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};
