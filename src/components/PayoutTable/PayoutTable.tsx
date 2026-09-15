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
        <tr>
          <td>Royal Flush</td>
          <td>10 × innsats</td>
        </tr>
        <tr>
          <td>Straight Flush</td>
          <td>9 × innsats</td>
        </tr>
        <tr>
          <td>Fire like</td>
          <td>8 × innsats</td>
        </tr>
        <tr>
          <td>Fullt hus</td>
          <td>7 × innsats</td>
        </tr>
        <tr>
          <td>Flush</td>
          <td>6 × innsats</td>
        </tr>
        <tr>
          <td>Straight</td>
          <td>5 × innsats</td>
        </tr>
        <tr>
          <td>Tre like</td>
          <td>4 × innsats</td>
        </tr>
        <tr>
          <td>To par</td>
          <td>3 × innsats</td>
        </tr>
        <tr>
          <td>Par</td>
          <td>2 × innsats</td>
        </tr>
      </tbody>
    </table>
  );
}
