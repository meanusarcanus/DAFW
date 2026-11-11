import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, Code2, FileCheck, Terminal, Sparkles, Check, Copy } from 'lucide-react';

export const EngineeringEngine: React.FC = () => {
  const [transformationTab, setTransformationTab] = useState<'RAW' | 'LLM_PROCESSED' | 'OUTPUT_SCHEMA'>('OUTPUT_SCHEMA');
  const [copied, setCopied] = useState(false);

  const rawInputSample = `{
  "trigger": "github_actions_cron",
  "niche": "urban_renter_power",
  "seed_keyword": "Smart Grid & Home Battery Backup for Renters",
  "affiliate_vendors": ["EcoFlow", "Jackery", "Anker SOLIX"],
  "format_target": "reportlab_pdf_and_hugo_markdown"
}`;

  const llmCorePromptSample = `[AGENT_3_WRITER_INJECTOR]
Task: Synthesize 1,500-word comprehensive buying guide & specs comparison.
Input Context: EcoFlow Delta 2 vs Jackery 1000 Pro.
Inject Contextual Affiliate Tokens:
- EcoFlow: https://affiliate.daf.internal/ecoflow-d2
- Jackery: https://affiliate.daf.internal/jackery-1000
Output Specs Table: HTML / Hugo Specs Archetype.`;

  const structuredOutputSample = `{
  "status": "PRODUCED_AND_DEPLOYED",
  "asset_id": "daf_hugo_99182",
  "render_engine": "Hugo Static Engine + ReportLab PDF",
  "front_matter": {
    "title": "Best Portable Power Stations for Apartment Renters (2026)",
    "date": "2026-08-22T08:00:00Z",
    "categories": ["Urban Power", "Battery Tech"],
    "affiliate_injections": 8
  },
  "syndication_endpoints": [
    "https://urbanrenterpower.github.io/posts/best-portable-power-stations",
    "s3://daf-assets/pdf/urban-power-guide-2026.pdf"
  ],
  "latency_seconds": 3.42
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#080808] relative border-y border-white/10 bg-schematic-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FFA3] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>MECHANICAL PIPELINE SCHEMATIC</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Engineering Engine
          </h2>

          <p className="font-mono text-sm text-neutral-400">
            Zero-friction translation layer converting raw triggers into structured, publication-ready assets in sub-second execution cycles.
          </p>
        </div>

        {/* Dyson Schematic Data Flow Diagrams (3 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-16">
          
          {/* Step 1: Raw Trigger Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 border border-white/10 relative schematic-border flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-400">// STAGE 01</span>
                <span className="p-2 rounded-lg bg-white/5 text-neutral-300 font-mono text-xs">
                  RAW_INPUT
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-neutral-400" />
                Raw Data / Trigger
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Webhooks, scheduled GitHub crons, or manual payload requests initiate the isolated runner environment.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>FORMAT: JSON / WEBHOOK</span>
              <span className="text-emerald-400">VALIDATED</span>
            </div>
          </motion.div>

          {/* Connector Arrow (Desktop) */}
          <div className="hidden md:flex items-center justify-center absolute left-[32%] top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/30">
            <ArrowRight className="w-6 h-6 animate-pulse text-[#00FFA3]" />
          </div>

          {/* Step 2: Isolated LLM Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card rounded-2xl p-6 border border-[#00FFA3]/30 bg-black/60 relative schematic-border flex flex-col justify-between shadow-[0_0_20px_rgba(0,255,163,0.05)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#00FFA3]">// STAGE 02</span>
                <span className="p-2 rounded-lg bg-emerald-500/10 text-[#00FFA3] font-mono text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> LLM_CORE
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00FFA3]" />
                LLM Processing Core
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Multi-agent evaluation (Gemini 2.0 / Groq) expands topics, formats ReportLab canvas visual schemas, and injects contextual monetization token links.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>AGENTS: 4 ISOLATED</span>
              <span className="text-[#00FFA3]">PROCESSED</span>
            </div>
          </motion.div>

          {/* Connector Arrow (Desktop) */}
          <div className="hidden md:flex items-center justify-center absolute left-[65%] top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/30">
            <ArrowRight className="w-6 h-6 animate-pulse text-[#00FFA3]" />
          </div>

          {/* Step 3: Structured Production Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 border border-white/10 relative schematic-border flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-400">// STAGE 03</span>
                <span className="p-2 rounded-lg bg-white/5 text-white font-mono text-xs">
                  OUTPUT_DECOUPLING
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-neutral-300" />
                Production Output
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Instant delivery of formatted PDF documents, Hugo front-matter posts, Notion workspace block trees, and Gumroad storefront payloads.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>OUTPUT: MULTI-FORMAT</span>
              <span className="text-white">SYNDICATED</span>
            </div>
          </motion.div>

        </div>

        {/* Interactive Dyson Live Transformation Card */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden schematic-border">
          
          {/* Card Top Control Header */}
          <div className="bg-black/80 px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-[#00FFA3]" />
              <span className="font-mono text-xs text-white font-bold tracking-wider">
                LIVE_TRANSFORMATION_ENGINE // EXPLODED_PREVIEW
              </span>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center gap-1.5 bg-black p-1 rounded-lg border border-white/10 font-mono text-xs">
              <button
                onClick={() => setTransformationTab('RAW')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  transformationTab === 'RAW' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                01. RAW INPUT
              </button>

              <button
                onClick={() => setTransformationTab('LLM_PROCESSED')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  transformationTab === 'LLM_PROCESSED' ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                02. AGENT PROMPT
              </button>

              <button
                onClick={() => setTransformationTab('OUTPUT_SCHEMA')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  transformationTab === 'OUTPUT_SCHEMA' ? 'bg-[#00FFA3] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                03. PRODUCTION OUTPUT
              </button>
            </div>
          </div>

          {/* Interactive Code Viewer Content */}
          <div className="p-6 bg-[#040404] relative font-mono text-xs text-neutral-300 min-h-[220px]">
            <button
              onClick={() => copyToClipboard(
                transformationTab === 'RAW' ? rawInputSample :
                transformationTab === 'LLM_PROCESSED' ? llmCorePromptSample : structuredOutputSample
              )}
              className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            <pre className="overflow-x-auto text-neutral-300 leading-relaxed font-jetbrains">
              {transformationTab === 'RAW' && rawInputSample}
              {transformationTab === 'LLM_PROCESSED' && llmCorePromptSample}
              {transformationTab === 'OUTPUT_SCHEMA' && structuredOutputSample}
            </pre>
          </div>

          <div className="bg-black/60 px-6 py-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>TRANSFORMATION LATENCY: 2.14s</span>
            <span>CHECKSUM: VERIFIED</span>
          </div>

        </div>

      </div>
    </section>
  );
};
