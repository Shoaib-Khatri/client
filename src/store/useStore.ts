import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/lib/data";

interface AppState {
  // Add other state here if needed in future
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Empty state for now
    }),
    {
      name: "car-app-storage",
    },
  ),
);
