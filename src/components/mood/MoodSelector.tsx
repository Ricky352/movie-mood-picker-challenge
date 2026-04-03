import { useState } from "react";
import { MOODS } from "../../constants/moods.ts";
import type { UnifiedMoodConfig } from "../../types/customMood.ts";
import { SunCenter } from "./SunCenter.tsx";
import { MoodBubble } from "./MoodBubble.tsx";
import { CreateMoodModal } from "./CreateMoodModal.tsx";
import { useContainerSize } from "../../hooks/useContainerSize.ts";
import { useOrbitAnimation } from "../../hooks/useOrbitAnimation.ts";
import { useMoodAccent } from "../../hooks/useMoodAccent.ts";
import { useRandomMoodSpin } from "../../hooks/useRandomMoodSpin.ts";
import { useCustomMoods } from "../../hooks/useCustomMoods.ts";

interface MoodSelectorProps {
  onSelect: (id: string) => void;
}

export const MoodSelector = ({ onSelect }: MoodSelectorProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [sunHovered, setSunHovered] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const { customMoods, addCustomMood, deleteCustomMood } = useCustomMoods();

  const { containerRef, containerSize } = useContainerSize(480);
  const orbitAngle = useOrbitAnimation();
  const { spinning, randomHighlight, handleRandomPick } = useRandomMoodSpin();

  const builtInMoods: UnifiedMoodConfig[] = MOODS.map((m) => ({
    id: m.mood,
    label: m.label,
    emoji: m.emoji,
    description: m.description,
    genreIds: m.genreIds,
    theme: { color1: m.theme.color1, color2: m.theme.color2 },
  }));

  const allMoods: UnifiedMoodConfig[] = [
    ...builtInMoods,
    ...customMoods.map((m) => ({ ...m, isCustom: true })),
  ];

  const activeId = randomHighlight ?? selected;
  const activeMoodConfig = allMoods.find((m) => m.id === activeId) ?? null;

  useMoodAccent(activeMoodConfig?.theme.color1 ?? null);

  const handleSelect = (id: string) => {
    if (spinning) return;
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleSunClick = () => {
    if (selected) {
      onSelect(selected);
    } else {
      handleRandomPick(
        allMoods.map((m) => m.id),
        (id) => setSelected(id),
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center content-center ">
      <div
        ref={containerRef}
        role="group"
        aria-label="Mood selector"
        className="relative w-full max-w-135 sm:max-w-160 lg:max-w-200 aspect-square mx-auto"
      >
        {/* Orbit ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full border border-dashed border-white/4 pointer-events-none" />

        <SunCenter
          onRandomPick={handleSunClick}
          activeMoodConfig={activeMoodConfig}
          sunHovered={sunHovered}
          onSunHover={setSunHovered}
          containerSize={containerSize}
        />

        {allMoods.map((config, i) => (
          <MoodBubble
            key={config.id}
            config={config}
            index={i}
            total={allMoods.length}
            selected={selected}
            hoveredId={randomHighlight ?? hovered}
            onSelect={handleSelect}
            onHover={setHovered}
            containerSize={containerSize}
            orbitAngle={orbitAngle}
            onDelete={
              config.isCustom
                ? () => {
                    deleteCustomMood(config.id);
                    if (selected === config.id) setSelected(null);
                  }
                : undefined
            }
          />
        ))}
      </div>

      <div className="flex flex-col items-center mt-4">
        <button
          onClick={() => setShowCreate(true)}
          className="text-md text-white/55 hover:text-white transition-colors duration-200 cursor-pointer underline underline-offset-2"
        >
          + Custom mood
        </button>
      </div>

      {showCreate && (
        <CreateMoodModal
          onClose={() => setShowCreate(false)}
          onCreate={(mood) => {
            addCustomMood(mood);
            setShowCreate(false);
          }}
        />
      )}
    </div>
  );
};
