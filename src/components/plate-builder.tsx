"use client";

import { useState } from "react";
import {
  Check,
  Info,
  AlertCircle,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

// --- Data ---
type PlateSize = {
  id: string;
  label: string;
  width: number;
  height: number;
  multiline?: boolean;
};

// Explicitly type the arrays
const FRONT_SIZES: PlateSize[] = [
  {
    id: "standard",
    label: "Standard Car (520mm x 111mm)",
    width: 520,
    height: 111,
  },
  {
    id: "square",
    label: "Standard Square (279mm x 203mm)",
    width: 279,
    height: 203,
    multiline: true,
  },
  {
    id: "motorbike",
    label: "Standard Motorbike (229mm x 178mm)",
    width: 229,
    height: 178,
    multiline: true,
  },
];

const REAR_SIZES: PlateSize[] = [
  {
    id: "standard",
    label: "Standard Car (520mm x 111mm)",
    width: 520,
    height: 111,
  },
  {
    id: "rr_sport_v1",
    label: "Range Rover Sport v1 (615mm x 150mm)",
    width: 615,
    height: 150,
  },
  {
    id: "rr_sport_v2",
    label: "Range Rover Sport v2 (560mm x 165mm)",
    width: 560,
    height: 165,
  },
  {
    id: "jag_x_type",
    label: "Jaguar X-Type Saloon (560mm x 162mm)",
    width: 560,
    height: 162,
  },
  {
    id: "jag_s_type_v1",
    label: "Jaguar S-Type v1 (585mm x 175mm)",
    width: 585,
    height: 175,
  },
  {
    id: "jag_s_type_v2",
    label: "Jaguar S-Type v2 (565mm x 165mm)",
    width: 565,
    height: 165,
  },
  {
    id: "jag_xk8",
    label: "Jaguar XK8/DB9 (552mm x 171mm)",
    width: 552,
    height: 171,
  },
  {
    id: "jag_xj_v1",
    label: "Jaguar XJ v1 (610mm x 150mm)",
    width: 610,
    height: 150,
  },
  {
    id: "jag_xj_v2",
    label: "Jaguar XJ v2 (530mm x 150mm)",
    width: 530,
    height: 150,
  },
  {
    id: "over_v2",
    label: "Oversized Oblong v2 (533mm x 152mm)",
    width: 533,
    height: 152,
  },
  {
    id: "over_v3",
    label: "Oversized Oblong v3 (520mm x 152mm)",
    width: 520,
    height: 152,
  },
  {
    id: "over_v4",
    label: "Oversized Oblong v4 (520mm x 165mm)",
    width: 520,
    height: 165,
  },
  {
    id: "over_v5",
    label: "Oversized Oblong v5 (559mm x 152mm)",
    width: 559,
    height: 152,
  },
];

// --- Types ---
type PlateStyle = "standard" | "3d" | "4d";
type PlateBorder = "none" | "red" | "green" | "blue" | "black";
type PlateBadge = "none" | "uk" | "eng" | "cym" | "sco";
type FixingKit = "none" | "screw" | "sticky";

interface PlateConfig {
  reg: string;
  sizeFront: string; // ID from FRONT_SIZES
  sizeRear: string; // ID from REAR_SIZES
  includeFront: boolean;
  includeRear: boolean;
  style: PlateStyle;
  border: PlateBorder;
  badge: PlateBadge;
  evStrip: boolean;
  fixingKit: FixingKit;
}

const INITIAL_CONFIG: PlateConfig = {
  reg: "",
  sizeFront: "standard",
  sizeRear: "standard",
  includeFront: true,
  includeRear: true,
  style: "standard",
  border: "none",
  badge: "none",
  evStrip: false,
  fixingKit: "none",
};

// --- Prices ---
const PRICES = {
  base: 20, // Per plate
  style: { standard: 0, "3d": 10, "4d": 20 },
  fixing: { none: 0, screw: 5, sticky: 5 },
};

// --- Flags SVGs ---
const Flags = {
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

export default function PlateBuilder() {
  const [config, setConfig] = useState<PlateConfig>(INITIAL_CONFIG);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // --- Logic ---
  const validateReg = (reg: string) => {
    const cleanReg = reg.replace(/\s/g, "").toUpperCase();
    if (cleanReg.length === 0) return null;
    if (cleanReg.length > 8) return "Registration too long";
    if (!/^[A-Z0-9]+$/.test(cleanReg)) return "Invalid characters";
    return null;
  };

  const handleRegChange = (val: string) => {
    const uppercased = val.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
    setConfig((prev) => ({ ...prev, reg: uppercased }));
    setError(validateReg(uppercased));
  };

  const calculateTotal = () => {
    let total = 0;
    const plateCount =
      (config.includeFront ? 1 : 0) + (config.includeRear ? 1 : 0);
    total += plateCount * PRICES.base;
    total += plateCount * PRICES.style[config.style];
    total += PRICES.fixing[config.fixingKit];
    return total;
  };

  const addToCart = () => {
    if (!config.reg) {
      setError("Registration is required");
      return;
    }
    if (error) return;
    if (!config.includeFront && !config.includeRear) {
      setError("Please select at least one plate");
      return;
    }
    dispatch(
      addItem({
        id: crypto.randomUUID(),
        reg: config.reg,
        price: calculateTotal(),
        config: config,
      }),
    );
    router.push("/cart");
  };

  const getPlateDims = (type: "front" | "rear") => {
    const id = type === "front" ? config.sizeFront : config.sizeRear;
    const list = type === "front" ? FRONT_SIZES : REAR_SIZES;
    return list.find((s) => s.id === id) || list[0];
  };

  const formatReg = (reg: string, multiline: boolean) => {
    if (!multiline) return reg || "REG PRES";
    if (reg.includes(" ")) {
      const parts = reg.split(" ");
      return (
        <div className="flex flex-col items-center justify-center leading-none">
          <span>{parts[0]}</span>
          <span>{parts.slice(1).join("")}</span>
        </div>
      );
    }
    const mid = Math.ceil(reg.length / 2);
    return (
      <div className="flex flex-col items-center justify-center leading-none">
        <span>{reg.slice(0, mid)}</span>
        <span>{reg.slice(mid)}</span>
      </div>
    );
  };

  // --- Render Helpers ---

  const renderPlate = (type: "front" | "rear") => {
    if (type === "front" && !config.includeFront) return null;
    if (type === "rear" && !config.includeRear) return null;

    const isFront = type === "front";
    const dims = getPlateDims(type);

    // BADGE LOGIC & EV STRIP
    // If EV strip is enabled, badge background is Green (#008C45).
    // If EV strip is disabled, badge background is Blue (#012169) only if Badge is selected.

    const isEV = config.evStrip;
    const badgeSelected = config.badge !== "none";
    const showBadgeArea = badgeSelected || isEV;

    // Green for EV, Blue for Standard
    const badgeColorClass = isEV ? "bg-[#008C45]" : "bg-[#012169]";

    // If EV is on but no badge selected, we still show the green strip area (often with 'ZEV' or just blank/logo).
    // We'll show just the color strip if no country badge is selected.

    return (
      <div className="flex flex-col items-center space-y-2 w-full">
        <span className="text-sm font-medium text-gray-500 uppercase">
          {type} Plate ({dims.width}x{dims.height}mm)
        </span>
        <div
          className={cn(
            "relative flex rounded-lg shadow-xl overflow-hidden transition-all duration-300 p-1.5",
            isFront ? "bg-white" : "bg-[#facc15]",
          )}
          style={{
            fontFamily: "var(--font-plate)",
            width: "100%",
            maxWidth: `${dims.width * 1.6}px`, // Increased scale for better visibility
            aspectRatio: `${dims.width} / ${dims.height}`,
            height: "auto",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 0 2px rgba(0,0,0,0.1)", // Outer rim
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
              {badgeSelected && config.badge in Flags && (
                <div className="w-full aspect-[2/1] mb-1 overflow-hidden rounded-[2px] shadow-sm relative">
                  {Flags[config.badge as keyof typeof Flags]}
                </div>
              )}

              {/* Text Code */}
              {badgeSelected && (
                <span className="text-white font-semibold text-[10px] sm:text-xl tracking-wider leading-none mt-1">
                  {config.badge.toUpperCase()}
                </span>
              )}

              {/* ZEV text if EV active but no badge? Or just if EV active period? 
                    Usually UK EV plates just have the green flash. 
                    If user acts for badge, we show badge on green. 
                */}
            </div>
          )}

          {/* Registration Area (Rest) */}
          <div className="flex-1 relative flex items-center justify-center h-full px-2 min-w-0">
            {/* Border / Coachline (Inset) */}
            {config.border !== "none" && (
              <div
                className={cn(
                  "absolute rounded-md pointer-events-none z-0",
                  config.border === "red" && "border-red-600",
                  config.border === "blue" && "border-blue-600",
                  config.border === "black" && "border-black",
                  config.border === "green" && "border-green-600",
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
                "font-bold", // Ensure bold weight for authentic look
                // Responsive text sizing
                dims.multiline
                  ? "text-[4rem] sm:text-[5.5rem] leading-[0.7]" // Larger multi-line
                  : config.badge !== "none" || config.evStrip
                    ? "text-[3rem] sm:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.2rem] leading-none" // Larger single line with badge
                    : "text-[3rem] sm:text-[4.2rem] lg:text-[5rem] xl:text-[6.5rem] leading-none", // Max size without badge

                "px-0 tracking-wide", // Removed padding completely for max width

                config.style === "3d" &&
                  "drop-shadow-[1px_1px_0_#1a1a1a] drop-shadow-[2px_2px_0_#262626] drop-shadow-[3px_3px_0_#333333] drop-shadow-[4px_4px_2px_rgba(0,0,0,0.4)] text-[#1a1a1a]",
                config.style === "4d" &&
                  "drop-shadow-[1px_1px_0_black] drop-shadow-[2px_2px_0_black] drop-shadow-[3px_3px_0_black] drop-shadow-[4px_4px_0_black] drop-shadow-[5px_5px_0_black] drop-shadow-[6px_6px_2px_rgba(0,0,0,0.5)] font-black text-black",
                config.style === "standard" && "text-black/90",
              )}
            >
              {formatReg(config.reg || "REG PRES", !!dims.multiline)}
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
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 max-w-[1400px] mx-auto p-4 sm:p-6">
      {/* LEFT: Preview Zone */}
      <div className="xl:w-[60%] flex flex-col gap-6 sticky top-6 h-fit z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Design Your Plates
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            UK Road Legal 3D & 4D Number Plates.
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8 shadow-inner border border-gray-200 flex flex-col items-center justify-center min-h-[500px] gap-10 overflow-hidden">
          {!config.includeFront && !config.includeRear ? (
            <div className="text-gray-400 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select at least one plate to generate a preview</p>
            </div>
          ) : (
            <>
              {config.includeFront && renderPlate("front")}
              {config.includeRear && renderPlate("rear")}
            </>
          )}
        </div>
      </div>

      {/* RIGHT: Configuration Panel */}
      <div className="xl:w-[40%] space-y-6 pb-32 xl:pb-0">
        <h1 className="text-3xl font-bold text-gray-900 mt-8">
          Customize Your Plates
        </h1>

        <Section title="1. Enter Registration" step={1}>
          <input
            type="text"
            value={config.reg}
            onChange={(e) => handleRegChange(e.target.value)}
            placeholder="YOUR REG"
            maxLength={8}
            className={cn(
              "w-full text-center text-4xl font-mono uppercase bg-gray-50 border-2 rounded-xl p-6 transition-all",
              error
                ? "border-red-300"
                : "border-gray-200 focus:border-blue-500",
            )}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </Section>

        <Section title="2. Select Plates" step={2}>
          {/* Front */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex justify-between mb-2">
              <label className="font-bold">Front Plate</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={!config.includeFront}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      includeFront: !e.target.checked,
                    }))
                  }
                />
                <label className="text-sm">Not required</label>
              </div>
            </div>
            <select
              disabled={!config.includeFront}
              value={config.sizeFront}
              onChange={(e) =>
                setConfig((p) => ({ ...p, sizeFront: e.target.value }))
              }
              className="w-full p-3 border rounded-lg bg-white disabled:bg-gray-100"
            >
              {FRONT_SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          {/* Rear */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold">Rear Plate</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={!config.includeRear}
                  onChange={(e) =>
                    setConfig((p) => ({ ...p, includeRear: !e.target.checked }))
                  }
                />
                <label className="text-sm">Not required</label>
              </div>
            </div>
            <select
              disabled={!config.includeRear}
              value={config.sizeRear}
              onChange={(e) =>
                setConfig((p) => ({ ...p, sizeRear: e.target.value }))
              }
              className="w-full p-3 border rounded-lg bg-white disabled:bg-gray-100"
            >
              {REAR_SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </Section>

        <Section title="3. Plate Style" step={3}>
          <div className="grid grid-cols-3 gap-3">
            <OptionButton
              label="Standard"
              sub="Flat Text"
              price="+£0"
              selected={config.style === "standard"}
              onClick={() => setConfig((p) => ({ ...p, style: "standard" }))}
            />
            <OptionButton
              label="3D Gel"
              sub="Resin Domed"
              price="+£10"
              selected={config.style === "3d"}
              onClick={() => setConfig((p) => ({ ...p, style: "3d" }))}
            />
            <OptionButton
              label="4D Raised"
              sub="Laser Cut"
              price="+£20"
              selected={config.style === "4d"}
              onClick={() => setConfig((p) => ({ ...p, style: "4d" }))}
            />
          </div>
        </Section>

        <Section title="4. Borders" step={4}>
          <div className="flex flex-wrap gap-3">
            {(["none", "black", "blue", "red", "green"] as PlateBorder[]).map(
              (border) => (
                <button
                  key={border}
                  onClick={() => setConfig((p) => ({ ...p, border }))}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 capitalize font-medium flex items-center gap-2",
                    config.border === border
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200",
                  )}
                >
                  {border !== "none" && (
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        `bg-${border === "black" ? "black" : border + "-500"}`,
                      )}
                    />
                  )}
                  {border}
                </button>
              ),
            )}
          </div>
        </Section>

        <Section title="5. Side Badge" step={5}>
          <div className="grid grid-cols-5 gap-2">
            {(["none", "uk", "eng", "sco", "cym"] as PlateBadge[]).map(
              (badge) => (
                <button
                  key={badge}
                  onClick={() => setConfig((p) => ({ ...p, badge }))}
                  className={cn(
                    "py-3 rounded-lg border-2 uppercase text-xs font-bold",
                    config.badge === badge
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200",
                  )}
                >
                  {badge}
                </button>
              ),
            )}
          </div>
        </Section>

        <Section title="6. Green EV Strip" step={6}>
          <div
            className={cn(
              "border-2 rounded-xl p-4 cursor-pointer flex gap-4",
              config.evStrip
                ? "border-green-500 bg-green-50"
                : "border-gray-200",
            )}
            onClick={() => setConfig((p) => ({ ...p, evStrip: !p.evStrip }))}
          >
            <div
              className={cn(
                "w-6 h-6 rounded border flex items-center justify-center",
                config.evStrip
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300",
              )}
            >
              {config.evStrip && <Check size={14} />}
            </div>
            <div>
              <h4 className="font-bold">Add Green EV Flash</h4>
              <p className="text-sm text-gray-500">
                For Zero Emission Vehicles Only
              </p>
            </div>
          </div>
        </Section>

        <Section title="7. Fixing Kit" step={7}>
          <div className="grid grid-cols-3 gap-3">
            <OptionButton
              label="None"
              sub="No Fixings"
              price="+£0"
              selected={config.fixingKit === "none"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "none" }))}
            />
            <OptionButton
              label="Sticky"
              sub="Pads"
              price="+£5"
              selected={config.fixingKit === "sticky"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "sticky" }))}
            />
            <OptionButton
              label="Screws"
              sub="Caps"
              price="+£5"
              selected={config.fixingKit === "screw"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "screw" }))}
            />
          </div>
        </Section>

        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-20">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-2xl">
              £{calculateTotal().toFixed(2)}
            </span>
          </div>
          <button
            onClick={addToCart}
            className="w-full bg-custom-green text-white py-3 rounded-xl font-bold"
          >
            Add to Cart
          </button>
        </div>
        {/* New Dark Theme Add to Cart Section (Sticky Top or Top of List) */}
        <div className="bg-[#0f172a] p-6 rounded-3xl shadow-2xl border border-gray-800 text-white relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">
                  Total Price
                </p>
                <div className="text-5xl font-bold text-white tracking-tight">
                  £{calculateTotal().toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs font-medium">Inc. VAT</p>
                <p className="text-gray-400 text-xs font-medium">
                  Free Delivery
                </p>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-4 rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              Add to Basket
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            {error && (
              <p className="text-red-400 text-center mt-3 text-sm font-medium">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
          {step}
        </span>
        {title.split(". ")[1]}
      </h3>
      {children}
    </div>
  );
}
function OptionButton({
  label,
  sub,
  price,
  selected,
  onClick,
}: {
  label: string;
  sub: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer border-2 rounded-xl p-4 relative transition-all",
        selected
          ? "border-blue-600 bg-blue-50/50"
          : "border-gray-200 hover:border-gray-300",
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 text-blue-600">
          <Check size={16} />
        </div>
      )}
      <h4
        className={cn(
          "font-bold",
          selected ? "text-blue-700" : "text-gray-900",
        )}
      >
        {label}
      </h4>
      <p className="text-xs text-gray-500 mb-2">{sub}</p>
      <div
        className={cn(
          "text-sm font-semibold",
          selected ? "text-blue-600" : "text-gray-700",
        )}
      >
        {price}
      </div>
    </div>
  );
}
