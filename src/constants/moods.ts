import type { MoodConfig } from "../types/mood";

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
    theme: {
      card: "border-yellow-400/40 bg-yellow-400/10 hover:bg-yellow-400/20 hover:border-yellow-300/60",
      emoji: "text-yellow-300",
      label: "text-yellow-100",
      desc: "text-yellow-200/60",
      glow: "bg-yellow-400/20",
    },
  },
  {
    mood: "sad",
    label: "Sad",
    emoji: "😢",
    description: "A good cry never hurt anyone",
    genreIds: [18],
    tmdbParams: { sort_by: "vote_average.desc", "vote_average.gte": 7 },
    theme: {
      card: "border-blue-400/40 bg-blue-900/20 hover:bg-blue-900/30 hover:border-blue-300/60",
      emoji: "text-blue-300",
      label: "text-blue-100",
      desc: "text-blue-200/60",
      glow: "bg-blue-400/20",
    },
  },
  {
    mood: "thrilled",
    label: "Thrilled",
    emoji: "⚡",
    description: "Edge-of-your-seat energy, full throttle",
    genreIds: [28, 53, 80],
    tmdbParams: { "vote_average.gte": 6 },
    theme: {
      card: "border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/60",
      emoji: "text-orange-300",
      label: "text-orange-100",
      desc: "text-orange-200/60",
      glow: "bg-orange-400/20",
    },
  },
  {
    mood: "romantic",
    label: "Romantic",
    emoji: "❤️",
    description: "Love is in the air",
    genreIds: [10749, 35],
    tmdbParams: { "vote_average.gte": 6 },
    theme: {
      card: "border-pink-400/40 bg-pink-500/10 hover:bg-pink-500/20 hover:border-pink-300/60",
      emoji: "text-pink-300",
      label: "text-pink-100",
      desc: "text-pink-200/60",
      glow: "bg-pink-400/20",
    },
  },
  {
    mood: "scared",
    label: "Scared",
    emoji: "👻",
    description: "Turn off the lights and hold on tight",
    genreIds: [27, 9648],
    tmdbParams: { "vote_average.gte": 6 },
    theme: {
      card: "border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/30 hover:border-purple-400/60",
      emoji: "text-purple-300",
      label: "text-purple-100",
      desc: "text-purple-200/60",
      glow: "bg-purple-400/20",
    },
  },
  {
    mood: "adventurous",
    label: "Adventurous",
    emoji: "🗺️",
    description: "Explore worlds beyond your own",
    genreIds: [12, 878, 14],
    tmdbParams: { "vote_average.gte": 6.5 },
    theme: {
      card: "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/60",
      emoji: "text-emerald-300",
      label: "text-emerald-100",
      desc: "text-emerald-200/60",
      glow: "bg-emerald-400/20",
    },
  },
  {
    mood: "lazy",
    label: "Lazy",
    emoji: "🛋️",
    description: "Easy watching, zero effort required",
    genreIds: [35, 16, 10751],
    tmdbParams: { sort_by: "popularity.desc", "vote_average.gte": 6 },
    theme: {
      card: "border-slate-500/40 bg-slate-700/20 hover:bg-slate-700/30 hover:border-slate-400/60",
      emoji: "text-slate-300",
      label: "text-slate-100",
      desc: "text-slate-300/60",
      glow: "bg-slate-400/20",
    },
  },
];

export const getMoodConfig = (mood: string): MoodConfig | undefined =>
  MOODS.find((m) => m.mood === mood);
