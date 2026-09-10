import { ApplicantProfile } from '../types';

export const SHIKHAR_PROFILE: ApplicantProfile = {
  name: 'Shikhar Singhal',
  phone: '+91 7976080282',
  email: 'shikhar.singhal55@gmail.com',
  location: 'Bengaluru, India',
  currentTitle: 'Senior Software Developer',
  currentCompany: 'msg global solutions (Nexontis) — PaPM Cloud',
  experienceYears: 6,
  education: {
    institution: 'Indian Institute of Technology, Kharagpur (IIT Kharagpur)',
    degree: 'Dual Degree — B.Tech + M.Tech',
    field: 'Exploration Geophysics',
    gradYear: 'Jul 2015 – May 2020',
    gpa: '7.69 / 10',
    highlights: [
      'Relevant Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Database Systems',
      'M.Tech Thesis: OpenCV-based curvature/flexure analysis for fracture characterization from 3D seismic data',
      'Ranked 4th among 1000+ teams across 7 IITs in American Express Credit Analytics Challenge',
    ],
  },
  skills: {
    languages: ['TypeScript', 'JavaScript (Node.js)', 'Python', 'SQL'],
    frameworks: ['NestJS', 'Express.js', 'Node.js', 'BullMQ', 'Git'],
    databases: ['PostgreSQL', 'Redis', 'SAP HANA Cloud'],
    cloudAndDevOps: ['AWS', 'Docker', 'Kubernetes', 'SAP BTP', 'CI/CD (Bitbucket Pipelines)', 'TypeORM', 'OpenAPI'],
    architecture: ['Distributed Systems', 'Event-Driven Architecture', 'Multi-tenant SaaS', 'Kafka', 'RabbitMQ', 'JWT / RBAC', 'Prometheus & ELK'],
    mlAndData: ['RAG', 'LangChain', 'LLM', 'VectorDB', 'spaCy', 'NLTK', 'Word2Vec', 'XGBoost', 'Random Forest', 'OpenCV'],
  },
  highlights: [
    '6+ years building enterprise-scale distributed backend systems with TypeScript, Node.js, and NestJS',
    'Architected an event-driven notification microservice cutting integration time by ~60% across multi-tenant SaaS platform',
    'Built idempotent cross-tenant migration engine on SAP HANA Cloud with ACID consistency across 50+ enterprise tenants',
    'Engineered JWT/RBAC security guards & Prometheus observability cutting production MTTD by ~40%',
    'IIT Kharagpur Dual Degree graduate with competitive programming track record (200+ LeetCode DSA solved)',
    'Dual expertise in high-throughput backend infrastructure (BullMQ, Kafka, Redis) and ML/NLP systems',
  ],
  targetRoles: [
    'Senior Software Developer',
    'Senior Backend Engineer',
    'Lead Backend Engineer / SDE-3',
    'Staff Software Engineer',
    'Distributed Systems Engineer',
  ],
  targetLocations: [
    'Bengaluru (HSR Layout, Koramangala, Bellandur, Indiranagar, Whitefield)',
    'Hybrid Bengaluru',
    'Remote (India)',
  ],
  targetCtc: '₹45,00,000 - ₹75,00,000 PA',
};

export const RESUME_RAW_TEXT = `Shikhar Singhal
+91 7976080282 | shikharsinghal55.iitkgp@gmail.com | Bengaluru, India

PROFESSIONAL SUMMARY
Senior software engineer with 6+ years building backend systems at enterprise scale, specializing in multi-tenant TypeScript/Node.js/NestJS architecture — RESTful APIs, authentication, and distributed backend infrastructure. Transitioned from a quantitative geophysics background at IIT Kharagpur, bringing an analytical, data-driven approach to system design; earlier background in ML, NLP, and computer vision.

EDUCATION
Indian Institute of Technology, Kharagpur (IIT Kharagpur)
Dual Degree — B.Tech + M.Tech, Exploration Geophysics (Jul 2015 – May 2020)
• GPA: 7.69/10 | Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Database Systems
• M.Tech Thesis: OpenCV-based curvature/flexure analysis for fracture characterization from 3D seismic data

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (Node.js), Python, SQL
• Frameworks: NestJS, Express, Node.js, BullMQ, Git
• Databases: SAP HANA Cloud, PostgreSQL, Redis
• Auth & Security: JWT, OAuth, NestJS Guards, Interceptors, Middleware
• Observability: Prometheus, Structured Logging, ELK, Monitoring
• Message Queues: Kafka, RabbitMQ
• Cloud / Infra: SAP BTP, AWS, TypeORM, OData v2/v4, Docker, Kubernetes, CI/CD, OpenAPI
• Testing: Jest, Unit & Integration Tests
• ML / Data: Word2Vec, spaCy, NLTK, TF-IDF, XGBoost, Random Forest, OpenCV, RAG, LangChain, LangGraph, VectorDB, LLM

EXPERIENCE
Senior Software Developer | msg global solutions (Nexontis) — PaPM Cloud (May 2023 – Present) | Bengaluru, India
• Core senior developer on SAP PaPM Cloud, an enterprise profit & performance management product on SAP BTP serving enterprise customers (Halliburton, SBI Mutual Fund, Puma, Nestlé).
• Architected an event-driven notification library in a large monorepo using TypeScript/NestJS, unifying fragmented codebase into single extensible REST API module supporting in-app, email, and scheduled notifications across multi-tenant SaaS platform — cut integration time by ~60%.
• Delivered application-wide i18n by propagating locale context end-to-end from OData v4 request headers through NestJS middleware and interceptors, serving 10+ locales; migrated template engine to LiquidJS.
• Implemented JWT-based authentication middleware and NestJS Guards enforcing RBAC and per-tenant authorization across all REST API endpoints with validation pipes for rate limiting.
• Integrated Prometheus instrumentation and structured per-tenant logging via custom NestJS interceptors — reduced MTTD by ~40% and cut MTTR across 100K+ daily log events.
• Designed business-function-level SQL data partitioning on SAP HANA Cloud using TypeORM, enforcing constraints and pessimistic locking for ACID consistency across 50+ tenants.
• Delivered backend features spanning BullMQ task queues, Redis caching, and NestJS microservices.

Data Scientist | TCG Digital Pvt. Ltd (Nov 2020 – Apr 2023) | Bengaluru, India
• Built an NLP pipeline to parse and rank bulk resumes against JD requirements using NLTK, spaCy, Word2Vec, TF-IDF, and OCR.
• Engineered a computer vision pipeline (Mask R-CNN, VGG) to classify industrial corrosion severity.
• Conducted Apriori-based market basket analysis (+15% revenue) and built Spark-backed HR analytics dashboard (-50% HR workload).
• Optimized real-time race routing via Google Maps API — team finished 1st at the German 24H Hydrogen Rally 2021.

Data Science Intern | Mystifly (May 2019 – Jul 2019) | India
• Developed an ML model (XGBoost, Random Forest) with 87%+ accuracy to predict airline price shocks via RESTful API — reduced supplier hits by 60%.

ACHIEVEMENTS
• American Express Credit Analytics Challenge — Ranked 4th among 1000+ teams across 7 IITs with Random Forest credit segmentation model (SMOTE).
• Competitive Programming — 200+ DSA problems solved on LeetCode.`;
