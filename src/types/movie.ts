// Raw shape returned by TMDB /discover/movie - only fields we use
export interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export interface TMDBMovieDetails extends Omit<TMDBMovie, "genre_ids"> {
  genres: { id: number; name: string }[]
  runtime: number | null
  tagline: string
  homepage: string
}

export interface TMDBDiscoverResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

// Normalized movie shape used in the app - decoupled from TMDB
export interface Movie {
  id: number
  title: string
  overview: string
  posterUrl: string | null
  backdropUrl: string | null
  releaseYear: number
  rating: number
  genres: string[]
  runtime: number | null
  tagline: string
}
