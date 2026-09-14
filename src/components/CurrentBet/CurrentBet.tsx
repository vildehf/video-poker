type CurrentBetProps = {
  bet: number;
};

/**
 * Viser spillerens nåværende innsats.
 * @param bet spillerens nåværende innsats
 * @returns nåværende innsats
 */
export default function CurrentBet({ bet }: CurrentBetProps) {
  return <p>Bet: {bet}</p>;
}
