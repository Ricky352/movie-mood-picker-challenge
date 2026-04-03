import { useState } from "react";
import { MOODS } from "../constants/moods";
import type { Mood } from "../types/mood";
import { SunCenter } from "./SunCenter";
import { MoodBubble } from "./MoodBubble";
import { useContainerSize } from "../hooks/useContainerSize";
import { useOrbitAnimation } from "../hooks/useOrbitAnimation";
import { useMoodAccent } from "../hooks/useMoodAccent";
import { useRandomMoodSpin } from "../hooks/useRandomMoodSpin";

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
}

export const MoodSelector = ({ onSelect }: MoodSelectorProps) => {
  const [selected, setSelected] = useState<Mood | null>(null);
  const [hovered, setHovered] = useState<Mood | null>(null);
  const [sunHovered, setSunHovered] = useState(false);

  const { containerRef, containerSize } = useContainerSize(480);
  const orbitAngle = useOrbitAnimation();
  const { spinning, randomHighlight, handleRandomPick } = useRandomMoodSpin();

  useMoodAccent(selected, randomHighlight);

  const handleSelect = (mood: Mood) => {
    if (spinning) return;
    setSelected((prev) => (prev === mood ? null : mood));
  };

  const handleRandom = () => {
    setSelected(null);
    handleRandomPick((mood) => setSelected(mood));
  };

  const activeMood = MOODS.find((m) => m.mood === selected);

  return (
    <div className="flex-1 flex flex-col justify-center content-center ">
      <div
        ref={containerRef}
        className="relative w-full max-w-135 sm:max-w-160 lg:max-w-200 aspect-square mx-auto"
      >
        {/* Orbit ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full border border-dashed border-white/4 pointer-events-none" />

        <SunCenter
          onRandomPick={handleRandom}
          hoveredMood={hovered}
          selectedMood={selected}
          sunHovered={sunHovered}
          onSunHover={setSunHovered}
          containerSize={containerSize}
        />

        {MOODS.map((config, i) => (
          <MoodBubble
            key={config.mood}
            config={config}
            index={i}
            total={MOODS.length}
            selected={selected}
            hoveredId={randomHighlight ?? hovered}
            onSelect={handleSelect}
            onHover={setHovered}
            containerSize={containerSize}
            orbitAngle={orbitAngle}
          />
        ))}
      </div>

      <div
        className="flex justify-center mt-4"
        style={{ visibility: activeMood ? "visible" : "hidden" }}
      >
        <button
          onClick={() => onSelect(selected!)}
          className="px-9 py-3.5 rounded-[14px] border-0 text-black text-md font-bold cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
          style={{
            background: activeMood
              ? `linear-gradient(135deg, ${activeMood.theme.color1}, rgba(255, 255, 255, 0.14))`
              : "transparent",
            boxShadow: activeMood
              ? `0 8px 30px ${activeMood.theme.color1}44`
              : "none",
          }}
        >
          {activeMood
            ? `Show me ${activeMood.label.toLowerCase()} movies →`
            : "placeholder"}
        </button>
      </div>
    </div>
  );
};
