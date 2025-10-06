import { useMemo } from 'react';
import { Player, LeaderboardStats } from '../types';

interface LeaderboardProps {
  players: Player[];
}

export default function Leaderboard({ players }: LeaderboardProps) {
  const leaderboardStats = useMemo(() => {
    return players
      .map(player => {
        const winRate = player.totalGames > 0
          ? Math.round((player.wins / player.totalGames) * 100)
          : 0;

        return {
          player,
          winRate,
          kdRatio: player.pointsDifferential,
        } as LeaderboardStats;
      })
      .sort((a, b) => {
        // Sort by win rate first, then by total games, then by K/D ratio
        if (b.winRate !== a.winRate) {
          return b.winRate - a.winRate;
        }
        if (b.player.totalGames !== a.player.totalGames) {
          return b.player.totalGames - a.player.totalGames;
        }
        return b.kdRatio - a.kdRatio;
      });
  }, [players]);

  if (players.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
        <p className="text-white/60 text-center py-8">
          No players added yet
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>

      <div className="space-y-2">
        {leaderboardStats.map((stats, index) => (
          <div
            key={stats.player.id}
            className={`glass rounded-lg p-3 flex items-center justify-between ${
              stats.player.status === 'active' ? 'player-active' : 'player-inactive'
            }`}
          >
            {/* Rank and Player Info */}
            <div className="flex items-center gap-3 flex-1">
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-yellow-500/30 text-yellow-300' :
                index === 1 ? 'bg-gray-400/30 text-gray-300' :
                index === 2 ? 'bg-orange-600/30 text-orange-300' :
                'bg-white/20 text-white/80'
              }`}>
                {index + 1}
              </div>

              {/* Player Name */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{stats.player.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    stats.player.status === 'active'
                      ? 'bg-green-500/30 text-green-300 border border-green-400/30'
                      : 'bg-gray-500/30 text-gray-300 border border-gray-400/30'
                  }`}>
                    {stats.player.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-xs">
              <div className="text-center">
                <div className="text-white/60">Games</div>
                <div className="text-white font-bold">{stats.player.totalGames}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">W/L</div>
                <div className="text-white font-bold">{stats.player.wins}/{stats.player.losses}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">Win %</div>
                <div className="text-white font-bold">{stats.winRate}%</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">K/D</div>
                <div className={`font-bold ${
                  stats.kdRatio > 0 ? 'text-green-300' :
                  stats.kdRatio < 0 ? 'text-red-300' : 'text-white'
                }`}>
                  {stats.kdRatio > 0 ? '+' : ''}{stats.kdRatio}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 p-3 rounded-lg bg-white/10">
        <h4 className="text-white font-medium mb-2 text-sm">Legend:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
          <div>Games - Total matches played</div>
          <div>W/L - Wins/Losses</div>
          <div>Win % - Win percentage</div>
          <div>K/D - Point differential</div>
        </div>
      </div>
    </div>
  );
}