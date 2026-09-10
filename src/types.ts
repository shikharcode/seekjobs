export interface RecruiterContact {
  name: string;
  role: string;
  email: string;
  linkedin?: string;
  avatar?: string;
}

export interface JobListing {
  id: string;
  company: string;
  role: string;
  location: string;
  subLocation: string; // e.g. "HSR Layout, Bengaluru", "Koramangala, Bengaluru"
  workMode: 'Onsite' | 'Hybrid' | 'Remote';
  experienceRequired: string; // e.g. "5-8 Years"
  minExpYears: number;
  salaryRange: string; // e.g. "₹45L - ₹65L PA"
  postedTimeAgo: string;
  timestamp: number;
  source: 'LinkedIn' | 'Instahyre' | 'Naukri' | 'Company Careers' | 'Wellfound' | 'Referral / Direct' | 'Google Jobs';
  skills: string[];
  description: string;
  recruiter: RecruiterContact;
  matchScore: number; // 0-100
  matchReason: string;
  isNew?: boolean;
  status?: 'discovered' | 'applied' | 'emailed' | 'interviewing' | 'rejected';
  companyJobsUrl?: string;
  googleJobsUrl?: string;
  linkedinSearchUrl?: string;
}

export interface ApplicantProfile {
  name: string;
  phone: string;
  email: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  experienceYears: number;
  education: {
    institution: string;
    degree: string;
    field: string;
    gradYear: string;
    gpa: string;
    highlights: string[];
  };
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    cloudAndDevOps: string[];
    architecture: string[];
    mlAndData: string[];
  };
  highlights: string[];
  targetRoles: string[];
  targetLocations: string[];
  targetCtc: string;
}

export interface ColdEmailDraft {
  subject: string;
  body: string;
  keyHooks: string[];
  recruiterEmail: string;
  recruiterName: string;
  companyName: string;
  roleName: string;
  gmailComposeUrl: string;
  mailtoUrl: string;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  company: string;
  role: string;
  recruiterName: string;
  recruiterEmail: string;
  appliedDate: string;
  timestamp: number;
  status: 'Queued' | 'Dispatched' | 'Email Sent' | 'Under Review' | 'Interview' | 'Offer';
  channel: 'Direct Email' | 'Auto-Pilot Bot' | 'Gmail One-Click' | 'Careers Portal';
  notes?: string;
  emailSubject?: string;
  emailBody?: string;
}

export interface AutoPilotConfig {
  enabled: boolean;
  minMatchScore: number; // e.g. 85
  soundAlerts: boolean;
  autoDraftEmail: boolean;
  preferredSubLocations: string[];
  selectedSkills: string[];
  minCtc: number;
}
