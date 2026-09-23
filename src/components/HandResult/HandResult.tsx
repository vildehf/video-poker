import type { PokerHand } from "../../types/PokerHand";

type HandResultProps = {
  hand: PokerHand;
};

/**
 * Viser pokerhånden som mottas gjennom hand-propen.
 */
export default function HandResult({ hand }: HandResultProps) {
  return <p aria-live="polite">Pokerhånd: {hand}</p>;
}
