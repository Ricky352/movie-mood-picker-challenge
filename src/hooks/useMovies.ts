import { useCallback, useState } from "react";
import { fetchMovieDetails, fetchMoviesByMood } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface UseMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

interface UseMoviesReturn extends UseMoviesState {
  loadMovies: (
    params: {
      genreIds: number[];
      tmdbParams?: Record<string, string | number>;
    },
    signal?: AbortSignal,
  ) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: UseMoviesState = {
  movies: [],
  loading: false,
  error: null,
};

/**
 * Fetches and normalizes movies for a given set of genre ids.
 * Resolves full details for the top 6 results in parallel.
 *
 * Usage:
 *   const { movies, loading, error, loadMovies } = useMovies();
 *   loadMovies({ genreIds: [35, 16], tmdbParams: { "vote_average.gte": 6.5 } });
 */
export const useMovies = (): UseMoviesReturn => {
  const [state, setState] = useState<UseMoviesState>(INITIAL_STATE);

  const loadMovies = useCallback(
    async (
      params: {
        genreIds: number[];
        tmdbParams?: Record<string, string | number>;
      },
      signal?: AbortSignal,
    ) => {
      setState({ movies: [], loading: true, error: null });

      try {
        const rawMovies = await fetchMoviesByMood(params, signal);
        const detailed = await Promise.all(
          rawMovies.slice(0, 6).map((m) => fetchMovieDetails(m.id, signal)),
        );
        setState({ movies: detailed, loading: false, error: null });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setState({ movies: [], loading: false, error: message });
      }
    },
    [],
  );

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, loadMovies, reset };
};
