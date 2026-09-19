import styles from "./PlayersPage.module.css";
import { useGameStore } from "../../store/useGameStore";

/**
 * Viser spillerlisten og lar brukeren opprette, velge og slette spillere.
 */
export default function PlayersPage() {
  const players = useGameStore((state) => state.players);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
  const addPlayer = useGameStore((state) => state.addPlayer);
  const deletePlayer = useGameStore((state) => state.deletePlayer);

  /**
   * Leser navnet fra skjemaet og oppretter spilleren gjennom store.
   */
  function handleAddPlayer(formData: FormData) {
    const name = formData.get("name");

    if (typeof name === "string") {
      addPlayer(name);
    }
  }

  return (
    <main className={styles.playersPage}>
      <h1>Spillere</h1>
      <p>Her kan spilleren velges eller opprettes.</p>

      <form action={handleAddPlayer}>
        <label>
          Navn:
          <input type="text" name="name" required />
        </label>

        <button type="submit">Opprett spiller</button>
      </form>

      <h2>Spillere</h2>
      <div className={styles.playerList}>
        {players.map((player) => (
          <div key={player.id} className={styles.playerItem}>
            <button
              type="button"
              className={
                currentPlayer?.id === player.id ? styles.selectedPlayer : ""
              }
              aria-pressed={currentPlayer?.id === player.id}
              onClick={() => setCurrentPlayer(player)}
            >
              {player.name} - {player.coins} coins
            </button>

            <button
              type="button"
              className={styles.deleteButton}
              aria-label={`Slett ${player.name}`}
              onClick={() => deletePlayer(player.id)}
            >
              Slett
            </button>
          </div>
        ))}
      </div>
      {currentPlayer && <p>Valgt spiller: {currentPlayer.name} </p>}
    </main>
  );
}
