import React, { useRef } from 'react';
import VideoUpload from './VideoUpload.jsx';
import VideoPreview from './VideoPreview.jsx';
import VideoForm from './VideoForm.jsx';
import VideoList from './VideoList.jsx';
import AnalysisDashboard from './AnalysisDashboard.jsx';

/**
 * HomePage Component
 * Workspace view containing:
 * 1. Video Upload & Interactive Preview with HTML5 Player
 * 2. "MY VIDEO PROJECTS" Complete CRUD Module (Create, Read, Update, Delete)
 * 3. Preserved Analysis Dashboard with authentic ML-pending placeholders
 */
export default function HomePage({
  onBackToLanding,
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemoveVideo,
  onAnalyze,
  isAnalyzing,
  analysisProgress,
  analysisMessage,
  onError,
  projects,
  isLoadingProjects,
  onAddOrUpdateProject,
  editingProject,
  onEditProject,
  onCancelEdit,
  onDeleteProject,
  dbStatus
}) {
  const formRef = useRef(null);

  const handleEditClick = (project) => {
    onEditProject(project);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddNewClick = () => {
    onCancelEdit();
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToProjectsFromPreview = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative z-10 py-12 sm:py-20 border-t border-zinc-800/80 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Title with Back to Overview */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-500 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Overview</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider">
              CreatorIQ Workspace
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Welcome to CreatorIQ
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Prepare your next YouTube video before you publish.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. LARGE VIDEO UPLOAD & INTERACTIVE PREVIEW CARD          */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Ready to analyze your video?
            </h3>
            <p className="text-sm text-zinc-400">
              Upload your edited video and get insights into quality, engagement and possible improvements.
            </p>
          </div>

          {!selectedFile ? (
            <VideoUpload
              onFileSelect={onFileSelect}
              onError={onError}
            />
          ) : (
            <VideoPreview
              file={selectedFile}
              previewUrl={previewUrl}
              onRemoveVideo={onRemoveVideo}
              onAnalyze={onAnalyze}
              onAddToProjects={handleAddToProjectsFromPreview}
              isAnalyzing={isAnalyzing}
              analysisProgress={analysisProgress}
              analysisMessage={analysisMessage}
            />
          )}
        </div>

        {/* ========================================================= */}
        {/* 2. "MY VIDEO PROJECTS" CRUD MODULE (Create, Read, Update, Delete) */}
        {/* ========================================================= */}
        <div id="projects-section" className="max-w-6xl mx-auto space-y-10">
          
          {/* Form for Adding / Editing Video Projects */}
          <div ref={formRef}>
            <VideoForm
              onSubmit={onAddOrUpdateProject}
              editingProject={editingProject}
              onCancelEdit={onCancelEdit}
              currentUploadedFileName={selectedFile?.name || null}
            />
          </div>

          {/* List & Cards with Dynamic Search */}
          <VideoList
            projects={projects}
            isLoading={isLoadingProjects}
            onEditProject={handleEditClick}
            onDeleteProject={onDeleteProject}
            onAddNewClick={handleAddNewClick}
          />

        </div>

        {/* ========================================================= */}
        {/* 3. HOME PAGE ANALYSIS DASHBOARD                           */}
        {/* ========================================================= */}
        <AnalysisDashboard
          onUploadAnother={onRemoveVideo}
          dbStatus={dbStatus}
        />

      </div>
    </section>
  );
}
