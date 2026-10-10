// Public project content. Only supported claims belong here.
// Unresolved claims and hidden metrics live in docs/content-review.md (never imported).

export type Stage = "live" | "prototype" | "research" | "in-progress" | "academic";

export const stageLabel: Record<Stage, string> = {
  live: "Live",
  prototype: "Prototype",
  research: "Research",
  "in-progress": "In progress",
  academic: "Academic",
};

export type Link = { label: string; href: string };

export type CaseSection = { heading: string; body?: string[]; points?: string[] };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stages: Stage[];
  category: "featured" | "product" | "academic";
  stack: string[];
  links: Link[];
  // Featured-card views. A view is omitted when it has no real material.
  contribution?: string[];
  architecture?: string[];
  evidence?: { text: string; href?: string }[];
  caseStudy?: {
    stageNote: string;
    role: string[];
    team?: { intro: string; members: { name: string; title: string; focus: string; isMe?: boolean }[] };
    architectureIntro: string;
    architecture: { label: string; detail: string }[];
    sections: CaseSection[];
  };
  image?: { src: string; width: number; height: number; alt: string };
  // Real product screenshots, captured from the live product (not mock-ups).
  screens?: Screen[];
  mobileScreen?: Screen;
};

export type Screen = { id: string; label: string; src: string; width: number; height: number; alt: string; caption: string };

export const projects: Project[] = [
  {
    slug: "nextact",
    name: "NextAct",
    tagline: "Verify before you act.",
    summary:
      "A decision-support tool for the moment before you click, pay or share a code. It turns a suspicious message, link, document or payment request into claims, evidence, contradictions, unknowns, a risk level and the safest next step.",
    stages: ["live"],
    category: "featured",
    stack: ["Next.js", "TypeScript", "pnpm monorepo", "Zod", "Drizzle", "Vitest", "Manifest V3"],
    links: [{ label: "Visit nextact.tech", href: "https://nextact.tech" }],
    screens: [
      {
        id: "landing",
        label: "Landing",
        src: "/images/nextact/v2/landing.webp",
        width: 1600,
        height: 967,
        alt: "NextAct homepage: 'Verify before you act', a box to paste a message, and the Decision Lens demonstration below it.",
        caption: "The public homepage at nextact.tech: paste a message and check it. The Decision Lens below is a labelled demonstration.",
      },
      {
        id: "method",
        label: "Method",
        src: "/images/nextact/v2/method.webp",
        width: 1600,
        height: 1000,
        alt: "NextAct 'How NextAct decides' page showing six steps: claims, evidence, independence, unknowns, policy, what to do.",
        caption: "The published method: deterministic steps, with AI kept outside the risk decision.",
      },
      {
        id: "check",
        label: "Check",
        src: "/images/nextact/v2/check.webp",
        width: 1600,
        height: 1000,
        alt: "NextAct payment check form with a message box, file upload and made-up examples.",
        caption: "Starting a check. No account needed; one-time codes and card numbers are removed before analysis.",
      },
      {
        id: "result",
        label: "Result",
        src: "/images/nextact/v2/result.webp",
        width: 1600,
        height: 1006,
        alt: "NextAct result for a payment-change message: what's happening, the evidence, and the next action 'Do not proceed yet', marked high risk.",
        caption: "A real NextAct result for a synthetic payment-change message: what's happening, the evidence, and the safest next action.",
      },
    ],
    mobileScreen: {
      id: "mobile",
      label: "Mobile",
      src: "/images/nextact/v2/mobile.webp",
      width: 520,
      height: 1040,
      alt: "NextAct homepage on a phone.",
      caption: "nextact.tech on a 390px phone screen.",
    },
    contribution: [
      "Case-submission and browser-extension APIs",
      "Workspace-scoped database access",
      "SSRF-controlled URL, DNS and TLS evidence collection",
      "Adversarial API tests and GitHub Actions checks",
      "Docker and Compose configuration",
      "AI adapter interfaces with redaction and output validation",
    ],
    architecture: [
      "Next.js App Router web app with versioned API handlers",
      "Deterministic analyzers for URLs, text, email, DNS, RDAP and TLS",
      "Versioned risk engine. The AI layer can explain but never sets the risk level",
      "Shared Zod contracts across API, engine and AI layer",
      "Chrome and Edge extension (Manifest V3) that checks a page on an explicit click",
    ],
    evidence: [
      { text: "Public check is live at nextact.tech", href: "https://nextact.tech" },
      { text: "Production smoke suite: 133 of 133 checks passing (recorded 28 Sep 2026)" },
      { text: "Detection quality has not yet been independently validated" },
    ],
    caseStudy: {
      stageNote:
        "The public check, results, history, sharing and deletion run at nextact.tech. NextAct Business, a payment-change guard for finance teams, is an invitation-only preview. The browser extension is built and tested locally but not yet enabled against production.",
      role: [
        "I built the case-submission and browser-extension APIs, and the workspace-scoped database access behind them.",
        "I wrote the evidence collection for URLs, DNS and TLS with server-side request forgery controls, so a submitted link can't be used to reach internal addresses.",
        "I wrote adversarial API tests and the GitHub Actions checks, plus the Docker and Compose setup.",
        "I designed the AI adapter interfaces: redaction before a model sees anything, and validation of what comes back.",
      ],
      architectureIntro:
        "A pnpm monorepo. The web app is thin. Analysis, risk policy and AI access live in separate packages with shared contracts.",
      architecture: [
        { label: "Submit", detail: "Message, link, PDF, saved email or image, through the site or the extension" },
        { label: "Extract", detail: "What is being asked: pay, sign in, share a code, change bank details" },
        { label: "Collect evidence", detail: "URL, DNS, RDAP and TLS lookups behind SSRF controls" },
        { label: "Evaluate", detail: "Versioned rules produce a risk band, with contradictions and unknowns listed" },
        { label: "Explain", detail: "An optional AI layer, redacted and validated, that cannot change the band" },
        { label: "Next step", detail: "Always through a channel independent of the suspicious message" },
      ],
      sections: [
        {
          heading: "Key decisions",
          points: [
            "NextAct never says something is safe. The strongest result is that no material risk was observed and specific facts were verified, with the evidence shown.",
            "The risk level comes from a deterministic engine. A language model can help explain a result but can never set or raise it.",
            "Unknowns are first-class output. What couldn't be checked is shown next to what could.",
          ],
        },
        {
          heading: "Validation and failure handling",
          points: [
            "Unit and adversarial API tests run in CI on every change.",
            "A production smoke suite checks the live site. The last recorded run passed 133 of 133 checks (28 Sep 2026).",
            "The extension has its own verification run in Edge, covering popup accessibility.",
          ],
        },
        {
          heading: "Limitations and next steps",
          points: [
            "Detection figures so far are regression results on cases written by the author. There is no independent accuracy figure yet.",
            "Analysis is written for English. Text that is mostly Urdu or Roman Urdu is flagged as not read rather than guessed at.",
            "No penetration test has been performed yet.",
          ],
        },
      ],
    },
  },
  {
    slug: "menzync",
    name: "Menzync",
    tagline: "Emotion research and student check-ins.",
    summary:
      "Menzync explores affordable, private wellbeing support for university students in Pakistan. It runs as two separate tracks: emotion-recognition research, and a student check-in prototype.",
    stages: ["research", "prototype"],
    category: "featured",
    stack: ["Python", "FastAPI", "SQLite", "React", "Vite", "XLM-RoBERTa", "scikit-learn", "pytest", "Vitest"],
    links: [],
    contribution: [
      "Roman Urdu and English text classification: a TF-IDF + linear SVM baseline, XLM-RoBERTa, and a Gradio demo",
      "A local FastAPI + SQLite prototype with consent-gated saved history, export and deletion",
      "pytest and Vitest tests for account isolation and input validation",
      "Evaluation tooling: macro-F1, per-class metrics, confusion matrices and calibration",
    ],
    architecture: [
      "Research track: text classifier, facial-expression experiment, evaluation harness",
      "A designed text + speech + face fusion step that can abstain. Not a trained fused model",
      "Product track: React/Vite web app → FastAPI → local SQLite",
      "Models are not connected to the product yet",
    ],
    caseStudy: {
      stageNote:
        "Research and a local prototype, kept deliberately separate. The prototype doesn't run any emotion model yet. It is our Final Year Project and an early-stage startup, selected as one of 24 startups in the National Idea Bank IV 2026 pre-incubation programme.",
      role: [
        "I founded Menzync and lead the team, setting its direction and owning the ML/AI architecture.",
        "Developed the Roman Urdu / English text-classification work, progressing from a TF-IDF + linear SVM baseline to XLM-RoBERTa, with a Gradio demo.",
        "Designed the local prototype's API and data layer, with automated tests for account isolation and input validation.",
        "Built the evaluation and data-audit tooling that keeps the research track measurable and accountable.",
      ],
      team: {
        intro:
          "Menzync is a team effort, built as our Final Year Project. I founded it; each co-founder owns a core part of the work.",
        members: [
          { name: "Muhammad Shahwaiz", title: "Founder", focus: "Team lead · ML/AI architecture", isMe: true },
          { name: "Zuha Kamal", title: "Co-founder", focus: "Research & Product" },
          { name: "Rahimah Faisal", title: "Co-founder", focus: "Machine Learning & AI" },
          { name: "Muniza Ansir", title: "Co-founder", focus: "Full-Stack Development" },
        ],
      },
      architectureIntro:
        "Two tracks that meet only when a model has been evaluated well enough to connect. That hasn't happened yet, and the site doesn't pretend otherwise.",
      architecture: [
        { label: "Research · text", detail: "Roman Urdu / English classifiers: TF-IDF + linear SVM, then XLM-RoBERTa" },
        { label: "Research · face", detail: "Facial-expression experiments on a public benchmark dataset" },
        { label: "Research · fusion", detail: "A typed fusion step covering all seven modality combinations, with abstention" },
        { label: "Research · evaluation", detail: "Macro-F1, per-class metrics, confusion matrix, Brier score, log loss, ECE" },
        { label: "Product · check-in", detail: "Anonymous check-in in English or Roman Urdu. Nothing saved by default" },
        { label: "Product · data", detail: "Saving needs an account, history permission and a per-check-in choice. Export and delete anytime" },
      ],
      sections: [
        {
          heading: "Key decisions",
          points: [
            "Nothing is saved unless the student asks for it, three separate times: an account, a history permission, and a choice on that check-in.",
            "Research and training permissions are switched off in the prototype, so check-ins can't feed a dataset.",
            "The fusion step is allowed to abstain. With weak or conflicting signals, saying nothing is better than a confident guess.",
          ],
        },
        {
          heading: "Validation",
          points: [
            "API and frontend tests cover account isolation and input validation.",
            "A data-audit tool checks dataset rights, withdrawals and train/test overlap, and fails loudly when it finds a problem.",
          ],
        },
        {
          heading: "Limitations and next steps",
          points: [
            "No text, speech or face model is connected to the prototype yet.",
            "The prototype runs locally on test content. It is not a public mental-health service and makes no clinical claims.",
            "Next: connect an evaluated text model behind the abstention rule, then test it with real users under proper consent.",
          ],
        },
      ],
    },
  },
  {
    slug: "emosense-ai",
    name: "EmoSense AI",
    tagline: "An LLM backend that keeps working when the model doesn't.",
    summary:
      "A text-analysis app built for the CREATE X 2026 AI App Development Challenge. My part was the Express backend: Gemini calls constrained to structured JSON, input validation, logging, and fallbacks that keep the app usable when the model is unavailable.",
    stages: ["prototype"],
    category: "featured",
    stack: ["TypeScript", "Express", "Gemini API", "React 19", "Tailwind CSS"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/muhammadshahwaiz40/EmoSense-AI---Text-Emotional-Intelligence-Platform",
      },
    ],
    contribution: [
      "Three Express endpoints: text analysis, drafted-reply review, and persona practice chat",
      "Gemini responses constrained by a JSON response schema",
      "Request validation with clear 400 errors",
      "Rule-based fallbacks when the API key is missing or a model call fails",
    ],
    architecture: [
      "POST /api/analyze: emotion, sentiment, urgency and risk flags",
      "POST /api/simulate-response: reviews a drafted reply against the original message",
      "POST /api/persona-chat: practice conversation with a chosen persona",
      "Every route: validate → call Gemini with a schema → or return a labelled fallback",
    ],
    evidence: [
      {
        text: "Source code on GitHub",
        href: "https://github.com/muhammadshahwaiz40/EmoSense-AI---Text-Emotional-Intelligence-Platform",
      },
    ],
    caseStudy: {
      stageNote:
        "A competition prototype with public source code. There is no hosted demo, and the emotion labels haven't been measured against a labelled dataset.",
      role: [
        "I built the Express server: three endpoints, their validation, logging and fallbacks.",
        "I defined the JSON schemas the model must answer in, so the interface can render results field by field.",
      ],
      architectureIntro:
        "A React client talks to one Express server. The server is the only place that talks to Gemini.",
      architecture: [
        { label: "Validate", detail: "Missing fields return a 400 with a readable message" },
        { label: "Constrain", detail: "Gemini is called with a JSON MIME type and a response schema" },
        { label: "Fall back", detail: "No key or a failed call returns a rule-based result, labelled as a fallback" },
        { label: "Render", detail: "The client shows emotions, sentiment, urgency and suggested replies" },
      ],
      sections: [
        {
          heading: "Key decisions",
          points: [
            "Structured output over free text. A schema makes a response either usable or clearly failed.",
            "Fallbacks say they are fallbacks. A failed model call returns a result that identifies itself, not something dressed up as model output.",
          ],
        },
        {
          heading: "Limitations",
          points: [
            "Emotion and risk labels haven't been evaluated against a labelled dataset.",
            "It is a decision-support demo, not a clinical or safety tool.",
          ],
        },
      ],
    },
  },
  {
    slug: "clientdesk",
    name: "ClientDesk",
    tagline: "Approval-first client operations for freelancers on WhatsApp.",
    summary:
      "Triages inbound client messages and drafts replies that a person must approve. Client facts are stored only with a verbatim quote checked against the source message. Adds scope briefs, scope-change detection, proposals, follow-ups and invoices. WhatsApp runs through a local simulated provider; the real integrations have not been run against the vendors.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "PostgreSQL (RLS)", "Celery", "Redis", "Next.js", "TanStack Query"],
    links: [],
  },
  {
    slug: "aidesk",
    name: "Aidesk",
    tagline: "Document-grounded customer support.",
    summary:
      "Answers customer questions from a company's own documents with citations. Local MiniLM embeddings and a per-tenant FAISS index, a confidence gate before the model is called, an extractive fallback when no API key is set, and a human escalation queue.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "FAISS", "Sentence-Transformers", "Gemini", "Next.js"],
    links: [],
  },
  {
    slug: "docflow-ai",
    name: "DocFlow AI",
    tagline: "Document processing with a human review step.",
    summary:
      "A six-stage pipeline (preprocess, classify, extract, validate, route, export) where each stage is a retryable background task. Versioned extraction schemas, decimal-exact validation, a review workspace, and a swappable model provider.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Celery", "Redis", "Next.js", "Radix UI"],
    links: [],
  },
  {
    slug: "beacon",
    name: "Beacon",
    tagline: "Knowledge search with cited answers.",
    summary:
      "Indexes uploaded company documents and answers questions with a synthesised, cited answer instead of a list of links. Tenant isolation through Postgres row-level security, Qdrant for retrieval, Claude for synthesis and reranking.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "PostgreSQL (RLS)", "Qdrant", "Celery", "Claude API", "Next.js"],
    links: [],
  },
  {
    slug: "vantra",
    name: "Vantra",
    tagline: "Business management for small teams.",
    summary:
      "A multi-tenant workspace for customers, projects, Kanban tasks and invoicing. Invoice amounts are stored in integer minor units so totals round exactly. Includes an assistant that answers questions about the workspace's own data.",
    stages: ["prototype"],
    category: "product",
    stack: ["Next.js", "React", "Tailwind CSS", "Prisma", "PostgreSQL"],
    links: [],
    image: {
      src: "/images/vantra-home.webp",
      width: 1600,
      height: 635,
      alt: "Vantra marketing homepage with the headline 'Run your entire business from one intelligent workspace.'",
    },
  },
  {
    slug: "sales-automation",
    name: "AI Sales & Lead Automation",
    tagline: "Background lead scoring and outreach drafts.",
    summary:
      "Clients describe their target customer and import leads. Claude scores each lead and drafts outreach in background jobs, so the API never waits on a model call. Includes Stripe webhook idempotency, rate limiting and request tracing.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "Claude API", "Stripe", "Docker"],
    links: [],
  },
  {
    slug: "competitive-intelligence",
    name: "Competitive Intelligence System",
    tagline: "Structured competitor reports from grounded search.",
    summary:
      "Gemini with Google Search grounding researches recent competitor activity and returns a structured report and PDF. Schema fallback, exponential backoff and a concurrency cap keep it inside free-tier rate limits.",
    stages: ["prototype"],
    category: "product",
    stack: ["FastAPI", "Gemini", "Supabase", "ReportLab", "Next.js"],
    links: [],
  },
  {
    slug: "orvia",
    name: "ORVIA",
    tagline: "Trade operations platform.",
    summary:
      "An early-stage platform for exporters, covering buyers, products, quotes, orders, documents and export readiness.",
    stages: ["in-progress"],
    category: "product",
    stack: ["Next.js", "React", "Prisma", "TypeScript", "Zod", "Vitest"],
    links: [],
  },
  {
    slug: "createx-text-app",
    name: "CreateX text analysis app",
    tagline: "Sentiment and zero-shot categorisation.",
    summary:
      "A Streamlit app using DistilBERT for sentiment and BART-Large-MNLI for zero-shot categories, with bulk CSV processing and a Plotly dashboard. Built for CreateX 2026 at UMT Sialkot.",
    stages: ["academic"],
    category: "academic",
    stack: ["Python", "Streamlit", "Hugging Face Transformers", "SQLite", "Plotly"],
    links: [],
  },
  {
    slug: "netflix-testing",
    name: "Netflix testing study",
    tagline: "Software Quality Engineering course project.",
    summary:
      "A test plan, manual and automated test cases, and bug reports for the Netflix website and app, written with Saud Baseer as coursework. Not affiliated with Netflix.",
    stages: ["academic"],
    category: "academic",
    stack: ["Test planning", "Manual testing", "Bug reporting"],
    links: [],
  },
  {
    slug: "deep-learning-coursework",
    name: "Deep learning coursework",
    tagline: "Proposal and experiments.",
    summary:
      "A BiLSTM + 1D-CNN term-project proposal, and a transformer experiment on the FER2013 facial-expression dataset.",
    stages: ["academic"],
    category: "academic",
    stack: ["Python", "PyTorch", "TensorFlow"],
    links: [],
  },
  {
    slug: "network-security-labs",
    name: "Network security labs",
    tagline: "Packet analysis coursework.",
    summary: "Wireshark capture and filtering labs on TCP, HTTP and DNS traffic, plus a cybersecurity audit course project.",
    stages: ["academic"],
    category: "academic",
    stack: ["Wireshark", "Networking"],
    links: [],
  },
  {
    slug: "grade-manager",
    name: "Student grade manager",
    tagline: "C++ console application.",
    summary: "Manages student records and GPA calculation with object-oriented design and file storage.",
    stages: ["academic"],
    category: "academic",
    stack: ["C++", "OOP"],
    links: [],
  },
  {
    slug: "android-tasks",
    name: "Android task manager",
    tagline: "Offline productivity app.",
    summary: "Task categories, priorities and reminders with offline SQLite storage.",
    stages: ["academic"],
    category: "academic",
    stack: ["Java", "Android Studio", "SQLite"],
    links: [],
  },
];

export const featuredProjects = projects.filter((p) => p.category === "featured");
export const caseStudySlugs = projects.filter((p) => p.caseStudy).map((p) => p.slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
