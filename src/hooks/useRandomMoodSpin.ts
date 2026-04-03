import { useState, useRef } from "react";

interface UseRandomMoodSpinResult {
  spinning: boolean;
  randomHighlight: string | null;
  handleRandomPick: (ids: string[], onSettled: (id: string) => void) => void;
}

export const useRandomMoodSpin = (): UseRandomMoodSpinResult => {
  const [spinning, setSpinning] = useState(false);
  const [randomHighlight, setRandomHighlight] = useState<string | null>(null);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleRandomPick = (
    ids: string[],
    onSettled: (id: string) => void,
  ) => {
    if (spinning || ids.length === 0) return;
    setSpinning(true);

    const finalIndex = Math.floor(Math.random() * ids.length);
    const minFlashes = 14;

    // Compute extra steps so the last flash lands exactly on finalIndex
    const extra =
      (finalIndex - ((minFlashes - 1) % ids.length) + ids.length) % ids.length;
    const totalFlashes = minFlashes + extra;

    const flash = (count: number) => {
      const idx = count % ids.length;
      setRandomHighlight(ids[idx]);

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
          onSettled(ids[finalIndex]);
        }, 450);
      }
    };

    flash(0);
  };

  return { spinning, randomHighlight, handleRandomPick };
};
