// Inneholder pokerhendene og hvor mange ganger innsatsen de gir i premie
const payouts = [
  { hand: "Royal Flush", payout: 10 },
  { hand: "Straight Flush", payout: 9 },
  { hand: "Fire like", payout: 8 },
  { hand: "Fullt hus", payout: 7 },
  { hand: "Flush", payout: 6 },
  { hand: "Straight", payout: 5 },
  { hand: "Tre like", payout: 4 },
  { hand: "To par", payout: 3 },
  { hand: "Par", payout: 2 },
];
/**
 * Viser pokerhendene og premiene for hver hånd.
 * @returns tabellen med pokerhender og premier
 */
export default function PayoutTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Hånd</th>
          <th>Premie</th>
        </tr>
      </thead>

      <tbody>
        {payouts.map((payout) => (
          <tr key={payout.hand}>
            <td>{payout.hand}</td>
            <td>{payout.payout} × innsats</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
