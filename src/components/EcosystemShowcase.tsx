import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Play, CheckCircle2, Copy, Check, Terminal, Code, X } from 'lucide-react';
import { ECOSYSTEM_PRODUCTS, ProductItem } from '../data/ecosystemData';

export const EcosystemShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DAF' | 'NAE' | 'MSAI' | 'AGAMS'>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [testResult, setTestResult] = useState<Record<string, any> | null>(null);
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredProducts = activeCategory === 'ALL'
    ? ECOSYSTEM_PRODUCTS
    : ECOSYSTEM_PRODUCTS.filter(p => p.category === activeCategory);

  const handleTestCall = (product: ProductItem) => {
    setSelectedProduct(product);
    setTesting(true);
    setTestResult(null);

    // Simulate real execution latency
    setTimeout(() => {
      setTestResult(product.sampleOutput);
      setTesting(false);
    }, 600);
  };

  const copyJSON = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ecosystem" className="py-28 bg-[#050505] relative bg-dot-pattern">
      <div id="live-apis" className="scroll-mt-32" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FFA3] mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>MODULAR AGENT MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Product Ecosystem
            </h2>
            <p className="font-mono text-sm text-neutral-400 mt-2 max-w-xl">
              Extracting core programmatic digital tools across DAF, NAE, MSAI, and AGAMS infrastructure portfolios.
            </p>
          </div>

          {/* Bento Grid Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0e0e0e] border border-white/10 rounded-full font-mono text-xs overflow-x-auto">
            {(['ALL', 'DAF', 'NAE', 'MSAI', 'AGAMS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'ALL PRODUCTS' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between relative schematic-border group"
            >
              <div>
                {/* Top Badge Accent */}
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 font-medium">
                    {product.categoryLabel}
                  </span>

                  <span className={`px-2.5 py-1 rounded font-mono font-bold ${
                    product.statusTag.includes('ACTIVE') || product.statusTag.includes('ONLINE')
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                  }`}>
                    {product.statusTag}
                  </span>
                </div>

                {/* Endpoint Signature (Nothing Style) */}
                <div className="bg-black/80 rounded-lg p-2.5 border border-white/10 font-mono text-xs text-[#00FFA3] mb-4 flex items-center justify-between">
                  <span className="truncate">{product.endpointSignature}</span>
                  <Code className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 ml-2" />
                </div>

                {/* Title & Value Prop */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FFA3] transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs font-mono text-neutral-400 leading-relaxed mb-6">
                  {product.valueProp}
                </p>

                {/* Features List */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.features.map((feat) => (
                    <span key={feat} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-500">
                  <span>LATENCY: {product.metrics.latency}</span>
                </div>

                <button
                  onClick={() => handleTestCall(product)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#00FFA3] text-white hover:text-black font-mono text-xs transition-all duration-300 flex items-center gap-1.5 font-bold"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Test Call</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Live Interactive Expander / Test Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0b0b] border border-white/20 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl schematic-border"
            >
              {/* Modal Top Bar */}
              <div className="bg-black px-6 py-4 border-b border-white/10 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-[#00FFA3]">
                  <Terminal className="w-4 h-4" />
                  <span className="font-bold text-white">{selectedProduct.endpointSignature}</span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 rounded text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto font-mono text-xs">
                <div>
                  <h4 className="text-white font-bold text-base mb-1">{selectedProduct.name}</h4>
                  <p className="text-neutral-400">{selectedProduct.description}</p>
                </div>

                {/* Request Payload */}
                <div>
                  <div className="text-neutral-400 text-[11px] mb-2">// SAMPLE REQUEST PAYLOAD</div>
                  <pre className="p-4 bg-black rounded-xl border border-white/10 text-neutral-300 overflow-x-auto">
                    {JSON.stringify(selectedProduct.sampleInput, null, 2)}
                  </pre>
                </div>

                {/* Response Payload */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-neutral-400">// LIVE RESPONSE PAYLOAD</span>
                    {testResult && (
                      <span className="text-[#00FFA3] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK ({selectedProduct.metrics.latency})
                      </span>
                    )}
                  </div>

                  {testing ? (
                    <div className="p-8 bg-black rounded-xl border border-white/10 flex items-center justify-center gap-3 text-neutral-400">
                      <div className="w-4 h-4 border-2 border-[#00FFA3] border-t-transparent rounded-full animate-spin" />
                      <span>EXECUTING HEADLESS RUNNER...</span>
                    </div>
                  ) : testResult ? (
                    <div className="relative">
                      <button
                        onClick={() => copyJSON(testResult)}
                        className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-neutral-300 rounded text-[10px] flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3 text-[#00FFA3]" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'COPIED' : 'COPY'}</span>
                      </button>
                      <pre className="p-4 bg-black rounded-xl border border-white/10 text-[#00FFA3] overflow-x-auto">
                        {JSON.stringify(testResult, null, 2)}
                      </pre>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-black px-6 py-3 border-t border-white/10 flex items-center justify-between text-neutral-400 text-[11px]">
                <span>STATUS: {selectedProduct.statusTag}</span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-1.5 bg-white text-black font-bold rounded hover:bg-neutral-200 text-xs"
                >
                  Close Expander
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
