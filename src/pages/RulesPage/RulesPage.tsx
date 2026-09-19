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
        Velg hvilke kort du vil holde på, og trekk nye kort for resten av
        hånden. Etter trekket får du premie ut fra pokerhånden du ender med.
      </p>
      <PayoutTable />
    </main>
  );
}
