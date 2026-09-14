import { useState } from "react";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import type { PokerHand } from "../../types/PokerHand";
import Card from "../Card/Card";
import createDeck from "../../utils/createDeck";
import shuffleDeck from "../../utils/shuffleDeck";
import styles from "../../pages/GamePage/GamePage.module.css";
import { useGameStore } from "../../store/useGameStore";
import checkPokerHand from "../../utils/checkPokerHand";

export default function Game() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);
  const hand = useGameStore((state) => state.hand);
  const setHand = useGameStore((state) => state.setHand);

  if (hand.length === 0) {
    setHand(shuffledDeck.slice(0, 5));
  }
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
    const newDeck = shuffleDeck(createDeck());

    const availableCards = newDeck.filter(
      (deckCard) =>
        !hand.some(
          (handCard) =>
            handCard.suit === deckCard.suit &&
            handCard.value === deckCard.value,
        ),
    );

    let nextCardIndex = 0;

    const newHand = hand.map((card, index) => {
      if (heldCards.includes(index)) {
        return card;
      }

      const newCard = availableCards[nextCardIndex];
      nextCardIndex++;

      return newCard;
    });

    setHand(newHand);
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
