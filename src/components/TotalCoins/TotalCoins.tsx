type TotalCoinsProps = {
  coins: number;
};

/**
 * Viser hvor mange coins spilleren har.
 */
export default function TotalCoins({ coins }: TotalCoinsProps) {
  return <p>Coins: {coins}</p>;
}
