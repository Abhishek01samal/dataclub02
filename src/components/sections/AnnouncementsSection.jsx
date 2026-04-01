const announcements = [
  { id: 1, type: 'info', title: 'AI Build Challenge registrations now open', date: 'Mar 15, 2026' },
  { id: 2, type: 'success', title: 'Winter CodeFest winners announced', date: 'Jan 20, 2026' },
  { id: 3, type: 'warning', title: 'Server maintenance scheduled for Sunday', date: 'Mar 10, 2026' },
  { id: 4, type: 'info', title: 'New workshop: LLM Fine-tuning', date: 'Mar 5, 2026' },
  { id: 5, type: 'success', title: 'Hackathon sponsors confirmed', date: 'Feb 28, 2026' },
];

const typeColors = {
  info: 'bg-[hsl(120,70%,55%)]',
  success: 'bg-green-500/60',
  warning: 'bg-yellow-500/60',
};

const AnnouncementsSection = () => {
  return (
    <section className="py-20 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="mb-12">
        <span className="section-label">Announcements</span>
        <h2 className="text-4xl font-bold mt-4" style={{ color: 'hsl(var(--foreground))' }}>Latest Updates</h2>
      </div>
      <div className="space-y-4 max-w-2xl">
        {announcements.map((ann) => (
          <div key={ann.id} className="reveal flex items-start gap-4 p-4 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] hover:border-[hsl(120,50%,40%)] transition-colors group cursor-pointer" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
            <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[ann.type]}`} style={{ backgroundColor: ann.type === 'info' ? 'hsl(120,70%,55%)' : ann.type === 'success' ? '#22c55e' : '#eab308' }} />
            <div className="flex-1">
              <p className="font-mono text-[11px] text-[hsl(120,20%,60%)] mb-1">{ann.date}</p>
              <p className="text-sm group-hover:text-[hsl(120,70%,55%)] transition-colors" style={{ color: 'hsl(var(--foreground))' }}>{ann.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsSection;