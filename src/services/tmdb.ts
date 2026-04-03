import type {
  Movie,
  TMDBDiscoverResponse,
  TMDBMovie,
  TMDBMovieDetails,
} from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const getApiKey = (): string => {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) throw new Error("Missing VITE_TMDB_API_KEY in environment");
  return key;
};

export const getPosterUrl = (
  path: string | null,
  size = "w500",
): string | null => (path ? `${IMAGE_BASE}/${size}${path}` : null);

export const getBackdropUrl = (
  path: string | null,
  size = "w1280",
): string | null => (path ? `${IMAGE_BASE}/${size}${path}` : null);

// Maps raw TMDB shape to the internal Movie type
const normalizeMovie = (raw: TMDBMovieDetails): Movie => ({
  id: raw.id,
  title: raw.title,
  overview: raw.overview,
  posterUrl: getPosterUrl(raw.poster_path),
  backdropUrl: getBackdropUrl(raw.backdrop_path),
  releaseYear: new Date(raw.release_date).getFullYear(),
  rating: Math.round(raw.vote_average * 10) / 10,
  genres: raw.genres?.map((g) => g.name) ?? [],
  runtime: raw.runtime ?? null,
  tagline: raw.tagline ?? "",
});

// Core fetch wrapper - handles auth, base URL, and error handling
const tmdbFetch = async <T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v)),
  );

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
};

/**
 * Returns raw TMDB movies matching the given genre ids.
 * Picks a random page (1-5) for variety on each call.
 */
export const fetchMoviesByMood = async (params: {
  genreIds: number[];
  tmdbParams?: Record<string, string | number>;
}): Promise<TMDBMovie[]> => {
  const randomPage = Math.floor(Math.random() * 5) + 1;
  const data = await tmdbFetch<TMDBDiscoverResponse>("/discover/movie", {
    with_genres: params.genreIds.join(","),
    sort_by: "popularity.desc",
    page: randomPage,
    ...params.tmdbParams,
  });
  return data.results;
};

/**
 * Returns a fully normalized Movie for a given TMDB movie id.
 */
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  const raw = await tmdbFetch<TMDBMovieDetails>(`/movie/${movieId}`);
  return normalizeMovie(raw);
};

/**
 * Title search - useful for an optional search feature.
 */
export const searchMovies = async (query: string): Promise<TMDBMovie[]> => {
  const data = await tmdbFetch<TMDBDiscoverResponse>("/search/movie", {
    query,
  });
  return data.results;
};
