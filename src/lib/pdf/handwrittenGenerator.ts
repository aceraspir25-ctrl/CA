import { NoteVisualStyle, StudyResourceItem } from "@/data/studyPackagesData"

export function generatePrintableResourceHtml(
  resource: StudyResourceItem,
  chapterTitle: string,
  courseName: string,
  institution: string
): string {
  const isHandwritten = resource.visualStyle === "clean_handwritten"
  const isVisual = resource.visualStyle === "visual_learning"
  const isNumerical = resource.visualStyle === "numerical_notes"
  const isExamRevision = resource.visualStyle === "exam_revision"

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${resource.title} - ${chapterTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@400;700&family=Inter:wght@400;600;700&family=Fira+Code&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 15mm 20mm 18mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: ${
        isHandwritten
          ? "'Kalam', 'Caveat', cursive, sans-serif"
          : isNumerical
          ? "'Fira Code', 'Inter', monospace, sans-serif"
          : "'Inter', sans-serif"
      };
      color: #1e293b;
      background: ${
        isHandwritten
          ? "#fdfbf7"
          : isVisual
          ? "#f8fafc"
          : "#ffffff"
      };
      font-size: ${isHandwritten ? "16px" : "14px"};
      line-height: ${isHandwritten ? "1.9" : "1.6"};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .notebook-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px;
      min-height: 100vh;
      background: #ffffff;
      ${
        isHandwritten
          ? `background-image: repeating-linear-gradient(transparent, transparent 27px, #e2e8f0 28px);
             border-left: 3px solid #f87171;
             padding-left: 45px;`
          : ""
      }
    }
    .header-bar {
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .institution-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2563eb;
    }
    .main-title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .hindi-subtitle {
      font-size: 14px;
      color: #64748b;
      font-family: 'Kalam', sans-serif;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
    }
    .highlight {
      background: #fef08a;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
    }
    .content-body {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .content-body h1, .content-body h2, .content-body h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      color: #1e3a8a;
    }
    .footer-bar {
      margin-top: 40px;
      padding-top: 15px;
      border-top: 1px dashed #cbd5e1;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
    @media print {
      body {
        background: #ffffff;
      }
      .no-print {
        display: none !important;
      }
      .notebook-container {
        padding: 0;
        margin: 0;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background:#1e293b; color:#fff; padding:12px 20px; display:flex; justify-content:space-between; align-items:center;">
    <div>
      <strong>EduFinance Pro Digital Document Generator</strong> • ${resource.title} (${resource.visualStyle.replace(/_/g, " ")})
    </div>
    <button onclick="window.print()" style="background:#2563eb; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">
      🖨️ Print / Save as PDF
    </button>
  </div>

  <div class="notebook-container">
    <div class="header-bar">
      <div>
        <span class="institution-tag">${institution} • ${courseName}</span>
        <h1 class="main-title">${resource.title}</h1>
        <p class="hindi-subtitle">${resource.hindiTitle} • ${chapterTitle}</p>
      </div>
      <div style="text-align: right;">
        <span class="badge">Resource #${resource.code}</span>
        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
          ${resource.pagesCount} Pages • ${resource.estimatedReadTime}
        </div>
      </div>
    </div>

    <div class="content-body">${resource.rawContent}</div>

    <div class="footer-bar">
      <span>EduFinance Pro Verified Study Package • Official Curriculum Standard</span>
      <span>Page 1 of ${resource.pagesCount}</span>
    </div>
  </div>
</body>
</html>`
}

export function openPrintableResource(
  resource: StudyResourceItem,
  chapterTitle: string,
  courseName: string,
  institution: string
) {
  const html = generatePrintableResourceHtml(resource, chapterTitle, courseName, institution)
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
  }
}
