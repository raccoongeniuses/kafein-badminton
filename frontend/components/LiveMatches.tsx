import { Match, QueueItem, GameHistory, Player } from '../types';

interface LiveMatchesProps {
  liveMatches: Match[];
  setLiveMatches: (matches: Match[]) => void;
  queue: QueueItem[];
  setQueue: (queue: QueueItem[]) => void;
  history: GameHistory[];
  setHistory: (history: GameHistory[]) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  setCurrentRound: (round: number) => void;
}

export default function LiveMatches({
  liveMatches,
  setLiveMatches,
  queue,
  setQueue,
  history,
  setHistory,
  players,
  setPlayers,
  setCurrentRound,
}: LiveMatchesProps) {
  const updateScore = (matchId: string, team: 1 | 2, score: number) => {
    setLiveMatches(liveMatches.map(match => {
      if (match.id === matchId) {
        return {
          ...match,
          team1Score: team === 1 ? score : match.team1Score,
          team2Score: team === 2 ? score : match.team2Score,
        };
      }
      return match;
    }));
  };

  const submitMatchResult = (matchId: string) => {
    const match = liveMatches.find(m => m.id === matchId);
    if (!match) return;

    // Check if match is valid for completion (first to 25, win by 2)
    const checkMatchComplete = (t1Score: number, t2Score: number) => {
      const maxScore = Math.max(t1Score, t2Score);
      const minScore = Math.min(t1Score, t2Score);
      return maxScore >= 25 && (maxScore - minScore) >= 2;
    };

    if (!checkMatchComplete(match.team1Score, match.team2Score)) {
      alert('Match must be completed with first to 25 points and win by 2!');
      return;
    }

    // Complete the match
    const updatedMatch = {
      ...match,
      status: 'completed' as const,
      endTime: new Date(),
    };

    const winner = updatedMatch.team1Score > updatedMatch.team2Score ? 'team1' : 'team2';

    // Add to history
    const historyItem: GameHistory = {
      id: `history-${Date.now()}`,
      round: updatedMatch.round,
      court: updatedMatch.court,
      team1: [updatedMatch.team1[0].name, updatedMatch.team1[1].name],
      team2: [updatedMatch.team2[0].name, updatedMatch.team2[1].name],
      team1Score: updatedMatch.team1Score,
      team2Score: updatedMatch.team2Score,
      winner,
      completedAt: new Date(),
    };
    setHistory([historyItem, ...history]);

    // Update player statistics
    const updatedPlayers = [...players];
    const allMatchPlayers = [...updatedMatch.team1, ...updatedMatch.team2];

    allMatchPlayers.forEach(player => {
      const playerIndex = updatedPlayers.findIndex(p => p.id === player.id);
      if (playerIndex !== -1) {
        updatedPlayers[playerIndex].totalGames += 1;

        const isWinner = (winner === 'team1' &&
          (updatedMatch.team1[0].id === player.id || updatedMatch.team1[1].id === player.id)) ||
          (winner === 'team2' &&
          (updatedMatch.team2[0].id === player.id || updatedMatch.team2[1].id === player.id));

        if (isWinner) {
          updatedPlayers[playerIndex].wins += 1;
        } else {
          updatedPlayers[playerIndex].losses += 1;
        }

        // Update points differential
        updatedPlayers[playerIndex].pointsDifferential +=
          winner === 'team1' ? updatedMatch.team1Score - updatedMatch.team2Score
                              : updatedMatch.team2Score - updatedMatch.team1Score;
      }
    });

    setPlayers(updatedPlayers);

    // Check if this was the last match of the current round
    const currentRoundMatches = liveMatches.filter(m => m.round === match.round);
    const remainingCurrentRoundMatches = currentRoundMatches.filter(m => m.id !== matchId && m.status === 'ongoing');

    // If no more matches from current round and no queue, increment round
    if (remainingCurrentRoundMatches.length === 0 && queue.length === 0) {
      setCurrentRound(match.round + 1);
    }

    // Move queue item to live match if available
    if (queue.length > 0) {
      const nextQueueItem = queue[0];
      const newLiveMatch: Match = {
        id: `match-${Date.now()}`,
        court: nextQueueItem.court,
        round: nextQueueItem.round,
        team1: nextQueueItem.team1,
        team2: nextQueueItem.team2,
        team1Score: 0,
        team2Score: 0,
        status: 'ongoing',
        startTime: new Date(),
      };

      setLiveMatches([
        ...liveMatches.filter(m => m.id !== matchId),
        newLiveMatch
      ]);
      setQueue(queue.slice(1));
    } else {
      // Just remove the completed match if no queue
      setLiveMatches(liveMatches.filter(m => m.id !== matchId));
    }
  };

  const validateScoreInput = (value: string): number => {
    const score = parseInt(value, 10);
    return isNaN(score) ? 0 : Math.min(25, Math.max(0, score));
  };

  const canSubmitMatch = (match: Match) => {
    const maxScore = Math.max(match.team1Score, match.team2Score);
    const minScore = Math.min(match.team1Score, match.team2Score);
    return maxScore >= 25 && (maxScore - minScore) >= 2;
  };

  if (liveMatches.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-6">Live Matches</h2>
        <p className="text-white/60 text-center py-8">
          No live matches. Generate matches to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Live Matches</h2>

      <div className="space-y-6">
        {liveMatches.map((match) => (
          <div key={match.id} className="glass-dark court-active rounded-xl p-4">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-white font-bold text-lg">Court {match.court}</span>
                <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full border border-purple-400/30">
                  Round {match.round}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 */}
              <div className="text-center">
                <div className="space-y-2 mb-4">
                  <div className="text-white font-medium">
                    {match.team1[0].name}
                  </div>
                  <div className="text-white font-medium">
                    {match.team1[1].name}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateScore(match.id, 1, Math.max(0, match.team1Score - 1))}
                    className="btn-glass w-8 h-8 rounded text-white font-bold"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={match.team1Score}
                    onChange={(e) => updateScore(match.id, 1, validateScoreInput(e.target.value))}
                    className="input-glass w-16 text-center text-white font-bold text-xl py-1 rounded"
                    min="0"
                    max="25"
                  />

                  <button
                    onClick={() => updateScore(match.id, 1, Math.min(25, match.team1Score + 1))}
                    className="btn-glass w-8 h-8 rounded text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Team 2 */}
              <div className="text-center">
                <div className="space-y-2 mb-4">
                  <div className="text-white font-medium">
                    {match.team2[0].name}
                  </div>
                  <div className="text-white font-medium">
                    {match.team2[1].name}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateScore(match.id, 2, Math.max(0, match.team2Score - 1))}
                    className="btn-glass w-8 h-8 rounded text-white font-bold"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={match.team2Score}
                    onChange={(e) => updateScore(match.id, 2, validateScoreInput(e.target.value))}
                    className="input-glass w-16 text-center text-white font-bold text-xl py-1 rounded"
                    min="0"
                    max="25"
                  />

                  <button
                    onClick={() => updateScore(match.id, 2, Math.min(25, match.team2Score + 1))}
                    className="btn-glass w-8 h-8 rounded text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Match Status and Submit Button */}
            <div className="text-center mt-4 space-y-3">
              <span className="text-white/60 text-sm">
                First to 25 points (win by 2)
              </span>

              <button
                onClick={() => submitMatchResult(match.id)}
                disabled={!canSubmitMatch(match)}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  canSubmitMatch(match)
                    ? 'btn-glass bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30'
                    : 'bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                {canSubmitMatch(match) ? 'Submit Match Result' : `Keep Playing (${25 - Math.max(match.team1Score, match.team2Score)} more to win)`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}