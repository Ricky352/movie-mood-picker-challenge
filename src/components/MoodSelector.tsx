import { MOODS } from "../constants/moods"
import type { Mood } from "../types/mood"

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void
}

export const MoodSelector = ({ onSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOODS.map((config) => {
        const { theme } = config
        return (
          <button
            key={config.mood}
            onClick={() => onSelect(config.mood)}
            className={`group cursor-pointer relative overflow-hidden p-6 text-left border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.card}`}
          >
            {/* Glow */}
            <div
              className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${theme.glow}`}
            />

            {/* Emoji */}
            <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl text-3xl mb-4 ${theme.glow}`}>
              {config.emoji}
            </div>

            {/* Text */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-lg font-semibold ${theme.label}`}>{config.label}</h3>
                <span className={`text-lg opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 ${theme.label}`}>
                  →
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${theme.desc}`}>{config.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
