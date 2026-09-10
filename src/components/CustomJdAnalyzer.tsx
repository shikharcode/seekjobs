import React, { useState } from 'react';
import { X, Sparkles, Send, Copy, ExternalLink, Check, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { JobListing } from '../types';

interface CustomJdAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJobAndDispatch: (newJob: JobListing, subject: string, body: string) => void;
}

export const CustomJdAnalyzer: React.FC<CustomJdAnalyzerProps> = ({
  isOpen,
  onClose,
  onAddJobAndDispatch,
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Senior Backend Engineer');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterName, setRecruiterName] = useState('Hiring Manager');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jdText,
          company: company || 'Bengaluru Tech Company',
          role: role || 'Senior Software Developer',
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error analyzing JD:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!result?.customColdEmail) return;
    navigator.clipboard.writeText(
      `Subject: ${result.customColdEmail.subject}\n\n${result.customColdEmail.body}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handle1ClickGmail = () => {
    if (!result?.customColdEmail) return;
    const toEncoded = encodeURIComponent(recruiterEmail || 'careers@' + (company || 'company').toLowerCase().replace(/\s+/g, '') + '.com');
    const suEncoded = encodeURIComponent(result.customColdEmail.subject);
    const bodyEncoded = encodeURIComponent(result.customColdEmail.body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEncoded}&su=${suEncoded}&body=${bodyEncoded}`;
    window.open(gmailUrl, '_blank');

    // Create job object and dispatch
    const newJob: JobListing = {
      id: `job-custom-${Date.now()}`,
      company: company || result.company || 'Custom Tech Company',
      role: role || result.role || 'Senior Software Developer',
      location: 'Bengaluru, India',
      subLocation: result.workLocation || 'Bengaluru',
      workMode: 'Hybrid',
      experienceRequired: '5-8 Years',
      minExpYears: 5,
      salaryRange: result.compensationEst || '₹45L - ₹70L PA',
      postedTimeAgo: 'Just now',
      timestamp: Date.now(),
      source: 'Referral / Direct',
      skills: result.extractedSkills || ['TypeScript', 'Node.js', 'NestJS'],
      description: jdText.substring(0, 280) + '...',
      recruiter: {
        name: recruiterName,
        role: 'Recruiter / Hiring Lead',
        email: recruiterEmail || `careers@${(company || 'company').toLowerCase().replace(/\s+/g, '')}.com`,
      },
      matchScore: result.matchScore || 95,
      matchReason: result.matchReason || 'Analyzed via Gemini against Shikhar CV',
      status: 'emailed',
    };

    onAddJobAndDispatch(newJob, result.customColdEmail.subject, result.customColdEmail.body);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Analyze Any Job & Auto-Generate Cold Outreach
              </h2>
              <p className="text-xs text-zinc-400">
                Found a new role on LinkedIn, Instahyre, or WhatsApp? Paste it below to apply in seconds.
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* Quick Input Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Company Name:
              </label>
              <input
                type="text"
                placeholder="e.g. Swiggy, Zepto, Uber, stealth startup"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Role Title:
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Backend Engineer / SDE-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Recruiter / Manager Name (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Recruiter / Careers Email:
              </label>
              <input
                type="text"
                placeholder="e.g. priya.sharma@company.com"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* JD Input */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              Job Description / Requirements Text:
            </label>
            <textarea
              rows={5}
              placeholder="Paste the requirements, responsibilities, or LinkedIn post text here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="w-full p-3 rounded-lg border border-zinc-300 text-xs sm:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleAnalyze}
            disabled={!jdText.trim() || isAnalyzing}
            className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>Analyzing against Shikhar's IIT KGP + 6 YOE CV with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Evaluate Match & Generate 1-Click Recruiter Outreach</span>
              </>
            )}
          </button>

          {/* Analysis Results Display */}
          {result && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
              {/* Score and Quick Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-emerald-600">
                      {result.matchScore}% Match
                    </span>
                    <span className="text-xs font-bold text-zinc-700">
                      High Interview Probability
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">{result.matchReason}</p>
                </div>
                <div className="text-xs text-zinc-500 font-medium">
                  Estimated CTC: <strong className="text-zinc-800">{result.compensationEst || '₹45L - ₹70L PA'}</strong>
                </div>
              </div>

              {/* Fit Breakdown */}
              {result.fitBreakdown && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <div className="text-zinc-500 text-[10px]">Skills Match</div>
                    <div className="font-bold text-indigo-600 text-sm">{result.fitBreakdown.skillsMatch}%</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <div className="text-zinc-500 text-[10px]">Experience (6 YOE)</div>
                    <div className="font-bold text-indigo-600 text-sm">{result.fitBreakdown.experienceMatch}%</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <div className="text-zinc-500 text-[10px]">IIT Kharagpur</div>
                    <div className="font-bold text-emerald-600 text-sm">100% Pedigree</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <div className="text-zinc-500 text-[10px]">Bengaluru Hub</div>
                    <div className="font-bold text-indigo-600 text-sm">Immediate</div>
                  </div>
                </div>
              )}

              {/* Strengths */}
              {result.strengths && (
                <div>
                  <span className="font-bold text-xs text-zinc-800 block mb-1">Why You Stand Out:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-xs text-zinc-600">
                    {result.strengths.map((str: string, i: number) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Generated Cold Email */}
              {result.customColdEmail && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-zinc-800">
                      Generated Recruiter Cold Email:
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy Pitch'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-zinc-300 font-mono text-xs text-zinc-800 space-y-2 max-h-48 overflow-y-auto">
                    <div>
                      <strong className="text-zinc-500">Subject:</strong> {result.customColdEmail.subject}
                    </div>
                    <div className="whitespace-pre-line text-zinc-700 leading-relaxed">
                      {result.customColdEmail.body}
                    </div>
                  </div>

                  {/* 1-Click Launch Button */}
                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      onClick={handle1ClickGmail}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Send via Gmail in Seconds & Track</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
