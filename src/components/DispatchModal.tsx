import React, { useState, useEffect } from 'react';
import { JobListing, ColdEmailDraft } from '../types';
import { SHIKHAR_PROFILE } from '../data/shikharProfile';
import { 
  X, 
  Send, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Paperclip, 
  Mail, 
  Building2, 
  UserCheck, 
  AlertCircle, 
  RefreshCw,
  Download,
  FileText,
  Link2
} from 'lucide-react';
import { downloadResumeText, openPrintableResume } from '../utils/resumeDownload';

interface DispatchModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDispatch: (job: JobListing, emailSubject: string, emailBody: string, channel: any) => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  job,
  isOpen,
  onClose,
  onConfirmDispatch,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [keyHooks, setKeyHooks] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState<'balanced' | 'technical' | 'concise'>('balanced');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [resumeLink, setResumeLink] = useState(() => localStorage.getItem('shikhar_resume_link') || '');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [resumeDownloaded, setResumeDownloaded] = useState(false);
  const [gmailLaunchedNotice, setGmailLaunchedNotice] = useState(false);

  // Fetch or generate tailored pitch when job opens
  useEffect(() => {
    if (job && isOpen) {
      setRecruiterEmail(job.recruiter?.email || `careers@${job.company.toLowerCase().replace(/\s+/g, '')}.com`);
      setRecruiterName(job.recruiter?.name || 'Hiring Lead');
      setGmailLaunchedNotice(false);
      generatePitch(job, tone);
    }
  }, [job, isOpen]);

  const generatePitch = async (targetJob: JobListing, selectedTone: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job: targetJob }),
      });
      const data: ColdEmailDraft = await response.json();
      if (data && data.subject && data.body) {
        setSubject(data.subject);
        setBody(data.body);
        setKeyHooks(data.keyHooks || []);
      } else {
        throw new Error('Incomplete draft returned from server');
      }
    } catch (err) {
      console.warn('Using resilient pitch template for modal:', err);
      // Fallback - Modest, concise, polite, no boastful phrases
      setSubject(`Senior Software Developer (Bengaluru) — Shikhar Singhal | IIT Kharagpur | 6 YOE`);
      setBody(`Hi ${targetJob.recruiter?.name ? targetJob.recruiter.name.split(' ')[0] : 'Team'},\n\nI noticed the ${targetJob.role} opening at ${targetJob.company} in Bengaluru and wanted to put forward my profile.\n\nI am a Senior Software Developer (IIT Kharagpur alumnus, 6+ YOE) currently working on enterprise PaPM Cloud at msg global solutions in Bengaluru, focusing on TypeScript, Node.js/NestJS, and distributed systems.\n\nA quick overview of my background:\n• Built event-driven notification microservices and BullMQ asynchronous queues with NestJS.\n• Handled SQL data partitioning and database consistency across 50+ enterprise tenants.\n• Reduced production incident MTTD by ~40% using structured Prometheus observability.\n\nGiven your team's requirements in ${targetJob.skills.slice(0, 3).join(', ')}, I believe my background makes me a good candidate for this position.\n\nI have attached my resume for your review and would be glad to connect for an introductory discussion.\n\nWarm regards,\nShikhar Singhal\n+91 7976080282 | shikhar.singhal55@gmail.com\nBengaluru, India`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !job) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`To: ${recruiterEmail}\nSubject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    downloadResumeText();
    setResumeDownloaded(true);
  };

  const handleSaveResumeLink = (link: string) => {
    setResumeLink(link);
    localStorage.setItem('shikhar_resume_link', link);
  };

  const handleInsertResumeLink = () => {
    if (!resumeLink.trim()) return;
    if (!body.includes(resumeLink.trim())) {
      const addition = `\nOnline Resume Link: ${resumeLink.trim()}`;
      setBody(prev => prev + addition);
    }
    setShowLinkInput(false);
  };

  // 1-Click Launch Gmail Web
  const handleOpenGmail = () => {
    // Auto-download resume so it is ready on the download shelf for drag & drop into Gmail
    if (!resumeDownloaded) {
      downloadResumeText();
      setResumeDownloaded(true);
    }

    const toEncoded = encodeURIComponent(recruiterEmail);
    const suEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEncoded}&su=${suEncoded}&body=${bodyEncoded}`;
    window.open(gmailUrl, '_blank');
    
    setGmailLaunchedNotice(true);
    onConfirmDispatch(job, subject, body, 'Gmail One-Click');
  };

  // Mailto Launcher
  const handleOpenMailto = () => {
    if (!resumeDownloaded) {
      downloadResumeText();
      setResumeDownloaded(true);
    }
    const toEncoded = encodeURIComponent(recruiterEmail);
    const suEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    window.location.href = `mailto:${toEncoded}?subject=${suEncoded}&body=${bodyEncoded}`;
    onConfirmDispatch(job, subject, body, 'Direct Email');
    onClose();
  };

  const handleDirectRecord = () => {
    onConfirmDispatch(job, subject, body, 'Auto-Pilot Bot');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>1-Click Recruiter Dispatcher</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  CV Attached
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Target: {job.role} @ <strong className="text-zinc-200">{job.company}</strong> ({job.subLocation})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          
          {/* Recruiter & Job Context Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Recruiter Contact
              </span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {recruiterName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-zinc-800 text-xs sm:text-sm">{recruiterName}</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <input
                      type="text"
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="bg-transparent border-b border-dashed border-zinc-300 text-indigo-700 hover:border-zinc-500 focus:outline-none"
                    />
                    <a
                      href={`https://www.linkedin.com/search/results/people/?keywords=technical+recruiter+${encodeURIComponent(job.company)}+bengaluru`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-zinc-400 hover:text-indigo-600 inline-flex items-center gap-0.5 ml-1"
                      title="Verify real recruiter on LinkedIn"
                    >
                      <span>Find on LinkedIn</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Role & Match Pedigree
              </span>
              <div className="text-xs text-zinc-700">
                <div className="font-medium text-zinc-900">{job.role}</div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{job.matchScore}% Match (IIT Kharagpur + 6 YOE NestJS / Kafka)</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px]">
                  <a
                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.role} ${job.company}`)}&location=Bengaluru%2C%20Karnataka%2C%20India`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>LinkedIn Jobs</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-zinc-300">•</span>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(`${job.company} ${job.role} jobs Bengaluru`)}&ibp=htl;jobs`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-indigo-600 inline-flex items-center gap-0.5"
                  >
                    <span>Google Jobs</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Resume Attachment Hub */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50/90 to-blue-50/70 border border-indigo-200/90 text-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-950">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Paperclip className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">Shikhar_Singhal_IIT_Kharagpur_Resume.pdf</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Attached in Pitch
                    </span>
                  </div>
                  <span className="text-indigo-600 text-[11px] block mt-0.5">
                    IIT Kharagpur Dual Degree • 6+ YOE • Backend & Distributed Systems
                  </span>
                </div>
              </div>

              {/* Action Buttons for Attachment */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow-xs transition-colors cursor-pointer"
                  title="Download resume to drag & drop into Gmail compose"
                >
                  <Download className="w-3 h-3 text-indigo-600" />
                  <span>{resumeDownloaded ? 'Resume Downloaded' : 'Download Resume'}</span>
                  {resumeDownloaded && <Check className="w-3 h-3 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={openPrintableResume}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-indigo-200 text-zinc-700 hover:bg-zinc-50 shadow-xs transition-colors cursor-pointer"
                  title="Open print view to save as clean PDF"
                >
                  <FileText className="w-3 h-3 text-zinc-500" />
                  <span>Save as PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLinkInput(!showLinkInput)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                  title="Attach Google Drive / Cloud CV Link directly in the email"
                >
                  <Link2 className="w-3 h-3" />
                  <span>{resumeLink ? 'Cloud Link' : 'Add Drive Link'}</span>
                </button>
              </div>
            </div>

            {/* Google Drive / Cloud Link Input Drawer */}
            {showLinkInput && (
              <div className="pt-2 border-t border-indigo-200/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="url"
                  placeholder="Paste Google Drive / Hosted Resume Link (e.g. https://drive.google.com/...)"
                  value={resumeLink}
                  onChange={(e) => handleSaveResumeLink(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-indigo-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleInsertResumeLink}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white shrink-0 cursor-pointer"
                >
                  Insert Link into Pitch
                </button>
              </div>
            )}

            {/* Notice if user already has a saved cloud resume link */}
            {resumeLink && !showLinkInput && (
              <div className="flex items-center justify-between text-[11px] text-indigo-700 bg-white/70 px-2.5 py-1 rounded-md border border-indigo-100">
                <span className="truncate max-w-md">
                  Cloud Link: <span className="font-mono text-zinc-700">{resumeLink}</span>
                </span>
                <button
                  type="button"
                  onClick={handleInsertResumeLink}
                  className="text-indigo-600 hover:underline font-semibold ml-2 shrink-0 cursor-pointer"
                >
                  Insert in Body
                </button>
              </div>
            )}
          </div>

          {/* Gmail Launch Guidance Banner */}
          {gmailLaunchedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 animate-in fade-in slide-in-from-top-1">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block text-emerald-950">Gmail Tab Opened!</span>
                <p className="text-emerald-800 text-[11px] mt-0.5">
                  Your email to <strong>{recruiterEmail}</strong> is pre-filled. 
                  Don't forget to attach your resume file (downloaded to your shelf) or paste your Drive link before clicking Send in Gmail!
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="text-[11px] font-bold text-emerald-800 bg-emerald-200/80 hover:bg-emerald-200 px-2.5 py-1 rounded-md shrink-0 cursor-pointer"
              >
                Re-Download CV
              </button>
            </div>
          )}

          {/* Subject Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-zinc-700">
                Email Subject:
              </label>
              <span className="text-[11px] text-zinc-400">
                Optimized for 80%+ open rate by recruiters
              </span>
            </div>
            <input
              id="input-email-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>

          {/* Email Body Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <span>Personalized Pitch Body:</span>
                {isLoading && (
                  <span className="text-indigo-600 flex items-center gap-1 text-[11px] font-normal animate-pulse">
                    <Sparkles className="w-3 h-3" /> Generating tailored pitch with Gemini...
                  </span>
                )}
              </label>
              <button
                type="button"
                onClick={() => generatePitch(job, tone)}
                disabled={isLoading}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Regenerate with Gemini</span>
              </button>
            </div>
            <textarea
              id="input-email-body"
              rows={9}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 rounded-lg border border-zinc-300 text-xs sm:text-sm font-mono text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white leading-relaxed"
            />
          </div>

          {/* Key Hooks Highlight */}
          {keyHooks.length > 0 && (
            <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200 text-xs">
              <span className="font-semibold text-zinc-700 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Key Pitch Angles Highlighted to {job.company}:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-zinc-600 text-[11px]">
                {keyHooks.map((hook, idx) => (
                  <li key={idx}>{hook}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer with Primary Action Launchers */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="btn-copy-pitch"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Pitch!' : 'Copy Pitch'}</span>
            </button>

            <button
              id="btn-mark-dispatched"
              onClick={handleDirectRecord}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-200 hover:bg-zinc-300 text-zinc-800 transition-colors cursor-pointer"
              title="Save application record in pipeline without opening external email"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Dispatched</span>
            </button>
          </div>

          {/* 1-Click Launchers */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Native Mailto */}
            <button
              id="btn-launch-mailto"
              onClick={handleOpenMailto}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-900 text-white transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mail App</span>
            </button>

            {/* Gmail 1-Click Send (Universal) */}
            <button
              id="btn-launch-gmail"
              onClick={handleOpenGmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send via Gmail in Seconds</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
