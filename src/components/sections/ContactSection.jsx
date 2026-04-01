import { useState } from 'react';

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <span className="section-label">Contact</span>
          <h2 className="text-4xl font-bold mt-4 mb-6" style={{ color: 'hsl(var(--foreground))' }}>Get in Touch</h2>
          <p className="text-[hsl(120,20%,60%)] mb-8">Have questions or want to collaborate? We'd love to hear from you.</p>
          <div className="space-y-4 font-mono text-[11px]">
            <p className="text-[hsl(120,20%,60%)]">Email: <span style={{ color: 'hsl(var(--foreground))' }}>hello@dataclub.in</span></p>
            <p className="text-[hsl(120,20%,60%)]">Discord: <span style={{ color: 'hsl(var(--foreground))' }}>discord.gg/dataclub</span></p>
            <p className="text-[hsl(120,20%,60%)]">Location: <span style={{ color: 'hsl(var(--foreground))' }}>Bangalore, India</span></p>
          </div>
        </div>
        <div>
          {submitted ? (
            <div className="p-6 bg-[hsl(120,70%,55%,0.1)] border border-[hsl(120,70%,55%,0.3)]">
              <p className="font-mono text-[hsl(120,70%,55%)]" style={{ color: 'hsl(var(--primary))' }}>Message sent! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-3 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] font-mono text-[11px] focus:border-[hsl(120,70%,55%)] focus:outline-none"
                style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] font-mono text-[11px] focus:border-[hsl(120,70%,55%)] focus:outline-none"
                style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              />
              <textarea
                placeholder="Message"
                rows={4}
                required
                className="w-full p-3 bg-[hsl(120,50%,12%)] border border-[hsl(120,40%,25%)] font-mono text-[11px] focus:border-[hsl(120,70%,55%)] focus:outline-none resize-none"
                style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              />
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;