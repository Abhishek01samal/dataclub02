const archiveEvents = [
  { id: 1, title: 'Winter CodeFest', type: 'Hackathon', participants: 120, date: 'Jan 2026' },
  { id: 2, title: 'SQL Deep Dive', type: 'Workshop', participants: 45, date: 'Feb 2026' },
  { id: 3, title: 'ML Ops Masterclass', type: 'Talk', participants: 80, date: 'Mar 2026' },
];

const ArchiveSection = () => {
  return (
    <section id="archive" className="py-20 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="mb-12">
        <span className="section-label">Archive</span>
        <h2 className="text-4xl font-bold mt-4" style={{ color: 'hsl(var(--foreground))' }}>Past Events</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {archiveEvents.map((event) => (
          <div key={event.id} className="reveal p-6 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)]" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
            <p className="font-mono text-[9px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase mb-2">{event.type}</p>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>{event.title}</h3>
            <div className="flex justify-between font-mono text-[10px] text-[hsl(120,20%,60%)]">
              <span>{event.participants} participants</span>
              <span>{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArchiveSection;