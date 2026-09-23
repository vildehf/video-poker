import { useEffect } from "react";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import Card from "../Card/Card";
import styles from "../../components/Game/Game.module.css";
import { useGameStore } from "../../store/useGameStore";
import HandResult from "../HandResult/HandResult";

/**
 *
 * @returns Viser spillbrettet og kobler knappene til handlingene i store.
 */
export default function Game() {
  // Spilltilstand
  const deck = useGameStore((state) => state.deck);
  const hand = useGameStore((state) => state.hand);
  const currentBet = useGameStore((state) => state.currentBet);
  const pokerHand = useGameStore((state) => state.pokerHand);
  const heldCards = useGameStore((state) => state.heldCards);
  const hasDrawn = useGameStore((state) => state.hasDrawn);
  const currentPlayer = useGameStore((state) => state.currentPlayer);

  // Spillhandlinger
  const startGame = useGameStore((state) => state.startGame);
  const startNewRound = useGameStore((state) => state.startNewRound);
  const dealNewHand = useGameStore((state) => state.dealNewHand);
  const increaseBet = useGameStore((state) => state.increaseBet);
  const decreaseBet = useGameStore((state) => state.decreaseBet);
  const toggleHold = useGameStore((state) => state.toggleHold);
  // Starter spillet hvis det ikke finnes en hånd eller kortstokk
  useEffect(() => {
    if (hand.length === 0 && deck.length === 0) {
      startGame();
    }
  }, [hand.length, deck.length, startGame]);

  return (
    <>
      <div className={styles.gameArea}>
        <div className={styles.gameInfo}>
          <TotalCoins coins={currentPlayer?.coins ?? 0} />
          <CurrentBet bet={currentBet} />
          <HandResult hand={pokerHand} />
          <button
            onClick={increaseBet}
            disabled={
              !currentPlayer ||
              hasDrawn ||
              currentBet >= Math.min(5, currentPlayer.coins)
            }
          >
            Øk innsats
          </button>

          <button
            onClick={decreaseBet}
            disabled={!currentPlayer || hasDrawn || currentBet <= 1}
          >
            Senk innsats
          </button>
        </div>

        <div className={styles.deck}>
          <Card back />
        </div>

        <div className={styles.hand}>
          {hand.map((card, index) => (
            <div
              className={`${styles.cardSlot} ${styles.stackedCard}`}
              key={`${card.suit}-${card.value}`}
            >
              <Card
                card={card}
                onClick={() => toggleHold(index)}
                held={heldCards.includes(index)}
                disabled={hasDrawn}
              />
            </div>
          ))}
        </div>
        <div className={styles.gameActions}>
          <button
            className={styles.gameButton}
            onClick={dealNewHand}
            disabled={
              hasDrawn || !currentPlayer || currentPlayer.coins < currentBet
            }
          >
            Del ut nye kort
          </button>

          <button
            className={styles.gameButton}
            onClick={startNewRound}
            disabled={!hasDrawn}
          >
            Ny runde
          </button>
        </div>
      </div>
    </>
  );
}
