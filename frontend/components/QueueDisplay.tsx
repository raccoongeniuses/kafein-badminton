import { QueueItem } from '../types';

interface QueueDisplayProps {
  queue: QueueItem[];
}

export default function QueueDisplay({ queue }: QueueDisplayProps) {
  if (queue.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-6">Queue</h2>
        <p className="text-white/60 text-center py-8">
          No players in queue
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Queue</h2>

      <div className="space-y-4">
        {queue.map((item, index) => (
          <div key={item.id} className="glass-dark court-queue rounded-xl p-4">
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-bold text-lg">
                  Court {item.court}
                </span>
                <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full border border-purple-400/30">
                  Round {item.round}
                </span>
                {index === 0 && (
                  <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded">
                    Next
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 */}
              <div className="text-center">
                <div className="text-xs text-white/60 mb-2">Team 1</div>
                <div className="space-y-1">
                  <div className="text-white text-sm font-medium">
                    {item.team1[0].name}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {item.team1[1].name}
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="text-center">
                <div className="text-xs text-white/60 mb-2">Team 2</div>
                <div className="space-y-1">
                  <div className="text-white text-sm font-medium">
                    {item.team2[0].name}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {item.team2[1].name}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <span className="text-white/40 text-xs">
                Position #{index + 1} in queue
              </span>
            </div>
          </div>
        ))}
      </div>

      {queue.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-blue-500/20 border border-blue-400/30">
          <p className="text-blue-300 text-sm text-center">
            Queue moves up when current matches complete
          </p>
        </div>
      )}
    </div>
  );
}