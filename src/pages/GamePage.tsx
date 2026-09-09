import { useState } from "react";
import type { PlayingCard } from "../types/PlayingCard";
import Card from "../components/Card/Card";
import createDeck from "../utils/createDeck";
import styles from "./GamePage.module.css";
import shuffleDeck from "../utils/shuffleDeck";

export default function GamePage() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  const [hand, setHand] = useState<PlayingCard[]>(shuffledDeck.slice(0, 5));
  function dealNewHand() {
    const newDeck = shuffleDeck(createDeck());
    setHand(newDeck.slice(0, 5));
  }

  return (
    <main>
      <h1>Video Poker</h1>
      <div className={styles.hand}>
        {hand.map((card) => (
          <Card key={`${card.suit}-${card.value}`} card={card} />
        ))}
      </div>
      <button onClick={dealNewHand}>Del ut nye kort</button>
    </main>
  );
}
