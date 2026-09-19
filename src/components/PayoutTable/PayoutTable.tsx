import { payouts } from "../../utils/payouts";

/**
 * Viser pokerhendene og hvor mange ganger innsatsen de gir i premie.
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
        {Object.entries(payouts).map(([hand, payouts]) => (
          <tr key={hand}>
            <td>{hand}</td>
            <td>{payouts} × innsats</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
