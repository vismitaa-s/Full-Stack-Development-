/**
 * CreatorIQ API Service
 * Handles CRUD operations with JSON Server (http://localhost:3000/projects)
 * Supports HTTP methods: GET, POST, PUT, DELETE using Fetch API.
 * Includes graceful localStorage fallback if the mock server is offline.
 */

const API_BASE_URL = 'http://localhost:3000/projects';
const LOCAL_STORAGE_KEY = 'creatoriq_video_projects';

// Initial fallback mock data if localStorage is empty
const INITIAL_PROJECTS = [
  {
    id: "1",
    title: "Python Tutorial for Beginners",
    fileName: "python_tutorial.mp4",
    category: "Education",
    videoType: "Long-form",
    targetAudience: "Students",
    description: "Comprehensive hands-on Python programming tutorial covering syntax, functions, and OOP.",
    uploadDate: "2026-11-01",
    status: "Draft"
  },
  {
    id: "2",
    title: "Modern Full-Stack Development Crash Course",
    fileName: "fullstack_react_node.mp4",
    category: "Technology",
    videoType: "Long-form",
    targetAudience: "Professionals",
    description: "Step-by-step masterclass on React component architectures, REST API endpoints, and database models.",
    uploadDate: "2026-10-29",
    status: "Ready for Analysis"
  },
  {
    id: "3",
    title: "Top 5 YouTube Growth Secrets in 2026",
    fileName: "growth_hacks_shorts.mp4",
    category: "Entertainment",
    videoType: "YouTube Shorts",
    targetAudience: "Creators",
    description: "Quick 60-second viral breakdown on high-retention thumbnail hooks and audio pacing.",
    uploadDate: "2026-10-31",
    status: "Ready to Publish"
  },
  {
    id: "4",
    title: "Unreal Engine 5.4 Raytracing Gameplay Test",
    fileName: "ue5_gameplay_benchmark.mp4",
    category: "Gaming",
    videoType: "Long-form",
    targetAudience: "General audience",
    description: "Ultra 4K 60FPS graphical benchmark testing Lumen lighting and Nanite geometry fidelity.",
    uploadDate: "2026-11-01",
    status: "Analysis Pending"
  }
];

function getStoredLocalProjects() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

function saveStoredLocalProjects(projects) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('[CreatorIQ API] LocalStorage save error:', err);
  }
}

/**
 * READ: Fetch all video projects (GET)
 */
export async function getProjects() {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    saveStoredLocalProjects(data); // Sync local cache
    return { data, source: 'json-server' };
  } catch (error) {
    console.warn('[CreatorIQ API] JSON Server offline or unreachable, using local storage fallback.', error);
    const fallbackData = getStoredLocalProjects();
    return { data: fallbackData, source: 'local-fallback', warning: 'JSON Server on port 3000 unreachable. Using local cache.' };
  }
}

/**
 * CREATE: Add a new video project (POST)
 */
export async function addProject(project) {
  const newProject = {
    ...project,
    id: String(Date.now()) // ensures unique string id
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newProject)
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const saved = await response.json();
    // Also update local storage
    const current = getStoredLocalProjects();
    saveStoredLocalProjects([...current, saved]);
    return { data: saved, source: 'json-server' };
  } catch (error) {
    console.warn('[CreatorIQ API] POST failed on JSON Server, adding to local storage.', error);
    const current = getStoredLocalProjects();
    const updated = [...current, newProject];
    saveStoredLocalProjects(updated);
    return { data: newProject, source: 'local-fallback' };
  }
}

/**
 * UPDATE: Modify an existing video project (PUT)
 */
export async function updateProject(id, project) {
  const updatedProject = {
    ...project,
    id: String(id)
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedProject)
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const saved = await response.json();
    const current = getStoredLocalProjects();
    const updated = current.map(p => (String(p.id) === String(id) ? saved : p));
    saveStoredLocalProjects(updated);
    return { data: saved, source: 'json-server' };
  } catch (error) {
    console.warn(`[CreatorIQ API] PUT failed on JSON Server for id ${id}, updating local storage.`, error);
    const current = getStoredLocalProjects();
    const updated = current.map(p => (String(p.id) === String(id) ? updatedProject : p));
    saveStoredLocalProjects(updated);
    return { data: updatedProject, source: 'local-fallback' };
  }
}

/**
 * DELETE: Remove a video project (DELETE)
 */
export async function deleteProject(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const current = getStoredLocalProjects();
    const updated = current.filter(p => String(p.id) !== String(id));
    saveStoredLocalProjects(updated);
    return { success: true, id, source: 'json-server' };
  } catch (error) {
    console.warn(`[CreatorIQ API] DELETE failed on JSON Server for id ${id}, updating local storage.`, error);
    const current = getStoredLocalProjects();
    const updated = current.filter(p => String(p.id) !== String(id));
    saveStoredLocalProjects(updated);
    return { success: true, id, source: 'local-fallback' };
  }
}
