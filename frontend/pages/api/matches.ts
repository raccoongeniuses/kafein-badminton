import { NextApiRequest, NextApiResponse } from "next";

interface Player {
  id: number;
  name: string;
  selected?: boolean;
}

interface MatchResponse {
  court1: Player[];
  court2: Player[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchResponse | { error: string }>
) {
  if (req.method === "POST") {
    const { players, mode } = req.body;

    if (players.length < 4) {
      return res.status(400).json({ error: "Minimum 4 players required" });
    }

    let selectedPlayers: Player[];

    if (mode === "auto") {
      selectedPlayers = [...players]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    } else {
      selectedPlayers = players.filter((p: Player) => p.selected);
    }

    if (selectedPlayers.length !== 4) {
      return res.status(400).json({ error: "Select exactly 4 players" });
    }

    const court1 = [selectedPlayers[0], selectedPlayers[1]];
    const court2 = [selectedPlayers[2], selectedPlayers[3]];

    res.status(200).json({ court1, court2 });
  }
}
