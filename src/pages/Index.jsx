import { useEffect, useRef } from 'react';
import EventsSection from '../components/sections/EventsSection';
import AnnouncementsSection from '../components/sections/AnnouncementsSection';
import ArchiveSection from '../components/sections/ArchiveSection';
import LeaderboardSection from '../components/sections/LeaderboardSection';
import SpeakersSection from '../components/sections/SpeakersSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';

function Index() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = scrollRef.current;
    if (el) {
      const children = el.querySelectorAll('.reveal');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="min-h-screen">

      <div className="relative">
        <div className="absolute inset-0 bg-[hsl(120,60%,8%,0.85)] backdrop-blur-sm pointer-events-none" style={{ backgroundColor: 'hsl(var(--background)/0.85)' }} />
        <div className="relative">
          <EventsSection />
          <AnnouncementsSection />
          <ArchiveSection />
          <LeaderboardSection />
          <SpeakersSection />
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}

export default Index;