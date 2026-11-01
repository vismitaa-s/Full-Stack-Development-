import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import HomePage from './components/HomePage.jsx';
import ConfirmationModal from './components/ConfirmationModal.jsx';
import ErrorModal from './components/ErrorModal.jsx';
import * as api from './services/api.js';

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 MB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * App Root Component
 * Central state management using React useState() and useEffect()
 * Connects JSON Server CRUD operations, video upload, custom modals, and cinematic page transitions.
 */
export default function App() {
  // Page view state: 'landing' | 'home'
  const [currentPage, setCurrentPage] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Video Upload & Preview State
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState('');

  // CRUD Video Projects State (JSON Server)
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [dbStatus, setDbStatus] = useState('Connected');

  // Notification Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Custom Modal States
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    icon: '⚠'
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'video', // 'video' | 'delete'
    title: '',
    message: '',
    videoDetails: null,
    projectDetails: null,
    onConfirm: () => {}
  });

  // Show Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // READ: Fetch all video projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const result = await api.getProjects();
      setProjects(result.data || []);
      if (result.source === 'json-server') {
        setDbStatus('Connected (Port 3000)');
      } else {
        setDbStatus('Local Mode (Cached)');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setDbStatus('Offline');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Smooth Page Transitions
  const transitionToPage = (newPage, targetSectionId = null) => {
    if (isTransitioning) return;
    if (currentPage === newPage && !targetSectionId) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);

        if (targetSectionId) {
          setTimeout(() => {
            const el = document.getElementById(targetSectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }, 250);
    }, 350);
  };

  const handleNavigate = (target) => {
    if (target === 'home') {
      transitionToPage('home');
    } else if (target === 'landing') {
      transitionToPage('landing');
    } else if (target === 'projects') {
      if (currentPage !== 'home') {
        transitionToPage('home', 'projects-section');
      } else {
        const el = document.getElementById('projects-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Anchor link on landing page: features, how-it-works, about
      if (currentPage !== 'landing') {
        transitionToPage('landing', target);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // File Select Handler
  const handleFileSelect = (file) => {
    // Revoke previous URL if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedVideoFile(file);
    setPreviewUrl(objectUrl);
    setAnalysisProgress(0);
    setAnalysisMessage('');

    // Open Video Confirmation Modal
    const ext = (file.name.includes('.') ? file.name.split('.').pop() : 'MP4').toUpperCase();
    setConfirmModal({
      isOpen: true,
      type: 'video',
      title: 'Confirm Video',
      message: 'Are you sure this is the video you want to analyze?',
      videoDetails: {
        fileName: file.name,
        fileSize: formatBytes(file.size),
        format: ext
      },
      projectDetails: null,
      onConfirm: () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        handleAnalyze();
      }
    });
  };

  // Remove Video Handler
  const handleRemoveVideo = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedVideoFile(null);
    setPreviewUrl(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setAnalysisMessage('');
  };

  // Analysis Simulation Handler (No fake scores, connects to pending pipeline)
  const handleAnalyze = async () => {
    if (!selectedVideoFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(25);
    setAnalysisMessage('Inspecting container format & audio tracks...');

    setTimeout(() => {
      setAnalysisProgress(65);
      setAnalysisMessage('Generating video payload for POST /api/analyze...');

      setTimeout(() => {
        setAnalysisProgress(100);
        setAnalysisMessage('Video payload ready. AI/ML integration pending in the next phase.');
        setIsAnalyzing(false);

        // Smooth scroll to analysis dashboard
        const dashboard = document.getElementById('analysis-dashboard');
        if (dashboard) {
          dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 700);
    }, 600);
  };

  // CREATE or UPDATE Project (CRUD)
  const handleAddOrUpdateProject = async (formData, id) => {
    try {
      if (id) {
        // UPDATE Operation (PUT)
        const res = await api.updateProject(id, formData);
        setProjects((prev) =>
          prev.map((p) => (String(p.id) === String(id) ? res.data : p))
        );
        setEditingProject(null);
        showToast(`✓ Project "${res.data.title}" updated successfully!`);
      } else {
        // CREATE Operation (POST)
        const res = await api.addProject(formData);
        setProjects((prev) => [...prev, res.data]);
        showToast(`✓ Project "${res.data.title}" added to My Video Projects!`);
      }
    } catch (err) {
      console.error('Error saving project:', err);
      showErrorModal('Database Error', 'Failed to save project. Please check if JSON Server is running.');
    }
  };

  // DELETE Project Request (triggers confirmation modal)
  const handleRequestDelete = (project) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      title: 'Delete Video Project',
      message:
        'Are you sure you want to delete this project? This will remove the record from your database.',
      videoDetails: null,
      projectDetails: {
        title: project.title,
        fileName: project.fileName,
        category: project.category
      },
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await api.deleteProject(project.id);
          setProjects((prev) => prev.filter((p) => String(p.id) !== String(project.id)));
          if (editingProject && String(editingProject.id) === String(project.id)) {
            setEditingProject(null);
          }
          showToast(`🗑️ Project "${project.title}" was deleted.`, 'info');
        } catch (err) {
          console.error('Error deleting project:', err);
          showErrorModal('Delete Error', 'Failed to delete project from JSON Server.');
        }
      }
    });
  };

  // Show Error Modal helper
  const showErrorModal = (title, message, icon = '⚠') => {
    setErrorModal({
      isOpen: true,
      title,
      message,
      icon
    });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      {/* Ambient Red Glow Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-red-600 rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute top-[40%] -right-32 w-[500px] h-[500px] bg-red-700 rounded-full blur-[150px] opacity-15"></div>
        <div className="absolute bottom-20 -left-32 w-[500px] h-[500px] bg-red-600 rounded-full blur-[140px] opacity-15"></div>
      </div>

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>

      {/* Sticky Glassmorphic Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        projectCount={projects.length}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[110] max-w-md p-4 rounded-xl bg-zinc-950/95 border border-red-500/60 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-base text-red-400">
            {toast.type === 'info' ? 'ℹ' : '✓'}
          </span>
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="relative z-10">
        {currentPage === 'landing' ? (
          <LandingPage
            onGetStarted={() => transitionToPage('home')}
            onNavigate={handleNavigate}
          />
        ) : (
          <HomePage
            onBackToLanding={() => transitionToPage('landing')}
            selectedFile={selectedVideoFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onRemoveVideo={handleRemoveVideo}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            analysisProgress={analysisProgress}
            analysisMessage={analysisMessage}
            onError={(err) => showErrorModal(err.title, err.message, err.icon)}
            projects={projects}
            isLoadingProjects={isLoadingProjects}
            onAddOrUpdateProject={handleAddOrUpdateProject}
            editingProject={editingProject}
            onEditProject={setEditingProject}
            onCancelEdit={() => setEditingProject(null)}
            onDeleteProject={handleRequestDelete}
            dbStatus={dbStatus}
          />
        )}
      </main>

      {/* Cinematic Dark/Red Page Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-red-600/30 blur-2xl animate-ping"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-2xl shadow-red-600/60 border border-red-400/30 scale-100">
                <svg className="w-8 h-8 text-white fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-extrabold tracking-tight text-white flex items-center justify-center gap-1">
                Entering Creator
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                  IQ
                </span>
              </div>
              <div className="text-xs font-medium text-zinc-400 tracking-wider uppercase">
                Loading Workspace...
              </div>
            </div>
            <div className="w-48 bg-zinc-800 rounded-full h-1 overflow-hidden mt-1">
              <div className="bg-gradient-to-r from-red-600 to-rose-500 h-1 rounded-full w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Video & Delete) */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        videoDetails={confirmModal.videoDetails}
        projectDetails={confirmModal.projectDetails}
        confirmText={confirmModal.type === 'delete' ? 'Delete Project' : 'Yes, Analyze'}
        cancelText="Cancel"
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal((prev) => ({ ...prev, isOpen: false }))}
        title={errorModal.title}
        message={errorModal.message}
        icon={errorModal.icon}
      />

    </div>
  );
}
