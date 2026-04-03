import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites.ts";

export const Header = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-white">Mood Picker</h1>
          <p className="text-xs text-white/35 uppercase tracking-widest">
            Movies for every feeling
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/favorites")}
        aria-label={`Favorites${favorites.length > 0 ? `, ${favorites.length} saved` : ""}`}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white/90 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 backdrop-blur-md transition-all duration-300 cursor-pointer"
      >
        <span aria-hidden="true">♥</span>
        <span>Favorites</span>
        {favorites.length > 0 && (
          <span
            aria-hidden="true"
            className="bg-white/10 text-white/80 text-xs px-1.5 py-0.5 rounded-full"
          >
            {favorites.length}
          </span>
        )}
      </button>
    </header>
  );
};
