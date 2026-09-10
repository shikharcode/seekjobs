import React from 'react';
import { SHIKHAR_PROFILE } from '../data/shikharProfile';
import { Sparkles, FileText, Zap, Send, Bell, MapPin, GraduationCap, Briefcase, PlusCircle, CheckCircle2, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'radar' | 'autopilot' | 'tracker' | 'recruiters' | 'profile';
  setActiveTab: (tab: 'radar' | 'autopilot' | 'tracker' | 'recruiters' | 'profile') => void;
  openCvModal: () => void;
  openCustomJdModal: () => void;
  dispatchedCount: number;
  autoPilotEnabled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openCvModal,
  openCustomJdModal,
  dispatchedCount,
  autoPilotEnabled,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Top Banner: Live Status & Candidate Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & User Pedigree - Clickable to open Profile/CV */}
          <div 
            id="header-candidate-profile"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 cursor-pointer group p-1 -m-1 rounded-xl hover:bg-zinc-50 transition-all"
            title="Click to view full Candidate Profile & CV"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0 group-hover:ring-2 group-hover:ring-indigo-400 transition-all">
              SS
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-bold text-zinc-900 tracking-tight group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>{SHIKHAR_PROFILE.name}</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    Profile & CV
                  </span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <GraduationCap className="w-3 h-3 text-emerald-600" />
                  IIT Kharagpur
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <Briefcase className="w-3 h-3 text-blue-600" />
                  6+ Yrs Exp
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  Bengaluru
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                <span>Senior Software Developer (PaPM Cloud @ msg global)</span>
                <span className="text-zinc-300">•</span>
                <span className="font-mono text-zinc-600">TypeScript • NestJS • Distributed Systems</span>
              </p>
            </div>
          </div>

          {/* Quick Action Badges & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Auto-Pilot Status Indicator */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
              autoPilotEnabled
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-zinc-50 text-zinc-600 border-zinc-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${autoPilotEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
              <span>{autoPilotEnabled ? 'Auto-Pilot Active' : 'Auto-Pilot Paused'}</span>
            </div>

            {/* Custom JD Matcher */}
            <button
              id="btn-analyze-jd"
              onClick={openCustomJdModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors cursor-pointer border border-zinc-200"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Analyze Any JD</span>
            </button>

            {/* CV Vault */}
            <button
              id="btn-view-cv"
              onClick={openCvModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-200"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>View Attached CV</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none">
            <button
              id="tab-radar"
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'radar'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Live Bengaluru Job Radar</span>
            </button>

            <button
              id="tab-autopilot"
              onClick={() => setActiveTab('autopilot')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'autopilot'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-Pilot Bot</span>
            </button>

            <button
              id="tab-tracker"
              onClick={() => setActiveTab('tracker')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'tracker'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Outreach Tracker</span>
              {dispatchedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] rounded-full font-bold">
                  {dispatchedCount}
                </span>
              )}
            </button>

            <button
              id="tab-recruiters"
              onClick={() => setActiveTab('recruiters')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'recruiters'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <span>Recruiter Directory</span>
            </button>

            <button
              id="tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Profile & CV</span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Bengaluru Tech Corridor • Target: ₹45L–₹75L</span>
          </div>
        </div>
      </div>
    </header>
  );
};
