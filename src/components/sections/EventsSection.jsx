import { useState, useEffect, memo } from 'react';
import WaveCanvas from '../WaveCanvas';

const events = [
  {
    id: 1, type: 'Hackathon', status: 'open',
    title: 'AI Build Challenge', desc: '24-hour hackathon to build AI-powered solutions.',
    date: 'Apr 5, 2026', time: '10:00 AM – 6:00 PM', location: 'Offline · CS Lab',
    footer: '₹15,000 Prize Pool', countdownDate: '2026-04-05', eyebrow: '§ 002 — Hackathon',
  },
  {
    id: 2, type: 'Workshop', status: 'open',
    title: 'LLM Fine-tuning', desc: 'Hands-on workshop on fine-tuning language models.',
    date: 'Apr 12, 2026', time: '2:00 PM – 5:00 PM', location: 'Offline · Room 301',
    footer: 'Free Entry', countdownDate: '2026-04-12', eyebrow: '§ 003 — Workshop',
  },
  {
    id: 3, type: 'Talk', status: 'soon',
    title: 'Data Science in Finance', desc: 'Industry talk on quantitative finance & ML.',
    date: 'Apr 20, 2026', time: '6:00 PM – 8:00 PM', location: 'Offline · Auditorium',
    footer: 'Open to All', countdownDate: '2026-04-20', eyebrow: '§ 004 — Talk',
  },
  {
    id: 4, type: 'Hackathon', status: 'closed',
    title: 'Winter CodeFest', desc: 'Annual winter hackathon with exciting challenges.',
    date: 'Jan 15, 2026', time: '9:00 AM – 9:00 PM', location: 'Offline · Main Hall',
    footer: '₹25,000 Prize Pool', countdownDate: null, eyebrow: '§ 001 — Hackathon',
  },
  {
    id: 5, type: 'Workshop', status: 'closed',
    title: 'SQL Deep Dive', desc: 'Advanced SQL techniques for data analysts.',
    date: 'Feb 8, 2026', time: '11:00 AM – 2:00 PM', location: 'Offline · Lab 2',
    footer: 'Free Entry', countdownDate: null, eyebrow: '§ 001.5 — Workshop',
  },
  {
    id: 6, type: 'Talk', status: 'closed',
    title: 'ML Ops Masterclass', desc: 'Deploying ML models at scale.',
    date: 'Mar 1, 2026', time: '4:00 PM – 6:00 PM', location: 'Hybrid',
    footer: 'Recording Available', countdownDate: null, eyebrow: '§ 001.75 — Talk',
  },
];

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!targetDate) return;
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown(null); return; }
      setCountdown({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
      });
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

// memo — only re-renders when the event object identity changes
const EventCard = memo(({ event }) => {
  const countdown = useCountdown(event.countdownDate);

  const statusClass = event.status === 'open' ? 'status-open' : event.status === 'soon' ? 'status-soon' : 'status-closed';
  const statusText  = event.status === 'open' ? 'Open' : event.status === 'soon' ? 'Soon' : 'Closed';

  return (
    <div className="reveal group relative bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] transition-all duration-300 hover:border-[hsl(120,70%,55%,0.5)]" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
      <div className="h-32 relative overflow-hidden bg-[hsl(120,50%,12%)]">
        <WaveCanvas className="absolute inset-0" />
        <div className="absolute top-3 left-3">
          <span className={statusClass}>{statusText}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="font-mono text-[9px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase mb-2">{event.eyebrow}</p>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[hsl(120,70%,55%)] transition-colors" style={{ color: 'hsl(var(--foreground))' }}>{event.title}</h3>
        <p className="font-mono text-[11px] text-[hsl(120,20%,60%)] mb-4 line-clamp-2">{event.desc}</p>
        <div className="space-y-2 mb-4">
          <p className="font-mono text-[10px] text-[hsl(120,20%,60%)]">
            <span style={{ color: 'hsl(var(--foreground))' }}>{event.date}</span> · {event.time}
          </p>
          <p className="font-mono text-[10px] text-[hsl(120,20%,60%)]">{event.location}</p>
        </div>
        {countdown && event.status !== 'closed' && (
          <div className="flex gap-3 font-mono text-[10px] text-[hsl(120,70%,55%)] mb-4">
            <span>{countdown.d}d</span>
            <span>{countdown.h}h</span>
            <span>{countdown.m}m</span>
          </div>
        )}
        <div className="pt-4 border-t border-[hsl(120,40%,25%)]">
          <span className="font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.1em] uppercase">{event.footer}</span>
        </div>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

const EventsSection = () => {
  const [filter, setFilter] = useState('all');

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.type.toLowerCase() === filter);

  return (
    <section id="events" className="py-20 px-5 md:px-10">
      <div className="mb-12">
        <span className="section-label">Events</span>
        <h2 className="text-4xl font-bold mt-4" style={{ color: 'hsl(var(--foreground))' }}>Upcoming Events</h2>
      </div>
      <div className="flex gap-3 mb-8 flex-wrap">
        {['all', 'hackathon', 'workshop', 'talk'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'All Events' : f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;