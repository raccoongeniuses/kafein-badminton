interface Player {
  id: number;
  name: string;
  score: number;
}

interface CourtProps {
  court: number;
  players: Player[];
  onUpdateScore: (court: number, player: string, action: string) => void;
}

export default function Court({ court, players, onUpdateScore }: CourtProps) {
  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-bold mb-2">Court {court}</h3>
      <div className="grid grid-cols-2 gap-4">
        {players.map((player, index) => (
          <div key={player.id} className="border rounded p-3">
            <div className="font-medium">{player.name}</div>
            <div className="flex items-center mt-2">
              <span className="text-2xl mr-2">{player.score}</span>
              <button
                onClick={() =>
                  onUpdateScore(court, `player${index + 1}`, "increment")
                }
                className="bg-blue-500 text-white w-8 h-8 rounded-full hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
