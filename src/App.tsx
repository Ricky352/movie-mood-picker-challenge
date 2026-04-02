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
const DEFAULT_ACCENT = "rgba(47, 42, 60, 0.7)"

function hexToRgba(hex: string, alpha = 1) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return null

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

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


  // Handle background gradient
  useEffect(() => {
    const config = getMoodConfig(mood as Mood)
    if (!config) return

    const color = hexToRgba(config.theme.color1, 0.25)
    if (!color) return

    document.body.style.setProperty("--mood-accent", color)
    // cleanup
    return () => {
      document.body.style.setProperty("--mood-accent", DEFAULT_ACCENT)
    }
  }, [mood])


  // TODO: Change styling later
  if (!mood || !VALID_MOODS.has(mood as Mood)) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-5xl">🤔</span>
        <h2 className="text-2xl font-bold text-lilac-ash-50">Unknown mood</h2>
        <p className="text-lilac-ash-400 text-sm">We don't recognise <span className="text-lilac-ash-200 font-medium">"{mood}"</span> as a mood.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-lilac-ash-700 hover:bg-lilac-ash-600 text-lilac-ash-50 transition-colors cursor-pointer"
        >
          ← Back to moods
        </button>
      </main>
    )
  }

  const moodConfig = getMoodConfig(mood as Mood)

  const handleRetry = () => loadMovies(mood as Mood)

  return (
    <main className="flex-1 py-8">
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
    <main className="flex-1 h-full">
      <p className="text-lilac-ash-300 mb-6">How are you feeling today?</p>
      <MoodSelector onSelect={handleMoodSelect} />
    </main>
  )
}

const App = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:mood" element={<MoodPage />} />
      </Routes>
    </div>
  )
}

export default App
