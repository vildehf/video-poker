type CurrentBetProps = {
  bet: number;
};

/**
 * Viser spillerens nåværende innsats.
 */
export default function CurrentBet({ bet }: CurrentBetProps) {
  return <p>Bet: {bet}</p>;
}
