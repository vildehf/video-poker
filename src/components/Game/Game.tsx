import { useState } from "react";
import type { PlayingCard } from "../../types/PlayingCard";
import Card from "../Card/Card";
import createDeck from "../../utils/createDeck";
import shuffleDeck from "../../utils/shuffleDeck";
import styles from "../../pages/GamePage.module.css";

export default function Game() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  const [hand, setHand] = useState<PlayingCard[]>(shuffledDeck.slice(0, 5));

  const [heldCards, setHeldCards] = useState<number[]>([]);

  function toggleHold(index: number) {
    if (heldCards.includes(index)) {
      setHeldCards(heldCards.filter((heldIndex) => heldIndex !== index));
    } else {
      setHeldCards([...heldCards, index]);
    }
  }

  function dealNewHand() {
    const newDeck = shuffleDeck(createDeck());
    setHand(newDeck.slice(0, 5));
  }

  return (
    <>
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
