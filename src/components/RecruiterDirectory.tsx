import React from 'react';
import { JobListing } from '../types';
import { getRecruiterLinkedInUrl, getCompanyLinkedInJobsUrl } from '../utils/links';
import { Mail, ExternalLink, Send, Building2, UserCheck, Search, Briefcase } from 'lucide-react';

interface RecruiterDirectoryProps {
  jobs: JobListing[];
  onOpenDispatch: (job: JobListing) => void;
}

export const RecruiterDirectory: React.FC<RecruiterDirectoryProps> = ({
  jobs,
  onOpenDispatch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredJobs = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.recruiter.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.subLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              Bengaluru Tech Recruiter Directory
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified technical talent partners hiring Senior Software Engineers & Backend Leads across Bengaluru tech clusters.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recruiter, company, or hub..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl border border-zinc-200 hover:border-indigo-300 bg-white hover:bg-zinc-50/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {job.recruiter.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-zinc-900">
                        {job.recruiter.name}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {job.recruiter.role}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                    {job.company}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-100 text-xs text-zinc-600 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-700">
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>{job.recruiter.email}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Hiring: <strong className="text-zinc-800">{job.role}</strong> ({job.subLocation})
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <a
                    href={getRecruiterLinkedInUrl(job.recruiter.name, job.company)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-zinc-600 hover:text-indigo-600 font-medium inline-flex items-center gap-1"
                    title={`Find technical recruiters at ${job.company} on LinkedIn`}
                  >
                    <span>Recruiter on LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-indigo-500" />
                  </a>
                  <span className="text-zinc-300">•</span>
                  <a
                    href={getCompanyLinkedInJobsUrl(job.role, job.company)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-zinc-500 hover:text-indigo-600 inline-flex items-center gap-0.5"
                    title="Search active postings on LinkedIn Jobs"
                  >
                    <span>Role on LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <button
                  onClick={() => onOpenDispatch(job)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3 text-indigo-400" />
                  <span>Send 1-Click Pitch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
