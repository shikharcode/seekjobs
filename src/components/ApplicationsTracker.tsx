import React, { useState } from 'react';
import { ApplicationRecord } from '../types';
import { Send, CheckCircle2, Clock, Mail, ExternalLink, MessageSquare, ChevronDown, Sparkles } from 'lucide-react';

interface ApplicationsTrackerProps {
  applications: ApplicationRecord[];
  onUpdateStatus: (id: string, status: any) => void;
}

const STATUS_OPTIONS: ApplicationRecord['status'][] = [
  'Queued',
  'Email Sent',
  'Under Review',
  'Interview',
  'Offer',
];

export const ApplicationsTracker: React.FC<ApplicationsTrackerProps> = ({
  applications,
  onUpdateStatus,
}) => {
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  const handleLaunchFollowUp = (app: ApplicationRecord) => {
    const subject = `Follow up: ${app.role} — Shikhar Singhal (IIT Kharagpur / 6 YOE)`;
    const body = `Hi ${app.recruiterName.split(' ')[0]},\n\nI hope you are having a productive week.\n\nI am writing to briefly follow up on my email regarding the ${app.role} position at ${app.company}.\n\nGiven my 6+ years architecting enterprise distributed systems with TypeScript/NestJS, BullMQ, and SAP HANA Cloud (and dual degree from IIT Kharagpur), I remain very interested in discussing how I can contribute to ${app.company}'s engineering goals in Bengaluru.\n\nCould we schedule a quick 10-minute introductory call this week?\n\nBest regards,\nShikhar Singhal\n+91 7976080282`;

    const toEncoded = encodeURIComponent(app.recruiterEmail);
    const suEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEncoded}&su=${suEncoded}&body=${bodyEncoded}`;
    window.open(gmailUrl, '_blank');
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-xs">
        <Send className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-zinc-900">No applications dispatched yet</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          Switch to the Live Job Radar tab and click "Apply in Seconds" on any Senior SWE role to trigger your first personalized recruiter cold email.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs text-zinc-500 font-medium">Total Outreaches</div>
          <div className="text-2xl font-bold text-zinc-900 mt-0.5">{applications.length}</div>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs text-zinc-500 font-medium">Emails Dispatched</div>
          <div className="text-2xl font-bold text-indigo-600 mt-0.5">
            {applications.filter(a => a.status === 'Email Sent' || a.status === 'Dispatched').length}
          </div>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs text-zinc-500 font-medium">Interview Pipeline</div>
          <div className="text-2xl font-bold text-emerald-600 mt-0.5">
            {applications.filter(a => a.status === 'Interview' || a.status === 'Offer').length}
          </div>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs text-zinc-500 font-medium">Location Focus</div>
          <div className="text-base font-bold text-zinc-800 mt-1">Bengaluru Tech Hubs</div>
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">
            Active Recruiter Outreaches ({applications.length})
          </h3>
          <span className="text-xs text-zinc-500">
            Real-time delivery status & 1-click follow-up
          </span>
        </div>

        <div className="divide-y divide-zinc-200">
          {applications.map((app) => (
            <div key={app.id} className="p-4 sm:p-5 hover:bg-zinc-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900">{app.company}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs font-medium text-zinc-600">{app.role}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {app.channel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                    <span>Recruiter: <strong className="text-zinc-700">{app.recruiterName}</strong> ({app.recruiterEmail})</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" /> {app.appliedDate}
                    </span>
                  </div>
                </div>

                {/* Status Dropdown and Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 border border-zinc-300 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleLaunchFollowUp(app)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    title="Generate 1-click follow-up email in Gmail"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Follow Up</span>
                  </button>

                  {app.emailBody && (
                    <button
                      onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                    >
                      {selectedApp?.id === app.id ? 'Hide Pitch' : 'View Pitch'}
                    </button>
                  )}
                </div>
              </div>

              {/* View Sent Pitch Drawer */}
              {selectedApp?.id === app.id && app.emailBody && (
                <div className="mt-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-700 whitespace-pre-line leading-relaxed">
                  <div className="font-bold text-zinc-900 mb-1 pb-1 border-b border-zinc-200 font-sans">
                    Subject: {app.emailSubject}
                  </div>
                  {app.emailBody}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
