const leaderboard = [
  { rank: 1, team: 'Neural Ninjas', score: 2450, change: 'up' },
  { rank: 2, team: 'Data Drifters', score: 2180, change: 'up' },
  { rank: 3, team: 'Code Crushers', score: 1920, change: 'down' },
  { rank: 4, team: 'Algo Warriors', score: 1750, change: 'up' },
  { rank: 5, team: 'Byte Builders', score: 1600, change: 'same' },
];

const medalColors = {
  1: 'text-yellow-400',
  2: 'text-gray-300',
  3: 'text-amber-600',
};

const LeaderboardSection = () => {
  return (
    <section className="py-20 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="mb-12">
        <span className="section-label">Leaderboard</span>
        <h2 className="text-4xl font-bold mt-4" style={{ color: 'hsl(var(--foreground))' }}>Team Rankings</h2>
      </div>
      <div className="max-w-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
              <th className="font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase text-left py-3">Rank</th>
              <th className="font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase text-left py-3">Team</th>
              <th className="font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase text-right py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team) => (
              <tr key={team.rank} className="border-b border-[hsl(120,40%,25%)] hover:bg-[hsl(120,50%,12%)] transition-colors group" style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'transparent' }}>
                <td className={`py-4 text-2xl ${medalColors[team.rank] || ''}`} style={{ color: team.rank === 1 ? '#facc15' : team.rank === 2 ? '#d1d5db' : team.rank === 3 ? '#d97706' : 'inherit' }}>{team.rank}</td>
                <td className="py-4 font-medium group-hover:text-[hsl(120,70%,55%)] transition-colors" style={{ color: 'hsl(var(--foreground))' }}>{team.team}</td>
                <td className="py-4 font-mono text-right" style={{ color: 'hsl(var(--foreground))' }}>{team.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaderboardSection;