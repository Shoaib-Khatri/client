"use client";

import { useState } from "react";
import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Plate, {
  Flags,
  PlateStyle,
  PlateBorder,
  PlateBadge,
} from "./plate-preview";
import { FRONT_SIZES, REAR_SIZES, PlateSize } from "@/lib/plate-data";

// --- Types ---
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
    // router.push("/cart"); // Removed redirect as per user request
    document.dispatchEvent(new CustomEvent("open-cart-drawer"));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto p-4 sm:p-6">
      {/* LEFT: Preview Zone */}
      <div className="lg:w-[60%] flex flex-col gap-6 lg:sticky lg:top-6 h-fit z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Design Your Plates
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            UK Road Legal 3D & 4D Number Plates.
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-4 md:p-8 shadow-inner border border-gray-200 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] gap-6 md:gap-10 overflow-hidden">
          {!config.includeFront && !config.includeRear ? (
            <div className="text-gray-400 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select at least one plate to generate a preview</p>
            </div>
          ) : (
            <>
              {config.includeFront && (
                <Plate
                  variant="front"
                  reg={config.reg}
                  sizeId={config.sizeFront}
                  style={config.style}
                  border={config.border}
                  badge={config.badge}
                  evStrip={config.evStrip}
                />
              )}
              {config.includeRear && (
                <Plate
                  variant="rear"
                  reg={config.reg}
                  sizeId={config.sizeRear}
                  style={config.style}
                  border={config.border}
                  badge={config.badge}
                  evStrip={config.evStrip}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* RIGHT: Configuration Panel */}
      <div className="lg:w-[40%] space-y-6 pb-32 lg:pb-0">
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
                  className="appearance-none w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary cursor-pointer transition-all relative after:content-['âœ“'] after:absolute after:text-white after:text-xs after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden checked:after:block font-bold"
                />
                <label className="text-sm">Not required</label>
              </div>
            </div>
            <Select
              disabled={!config.includeFront}
              value={config.sizeFront}
              onValueChange={(value) =>
                setConfig((p) => ({ ...p, sizeFront: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {FRONT_SIZES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  className="appearance-none w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary cursor-pointer transition-all relative after:content-['âœ“'] after:absolute after:text-white after:text-xs after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden checked:after:block font-bold"
                />
                <label className="text-sm">Not required</label>
              </div>
            </div>
            <Select
              disabled={!config.includeRear}
              value={config.sizeRear}
              onValueChange={(value) =>
                setConfig((p) => ({ ...p, sizeRear: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {REAR_SIZES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Section>
        <Section title="3. Plate Style" step={3}>
          <div className="grid grid-cols-3 gap-3">
            <OptionButton
              label="Standard"
              sub="Flat Text"
              price="+Â£0"
              selected={config.style === "standard"}
              onClick={() => setConfig((p) => ({ ...p, style: "standard" }))}
            />
            <OptionButton
              label="3D Gel"
              sub="Resin Domed"
              price="+Â£10"
              selected={config.style === "3d"}
              onClick={() => setConfig((p) => ({ ...p, style: "3d" }))}
            />
            <OptionButton
              label="4D Raised"
              sub="Laser Cut"
              price="+Â£20"
              selected={config.style === "4d"}
              onClick={() => setConfig((p) => ({ ...p, style: "4d" }))}
            />
          </div>
        </Section>
        <Section title="4. Borders" step={4}>
          <div className="flex flex-wrap gap-4">
            {(["none", "black", "blue", "red", "green"] as PlateBorder[]).map(
              (border) => (
                <button
                  key={border}
                  onClick={() => setConfig((p) => ({ ...p, border }))}
                  title={border === "none" ? "No Border" : border + " Border"}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
                    config.border === border
                      ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                      : "hover:scale-105 border-gray-300",
                    border === "none" ? "bg-white" : "",
                    border === "black" && "bg-black border-black",
                    border === "blue" && "bg-blue-600 border-blue-600",
                    border === "red" && "bg-red-600 border-red-600",
                    border === "green" && "bg-green-600 border-green-600",
                  )}
                >
                  {border === "none" && (
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      None
                    </span>
                  )}
                  {config.border === border && border !== "none" && (
                    <Check size={16} className="text-white" strokeWidth={3} />
                  )}
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
                    "py-3 rounded-lg border-2 uppercase text-xs font-bold flex flex-col items-center justify-center gap-2 h-24 transition-all",
                    config.badge === badge
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 hover:border-gray-300 hover:scale-105",
                  )}
                >
                  {badge !== "none" && badge in Flags && (
                    <div className="w-12 aspect-2/1 shadow-sm rounded-[2px] overflow-hidden border border-gray-100 relative">
                      {Flags[badge as keyof typeof Flags]}
                    </div>
                  )}
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
              price="+Â£0"
              selected={config.fixingKit === "none"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "none" }))}
            />
            <OptionButton
              label="Sticky"
              sub="Pads"
              price="+Â£5"
              selected={config.fixingKit === "sticky"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "sticky" }))}
            />
            <OptionButton
              label="Screws"
              sub="Caps"
              price="+Â£5"
              selected={config.fixingKit === "screw"}
              onClick={() => setConfig((p) => ({ ...p, fixingKit: "screw" }))}
            />
          </div>
        </Section>

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
                  Â£{calculateTotal().toFixed(2)}
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
            {/* Todo   */}
            {/* <button
              onClick={() => {
                addToCart();
                setTimeout(() => router.push("/checkout"), 100);
              }}
              className="w-full mt-3 bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Buy Now <ArrowRight size={20} />
            </button> */}
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
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-xs text-gray-500 font-medium my-0.5">{sub}</div>
      <div className="text-xs font-bold text-green-600 mt-1">{price}</div>
    </div>
  );
}
