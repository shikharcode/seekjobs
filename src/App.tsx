import React, { useState, useEffect } from 'react';
import { JobListing, ApplicationRecord, AutoPilotConfig } from './types';
import { INITIAL_JOBS, SIMULATED_NEW_JOBS_POOL } from './data/initialJobs';
import { SHIKHAR_PROFILE } from './data/shikharProfile';
import { Header } from './components/Header';
import { AutoPilotControls } from './components/AutoPilotControls';
import { JobsFeed } from './components/JobsFeed';
import { DispatchModal } from './components/DispatchModal';
import { CustomJdAnalyzer } from './components/CustomJdAnalyzer';
import { CvPreviewModal } from './components/CvPreviewModal';
import { ApplicationsTracker } from './components/ApplicationsTracker';
import { AutoPilotTab } from './components/AutoPilotTab';
import { RecruiterDirectory } from './components/RecruiterDirectory';
import { CandidateProfileTab } from './components/CandidateProfileTab';
import { playAlertChime } from './utils/audio';
import { CheckCircle2, AlertCircle, Sparkles, X, Send } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'radar' | 'autopilot' | 'tracker' | 'recruiters' | 'profile'>('radar');
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [simulationIndex, setSimulationIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);

  // Modals state
  const [dispatchJob, setDispatchJob] = useState<JobListing | null>(null);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isCustomJdModalOpen, setIsCustomJdModalOpen] = useState(false);

  // Filters state
  const [selectedLocation, setSelectedLocation] = useState('All Bengaluru');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');

  // Auto-Pilot config
  const [autoPilotConfig, setAutoPilotConfig] = useState<AutoPilotConfig>({
    enabled: true,
    minMatchScore: 90,
    soundAlerts: true,
    autoDraftEmail: true,
    preferredSubLocations: [],
    selectedSkills: [],
    minCtc: 45,
  });

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load initial data from backend
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      })
      .catch(err => console.error('Error fetching jobs:', err));

    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data.applications) {
          setApplications(data.applications);
        }
      })
      .catch(err => console.error('Error fetching applications:', err));
  }, []);

  // Filter jobs based on location and skill
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation =
      selectedLocation === 'All Bengaluru'
        ? true
        : selectedLocation === 'Hybrid'
        ? job.workMode === 'Hybrid'
        : job.subLocation.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesSkill =
      selectedSkill === 'All Skills'
        ? true
        : job.skills.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));

    return matchesLocation && matchesSkill;
  });

  // 1-Click Instant Apply Handler
  const handleInstantApply = (job: JobListing) => {
    setDispatchJob(job);
    setIsDispatchModalOpen(true);
    showToast(`Opening 1-click recruiter dispatcher for ${job.company}...`, 'info');
  };

  // Open modal to review before sending
  const handleOpenDispatchModal = (job: JobListing) => {
    setDispatchJob(job);
    setIsDispatchModalOpen(true);
  };

  // Confirm Dispatch from inside modal
  const handleConfirmDispatch = async (
    job: JobListing,
    subject: string,
    body: string,
    channel: any
  ) => {
    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          company: job.company,
          role: job.role,
          recruiterName: job.recruiter?.name || 'Recruiter',
          recruiterEmail: job.recruiter?.email || 'careers@company.com',
          channel: channel || 'Direct Email',
          emailSubject: subject,
          emailBody: body,
        }),
      });
      const data = await res.json();
      if (data.application) {
        setApplications(prev => [data.application, ...prev]);
      }
      setJobs(prev =>
        prev.map(j => (j.id === job.id ? { ...j, status: 'emailed' } : j))
      );
      if (autoPilotConfig.soundAlerts) {
        playAlertChime('success');
      }
      showToast(`Outreach recorded for ${job.company} in pipeline!`, 'success');
    } catch (err) {
      console.error('Failed to confirm dispatch:', err);
    }
  };

  // Simulate new job dropping in real-time
  const handleSimulateNewJob = () => {
    if (SIMULATED_NEW_JOBS_POOL.length === 0) return;
    setIsSimulating(true);

    const template = SIMULATED_NEW_JOBS_POOL[simulationIndex % SIMULATED_NEW_JOBS_POOL.length];
    setSimulationIndex(prev => prev + 1);

    const newJob: JobListing = {
      ...template,
      id: `job-blr-${Date.now()}`,
      timestamp: Date.now(),
      postedTimeAgo: 'Just now',
      isNew: true,
      status: 'discovered',
    };

    setTimeout(() => {
      setJobs(prev => [newJob, ...prev]);
      setIsSimulating(false);

      if (autoPilotConfig.soundAlerts) {
        playAlertChime('jobDrop');
      }

      showToast(
        `🚨 Fresh Role: ${newJob.role} @ ${newJob.company} (${newJob.matchScore}% Match)`,
        'success'
      );
    }, 600);
  };

  // Add custom JD analyzed job and dispatch
  const handleAddJobAndDispatch = (newJob: JobListing, subject: string, body: string) => {
    setJobs(prev => [newJob, ...prev]);
    handleConfirmDispatch(newJob, subject, body, 'Direct Email');
  };

  // Batch apply to top matches
  const handleBatchApplyTopMatches = () => {
    const unapplied = jobs
      .filter(j => j.status !== 'emailed' && j.status !== 'applied')
      .slice(0, 3);

    if (unapplied.length === 0) {
      showToast('No unapplied jobs remaining in current threshold.', 'info');
      return;
    }

    unapplied.forEach((job, idx) => {
      setTimeout(() => {
        handleConfirmDispatch(
          job,
          `Senior Software Developer — Shikhar Singhal | IIT Kharagpur (6 YOE NestJS / Distributed)`,
          `Dear ${job.recruiter.name.split(' ')[0]},\n\nI noticed the ${job.role} opening at ${job.company}. Given my 6+ years building enterprise distributed systems at msg global PaPM Cloud and IIT Kharagpur degree, I am eager to apply.\n\nBest regards,\nShikhar Singhal\n+91 7976080282`,
          'Auto-Pilot Bot'
        );
      }, idx * 400);
    });

    showToast(`🤖 Auto-Pilot dispatched 3 applications to top matches!`, 'success');
  };

  // Real live crawl from Google Jobs & LinkedIn
  const handleCrawlLiveJobs = async () => {
    setIsCrawling(true);
    showToast('🌐 Crawling live Senior SWE / Backend openings in Bengaluru (LinkedIn & Google Jobs)...', 'info');
    try {
      const res = await fetch('/api/jobs/crawl-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'Senior Backend Engineer Bengaluru',
          keyword: selectedSkill !== 'All Skills' ? selectedSkill : 'TypeScript NestJS Kafka',
        }),
      });
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(prev => {
          const existingKeys = new Set(prev.map(j => `${j.company.toLowerCase()}-${j.role.toLowerCase()}`));
          const fresh = data.jobs.filter((j: JobListing) => !existingKeys.has(`${j.company.toLowerCase()}-${j.role.toLowerCase()}`));
          return [...fresh, ...prev];
        });
        showToast(`⚡ Discovered ${data.count} fresh live Bengaluru openings!`, 'success');
        if (autoPilotConfig.soundAlerts) {
          playAlertChime('jobDrop');
        }
      } else {
        showToast('Live search completed. Current feed is up to date.', 'info');
      }
    } catch (err) {
      console.error('Error crawling live jobs:', err);
      showToast('Live crawl network error. Please retry.', 'info');
    } finally {
      setIsCrawling(false);
    }
  };

  // Update status in tracker
  const handleUpdateStatus = (id: string, newStatus: any) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
    fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch(err => console.error('Error updating status:', err));
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 text-white text-xs font-semibold shadow-xl border border-zinc-700">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCvModal={() => setIsCvModalOpen(true)}
        openCustomJdModal={() => setIsCustomJdModalOpen(true)}
        dispatchedCount={applications.length}
        autoPilotEnabled={autoPilotConfig.enabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Radar View (Default) */}
        {activeTab === 'radar' && (
          <div>
            <AutoPilotControls
              config={autoPilotConfig}
              setConfig={setAutoPilotConfig}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
              onSimulateNewJob={handleSimulateNewJob}
              isSimulating={isSimulating}
              onCrawlLiveJobs={handleCrawlLiveJobs}
              isCrawling={isCrawling}
              totalJobsCount={jobs.length}
              filteredJobsCount={filteredJobs.length}
            />

            <JobsFeed
              jobs={filteredJobs}
              onOpenDispatch={handleOpenDispatchModal}
              onInstantApply={handleInstantApply}
            />
          </div>
        )}

        {/* Auto-Pilot Bot Console */}
        {activeTab === 'autopilot' && (
          <AutoPilotTab
            config={autoPilotConfig}
            setConfig={setAutoPilotConfig}
            jobs={jobs}
            onBatchApplyTopMatches={handleBatchApplyTopMatches}
            onSimulateNewJob={handleSimulateNewJob}
            isSimulating={isSimulating}
          />
        )}

        {/* Applications Outreach Tracker */}
        {activeTab === 'tracker' && (
          <ApplicationsTracker
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {/* Recruiter Directory */}
        {activeTab === 'recruiters' && (
          <RecruiterDirectory
            jobs={jobs}
            onOpenDispatch={handleOpenDispatchModal}
          />
        )}

        {/* My Candidate Profile & CV Workspace */}
        {activeTab === 'profile' && (
          <CandidateProfileTab
            onOpenCvModal={() => setIsCvModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <DispatchModal
        job={dispatchJob}
        isOpen={isDispatchModalOpen}
        onClose={() => {
          setIsDispatchModalOpen(false);
          setDispatchJob(null);
        }}
        onConfirmDispatch={handleConfirmDispatch}
      />

      <CustomJdAnalyzer
        isOpen={isCustomJdModalOpen}
        onClose={() => setIsCustomJdModalOpen(false)}
        onAddJobAndDispatch={handleAddJobAndDispatch}
      />

      <CvPreviewModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-4 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Bengaluru Senior SWE Job Dispatcher • Tailored for Shikhar Singhal (IIT Kharagpur, 6+ YOE)</span>
          <span className="font-mono text-[11px] text-zinc-400">Powered by Gemini 3.8 Flash • Sub-second Recruiter Outreach</span>
        </div>
      </footer>
    </div>
  );
}
