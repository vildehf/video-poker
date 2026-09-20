import createDeck from "./createDeck";
import shuffleDeck from "./shuffleDeck";
import checkPokerHand from "./checkPokerHand";

/**
 * Lager og returnerer starttilstanden for en ny runde.
 */
export default function createRound() {
  const deck = shuffleDeck(createDeck());
  const hand = deck.slice(0, 5);

  return {
    hand,
    deck: deck.slice(5),
    discardedCards: [],
    heldCards: [],
    hasDrawn: false,
    pokerHand: checkPokerHand(hand),
    currentBet: 1,
  };
}
