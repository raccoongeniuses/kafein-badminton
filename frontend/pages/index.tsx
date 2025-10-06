import { useState, useEffect } from 'react';
import { Player, Match, QueueItem, GameHistory } from '../types';
import PlayerManagement from '../components/PlayerManagement';
import MatchGenerator from '../components/MatchGenerator';
import LiveMatches from '../components/LiveMatches';
import QueueDisplay from '../components/QueueDisplay';
import Leaderboard from '../components/Leaderboard';
import History from '../components/History';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [currentRound, setCurrentRound] = useState(1);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('kafein-players');
    const savedHistory = localStorage.getItem('kafein-history');

    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      // Add temporary default players for testing
      const defaultPlayers: Player[] = [
        'a1', 'a2', 'a3', 'a4',
        'b1', 'b2', 'b3', 'b4',
        'c1', 'c2', 'c3', 'c4',
        'd1', 'd2', 'd3', 'd4'
      ].map((name, index) => ({
        id: (index + 1).toString(),
        name,
        status: 'active' as const,
        totalGames: 0,
        wins: 0,
        losses: 0,
        pointsDifferential: 0,
      }));
      setPlayers(defaultPlayers);
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save players to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kafein-players', JSON.stringify(players));
  }, [players]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kafein-history', JSON.stringify(history));
  }, [history]);

  const resetSession = () => {
    setPlayers([]);
    setLiveMatches([]);
    setQueue([]);
    setHistory([]);
    localStorage.removeItem('kafein-players');
    localStorage.removeItem('kafein-history');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Kafein Badminton
          </h1>
          <p className="text-white/80 text-lg">
            Manage matches, track scores, and dominate the court
          </p>
        </header>

        {/* Main Grid Layout - Single Column Layout (One component per row) */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Player Management - Full Row */}
          <PlayerManagement
            players={players}
            setPlayers={setPlayers}
            resetSession={resetSession}
          />

          {/* Match Generator - Full Row */}
          {players.length >= 4 && (
            <MatchGenerator
              players={players}
              liveMatches={liveMatches}
              setLiveMatches={setLiveMatches}
              queue={queue}
              setQueue={setQueue}
              currentRound={currentRound}
            />
          )}

          {/* Live Matches - Full Row */}
          <LiveMatches
            liveMatches={liveMatches}
            setLiveMatches={setLiveMatches}
            queue={queue}
            setQueue={setQueue}
            history={history}
            setHistory={setHistory}
            players={players}
            setPlayers={setPlayers}
            setCurrentRound={setCurrentRound}
          />

          {/* Queue Display - Full Row */}
          <QueueDisplay queue={queue} />

          {/* Leaderboard - Full Row */}
          <Leaderboard players={players} />

          {/* History - Full Row */}
          <History history={history} />
        </div>
      </div>
    </div>
  );
}