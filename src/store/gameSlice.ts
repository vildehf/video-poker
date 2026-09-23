import type { StateCreator } from "zustand";
import type { GameStore, GameSlice } from "./types";
import createRound from "../utils/createRound";
import drawHand from "../utils/drawHand";
import checkPokerHand from "../utils/checkPokerHand";
import { payouts } from "../utils/payouts";

/**
 * Oppretter spilltilstanden og handlingene for spillrunden.
 */
export const createGameSlice: StateCreator<GameStore, [], [], GameSlice> = (
  set,
) => ({
  // Startverdier for spillet
  hand: [],
  deck: [],
  discardedCards: [],
  currentBet: 1,
  heldCards: [],
  hasDrawn: false,
  pokerHand: "Høyt kort",

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
   * Trekker erstatningskort, beregner premien og oppdaterer spilltilstanden.
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

      const result = drawHand(hand, deck, heldCards);
      if (!result) return state;

      const pokerHand = checkPokerHand(result.hand);
      const payout = payouts[pokerHand] * currentBet;
      const updatedPlayer = {
        ...currentPlayer,
        coins: currentPlayer.coins - currentBet + payout,
      };

      return {
        ...result,
        discardedCards: [...state.discardedCards, ...result.discardedCards],
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
   * Oppretter en ny runde etter at trekket er fullført.
   */
  startNewRound: () => {
    set((state) => {
      if (!state.hasDrawn) return state;

      return createRound();
    });
  },

  /**
   * Oppretter første runde dersom ingen hånd finnes
   */
  startGame: () => {
    set((state) => {
      if (state.hand.length > 0) return state;

      return createRound();
    });
  },
});
