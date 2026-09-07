import Card from "../components/Card/Card";
import type { PlayingCard } from "../types/PlayingCard";

export default function GamePage() {
  const testCard: PlayingCard = {
    suit: "hearts",
    value: "A",
  };

  return (
    <main>
      <h1>Video Poker</h1>
      <Card card={testCard} />
    </main>
  );
}
