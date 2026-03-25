import { MOODS } from "./constants/moods"
import { useMovies } from "./hooks/useMovies"

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
const App = () => {
  const { movies, loading, error, loadMovies, reset } = useMovies()

  // Start here 👇
  console.log({ MOODS, movies, loading, error, loadMovies, reset })

  return (
    <main>
      <h1>Movie Mood Picker</h1>
    </main>
  )
}

export default App
