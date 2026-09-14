import { useState, useEffect } from "react";
import type { Player } from "../../types/Player";
import styles from "./PlayersPage.module.css";

/**
 * Viser siden for å opprette og velge spillere.
 * @returns spillersiden
 */
export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem("players");

    if (savedPlayers) {
      return JSON.parse(savedPlayers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(() => {
    const savedPlayer = localStorage.getItem("currentPlayer");

    if (savedPlayer) {
      return JSON.parse(savedPlayer);
    }

    return null;
  });

  useEffect(() => {
    if (currentPlayer) {
      localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
    }
  }, [currentPlayer]);

  /**
   * Oppretter en ny spiller med 100 coins.
   * @param formData data fra skjemaet med spillerens navn.
   */
  function addPlayer(formData: FormData) {
    const name = formData.get("name");

    if (typeof name !== "string" || name.trim() === "") {
      return;
    }

    const newPlayer: Player = {
      name: name,
      coins: 100,
    };

    setPlayers([...players, newPlayer]);
  }

  return (
    <main className={styles.playersPage}>
      <h1>Spillere</h1>
      <p>Her kan spilleren velges eller opprettes.</p>

      <form action={addPlayer}>
        <label>
          Navn:
          <input type="text" name="name" />
        </label>

        <button type="submit">Opprett spiller</button>
      </form>

      <h2>Spillere</h2>
      <div className={styles.playerList}>
        {players.map((player) => (
          <button key={player.name} onClick={() => setCurrentPlayer(player)}>
            {player.name} - {player.coins} coins
          </button>
        ))}
      </div>
      {currentPlayer && <p>Valgt spiller: {currentPlayer.name}</p>}
    </main>
  );
}
