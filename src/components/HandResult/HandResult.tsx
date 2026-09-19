import type { PokerHand } from "../../types/PokerHand";

type handResultProps = {
  hand: PokerHand;
};

/**
 * Viser pokerhånden som mottas gjennom hand-propen.
 */
export default function HandResult({ hand }: handResultProps) {
  return <p aria-live="polite">Pokerhånd: {hand}</p>;
}
