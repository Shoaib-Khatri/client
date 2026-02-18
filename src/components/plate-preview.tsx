import { cn } from "@/lib/utils";
import { FRONT_SIZES, REAR_SIZES } from "@/lib/plate-data";

export type PlateStyle = "standard" | "3d" | "4d";
export type PlateBorder = "none" | "red" | "green" | "blue" | "black";
export type PlateBadge = "none" | "uk" | "eng" | "cym" | "sco";

interface PlateProps {
  variant: "front" | "rear";
  reg: string;
  sizeId: string;
  style: PlateStyle;
  border: PlateBorder;
  badge: PlateBadge;
  evStrip: boolean;
}

export const Flags = {
  uk: (
    <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#t)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  ),
  eng: (
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <rect width="60" height="30" fill="white" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  sco: (
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <rect width="60" height="30" fill="#0065BD" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="white" strokeWidth="6" />
    </svg>
  ),
  cym: (
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <rect width="60" height="30" fill="white" />
      <rect x="0" y="0" width="60" height="15" fill="white" />
      <rect x="0" y="15" width="60" height="15" fill="#008C45" />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="22"
      >
        🐉
      </text>
    </svg>
  ),
};

export default function Plate({
  variant,
  reg,
  sizeId,
  style,
  border,
  badge,
  evStrip,
}: PlateProps) {
  const isFront = variant === "front";
  const list = isFront ? FRONT_SIZES : REAR_SIZES;
  const dims = list.find((s) => s.id === sizeId) || list[0];

  const isEV = evStrip;
  const badgeSelected = badge !== "none";
  const showBadgeArea = badgeSelected || isEV;
  const badgeColorClass = isEV ? "bg-[#008C45]" : "bg-[#012169]";

  const formatReg = (regText: string, multiline: boolean) => {
    if (!multiline) return regText || "REG PRES";
    if (regText.includes(" ")) {
      const parts = regText.split(" ");
      return (
        <div className="flex flex-col items-center justify-center leading-none">
          <span>{parts[0]}</span>
          <span>{parts.slice(1).join("")}</span>
        </div>
      );
    }
    const mid = Math.ceil(regText.length / 2);
    return (
      <div className="flex flex-col items-center justify-center leading-none">
        <span>{regText.slice(0, mid)}</span>
        <span>{regText.slice(mid)}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <span className="text-sm font-medium text-gray-500 uppercase">
        {variant} Plate ({dims.width}x{dims.height}mm)
      </span>
      <div
        className={cn(
          "relative flex rounded-lg shadow-xl overflow-hidden transition-all duration-300 p-1.5",
          isFront ? "bg-white" : "bg-[#facc15]",
        )}
        style={{
          fontFamily: "var(--font-plate)",
          width: "100%",
          maxWidth: `${dims.width * 1.6}px`,
          aspectRatio: `${dims.width} / ${dims.height}`,
          height: "auto",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 0 2px rgba(0,0,0,0.1)",
        }}
      >
        {/* Badge Area (Left) */}
        {showBadgeArea && (
          <div
            className={cn(
              "h-full flex flex-col items-center justify-center z-10 p-1 rounded-md",
              badgeColorClass,
            )}
            style={{
              width: dims.multiline ? "22%" : "11%",
              minWidth: "40px",
            }}
          >
            {/* Flag */}
            {badgeSelected && badge in Flags && (
              <div className="w-full aspect-[2/1] mb-1 overflow-hidden rounded-[2px] shadow-sm relative">
                {Flags[badge as keyof typeof Flags]}
              </div>
            )}

            {/* Text Code */}
            {badgeSelected && (
              <span className="text-white font-semibold text-[10px] sm:text-xl tracking-wider leading-none mt-1">
                {badge.toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* Registration Area (Rest) */}
        <div className="flex-1 relative flex items-center justify-center h-full px-2 min-w-0">
          {/* Border / Coachline (Inset) */}
          {border !== "none" && (
            <div
              className={cn(
                "absolute rounded-md pointer-events-none z-0",
                border === "red" && "border-red-600",
                border === "blue" && "border-blue-600",
                border === "black" && "border-black",
                border === "green" && "border-green-600",
              )}
              style={{
                top: "0%",
                bottom: "0%",
                left: "5px",
                right: "0%",
                borderWidth: "3px",
                opacity: 0.9,
              }}
            />
          )}

          {/* Text */}
          <span
            className={cn(
              "font-bold",
              // Responsive text sizing
              dims.multiline
                ? "text-[4rem] sm:text-[5.5rem] leading-[0.7]"
                : badge !== "none" || evStrip
                  ? "text-[3rem] sm:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.2rem] leading-none"
                  : "text-[3rem] sm:text-[4.2rem] lg:text-[5rem] xl:text-[6.5rem] leading-none",

              "px-0 tracking-wide",

              style === "3d" &&
                "drop-shadow-[1px_1px_0_#1a1a1a] drop-shadow-[2px_2px_0_#262626] drop-shadow-[3px_3px_0_#333333] drop-shadow-[4px_4px_2px_rgba(0,0,0,0.4)] text-[#1a1a1a]",
              style === "4d" &&
                "drop-shadow-[1px_1px_0_black] drop-shadow-[2px_2px_0_black] drop-shadow-[3px_3px_0_black] drop-shadow-[4px_4px_0_black] drop-shadow-[5px_5px_0_black] drop-shadow-[6px_6px_2px_rgba(0,0,0,0.5)] font-black text-black",
              style === "standard" && "text-black/90",
            )}
          >
            {formatReg(reg || "REG PRES", !!dims.multiline)}
          </span>

          {/* Legal Markings (BSAU 145e) */}
          <div className="absolute bottom-[2%] text-[5px] sm:text-[7px] text-gray-400/50 font-sans flex justify-between w-full px-4 select-none pointer-events-none lowercase">
            <span>blade plates</span>
            <span>bs au 145e</span>
          </div>
        </div>
      </div>
    </div>
  );
}
