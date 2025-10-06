import { useState, useEffect } from "react";

interface Player {
  id: number;
  name: string;
  selected?: boolean;
}

interface PlayerListProps {
  onPlayerSelect: () => void;
}

export default function PlayerList({ onPlayerSelect }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/players?id=${id}`, { method: "DELETE" });
    setPlayers(players.filter((p) => p.id !== id));
  };

  const toggleSelect = (id: number) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
    onPlayerSelect();
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Players ({players.length}/8)</h2>
      <ul className="space-y-2">
        {players.map((player) => (
          <li
            key={player.id}
            className={`flex justify-between items-center p-2 border rounded ${
              player.selected ? "bg-blue-100" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={!!player.selected}
                onChange={() => toggleSelect(player.id)}
                className="mr-2"
              />
              <span>{player.name}</span>
            </div>
            <button
              onClick={() => handleDelete(player.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
