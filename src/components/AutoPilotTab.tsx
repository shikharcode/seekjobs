import React, { useState } from 'react';
import { AutoPilotConfig, JobListing } from '../types';
import { Bot, Zap, Sparkles, CheckCircle2, Sliders, ShieldCheck, Play, Pause, RefreshCw, Terminal, Send, ArrowRight } from 'lucide-react';

interface AutoPilotTabProps {
  config: AutoPilotConfig;
  setConfig: React.Dispatch<React.SetStateAction<AutoPilotConfig>>;
  jobs: JobListing[];
  onBatchApplyTopMatches: () => void;
  onSimulateNewJob: () => void;
  isSimulating: boolean;
}

export const AutoPilotTab: React.FC<AutoPilotTabProps> = ({
  config,
  setConfig,
  jobs,
  onBatchApplyTopMatches,
  onSimulateNewJob,
  isSimulating,
}) => {
  const [logs, setLogs] = useState<string[]>([
    '[11:58:02] Auto-Pilot Bot Initialized: Target Candidate Shikhar Singhal (IIT Kharagpur, 6 YOE)',
    '[11:58:05] Loaded CV context: NestJS, TypeScript, SAP HANA Cloud, BullMQ, Distributed Architecture',
    '[11:59:12] Monitoring 14 tech pipelines in Bengaluru (HSR Layout, Koramangala, Bellandur, Indiranagar)',
    '[12:00:20] High match detected: Zepto (99% match, BullMQ/Order processing in HSR Layout)',
    '[12:01:04] Cold email synthesized with Gemini 3.8 Flash, verified candidate CV attached',
    '[12:02:15] Continuous radar active: Ready to auto-apply to incoming jobs in seconds',
  ]);

  const topMatches = jobs.filter(j => j.matchScore >= config.minMatchScore);

  return (
    <div className="space-y-6">
      {/* Bot Status & Primary Switch Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div className="flex items-start gap-3">
            <div className={`p-3 rounded-xl flex items-center justify-center ${
              config.enabled ? 'bg-emerald-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-500'
            }`}>
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">Auto-Pilot Application Engine</h2>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  config.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {config.enabled ? 'SCANNER RUNNING' : 'STANDBY'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl">
                Automatically monitors newly opened Senior Software Developer / Backend roles across Bengaluru tech companies, computes matching against Shikhar Singhal's IIT Kharagpur 6 YOE resume, and prepares/dispatches cold outreach in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-toggle-engine"
              onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                config.enabled
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {config.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{config.enabled ? 'Pause Auto-Pilot' : 'Activate Auto-Pilot'}</span>
            </button>
          </div>
        </div>

        {/* Engine Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="font-bold text-zinc-800 mb-1 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span>Auto-Dispatch Threshold</span>
            </div>
            <p className="text-zinc-500 mb-2">Only trigger outreach if match score equals or exceeds:</p>
            <div className="flex gap-2">
              {[85, 90, 95].map((threshold) => (
                <button
                  key={threshold}
                  onClick={() => setConfig(prev => ({ ...prev, minMatchScore: threshold }))}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                    config.minMatchScore === threshold
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  ≥ {threshold}%
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="font-bold text-zinc-800 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pedigree Verification</span>
            </div>
            <p className="text-zinc-500 mb-2">Candidate profile credentials auto-referenced in outreach:</p>
            <ul className="text-zinc-700 space-y-0.5 font-medium">
              <li>✓ IIT Kharagpur Dual Degree (7.69 GPA)</li>
              <li>✓ 6+ YOE in TypeScript/NestJS & Dist. Systems</li>
              <li>✓ msg global PaPM Cloud (Puma, Nestlé, SBI MF)</li>
            </ul>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="font-bold text-zinc-800 mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Batch Outreach</span>
            </div>
            <p className="text-zinc-500 mb-2">
              Currently {topMatches.length} roles meet your ≥{config.minMatchScore}% threshold:
            </p>
            <button
              id="btn-batch-apply"
              onClick={onBatchApplyTopMatches}
              className="w-full py-1.5 px-3 rounded-lg font-bold text-xs bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Send className="w-3 h-3 text-indigo-400" />
              <span>Dispatch to Top 3 Matches</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal / Real-time Execution Logs */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 font-mono text-xs text-zinc-300 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-zinc-200">Auto-Pilot Background Scanner Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-zinc-500">Live Polling • Port 3000</span>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] leading-relaxed max-h-56 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-emerald-500 shrink-0">&gt;</span>
              <span className={log.includes('match') ? 'text-amber-300' : 'text-zinc-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Speed: Under 3 seconds to analyze JD & draft personalized email</span>
          <button
            onClick={onSimulateNewJob}
            disabled={isSimulating}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Scanning Pipelines...' : 'Scan New Jobs Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
