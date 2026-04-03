import { createContext, useCallback, useState } from "react";
import type { Movie } from "../types/movie";

const STORAGE_KEY = "movie-mood-favorites";

const load = (): Movie[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Movie[]) : [];
  } catch {
    return [];
  }
};

interface FavoritesContextValue {
  favorites: Movie[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>(load);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const next = prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((m) => m.id === id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };
