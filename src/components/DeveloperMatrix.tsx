import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, ShieldCheck, Zap, Activity, Clock, Server, Code2 } from 'lucide-react';
import { SYSTEM_METRICS } from '../data/ecosystemData';

export const DeveloperMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CURL' | 'PYTHON' | 'AGAMS_AIRGAP' | 'MAKE_WEBHOOK' | 'GOOGLE_SHEETS'>('CURL');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    CURL: `curl -X POST "https://api.digitalassetfactory.internal/v1/daf/build-asset" \\
  -H "Authorization: Bearer daf_live_sk_992140" \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "Autonomous Agent Infrastructure",
    "formats": ["pdf", "md", "notion_json"],
    "syndicate_storefront": true
  }'`,

    PYTHON: `import requests

url = "https://api.digitalassetfactory.internal/v1/msai/analyze-review"
headers = {
    "Authorization": "Bearer daf_live_sk_992140",
    "Content-Type": "application/json"
}
payload = {
    "review_text": "High build quality and incredible latency, but setup documentation requires 2 minutes."
}

response = requests.post(url, json=payload, headers=headers)
print("Sentiment Analysis:", response.json())`,

    AGAMS_AIRGAP: `import requests

# Local Air-Gapped FastAPI Endpoint (Offline TinyLlama + PostgreSQL)
url = "http://localhost:8000/api/hybrid-query"
payload = {
    "query": "What is the status of motor 2135MOT035?",
    "tag_id": "2135MOT035",
    "use_sql_telemetry": True,
    "use_local_faiss": True
}

response = requests.post(url, json=payload)
print("Air-Gapped Telemetry:", response.json())`,

    MAKE_WEBHOOK: `https://api.digitalassetfactory.internal/v1/webhooks/syndicate?key=daf_live_sk_992140&pipeline=nae_hugo_cron&output=make_scenario`,

    GOOGLE_SHEETS: `=IMPORTDATA("https://api.digitalassetfactory.internal/v1/metrics/csv?key=daf_live_sk_992140")`
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer-matrix" className="py-24 bg-[#080808] relative border-t border-white/10 bg-schematic-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FFA3] mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>ZERO-FRICTION INTEGRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Developer & Integration Matrix
          </h2>

          <p className="font-mono text-sm text-neutral-400">
            Plug DAF engines directly into your tech stack via cURL, native Python scripts, no-code webhooks, or spreadsheet formulas.
          </p>
        </div>

        {/* Metrics Bar (Dyson Schematic Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00FFA3]" />
              <div>
                <div className="text-neutral-400 text-[10px]">UPTIME METRIC</div>
                <div className="text-white text-base font-bold">{SYSTEM_METRICS.uptimePercentage}</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              SLA VERIFIED
            </span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#00FFA3]" />
              <div>
                <div className="text-neutral-400 text-[10px]">AVERAGE LATENCY</div>
                <div className="text-white text-base font-bold">{SYSTEM_METRICS.averageLatency}</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              HEADLESS
            </span>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-[#00FFA3]" />
              <div>
                <div className="text-neutral-400 text-[10px]">DISPATCH PROTOCOL</div>
                <div className="text-white text-base font-bold">Zero-Config Webhooks</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              AUTO-RETRY
            </span>
          </div>
        </div>

        {/* Code Block Studio (Nothing Tech x Dyson Schematic) */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden schematic-border shadow-2xl">
          
          {/* Top Bar Tabs */}
          <div className="bg-black/90 px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Terminal className="w-4 h-4 text-[#00FFA3]" />
              <span className="font-bold">// INTEGRATION_SNIPPET</span>
            </div>

            {/* Snippet Tabs */}
            <div className="flex items-center gap-1.5 bg-[#0a0a0a] p-1 rounded-lg border border-white/10 overflow-x-auto">
              {(['CURL', 'PYTHON', 'AGAMS_AIRGAP', 'MAKE_WEBHOOK', 'GOOGLE_SHEETS'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded transition-all font-mono shrink-0 ${
                    activeTab === tab
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab === 'CURL' ? 'cURL' : tab === 'PYTHON' ? 'Python' : tab === 'AGAMS_AIRGAP' ? 'AGAMS (Offline)' : tab === 'MAKE_WEBHOOK' ? 'Make.com' : 'Google Sheets'}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer Container */}
          <div className="p-6 bg-[#040404] relative font-mono text-xs text-neutral-300 min-h-[220px]">
            <button
              onClick={() => handleCopy(codeSnippets[activeTab])}
              className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-neutral-200 rounded-lg transition-all flex items-center gap-1.5 text-[11px] font-bold border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY CODE'}</span>
            </button>

            <pre className="overflow-x-auto text-neutral-200 leading-relaxed font-jetbrains pt-2">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* Footer Bar */}
          <div className="bg-black/80 px-6 py-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>AUTHENTICATION: BEARER API_KEY</span>
            <span className="text-[#00FFA3]">STATUS: READY FOR PRODUCTION</span>
          </div>

        </div>

      </div>
    </section>
  );
};
