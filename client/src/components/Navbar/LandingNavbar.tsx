
import React from 'react';

const LandingNavbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded bg-primary/10 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>school</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-text-main">ClassFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center h-9 px-4 text-sm font-semibold text-text-muted hover:text-primary transition-colors">
              About
            </button>
            <button className="flex items-center justify-center h-10 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-full shadow-soft-blue transition-all duration-200 transform active:scale-95">
              <span className="mr-2">Login</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
