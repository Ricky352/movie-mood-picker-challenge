import type { UnifiedMoodConfig } from "../types/customMood";

export interface BubbleProps {
  config: UnifiedMoodConfig;
  index: number;
  total: number;
  selected: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  containerSize: number;
  orbitAngle: number;
  onDelete?: () => void;
}

const getHexWithAlpha = (hex: string, alpha: string) => `${hex}${alpha}`;

export const MoodBubble = ({
  config,
  index,
  total,
  selected,
  hoveredId,
  onSelect,
  onHover,
  containerSize,
  orbitAngle,
  onDelete,
}: BubbleProps) => {
  const isSelected = selected === config.id;
  const isHovered = hoveredId === config.id;
  const isDimmed = (selected || hoveredId) && !isSelected && !isHovered;

  const baseAngle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const angle = baseAngle + orbitAngle;
  const radius = containerSize * 0.36;
  const cx = Math.cos(angle) * radius;
  const cy = Math.sin(angle) * radius;

  const bubbleSize =
    containerSize * (isSelected ? 0.2 : isHovered ? 0.18 : 0.145);
  const emojiSize =
    containerSize * (isSelected ? 0.063 : isHovered ? 0.056 : 0.048);
  const labelSize = containerSize * 0.019;

  const { color1, color2 } = config.theme;

  const bubbleBackground = `radial-gradient(circle at 35% 35%, ${color1}44, ${color2}22, rgba(20,20,30,0.92))`;

  const bubbleBorder = isSelected
    ? `${getHexWithAlpha(color1, "88")}`
    : isHovered
      ? `${getHexWithAlpha(color1, "44")}`
      : "rgba(255,255,255,0.07)";

  const bubbleShadow = isSelected
    ? `0 0 40px ${color1}44, inset 0 0 30px ${color1}11`
    : isHovered
      ? `0 0 25px ${color1}22`
      : "0 4px 20px rgba(0,0,0,0.3)";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${config.label} mood`}
      onMouseEnter={() => onHover(config.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(config.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(config.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(config.id);
        }
      }}
      className={`absolute left-1/2 top-1/2 rounded-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isSelected || isHovered ? "z-10" : "z-1"
      }`}
      style={{
        transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${isDimmed ? 0.85 : 1})`,
      }}
    >
      <div
        className={`absolute -inset-4.5 rounded-full pointer-events-none transition-opacity duration-400 ease-in-out ${
          isSelected || isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle, ${color1}33 0%, transparent 70%)`,
        }}
      />

      <div
        className="rounded-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-sm"
        style={{
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          minWidth: `${bubbleSize}px`,
          background: bubbleBackground,
          border: `1.5px solid ${bubbleBorder}`,
          boxShadow: bubbleShadow,
        }}
      >
        <span
          className="leading-none transition-[font-size] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ fontSize: `${emojiSize}px` }}
        >
          {config.emoji}
        </span>

        <span
          className="mt-1 text-center font-semibold transition-colors duration-300"
          style={{
            fontSize: `${labelSize}px`,
            color: isSelected ? color1 : "rgba(255,255,255,0.9)",
          }}
        >
          {config.label}
        </span>

        {isSelected && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label={`Delete ${config.label} mood`}
            className="mt-1 text-white/40 hover:text-red-400 transition-colors duration-200 cursor-pointer"
            style={{ fontSize: `${containerSize * 0.014}px` }}
          >
            <span aria-hidden="true">✕</span> Delete
          </button>
        )}
      </div>
    </div>
  );
};
