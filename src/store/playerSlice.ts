import type { StateCreator } from "zustand";
import type { Player } from "../types/Player";
import type { GameStore, PlayerSlice } from "./types";

/**
 * Returnerer om en spiller har en uferdig runde som kan spilles.
 */
export function isRoundActive(state: GameStore): boolean {
  return (
    state.currentPlayer !== null &&
    state.currentPlayer.coins > 0 &&
    state.hand.length > 0 &&
    !state.hasDrawn
  );
}

/**
 * Oppretter spillerdata og handlingene som administrerer spillerne.
 */
export const createPlayerSlice: StateCreator<GameStore, [], [], PlayerSlice> = (
  set,
) => ({
  players: [],
  currentPlayer: null,

  /** Oppretter en spiller med oppgitt navn, unik ID og 100 mynter. */
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

  /** Sletter spilleren med oppgitt ID, med mindre den spiller en runde. */
  deletePlayer: (id) => {
    set((state) => {
      const isCurrentPlayer = state.currentPlayer?.id === id;

      if (isCurrentPlayer && isRoundActive(state)) return state;

      return {
        players: state.players.filter((player) => player.id !== id),
        currentPlayer: isCurrentPlayer ? null : state.currentPlayer,
      };
    });
  },

  /** Velger aktiv spiller, eller null, når ingen spillbar runde pågår. */
  setCurrentPlayer: (player) => {
    set((state) => {
      if (isRoundActive(state)) return state;

      return { currentPlayer: player };
    });
  },
});
