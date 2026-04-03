import type { UnifiedMoodConfig } from "../../types/customMood.ts";

interface SunProps {
  onRandomPick: () => void;
  activeMoodConfig: UnifiedMoodConfig | null;
  sunHovered: boolean;
  onSunHover: (v: boolean) => void;
  containerSize: number;
}

export const SunCenter = ({
  onRandomPick,
  activeMoodConfig,
  sunHovered,
  onSunHover,
  containerSize,
}: SunProps) => {
  const color1 = activeMoodConfig?.theme.color1;
  const color2 = activeMoodConfig?.theme.color2;

  const orbSize = containerSize * 0.32;
  const labelSize = containerSize * 0.044;
  const descSize = containerSize * 0.018;
  const emojiSize = containerSize * 0.052;
  const randomLabelSize = containerSize * 0.024;
  const surpriseSize = containerSize * 0.017;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] flex flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        aria-label={
          activeMoodConfig
            ? `${activeMoodConfig.label} selected`
            : "Pick a random mood"
        }
        onClick={onRandomPick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onRandomPick();
          }
        }}
        onMouseEnter={() => onSunHover(true)}
        onMouseLeave={() => onSunHover(false)}
        onFocus={() => onSunHover(true)}
        onBlur={() => onSunHover(false)}
        className={`rounded-full cursor-pointer flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-md ${sunHovered && !activeMoodConfig ? "scale-[1.08]" : ""}`}
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          background: color1
            ? `radial-gradient(circle at 40% 38%, ${color1}55, ${color2}33, rgba(15,15,25,0.95))`
            : sunHovered
              ? "radial-gradient(circle at 40% 38%, rgba(255,210,80,0.45), rgba(255,140,40,0.25), rgba(15,15,25,0.95))"
              : "radial-gradient(circle at 40% 38%, rgba(255,200,60,0.30), rgba(255,130,30,0.15), rgba(15,15,25,0.95))",
          border: `1.5px solid ${
            color1
              ? color1 + "44"
              : sunHovered
                ? "rgba(255,200,60,0.35)"
                : "rgba(255,200,60,0.15)"
          }`,
          boxShadow: color1
            ? `0 0 50px ${color1}33, inset 0 0 40px ${color1}15`
            : "0 0 40px rgba(255,180,40,0.15), inset 0 0 30px rgba(255,200,60,0.08)",
        }}
      >
        {activeMoodConfig ? (
          <div className="text-center px-2.5">
            <div
              key={activeMoodConfig.id}
              className="font-extrabold tracking-[-0.03em] leading-[1.1] inline-block"
              style={{
                fontSize: `${labelSize}px`,
                background: `linear-gradient(135deg, ${color1}, ${color2})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {activeMoodConfig.label}
            </div>

            <div
              className="text-white/40 mt-1 italic leading-[1.3]"
              style={{ fontSize: `${descSize}px` }}
            >
              {activeMoodConfig.description}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-1" style={{ fontSize: `${emojiSize}px` }}>
              🎲
            </div>

            <div
              className={`font-bold transition-colors duration-300 ${sunHovered ? "text-[rgba(255,220,80,0.95)]" : "text-[rgba(255,200,60,0.7)]"}`}
              style={{ fontSize: `${randomLabelSize}px` }}
            >
              Random
            </div>

            <div
              className="text-white/30 mt-0.5"
              style={{ fontSize: `${surpriseSize}px` }}
            >
              Surprise me
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
