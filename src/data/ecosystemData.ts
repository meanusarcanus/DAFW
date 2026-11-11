export interface ProductItem {
  id: string;
  category: 'DAF' | 'NAE' | 'MSAI' | 'AGAMS';
  categoryLabel: string;
  name: string;
  statusTag: string;
  endpointSignature: string;
  valueProp: string;
  description: string;
  sampleInput: Record<string, any> | string;
  sampleOutput: Record<string, any>;
  metrics: {
    latency: string;
    throughput: string;
    reliability: string;
  };
  features: string[];
}

export const ECOSYSTEM_PRODUCTS: ProductItem[] = [
  // --- DAF CORE ENGINES ---
  {
    id: 'daf-asset-builder',
    category: 'DAF',
    categoryLabel: 'D1g1tal Asset Factory',
    name: 'Autonomous Asset Builder & PDF Engine',
    statusTag: 'HEADLESS_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/daf/build-asset',
    valueProp: 'Automates research, dynamic PDF generation via ReportLab, markdown transformation, and Notion JSON bundling in <2.1s.',
    description: 'Core asset engine powering programmatic PDF generation, vector visual formatting, and structured metadata output.',
    sampleInput: {
      topic: 'Autonomous Multi-Agent Architecture',
      formats: ['pdf', 'md', 'notion_json', 'svg'],
      template: 'executive_blueprint'
    },
    sampleOutput: {
      status: 'SUCCESS',
      asset_id: 'daf_asset_9942',
      pdf_checksum: 'sha256:7f8a92b3...',
      reportlab_render_time: '1.24s',
      artifacts_generated: {
        pdf: 's3://daf-assets/blueprints/agent-arch.pdf',
        markdown: 's3://daf-assets/blueprints/agent-arch.md',
        notion_schema: '142_blocks_valid'
      },
      publishing_state: 'READY_FOR_STOREFRONT'
    },
    metrics: {
      latency: '1.24s',
      throughput: '120 docs/min',
      reliability: '99.98%'
    },
    features: ['ReportLab Canvas Engine', 'Multi-Format Bundling', 'Numbered Canvas Decorator', 'Zero-Capital Pipeline']
  },
  {
    id: 'daf-storefront-syndicate',
    category: 'DAF',
    categoryLabel: 'D1g1tal Asset Factory',
    name: 'Gumroad Storefront Syndication Engine',
    statusTag: 'HEADLESS_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/daf/gumroad-syndicate',
    valueProp: 'Programmatically packages digital products and dispatches storefront listings directly via Gumroad API.',
    description: 'Instant zero-touch commercial deployment engine linking compiled DAF asset bundles to live Gumroad storefront endpoints.',
    sampleInput: {
      asset_id: 'daf_asset_9942',
      pricing_tier: 'tier_premium',
      target_storefront: 'gumroad_api_v2'
    },
    sampleOutput: {
      status: 'PUBLISHED',
      listing_id: 'prod_daf_8810',
      live_url: 'https://gumroad.com/l/daf-multiagent-blueprint',
      currency: 'USD',
      price: 49.00,
      api_handshake_ms: 184
    },
    metrics: {
      latency: '184ms',
      throughput: 'Instant Sync',
      reliability: '100%'
    },
    features: ['Gumroad API V2 Integration', 'Automated Pricing Tiers', 'Instant Payload Delivery', 'Direct Link Generation']
  },
  {
    id: 'daf-notion-factory',
    category: 'DAF',
    categoryLabel: 'D1g1tal Asset Factory',
    name: 'Notion Workspace Schema Factory',
    statusTag: 'HEADLESS_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/daf/notion-scaffold',
    valueProp: 'Converts unstructured LLM research documents into fully relational Notion workspace schemas & block trees.',
    description: 'Creates pre-configured Notion template structures complete with linked database relations, task boards, and knowledge bases.',
    sampleInput: {
      research_payload_id: 'res_8829',
      relational_depth: 3
    },
    sampleOutput: {
      status: 'SCAFFOLDED',
      template_name: 'Executive AI Strategy Dashboard',
      notion_blocks_count: 142,
      database_relations: ['Tasks', 'Knowledge Hub', 'API Telemetry'],
      export_checksum: 'sha256:e3b0c442'
    },
    metrics: {
      latency: '820ms',
      throughput: '45 templates/min',
      reliability: '99.9%'
    },
    features: ['Relational Schema Generator', 'Block Tree Parser', 'JSON Schema Export', 'Gumroad Bundle Compatible']
  },

  // --- NAE CONTENT & NEWSLETTER AUTOMATION ---
  {
    id: 'nae-agent-orchestrator',
    category: 'NAE',
    categoryLabel: 'Newsletter Automation Engine',
    name: '4-Agent Hugo Static Publisher Engine',
    statusTag: 'HEADLESS_RUNNER: SCHEDULED',
    endpointSignature: 'POST /v1/nae/orchestrate',
    valueProp: 'Executes a 4-stage agent pipeline (Expand ➔ Research ➔ Write & Inject ➔ Publish) across 10 niched affiliate sites.',
    description: 'Zero-capital programmatic affiliate traffic network running via GitHub Actions, Hugo static rendering, and Gemini LLM agents.',
    sampleInput: {
      command: 'orchestrate',
      target_niche: 'urban_renter_power',
      article_count: 1,
      dry_run: false
    },
    sampleOutput: {
      pipeline_id: 'nae_run_88190',
      niche: 'urban_renter_power',
      agents_executed: [
        'Topic Expansion Agent (50+ sub-topics)',
        'Research & Outliner Agent',
        'Writer & Affiliate Injector Agent (1,500w)',
        'Publisher & Deployer Agent (Hugo Front-Matter)'
      ],
      github_actions_cron: 'Mon, Wed, Fri 08:00 UTC',
      generated_file: 'content/posts/smart-battery-backup-guide.md',
      word_count: 1540
    },
    metrics: {
      latency: '12.4s total',
      throughput: '10 Niches / Run',
      reliability: '99.9%'
    },
    features: ['10 Registered Micro-Niches', 'Contextual Affiliate Link Injector', 'Hugo Archetype Formatting', 'GitHub Actions Scheduled']
  },
  {
    id: 'nae-intelligence-digest',
    category: 'NAE',
    categoryLabel: 'Newsletter Automation Engine',
    name: 'Autonomous Intelligence Digest Synthesizer',
    statusTag: 'HEADLESS_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/nae/synthesize-digest',
    valueProp: 'Aggregates search intent, parses technical feeds, and synthesizes high-converting newsletter issues automatically.',
    description: 'Scrapes trending industry sources and generates curated technical digests with embedded comparison specs tables.',
    sampleInput: {
      niche_id: 'solo_microbiz_security',
      digest_frequency: 'weekly'
    },
    sampleOutput: {
      status: 'SYNTHESIZED',
      digest_title: 'Zero-Trust Cybersecurity for Solo Founders [Issue #42]',
      sources_scraped: 84,
      affiliate_links_injected: 12,
      output_markdown_length: 8420
    },
    metrics: {
      latency: '3.8s',
      throughput: '50 digests/hr',
      reliability: '99.95%'
    },
    features: ['Specs Table Generator', 'Automated Search Intent Scraper', 'Hugo Front-Matter Parser', 'Zero-Fluff Copy Engine']
  },

  // --- MSAI MICRO-SAAS & SPECIALIZED AGENTS ---
  {
    id: 'msai-review-agent',
    category: 'MSAI',
    categoryLabel: 'Micro-SaaS & Agent APIs',
    name: 'E-Commerce Review Sentiment Agent API',
    statusTag: 'HEADLESS_RUNNER: ONLINE',
    endpointSignature: 'POST /v1/msai/analyze-review',
    valueProp: 'FastAPI serverless endpoint extracting granular product feature feedback & sentiment classifications from raw text.',
    description: 'Production FastAPI micro-service analyzing user product reviews via Gemini / Groq LLMs with zero-config fallback.',
    sampleInput: {
      review_text: 'The battery life is incredible and the display is super sharp, but charging takes a long time.'
    },
    sampleOutput: {
      sentiment: 'Positive',
      features_extracted: ['battery life', 'display sharpness', 'charging speed'],
      sentiment_score: 0.88,
      latency_ms: 78,
      llm_model: 'llama-3.3-70b-versatile'
    },
    metrics: {
      latency: '78ms',
      throughput: '10,000 req/min',
      reliability: '99.99%'
    },
    features: ['Pydantic JSON Schema Validation', 'Groq / Gemini High-Speed LLM', 'FastAPI Serverless Ready', 'Fallback Logic Built-in']
  },
  {
    id: 'msai-social-scrapers',
    category: 'MSAI',
    categoryLabel: 'Micro-SaaS & Agent APIs',
    name: 'Multi-Platform Stealth Scraper Microservices',
    statusTag: 'HEADLESS_RUNNER: ONLINE',
    endpointSignature: 'POST /v1/msai/social-scrape',
    valueProp: 'Headless scraper endpoints for Instagram, LinkedIn, Reddit, TikTok, and YouTube Shorts data extraction.',
    description: 'Distributed microservice suite bypassing rate limits with stealth proxies and returning standardized JSON datasets.',
    sampleInput: {
      platform: 'reddit',
      target_subreddit: 'MicroSaaS',
      limit: 25
    },
    sampleOutput: {
      platform: 'reddit',
      extracted_records: 25,
      proxy_rotation: 'STEALTH_ACTIVE',
      execution_ms: 114,
      sample_record: {
        title: 'Building a $5k/mo API wrapper with FastAPI & Gemini',
        upvotes: 184,
        comments_count: 42
      }
    },
    metrics: {
      latency: '114ms',
      throughput: '1,200 pages/min',
      reliability: '99.9%'
    },
    features: ['Instagram / LinkedIn / Reddit / TikTok', 'Stealth Proxy Matrix', 'Zero Headless Browser Overhead', 'Raw Data Syndication']
  },
  {
    id: 'msai-lead-webhook',
    category: 'MSAI',
    categoryLabel: 'Micro-SaaS & Agent APIs',
    name: 'Lead Verification & Webhook Dispatcher',
    statusTag: 'HEADLESS_RUNNER: ONLINE',
    endpointSignature: 'POST /v1/msai/verify-lead-webhook',
    valueProp: 'Validates incoming lead payloads instantly and dispatches sanitized data directly into CRM & Make.com workflows.',
    description: 'Zero-config verification worker running real-time email MX verification, domain scoring, and automated webhook dispatch.',
    sampleInput: {
      lead_email: 'alex@techscale.io',
      source: 'landing_page_cta'
    },
    sampleOutput: {
      verified: true,
      lead_score: 94,
      email_deliverable: true,
      webhook_dispatched: true,
      destination: 'https://hooks.make.com/daf-pipeline-7'
    },
    metrics: {
      latency: '62ms',
      throughput: '5,000 webhook/min',
      reliability: '100%'
    },
    features: ['Make.com / Zapier Ready', 'MX Domain Scoring', 'HMAC Signature Verification', 'Instant Dispatcher']
  },

  // --- AGAMS AIR-GAPPED ASSET MAINTENANCE SYSTEM ---
  {
    id: 'agams-hybrid-rag',
    category: 'AGAMS',
    categoryLabel: 'Air-Gapped Maintenance (AGAMS)',
    name: 'Air-Gapped Hybrid RAG & Equipment Telemetry',
    statusTag: 'AIRGAPPED_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/agams/hybrid-query',
    valueProp: '100% local, air-gapped hybrid RAG engine pairing PostgreSQL SQL equipment telemetry with local Ollama LLM document retrieval.',
    description: 'Zero-cloud industrial asset governance system executing deterministic Tag ID routing and local TinyLlama inference in air-gapped facilities.',
    sampleInput: {
      query: 'What is the operational status and maintenance history for motor 2135MOT035?',
      airgap_mode: true,
      target_tag_id: '2135MOT035'
    },
    sampleOutput: {
      status: 'AIRGAPPED_SUCCESS',
      tag_id: '2135MOT035',
      asset_name: 'Main Feed Water Pump Motor 35',
      asset_status: 'OPERATIONAL',
      location: 'Pump Station Bay 3',
      sql_telemetry_found: true,
      local_llm_response: 'Motor 2135MOT035 is OPERATIONAL in Bay 3. Last maintenance record logged on 2026-04-10 for bearing lubrication.',
      latency_ms: 68,
      local_model: 'tinyllama:latest'
    },
    metrics: {
      latency: '68ms',
      throughput: 'Local Air-Gapped',
      reliability: '100% Offline'
    },
    features: ['Air-Gapped Ollama LLM', 'PostgreSQL SQL Telemetry Router', 'Zero Hallucination Heuristic Filter', 'Industrial Monochrome UI']
  },
  {
    id: 'agams-tika-vectorizer',
    category: 'AGAMS',
    categoryLabel: 'Air-Gapped Maintenance (AGAMS)',
    name: 'Offline Apache Tika & FAISS Document Vectorizer',
    statusTag: 'AIRGAPPED_RUNNER: ACTIVE',
    endpointSignature: 'POST /v1/agams/ingest-manuals',
    valueProp: 'Extracts technical PDF manuals & CSV tag listings locally using Apache Tika and builds vector embeddings with FAISS.',
    description: 'Offline document processing engine parsing industrial equipment specifications, maintenance procedures, and job safety instructions.',
    sampleInput: {
      file_path: 'Docs/Standard Jobs.txt',
      chunk_size: 500,
      embedding_model: 'all-MiniLM-L6-v2'
    },
    sampleOutput: {
      status: 'INGESTED',
      file_processed: 'Standard Jobs.txt',
      tika_extraction_ms: 310,
      vector_chunks_created: 342,
      faiss_index_status: 'UPDATED',
      airgap_verified: true
    },
    metrics: {
      latency: '310ms',
      throughput: '500 pages/min',
      reliability: '100% Offline'
    },
    features: ['Apache Tika PDF/CSV Extractor', 'Local FAISS Vector Index', 'MMR Relevance Scoring', 'Duplicate Hash Filter']
  }
];

export const SYSTEM_METRICS = {
  totalPipelines: '18 Active Engines',
  uptimePercentage: '99.98%',
  averageLatency: '<120ms',
  monthlyTransactions: '1.4M Executions',
  status: 'ALL AGENTS OPERATIONAL',
  version: 'v2.4.0'
};
