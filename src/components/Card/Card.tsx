import type { PlayingCard } from "../../types/PlayingCard";
import styles from "./Card.module.css";

type CardProps = {
  card: PlayingCard;
  onClick?: () => void;
  held?: boolean;
};

/**
 * Viser et spillkort med verdi og symbol.
 * @param card kortet skal vises
 * @param onClick funksjon som kjøres når kortet trykkes på
 * @param held viser om kortet er valgt til HOLD
 * @returns et spillkort
 */
export default function Card({ card, onClick, held }: CardProps) {
  function getSuitSymbol() {
    if (card.suit === "hearts") return "♥";
    if (card.suit === "diamonds") return "♦";
    if (card.suit === "clubs") return "♣";
    return "♠";
  }

  const isRed = card.suit === "hearts" || card.suit === "diamonds";

  return (
    <button
      type="button"
      className={`${styles.card} ${isRed ? styles.red : styles.black} ${
        held ? styles.held : ""
      } `}
      onClick={onClick}
      aria-pressed={held}
    >
      <div className={styles.top}>
        <span>{card.value}</span>
        <span>{getSuitSymbol()}</span>
      </div>

      <div className={styles.center}>
        <span>{getSuitSymbol()}</span>
      </div>
    </button>
  );
}
