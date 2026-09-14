import { create } from "zustand";
import type { Player } from "../types/Player";
import { persist } from "zustand/middleware";

type GameStore = {
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player) => void;
};

/**
 * Holder på felles state som brukes i spillet.
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentPlayer: null,

      setCurrentPlayer: (player) => {
        set({ currentPlayer: player });
      },
    }),
    {
      name: "video-poker-store",
    },
  ),
);
