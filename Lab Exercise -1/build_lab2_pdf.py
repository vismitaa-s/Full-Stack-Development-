"""
Build Lab Exercise 2 PDF Document for Full Stack Development Submission.
Student: VISMITAA S (2648552)
Christ University - Trimester 2
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    PageBreak,
    Preformatted,
    KeepTogether,
    Table,
    TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def add_header_footer(canvas, doc):
    canvas.saveState()
    # Header
    canvas.setFont("Helvetica-Bold", 10.5)
    canvas.setFillColor(colors.HexColor("#9E2A2B"))
    canvas.drawString(54, 742, "FULL STACK DEVELOPMENT - LAB EXERCISE - 2")
    canvas.drawRightString(612 - 54, 742, "DONE BY VISMITAA S (2648552)")
    
    # Subtle header rule
    canvas.setStrokeColor(colors.HexColor("#E4E4E7"))
    canvas.setLineWidth(0.75)
    canvas.line(54, 734, 612 - 54, 734)

    # Footer
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(colors.HexColor("#71717A"))
    canvas.drawString(54, 36, "CreatorIQ - AI-Powered YouTube Pre-Upload Assistant")
    page_str = f"Page {doc.page}"
    canvas.drawRightString(612 - 54, 36, page_str)
    canvas.restoreState()

def clean_code_text(text):
    """Normalize unicode characters for PDF rendering."""
    replacements = {
        "—": "--",
        "–": "-",
        "•": "*",
        "✓": "[OK]",
        "⚠️": "[WARN]",
        "⏱️": "[TIME]",
        "⏱": "[TIME]",
        "📁": "[FILE]",
        "💾": "[SIZE]",
        "🎬": "[FORMAT]",
        "🤖": "[AI]",
        "●": "*",
        "→": "->",
        "←": "<-",
        "🔥": "[HOT]",
        "📺": "[VIDEO]",
        "🎙️": "[AUDIO]",
        "💡": "[LIGHT]",
        "🔍": "[SEARCH]",
        "🚀": "[ROCKET]",
        "⚡": "[FAST]",
        "🛠️": "[TOOL]",
        "🟢": "[READY]"
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text

def read_file_content(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
            return clean_code_text(content)
    return f"[File not found: {file_path}]"

def build_pdf():
    pdf_path = "lab_exercise-2.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=68,
        bottomMargin=52
    )

    styles = getSampleStyleSheet()

    # Custom Styles
    style_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#09090B'),
        spaceBefore=12,
        spaceAfter=8,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#9E2A2B'),
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#27272A'),
        spaceAfter=6
    )

    style_bullet = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor('#27272A'),
        leftIndent=15,
        spaceAfter=4
    )

    style_caption = ParagraphStyle(
        'ImageCaption',
        parent=styles['Italic'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#3F3F46'),
        alignment=1, # Centered
        spaceBefore=4,
        spaceAfter=12
    )

    style_code = ParagraphStyle(
        'CodeText',
        fontName='Courier',
        fontSize=6.8,
        leading=8.6,
        textColor=colors.HexColor('#09090B'),
        wordWrap=None
    )

    style_prompt = ParagraphStyle(
        'PromptText',
        fontName='Courier',
        fontSize=7.2,
        leading=9.6,
        textColor=colors.HexColor('#18181B')
    )

    story = []

    # =========================================================================
    # 1. SOURCE CODE SECTION
    # =========================================================================
    story.append(Paragraph("1. Source Code", style_h1))
    story.append(Paragraph(
        "CreatorIQ has been modified into an API-ready architecture consisting of an interactive "
        "HTML5 and Tailwind CSS frontend client with native Drag & Drop, File API, video preview player, "
        "and a Python Flask REST API backend prepared for future FFmpeg/FFprobe media extraction, "
        "YouTube Data and Analytics APIs, and machine learning inference pipelines.",
        style_body
    ))
    story.append(Spacer(1, 4))

    source_files = [
        ("1.1 Frontend Interface & Fetch API Client - index.html", "index.html"),
        ("1.2 Flask Backend Application Entrypoint - backend/app.py", "backend/app.py"),
        ("1.3 Video Upload Route Blueprint - backend/routes/upload.py", "backend/routes/upload.py"),
        ("1.4 Video Analysis & Results Blueprint - backend/routes/analysis.py", "backend/routes/analysis.py"),
        ("1.5 YouTube Data & Analytics Blueprint - backend/routes/youtube.py", "backend/routes/youtube.py"),
        ("1.6 FFmpeg / FFprobe Video Analyzer Service - backend/services/video_analyzer.py", "backend/services/video_analyzer.py"),
        ("1.7 YouTube API Service Architecture - backend/services/youtube_service.py", "backend/services/youtube_service.py"),
        ("1.8 Backend Environment Configuration - .env.example", ".env.example"),
        ("1.9 Backend Security Exclusion Configuration - .gitignore", ".gitignore"),
    ]

    for title, filepath in source_files:
        story.append(Paragraph(title, style_h2))
        content = read_file_content(filepath)
        story.append(Preformatted(content, style_code))
        story.append(Spacer(1, 8))

    story.append(PageBreak())

    # =========================================================================
    # 2. SCREENSHOTS SECTION
    # =========================================================================
    story.append(Paragraph("2. Screenshots - CreatorIQ Platform", style_h1))
    story.append(Paragraph(
        "The following screenshots document the CreatorIQ application interface, featuring the preserved dark/red glowing "
        "aesthetic, responsive layout, interactive HTML5 Drag & Drop upload dropzone, video preview player with extracted "
        "metadata, live API connection status indicators, and the Diagnostic & Engagement Overview dashboard with authentic "
        "AI Analysis Pending and Coming Soon placeholders.",
        style_body
    ))
    story.append(Spacer(1, 6))

    screenshots = [
        ("extracted_imgs/p21_img1.png", "Figure 1: CreatorIQ Desktop Landing Page & Hero Section ('Make Every Upload Count.') with Floating Dashboard Mockup"),
        ("extracted_imgs/screenshot_workspace.png", "Figure 2: CreatorIQ Workspace with Interactive HTML5 Drag & Drop Upload Zone and API Connection Status Section"),
        ("extracted_imgs/screenshot_preview.png", "Figure 3: Embedded Video Preview Player with Extracted File Metadata (Filename, Size, Duration, Format) & Controls"),
        ("extracted_imgs/screenshot_dashboard.png", "Figure 4: Diagnostic & Engagement Overview Dashboard with 'AI Analysis Pending' & 'Coming Soon' Cards, and AI Recommendations"),
        ("extracted_imgs/screenshot_architecture.png", "Figure 5: Backend Flask REST Architecture, Modular Blueprints, Subsystem Separation, and Endpoints Overview"),
    ]

    for img_path, caption in screenshots:
        if os.path.exists(img_path):
            img_obj = Image(img_path, width=480, height=255)
            story.append(KeepTogether([
                img_obj,
                Paragraph(caption, style_caption)
            ]))
            story.append(Spacer(1, 6))

    story.append(PageBreak())

    # =========================================================================
    # 3. GITHUB REPOSITORY LINK SECTION
    # =========================================================================
    story.append(Paragraph("3. GitHub Repository Link", style_h1))
    
    repo_data = [
        [Paragraph("<b>GitHub Repository URL:</b>", style_body), 
         Paragraph("<font color='#0969DA'><u>https://github.com/vismitaa-s/Full-Stack-Development-</u></font>", style_body)],
        [Paragraph("<b>Latest Commit URL:</b>", style_body), 
         Paragraph("<font color='#0969DA'><u>https://github.com/vismitaa-s/Full-Stack-Development-/commit/ae0e58e</u></font>", style_body)],
        [Paragraph("<b>Commit Hash:</b>", style_body), 
         Paragraph("<font name='Courier'>ae0e58e</font>", style_body)],
        [Paragraph("<b>Branch:</b>", style_body), 
         Paragraph("<font name='Courier'>main</font>", style_body)],
        [Paragraph("<b>Commit Message:</b>", style_body), 
         Paragraph("Implement API-ready architecture for CreatorIQ: HTML5 Drag & Drop, video preview, Flask REST backend, and AI/ML placeholders", style_body)],
    ]
    
    t_repo = Table(repo_data, colWidths=[140, 360])
    t_repo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F4F4F5')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E4E4E7')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E4E4E7')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_repo)
    story.append(Spacer(1, 14))

    # =========================================================================
    # 4. AI USAGE DECLARATION SECTION
    # =========================================================================
    story.append(Paragraph("4. AI Usage Declaration", style_h1))
    
    story.append(Paragraph("<b>AI Tool Used:</b> Antigravity AI (Google DeepMind / Gemini 3.8 Flash)", style_body))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>Purpose of Usage:</b>", style_body))
    purposes = [
        "Architecting and implementing the interactive HTML5 Drag and Drop API and File API for client-side video file handling, format validation (MP4, MOV, WebM up to 2GB), dynamic visual feedback (red border, glow, and label transitions), and video preview playback.",
        "Developing client-side asynchronous duration and metadata extraction routines from the native HTML5 video element without requiring external server calls.",
        "Structuring the frontend JavaScript Fetch API integration points for POST /api/upload (FormData packaging without premature ML processing), POST /api/analyze, and GET /api/analysis/{id}.",
        "Designing the Python Flask REST backend architecture, including application factory setup with CORS, health check endpoint (GET /api/health), and modular blueprints for upload, analysis, and YouTube services.",
        "Preparing the service architectures for future FFmpeg/FFprobe video inspection (probing resolution, FPS, duration, bitrate, and codecs) and YouTube Data API v3 / YouTube Analytics API with secure backend environment variable handling.",
        "Refactoring the dashboard cards to display authentic 'AI Analysis Pending' and 'Coming Soon' placeholder states rather than fabricated numbers, while adding cards for Audience Analysis and Viewer Retention.",
        "Adding a subtle, visually harmonious API Connection status widget to the active dashboard without disrupting the premium dark/red SaaS design or animations.",
        "Establishing security best practices by keeping API credentials out of frontend code and providing .env.example alongside .gitignore configuration."
    ]
    for p in purposes:
        story.append(Paragraph(f"&bull; {p}", style_bullet))

    story.append(Spacer(1, 10))

    # 4.1 Prompt Mention
    story.append(Paragraph("<b>Prompt Provided to the AI:</b>", style_body))
    story.append(Paragraph(
        "The following prompt was provided to guide the architecture, development scope, design constraints, and implementation:",
        style_body
    ))
    story.append(Spacer(1, 4))

    prompt_text = """Modify my existing CreatorIQ project.

IMPORTANT:
DO NOT redesign the website.
DO NOT change the existing theme.
DO NOT remove any existing features.
DO NOT change the landing page structure.
DO NOT change the animations or responsive design.

Keep the existing design and functionality exactly as it is.
ONLY make the API-related modifications described below.

==================================================
PROJECT
==================================================
Project name: CreatorIQ
Purpose: An AI-powered YouTube pre-upload assistant where creators can upload their edited video before publishing and later receive AI/ML-based analysis about video quality, engagement potential and improvements.

==================================================
EXISTING DESIGN -- KEEP EXACTLY THE SAME
==================================================
Keep the current design:
- Premium dark/black background
- Red YouTube-inspired accent
- Red glowing gradients
- White bold typography
- Dark cards
- Subtle borders
- Floating UI elements
- Modern AI/SaaS appearance
- Responsive layout
- Smooth scrolling
- Floating dashboard
- Red glow effects
- Existing hero section
- Existing "Get Started" button
- Existing Home section
- Existing feature cards
- Existing "How It Works" section
Do NOT redesign anything.
Keep the existing brand name: CreatorIQ
Keep the existing hero: "Make Every Upload Count."
Keep the existing landing page and Home page exactly as currently designed.

==================================================
DRAG & DROP -- KEEP AND IMPLEMENT
==================================================
Keep the existing drag-and-drop video upload interface.
Use:
HTML5 Drag and Drop API
HTML5 File API
The user should be able to:
- Drag and drop a video
- Browse and select a video
- Validate the video
- Preview the video
- Display filename
- Display file size
- Display duration
- Display file type
- Remove the selected video
Supported: MP4, MOV, WebM
Keep the existing visual drag-and-drop design.
When dragging:
- Red border
- Red glow
- Smooth transition
- "Drop your video here"
Do not change the existing UI.

==================================================
ONLY API MODIFICATIONS
==================================================
Make the frontend API-ready without implementing the actual AI/ML analysis yet.
The APIs should provide the structure needed for future integration.
Use JavaScript Fetch API for communication.

1. VIDEO UPLOAD API: POST /api/upload
- Create FormData, add video file, send via Fetch API.
- Do not perform AI/ML analysis during upload.

2. VIDEO ANALYSIS API: POST /api/analyze
- Prepare endpoint structure.
- Add code comment: // AI/ML video analysis will be connected here in the next development phase.
- Do not calculate fake scores/predictions.

3. ANALYSIS RESULTS API: GET /api/analysis/{id}
- Return video quality, engagement score, views, likes, shares, audience, retention, recommendations.
- Display placeholders: "AI Analysis Pending", "Will be available after ML integration".

4. YOUTUBE DATA API V3 & 5. YOUTUBE ANALYTICS API
- Create separate service/configuration structure.
- Data will be used for engagement prediction model training.
- Never place API key in frontend code; use backend environment variables.

6. FFMPEG / FFPROBE
- Prepare backend architecture for extracting resolution, FPS, duration, bitrate, video codec, audio codec, audio presence.
- Do not implement quality scoring now.

7. FLASK BACKEND API STRUCTURE
- Endpoints: POST /api/upload, POST /api/analyze, GET /api/analysis/{id}, GET /api/health.

8. MACHINE LEARNING -- FUTURE ONLY
- Do not train models or generate fake predictions. UI placeholders only.

9. EXISTING ANALYSIS DASHBOARD -- KEEP
- Keep cards for: VIDEO QUALITY, ENGAGEMENT SCORE, ESTIMATED VIEWS, ESTIMATED LIKES, ESTIMATED SHARES, AUDIENCE ANALYSIS, VIEWER RETENTION, AI RECOMMENDATIONS.
- Display "AI Analysis Pending" or "Coming Soon".

10. API STATUS
- Add subtle API status section to dashboard (Upload API: Ready, Analysis API: Ready for ML integration, YouTube API: Not connected, ML Model: Coming Soon).

11. SECURITY
- Do not expose API keys/secrets in frontend. Use .env in .gitignore.

12. PROJECT STRUCTURE
creatoriq/
|-- frontend/index.html
|-- backend/ (app.py, routes/, services/)
|-- .env.example, .gitignore, README.md"""

    story.append(Preformatted(clean_code_text(prompt_text), style_prompt))
    story.append(Spacer(1, 10))

    # Build the document
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Successfully generated {pdf_path}")

if __name__ == "__main__":
    build_pdf()
