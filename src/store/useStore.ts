import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/lib/data";

interface AppState {
  wishlist: Car[];
  compareList: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: string) => void;
  addToCompare: (car: Car) => void;
  removeFromCompare: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  isInCompare: (carId: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      compareList: [],
      addToWishlist: (car) =>
        set((state) => {
          if (state.wishlist.find((c) => c.id === car.id)) return state;
          return { wishlist: [...state.wishlist, car] };
        }),
      removeFromWishlist: (carId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((c) => c.id !== carId),
        })),
      addToCompare: (car) =>
        set((state) => {
          if (state.compareList.find((c) => c.id === car.id)) return state;
          if (state.compareList.length >= 3) return state; // Max 3 cars
          return { compareList: [...state.compareList, car] };
        }),
      removeFromCompare: (carId) =>
        set((state) => ({
          compareList: state.compareList.filter((c) => c.id !== carId),
        })),
      isInWishlist: (carId) => !!get().wishlist.find((c) => c.id === carId),
      isInCompare: (carId) => !!get().compareList.find((c) => c.id === carId),
    }),
    {
      name: "car-app-storage",
    },
  ),
);
