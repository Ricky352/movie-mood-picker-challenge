import { useEffect } from "react";
import { hexToRgba } from "../utils/colours";

const DEFAULT_ACCENT = "rgba(47, 42, 60, 0.7)";

export const useMoodAccent = (color1: string | null) => {
  useEffect(() => {
    const color = color1 ? hexToRgba(color1, 0.25) : null;
    document.body.style.setProperty("--mood-accent", color ?? DEFAULT_ACCENT);
  }, [color1]);
};
