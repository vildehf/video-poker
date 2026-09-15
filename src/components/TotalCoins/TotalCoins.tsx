type TotalCoinsProps = {
  coins: number;
};

/**
 * Viser hvor mange coins spilleren har.
 * @param coins antall coins spilleren har
 * @returns spillerens antall coins
 */
export default function TotalCoins({ coins }: TotalCoinsProps) {
  return <p>Coins: {coins}</p>;
}
