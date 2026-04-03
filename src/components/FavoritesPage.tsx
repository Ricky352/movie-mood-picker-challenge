import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { MovieGrid } from "./MovieGrid";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <main className="flex-1 py-8" style={{ animation: "page-enter 0.3s ease both" }}>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lilac-ash-400 hover:text-lilac-ash-100 bg-lilac-ash-800/60 hover:bg-lilac-ash-700/60 border border-lilac-ash-700/50 transition-all duration-200 cursor-pointer"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div>
          <h2 className="text-xl font-semibold text-lilac-ash-50 leading-tight">
            ♥ Favorites
          </h2>
          <p className="text-sm text-lilac-ash-400">
            {favorites.length === 0
              ? "No favorites yet"
              : `${favorites.length} saved movie${favorites.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <span className="text-5xl text-red-500" aria-hidden="true">♡</span>
          <p className="text-lilac-ash-400 text-sm">
            Heart a movie to save it here
          </p>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </main>
  );
};
