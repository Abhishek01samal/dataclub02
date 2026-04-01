import React, { useState } from 'react'
import DisplacementImage from './DisplacementImage'

const peopleData = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior AI Researcher",
    info: "Specializing in generative adversarial networks and neural architecture search. Leading the next wave of deep learning at Data Club.",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Data Visualization Lead",
    info: "Expert in complex geospatial data mapping and high-performance WebGL visualizations. Turning massive datasets into visual stories.",
    src: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "MLOps Engineer",
    info: "Master of production-scale ML pipelines and cloud-native architecture. Ensuring zero-latency model deployment worldwide.",
    src: "https://images.unsplash.com/photo-1614850523296-e8c106ad7404?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Elena Vance",
    role: "Ethics & Safety Lead",
    info: "Focused on alignment and transparency in LLMs. Leading our efforts in building responsible and sustainable AI systems.",
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80"
  }
];

const TransitionGallery = () => {
  const [activePerson, setActivePerson] = useState(null);
  return (
    <section className="transition-gallery" style={{ 
      padding: '40rem 4rem', 
      background: '#0a0a0a',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="gallery-header" style={{ marginBottom: '8rem' }}>
        <p className="section-label" style={{ color: '#fff', opacity: 0.5 }}>§ 008 — TRANSITION</p>
        <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(4rem, 8vw, 10rem)' }}>DOOM GALLERY</h2>
      </div>

      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {peopleData.map((person) => (
          <div 
            key={person.id} 
            onClick={() => setActivePerson(person)}
            style={{ 
              height: '400px', 
              border: '1px solid #333', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <DisplacementImage src={person.src} width={800} height={400} />
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY */}
      {activePerson && (
        <div 
          onClick={() => setActivePerson(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(20px)',
            cursor: 'zoom-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1000px',
              background: '#111',
              border: '1px solid #333',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              padding: '4rem',
              cursor: 'default',
              position: 'relative',
              animation: 'modalReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div style={{ height: '600px', width: '100%' }}>
              <img src={activePerson.src} alt={activePerson.name} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid #333' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p className="mono" style={{ color: 'var(--accent)', letterSpacing: '2px', marginBottom: '1rem' }}>§ 008·PERSONNEL</p>
              <h3 style={{ fontSize: '4rem', color: '#fff', marginBottom: '1rem' }}>{activePerson.name}</h3>
              <p className="mono" style={{ opacity: 0.6, color: '#fff', marginBottom: '2rem', fontSize: '1.2rem' }}>{activePerson.role}</p>
              <div style={{ height: '1px', background: '#333', width: '100px', marginBottom: '2rem' }}></div>
              <p style={{ color: '#aaa', fontSize: '1.4rem', lineHeight: '1.8', marginBottom: '3rem' }}>{activePerson.info}</p>
              <button 
                onClick={() => setActivePerson(null)}
                className="btn-ghost" 
                style={{ width: 'fit-content' }}
              >
                Close View
              </button>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setActivePerson(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                opacity: 0.5
              }}
            >
              ✕
            </button>
          </div>

          <style>{`
            @keyframes modalReveal {
              from { opacity: 0; transform: scale(0.9) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </section>
  )
}

export default TransitionGallery
