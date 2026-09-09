type CurrentBetProps = {
  bet: number;
};

export default function CurrentBet({ bet }: CurrentBetProps) {
  return <p>Bet: {bet}</p>;
}
