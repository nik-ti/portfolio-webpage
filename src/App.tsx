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
    id: 102,
    title: 'Sales Pipeline Automation Suite',
    subtitle: 'Hands-free lead routing and follow-up',
    category: 'automations',
    tech: ['n8n', 'HubSpot API', 'Slack', 'Google Sheets'],
    details: {
      overview:
        'Orchestrated a sales automation layer that captures inbound leads, enriches them, and triggers account-specific follow-ups without manual effort.',
      abilities: [
        'Scores and prioritizes leads using real-time enrichment data',
        'Routes warm leads to the correct rep via Slack with next-step suggestions',
        'Creates and updates HubSpot deals with lifecycle tagging',
        'Generates daily pipeline snapshots for leadership in Google Sheets',
      ],
      setup:
        'Built in n8n with webhook ingestion, enrichment APIs, and CRM actions. Slack alerts share direct call-to-actions and context for each rep.',
      architecture:
        'Event-driven workflows that fan out from inbound capture into enrichment, CRM updates, and notification subflows while logging every change for auditing.',
      notes:
        'Cut first-response time from 6 hours to under 20 minutes and increased MQL conversion by 18%.',
    },
  },
  {
    id: 103,
    title: 'Finance Ops Reconciliation Flow',
    subtitle: 'Automated invoice validation and reporting',
    category: 'automations',
    tech: ['n8n', 'Xero API', 'Google Cloud Functions', 'Slack', 'BigQuery'],
    details: {
      overview:
        'Automated the weekly reconciliation process by cross-referencing invoices, payouts, and expense reports, flagging discrepancies before the finance review.',
      abilities: [
        'Fetches payables and receivables data from Xero and payment gateways',
        'Matches transactions against expense feeds using fuzzy logic',
        'Posts anomaly alerts with remediation steps to the finance Slack channel',
        'Publishes clean datasets to BigQuery for dashboards and audits',
      ],
      setup:
        'Scheduled n8n workflows coordinate API pulls, with Google Cloud Functions handling heavy comparison logic before results return to n8n for messaging.',
      architecture:
        'Modular microflows separate data ingestion, reconciliation, and reporting so finance can tweak thresholds without redeploying code.',
      notes:
        'Shrank reconciliation time from two days to a 30-minute review cycle and prevented duplicated payments in the first month.',
    },
  },
  {
    id: 104,
    title: 'HR Onboarding Automation',
    subtitle: 'Zero-touch provisioning for new hires',
    category: 'automations',
    tech: ['Make.com', 'BambooHR', 'Google Workspace', 'Slack', 'Notion'],
    details: {
      overview:
        'Delivered an onboarding automation that creates accounts, schedules orientation, and assigns training resources the moment an offer is accepted.',
      abilities: [
        'Creates Google Workspace accounts with role-based templates',
        'Provisions Slack access with channel auto-joins and welcome DM',
        'Generates personalized onboarding hub pages in Notion',
        'Schedules calendar events and equipment reminders automatically',
      ],
      setup:
        'Make.com orchestrates BambooHR webhooks, Workspace admin APIs, Slack messaging, and Notion templates in a single multi-step scenario.',
      architecture:
        'Event-triggered playbooks that branch by department, guaranteeing each hire receives the right resources without manual ticketing.',
      notes:
        'Reduced onboarding coordination time by 80% and improved new-hire satisfaction scores on internal surveys.',
    },
  },
  {
    id: 201,
    title: 'AI Webchat Assistant',
    subtitle: 'Customer support automation for a moving company',
    category: 'ai-integrations',
    tech: ['n8n', 'OpenAI GPT-4.1 mini', 'GoHighLevel', 'HTML Widget'],
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
    id: 202,
    title: 'Property Inquiry Copilot',
    subtitle: 'AI leasing assistant for multifamily operators',
    category: 'ai-integrations',
    tech: ['LangChain', 'Pinecone', 'Next.js', 'AppFolio API'],
    details: {
      overview:
        'A conversational assistant that qualifies property inquiries, shares tailored unit recommendations, and escalates high-intent prospects to agents.',
      abilities: [
        'Answers availability, pricing, and pet policy questions instantly',
        'Recommends floor plans based on prospect preferences and budget',
        'Books tours by syncing with AppFolio calendar availability',
        'Summarizes each conversation and posts it into the leasing CRM',
      ],
      setup:
        'LangChain orchestrates OpenAI responses with Pinecone-hosted embeddings generated from property documents and FAQs. Next.js acts as the secure public interface.',
      architecture:
        'Serverless functions manage chat state, retrieve relevant context, and push structured handoffs to AppFolio, ensuring agents receive ready-to-act leads.',
      notes:
        'Captured 30% more qualified tour bookings by letting renters self-serve outside of business hours.',
    },
  },
  {
    id: 203,
    title: 'Knowledge Base Summarizer',
    subtitle: 'LLM-powered insights across support content',
    category: 'ai-integrations',
    tech: ['OpenAI GPT-4', 'Supabase', 'n8n', 'Notion API'],
    details: {
      overview:
        'Built a daily summarization pipeline that ingests product release notes, documentation, and support articles to surface actionable insights for the CS team.',
      abilities: [
        'Clusters related articles and generates digestible summaries',
        'Highlights potential knowledge gaps and outdated assets',
        'Posts summary cards into Slack with links back to source docs',
        'Maintains searchable embeddings for ad-hoc question answering',
      ],
      setup:
        'n8n orchestrates Notion and CMS fetches, stores data in Supabase, and triggers GPT-4 summarization jobs before distributing formatted recaps.',
      architecture:
        'ETL-style workflow with staging tables, embedding generation, and scheduled summarization functions to keep the knowledge base current.',
      notes:
        'Cut weekly content review time by 6 hours and improved doc findability scores in team surveys.',
    },
  },
  {
    id: 204,
    title: 'Support Email Triage Assistant',
    subtitle: 'AI-driven case routing for SaaS support',
    category: 'ai-integrations',
    tech: ['OpenAI GPT-4o mini', 'Zendesk API', 'Zapier', 'PostgreSQL'],
    details: {
      overview:
        'Deployed an AI triage layer that interprets inbound support emails, categorizes issues, and drafts suggested responses for agents.',
      abilities: [
        'Classifies tickets by urgency, feature area, and customer tier',
        'Populates Zendesk fields and assigns ownership instantly',
        'Drafts context-aware reply suggestions for agent review',
        'Flags churn-risk sentiment and notifies customer success',
      ],
      setup:
        'Zapier captures emails, enriches customer metadata, and calls custom GPT actions. Results are stored in PostgreSQL for auditing and routed into Zendesk.',
      architecture:
        'Hybrid automation blending no-code orchestration with custom webhooks for nuanced routing, ensuring compliance and human-in-the-loop approvals.',
      notes:
        'Reduced average first response by 42% while maintaining agent satisfaction with AI-generated drafts.',
    },
  },
  {
    id: 301,
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
  {
    id: 302,
    title: 'Retail Promotions Bot',
    subtitle: 'Customer engagement bot for flash campaigns',
    category: 'telegram-bots',
    tech: ['Python', 'Redis', 'Stripe', 'Telegram Bot API'],
    details: {
      overview:
        'Telegram experience for a D2C retailer that drives product launches, delivers limited-time promo codes, and captures purchase intent without email funnels.',
      abilities: [
        'Broadcasts segmented announcements with interactive product menus',
        'Issues unique promo codes and manages redemptions via Stripe webhooks',
        'Collects preference data to tailor future drops',
        'Alerts the sales team when high-value users engage or request assistance',
      ],
      setup:
        'Python bot hosted on a VPS with Redis for session state and Stripe integration for real-time coupon validation and order tracking.',
      architecture:
        'Stateful conversation flows with modular scenes, allowing marketing to roll out new campaigns by updating JSON configurations rather than code.',
      notes:
        'Generated a 23% uplift in launch-day sales and reduced manual support requests during promos.',
    },
  },
  {
    id: 303,
    title: 'Field Safety Check-In Bot',
    subtitle: 'Compliance automation for construction crews',
    category: 'telegram-bots',
    tech: ['Node.js', 'Supabase', 'Telegram Bot API', 'Twilio'],
    details: {
      overview:
        'Ensures construction teams submit daily safety check-ins, site photos, and incident reports through a simple Telegram interface.',
      abilities: [
        'Schedules automated reminders based on crew rosters and time zones',
        'Collects checklist responses and geotagged photos for compliance logs',
        'Escalates missed check-ins to supervisors via SMS and email',
        'Generates weekly compliance summaries accessible to leadership',
      ],
      setup:
        'Built with Node.js using Telegraf, storing submissions in Supabase, and triggering Twilio notifications for escalations.',
      architecture:
        'Reliable queue-backed job runner that separates reminder scheduling, message parsing, and reporting pipelines for high availability.',
      notes:
        'Increased daily safety compliance from 62% to 97% across distributed crews.',
    },
  },
  {
    id: 304,
    title: 'Investor Alerts Bot',
    subtitle: 'Crypto portfolio monitoring in Telegram',
    category: 'telegram-bots',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'CoinGecko API'],
    details: {
      overview:
        'A portfolio assistant that lets investors set price targets, monitor positions, and receive curated news bites without leaving Telegram.',
      abilities: [
        'Tracks live prices and on-chain metrics for configured assets',
        'Sends instant alerts when thresholds are crossed or volatility spikes',
        'Aggregates curated news headlines and sentiment summaries',
        'Exports holdings snapshots as CSV directly from chat commands',
      ],
      setup:
        'Python backend (FastAPI) handles data polling, stores preferences in PostgreSQL, and pushes notifications through Telegram webhooks.',
      architecture:
        'Asynchronous task runners collect market data, while a rules engine evaluates triggers and dispatches rich alerts with deep links.',
      notes:
        'Users credit the bot with catching key breakout moves while reducing notification noise by 40%.',
    },
  },
  {
    id: 401,
    title: 'Client Performance Portal',
    subtitle: 'Self-serve analytics for agency clients',
    category: 'web-apps',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'Recharts'],
    details: {
      overview:
        'Delivered a secure portal where marketing clients review campaign performance, download reports, and collaborate with their account teams.',
      abilities: [
        'Displays unified dashboards across paid, organic, and email channels',
        'Lets clients annotate charts and request strategy changes in-app',
        'Exports branded PDF reports generated on demand',
        'Handles granular role-based access so teams only see their brands',
      ],
      setup:
        'Next.js front-end backed by Supabase auth and row-level security. CRON jobs sync channel metrics nightly before rendering visualizations with Recharts.',
      architecture:
        'Modular API routes combine cached metrics with live annotations, ensuring fast loads while keeping collaboration real time.',
      notes:
        'Cut weekly status call prep time by 10 hours and boosted client satisfaction scores.',
    },
  },
  {
    id: 402,
    title: 'Event Registration Platform',
    subtitle: 'Ticketing portal for hybrid conferences',
    category: 'web-apps',
    tech: ['Remix', 'Prisma', 'PostgreSQL', 'Stripe'],
    details: {
      overview:
        'Designed a modern event app where attendees register, manage schedules, and switch between in-person and virtual experiences seamlessly.',
      abilities: [
        'Supports tiered ticketing with coupon codes and corporate bundles',
        'Provides personalized agendas that sync with calendar apps',
        'Streams live sessions with gated access for virtual attendees',
        'Automates badge printing and check-in via QR codes',
      ],
      setup:
        'Remix handles server-side rendering while Prisma manages data access. Stripe powers payments and webhooks feed attendee updates to on-site staff tools.',
      architecture:
        'Isomorphic app with cached public pages and authenticated dashboards, ensuring fast performance across devices and network conditions.',
      notes:
        'Processed 6,000+ registrations with zero payment issues and reduced on-site check-in times by half.',
    },
  },
  {
    id: 403,
    title: 'Property Maintenance Hub',
    subtitle: 'Resident service request application',
    category: 'web-apps',
    tech: ['Vue 3', 'Firebase', 'Cloud Functions', 'Twilio'],
    details: {
      overview:
        'Built a resident portal that centralizes maintenance requests, technician dispatch, and status updates for a regional property manager.',
      abilities: [
        'Allows tenants to submit issues with media uploads and priority tags',
        'Routes tasks to technicians with automatic scheduling and SMS alerts',
        'Tracks SLAs and escalates overdue tickets to supervisors',
        'Provides residents with live status tracking and completion confirmations',
      ],
      setup:
        'Vue 3 SPA backed by Firebase Auth and Firestore; Cloud Functions orchestrate assignment logic and Twilio sends real-time SMS notifications.',
      architecture:
        'Real-time database listeners keep every stakeholder in sync while function triggers maintain data integrity and audit trails.',
      notes:
        'Cut maintenance resolution times by 35% and improved resident satisfaction ratings by 22%.',
    },
  },
  {
    id: 404,
    title: 'Ops Insights Dashboard',
    subtitle: 'Operational command center for COOs',
    category: 'web-apps',
    tech: ['React', 'GraphQL', 'Apollo Client', 'AWS Lambda'],
    details: {
      overview:
        'Executive dashboard that consolidates KPIs from finance, operations, and customer success teams into a single command center.',
      abilities: [
        'Visualizes live metrics with drill-down capabilities and saved views',
        'Runs what-if models using embedded scenario planning widgets',
        'Alerts stakeholders when thresholds are breached with email and Slack notifications',
        'Archives snapshots for quarterly reporting and board packs',
      ],
      setup:
        'React front-end consuming a GraphQL API layer powered by AWS Lambda resolvers that aggregate data from ERP, CRM, and support systems.',
      architecture:
        'Event-driven data ingestion pipeline normalizes source feeds into a shared warehouse, while the GraphQL layer resolves performant queries for the UI.',
      notes:
        'Enabled leadership to spot operational bottlenecks days earlier and act with confidence.',
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
