const speakers = [
  { initials: 'SK', name: 'Sarah Kim', role: 'ML Engineer', company: 'Google' },
  { initials: 'AP', name: 'Alex Patel', role: 'Data Scientist', company: 'Netflix' },
  { initials: 'MR', name: 'Maria Rodriguez', role: 'AI Researcher', company: 'OpenAI' },
  { initials: 'JC', name: 'James Chen', role: 'CTO', company: 'DataCorp' },
];

const SpeakersSection = () => {
  return (
    <section className="py-20 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="mb-12">
        <span className="section-label">Speakers</span>
        <h2 className="text-4xl font-bold mt-4" style={{ color: 'hsl(var(--foreground))' }}>Our Mentors</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {speakers.map((speaker, i) => (
          <div key={i} className="reveal p-6 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] text-center hover:border-[hsl(120,70%,55%,0.5)] transition-colors group" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[hsl(120,50%,12%)] flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--surface))' }}>
              <span className="font-mono text-xl font-bold text-[hsl(120,70%,55%)]" style={{ color: 'hsl(var(--primary))' }}>{speaker.initials}</span>
            </div>
            <h3 className="font-bold group-hover:text-[hsl(120,70%,55%)] transition-colors" style={{ color: 'hsl(var(--foreground))' }}>{speaker.name}</h3>
            <p className="font-mono text-[10px] text-[hsl(120,20%,60%)] mt-1">{speaker.role}</p>
            <p className="font-mono text-[9px] text-[hsl(120,70%,55%)] mt-1" style={{ color: 'hsl(var(--primary))' }}>{speaker.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;