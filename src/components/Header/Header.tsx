import { NavLink } from "react-router";
import styles from "./Header.module.css";

/**
 * Viser navigasjonen mellom sidene i applikasjonen.
 * @returns header med navigasjonslenker
 */
export default function Header() {
  return (
    <header>
      <nav className={styles.navBar}>
        <NavLink to="/">Spill</NavLink>
        <NavLink to="/regler">Regler</NavLink>
        <NavLink to="/spillere">Spillere</NavLink>
      </nav>
    </header>
  );
}
