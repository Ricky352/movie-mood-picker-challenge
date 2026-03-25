import type { MoodConfig } from "../types/mood"

// TMDB genre ids:
// 28=Action  35=Comedy  18=Drama  10749=Romance  27=Horror
// 878=Sci-Fi  12=Adventure  16=Animation  9648=Mystery  10751=Family

export const MOODS: MoodConfig[] = [
  {
    mood: "happy",
    label: "Happy",
    emoji: "😄",
    description: "Something fun and light to keep the good vibes going",
    genreIds: [35, 16, 10751],
    tmdbParams: { "vote_average.gte": 6.5 },
  },
  {
    mood: "sad",
    label: "Sad",
    emoji: "😢",
    description: "A good cry never hurt anyone",
    genreIds: [18],
    tmdbParams: { sort_by: "vote_average.desc", "vote_average.gte": 7 },
  },
  {
    mood: "thrilled",
    label: "Thrilled",
    emoji: "⚡",
    description: "Edge-of-your-seat energy, full throttle",
    genreIds: [28, 53, 80],
    tmdbParams: { "vote_average.gte": 6 },
  },
  {
    mood: "romantic",
    label: "Romantic",
    emoji: "❤️",
    description: "Love is in the air",
    genreIds: [10749, 35],
    tmdbParams: { "vote_average.gte": 6 },
  },
  {
    mood: "scared",
    label: "Scared",
    emoji: "👻",
    description: "Turn off the lights and hold on tight",
    genreIds: [27, 9648],
    tmdbParams: { "vote_average.gte": 6 },
  },
  {
    mood: "adventurous",
    label: "Adventurous",
    emoji: "🗺️",
    description: "Explore worlds beyond your own",
    genreIds: [12, 878, 14],
    tmdbParams: { "vote_average.gte": 6.5 },
  },
  {
    mood: "lazy",
    label: "Lazy",
    emoji: "🛋️",
    description: "Easy watching, zero effort required",
    genreIds: [35, 16, 10751],
    tmdbParams: { sort_by: "popularity.desc", "vote_average.gte": 6 },
  },
]

export const getMoodConfig = (mood: string): MoodConfig | undefined => MOODS.find((m) => m.mood === mood)
