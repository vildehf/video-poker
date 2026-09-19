import { create } from "zustand";
import type { Player } from "../types/Player";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../types/PlayingCard";
import createDeck from "../utils/createDeck";
import shuffleDeck from "../utils/shuffleDeck";
import type { PokerHand } from "../types/PokerHand";
import checkPokerHand from "../utils/checkPokerHand";
import { payouts } from "../utils/payouts";

type GameStore = {
  // Spiller
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;
  players: Player[];
  addPlayer: (name: string) => void;
  deletePlayer: (id: string) => void;
  // Spillerens hånd
  hand: PlayingCard[];
  // Kortstokk og kastede kort
  deck: PlayingCard[];
  discardedCards: PlayingCard[];
  // Spillrunde
  startGame: () => void;
  startNewRound: () => void;
  dealNewHand: () => void;
  currentBet: number;
  increaseBet: () => void;
  decreaseBet: () => void;

  heldCards: number[];
  toggleHold: (index: number) => void;

  hasDrawn: boolean;

  pokerHand: PokerHand;
};

/**
 * Holder på felles state som brukes i spillet.
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // Startverdier for spillet
      players: [],
      currentPlayer: null,
      hand: [],
      deck: [],
      discardedCards: [],
      currentBet: 1,
      heldCards: [],
      hasDrawn: false,
      pokerHand: "Høyt kort",

      /**
       * Oppretter en spiller med unik ID, oppgitt navn og 100 mynter.
       */
      addPlayer: (name) => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        const player: Player = {
          id: crypto.randomUUID(),
          name: trimmedName,
          coins: 100,
        };

        set((state) => ({
          players: [...state.players, player],
        }));
      },
      /**
       * Sletter spilleren med oppgitt ID og fjerner valget hvis spilleren var aktiv.
       */
      deletePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
          currentPlayer:
            state.currentPlayer?.id === id ? null : state.currentPlayer,
        }));
      },
      /**
       * Velger aktiv spiller, eller fjerner valget dersom player er null.
       */
      setCurrentPlayer: (player) => {
        set({ currentPlayer: player });
      },

      /**
       * Øker innsatsen med en før trekket, begrenset av saldoen og maks fem.
       */
      increaseBet: () => {
        set((state) => {
          if (
            !state.currentPlayer ||
            state.hasDrawn ||
            state.currentBet >= Math.min(5, state.currentPlayer.coins)
          ) {
            return state;
          }

          return { currentBet: state.currentBet + 1 };
        });
      },

      /**
       * Senker innsatsen med en, til minimum en, før trekket er fullført.
       */
      decreaseBet: () => {
        set((state) => {
          if (!state.currentPlayer || state.hasDrawn || state.currentBet <= 1) {
            return state;
          }

          return { currentBet: state.currentBet - 1 };
        });
      },

      /**
       * Slår HOLD av eller på for kortet på oppgitt plass i hånden.
       */
      toggleHold: (index) => {
        set((state) => {
          if (state.hasDrawn) return state;

          return {
            heldCards: state.heldCards.includes(index)
              ? state.heldCards.filter((heldIndex) => heldIndex !== index)
              : [...state.heldCards, index],
          };
        });
      },

      /**
       * Bytter kort som ikke er holdt, beregner premien og oppdaterer saldoen.
       * Avslutter runden med én samlet oppdatering.
       */
      dealNewHand: () => {
        set((state) => {
          const { currentPlayer, currentBet, hand, deck, heldCards } = state;

          if (
            !currentPlayer ||
            state.hasDrawn ||
            hand.length !== 5 ||
            currentPlayer.coins < currentBet
          ) {
            return state;
          }

          const discarded = hand.filter(
            (_, index) => !heldCards.includes(index),
          );

          if (deck.length < discarded.length) return state;

          let nextCardIndex = 0;

          const newHand = hand.map((card, index) =>
            heldCards.includes(index) ? card : deck[nextCardIndex++],
          );

          const pokerHand = checkPokerHand(newHand);
          const payout = payouts[pokerHand] * currentBet;
          const updatedPlayer = {
            ...currentPlayer,
            coins: currentPlayer.coins - currentBet + payout,
          };

          return {
            hand: newHand,
            deck: deck.slice(nextCardIndex),
            discardedCards: [...state.discardedCards, ...discarded],
            heldCards: [],
            pokerHand,
            hasDrawn: true,
            currentPlayer: updatedPlayer,
            players: state.players.map((player) =>
              player.id === updatedPlayer.id ? updatedPlayer : player,
            ),
          };
        });
      },
      /**
       * Starter neste runde med nye kort og nullstiller innsats og HOLD.
       * Gjør ingenting hvis forrige trekk ikke er fullført.
       */
      startNewRound: () => {
        set((state) => {
          if (!state.hasDrawn) return state;

          const shuffledDeck = shuffleDeck(createDeck());
          const hand = shuffledDeck.slice(0, 5);

          return {
            hand,
            deck: shuffledDeck.slice(5),
            discardedCards: [],
            heldCards: [],
            hasDrawn: false,
            pokerHand: checkPokerHand(hand),
            currentBet: 1,
          };
        });
      },

      /**
       * Lager og stokker en ny kortstokk og deler ut fem kort.
       */
      startGame: () => {
        const shuffledDeck = shuffleDeck(createDeck());
        const hand = shuffledDeck.slice(0, 5);

        set({
          hand,
          deck: shuffledDeck.slice(5),
          discardedCards: [],
          pokerHand: checkPokerHand(hand),
        });
      },
    }),
    {
      name: "video-poker-store",
    },
  ),
);
