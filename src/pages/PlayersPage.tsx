import { useState, useEffect } from "react";
import type { Player } from "../types/Player";

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
    <main>
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

      {players.map((players) => (
        <p key={players.name}>
          {players.name} - {players.coins} coins
        </p>
      ))}
    </main>
  );
}
