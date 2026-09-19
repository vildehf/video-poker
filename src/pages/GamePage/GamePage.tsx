import Game from "../../components/Game/Game";

/**
 * Viser hovedsiden for Video Poker-spillet.
 *@returns spillsiden.
 */
export default function GamePage() {
  return (
    <main>
      <h1>Video Poker</h1>
      <Game />
    </main>
  );
}
