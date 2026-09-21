# CreatorIQ — AI-Powered YouTube Pre-Upload Assistant

CreatorIQ is an AI-powered YouTube pre-upload assistant where creators can upload their edited video before publishing to receive automated technical inspection, quality metrics, and machine-learning based predictions for engagement potential and audience retention.

---

## Project Structure

```text
creatoriq/
│
├── frontend/
│   └── index.html                # Interactive frontend UI with HTML5 Drag & Drop & Video Preview
│
├── backend/
│   ├── app.py                    # Flask application factory, CORS & blueprint registration
│   ├── requirements.txt          # Python dependencies
│   ├── routes/
│   │   ├── upload.py             # POST /api/upload endpoint (validation & storage)
│   │   ├── analysis.py           # POST /api/analyze & GET /api/analysis/{id} endpoints
│   │   └── youtube.py            # YouTube Data API v3 & Analytics API endpoints
│   │
│   └── services/
│       ├── video_analyzer.py     # FFmpeg / FFprobe media extraction architecture
│       └── youtube_service.py    # YouTube Data API v3 & OAuth 2.0 analytics service
│
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git exclusion rules (secures .env, uploads, caches)
├── index.html                    # Root entrypoint for direct browser preview
└── README.md                     # Project documentation & API specifications
```

---

## Features & Implementation Status

### Phase 1: Frontend & API-Ready Architecture (Current Phase)
- **HTML5 Drag & Drop & File API**:
  - Drag and drop video interface with dynamic red border, red glow, and feedback.
  - Video selection via drag & drop or file browser.
  - Validation for MP4, MOV, and WebM containers up to 2GB.
  - HTML5 video preview player.
  - Metadata display: filename, file size, video duration, and container type.
  - Video removal and reset functionality.
- **Frontend Fetch API Integration**:
  - `POST /api/upload` integration with `FormData`.
  - `POST /api/analyze` integration structure.
  - `GET /api/analysis/{id}` polling structure.
  - Health check ping (`GET /api/health`).
- **Dashboard UI**:
  - Dedicated cards for Video Quality, Engagement Score, Estimated Views, Likes, Shares, Audience Analysis, Viewer Retention, and AI Recommendations.
  - Transparent placeholder states: `"AI Analysis Pending"` and `"Coming Soon"`.
  - Subtle real-time API connection status indicator.
- **Backend Architecture**:
  - Modular Flask blueprints and services.
  - FFmpeg/FFprobe inspection service ready for subprocess/bindings.
  - YouTube Data API v3 and Analytics API services ready for credentials.

### Phase 2: AI/ML & Media Pipeline (Future Roadmap)
- FFmpeg/FFprobe deep frame inspection and audio loudness analysis (-14 LUFS).
- Pre-trained ML model integration for video quality scoring (0-100).
- YouTube Data API v3 integration for category benchmarking.
- Engagement prediction models (estimated views, likes, shares, virality index).
- Audience retention curve forecasting and automated hook pacing recommendations.

---

## API Specifications

| Method | Endpoint | Description | Status |
|---|---|---|---|
| `GET` | `/api/health` | Service health and subsystem readiness check | Active |
| `POST` | `/api/upload` | Uploads video file (`multipart/form-data`) | Active |
| `POST` | `/api/analyze` | Queues video for AI/ML evaluation | Ready for ML Model |
| `GET` | `/api/analysis/<id>` | Retrieves analysis results | Ready for ML Model |
| `GET` | `/api/youtube/status` | Reports YouTube API configuration status | Architecture Ready |
| `GET` | `/api/youtube/video-stats`| Fetches public benchmark stats via Data API v3 | Architecture Ready |
| `GET` | `/api/youtube/analytics` | Fetches creator metrics via OAuth 2.0 | Architecture Ready |

---

## Security Best Practices

1. **Zero Secret Leakage in Frontend**: Never place YouTube API keys, Google Cloud OAuth secrets, or server tokens in `index.html` or client-side JavaScript.
2. **Backend Environment Variables**: All API keys are loaded strictly on the server through `.env`.
3. **Repository Cleanliness**: The `.env` file and `uploads/` directory are tracked and ignored in `.gitignore`.

---

## Getting Started

### 1. Run Frontend Directly
Open `index.html` in any modern web browser or start a static server:
```bash
# Using VS Code Live Server or Python http.server:
python -m http.server 3000
```

### 2. Run Flask Backend
1. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the backend:
   ```bash
   python backend/app.py
   ```
   The API will be available at `http://localhost:5000`.
