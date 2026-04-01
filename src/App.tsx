import { useEffect, useState } from "react"
import { Routes, Route, useNavigate, useParams } from "react-router-dom"
import { getMoodConfig, MOODS } from "./constants/moods"
import { useMovies } from "./hooks/useMovies"
import { Header } from "./components/Header"
import { MoodSelector } from "./components/MoodSelector"
import { MovieGrid } from "./components/MovieGrid"
import { LoadingState } from "./components/LoadingState"
import { ErrorState } from "./components/ErrorState"
import type { Mood } from "./types/mood"

/**
 * Entry point - wire your components here.
 *
 * Available data:
 *   MOODS        — array of MoodConfig (mood, label, emoji, description, genreIds)
 *   useMovies()  — returns { movies, loading, error, loadMovies(mood), reset() }
 *
 * Your job:
 *   1. Let the user pick a mood
 *   2. Call loadMovies(mood) to fetch suggestions
 *   3. Display the results (title, poster, rating, description)
 *   4. Handle loading & error states
 *
 * Check the README for the full API reference.
 */

const VALID_MOODS = new Set(MOODS.map((m) => m.mood))

const MoodPage = () => {
  const navigate = useNavigate()

  const { mood } = useParams<{ mood: string }>()
  const { movies, loading, error, loadMovies } = useMovies()

  const [debugLoading, setDebugLoading] = useState(false)
  const [debugError, setDebugError] = useState<string | null>(null)

  const isLoading = loading || debugLoading
  const activeError = error ?? debugError

  useEffect(() => {
    if (mood && VALID_MOODS.has(mood as Mood)) {
      loadMovies(mood as Mood)
    }
  }, [loadMovies, mood])

  // TODO: remove logs
  useEffect(() => {
    if (loading) console.debug("[MoodPage] loading movies for mood:", mood)
  }, [loading, mood])

  useEffect(() => {
    if (error) console.error("[MoodPage] error fetching movies:", error)
  }, [error])

  if (!mood || !VALID_MOODS.has(mood as Mood)) {
    return (
      <main className="py-8">
        <p className="text-lilac-ash-300">Unknown mood. <button onClick={() => navigate("/")} className="underline">Go back</button></p>
      </main>
    )
  }

  const moodConfig = getMoodConfig(mood as Mood)

  const handleRetry = () => loadMovies(mood as Mood)

  return (
    <main className="py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-lilac-ash-400 hover:text-lilac-ash-200 transition-colors"
      >
        ← Back to moods
      </button>

      {moodConfig && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-lilac-ash-50">
            {moodConfig.emoji} {moodConfig.label} movies
          </h2>
          <p className="text-lilac-ash-400">{moodConfig.description}</p>
        </div>
      )}

      {/* TODO: remove debug*/}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDebugLoading((v) => !v)}
          className="text-xs px-2 py-1 rounded bg-lilac-ash-800 text-lilac-ash-300 hover:bg-lilac-ash-700"
        >
          {debugLoading ? "Stop loading" : "Trigger loading"}
        </button>
        <button
          onClick={() => setDebugError((v) => (v ? null : "Simulated error"))}
          className="text-xs px-2 py-1 rounded bg-lilac-ash-800 text-lilac-ash-300 hover:bg-lilac-ash-700"
        >
          {debugError ? "Clear error" : "Trigger error"}
        </button>
      </div>

      {isLoading && <LoadingState />}
      {activeError && <ErrorState message={activeError} onRetry={handleRetry} />}
      {!isLoading && !activeError && movies.length > 0 && <MovieGrid movies={movies} />}
    </main>
  )
}

const HomePage = () => {
  const navigate = useNavigate()

  const handleMoodSelect = (mood: Mood) => {
    navigate(`/${mood}`)
  }

  return (
    <main className="py-8">
      <p className="text-lilac-ash-300 mb-6">How are you feeling today?</p>
      <MoodSelector onSelect={handleMoodSelect} />
    </main>
  )
}

const App = () => {
  const [favorites] = useState<number[]>([])

  // TODO: implement search & favorites
  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }

  const handleFavoritesClick = () => {
    console.log("Favorites:", favorites)
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Header
        onSearch={handleSearch}
        onFavoritesClick={handleFavoritesClick}
        favoritesCount={favorites.length}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:mood" element={<MoodPage />} />
      </Routes>
    </div>
  )
}

export default App
