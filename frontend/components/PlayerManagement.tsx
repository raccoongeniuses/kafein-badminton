import { useState } from 'react';
import { Player } from '../types';

interface PlayerManagementProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  resetSession: () => void;
}

export default function PlayerManagement({
  players,
  setPlayers,
  resetSession,
}: PlayerManagementProps) {
  const [newPlayerName, setNewPlayerName] = useState('');

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.find(p => p.name === newPlayerName.trim())) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        status: 'active',
        totalGames: 0,
        wins: 0,
        losses: 0,
        pointsDifferential: 0,
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const togglePlayerStatus = (playerId: string) => {
    setPlayers(players.map(p =>
      p.id === playerId
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Player Management</h2>

      {/* Add Player Form */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter player name"
            className="input-glass flex-1 px-4 py-2 rounded-lg text-white placeholder-white/60 focus:outline-none"
          />
          <button
            onClick={addPlayer}
            disabled={!newPlayerName.trim()}
            className="btn-glass px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Player
          </button>
        </div>
      </div>

      {/* Player Count and Requirements */}
      <div className="mb-4 p-3 rounded-lg bg-white/10">
        <p className="text-white/80 text-sm">
          Total Players: <span className="font-bold text-white">{players.length}</span>
        </p>
        <p className="text-white/60 text-xs mt-1">
          Minimum 4 players required to generate matches
        </p>
      </div>

      {/* Player List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {players.length === 0 ? (
          <p className="text-white/60 text-center py-8">
            No players added yet. Add players to get started!
          </p>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className={`glass rounded-lg p-3 flex items-center justify-between ${
                player.status === 'active' ? 'player-active' : 'player-inactive'
              }`}
            >
              <div className="flex-1">
                <h3 className="font-medium text-white">{player.name}</h3>
                <div className="flex gap-4 mt-1">
                  <span className="text-xs text-white/70">
                    Games: {player.totalGames}
                  </span>
                  <span className="text-xs text-white/70">
                    W/L: {player.wins}/{player.losses}
                  </span>
                  <span className="text-xs text-white/70">
                    K/D: {player.pointsDifferential > 0 ? '+' : ''}{player.pointsDifferential}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePlayerStatus(player.id)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    player.status === 'active'
                      ? 'bg-green-500/30 text-green-300 border border-green-400/30'
                      : 'bg-gray-500/30 text-gray-300 border border-gray-400/30'
                  }`}
                >
                  {player.status}
                </button>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reset Session Button */}
      {players.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <button
            onClick={resetSession}
            className="w-full btn-glass bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 py-2 rounded-lg font-medium"
          >
            Reset Session
          </button>
        </div>
      )}
    </div>
  );
}