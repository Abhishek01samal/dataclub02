import React, { useEffect, useMemo, useRef, useState } from 'react';
import Hyperspeed, { hyperspeedPresets } from '../../components/Hyperspeed';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularText from './CircularText';
import FlowingMenu from './FlowingMenu';
import '../clubreg/styles.css';

gsap.registerPlugin(ScrollTrigger);

function ClubRegPage() {
  const [introMode, setIntroMode] = useState('playing'); 
  const [tunnelDepth, setTunnelDepth] = useState('infinite');
  const [isHyperspeedVisible, setIsHyperspeedVisible] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const pageWrapperRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const members = [
    {
      name: "Suman Panda",
      initials: "SP",
      year: "2023",
      branch: "CSE",
      domain: "AI Full Stack Developer",
      role: "Core Member",
      email: "suman.panda.cse.2023@nist.edu",
      linkedin: "https://www.linkedin.com/in/suman-panda-330672236",
      github: "https://github.com/Suman-collab",
      bio: "Passionate about learning new technologies and continuously improving skills.",
      photo: "/clubmember/Suman.jpg"
    },
    {
      name: "Anupta Bisoyi",
      initials: "AB",
      year: "2023",
      branch: "CSE",
      domain: "Data Analytics",
      role: "Core Member",
      email: "anupta.bisoyi.lecse.2023@nist.edu",
      linkedin: "https://www.linkedin.com/in/anupta-bisoyi-a4a625346/",
      github: "https://github.com/4nupta",
      bio: "Passionate about data analytics, specializing in turning raw data into meaningful insights and solving problems using data-driven decisions.",
      photo: "/clubmember/Anupta Bisoyi.png"
    },
    {
      name: "Abhishek Samal",
      initials: "AS",
      year: "2024",
      branch: "CSE",
      domain: "Web Dev, AI/ML",
      role: "Core Member",
      email: "abhishek.samal.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/abhishek-samal-90a992377",
      github: "https://github.com/Abhishek01samal",
      bio: "Focused on performance optimization, scalable architecture, and writing clean, production-ready code.",
      photo: "/clubmember/ABHISHEK SAMAL.jpg"
    },
    {
      name: "Sai Kamakhya Jagmohan Palo",
      initials: "SP",
      year: "2024",
      branch: "CSE (AI/ML)",
      domain: "AI/ML",
      role: "Core Member",
      email: "saikamakhya.palo.cse-aiml.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/sai-kamakhya-jagmohan-palo-3034b232b",
      github: "https://github.com/jagmohan0107",
      bio: "Focused on building real-world projects in AI and development, with strong discipline and creative problem-solving mindset.",
      photo: "/clubmember/S.k. jagmohan Palo.png"
    },
    {
      name: "Asish Kumar Behera",
      initials: "AB",
      year: "2024",
      branch: "CSE",
      domain: "Web Dev, AI/ML",
      role: "Core Member",
      email: "asish.behera.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/asish-kumar-behera",
      github: "https://github.com/Asish-own",
      bio: "Tech enthusiast and Computer Science student, driven by curiosity and innovation. Always eager to learn, build, and grow through real-world projects.",
      photo: "/clubmember/Asish Kumar Behera.jpg"
    },
    {
      name: "Suravirani Sahu",
      initials: "SS",
      year: "2024",
      branch: "CSE (AI & ML)",
      domain: "AI/ML",
      role: "Core Member",
      email: "suravirani.sahu.cse-aiml.2024@nist.edu",
      linkedin: "http://www.linkedin.com/in/suravi-rani-sahu-336353344",
      github: "https://github.com/suravirani0405-svg",
      bio: "Passionate about learning new technologies, exploring creative ideas, and growing consistently in tech.",
      photo: "/clubmember/Suravi Rani Sahu.jpeg"
    },
    {
      name: "Gourav Jain",
      initials: "GJ",
      year: "2024",
      branch: "CSE (AI/ML)",
      domain: "Data Science (AI/ML)",
      role: "Core Technical Member",
      email: "gourav.jain.cse-aiml.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/gourav-jain-b09926260",
      github: "https://github.com/gouravjainorissa-rgb",
      bio: "Data science enthusiast passionate about machine learning and building impactful data-driven solutions.",
      photo: "/clubmember/Gourav Jain.jpg"
    },
    {
      name: "Abhay Raj",
      initials: "AR",
      year: "2024",
      branch: "CSE",
      domain: "AI/ML",
      role: "Core Member",
      email: "abhay.raj.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/abhay-raj-729174334/",
      github: "https://github.com/AbhayRaj2005",
      bio: "Focused on practical skill-building, problem-solving, and continuous growth in technology.",
      photo: "/clubmember/ABHAY RAJ.jpg"
    },
    {
      name: "Bhargaba Maharana",
      initials: "BM",
      year: "2024",
      branch: "CSE",
      domain: "AI/ML",
      role: "Core Member",
      email: "bhargaba.maharana.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/bhargaba-maharana-43b16537b",
      github: "https://github.com/Bhargaba-M",
      bio: "Interested in data science, Python, and machine learning with strong problem-solving skills.",
      photo: "/clubmember/Bhargaba _Aryan.png"
    },
    {
      name: "Abhilasha Manjeet",
      initials: "AM",
      year: "2024",
      branch: "CSE",
      domain: "AI/ML",
      role: "Core Member",
      email: "abhilasha.manjeet.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/abhilasha-manjeet-339903243",
      github: "https://github.com/iotabhi",
      bio: "Specializing in ML-driven backends and efficient server-side development using FastAPI.",
      photo: "/clubmember/Abhilasha Manjeet.png"
    },
    {
      name: "Swayam Patnaik",
      initials: "SP",
      year: "2024",
      branch: "CSE (Data Science)",
      domain: "Data Science",
      role: "Core Member",
      email: "swayam.patnaik.cse-ds.2024@gmail.com",
      linkedin: "https://www.linkedin.com/in/swayampatnaik131",
      github: "https://github.com/patnaikswayam131",
      bio: "Believes data science requires patience and structured processes, like layering biryani.",
      photo: "/clubmember/Swayam.jpeg"
    },
    {
      name: "Smitika Panigrahi",
      initials: "SP",
      year: "2024",
      branch: "CSE",
      domain: "Data Analytics",
      role: "Core Member",
      email: "smitika.panigrahi.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/smitika-panigrahi-246900324",
      github: "https://github.com/Smitika-04-04",
      bio: "Enthusiastic about AI, ML, and building innovative solutions with strong analytical skills.",
      photo: "/clubmember/Smitika Panigrahi.png"
    },
    {
      name: "Subham Sahu",
      initials: "SS",
      year: "2024",
      branch: "CSE",
      domain: "ML",
      role: "Technical Team Member",
      email: "subham503.sahu.cse.2024@nist.edu",
      linkedin: "https://www.linkedin.com/in/subham-sahu-b4a872325",
      github: "https://github.com/Subham503",
      bio: "Passionate about ML, Python, and continuous learning through projects.",
      photo: "/clubmember/SUBHAM SAHU.jpg"
    }
  ];

  const announcementItems = [
    { link: '#', text: 'Deadline Alert: AI Hackathon 2026' },
    { link: '#', text: 'Results: Data Hack 2025 Out Now' },
    { link: '#', text: 'New Event: LLM Fine-Tuning Bootcamp' }
  ];

  const hallOfFameItems = [
    { link: '#', text: '01 Team Alpha — Data Hack Winners' },
    { link: '#', text: '02 NeuralX — Vision Hack Leaders' },
    { link: '#', text: '03 DataDrifters — Innovation Award' }
  ];

  useEffect(() => {
    const introDuration = isMobile ? 2000 : 8000;
    const introTimer = setTimeout(() => {
      setIntroMode('fading');
      setTunnelDepth('normal');
      setIsHyperspeedVisible(true);
      const fadeDuration = isMobile ? 800 : 1500;
      const fadeTimer = setTimeout(() => setIntroMode('ended'), fadeDuration); 
      return () => clearTimeout(fadeTimer);
    }, introDuration); 
    return () => clearTimeout(introTimer);
  }, [isMobile]);

  useEffect(() => {
    if (introMode !== 'ended') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const handleFilter = function(e) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const type = e.target.textContent.trim();
      document.querySelectorAll('.event-card').forEach(card => {
        const cardType = card.querySelector('.event-type-tag').textContent.trim();
        card.style.display = (type === 'All' || cardType === type) ? '' : 'none';
      });
    };
    document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', handleFilter));
    return () => {
      observer.disconnect();
      document.querySelectorAll('.filter-btn').forEach(btn => btn.removeEventListener('click', handleFilter));
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [introMode]);

  const effectOptions = useMemo(() => {
    const base = hyperspeedPresets.one;
    if (tunnelDepth === 'infinite') {
      return { 
        ...base, length: 8000, speedUp: 300, 
        movingAwaySpeed: [500, 800], movingCloserSpeed: [-1000, -1500] 
      };
    }
    return base;
  }, [tunnelDepth]);

  return (
    <div className={`clubreg-page ${introMode}`}>
      <div className={`hyperspeed-bg ${(isMobile && isHyperspeedVisible) ? 'fade-in' : (isMobile ? 'hidden-bg' : '')}`}>
        <Hyperspeed effectOptions={effectOptions} />
      </div>

      <div className="page-content-wrapper" ref={pageWrapperRef}>
        <section className="hero">
          <div className="hero-gradient-overlay"></div>
          <div className="hero-content">
            <p className="section-label">§ 001 — Welcome</p>
            <h1 className="hero-title">
              <span>BUILD</span>
              <span>THINK</span>
              <span className="hero-outline">CREATE</span>
            </h1>
            <p className="hero-subtitle mono">
              Where data meets ambition. Hackathons, workshops, and talks.
            </p>
            <div className="hero-buttons">
              <a href="#events" className="btn-primary">Explore Events</a>
              <a href="#archive" className="btn-ghost">View Archive</a>
            </div>
          </div>
          <div className="ticker-bar">
            {/* Ticker content remains same */}
          </div>
        </section>

        <div className="content-wrapper">
          <div className="content-bg"></div>
          <div className="content-inner">
            <section className="section" id="events">
              <p className="section-label">§ 002 — Upcoming Events</p>
              <h2 className="section-title">What's Next</h2>
              <div className="filter-bar">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Hackathon</button>
                <button className="filter-btn">Workshop</button>
              </div>
              <div className="events-grid">
                <div className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-tag mono">Hackathon</div>
                    <span className="card-status status-open">● Open</span>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-title">AI Hackathon 2026</h3>
                    <p className="event-desc mono">48-hour intensive build sprint.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section" id="announcements">
              <p className="section-label">§ 003 — Announcements</p>
              <FlowingMenu items={announcementItems} speed={25} marqueeBgColor="var(--primary)" marqueeTextColor="var(--primary-foreground)" />
            </section>

            <section className="section" id="archive">
              <p className="section-label">§ 004 — Archive</p>
              <h2 className="section-title">Past Events</h2>
              <div className="archive-grid">
                <div className="archive-card">
                  <div className="archive-card-header mono">DATA HACK 2025</div>
                  <div className="archive-card-body">
                    <div className="archive-year mono">2025</div>
                    <div className="archive-title">Data Hack 2025</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section" id="leaderboard">
              <p className="section-label">§ 005 — Hall of Fame</p>
              <FlowingMenu items={hallOfFameItems} speed={30} marqueeBgColor="var(--status-open)" marqueeTextColor="#000" />
            </section>

            <section className="section" id="speakers">
              <p className="section-label">§ 006 — Core Team</p>
              <h2 className="section-title">The Minds Behind It</h2>
              <div className="speakers-grid">
                {members.filter((_, idx) => !isMobile || showAllMembers || idx < 4).map((member, idx) => (
                  <div className="speaker-card" key={idx} onClick={() => setSelectedMember(member)}>
                    <div className="speaker-avatar-container">
                      <CircularText text={`${member.name.toUpperCase()}*`} spinDuration={20} onHover="speedUp" className="member-circular-text" />
                      <div className="speaker-image-wrapper">
                        <img src={member.photo} alt={member.name} className="speaker-photo" />
                      </div>
                    </div>
                    <div className="speaker-info">
                      <div className="speaker-name">{member.name}</div>
                      <div className="speaker-role mono">{member.role}</div>
                      <div className="speaker-company mono">{member.branch} • {member.year}</div>
                      <div className="speaker-socials">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn" onClick={(e) => e.stopPropagation()}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub" onClick={(e) => e.stopPropagation()}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        </a>
                        <a href={`mailto:${member.email}`} className="social-icon" title="Email" onClick={(e) => e.stopPropagation()}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </a>
                      </div>
                    </div>
                    <div className="member-more-tag mono">MORE+</div>
                  </div>
                ))}
              </div>
              {isMobile && !showAllMembers && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <button className="btn-ghost mono" onClick={() => setShowAllMembers(true)}>MORE +</button>
                </div>
              )}
            </section>

            <section className="section" id="contact">
              <p className="section-label">§ 007 — Get In Touch</p>
              <div className="contact-grid">
                <div className="contact-links">
                  <h2 className="contact-heading">Let's Connect</h2>
                  <a href="mailto:dataclub@university.edu" className="contact-link mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    dataclub@university.edu
                  </a>
                </div>
                <div className="contact-form-wrapper">
                  <h3 className="contact-heading">Quick Message</h3>
                  <div className="form-group">
                    <label className="form-label mono">Your Name</label>
                    <input type="text" className="form-input mono" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label mono">Message</label>
                    <textarea className="form-textarea mono" placeholder="Message"></textarea>
                  </div>
                  <button className="btn-primary" style={{width: '100%'}}>Send Message</button>
                </div>
              </div>
            </section>

            <footer className="site-footer">
              <span className="footer-brand mono">DATA·CLUB · 2026</span>
            </footer>
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="member-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="member-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMember(null)}>×</button>
            <div className="modal-header">
              <div className="modal-avatar-wrapper">
                <img src={selectedMember.photo} alt={selectedMember.name} className="modal-photo" />
              </div>
              <div className="modal-title-group">
                <h2 className="modal-name">{selectedMember.name}</h2>
                <p className="modal-role mono">{selectedMember.role}</p>
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-section">
                <p className="modal-label mono">§ Bio</p>
                <p className="modal-bio">{selectedMember.bio}</p>
              </div>
              <div className="modal-details-grid">
                <div className="modal-detail-item">
                  <span className="modal-label mono">Year</span>
                  <span className="modal-value mono">{selectedMember.year}</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-label mono">Branch</span>
                  <span className="modal-value mono">{selectedMember.branch}</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-label mono">Domain</span>
                  <span className="modal-value mono">{selectedMember.domain}</span>
                </div>
              </div>
              <div className="modal-footer">
                <p className="modal-label mono">§ Connections</p>
                <div className="modal-socials">
                  <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="modal-social-link mono">LinkedIn</a>
                  <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="modal-social-link mono">GitHub</a>
                  <a href={`mailto:${selectedMember.email}`} className="modal-social-link mono">Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubRegPage;
