# 🎬 Movie Mood Picker — Technical Test

## The brief

Build a UI that lets the user pick their mood and get movie suggestions matching that vibe.
The scaffold handles all the data plumbing — your job is everything the user sees and feels.

---

## Rules of the game

- **Use any tool you want.** LLMs, Copilot, ChatGPT, Claude, Stack Overflow — we don't care how you get there. What matters is **the quality of the final code and a working, polished app.**
- **Install any library you like** — and it's encouraged. Framer Motion, Radix, shadcn, Styled Components, whatever helps you ship something great.
- The only hard constraints: **React + TypeScript**, and the app must run with `npm run dev`.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up your TMDB API key
cp .env.example .env
# Get a free key at: https://www.themoviedb.org/settings/api

# 3. Start the dev server
npm run dev
```

---

## What is already in place

### Types — `src/types/`

| File       | What it contains                                                            |
| ---------- | --------------------------------------------------------------------------- |
| `mood.ts`  | `Mood` union type, `MoodConfig` interface                                   |
| `movie.ts` | `Movie` (internal), `TMDBMovie`, `TMDBMovieDetails`, `TMDBDiscoverResponse` |

The `Movie` type is what you work with in components — already normalized and decoupled from TMDB.

### Constants — `src/constants/moods.ts`

`MOODS` — array of 7 `MoodConfig` objects, each with:

- `mood` — the key (`"happy"`, `"sad"`, etc.)
- `label` + `emoji` — ready to render
- `description` — subtitle text
- `genreIds` — TMDB genre ids already mapped
- `tmdbParams` — extra query params tuned per mood

`getMoodConfig(mood)` — quick lookup by mood key.

### Services — `src/services/tmdb.ts`

| Function                        | Returns                | Description                                    |
| ------------------------------- | ---------------------- | ---------------------------------------------- |
| `fetchMoviesByMood(moodConfig)` | `Promise<TMDBMovie[]>` | Queries TMDB discover, random page for variety |
| `fetchMovieDetails(movieId)`    | `Promise<Movie>`       | Full normalized Movie object                   |
| `searchMovies(query)`           | `Promise<TMDBMovie[]>` | Title search, useful for an optional feature   |
| `getPosterUrl(path, size?)`     | `string \| null`       | Builds full TMDB image URL                     |
| `getBackdropUrl(path, size?)`   | `string \| null`       | Builds full TMDB backdrop URL                  |

### Hook — `src/hooks/useMovies.ts`

```ts
const { movies, loading, error, loadMovies, reset } = useMovies();
```

|                    | Type                            | Description                                   |
| ------------------ | ------------------------------- | --------------------------------------------- |
| `loadMovies(mood)` | `(mood: Mood) => Promise<void>` | Fetches + normalizes top 6 movies in parallel |
| `movies`           | `Movie[]`                       | Normalized, ready to render                   |
| `loading`          | `boolean`                       | —                                             |
| `error`            | `string \| null`                | —                                             |
| `reset()`          | `() => void`                    | Clears state                                  |

---

## Your playground — `src/App.tsx`

Intentionally bare — just a title and a `console.log` to show what's available.
**Build everything from here.**

Feel free to:

- Add a `src/components/` folder and organize as you see fit
- Install any UI or animation library (Framer Motion, Radix, anything)
- Use any CSS approach — Tailwind is already set up, but modules, styled-components, or plain CSS work too
- Extend the types, add services, create new hooks

---

## MVP checklist

- [ ] User can select a mood
- [ ] App fetches and displays movie suggestions
- [ ] Each movie shows: title, poster, rating, short description
- [ ] Loading and error states handled

## Ideas for extra passes (optional)

- Smooth transitions between mood selection and results
- Single random pick — "we chose for you" experience
- Movie detail modal or expanded card
- Favorites with `localStorage` persistence
- Full-screen backdrop as ambient background
- Custom mood definitions by the user
- Accessibility — keyboard nav, aria labels, focus management

---

## Deliverables

- Public GitHub repo
- Deployed demo (Vercel, Netlify, anything)
- A short note at the bottom of this README:
  - Your technical choices
  - What you would improve with more time

---

_Good luck. Have fun with it. 🍿_
