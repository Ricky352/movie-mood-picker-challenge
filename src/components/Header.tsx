import { useState } from "react"

interface HeaderProps {
  onSearch: (query: string) => void
  onFavoritesClick: () => void
  favoritesCount: number
}

export const Header = ({ onSearch, onFavoritesClick, favoritesCount }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <header className="flex items-center justify-between gap-4 py-4 border-b border-lilac-ash-700">
      <h1 className="text-2xl font-bold text-lilac-ash-50">Movie Mood Picker</h1>

      <form onSubmit={handleSubmit} className="flex-1 max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 rounded-lg bg-lilac-ash-800 border border-lilac-ash-600 text-lilac-ash-50 placeholder-lilac-ash-400 focus:outline-none focus:border-lilac-ash-400"
        />
      </form>

      <button
        onClick={onFavoritesClick}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lilac-ash-700 hover:bg-lilac-ash-600 text-lilac-ash-50 transition-colors"
      >
        <span>♥</span>
        <span>Favorites</span>
        {favoritesCount > 0 && (
          <span className="bg-lilac-ash-500 text-lilac-ash-50 text-xs px-2 py-0.5 rounded-full">
            {favoritesCount}
          </span>
        )}
      </button>
    </header>
  )
}
