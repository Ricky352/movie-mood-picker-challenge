import { useState } from "react";
import type { Movie } from "../../types/movie.ts";
import { MovieCard } from "./MovieCard.tsx";
import { MovieModal } from "./MovieModal.tsx";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  const [selected, setSelected] = useState<Movie | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelected(movie)}
          />
        ))}
      </div>

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
