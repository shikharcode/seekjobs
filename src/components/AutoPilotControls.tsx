import React from 'react';
import { AutoPilotConfig } from '../types';
import { Bot, Volume2, VolumeX, Sliders, Filter, Sparkles, Plus, MapPin, Globe, RefreshCw, Radar } from 'lucide-react';

interface AutoPilotControlsProps {
  config: AutoPilotConfig;
  setConfig: React.Dispatch<React.SetStateAction<AutoPilotConfig>>;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  onSimulateNewJob: () => void;
  isSimulating: boolean;
  onCrawlLiveJobs?: () => void;
  isCrawling?: boolean;
  totalJobsCount: number;
  filteredJobsCount: number;
}

const BENGALURU_LOCATIONS = [
  'All Bengaluru',
  'HSR Layout',
  'Koramangala',
  'Bellandur',
  'Indiranagar',
  'Outer Ring Road',
  'Whitefield',
  'Hybrid',
];

const KEY_SKILLS = [
  'All Skills',
  'TypeScript',
  'NestJS',
  'BullMQ',
  'Kafka',
  'Distributed Systems',
  'Redis',
  'PostgreSQL',
];

export const AutoPilotControls: React.FC<AutoPilotControlsProps> = ({
  config,
  setConfig,
  selectedLocation,
  setSelectedLocation,
  selectedSkill,
  setSelectedSkill,
  onSimulateNewJob,
  isSimulating,
  onCrawlLiveJobs,
  isCrawling,
  totalJobsCount,
  filteredJobsCount,
}) => {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-xs p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Auto-Pilot Main Switch & Info */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
            config.enabled ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-500'
          }`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-900">Auto-Pilot Job Radar</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-autopilot"
                  checked={config.enabled}
                  onChange={(e) => setConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                config.enabled ? 'bg-indigo-50 text-indigo-700' : 'bg-zinc-100 text-zinc-600'
              }`}>
                {config.enabled ? 'ACTIVE (Scanning in Seconds)' : 'PAUSED'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Auto-screens Senior SWE openings in Bengaluru, matches your IIT KGP + 6 YOE CV, and preps recruiter emails.
            </p>
          </div>
        </div>

        {/* Action Controls & Simulation */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Sound Alert Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={() => setConfig(prev => ({ ...prev, soundAlerts: !prev.soundAlerts }))}
            className={`p-2 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              config.soundAlerts
                ? 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-zinc-600'
            }`}
            title={config.soundAlerts ? 'Sound alerts enabled' : 'Sound alerts muted'}
          >
            {config.soundAlerts ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{config.soundAlerts ? 'Alerts On' : 'Alerts Off'}</span>
          </button>

          {/* Min Match Threshold */}
          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-700">
            <Sliders className="w-3.5 h-3.5 text-zinc-500" />
            <span className="font-medium text-zinc-600">Min Match:</span>
            <select
              id="select-min-match"
              value={config.minMatchScore}
              onChange={(e) => setConfig(prev => ({ ...prev, minMatchScore: Number(e.target.value) }))}
              className="bg-transparent font-bold text-indigo-600 focus:outline-none cursor-pointer"
            >
              <option value="85">≥ 85%</option>
              <option value="90">≥ 90%</option>
              <option value="95">≥ 95% (Elite)</option>
            </select>
          </div>

          {/* Live Crawler Button (LinkedIn & Google Jobs) */}
          {onCrawlLiveJobs && (
            <button
              id="btn-crawl-live-jobs"
              onClick={onCrawlLiveJobs}
              disabled={isCrawling}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Crawl live job openings in Bengaluru from Google Jobs & LinkedIn"
            >
              {isCrawling ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span>Crawling Live Web...</span>
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Crawl Live Bengaluru Jobs</span>
                </>
              )}
            </button>
          )}

          {/* Simulate New Job Drop button */}
          <button
            id="btn-simulate-job"
            onClick={onSimulateNewJob}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isSimulating ? 'Scanning...' : 'Simulate Drop'}</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Bengaluru Sub-locations and Skills */}
      <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Locations */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-zinc-500 font-medium shrink-0 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Location:
          </span>
          {BENGALURU_LOCATIONS.map((loc) => (
            <button
              key={loc}
              id={`filter-loc-${loc.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedLocation(loc)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedLocation === loc
                  ? 'bg-zinc-900 text-white font-medium shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Skills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-zinc-500 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Stack:
          </span>
          {KEY_SKILLS.map((skill) => (
            <button
              key={skill}
              id={`filter-skill-${skill.toLowerCase().replace(/[\s/]+/g, '-')}`}
              onClick={() => setSelectedSkill(skill)}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedSkill === skill
                  ? 'bg-indigo-600 text-white font-medium shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Counter summary */}
      <div className="mt-2 text-[11px] text-zinc-500 flex items-center justify-between">
        <span>Showing <strong className="text-zinc-800">{filteredJobsCount}</strong> of {totalJobsCount} Senior Backend / SWE roles matching Shikhar's profile</span>
        <span className="text-emerald-700 font-medium">⚡ Average Recruiter Outreach Time: &lt; 5 seconds</span>
      </div>
    </div>
  );
};
