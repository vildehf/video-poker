import PayoutTable from "../../components/PayoutTable/PayoutTable";
import styles from "./RulesPage.module.css";

/**
 * Viser regler og premier for spillet.
 * @returns regelsiden
 */
export default function RulesPages() {
  return (
    <main className={styles.rulesPage}>
      <h1>Regler</h1>
      <PayoutTable />
    </main>
  );
}
