import { useState } from 'react';
import { Player, Match, QueueItem } from '../types';

interface MatchGeneratorProps {
  players: Player[];
  liveMatches: Match[];
  setLiveMatches: (matches: Match[]) => void;
  queue: QueueItem[];
  setQueue: (queue: QueueItem[]) => void;
  currentRound: number;
}

export default function MatchGenerator({
  players,
  liveMatches,
  setLiveMatches,
  queue,
  setQueue,
  currentRound,
}: MatchGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const getActivePlayers = () => {
    return players.filter(p => p.status === 'active');
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateRandomMatches = () => {
    setIsGenerating(true);

    const activePlayers = getActivePlayers();
    if (activePlayers.length < 4) {
      setIsGenerating(false);
      return;
    }

    const shuffledPlayers = shuffleArray(activePlayers);
    const newMatches: Match[] = [];
    const newQueue: QueueItem[] = [];

    // Generate 2 court matches (4 players each = 8 players total)
    for (let court = 1; court <= 2; court++) {
      const startIndex = (court - 1) * 4;
      const endIndex = Math.min(startIndex + 4, shuffledPlayers.length);

      if (endIndex - startIndex >= 4) {
        const courtPlayers = shuffledPlayers.slice(startIndex, endIndex);
        const match: Match = {
          id: `match-${Date.now()}-${court}`,
          court,
          round: currentRound,
          team1: [courtPlayers[0], courtPlayers[1]],
          team2: [courtPlayers[2], courtPlayers[3]],
          team1Score: 0,
          team2Score: 0,
          status: 'ongoing',
          startTime: new Date(),
        };
        newMatches.push(match);
      }
    }

    // Generate queue items (next 4 players for each court if available)
    const remainingPlayers = shuffledPlayers.slice(8);
    for (let court = 1; court <= 2 && remainingPlayers.length >= 4; court++) {
      const startIndex = (court - 1) * 4;
      const endIndex = Math.min(startIndex + 4, remainingPlayers.length);

      if (endIndex - startIndex >= 4) {
        const queuePlayers = remainingPlayers.slice(startIndex, endIndex);
        const queueItem: QueueItem = {
          id: `queue-${Date.now()}-${court}`,
          court,
          round: currentRound,
          team1: [queuePlayers[0], queuePlayers[1]],
          team2: [queuePlayers[2], queuePlayers[3]],
        };
        newQueue.push(queueItem);
      }
    }

    setLiveMatches(newMatches);
    setQueue(newQueue);
    setIsGenerating(false);
  };

  const generateManualMatches = () => {
    // For now, we'll implement the same as random
    // In a real implementation, this would open a modal or interface for manual selection
    generateRandomMatches();
  };

  const clearMatches = () => {
    setLiveMatches([]);
    setQueue([]);
  };

  const activePlayersCount = getActivePlayers().length;

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Match Generator</h2>

      {/* Status Info */}
      <div className="mb-6 p-4 rounded-lg bg-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80">Active Players:</span>
          <span className="font-bold text-white">{activePlayersCount}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80">Live Matches:</span>
          <span className="font-bold text-white">{liveMatches.length}/2</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Queue Items:</span>
          <span className="font-bold text-white">{queue.length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={generateRandomMatches}
          disabled={isGenerating || activePlayersCount < 4 || liveMatches.length > 0}
          className="w-full btn-glass py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Random Matches'}
        </button>

        <button
          onClick={generateManualMatches}
          disabled={isGenerating || activePlayersCount < 4 || liveMatches.length > 0}
          className="w-full btn-glass py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Manual Matches
        </button>

        {(liveMatches.length > 0 || queue.length > 0) && (
          <button
            onClick={clearMatches}
            className="w-full btn-glass bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 py-3 rounded-lg font-medium"
          >
            Clear All Matches
          </button>
        )}
      </div>

      {/* Instructions */}
      {activePlayersCount < 4 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/20 border border-yellow-400/30">
          <p className="text-yellow-300 text-sm">
            Need at least 4 active players to generate matches
          </p>
        </div>
      )}

      {liveMatches.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-blue-500/20 border border-blue-400/30">
          <p className="text-blue-300 text-sm">
            Complete current matches before generating new ones
          </p>
        </div>
      )}
    </div>
  );
}