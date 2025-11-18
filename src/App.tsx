import { useCallback, useEffect, useState } from 'react';
import { ArrowUp, ExternalLink, X, Workflow, Brain, MessageSquare, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
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

interface Section {
  id: string;
  title: string;
  icon: typeof Workflow;
}

const sections: Section[] = [
  { id: 'automations', title: 'Automations', icon: Workflow },
  { id: 'ai-integrations', title: 'AI Integrations', icon: Brain },
  { id: 'telegram-bots', title: 'Telegram Bots', icon: MessageSquare },
  { id: 'web-apps', title: 'Web Apps', icon: Globe },
];

const projects: Project[] = [
  {
    id: 101,
    title: 'AI News Telegram Channel',
    subtitle: 'Automated AI/automation news curation and posting pipeline',
    category: 'automations',
    tech: ['N8n', 'JavaScript', 'LLM'],
    details: {
      overview:
        'A fully automated AI-driven news channel that continuously finds, filters, and publishes the most relevant and practical updates in AI, automation, and related technologies. The system monitors multiple sources, evaluates each article for relevance, summarizes it, generates a clean Telegram-ready post, and publishes it automatically.',
      abilities: [
        'Automatic collection of news articles from multiple sources',
        'Intelligent filtering to ensure each article matches the channel’s criteria',
        'AI-powered summarization, rephrasing, and formatting for Telegram',
        'Automatic selection of a relevant cover image',
        'All posts logged, versioned, and tracked in a centralized Notion database',
        'Entire system is built on the n8n automation platform',
        'Workflows are separated into modular pipelines, all connected through a shared Notion database',
        'Article extraction uses several methods depending on the website:',
        'Direct HTML scraping',
        'RSS feeds',
        'AI-powered research and content retrieval',
        'Validate that an article matches the posting criteria',
        'Check the database to prevent duplicate news',
        'Summarize the article and save structured data to Notion',
        'Find or generate a relevant cover image',
        'Rephrase and format the content for clean Telegram delivery',
        'When a post is “ready to be posted”, it is automatically published to the Telegram channel',
      ],
      setup:
        'Article extraction uses several methods depending on the website. A series of AI nodes perform validation, duplication checks, summarization with structured storage, cover image selection, and rephrasing for Telegram delivery. When marked ready, the post publishes automatically.',
      notes: 'The channel is public, and is available here: https://t.me/simpleflow_ai',
      links: [{ label: 'Link', href: 'https://t.me/simpleflow_ai' }],
    },
  },
  {
    id: 103,
    title: 'Straddle Trading Bot',
    subtitle: 'Automated straddle execution around major economic news',
    category: 'automations',
    tech: ['N8n', 'Telegram', 'Python', 'SQL'],
    details: {
      overview:
        'An automated trading system designed to execute straddle orders on Solana (or any other asset) before major economic news releases. The bot places a stop-buy order above the current market price and a stop-sell order below it. When the news is released and volatility spikes, one of the orders is triggered, capturing the price breakout in the correct direction while the opposite order is automatically canceled. The system manages entries, exits, and notifications end-to-end.',
      abilities: [
        'Automated Economic Event Scheduling: Automatically retrieves upcoming U.S. economic data release dates (BLS) and stores them in a database.',
        'Custom Event Support: Users can add additional custom events through a Telegram bot interface.',
        'Automated Straddle Execution: 10 minutes before each event, the bot places conditional buy and sell orders based on current price and ATR-based volatility calculations.',
        'Position Management: Whichever side is triggered first becomes the active trade; the opposite order is automatically canceled; the bot then places take-profit and stop-loss orders using ATR-based levels; if no order triggers within 2 hours post-event, both are canceled.',
        'Telegram Notifications: Full transparency of every stage — scheduling, order placement, fills, cancellations, and errors.',
        'Event Scheduling (n8n Workflow): Runs monthly to scrape and parse the official BLS release calendar; cleans and stores events in a MySQL database (duplicate-aware); can also be triggered manually from Telegram to add custom events.',
        'Event Triggering (n8n Worker Loop): Runs every 2 minutes to check for events occurring within the next 10 minutes; when an event is approaching, it forwards the event payload to the trading bot API and marks the event as processed.',
        'Trading Engine (Python + FastAPI): Receives event data, fetches current Solana market price, and calculates straddle entry levels via ATR; places stop-orders on Bybit and monitors order execution; handles order cancellation, TP, and SL placement automatically.',
        'Telegram Bot Interface (Python): Sends real-time execution updates and alerts; allows the user to view upcoming events and manage custom events; useful as both monitoring + interaction frontend.',
      ],
    },
  },
  {
    id: 104,
    title: 'Thank you letter & review request automation',
    subtitle: 'Automated follow-up and review routing for a moving company',
    category: 'automations',
    tech: ['Make.com', 'GoHighLevel'],
    details: {
      overview:
        'The client — a moving company — had no structured system to follow up with customers after a completed service, resulting in missed opportunities for reviews and feedback. To solve this, we built an automated thank-you and review request system that messages every customer after their move is completed. Each message thanks them for choosing the company, reminds them about their future move discount, and requests feedback.',
      abilities: [
        'If a customer selects 5 stars, they’re redirected directly to the company’s Google review page.',
        'If they select 4 stars or below, they’re directed to an internal feedback form, allowing the company to review and address concerns privately.',
        'Built using the Make.com platform.',
        'The automation runs once a day, scanning the company’s calendar for jobs completed 2 days prior.',
        'For each job, it retrieves customer details from the CRM, verifies that the field “Move went bad – don’t request review” is not marked true, and then proceeds.',
        'Once verified, the system automatically sends a personalized thank-you email with the review and feedback link.',
      ],
      setup:
        'Built using Make.com. Runs daily to scan completed jobs from the calendar and CRM, filters out any jobs flagged “Move went bad – don’t request review,” and sends personalized thank-you emails with direct review or internal feedback routing.',
    },
  },
  {
    id: 201,
    title: 'AI Webchat Assistant',
    subtitle: 'AI-powered assistant for a moving company',
    category: 'ai-integrations',
    tech: ['N8n', 'Vector database', 'LLM'],
    details: {
      overview:
        'An AI-powered assistant designed to manage customer inquiries for a moving company. The frontend is a webchat widget integrated directly into the company’s main website, allowing users to ask questions, receive instant answers, and get tailored suggestions for their upcoming moves.',
      abilities: [
        'The assistant is built on the n8n platform, using OpenAI’s ChatGPT 4.1 mini as its core model.',
        'It employs a RAG (Retrieval-Augmented Generation) process to access and reference internal company data in real time.',
        'The assistant’s knowledge base was structured and vectorized into multiple documents containing information about services, pricing, policies, and FAQs.',
        'The frontend widget was developed in HTML and embedded into the company’s website, which is hosted within their CRM system (GoHighLevel).',
      ],
      setup:
        'Built on n8n with OpenAI’s ChatGPT 4.1 mini and a RAG workflow over a vectorized knowledge base. The HTML webchat widget sits inside their GoHighLevel-hosted site.',
    },
  },
  {
    id: 301,
    title: 'Consulting agency telegram bot',
    subtitle: 'Service exploration and CRM handoff bot for an immigration agency',
    category: 'telegram-bots',
    tech: ['Telegram', 'Python'],
    details: {
      overview:
        'A custom Telegram bot built for a U.S.-based immigration consulting agency to streamline how potential clients explore services and connect with representatives. The bot allows users to easily browse and submit service requests, learn about the company, schedule a Zoom consultation, or ask questions directly within Telegram.',
      abilities: [
        'Service Exploration – A welcoming message with intuitive inline buttons that guide users through available services. Each option includes a brief explanation and the ability to apply directly within the chat.',
        'CRM Integration – When a user selects a service, the bot automatically collects their contact details and sends the data to the agency’s CRM with proper tags and service notes.',
        'Navigation Buttons – Four main keyboard buttons for quick access:',
        'Main Menu – Returns the original greeting message with service options.',
        'Ask a Question – Lets users message the bot directly; their question and contact info are sent to the agency’s internal Telegram group for follow-up.',
        'About Us – Displays a company overview, contact details, and social media links.',
        'Zoom Meeting – Shares a Calendly link so users can book a Zoom consultation with a representative.',
        '/help Command – Displays a quick reference guide outlining all available bot functions.',
        'Developed entirely with Python.',
        'Continuously hosted and maintained on a private VPS.',
      ],
    },
  },
  {
    id: 403,
    title: 'Immigration consulting web quiz',
    subtitle: 'Visa eligibility quiz with automated CRM handoff',
    category: 'web-apps',
    tech: ['JavaScript', 'LLM', 'Netlify'],
    details: {
      overview:
        'A web-based visa eligibility quiz built for a U.S. immigration consulting firm (Russian language interface). The quiz guides users through a short sequence of questions and, based on their responses, calculates their approximate chances of visa approval and recommends the most suitable visa categories. Before displaying results, the quiz prompts the user for contact information and automatically sends the lead to the firm’s CRM for follow-up.',
      abilities: [
        'Probability Scoring: Calculates the user’s estimated likelihood of visa approval based on weighted responses.',
        'Visa Recommendations: Suggests the most relevant U.S. visa categories for the user’s situation.',
        'Automated Lead Capture: Collects contact details and creates the prospect inside the CRM.',
        'CRM Integration: Adds tags, updates the pipeline stage, and attaches a full summary of user responses and recommendations.',
        'Team Notifications: Automatically sends a new-lead alert to the firm’s internal Telegram group.',
        'Frontend: Built with React + TypeScript and deployed on Netlify.',
        'Logic Model: The scoring system and visa recommendation logic were defined with the firm and refined using AI assistance. Each quiz response contributes weighted points to the total score.',
        'Automation: On submission, data is sent to a Make.com workflow, which: Creates the contact in the CRM; Adds the appropriate tags and custom notes; Moves the lead to the correct pipeline stage; Sends a Telegram notification to the team.',
      ],
    },
  },
  {
    id: 404,
    title: 'Custom websites',
    subtitle: 'React/TypeScript sites with tailored design and deployment',
    category: 'web-apps',
    tech: ['JavaScript', 'Netlify', 'Cloudflare Pages'],
    details: {
      overview:
        'Custom-built websites and landing pages designed to align with your brand’s identity and goals. Even if you’re unsure of the style or direction, I can help you define it from scratch. All websites are developed using React, TypeScript, and Tailwind CSS. Every project is handled end-to-end: from concept and design to a fully deployed website hosted on your domain.',
      abilities: [
        'Tailored design — Every website is uniquely created to match your brand’s tone.',
        'Modern functionality — Animations, databases, dynamic forms, AI chatbots, and other tool integrations available.',
        'Deployment-ready — Full setup and hosting assistance on Netlify or your preferred platform.',
        'Demo sites available on request.',
      ],
      links: [{ label: 'Demo sites', href: '#' }],
    },
  },
];


export default function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [openingCardId, setOpeningCardId] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setSelected(null);
    setActiveCardId(null);
  }, []);

  useEffect(() => {
    const handleKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!selected) {
      return;
    }
    const { overflow: originalOverflow, touchAction: originalTouchAction } =
      document.body.style;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [selected]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openProject = (project: Project) => {
    setActiveCardId(project.id);
    setOpeningCardId(project.id);
    window.setTimeout(() => {
      setSelected(project);
      setOpeningCardId(null);
    }, 140);
  };

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
      </div>

      {/* hero */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pb-6 pt-4">
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
      </header>

      {/* directory navigation */}
      <nav
        className="relative z-10 mx-auto max-w-6xl overflow-visible px-6 pb-12 pt-3"
        style={{ overflow: 'visible' }}
      >
        <div
          className="flex gap-3 overflow-x-auto overflow-visible pb-2 sm:flex-wrap [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
          style={{ overflowY: 'visible', overflowX: 'auto' }}
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex min-w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[#1e66ff]/50 hover:bg-white/10 hover:text-white"
              >
                <Icon size={16} />
                {section.title}
              </button>
            );
          })}
        </div>
      </nav>

      {/* sections */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        {sections.map((section) => {
          const Icon = section.icon;
          const sectionProjects = projects.filter((p) => p.category === section.id);

          if (sectionProjects.length === 0) return null;

          return (
            <section key={section.id} id={section.id} className="mb-16 scroll-mt-24">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                  <Icon size={24} className="text-[#1e66ff]" />
                </div>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sectionProjects.map((p) => {
                  const isActive = activeCardId === p.id || openingCardId === p.id;
                  return (
                    <article
                      key={p.id}
                      onClick={() => openProject(p)}
                      className={`group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xl transition-all ${
                        isActive
                          ? 'border-[#1e66ff]/80 bg-white/10 shadow-[0_0_40px_rgba(30,102,255,0.35)] ring-2 ring-[#1e66ff]/60 ring-offset-0'
                          : 'md:hover:-translate-y-1 md:hover:border-[#1e66ff]/70 md:hover:bg-white/10 md:hover:shadow-[0_10px_40px_rgba(30,102,255,0.15)]'
                      }`}
                    >
                      <h3
                        className={`text-lg font-semibold transition-colors ${
                          isActive ? 'text-[#1e66ff]' : 'text-white md:group-hover:text-[#1e66ff]'
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-400 line-clamp-2">
                        {p.subtitle}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 3 && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-400">
                            +{p.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 shadow-[0_10px_30px_rgba(30,102,255,0.25)] backdrop-blur transition-all hover:-translate-y-1 hover:border-[#1e66ff]/60 hover:bg-white/10 hover:text-white"
        >
          <ArrowUp size={16} />
          Top
        </button>
      )}

      {/* modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-2 py-4 touch-pan-y backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0c111b]/95 backdrop-blur-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 p-2 text-zinc-200 hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-zinc-200 backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                {selected.title}
              </h2>
              {selected.subtitle && (
                <p className="mt-1 text-zinc-400">{selected.subtitle}</p>
              )}

              <div className="mt-6 space-y-6 text-zinc-300">
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
                      <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                        {selected.details.abilities.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
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
                  onClick={closeModal}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/20"
                >
                  ← Back
                </button>
                <span className="hidden text-xs text-zinc-500 md:inline">
                  Press ESC to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
