import type { Movie } from "../types/movie"

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="border border-lilac-ash-700 rounded-lg overflow-hidden bg-lilac-ash-800/50">
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
      <div className="p-4">
        <h3 className="font-semibold text-lg text-lilac-ash-50">{movie.title}</h3>
        <div className="flex items-center gap-2 text-sm text-lilac-ash-400 mt-1">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>★ {movie.rating}</span>
        </div>
        <p className="text-sm text-lilac-ash-300 mt-2 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  )
}
