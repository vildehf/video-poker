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

  const discardedCards = useGameStore((state) => state.hand);
  const setDiscardedCards = useGameStore((state) => state.setDiscardedCards);

  useEffect(() => {
    if (hand.length === 0 && deck.length === 0) {
      startGame();
    }
  }, [hand.length, deck.length, startGame]);

  const [currentBet, setCurrentBet] = useState(1);
  const [PokerHand, setPokerHand] = useState<PokerHand>("Høyt kort");
  const [heldCards, setHeldCards] = useState<number[]>([]);
  const currentPlayer = useGameStore((state) => state.currentPlayer);

  function increaseBet() {
    if (currentBet < 5) setCurrentBet(currentBet + 1);
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
      nextCardIndex++;

      return newCard;
    });

    setHand(newHand);
    setDeck(deck.slice(nextCardIndex));
    setHeldCards([]);

    setPokerHand(checkPokerHand(newHand));
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
    </>
  );
}
