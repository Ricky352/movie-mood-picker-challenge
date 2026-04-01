// Available moods the user can pick from
export type Mood =
  | "happy"
  | "sad"
  | "thrilled"
  | "romantic"
  | "scared"
  | "adventurous"
  | "lazy";

export interface MoodTheme {
  card: string;
  emoji: string;
  label: string;
  desc: string;
  glow: string;
  accent: string;
}

export interface MoodConfig {
  mood: Mood;
  label: string;
  // Emoji or icon identifier - use as you see fit in the UI
  emoji: string;
  description: string;
  // TMDB genre ids to query for this mood
  genreIds: number[];
  // Optional extra TMDB params (e.g. sort_by, vote_average.gte)
  tmdbParams?: Record<string, string | number>;
  // UI theme: Tailwind classes for the mood card
  theme: MoodTheme;
}
