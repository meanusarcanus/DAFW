import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap, Activity, Server, RefreshCw, Cpu, Layers } from 'lucide-react';

interface HeroProps {
  onOpenDiary?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDiary }) => {
  const [activeNodes, setActiveNodes] = useState<number[]>([1, 4, 9, 12, 17, 21]);
  const [pingSpeed, setPingSpeed] = useState<number>(42);
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'WORKERS' | 'LATENCY'>('TELEMETRY');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);

  // Dynamic telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = Math.floor(Math.random() * 24);
      setActiveNodes(prev => {
        const next = [...prev, randomNode].slice(-6);
        return next;
      });
      setPingSpeed(Math.floor(38 + Math.random() * 14));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const toggleNode = (idx: number) => {
    if (activeNodes.includes(idx)) {
      setActiveNodes(activeNodes.filter(n => n !== idx));
    } else {
      setActiveNodes([...activeNodes, idx]);
    }
    setSelectedNodeInfo(`NODE-${String(idx + 1).padStart(2, '0')}: HEADLESS RUNNER ACTIVE [PING ${Math.floor(25 + Math.random() * 20)}ms]`);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-dot-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-white/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Header Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center"
        >
          {/* Version & Badge */}
          <button
            onClick={onOpenDiary}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-8 backdrop-blur-md cursor-default select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
            <span className="text-white font-medium">DAF CORE MATRIX</span>
            <span className="text-neutral-500">//</span>
            <span className="text-[#00FFA3]">SYSTEMS ARCHITECT: TED NADRES</span>
          </button>

          {/* Apple Style Bold High-Contrast Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
            Complex Infrastructure.<br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              One Headless Execution.
            </span>
          </h1>

          {/* Monospace Nothing Tech Style Subtitle */}
          <p className="font-mono text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed mb-10">
            Autonomous agent engines, headless micro-SaaS endpoints, and programmatic data syndication pipelines built for zero-friction scale.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#ecosystem"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#live-apis"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#00FFA3]/60 hover:text-[#00FFA3] transition-all flex items-center justify-center gap-2 backdrop-blur-md group"
            >
              <Terminal className="w-4 h-4 text-[#00FFA3]" />
              <span>View Live Endpoints</span>
            </a>
          </div>
        </motion.div>

        {/* Dynamic Interactive Dot-Matrix Telemetry Panel (Nothing Tech x Dyson Schematic) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 glass-card rounded-2xl p-4 sm:p-6 border border-white/10 relative schematic-border overflow-hidden"
        >
          {/* Top Schematic Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00FFA3]" />
              <span className="text-white font-bold tracking-wider">ENGINE_TELEMETRY // RACK-01</span>
              <span className="text-neutral-600">|</span>
              <button
                onClick={onOpenDiary}
                className="text-[#00FFA3] font-mono cursor-default select-none"
              >
                SYSTEMS ARCHITECT: TED NADRES
              </button>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400">STATE: NOMINAL</span>
            </div>

            <div className="flex items-center gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
              {(['TELEMETRY', 'WORKERS', 'LATENCY'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === tab
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout: Dot Matrix Visual + Telemetry Readouts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            
            {/* Left 7 Columns: Dot Matrix Active Node Grid */}
            <div className="lg:col-span-7 bg-black/80 rounded-xl p-4 border border-white/10 flex flex-col justify-between relative min-h-[260px]">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-neutral-300">// AGENT WORKER NODES (24 ACTIVE - CLICK NODE TO TEST)</span>
                <span className="text-[#00FFA3] flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> PING: {pingSpeed}ms
                </span>
              </div>

              {/* 24-Node Interactive Dot Matrix Display */}
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 my-auto py-2">
                {Array.from({ length: 24 }).map((_, idx) => {
                  const isActive = activeNodes.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleNode(idx)}
                      title={`Click to toggle Node #${idx + 1}`}
                      className={`relative aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-[#00FFA3] bg-[#00FFA3]/15 text-[#00FFA3] shadow-[0_0_12px_rgba(0,255,163,0.3)] scale-105'
                          : 'border-white/10 bg-white/5 text-neutral-600 hover:border-white/30'
                      }`}
                    >
                      <span className="font-mono text-[10px] font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          isActive ? 'bg-[#00FFA3]' : 'bg-neutral-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5">
                <span className="text-white truncate">
                  {selectedNodeInfo || 'PROTOCOL: HTTP/2 HEADLESS'}
                </span>
                <span className="text-[#00FFA3] shrink-0 ml-2">PACKETS: SYNDICATED</span>
              </div>
            </div>

            {/* Right 5 Columns: Dynamic View Based on Active Tab */}
            <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs">
              
              {activeTab === 'TELEMETRY' && (
                <>
                  <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-[#00FFA3]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[10px]">AVG SYSTEM LATENCY</div>
                        <div className="text-white text-base font-bold">{pingSpeed}ms</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      OPTIMAL
                    </span>
                  </div>

                  <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 text-white">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[10px]">REGISTERED PORTFOLIOS</div>
                        <div className="text-white text-base font-bold">10 Micro-Niches</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded">
                      NAE HUGO
                    </span>
                  </div>

                  <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-[#00FFA3]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-neutral-400 text-[10px]">STOREFRONT HANDSHAKE</div>
                        <div className="text-white text-base font-bold">Gumroad API v2</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      READY
                    </span>
                  </div>
                </>
              )}

              {activeTab === 'WORKERS' && (
                <div className="bg-black/70 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#00FFA3]" /> AGENT WORKERS MATRIX
                    </span>
                    <span className="text-[#00FFA3] text-[10px]">24 / 24 READY</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span>DAF Asset Generation Workers:</span>
                      <span className="text-white font-bold">8 Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NAE Hugo Multi-Agent Workers:</span>
                      <span className="text-white font-bold">10 Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MSAI Scraper & API Workers:</span>
                      <span className="text-white font-bold">6 Active</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400">
                    STATUS: ALL WORKERS NOMINAL (0 QUEUED)
                  </div>
                </div>
              )}

              {activeTab === 'LATENCY' && (
                <div className="bg-black/70 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#00FFA3]" /> LATENCY DISTRIBUTION
                    </span>
                    <span className="text-[#00FFA3] text-[10px]">&lt;120ms TARGET</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div>
                      <div className="flex justify-between text-neutral-400 mb-1">
                        <span>ReportLab PDF Render:</span>
                        <span className="text-white">1.24s</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00FFA3] h-full w-[45%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-neutral-400 mb-1">
                        <span>FastAPI Sentiment Agent:</span>
                        <span className="text-white">78ms</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00FFA3] h-full w-[15%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-neutral-400 mb-1">
                        <span>Gumroad Storefront Sync:</span>
                        <span className="text-white">184ms</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00FFA3] h-full w-[25%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
