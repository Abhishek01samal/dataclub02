import React, { useEffect, useMemo, useRef, useState } from 'react';
import Hyperspeed, { hyperspeedPresets } from '../../components/Hyperspeed';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../clubreg/styles.css';

gsap.registerPlugin(ScrollTrigger);

function ClubRegPage() {
  const [introMode, setIntroMode] = useState('playing'); // 'playing', 'fading', 'ended'
  const [tunnelDepth, setTunnelDepth] = useState('infinite');
<<<<<<< HEAD
  const [isHyperspeedVisible, setIsHyperspeedVisible] = useState(false);
=======
>>>>>>> 3f74d5f5ef66db43085a4cc5131f61d12be9fcfa
  const pageWrapperRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // 1. Cinematic 8-second intro on desktop, 2-second on mobile
    const introDuration = isMobile ? 2000 : 8000;
    const introTimer = setTimeout(() => {
      setIntroMode('fading');
      setTunnelDepth('normal');
<<<<<<< HEAD
      setIsHyperspeedVisible(true);
=======
>>>>>>> 3f74d5f5ef66db43085a4cc5131f61d12be9fcfa
      
      // 2. Transition duration for the reveal
      const fadeDuration = isMobile ? 800 : 1500;
      const fadeTimer = setTimeout(() => {
        setIntroMode('ended');
      }, fadeDuration); 
      return () => clearTimeout(fadeTimer);
    }, introDuration); 

    return () => clearTimeout(introTimer);
  }, [isMobile]);

  useEffect(() => {
    if (introMode !== 'ended') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
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

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', handleFilter);
    });

    // REMOVED FADE OUT EFFECT AT THE END FOR USER PERSISTENCE

    return () => {
      observer.disconnect();
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.removeEventListener('click', handleFilter);
      });
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [introMode]);

  const effectOptions = useMemo(() => {
    const base = hyperspeedPresets.one;
    if (tunnelDepth === 'infinite') {
      return { 
        ...base, 
        length: 8000,
        speedUp: 300,
        movingAwaySpeed: [500, 800],
        movingCloserSpeed: [-1000, -1500]
      };
    }
    return base;
  }, [tunnelDepth]);

  return (
    <div className={`clubreg-page ${introMode}`}>
      {/* Background - Always active */}
<<<<<<< HEAD
      <div className={`hyperspeed-bg ${(isMobile && isHyperspeedVisible) ? 'fade-in' : (isMobile ? 'hidden-bg' : '')}`}>
=======
      <div className="hyperspeed-bg">
>>>>>>> 3f74d5f5ef66db43085a4cc5131f61d12be9fcfa
        <Hyperspeed effectOptions={effectOptions} />
      </div>

      {/* Main Content Wrapper */}
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
              Where data meets ambition. Hackathons, workshops, and talks — curated for the curious mind.
            </p>
            <div className="hero-buttons">
              <a href="#events" className="btn-primary">Explore Events</a>
              <a href="#archive" className="btn-ghost">View Archive</a>
            </div>
          </div>

          <div className="ticker-bar">
            <div className="ticker-track">
              <div className="ticker-group">
                <span className="ticker-item mono">AI Hackathon 2026 <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">ML Workshop Series <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Data Visualization Bootcamp <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Industry Speaker Talks <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">SQL Deep Dive <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Kaggle Competition Prep <span className="ticker-diamond">◆</span></span>
              </div>
              <div className="ticker-group">
                <span className="ticker-item mono">AI Hackathon 2026 <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">ML Workshop Series <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Data Visualization Bootcamp <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Industry Speaker Talks <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">SQL Deep Dive <span className="ticker-diamond">◆</span></span>
                <span className="ticker-item mono">Kaggle Competition Prep <span className="ticker-diamond">◆</span></span>
              </div>
            </div>
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
                <button className="filter-btn">Talk</button>
              </div>

              <div className="events-grid">
                <div className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-tag mono">Hackathon</div>
                    <span className="card-status status-open">● Open</span>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-title">AI Hackathon 2026</h3>
                    <p className="event-desc mono">48-hour intensive build sprint. Solve real-world problems using machine learning and AI tools. Open to all branches.</p>
                    <div className="event-meta">
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        March 25–26, 2026
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        48 Hours · Starts 10:00 AM
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Online · Discord + Devfolio
                      </div>
                    </div>
                    <div className="event-footer">
                      <span className="event-footer-text mono">Prize Pool ₹50,000</span>
                      <div className="event-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-tag mono">Workshop</div>
                    <span className="card-status status-open">● Open</span>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-title">LLM Fine-Tuning Bootcamp</h3>
                    <p className="event-desc mono">Hands-on session on fine-tuning large language models using LoRA and QLoRA. Bring your laptop.</p>
                    <div className="event-meta">
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        April 5, 2026
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        3:00 PM – 6:00 PM IST
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Offline · CS Seminar Hall
                      </div>
                    </div>
                    <div className="event-footer">
                      <span className="event-footer-text mono">Seats 40 Left</span>
                      <div className="event-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-tag mono">Talk</div>
                    <span className="card-status status-soon">● Closing Soon</span>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-title">ML at Scale: Industry Insights</h3>
                    <p className="event-desc mono">Senior ML engineers from Google DeepMind and Flipkart share how they build and deploy ML systems at scale.</p>
                    <div className="event-meta">
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        April 12, 2026
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        5:00 PM – 7:30 PM IST
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Online · Google Meet
                      </div>
                    </div>
                    <div className="event-footer">
                      <span className="event-footer-text mono">Entry Free</span>
                      <div className="event-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-tag mono">Workshop</div>
                    <span className="card-status status-closed">Closed</span>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-title">SQL for Data Science</h3>
                    <p className="event-desc mono">Master window functions, CTEs, and query optimization for analytical workloads. Beginner-friendly.</p>
                    <div className="event-meta">
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        April 20, 2026
                      </div>
                      <div className="event-meta-item mono">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Offline · Data Lab
                      </div>
                    </div>
                    <div className="event-footer">
                      <span className="event-footer-text mono">Registration Closed</span>
                      <div className="event-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <p className="section-label">§ 003 — Announcements</p>
              <div className="announcements-list">
                <div className="announcement-item">
                  <div className="announcement-dot dot-orange"></div>
                  <div className="announcement-content">
                    <div className="announcement-label mono">Deadline Alert</div>
                    <div className="announcement-text">AI Hackathon team registration closes March 23, 11:59 PM IST</div>
                    <div className="announcement-time mono">2 days ago</div>
                  </div>
                </div>
                <div className="announcement-item">
                  <div className="announcement-dot dot-white"></div>
                  <div className="announcement-content">
                    <div className="announcement-label mono">Results</div>
                    <div className="announcement-text">Data Hack 2025 winners announced — Team Alpha takes the crown</div>
                    <div className="announcement-time mono">5 days ago</div>
                  </div>
                </div>
                <div className="announcement-item">
                  <div className="announcement-dot dot-green"></div>
                  <div className="announcement-content">
                    <div className="announcement-label mono">New Event</div>
                    <div className="announcement-text">LLM Fine-Tuning Bootcamp registration now open — limited seats</div>
                    <div className="announcement-time mono">1 week ago</div>
                  </div>
                </div>
                <div className="announcement-item">
                  <div className="announcement-dot dot-white"></div>
                  <div className="announcement-content">
                    <div className="announcement-label mono">Certificate</div>
                    <div className="announcement-text">Certificates for ML Workshop Series (March batch) have been sent to registered emails</div>
                    <div className="announcement-time mono">2 weeks ago</div>
                  </div>
                </div>
              </div>
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
                    <div className="archive-stats">
                      <div className="archive-stat mono"><strong>500+</strong>Participants</div>
                      <div className="archive-stat mono"><strong>Team Alpha</strong>Winners</div>
                      <div className="archive-stat mono"><strong>₹30K</strong>Prizes</div>
                    </div>
                  </div>
                </div>
                <div className="archive-card">
                  <div className="archive-card-header mono">VISION HACK 2024</div>
                  <div className="archive-card-body">
                    <div className="archive-year mono">2024</div>
                    <div className="archive-title">Vision Hack 2024</div>
                    <div className="archive-stats">
                      <div className="archive-stat mono"><strong>320+</strong>Participants</div>
                      <div className="archive-stat mono"><strong>Team NeuralX</strong>Winners</div>
                      <div className="archive-stat mono"><strong>₹20K</strong>Prizes</div>
                    </div>
                  </div>
                </div>
                <div className="archive-card">
                  <div className="archive-card-header mono">ML BOOTCAMP</div>
                  <div className="archive-card-body">
                    <div className="archive-year mono">2024</div>
                    <div className="archive-title">ML Bootcamp Series</div>
                    <div className="archive-stats">
                      <div className="archive-stat mono"><strong>180</strong>Attendees</div>
                      <div className="archive-stat mono"><strong>6</strong>Sessions</div>
                      <div className="archive-stat mono"><strong>92%</strong>Rated 5★</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <p className="section-label">§ 005 — Leaderboard</p>
              <h2 className="section-title">Hall of Fame</h2>
              <div className="leaderboard">
                <div className="leaderboard-header">
                  <div className="lb-rank mono">#</div>
                  <div className="lb-team mono">Team</div>
                  <div className="lb-event mono">Event</div>
                  <div className="lb-score mono">Score</div>
                </div>
                <div className="leaderboard-row">
                  <div className="lb-rank mono gold">01</div>
                  <div className="lb-team">Team Alpha</div>
                  <div className="lb-event mono">Data Hack 2025</div>
                  <div className="lb-score mono">9,840</div>
                </div>
                <div className="leaderboard-row">
                  <div className="lb-rank mono silver">02</div>
                  <div className="lb-team">NeuralX</div>
                  <div className="lb-event mono">Vision Hack 2024</div>
                  <div className="lb-score mono">9,120</div>
                </div>
                <div className="leaderboard-row">
                  <div className="lb-rank mono bronze">03</div>
                  <div className="lb-team">DataDrifters</div>
                  <div className="lb-event mono">Data Hack 2025</div>
                  <div className="lb-score mono">8,750</div>
                </div>
                <div className="leaderboard-row">
                  <div className="lb-rank mono">04</div>
                  <div className="lb-team">ByteForge</div>
                  <div className="lb-event mono">Vision Hack 2024</div>
                  <div className="lb-score mono">8,430</div>
                </div>
                <div className="leaderboard-row">
                  <div className="lb-rank mono">05</div>
                  <div className="lb-team">MLMavericks</div>
                  <div className="lb-event mono">Data Hack 2025</div>
                  <div className="lb-score mono">8,090</div>
                </div>
              </div>
            </section>

            <section className="section" id="speakers">
              <p className="section-label">§ 006 — Speakers & Mentors</p>
              <h2 className="section-title">The Minds Behind It</h2>
              <div className="speakers-grid">
                <div className="speaker-card">
                  <div className="speaker-avatar mono">RK</div>
                  <div className="speaker-name">Rohit Krishnan</div>
                  <div className="speaker-role mono">Senior ML Engineer</div>
                  <div className="speaker-company mono">Google DeepMind</div>
                </div>
                <div className="speaker-card">
                  <div className="speaker-avatar mono">AP</div>
                  <div className="speaker-name">Ananya Patel</div>
                  <div className="speaker-role mono">Data Scientist</div>
                  <div className="speaker-company mono">Flipkart</div>
                </div>
                <div className="speaker-card">
                  <div className="speaker-avatar mono">SM</div>
                  <div className="speaker-name">Siddharth Mehta</div>
                  <div className="speaker-role mono">AI Research Lead</div>
                  <div className="speaker-company mono">Microsoft Research</div>
                </div>
                <div className="speaker-card">
                  <div className="speaker-avatar mono">PG</div>
                  <div className="speaker-name">Priya Gupta</div>
                  <div className="speaker-role mono">MLOps Engineer</div>
                  <div className="speaker-company mono">Swiggy</div>
                </div>
              </div>
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
                  <a href="#" className="contact-link mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    @DataClub_Official
                  </a>
                  <a href="#" className="contact-link mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Join Discord Server
                  </a>
                  <a href="#" className="contact-link mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    WhatsApp Community
                  </a>
                </div>
                <div className="contact-form-wrapper">
                  <h3 className="contact-heading">Quick Message</h3>
                  <p className="contact-form-desc mono">Questions about events, sponsorships, or collaborations? We reply within 24 hours.</p>
                  <div className="form-group">
                    <label className="form-label mono">Your Name</label>
                    <input type="text" className="form-input mono" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label mono">Email</label>
                    <input type="email" className="form-input mono" placeholder="Email" />
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
              <span className="footer-tagline mono">Built with curiosity. Powered by data.</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubRegPage;
