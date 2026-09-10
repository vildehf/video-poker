type TotalCoinsProps = {
  coins: number;
};

export default function TotalCoins({ coins }: TotalCoinsProps) {
  return <p>Coins: {coins}</p>;
}
