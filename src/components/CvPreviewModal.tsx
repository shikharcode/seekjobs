import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, FileText, CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';
import { SHIKHAR_PROFILE, RESUME_RAW_TEXT } from '../data/shikharProfile';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(RESUME_RAW_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([RESUME_RAW_TEXT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Shikhar_Singhal_IIT_Kharagpur_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Candidate CV Vault (Verified Profile)
              </h2>
              <p className="text-xs text-zinc-400">
                Attached to all 1-Click Recruiter Outreaches & Auto-Pilot Dispatches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Plaintext'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted CV Canvas */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-zinc-50/50 text-zinc-900">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs max-w-2xl mx-auto font-sans">
            
            {/* Header / Contact */}
            <div className="text-center pb-5 border-b border-zinc-200">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                {SHIKHAR_PROFILE.name}
              </h1>
              <div className="text-xs text-zinc-600 mt-1 flex flex-wrap items-center justify-center gap-2">
                <span>{SHIKHAR_PROFILE.phone}</span>
                <span>•</span>
                <span className="font-mono text-indigo-700">{SHIKHAR_PROFILE.email}</span>
                <span>•</span>
                <span>{SHIKHAR_PROFILE.location}</span>
                <span>•</span>
                <span className="text-zinc-500">LinkedIn</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-1 border-b border-zinc-300 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Senior software engineer with 6+ years building backend systems at enterprise scale, specializing in multi-tenant TypeScript/Node.js/NestJS architecture — RESTful APIs, authentication, and distributed backend infrastructure. Transitioned from a quantitative geophysics background at IIT Kharagpur, bringing an analytical, data-driven approach to system design; earlier background in ML, NLP, and computer vision.
              </p>
            </div>

            {/* Education */}
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-1 border-b border-zinc-300 mb-2">
                Education
              </h2>
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <strong className="text-zinc-900 font-bold">Indian Institute of Technology, Kharagpur (IIT Kharagpur)</strong>
                  <div className="text-zinc-600">Dual Degree — B.Tech + M.Tech, Exploration Geophysics</div>
                </div>
                <div className="text-right text-zinc-500">
                  <div>Kharagpur, India</div>
                  <div>Jul 2015 – May 2020</div>
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-zinc-700 mt-1.5 space-y-0.5">
                <li><strong>GPA: 7.69/10</strong> | Relevant Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Database Systems</li>
                <li><strong>M.Tech Thesis:</strong> OpenCV-based curvature/flexure analysis for fracture characterization from 3D seismic data.</li>
              </ul>
            </div>

            {/* Technical Skills */}
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-1 border-b border-zinc-300 mb-2">
                Technical Skills
              </h2>
              <div className="text-xs text-zinc-700 space-y-1">
                <div><strong>Languages:</strong> TypeScript, JavaScript (Node.js), Python, SQL</div>
                <div><strong>Frameworks:</strong> NestJS, Express, Node.js, BullMQ, Git</div>
                <div><strong>Databases:</strong> SAP HANA Cloud, PostgreSQL, Redis</div>
                <div><strong>Auth & Security:</strong> JWT, OAuth, NestJS Guards, Interceptors, Middleware</div>
                <div><strong>Observability:</strong> Prometheus, Structured Logging, ELK, Monitoring</div>
                <div><strong>Message Queues:</strong> Kafka, RabbitMQ</div>
                <div><strong>Cloud / Infra:</strong> SAP BTP, AWS, TypeORM, OData v2/v4, Docker, Kubernetes, CI/CD, OpenAPI</div>
                <div><strong>Testing:</strong> Jest, Unit & Integration Tests</div>
                <div><strong>ML / Data:</strong> Word2Vec, spaCy, NLTK, TF-IDF, XGBoost, Random Forest, OpenCV, RAG, LangChain, LangGraph, VectorDB, LLM</div>
              </div>
            </div>

            {/* Experience */}
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-1 border-b border-zinc-300 mb-2">
                Experience
              </h2>

              {/* Role 1: msg global */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-zinc-900 font-bold">Senior Software Developer</strong>
                    <div className="text-zinc-600 font-medium">msg global solutions (Nexontis) — PaPM Cloud</div>
                  </div>
                  <div className="text-right text-zinc-500">
                    <div>May 2023 – Present</div>
                    <div>Bengaluru, India</div>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 italic mt-0.5">
                  Builds and owns SAP PaPM Cloud, an enterprise profit & performance management product on SAP BTP serving global enterprise customers (Halliburton, SBI Mutual Fund, Puma, Nestlé).
                </p>
                <ul className="list-disc list-inside text-xs text-zinc-700 mt-1.5 space-y-1 leading-relaxed">
                  <li>Architected an event-driven notification library in a large monorepo using TypeScript/NestJS, unifying fragmented codebase into a single extensible REST API module supporting in-app, email, and scheduled notifications across multi-tenant SaaS platform — cut new notification-type integration time by ~60%.</li>
                  <li>Delivered application-wide i18n by propagating locale context end-to-end from OData v4 request headers through NestJS middleware and interceptors, serving 10+ locales; migrated template engine to LiquidJS, resolving a critical security vulnerability.</li>
                  <li>Implemented JWT-based authentication middleware and NestJS Guards enforcing RBAC and per-tenant authorization across all REST API endpoints, with interceptors and validation pipes for rate limiting — ensuring zero unauthorized cross-tenant data access.</li>
                  <li>Integrated Prometheus instrumentation and structured, correlated per-tenant logging via custom NestJS interceptors — reduced MTTD for production incidents by ~40% and cut MTTR across pipelines consuming 100K+ daily log events.</li>
                  <li>Designed business-function-level SQL data partitioning on SAP HANA Cloud using TypeORM, enforcing constraints and pessimistic locking for ACID consistency across 50+ tenants; built an idempotent cross-tenant migration engine with graph-traversal logic that eliminated silent data corruption across migrations of 100K+ records.</li>
                  <li>Owned full-stack delivery of cross-cutting platform features spanning BullMQ task queues, Redis caching, and NestJS microservices — validated via Jest unit/integration tests with CI/CD through Bitbucket Pipelines.</li>
                </ul>
              </div>

              {/* Role 2: TCG Digital */}
              <div className="mb-3">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-zinc-900 font-bold">Data Scientist</strong>
                    <div className="text-zinc-600 font-medium">TCG Digital Pvt. Ltd</div>
                  </div>
                  <div className="text-right text-zinc-500">
                    <div>Nov 2020 – Apr 2023</div>
                    <div>Bengaluru, India</div>
                  </div>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-700 mt-1.5 space-y-1 leading-relaxed">
                  <li>Built an NLP pipeline to parse and rank bulk resumes against JD requirements using NLTK, spaCy, Word2Vec, TF-IDF, and OCR, automating recruiter screening end-to-end; engineered a computer vision pipeline (Mask R-CNN, VGG) to classify industrial corrosion severity.</li>
                  <li>Conducted Apriori-based market basket analysis, contributing to a 15% increase in sales revenue, and built a Spark-backed HR analytics dashboard that reduced HR workload by 50%; optimized real-time race routing via the Google Maps API — team finished 1st at the German 24H Hydrogen Rally 2021.</li>
                </ul>
              </div>

              {/* Role 3: Mystifly */}
              <div>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-zinc-900 font-bold">Data Science Intern</strong>
                    <div className="text-zinc-600 font-medium">Mystifly</div>
                  </div>
                  <div className="text-right text-zinc-500">
                    <div>May 2019 – Jul 2019</div>
                    <div>India</div>
                  </div>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-700 mt-1 space-y-0.5">
                  <li>Developed an ML model (XGBoost, Random Forest) with 87%+ accuracy to predict airline price shocks, deployed via a RESTful API — reduced daily supplier hits by 60%.</li>
                </ul>
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-1 border-b border-zinc-300 mb-2">
                Achievements
              </h2>
              <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
                <li><strong>American Express Credit Analytics Challenge:</strong> Ranked 4th among 1000+ teams across 7 IITs with a Random Forest credit segmentation model (SMOTE).</li>
                <li><strong>Competitive Programming:</strong> 200+ DSA problems solved on LeetCode (arrays, trees, graphs, DP).</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
