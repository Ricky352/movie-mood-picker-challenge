import { useState, useRef } from "react";
import { MOODS } from "../constants/moods";
import type { Mood } from "../types/mood";

interface UseRandomMoodSpinResult {
  spinning: boolean;
  randomHighlight: Mood | null;
  handleRandomPick: (onSettled: (mood: Mood) => void) => void;
}

export const useRandomMoodSpin = (): UseRandomMoodSpinResult => {
  const [spinning, setSpinning] = useState(false);
  const [randomHighlight, setRandomHighlight] = useState<Mood | null>(null);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleRandomPick = (onSettled: (mood: Mood) => void) => {
    if (spinning) return;
    setSpinning(true);

    const finalIndex = Math.floor(Math.random() * MOODS.length);
    const minFlashes = 14;

    // Compute extra steps so the last flash lands exactly on finalIndex
    const extra =
      (finalIndex - ((minFlashes - 1) % MOODS.length) + MOODS.length) %
      MOODS.length;
    const totalFlashes = minFlashes + extra;

    const flash = (count: number) => {
      const idx = count % MOODS.length;
      setRandomHighlight(MOODS[idx].mood);

      if (count < totalFlashes - 1) {
        const progress = count / totalFlashes;
        const delay =
          progress < 0.6 ? 80 : 80 + (320 - 80) * ((progress - 0.6) / 0.4);
        spinTimeoutRef.current = setTimeout(() => flash(count + 1), delay);
      } else {
        // Last flash is already on the winner — settle into selected state
        spinTimeoutRef.current = setTimeout(() => {
          setRandomHighlight(null);
          setSpinning(false);
          onSettled(MOODS[finalIndex].mood);
        }, 450);
      }
    };

    flash(0);
  };

  return { spinning, randomHighlight, handleRandomPick };
};
