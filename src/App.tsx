import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { getMoodConfig } from "./constants/moods";
import { useMovies } from "./hooks/useMovies";
import { useCustomMoods } from "./hooks/useCustomMoods";
import { Header } from "./components/Header";
import { MoodSelector } from "./components/MoodSelector";
import { MovieGrid } from "./components/MovieGrid";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { FavoritesPage } from "./components/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CustomMoodsProvider } from "./context/CustomMoodsContext";
import { hexToRgba } from "./utils/colours";
import type { MoodConfig } from "./types/mood";

const DEFAULT_ACCENT = "rgba(47, 42, 60, 0.7)";

const MoodPage = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleBack = () => {
    setExiting(true);
    setTimeout(() => navigate("/"), 300);
  };

  const { mood } = useParams<{ mood: string }>();
  const { movies, loading, error, loadMovies } = useMovies();
  const { customMoods } = useCustomMoods();

  const [debugLoading, setDebugLoading] = useState(false);
  const [debugError, setDebugError] = useState<string | null>(null);

  const isLoading = loading || debugLoading;
  const activeError = error ?? debugError;

  // Resolve mood config from built-in or custom moods
  const builtIn = mood ? getMoodConfig(mood) : undefined;
  const custom = mood ? customMoods.find((m) => m.id === mood) : undefined;
  const moodConfig = builtIn ?? custom ?? null;

  useEffect(() => {
    if (mood && moodConfig) {
      loadMovies({
        genreIds: moodConfig.genreIds,
        tmdbParams: (moodConfig as MoodConfig).tmdbParams,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMovies, mood]);

  // Handle background gradient
  useEffect(() => {
    if (!moodConfig) return;

    const color = hexToRgba(moodConfig.theme.color1, 0.25);
    if (!color) return;

    document.body.style.setProperty("--mood-accent", color);
    return () => {
      document.body.style.setProperty("--mood-accent", DEFAULT_ACCENT);
    };
  }, [moodConfig]);

  // TODO: Change styling later
  if (!mood || !moodConfig) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-5xl">🤔</span>
        <h2 className="text-2xl font-bold text-lilac-ash-50">Unknown mood</h2>
        <p className="text-lilac-ash-400 text-sm">
          We don't recognise{" "}
          <span className="text-lilac-ash-200 font-medium">"{mood}"</span> as a
          mood.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-lilac-ash-700 hover:bg-lilac-ash-600 text-lilac-ash-50 transition-colors cursor-pointer"
        >
          ← Back to moods
        </button>
      </main>
    );
  }

  const handleRetry = () => {
    loadMovies({
      genreIds: moodConfig.genreIds,
      tmdbParams: (moodConfig as MoodConfig).tmdbParams,
    });
  };

  return (
    <main
      className="flex-1 py-8"
      style={{
        animation: `${exiting ? "page-exit" : "page-enter"} 0.3s ease both`,
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <button
            onClick={handleBack}
            aria-label="Back to moods"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lilac-ash-400 hover:text-lilac-ash-100 bg-lilac-ash-800/60 hover:bg-lilac-ash-700/60 border border-lilac-ash-700/50 transition-all duration-200 cursor-pointer"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div>
          <h2 className="text-xl font-semibold text-lilac-ash-50 leading-tight">
            {moodConfig.emoji} {moodConfig.label} movies
          </h2>
          <p className="text-sm text-lilac-ash-400">{moodConfig.description}</p>
        </div>
      </div>

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
      {activeError && (
        <ErrorState message={activeError} onRetry={handleRetry} />
      )}
      {!isLoading && !activeError && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
      {!isLoading && !activeError && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <span className="text-5xl">🎬</span>
          <h3 className="text-lg font-semibold text-lilac-ash-100">No movies found</h3>
          <p className="text-sm text-lilac-ash-400 max-w-xs">
            We couldn't find any movies matching this mood. Try a different one!
          </p>
        </div>
      )}
    </main>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleMoodSelect = (id: string) => {
    setExiting(true);
    setTimeout(() => navigate(`/${id}`), 300);
  };

  return (
    <main
      className="flex-1 flex flex-col"
      style={{
        animation: `${exiting ? "page-exit" : "page-enter"} 0.3s ease both`,
      }}
    >
      <MoodSelector onSelect={handleMoodSelect} />
    </main>
  );
};

const App = () => {
  return (
    <FavoritesProvider>
      <CustomMoodsProvider>
        <div className="flex flex-col min-h-screen max-w-6xl mx-auto px-4">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/:mood" element={<MoodPage />} />
          </Routes>
        </div>
      </CustomMoodsProvider>
    </FavoritesProvider>
  );
};

export default App;
