import React, { useState } from 'react';
import { Activity, Menu, X, Cpu, ChevronRight, BookOpen, Share2, Check } from 'lucide-react';
import { SYSTEM_METRICS } from '../data/ecosystemData';

interface NavbarProps {
  onOpenDiary?: () => void;
  onNavigateSection?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiary, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'D1G1TAL ASSET FACTORY // [v2.4] Infrastructure',
      text: 'Autonomous agent engines, headless micro-SaaS endpoints, and programmatic data syndication pipelines.',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // fallback
      }
    }
  };

  const navLinks = [
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Schematics', href: '#how-it-works' },
    { name: 'Live APIs', href: '#live-apis' },
    { name: 'Developer Matrix', href: '#developer-matrix' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2">
      <nav className="w-full max-w-6xl glass-pill rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Monospace Logo */}
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, '#')}
          className="flex items-center gap-2.5 group text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#00FFA3] group-hover:scale-105 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono-tech text-xs sm:text-sm font-bold tracking-wider text-white">
              D1G1TAL ASSET FACTORY
            </span>
            <span className="font-mono text-[10px] text-[#00FFA3] tracking-widest -mt-0.5">
              // [{SYSTEM_METRICS.version}]
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-white transition-colors relative py-1 hover:before:content-['>'] hover:before:mr-1 hover:before:text-[#00FFA3] cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Live Status Pill & Share Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-[#00FFA3]/10 border border-[#00FFA3]/30 hover:border-[#00FFA3] hover:bg-[#00FFA3]/20 rounded-full px-3 py-1.5 font-mono text-[11px] text-[#00FFA3] transition-all cursor-pointer shadow-xs"
            title="Share D1G1TAL ASSET FACTORY"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Share2 className="w-3.5 h-3.5 text-[#00FFA3]" />}
            <span>{copied ? 'COPIED' : 'SHARE'}</span>
          </button>
          <button
            onClick={onOpenDiary}
            className="flex items-center gap-2 bg-black/60 border border-emerald-500/30 rounded-full px-3 py-1.5 font-mono text-[11px] cursor-default select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFA3] pulse-emerald" />
            <span className="text-emerald-400 font-medium tracking-wide">
              ALL AGENTS OPERATIONAL
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col gap-4 font-mono text-sm z-50">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-neutral-400">// NAVIGATION</span>
            <div className="flex items-center gap-1.5 text-[10px] text-[#00FFA3]">
              <Activity className="w-3.5 h-3.5" />
              <span>ONLINE</span>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleLinkClick(e, link.href);
              }}
              className="flex items-center justify-between text-neutral-300 hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </a>
          ))}

          {onOpenDiary && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiary();
              }}
              className="flex items-center justify-between text-[#00FFA3] font-bold py-2 border-b border-white/5 text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Engineering Diary
              </span>
              <ChevronRight className="w-4 h-4 text-[#00FFA3]" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center justify-between text-[#00FFA3] font-mono text-sm py-2 border-b border-white/5 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {copied ? <Check className="w-4 h-4 text-[#00FFA3]" /> : <Share2 className="w-4 h-4 text-[#00FFA3]" />}
              <span>{copied ? 'Link Copied To Clipboard!' : 'Share Network'}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-[#00FFA3]" />
          </button>

          <div className="pt-2 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 rounded-full px-4 py-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00FFA3] pulse-emerald" />
              <span className="text-emerald-400">201 ACTIVE AGENTS</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
