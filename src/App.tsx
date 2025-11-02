import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tech: string[];
  details: {
    overview?: string;
    abilities?: string[];
    setup?: string;
    architecture?: string;
    notes?: string;
    links?: { label: string; href: string }[];
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Content Generator',
    subtitle: 'Automated content creation platform',
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['OpenAI', 'React', 'Node.js', 'MongoDB'],
    details: {
      overview:
        'A sophisticated AI-powered platform that generates high-quality content for blogs, social media, and marketing materials. Uses advanced language models to understand context and produce human-like text.',
      abilities: [
        'Generate blog posts, articles, and social media content',
        'SEO optimization suggestions',
        'Multi-language support',
        'Content scheduling and publishing',
        'Analytics and performance tracking',
      ],
      setup:
        'Built with React frontend and Node.js backend. Integrated with OpenAI GPT-4 API for content generation. MongoDB for storing user data and generated content.',
      architecture:
        'Microservices architecture with separate services for authentication, content generation, and analytics. Uses Redis for caching and rate limiting.',
      notes: 'Reduced content creation time by 75% for clients. Currently serving 500+ active users.',
    },
  },
  {
    id: 2,
    title: 'Trading Bot Platform',
    subtitle: 'Algorithmic cryptocurrency trading',
    image:
      'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Python', 'TensorFlow', 'Binance API', 'PostgreSQL'],
    details: {
      overview:
        'Advanced algorithmic trading platform that executes trades automatically based on technical indicators and machine learning predictions. Supports multiple exchanges and trading pairs.',
      abilities: [
        'Real-time market data analysis',
        'Multiple trading strategies (DCA, Grid, Momentum)',
        'Risk management and stop-loss automation',
        'Backtesting with historical data',
        'Portfolio rebalancing',
      ],
      setup:
        'Python-based trading engine with TensorFlow for price prediction models. Connected to major exchanges via REST and WebSocket APIs.',
      architecture:
        'Event-driven architecture with separate modules for data collection, strategy execution, and risk management. Uses PostgreSQL for transaction history.',
      notes:
        'Achieved 67% win rate over 6-month testing period. Manages $2M+ in client assets.',
    },
  },
  {
    id: 3,
    title: 'Workflow Automation Suite',
    subtitle: 'No-code automation platform',
    image:
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['TypeScript', 'Next.js', 'Zapier', 'AWS Lambda'],
    details: {
      overview:
        'A comprehensive automation platform that connects various business tools and automates repetitive tasks without coding. Visual workflow builder with 200+ integrations.',
      abilities: [
        'Visual workflow designer',
        'Connect 200+ apps and services',
        'Schedule automated tasks',
        'Conditional logic and branching',
        'Error handling and notifications',
      ],
      setup:
        'Built with Next.js for the frontend interface. AWS Lambda for executing automation workflows. Integration with Zapier and native APIs.',
      architecture:
        'Serverless architecture using AWS Lambda and Step Functions. DynamoDB for storing workflow configurations and execution logs.',
      notes:
        'Saves clients an average of 20 hours per week. Processing 10,000+ automation runs daily.',
    },
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    subtitle: 'Modern online shopping experience',
    image:
      'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'Stripe', 'Node.js', 'Redis'],
    details: {
      overview:
        'Full-featured e-commerce platform with modern UX, secure payment processing, and inventory management. Optimized for conversion and mobile experience.',
      abilities: [
        'Product catalog with search and filters',
        'Shopping cart and wishlist',
        'Secure checkout with Stripe',
        'Order tracking and notifications',
        'Admin dashboard for inventory',
      ],
      setup:
        'React SPA with Node.js backend. Stripe for payment processing. Redis for session management and caching.',
      notes:
        '40% increase in conversion rate compared to previous platform. Handles 5,000+ daily visitors.',
    },
  },
  {
    id: 5,
    title: 'AI Image Recognition',
    subtitle: 'Computer vision analysis tool',
    image:
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    details: {
      overview:
        'Advanced image recognition system that identifies objects, faces, and text in images. Used for quality control, security, and content moderation.',
      abilities: [
        'Object detection and classification',
        'Facial recognition and analysis',
        'OCR for text extraction',
        'Image quality assessment',
        'Batch processing capabilities',
      ],
      setup:
        'Python backend with TensorFlow and OpenCV for image processing. FastAPI for REST endpoints. GPU-accelerated inference.',
      architecture:
        'Microservices with separate containers for different recognition tasks. Load balanced across multiple GPU instances.',
      notes:
        '99.2% accuracy on benchmark datasets. Processing 50,000+ images daily.',
    },
  },
  {
    id: 6,
    title: 'Real-Time Analytics Dashboard',
    subtitle: 'Business intelligence platform',
    image:
      'https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'D3.js', 'Apache Kafka', 'ClickHouse'],
    details: {
      overview:
        'Real-time analytics dashboard that processes and visualizes business metrics from multiple data sources. Provides actionable insights with interactive charts.',
      abilities: [
        'Real-time data streaming',
        'Interactive charts and graphs',
        'Custom metric calculations',
        'Alerting and notifications',
        'Export and reporting',
      ],
      setup:
        'React frontend with D3.js for visualizations. Apache Kafka for real-time data streaming. ClickHouse for fast analytical queries.',
      architecture:
        'Stream processing architecture with Kafka as message broker. ClickHouse for time-series data storage and analysis.',
      notes:
        'Reduced reporting time from hours to seconds. Monitoring 1B+ events per day.',
    },
  },
];

export default function App() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const handleKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0d12] text-white">
      {/* animated blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-24 h-64 w-64 rounded-full blur-3xl md:-top-32 md:-left-40 md:h-[420px] md:w-[420px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, #7c5cff55 0%, #1e66ff25 50%, transparent 70%)',
        }}
        animate={{ y: [0, 10, -8, 0], rotate: [0, 8, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl md:-bottom-32 md:-right-40 md:h-[520px] md:w-[520px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, #22d3ee55 0%, #14b8a625 50%, transparent 70%)',
        }}
        animate={{ y: [0, -12, 10, 0], rotate: [0, -10, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {/* nav */}
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#1e66ff] via-[#7c5cff] to-[#22d3ee] shadow-[0_0_25px_rgba(30,102,255,0.6)]" />
          <span className="text-sm text-zinc-400">Portfolio</span>
        </div>
        <div className="hidden md:flex" />
      </div>

      {/* hero */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pb-4 pt-4 md:pb-10">
        <h1 className="text-balance text-4xl font-semibold sm:text-5xl md:text-6xl">
          Completed{' '}
          <span className="bg-gradient-to-r from-[#1e66ff] via-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
            projects
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400 md:text-lg">
          See the projects that have helped a number of businesses and people
          simplify their work processes and get better results.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {['AI', 'Trading', 'Automations', 'Web'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* grid */}
      <section className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.id}
            onClick={() => setSelected(p)}
            className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-transform hover:-translate-y-1 hover:border-[#1e66ff]/70 hover:shadow-[0_10px_40px_rgba(30,102,255,0.15)]"
          >
            <div className="relative">
              <img
                src={p.image}
                alt={p.title}
                className="h-32 w-full object-cover sm:h-48"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-white text-xl font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{p.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-2 py-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0c111b]/95 backdrop-blur-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 p-2 text-zinc-200 hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-56 w-full object-cover md:h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-0 top-0 m-4 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-zinc-200 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {selected.title}
                </h2>
                {selected.subtitle && (
                  <p className="mt-1 text-zinc-400">{selected.subtitle}</p>
                )}
                <div className="mt-4 space-y-6 text-zinc-300">
                  {selected.details.overview && (
                    <div>
                      <h3 className="mb-1 font-medium text-white/90">
                        Overview
                      </h3>
                      <p className="whitespace-pre-line">
                        {selected.details.overview}
                      </p>
                    </div>
                  )}
                  {selected.details.abilities &&
                    selected.details.abilities.length > 0 && (
                      <div>
                        <h3 className="mb-1 font-medium text-white/90">
                          Abilities
                        </h3>
                        <ol className="list-decimal space-y-1 pl-5">
                          {selected.details.abilities.map((feat, idx) => (
                            <li key={idx}>{feat}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  {selected.details.setup && (
                    <div>
                      <h3 className="mb-1 font-medium text-white/90">Setup</h3>
                      <p className="whitespace-pre-line">
                        {selected.details.setup}
                      </p>
                    </div>
                  )}
                  {selected.details.architecture && (
                    <div>
                      <h3 className="mb-1 font-medium text-white/90">
                        Architecture
                      </h3>
                      <p className="whitespace-pre-line">
                        {selected.details.architecture}
                      </p>
                    </div>
                  )}
                  {selected.details.notes && (
                    <div>
                      <h3 className="mb-1 font-medium text-white/90">Notes</h3>
                      <p className="whitespace-pre-line">
                        {selected.details.notes}
                      </p>
                    </div>
                  )}
                  {selected.details.links &&
                    selected.details.links.length > 0 && (
                      <div>
                        <h3 className="mb-1 font-medium text-white/90">
                          Links
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {selected.details.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/20"
                            >
                              {link.label}{' '}
                              <ExternalLink size={14} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/20"
                  >
                    ← Back
                  </button>
                  <span className="text-xs text-zinc-500">
                    Press ESC to close
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}