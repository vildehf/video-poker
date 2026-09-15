import { create } from "zustand";
import type { Player } from "../types/Player";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../types/PlayingCard";
import createDeck from "../utils/createDeck";
import shuffleDeck from "../utils/shuffleDeck";

type GameStore = {
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player) => void;
  setPlayerCoins: (coins: number) => void;

  hand: PlayingCard[];
  setHand: (hand: PlayingCard[]) => void;

  deck: PlayingCard[];
  discardedCards: PlayingCard[];

  setDeck: (deck: PlayingCard[]) => void;
  setDiscardedCards: (cards: PlayingCard[]) => void;

  startGame: () => void;

  currentBet: number;
  setCurrentBet: (bet: number) => void;

  heldCards: number[];
  setHeldCards: (cards: number[]) => void;

  hasDrawn: boolean;
  setHasDrawn: (hasDrawn: boolean) => void;
};

/**
 * Holder på felles state som brukes i spillet.
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentPlayer: null,
      hand: [],
      deck: [],
      discardedCards: [],
      currentBet: 1,
      heldCards: [],

      hasDrawn: false,

      setCurrentPlayer: (player) => {
        set({ currentPlayer: player });
      },
      setPlayerCoins: (coins) => {
        set((state) => ({
          currentPlayer: state.currentPlayer
            ? { ...state.currentPlayer, coins: coins }
            : null,
        }));
      },

      setHand: (hand) => {
        set({ hand });
      },

      setDeck: (deck) => {
        set({ deck });
      },

      setDiscardedCards: (cards) => {
        set({ discardedCards: cards });
      },

      setCurrentBet: (bet) => {
        set({ currentBet: bet });
      },

      setHeldCards: (cards) => {
        set({ heldCards: cards });
      },

      setHasDrawn: (hasDrawn) => {
        set({ hasDrawn: hasDrawn });
      },

      startGame: () => {
        const shuffledDeck = shuffleDeck(createDeck());

        set({
          hand: shuffledDeck.slice(0, 5),
          deck: shuffledDeck.slice(5),
          discardedCards: [],
        });
      },
    }),
    {
      name: "video-poker-store",
    },
  ),
);
