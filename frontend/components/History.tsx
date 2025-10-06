import { useMemo } from 'react';
import { GameHistory } from '../types';

interface HistoryProps {
  history: GameHistory[];
}

export default function History({ history }: HistoryProps) {
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  }, [history]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  
  if (history.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-6">Match History</h2>
        <p className="text-white/60 text-center py-8">
          No matches completed yet
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Match History</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedHistory.slice(0, 25).map((match) => (
          <div key={match.id} className="glass-dark rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-xs">
                  {formatDate(match.completedAt)}
                </span>
                <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full border border-purple-400/30">
                  Round {match.round}
                </span>
                <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full border border-blue-400/30">
                  Court {match.court}
                </span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                match.winner === 'team1'
                  ? 'bg-green-500/30 text-green-300 border border-green-400/30'
                  : 'bg-green-500/30 text-green-300 border border-green-400/30'
              }`}>
                Team {match.winner === 'team1' ? '1' : '2'} Won
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Team 1 */}
              <div className={`text-center p-2 rounded ${
                match.winner === 'team1'
                  ? 'bg-green-500/20 border border-green-400/30'
                  : 'bg-white/10'
              }`}>
                <div className="text-xs text-white/60 mb-1">Team 1</div>
                <div className="text-white text-sm space-y-1">
                  <div>{match.team1[0]}</div>
                  <div>{match.team1[1]}</div>
                </div>
                <div className={`font-bold mt-1 ${
                  match.winner === 'team1' ? 'text-green-300' : 'text-white/60'
                }`}>
                  {match.team1Score}
                </div>
              </div>

              {/* Team 2 */}
              <div className={`text-center p-2 rounded ${
                match.winner === 'team2'
                  ? 'bg-green-500/20 border border-green-400/30'
                  : 'bg-white/10'
              }`}>
                <div className="text-xs text-white/60 mb-1">Team 2</div>
                <div className="text-white text-sm space-y-1">
                  <div>{match.team2[0]}</div>
                  <div>{match.team2[1]}</div>
                </div>
                <div className={`font-bold mt-1 ${
                  match.winner === 'team2' ? 'text-green-300' : 'text-white/60'
                }`}>
                  {match.team2Score}
                </div>
              </div>
            </div>

            {/* Score Difference */}
            <div className="text-center mt-2">
              <span className="text-white/40 text-xs">
                Score difference: {Math.abs(match.team1Score - match.team2Score)} points
              </span>
            </div>
          </div>
        ))}
      </div>

      {history.length > 25 && (
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Showing last 25 matches of {history.length} total
          </p>
        </div>
      )}
    </div>
  );
}