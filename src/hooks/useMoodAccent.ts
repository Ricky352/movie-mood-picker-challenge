import { useEffect } from "react";
import { MOODS } from "../constants/moods";
import type { Mood } from "../types/mood";
import { hexToRgba } from "../utils/colours";

const DEFAULT_ACCENT = "rgba(47, 42, 60, 0.7)";

export const useMoodAccent = (
  selected: Mood | null,
  randomHighlight: Mood | null,
) => {
  useEffect(() => {
    const activeMood = randomHighlight ?? selected;
    const config = MOODS.find((m) => m.mood === activeMood);
    if (config) {
      const color = hexToRgba(config.theme.color1, 0.25);
      if (color) document.body.style.setProperty("--mood-accent", color);
    } else {
      document.body.style.setProperty("--mood-accent", DEFAULT_ACCENT);
    }
  }, [selected, randomHighlight]);
};
