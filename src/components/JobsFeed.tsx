import React from 'react';
import { JobListing } from '../types';
import { getRecruiterLinkedInUrl, getCompanyLinkedInJobsUrl, getGoogleJobsSearchUrl } from '../utils/links';
import { Sparkles, Send, CheckCircle2, Building2, MapPin, DollarSign, Clock, Briefcase, ExternalLink, Mail, UserCheck, Flame, Search } from 'lucide-react';

interface JobsFeedProps {
  jobs: JobListing[];
  onOpenDispatch: (job: JobListing) => void;
  onInstantApply: (job: JobListing) => void;
}

export const JobsFeed: React.FC<JobsFeedProps> = ({
  jobs,
  onOpenDispatch,
  onInstantApply,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-xs">
        <Building2 className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-zinc-900">No jobs match your current filters</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          Try selecting "All Bengaluru" or resetting your tech stack filter. You can also click "Simulate Fresh Job Drop" to scan for new incoming roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const isHighMatch = job.matchScore >= 96;
        const isEmailed = job.status === 'emailed' || job.status === 'applied';

        return (
          <div
            key={job.id}
            id={`job-card-${job.id}`}
            className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md p-4 sm:p-5 relative ${
              job.isNew
                ? 'border-indigo-400 ring-2 ring-indigo-500/20 bg-indigo-50/10'
                : isHighMatch
                ? 'border-zinc-200 hover:border-indigo-300'
                : 'border-zinc-200'
            }`}
          >
            {/* Top Row: Company, Role & Match Score */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              
              <div className="flex items-start gap-3">
                {/* Company Monogram Badge */}
                <div className="w-11 h-11 rounded-xl bg-zinc-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {job.company.substring(0, 2).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-zinc-900 text-sm">{job.company}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs text-zinc-500 font-medium">{job.source}</span>

                    {job.isNew && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                        <Flame className="w-3 h-3 text-amber-600" />
                        FRESH POSTING
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      job.workMode === 'Hybrid'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : job.workMode === 'Remote'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                    }`}>
                      {job.workMode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 mt-1 leading-snug">
                    {job.role}
                  </h3>
                </div>
              </div>

              {/* Match Score Gauge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                  job.matchScore >= 98
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                    : job.matchScore >= 95
                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                }`}>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{job.matchScore}% Match</span>
                </div>
                <span className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  {job.postedTimeAgo}
                </span>
              </div>
            </div>

            {/* Meta Tags: Location, Experience, Salary */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 mb-3 py-1.5 px-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold text-zinc-800">{job.subLocation}</span>
              </div>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                <span>Requires: <strong>{job.experienceRequired}</strong></span>
                <span className="text-emerald-600 font-medium">(You: 6 Yrs ✓)</span>
              </div>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-zinc-900">{job.salaryRange}</span>
              </div>
            </div>

            {/* Description Snippet */}
            <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">
              {job.description}
            </p>

            {/* Match Reason Hook */}
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span><strong>IIT KGP Fit:</strong> {job.matchReason}</span>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Row: Recruiter Info & 1-Click Apply Buttons */}
            <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Recruiter Contact info */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {job.recruiter.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <span>{job.recruiter.name}</span>
                    <span className="text-zinc-400 font-normal">({job.recruiter.role})</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-2 flex-wrap">
                    <span className="text-indigo-600 font-semibold">{job.recruiter.email}</span>
                    <span className="text-zinc-300">•</span>
                    <a
                      href={getRecruiterLinkedInUrl(job.recruiter.name, job.company)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-600 hover:text-indigo-600 inline-flex items-center gap-1 font-sans font-medium"
                      title={`Find technical recruiters at ${job.company} Bengaluru on LinkedIn`}
                    >
                      <span>Find on LinkedIn</span>
                      <ExternalLink className="w-2.5 h-2.5 text-indigo-500" />
                    </a>
                    <span className="text-zinc-300">•</span>
                    <a
                      href={getCompanyLinkedInJobsUrl(job.role, job.company)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-indigo-600 inline-flex items-center gap-0.5 font-sans"
                      title="Search live open roles on LinkedIn Jobs"
                    >
                      <span>LinkedIn Jobs</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-zinc-300">•</span>
                    <a
                      href={getGoogleJobsSearchUrl(job.role, job.company)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-indigo-600 inline-flex items-center gap-0.5 font-sans"
                      title="Search on Google Jobs"
                    >
                      <span>Google Jobs</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {isEmailed ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Applied / Emailed</span>
                  </div>
                ) : (
                  <>
                    <button
                      id={`btn-review-pitch-${job.id}`}
                      onClick={() => onOpenDispatch(job)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      title="Inspect and edit Gemini's custom email before sending"
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Review Pitch</span>
                    </button>

                    <button
                      id={`btn-apply-seconds-${job.id}`}
                      onClick={() => onInstantApply(job)}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                      title="Instantly launches Gmail with prefilled recruiter email, subject, and tailored CV pitch"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Apply in Seconds</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
