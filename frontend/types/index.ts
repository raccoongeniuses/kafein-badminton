export interface Player {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  totalGames: number;
  wins: number;
  losses: number;
  pointsDifferential: number;
}

export interface Match {
  id: string;
  court: number;
  round: number;
  team1: [Player, Player];
  team2: [Player, Player];
  team1Score: number;
  team2Score: number;
  status: 'ongoing' | 'completed';
  startTime: Date;
  endTime?: Date;
}

export interface QueueItem {
  id: string;
  court: number;
  round: number;
  team1: [Player, Player];
  team2: [Player, Player];
}

export interface GameHistory {
  id: string;
  round: number;
  court: number;
  team1: [string, string]; // player names
  team2: [string, string]; // player names
  team1Score: number;
  team2Score: number;
  winner: 'team1' | 'team2';
  completedAt: Date;
}

export interface LeaderboardStats {
  player: Player;
  winRate: number;
  kdRatio: number;
}