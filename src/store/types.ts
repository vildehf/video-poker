import type { Player } from "../types/Player";
import type { PlayingCard } from "../types/PlayingCard";
import type { PokerHand } from "../types/PokerHand";

/**
 * Spillerdata og handlinger for å administrere spillere.
 */
export type PlayerSlice = {
  players: Player[];
  currentPlayer: Player | null;
  addPlayer: (name: string) => void;
  deletePlayer: (id: string) => void;
  setCurrentPlayer: (player: Player | null) => void;
};

/**
 * Tilstanden og handlingene for selve spillrunden.
 */
export type GameSlice = {
  hand: PlayingCard[];
  deck: PlayingCard[];
  discardedCards: PlayingCard[];
  currentBet: number;
  heldCards: number[];
  hasDrawn: boolean;
  pokerHand: PokerHand;

  startGame: () => void;
  startNewRound: () => void;
  dealNewHand: () => void;
  increaseBet: () => void;
  decreaseBet: () => void;
  toggleHold: (index: number) => void;
};
/**Den samlede store inneholder både spillerdata og spillrunden.*/
export type GameStore = PlayerSlice & GameSlice;
