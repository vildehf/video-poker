import PayoutTable from "../../components/PayoutTable/PayoutTable";
import styles from "./RulesPage.module.css";

/**
 * Viser regler og premier for spillet.
 * @returns regelsiden
 */
export default function RulesPage() {
  return (
    <main className={styles.rulesPage}>
      <h1>Regler</h1>
      <p>
        Opprett eller velg en spiller på Spillere-siden. Nye spillere starter
        med 100 mynter.
      </p>
      <p>
        Du får utdelt fem kort. Velg en innsats fra 1 til 5 mynter, begrenset av
        hvor mange mynter du har.
      </p>
      <p>
        Trykk på kortene du vil beholde for å velge HOLD. Trykk på et valgt kort
        igjen for å fjerne HOLD.
      </p>
      <p>
        Trykk "Del ut nye kort" for å bytte kortene du ikke holder. Du kan bytte
        en gang per runde. Holder du alle fem, vurderes hånden uten at noen kort
        byttes.
      </p>
      <p>
        Innsatsen trekkes når du fullfører trekket. Deretter legges eventuell
        premie til saldoen, som vist i tabellen. Trykk "Ny runde" for å spille
        igjen.
      </p>
      <p>
        Spillet lagres automatisk i denne nettleseren. Du kan besøke en annen
        side i appen eller laste siden på nytt og fortsette runden.
      </p>
      <PayoutTable />
    </main>
  );
}
