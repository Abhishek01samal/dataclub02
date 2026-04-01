const FooterSection = () => {
  return (
    <footer className="py-8 px-5 md:px-10 border-t border-[hsl(120,40%,25%)]" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.2em] uppercase">
          © 2026 Data Club
        </p>
        <div className="flex gap-6 font-mono text-[10px] text-[hsl(120,20%,60%)] tracking-[0.1em] uppercase">
          <a href="#" className="hover:text-[hsl(120,70%,55%)] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[hsl(120,70%,55%)] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[hsl(120,70%,55%)] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;