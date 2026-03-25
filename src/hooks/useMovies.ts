import { useCallback, useState } from "react"
import { getMoodConfig } from "../constants/moods"
import { fetchMovieDetails, fetchMoviesByMood } from "../services/tmdb"
import type { Mood } from "../types/mood"
import type { Movie } from "../types/movie"

interface UseMoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

interface UseMoviesReturn extends UseMoviesState {
  loadMovies: (mood: Mood) => Promise<void>
  reset: () => void
}

const INITIAL_STATE: UseMoviesState = { movies: [], loading: false, error: null }

/**
 * Fetches and normalizes movies for a given mood.
 * Resolves full details for the top 6 results in parallel.
 *
 * Usage:
 *   const { movies, loading, error, loadMovies } = useMovies();
 *   loadMovies("happy");
 */
export const useMovies = (): UseMoviesReturn => {
  const [state, setState] = useState<UseMoviesState>(INITIAL_STATE)

  const loadMovies = useCallback(async (mood: Mood) => {
    const config = getMoodConfig(mood)
    if (!config) return

    setState({ movies: [], loading: true, error: null })

    try {
      const rawMovies = await fetchMoviesByMood(config)
      const detailed = await Promise.all(rawMovies.slice(0, 6).map((m) => fetchMovieDetails(m.id)))
      setState({ movies: detailed, loading: false, error: null })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setState({ movies: [], loading: false, error: message })
    }
  }, [])

  const reset = useCallback(() => setState(INITIAL_STATE), [])

  return { ...state, loadMovies, reset }
}
