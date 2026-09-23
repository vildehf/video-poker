import { payouts } from "../../utils/payouts";

/**
 * Viser pokerhendene og utbetalingen for hver hånd.
 */
export default function PayoutTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Hånd</th>
          <th>Utbetaling</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(payouts).map(([hand, payout]) => (
          <tr key={hand}>
            <td>{hand}</td>
            <td>{payout} × innsats</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
