import { ResumeData } from '../types/portfolio';

export const resumeData: ResumeData = {
  name: "Bhavya Kela",
  phone: "+91 97730 93843",
  email: "bhavyakela@gmail.com",
  github: "Bhavyakela07",
  githubUrl: "https://github.com/Bhavyakela07",
  
  summaryFullStack: "Final-year Computer Science student (2027) with hands-on full-stack experience designing and building REST APIs across React, TypeScript, Node.js, Express.js, and FastAPI, backed by relational schema design in PostgreSQL and working knowledge of AWS (EC2, Lambda, Load Balancing). Ships scalable, reusable, production-grade features end-to-end — from API architecture through UI — with added depth in AI/ML (RAG, computer vision, LLM pipelines).",
  
  summaryAIML: "Final-year Computer Science student (2027) with hands-on experience building Generative AI and LLM-powered systems — including production-grade RAG pipelines, prompt engineering, computer vision, and NLP — using Python and full-stack tools (React/TypeScript, FastAPI). Experienced integrating and evaluating AI models and platforms (Gemini, Groq/Llama 3, YOLOv8) to build proof-of-concept and production-ready AI solutions.",

  skills: [
    {
      title: "AI / GenAI & ML",
      category: "ai",
      iconName: "BrainCircuit",
      skills: [
        { name: "RAG Architecture", highlight: true },
        { name: "Groq (Llama 3)", highlight: true },
        { name: "Google Gemini API", highlight: true },
        { name: "YOLOv8 & OpenCV", highlight: true },
        { name: "SpaCy & NLP Pipelines" },
        { name: "Qdrant (Vector DB)", highlight: true },
        { name: "Sentence-Transformers" },
        { name: "Prompt Engineering" },
        { name: "XGBoost & ML Inference" }
      ]
    },
    {
      title: "Backend & Systems",
      category: "backend",
      iconName: "Server",
      skills: [
        { name: "FastAPI", highlight: true },
        { name: "Node.js", highlight: true },
        { name: "Express.js" },
        { name: "REST API Architecture", highlight: true },
        { name: "Webhooks & Automation" },
        { name: "Scalable Software Design" }
      ]
    },
    {
      title: "Frontend Engineering",
      category: "frontend",
      iconName: "Layout",
      skills: [
        { name: "React 19 / 18", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Framer Motion", highlight: true },
        { name: "HTML5 / CSS3" },
        { name: "Recharts & Glassmorphic UI" }
      ]
    },
    {
      title: "Databases & Storage",
      category: "database",
      iconName: "Database",
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "Qdrant Vector DB", highlight: true },
        { name: "MongoDB" },
        { name: "Relational Schema Design" }
      ]
    },
    {
      title: "Languages",
      category: "languages",
      iconName: "Code2",
      skills: [
        { name: "Python", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "JavaScript" },
        { name: "Java" },
        { name: "C++" },
        { name: "SQL" }
      ]
    },
    {
      title: "Tools & Cloud Platforms",
      category: "tools",
      iconName: "Wrench",
      skills: [
        { name: "Git & GitHub", highlight: true },
        { name: "Docker" },
        { name: "AWS (EC2, Lambda, ALB)" },
        { name: "Streamlit" },
        { name: "Postman" }
      ]
    }
  ],

  projects: [
    {
      id: "recoverOS",
      title: "RecoverOS",
      subtitle: "AI-Governed Payment Recovery System",
      description: "Designed an AI-governed payment revenue recovery layer combining an XGBoost probability model (p_recovery) with a deterministic Policy Engine enforcing IST quiet hours (22:00–08:00 IST), ₹50k escalation caps, and fail-closed safety guardrails for Razorpay AI Buildathon 2026.",
      bullets: [
        "Architected a dual-engine architecture: AI ML Engine recommends recovery probability while a Deterministic Policy Engine holds absolute governing authority.",
        "Implemented calibrated probability inference using CalibratedClassifierCV (XGBoost) with 80/20 train/test holdout validation.",
        "Built multi-variable rule enforcement for 24h/7d contact caps, IST quiet hours (22:00–08:00), ₹50k human review escalations, and database-authoritative audit trails."
      ],
      modeFocus: "both",
      tags: ["Razorpay Buildathon", "XGBoost", "FastAPI", "Python", "React", "PostgreSQL", "Policy Engine"],
      githubUrl: "https://github.com/Bhavyakela07/RecoverOS",
      featured: true,
      metrics: [
        { label: "Architecture", value: "AI Recommends / Policy Governs" },
        { label: "Quiet Hours", value: "22:00-08:00 IST Enforced" },
        { label: "Escalation", value: "₹50k Auto-Human Review" }
      ],
      demoType: "recoverOS",
      gradient: "from-blue-600/30 via-indigo-600/20 to-purple-600/30"
    },
    {
      id: "skill-gap-analyzer",
      title: "Skill-Gap-Analyzer",
      subtitle: "AI-Powered Resume & Job Matching Platform",
      description: "Production-grade Hybrid RAG pipeline & multi-stage NLP system combining SpaCy exact matching, Qdrant vector search, and Groq Llama 3 LLM verification to eliminate false-positive resume skill matches by ~90%.",
      bullets: [
        "Architected a Hybrid Retrieval-Augmented Generation (RAG) pipeline in Python, integrating Qdrant vector search and Groq's Llama 3 LLM, reducing false-positive skill matches by ~90%.",
        "Engineered a multi-stage NLP and prompt-engineering pipeline (v2.2) combining SpaCy exact matching, semantic search, and LLM verification for borderline resume-to-job matches.",
        "Evaluated LLM inference providers and selected Groq over GPU models, leveraging its LPU hardware for up to 18x faster text generation.",
        "Shipped a reusable React 19 + TypeScript component library with glassmorphic UI, Framer Motion, and Recharts."
      ],
      modeFocus: "both",
      tags: ["React 19", "TypeScript", "FastAPI", "Python", "Qdrant", "Groq Llama 3", "SpaCy", "Tailwind CSS v4"],
      githubUrl: "https://github.com/Bhavyakela07/Skill-Gap-Analyzer",
      featured: true,
      metrics: [
        { label: "False Positive Reduction", value: "~90%" },
        { label: "LPU Speedup", value: "18x Faster" },
        { label: "NLP Pipeline", value: "v2.2 Multi-Stage" }
      ],
      demoType: "skillGap",
      gradient: "from-indigo-600/30 via-cyan-600/20 to-emerald-600/30"
    },
    {
      id: "kavaach",
      title: "KAVAACH",
      subtitle: "AI Road Safety & Infrastructure Monitoring System",
      description: "Full-stack real-time infrastructure monitoring platform serving fine-tuned YOLOv8 computer vision model inferences over FastAPI REST APIs with sub-second latency and geo-tagged detection overlays in React UI.",
      bullets: [
        "Fine-tuned a YOLOv8 computer-vision model into a full-stack detection system achieving real-time pothole identification with sub-second inference latency.",
        "Built a FastAPI backend exposing REST API endpoints to serve YOLOv8 inference and geo-tagged detection overlays to React.",
        "Designed a PostgreSQL schema to store and serve location-tagged detection metadata maintaining consistent sub-second response times in production."
      ],
      modeFocus: "both",
      tags: ["React", "FastAPI", "Python", "YOLOv8", "OpenCV", "PostgreSQL", "Computer Vision"],
      githubUrl: "https://github.com/Bhavyakela07/KAVAACH",
      featured: true,
      metrics: [
        { label: "Inference Speed", value: "< 1 Sec" },
        { label: "Model", value: "YOLOv8 Custom Fine-tuned" },
        { label: "Database", value: "PostgreSQL Geo-Overlays" }
      ],
      demoType: "kavaach",
      gradient: "from-amber-600/30 via-orange-600/20 to-red-600/30"
    },
    {
      id: "perspectai",
      title: "PerspectAI",
      subtitle: "AI Misinformation & Fact-Checking Platform",
      description: "AI-driven fact-checking platform powered by Google Gemini API and FastAPI that classifies claims as True/False/Misleading with confidence scoring, structuring 100% of LLM outputs into parseable JSON.",
      bullets: [
        "Designed and prompt-engineered a Gemini-based fact-checking pipeline that classifies claims as True/False/Misleading with confidence scoring.",
        "Structured 100% of LLM outputs into strictly parseable JSON for real-time UI verdicts.",
        "Built FastAPI endpoints to construct optimized generative-AI prompts and parse responses across complex edge cases."
      ],
      modeFocus: "aiml",
      tags: ["React", "FastAPI", "Python", "Google Gemini API", "LLM Prompting", "JSON Schema"],
      githubUrl: "https://github.com/Bhavyakela07/PerspectAI",
      featured: true,
      metrics: [
        { label: "LLM Output Reliability", value: "100% Structured JSON" },
        { label: "Classification", value: "True / False / Misleading" },
        { label: "Backend", value: "FastAPI REST API" }
      ],
      demoType: "perspectAI",
      gradient: "from-cyan-600/30 via-blue-600/20 to-indigo-600/30"
    },
    {
      id: "ai-virtual-photographer",
      title: "AI Virtual Photographer",
      subtitle: "Virtual Try-On System",
      description: "Generative-AI proof-of-concept chaining dual Gemini Vision API calls (garment understanding -> outfit compositing) into an automated Streamlit workflow turning images into realistic outfit renders.",
      bullets: [
        "Prototyped a generative-AI workflow chaining two Gemini Vision API calls (garment understanding → outfit compositing) into a single-click Streamlit workflow.",
        "Collapsed a multi-step manual compositing process into automated single-click execution, keeping demo turnaround under a day.",
        "Packaged the AI pipeline into a reusable, shareable tool testable with zero frontend overhead under Git version control."
      ],
      modeFocus: "aiml",
      tags: ["Python", "Streamlit", "Google Gemini Vision API", "Generative Vision", "Git"],
      githubUrl: "https://github.com/Bhavyakela07/AI-Virtual-Photographer",
      featured: true,
      metrics: [
        { label: "Pipeline", value: "Dual Gemini Vision Chain" },
        { label: "Turnaround", value: "< 1 Day Demo" },
        { label: "UI", value: "Streamlit Workflow" }
      ],
      demoType: "virtualPhotographer",
      gradient: "from-purple-600/30 via-pink-600/20 to-rose-600/30"
    }
  ],

  education: [
    {
      institution: "Parul University",
      location: "Vadodara, Gujarat",
      degree: "B.Tech in Computer Science & Engineering",
      period: "2023 – 2027",
      details: "CGPA: 7.20 / 10 | Expected Graduation: 2027 | Coursework in RAG, Computer Vision, Cloud Infrastructure (AWS EC2, Lambda), Distributed Systems & API Architecture"
    },
    {
      institution: "SS Divine",
      location: "Ahmedabad, Gujarat",
      degree: "Class 12th (Senior Secondary)",
      period: "2023",
      details: "Score: 69% | Focus on Mathematics, Physics, and Computer Science"
    },
    {
      institution: "SMT M M Mehta English Medium School",
      location: "Palanpur, Gujarat",
      degree: "Class 10th (Secondary School)",
      period: "2021",
      details: "Score: 66.67% | Foundation in Science & Mathematics"
    }
  ]
};
