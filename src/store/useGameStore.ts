import { create } from "zustand";
import type { Player } from "../types/Player";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../types/PlayingCard";

type GameStore = {
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player) => void;

  hand: PlayingCard[];
  setHand: (hand: PlayingCard[]) => void;
};

/**
 * Holder på felles state som brukes i spillet.
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentPlayer: null,
      hand: [],

      setCurrentPlayer: (player) => {
        set({ currentPlayer: player });
      },

      setHand: (hand) => {
        set({ hand });
      },
    }),
    {
      name: "video-poker-store",
    },
  ),
);
