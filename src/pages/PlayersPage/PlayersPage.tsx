import { useState, useEffect } from "react";
import type { Player } from "../../types/Player";
import styles from "./PlayersPage.module.css";
import { useGameStore } from "../../store/useGameStore";

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

  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    if (!currentPlayer) {
      return;
    }

    setPlayers((players) =>
      players.map((player) =>
        player.name === currentPlayer.name ? currentPlayer : player,
      ),
    );
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
      name: name.trim(),
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
        {players.map((player, index) => (
          <button
            key={`${player.name}-${index}`}
            onClick={() => setCurrentPlayer(player)}
          >
            {player.name} - {player.coins} coins
          </button>
        ))}
      </div>
      {currentPlayer && <p>Valgt spiller: {currentPlayer.name}</p>}
    </main>
  );
}
