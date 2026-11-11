import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, Cpu, CheckCircle, X, Shield, Lock, FileText } from 'lucide-react';
import { SYSTEM_METRICS } from '../data/ecosystemData';

interface CallToActionFooterProps {
  onOpenDiary?: () => void;
}

export const CallToActionFooter: React.FC<CallToActionFooterProps> = ({ onOpenDiary }) => {
  const [timestamp, setTimestamp] = useState<string>('');
  const [latency, setLatency] = useState<number>(42);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'PRIVACY' | 'TERMS' | 'SECURITY' | null>(null);

  const commandText = 'npx daf-engine deploy --pipeline all --key $DAF_API_KEY';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };

    updateTime();
    const interval = setInterval(() => {
      updateTime();
      setLatency(Math.floor(39 + Math.random() * 12));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden bg-dot-pattern">
      {/* Glow Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Terminal Style High-Impact CTA */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/10 schematic-border bg-black/80 relative mb-20 overflow-hidden shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-[#00FFA3] mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL DEPLOYMENT READY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Deploy your first autonomous pipeline today.
              </h2>

              <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                Trigger headless content syndication, automated digital asset creation, and micro-SaaS endpoints with zero-config overhead.
              </p>
            </div>

            {/* Terminal Command Box */}
            <div className="w-full lg:w-auto">
              <div className="bg-[#0a0a0a] border border-white/15 rounded-xl p-4 font-mono text-xs text-neutral-200 relative group">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2 pb-2 border-b border-white/5">
                  <span>CLI DEPLOYMENT</span>
                  <span className="text-[#00FFA3]">BASH / ZSH</span>
                </div>

                <div className="flex items-center gap-3 pr-12">
                  <span className="text-[#00FFA3] font-bold">&gt;</span>
                  <code className="text-white text-xs sm:text-sm">{commandText}</code>
                </div>

                <button
                  onClick={handleCopyCommand}
                  className="absolute top-4 right-3 p-2 rounded bg-white/10 hover:bg-[#00FFA3] hover:text-black transition-all text-neutral-300 font-bold"
                  title="Copy Command"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Nothing Tech Style Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 font-mono text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#00FFA3]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-wider">D1G1TAL ASSET FACTORY</span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-md">
              High-performance programmatic digital asset engine, Hugo static newsletter pipeline, and micro-SaaS agent APIs built for zero-capital execution.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#00FFA3] pulse-emerald" />
              <span>{SYSTEM_METRICS.status}</span>
            </div>
          </div>

          {/* Core Modules Links */}
          <div className="space-y-2">
            <div className="text-white font-bold mb-3">// REPOSITORIES</div>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#ecosystem" className="hover:text-white transition-colors">DAF Digital Assets</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">NAE Hugo Portfolios</a></li>
              <li><a href="#live-apis" className="hover:text-white transition-colors">MSAI Agent Endpoints</a></li>
              <li><a href="#live-apis" className="hover:text-white transition-colors">AGAMS Air-Gapped Maintenance</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Engineering Schematic Flow</a></li>
            </ul>
          </div>

          {/* System Telemetry Metadata */}
          <div className="space-y-2">
            <div className="text-white font-bold mb-3">// TELEMETRY LOGS</div>
            <div className="space-y-1.5 text-neutral-400 text-[11px]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SYSTEMS ARCHITECT:</span>
                <button 
                  onClick={onOpenDiary} 
                  className="text-[#00FFA3] font-bold cursor-default select-none"
                >
                  Ted Nadres
                </button>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SYSTEM VERSION:</span>
                <span className="text-white">{SYSTEM_METRICS.version}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>PING LATENCY:</span>
                <span className="text-[#00FFA3]">{latency}ms</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SYS TIME:</span>
                <span className="text-neutral-300">{timestamp || '2026-08-22 15:20 UTC'}</span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME SLA:</span>
                <span className="text-white">{SYSTEM_METRICS.uptimePercentage}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Functional Policy Modals */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            © 2026 D1G1TAL ASSET FACTORY // SYSTEMS ARCHITECT: <button onClick={onOpenDiary} className="text-neutral-400 cursor-default select-none">TED NADRES</button>. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveModal('PRIVACY')} className="hover:text-neutral-300 transition-colors">
              PRIVACY MATRIX
            </button>
            <span>/</span>
            <button onClick={() => setActiveModal('TERMS')} className="hover:text-neutral-300 transition-colors">
              TERMS OF EXECUTION
            </button>
            <span>/</span>
            <button onClick={() => setActiveModal('SECURITY')} className="hover:text-neutral-300 transition-colors">
              SECURITY SLA
            </button>
          </div>
        </div>

      </div>

      {/* Policy & Security Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0b0b] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl schematic-border"
            >
              <div className="bg-black px-6 py-4 border-b border-white/10 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-[#00FFA3]">
                  {activeModal === 'PRIVACY' && <Lock className="w-4 h-4" />}
                  {activeModal === 'TERMS' && <FileText className="w-4 h-4" />}
                  {activeModal === 'SECURITY' && <Shield className="w-4 h-4" />}
                  <span className="font-bold text-white">{activeModal} SPECIFICATION</span>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 font-mono text-xs text-neutral-300 space-y-3">
                {activeModal === 'PRIVACY' && (
                  <>
                    <p className="text-white font-bold">// PRIVACY MATRIX SPEC</p>
                    <p>All payload processing across DAF, NAE, and MSAI engines occurs in ephemerally isolated worker environments. Zero persistent storage of API credentials or customer raw inputs.</p>
                  </>
                )}
                {activeModal === 'TERMS' && (
                  <>
                    <p className="text-white font-bold">// TERMS OF HEADLESS EXECUTION</p>
                    <p>Autonomous pipelines are provided with 99.98% SLA guarantees. Headless runners execute via strictly rate-limited proxy matrices and HMAC authorization signatures.</p>
                  </>
                )}
                {activeModal === 'SECURITY' && (
                  <>
                    <p className="text-white font-bold">// SECURITY SLA & ZERO TRUST ARCHITECTURE</p>
                    <p>End-to-end TLS 1.3 encryption, automatic secret rotation via GitHub Actions secret vaults, and real-time anomaly detection across all microservice endpoints.</p>
                  </>
                )}
              </div>

              <div className="bg-black px-6 py-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-1.5 bg-white text-black font-bold rounded text-xs hover:bg-neutral-200"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
