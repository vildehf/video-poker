import Card from "../components/Card/Card";
import createDeck from "../utils/createDeck";
import styles from "./GamePage.module.css";
import shuffleDeck from "../utils/shuffleDeck";

export default function GamePage() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  return (
    <main>
      <h1>Video Poker</h1>

      <div className={styles.hand}>
        {shuffledDeck.slice(0, 5).map((card) => (
          <Card key={`${card.suit}-${card.value}`} card={card} />
        ))}
      </div>
    </main>
  );
}
