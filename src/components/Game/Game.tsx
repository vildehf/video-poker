import { useState } from "react";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import type { PlayingCard } from "../../types/PlayingCard";
import Card from "../Card/Card";
import createDeck from "../../utils/createDeck";
import shuffleDeck from "../../utils/shuffleDeck";
import styles from "../../pages/GamePage.module.css";

export default function Game() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  const [hand, setHand] = useState<PlayingCard[]>(shuffledDeck.slice(0, 5));

  const [currentBet, setCurrentBet] = useState(1);

  const [heldCards, setHeldCards] = useState<number[]>([]);

  function increaseBet() {
    if (currentBet < 5) setCurrentBet(currentBet + 1);
  }

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
  }

  return (
    <>
      <TotalCoins coins={100} />
      <CurrentBet bet={currentBet} />
      <button onClick={increaseBet}>Øk innsats</button>

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
