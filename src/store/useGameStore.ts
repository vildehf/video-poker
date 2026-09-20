import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameStore } from "./types";
import { createPlayerSlice } from "./playerSlice";
import { createGameSlice } from "./gameSlice";
export { isRoundActive } from "./playerSlice";

/**
 * Samler spillerdata og spillrunde i en store med lagring i localStorage.
 */
export const useGameStore = create<GameStore>()(
  persist<GameStore>(
    (set, get, store) => ({
      ...createPlayerSlice(set, get, store),
      ...createGameSlice(set, get, store),
    }),
    {
      name: "Video-poker-store",
    },
  ),
);
