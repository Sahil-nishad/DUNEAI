// ─────────────────────────────────────────
// DUNEAI — Products & Services Data
// ─────────────────────────────────────────

export const portfolioProjects = [
  {
    id: "01",
    name: "Hospital Appointment Agent",
    category: "agent",
    tag: "AI Agent",
    icon: "🏥",
    desc: "Autonomous AI agent managing patient scheduling, reminders, cancellations, and doctor availability in real-time via voice + chat.",
    link: "#"
  },
  {
    id: "02",
    name: "Company Brain",
    category: "saas",
    tag: "SaaS Tool",
    icon: "🧩",
    desc: "Internal knowledge search assistant with RAG, document ingestion, permission-aware retrieval, and Google Drive connector for enterprise teams.",
    link: "#"
  },
  {
    id: "03",
    name: "AI Billing Dashboard",
    category: "saas",
    tag: "SaaS Tool",
    icon: "📊",
    desc: "Intelligent billing SaaS that auto-generates invoices, detects anomalies, forecasts revenue, and flags churn risk using ML models.",
    link: "#"
  },
  {
    id: "04",
    name: "Stock Prediction ML Model",
    category: "ml",
    tag: "ML Model",
    icon: "📈",
    desc: "LSTM + Transformer hybrid model trained on NSE/BSE data delivering next-day price signals, sentiment fusion, and F&O strategy scoring.",
    link: "#"
  },
  {
    id: "05",
    name: "Conversational WhatsApp AI",
    category: "agent",
    tag: "AI Agent",
    icon: "💬",
    desc: "Multi-turn conversational agent on WhatsApp Business API with memory, tool use, order tracking, and escalation routing to human support.",
    link: "#"
  },
  {
    id: "06",
    name: "Client Automation System",
    category: "agent",
    tag: "AI Agent",
    icon: "⚙️",
    desc: "End-to-end workflow automation replacing 200+ hrs/month of manual ops — from lead capture to proposal generation to client onboarding.",
    link: "#"
  }
];

export const servicesData = [
  {
    id: "01",
    icon: "🤖",
    title: "AI Agents Development",
    shortDesc: "Autonomous agents that reason, plan and act — from customer bots to multi-agent orchestration.",
    fullDesc: "We build autonomous agents that reason, plan and act. From customer-facing bots to complex multi-agent orchestration systems that handle real business workflows end-to-end.",
    tech: ["LangChain", "AutoGen", "OpenAI", "FastAPI"],
    category: "agent"
  },
  {
    id: "02",
    icon: "🧠",
    title: "Machine Learning Solutions",
    shortDesc: "Custom ML pipelines, predictive models, and fine-tuned LLMs trained on your domain data.",
    fullDesc: "Custom ML pipelines, predictive models, and fine-tuned LLMs trained on your domain data. From forecasting to classification to generative systems at production scale.",
    tech: ["PyTorch", "Scikit-learn", "HuggingFace", "MLflow"],
    category: "ml"
  },
  {
    id: "03",
    icon: "⚡",
    title: "SaaS Product Engineering",
    shortDesc: "End-to-end AI SaaS micro-products with clean architecture and beautiful interfaces.",
    fullDesc: "End-to-end AI SaaS micro-products with clean architecture, API-first design, scalable infra, and beautiful interfaces built to ship fast and scale reliably.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Stripe"],
    category: "saas"
  },
  {
    id: "04",
    icon: "🔁",
    title: "Business Automation Systems",
    shortDesc: "Replace manual workflows with intelligent automation across your entire stack.",
    fullDesc: "Replace manual workflows with intelligent automation. Integrate AI into your existing stack — CRM, ERP, billing, communications, and operations for maximum efficiency.",
    tech: ["n8n", "Zapier", "Python", "REST APIs"],
    category: "automation"
  }
];

export const processSteps = [
  {
    num: "01",
    title: "Understand Business",
    desc: "Deep discovery session: business model, bottlenecks, data assets, and desired outcomes. We map the AI opportunity precisely.",
    color: "gold"
  },
  {
    num: "02",
    title: "Design AI System",
    desc: "Architecture design, model selection, data flow, and UX wireframes. Full tech spec before a single line of code is written.",
    color: "gold"
  },
  {
    num: "03",
    title: "Build & Train",
    desc: "Agile sprints with weekly demos. We build the backend, train models, integrate APIs, and stress-test against real-world scenarios.",
    color: "gold"
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "Production deployment, monitoring dashboards, performance tuning, and ongoing model drift management. We own the outcome.",
    color: "blue"
  }
];
