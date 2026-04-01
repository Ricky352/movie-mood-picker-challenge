import { MOODS } from "../constants/moods"
import type { Mood } from "../types/mood"

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void
}

export const MoodSelector = ({ onSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOODS.map((config) => (
        <button
          key={config.mood}
          onClick={() => onSelect(config.mood)}
          className="p-4 text-left border border-lilac-ash-700 rounded-lg bg-lilac-ash-800/50 hover:bg-lilac-ash-700/50 hover:border-lilac-ash-500 transition-colors"
        >
          <span className="text-2xl">{config.emoji}</span>
          <h3 className="text-lg font-semibold mt-2 text-lilac-ash-50">{config.label}</h3>
          <p className="text-sm text-lilac-ash-400">{config.description}</p>
        </button>
      ))}
    </div>
  )
}
