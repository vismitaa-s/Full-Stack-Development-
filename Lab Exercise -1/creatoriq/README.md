# CreatorIQ – AI-Powered YouTube Video Analyzer
## Lab Exercise 5 & 6: Domain-Based React Application

**Domain:** Video Analytics & YouTube Creator Pre-Upload Optimization  
**Module:** "MY VIDEO PROJECTS" & Video Pre-Upload Workspace  
**Institution:** Christ University – Trimester 2 – Full Stack Development  

---

## 🚀 Overview

**CreatorIQ** is an AI-inspired pre-upload YouTube video analyzer designed to help creators validate video quality, verify export configurations, and manage their pre-publication pipeline before publishing to YouTube.

In **Part 2 (Lab Exercises 5 & 6)**, the original HTML, Tailwind CSS, and JavaScript application was converted into a **modern, component-driven React application** with full **CRUD capabilities (Create, Read, Update, Delete)** and **Bonus Dynamic Search**, integrated with a **JSON Server** REST database.

---

## 🎯 Mandatory Lab Requirements Covered

| Requirement | Implementation Details |
|---|---|
| **Functional Components** | 12 dedicated functional components across `src/components/` |
| **JSX** | Semantic, clean JSX structure for all UI layers |
| **`useState()` Hook** | Managed across page routing, file selection, video metadata, CRUD records, search terms, and modals |
| **Event Handling** | `onClick`, `onChange`, `onSubmit`, `onDragEnter`, `onDragOver`, `onDragLeave`, `onDrop`, `onLoadedMetadata`, `onPlay`, `onPause`, `onEnded` |
| **Form Handling** | Multi-input form with validation for video project registration and editing |
| **Multiple Input Fields** | Text inputs, textarea, select dropdowns, radio buttons, date pickers |
| **Radio Buttons** | Video Type selection: `Long-form video` vs `YouTube Shorts` |
| **Select Dropdowns** | Category (8 categories), Target Audience (5 options), Status (5 states) |
| **Reusable Components** | `VideoCard`, `SearchBar`, `ConfirmationModal`, `ErrorModal`, `Navbar` |
| **CSS / Tailwind Styling** | Dark background (`#000`), glowing red accents (`#dc2626`, `#ef4444`), glassmorphism, floating keyframe animations |
| **CRUD Operations** | Complete Create (POST), Read (GET), Update (PUT), Delete (DELETE) via `http://localhost:3000/projects` |
| **Dynamic Search (Bonus)**| Live search across Title, File Name, Category, Status, and Description with `onChange` |
| **Original Design Preservation** | Preserved branding, hero section, satellite badges, dashboard metrics ("AI Analysis Pending"), and upload dropzone |

---

## 📁 Project Architecture & Structure

```
creatoriq/
│
├── public/                     # Static public assets
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Glassmorphic header & mobile navigation drawer
│   │   ├── LandingPage.jsx      # Hero, Features, How It Works, About, Pre-upload card, Footer
│   │   ├── HomePage.jsx         # Workspace container (Upload, CRUD Module, Dashboard)
│   │   ├── VideoUpload.jsx      # Drag-and-drop dropzone with 500 MB file validation
│   │   ├── VideoPreview.jsx     # HTML5 video preview player, live status pill & metadata grid
│   │   ├── VideoForm.jsx        # Multi-input form for adding and modifying video projects
│   │   ├── VideoList.jsx        # Responsive project cards grid (1-col mobile, 2-col tablet, 3-col desktop)
│   │   ├── VideoCard.jsx        # Individual project card with status/category badges and edit/delete actions
│   │   ├── SearchBar.jsx        # Bonus dynamic search input with category & status dropdown filters
│   │   ├── ConfirmationModal.jsx# Custom Tailwind confirmation modal (video analyze & delete confirmation)
│   │   ├── ErrorModal.jsx       # Custom Tailwind error modal (size limit >500MB & validation alerts)
│   │   └── AnalysisDashboard.jsx# Preserved 8-card diagnostic dashboard with ML-pending placeholders
│   │
│   ├── services/
│   │   └── api.js              # Fetch API REST service (GET, POST, PUT, DELETE) with localStorage fallback
│   │
│   ├── App.jsx                 # Central application state manager & page routing
│   ├── main.jsx                # React DOM root entry point
│   └── index.css               # Tailwind directives, Plus Jakarta Sans, grid pattern & float keyframes
│
├── db.json                     # JSON Server mock database (projects collection)
├── package.json                # Project dependencies, scripts (concurrently, vite, json-server)
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS theme extension
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Complete documentation & lab run guide
```

---

## 🛠️ Step-by-Step Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Open Terminal in `creatoriq` directory
```bash
cd creatoriq
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Application & Database (Recommended)
You can run **both** the React Vite dev server and the JSON Server database concurrently with a single command:
```bash
npm run dev
```

This launches:
- **React Frontend**: `http://localhost:5173`
- **JSON Server Database**: `http://localhost:3000/projects`

---

## 🔌 Running Services Separately (Alternative)

If you prefer to run the frontend and backend in separate terminals:

### Terminal 1: Start JSON Server
```bash
cd creatoriq
npm run server
```
*API Endpoint:* `http://localhost:3000/projects`

### Terminal 2: Start React Vite Development Server
```bash
cd creatoriq
npm run vite
```
*Application URL:* `http://localhost:5173`

---

## 🗄️ JSON Server Database Schema (`db.json`)

Each video project record in `db.json` adheres to the required schema:

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Python Tutorial for Beginners",
      "fileName": "python_tutorial.mp4",
      "category": "Education",
      "videoType": "Long-form",
      "targetAudience": "Students",
      "description": "Comprehensive hands-on Python programming tutorial covering syntax, functions, and OOP.",
      "uploadDate": "2026-11-01",
      "status": "Draft"
    }
  ]
}
```

### Supported HTTP Endpoints

| Method | Endpoint | Description |
|---|---|---|
| **GET** | `/projects` | Read all video projects |
| **POST** | `/projects` | Create a new video project |
| **PUT** | `/projects/:id` | Update an existing project |
| **DELETE** | `/projects/:id` | Remove a video project |

---

## 🧪 Testing the CRUD Operations

1. **READ (List & Cards):**
   - Click **"GET STARTED"** on the landing page or **"My Projects"** in the navigation header.
   - The saved video project cards are dynamically loaded from `http://localhost:3000/projects`.

2. **CREATE (Add New Project):**
   - Fill out the **"Add New Video Project"** form.
   - Enter Title, File Name, select a Category, choose Video Type (Long-form vs Shorts), select Audience and Status.
   - Click **"＋ Save Video Project"**.
   - A success toast appears, the form clears, and the new project card immediately renders in the grid.

3. **UPDATE (Edit Project):**
   - Click **"Edit Project"** on any project card.
   - The form scrolls into view in **Edit Mode** with all fields pre-filled.
   - Modify fields (e.g. change status to *Published* or category to *Technology*) and click **"✓ Update Video Project"**.
   - The card updates in real time and syncs to `db.json`.

4. **DELETE (Delete Project):**
   - Click the trash icon on any project card.
   - A custom Tailwind confirmation modal appears displaying the project title and warning.
   - Click **"Delete Project"** to remove the record via `DELETE /projects/:id`.

5. **DYNAMIC SEARCH (Bonus):**
   - Type any keyword in the search bar (e.g., "Python", "Shorts", "Education", "Draft").
   - Results filter instantly via React `onChange` state without refreshing the page.

---

## 🛡️ Note on AI/ML Predictions

Per lab exercise guidelines:
- No fake predictions or randomized numbers are generated.
- All diagnostic metrics display **"AI Analysis Pending"** / **"AI/ML Integration Pending"**.
- Video file inspection (duration, resolution, size, container format) runs client-side using the native HTML5 Video and File APIs.
