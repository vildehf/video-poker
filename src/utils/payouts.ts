import type { PokerHand } from "../types/PokerHand";

/**
 * Antall ganger innsatsen som utbetales for hver pokerhånd.
 */
export const payouts: Record<PokerHand, number> = {
  "Royal Flush": 10,
  "Straight Flush": 9,
  "Fire like": 8,
  "Fullt hus": 7,
  Flush: 6,
  Straight: 5,
  "Tre like": 4,
  "To par": 3,
  Par: 2,
  "Høyt kort": 0,
};
