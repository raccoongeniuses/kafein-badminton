import { NextApiRequest, NextApiResponse } from "next";

interface Player {
  id: number;
  name: string;
}

let players: Player[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(players);
  } else if (req.method === "POST") {
    const { name } = req.body;
    if (players.length < 8) {
      const newPlayer: Player = { id: Date.now(), name };
      players.push(newPlayer);
      res.status(201).json(newPlayer);
    } else {
      res.status(400).json({ error: "Maximum 8 players allowed" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    players = players.filter((p) => p.id !== parseInt(id as string));
    res.status(200).json({ message: "Player deleted" });
  }
}
