import Card from "../components/Card/Card";
import type { PlayingCard } from "../types/PlayingCard";
import styles from "./GamePage.module.css";

export default function GamePage() {
  const testCards: PlayingCard[] = [
    { suit: "hearts", value: "A" },
    { suit: "diamonds", value: "K" },
    { suit: "clubs", value: "Q" },
    { suit: "spades", value: "J" },
    { suit: "hearts", value: "10" },
  ];

  return (
    <main>
      <h1>Video Poker</h1>

      <div className={styles.hand}>
        {testCards.map((card) => (
          <Card key={`${card.suit}-${card.value}`} card={card} />
        ))}
      </div>
    </main>
  );
}
