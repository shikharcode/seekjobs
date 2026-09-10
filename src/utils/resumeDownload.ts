import { RESUME_RAW_TEXT } from '../data/shikharProfile';

/**
 * Downloads Shikhar's clean resume as an ATS-friendly text file
 */
export function downloadResumeText(): void {
  const blob = new Blob([RESUME_RAW_TEXT], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Shikhar_Singhal_IIT_Kharagpur_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens a print/save-as-PDF formatted window with Shikhar's resume
 */
export function openPrintableResume(): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    downloadResumeText();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shikhar Singhal — Resume (IIT Kharagpur | 6 YOE)</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #18181b;
            line-height: 1.5;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            font-size: 13px;
          }
          h1 { font-size: 22px; margin: 0 0 4px 0; font-weight: 800; color: #09090b; }
          .contact { font-size: 12px; color: #52525b; margin-bottom: 20px; }
          .section-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1.5px solid #27272a;
            padding-bottom: 3px;
            margin-top: 18px;
            margin-bottom: 8px;
            color: #09090b;
          }
          .job-title { font-weight: 700; color: #18181b; }
          .job-meta { font-size: 12px; color: #52525b; }
          ul { margin: 6px 0 12px 18px; padding: 0; }
          li { margin-bottom: 4px; color: #27272a; }
          @media print {
            body { padding: 15px; font-size: 11.5px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; padding: 12px; background: #e0e7ff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: #3730a3;">Press Ctrl+P (or Cmd+P) to Save as PDF</span>
          <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer;">Save as PDF</button>
        </div>
        <pre style="font-family: inherit; white-space: pre-wrap; font-size: inherit;">${RESUME_RAW_TEXT}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
}
