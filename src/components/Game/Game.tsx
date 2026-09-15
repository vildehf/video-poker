import { useState, useEffect } from "react";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import type { PokerHand } from "../../types/PokerHand";
import Card from "../Card/Card";
import styles from "../../pages/GamePage/GamePage.module.css";
import { useGameStore } from "../../store/useGameStore";
import checkPokerHand from "../../utils/checkPokerHand";

export default function Game() {
  const deck = useGameStore((state) => state.deck);
  const setDeck = useGameStore((state) => state.setDeck);
  const startGame = useGameStore((state) => state.startGame);

  const hand = useGameStore((state) => state.hand);
  const setHand = useGameStore((state) => state.setHand);

  const discardedCards = useGameStore((state) => state.discardedCards);
  const setDiscardedCards = useGameStore((state) => state.setDiscardedCards);

  useEffect(() => {
    if (hand.length === 0 && deck.length === 0) {
      startGame();
    }
  }, [hand.length, deck.length, startGame]);

  const currentBet = useGameStore((state) => state.currentBet);
  const setCurrentBet = useGameStore((state) => state.setCurrentBet);
  const [PokerHand, setPokerHand] = useState<PokerHand>("Høyt kort");
  const heldCards = useGameStore((state) => state.heldCards);
  const setHeldCards = useGameStore((state) => state.setHeldCards);
  const hasDrawn = useGameStore((state) => state.hasDrawn);
  const setHasDrawn = useGameStore((state) => state.setHasDrawn);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const setPlayerCoins = useGameStore((state) => state.setPlayerCoins);

  function increaseBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    }
  }

  /**
   * Finner premien for en pokerhånd.
   * @param hand pokerhånden som skal sjekkes
   * @returns antall ganger innsatsen spilleren vinner
   */
  function getPayout(hand: PokerHand) {
    if (hand === "Royal Flush") return 10;
    if (hand === "Straight Flush") return 9;
    if (hand === "Fire like") return 8;
    if (hand === "Fullt hus") return 7;
    if (hand === "Flush") return 6;
    if (hand === "Straight") return 5;
    if (hand === "Tre like") return 4;
    if (hand === "To par") return 3;
    if (hand === "Par") return 2;

    return 0;
  }

  /**
   * Legger til eller fjerner et kort fra HOLD.
   * @param index plasseringen til kortet i hånden
   */
  function toggleHold(index: number) {
    if (heldCards.includes(index)) {
      setHeldCards(heldCards.filter((heldIndex) => heldIndex !== index));
    } else {
      setHeldCards([...heldCards, index]);
    }
  }

  function dealNewHand() {
    if (hasDrawn) {
      return;
    }

    if (!currentPlayer || currentPlayer.coins < currentBet) {
      return;
    }

    const newlyDiscarded = hand.filter(
      (_, index) => !heldCards.includes(index),
    );

    setDiscardedCards([...discardedCards, ...newlyDiscarded]);

    let nextCardIndex = 0;

    const newHand = hand.map((card, index) => {
      if (heldCards.includes(index)) {
        return card;
      }

      const newCard = deck[nextCardIndex];
      if (!newCard) {
        return card;
      }

      nextCardIndex++;

      return newCard;
    });

    setHand(newHand);
    setDeck(deck.slice(nextCardIndex));
    setHeldCards([]);

    const newPokerHand = checkPokerHand(newHand);
    setPokerHand(newPokerHand);

    const payout = getPayout(newPokerHand) * currentBet;
    setPlayerCoins(currentPlayer.coins - currentBet + payout);

    setHasDrawn(true);
  }

  function startNewRound() {
    startGame();
    setHeldCards([]);
    setHasDrawn(false);
    setPokerHand("Høyt kort");
    setCurrentBet(1);
  }

  return (
    <>
      <div className={styles.gameInfo}>
        <TotalCoins coins={currentPlayer?.coins ?? 0} />
        <CurrentBet bet={currentBet} />
        <p>Pokerhånd: {PokerHand}</p>
        <button onClick={increaseBet}>Øk innsats</button>
      </div>
      <div className={styles.hand}>
        {hand.map((card, index) => (
          <Card
            key={`${card.suit}-${card.value}`}
            card={card}
            onClick={() => toggleHold(index)}
            held={heldCards.includes(index)}
          />
        ))}
      </div>

      <button onClick={dealNewHand}>Del ut nye kort</button>
      <button onClick={startNewRound}>Ny runde</button>
    </>
  );
}
