import { NextApiRequest, NextApiResponse } from "next";

interface Scores {
  court1: {
    player1: number;
    player2: number;
  };
  court2: {
    player1: number;
    player2: number;
  };
}

let scores: Scores = {
  court1: { player1: 0, player2: 0 },
  court2: { player1: 0, player2: 0 },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scores>
) {
  if (req.method === "GET") {
    res.status(200).json(scores);
  } else if (req.method === "POST") {
    const { court, player, action } = req.body;

    if (action === "increment") {
      scores[court as keyof Scores][player as keyof Scores["court1"]]++;
    } else if (action === "reset") {
      scores = {
        court1: { player1: 0, player2: 0 },
        court2: { player1: 0, player2: 0 },
      };
    }

    res.status(200).json(scores);
  }
}
