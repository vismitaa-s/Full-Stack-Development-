import React, { useState } from 'react';

/**
 * Navbar Component
 * Preserves the sticky glassmorphic header, glowing red accents, and responsive navigation drawer.
 */
export default function Navbar({ currentPage, onNavigate, projectCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Name */}
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'landing')}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
            aria-label="CreatorIQ Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-all">
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Creator
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                  IQ
                </span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-semibold -mt-1">
                Pre-Upload AI
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'landing')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'landing'
                  ? 'text-white bg-zinc-900/80'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'features')}
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'how-it-works')}
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'about')}
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>My Projects</span>
              {projectCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-950/80 text-red-400 border border-red-800/60">
                  {projectCount}
                </span>
              )}
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>{currentPage === 'home' ? 'WORKSPACE ACTIVE' : 'GET STARTED'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col absolute top-20 left-0 w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 p-6 space-y-3 shadow-2xl z-50">
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'landing')}
            className="text-left text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-900"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'features')}
            className="text-left text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-900"
          >
            Features
          </button>
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
            className="text-left text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-900"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="text-left text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-900"
          >
            About
          </button>
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="text-left text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-900 flex items-center justify-between"
          >
            <span>My Video Projects</span>
            {projectCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800">
                {projectCount}
              </span>
            )}
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <span>{currentPage === 'home' ? 'LAUNCH WORKSPACE' : 'GET STARTED'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
