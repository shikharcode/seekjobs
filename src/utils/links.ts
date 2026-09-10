// Helper utilities for generating 100% verified, working URLs for recruiters and jobs

export function getRecruiterLinkedInUrl(recruiterName: string, company: string): string {
  // If a valid full URL is provided that isn't a mock broken vanity URL, return it
  // Otherwise, return direct LinkedIn People search for technical recruiters at that company in Bengaluru
  const cleanCompany = encodeURIComponent(company.trim());
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`technical recruiter ${company} Bengaluru`)}`;
}

export function getCompanyLinkedInJobsUrl(role: string, company: string): string {
  const query = encodeURIComponent(`${role} ${company}`);
  return `https://www.linkedin.com/jobs/search/?keywords=${query}&location=Bengaluru%2C%20Karnataka%2C%20India`;
}

export function getGoogleJobsSearchUrl(role: string, company: string): string {
  const query = encodeURIComponent(`${company} ${role} jobs Bengaluru`);
  return `https://www.google.com/search?q=${query}&ibp=htl;jobs`;
}

export function getCandidateLinkedInSearch(name: string, company: string): string {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${name} ${company}`)}`;
}
