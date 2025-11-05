import { useEffect, useState } from 'react';
import { ExternalLink, X, Workflow, Brain, MessageSquare, Globe, Layers } from 'lucide-react';
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
  { id: 'other', title: 'Other', icon: Layers },
];

const projects: Project[] = [
  {
    id: 1,
    title: 'Straddle Trading Bot',
    subtitle: 'Automated news-driven volatility trading',
    category: 'automations',
    tech: ['n8n', 'Python', 'FastAPI', 'MySQL', 'Bybit API'],
    details: {
      overview:
        'An automated system that executes straddle orders around major economic news, capturing volatility breakouts on Solana or other assets while managing the entire trade lifecycle.',
      abilities: [
        'Schedules economic events automatically and supports ad-hoc entries from Telegram',
        'Places conditional buy and sell orders 10 minutes pre-event using ATR-based levels',
        'Cancels the opposite leg once a breakout triggers and deploys ATR take-profit/stop-loss',
        'Sends Telegram notifications for scheduling, fills, cancellations, and any errors',
      ],
      setup:
        'Monthly n8n workflow scrapes BLS calendars into MySQL, while a 2-minute worker loop watches for events approaching the execution window and forwards payloads to the trading engine.',
      architecture:
        'FastAPI service in Python calculates entry levels, pushes stop orders to Bybit, and supervises execution status; Telegram bot provides the operator interface for updates and custom events.',
      notes:
        'Successfully automates news straddles end-to-end, eliminating manual coordination and reaction delays.',
    },
  },
  {
    id: 2,
    title: 'AI Webchat Assistant',
    subtitle: 'Customer support automation for a moving company',
    category: 'ai-integrations',
    tech: ['n8n', 'OpenAI GPT-4.1 mini', 'GoHighLevel', 'HTML'],
    details: {
      overview:
        'An AI-powered webchat assistant embedded on the moving company website that answers customer questions instantly and recommends tailored next steps for upcoming moves.',
      abilities: [
        'Delivers instant answers about services, pricing, and policies inside the site widget',
        'Personalizes move suggestions using a RAG knowledge base built from internal documents',
        'Captures prospect context and routes complex inquiries back to the operations team',
        'Runs 24/7 so visitors always have a live support experience without human wait times',
      ],
      setup:
        'Implemented on n8n orchestrating OpenAI GPT-4.1 mini with Retrieval-Augmented Generation over structured company docs. Knowledge base content is vectorized and kept current so responses stay accurate.',
      architecture:
        'n8n workflows coordinate chat context, vector lookups, and model prompts while a lightweight HTML widget embedded via GoHighLevel renders the assistant on every page.',
      notes:
        'Reduced first-response time from hours to seconds and now resolves most pre-sales questions autonomously.',
    },
  },
  {
    id: 3,
    title: 'Immigration Consulting Telegram Bot',
    subtitle: 'Lead capture and scheduling chatbot',
    category: 'telegram-bots',
    tech: ['Python', 'Telegram Bot API', 'Calendly', 'CRM Integration'],
    details: {
      overview:
        'A custom Telegram bot that guides prospective immigration clients through services, captures their details, and connects them with agency representatives in real time.',
      abilities: [
        'Offers guided service exploration with inline buttons and direct application flows',
        'Sends captured contact data to the CRM with appropriate tags and service notes',
        'Provides quick actions for asking questions, learning about the agency, or booking Zoom calls',
        'Implements a /help command and persistent keyboards for intuitive navigation',
      ],
      setup:
        'Developed entirely in Python and hosted on a private VPS to run continuously with process monitoring, CRM webhooks, and Calendly integration for scheduling.',
      architecture:
        'Telegram command handlers orchestrate the conversational flow while backend modules push leads to the CRM and notify internal Telegram groups for follow-up.',
      notes:
        'Streamlines the intake pipeline by keeping prospects inside Telegram from discovery through consultation booking.',
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <nav className="relative z-10 mx-auto max-w-6xl px-6 pb-12">
        <div className="flex flex-wrap gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[#1e66ff]/50 hover:bg-white/10 hover:text-white"
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
                {sectionProjects.map((p) => (
                  <article
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#1e66ff]/70 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(30,102,255,0.15)]"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#1e66ff] transition-colors">
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
                ))}
              </div>
            </section>
          );
        })}
      </div>

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
            <button
              onClick={() => setSelected(null)}
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
      )}
    </div>
  );
}
