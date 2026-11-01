import React from 'react';

/**
 * Status Badge Color Helper
 */
function getStatusBadge(status) {
  switch (status) {
    case 'Published':
      return {
        bg: 'bg-emerald-950/60',
        border: 'border-emerald-600/40',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400'
      };
    case 'Ready to Publish':
      return {
        bg: 'bg-cyan-950/60',
        border: 'border-cyan-600/40',
        text: 'text-cyan-400',
        dot: 'bg-cyan-400'
      };
    case 'Analysis Pending':
      return {
        bg: 'bg-amber-950/60',
        border: 'border-amber-600/40',
        text: 'text-amber-400',
        dot: 'bg-amber-400 animate-pulse'
      };
    case 'Ready for Analysis':
      return {
        bg: 'bg-red-950/60',
        border: 'border-red-600/40',
        text: 'text-red-400',
        dot: 'bg-red-400 animate-pulse'
      };
    case 'Draft':
    default:
      return {
        bg: 'bg-zinc-900',
        border: 'border-zinc-700',
        text: 'text-zinc-400',
        dot: 'bg-zinc-500'
      };
  }
}

/**
 * Category Color Helper
 */
function getCategoryColor(cat) {
  switch (cat) {
    case 'Education':
      return 'text-blue-400 bg-blue-950/40 border-blue-800/40';
    case 'Technology':
      return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40';
    case 'Gaming':
      return 'text-purple-400 bg-purple-950/40 border-purple-800/40';
    case 'Entertainment':
      return 'text-rose-400 bg-rose-950/40 border-rose-800/40';
    case 'Lifestyle':
      return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
    case 'Music':
      return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
    case 'Travel':
      return 'text-orange-400 bg-orange-950/40 border-orange-800/40';
    default:
      return 'text-zinc-400 bg-zinc-900 border-zinc-800';
  }
}

/**
 * VideoCard Component
 * Displays a single video project record with rich aesthetics, tags, and action buttons.
 */
export default function VideoCard({ project, onEdit, onDelete }) {
  const statusBadge = getStatusBadge(project.status);
  const categoryBadge = getCategoryColor(project.category);
  const isShort = project.videoType?.toLowerCase().includes('short');

  return (
    <div className="group relative rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-red-500/50 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Top Header: Category, Video Type & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${categoryBadge}`}
            >
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              <span>{isShort ? '⚡' : '🎥'}</span>
              <span>{project.videoType}</span>
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
            <span>{project.status}</span>
          </span>
        </div>

        {/* Project Title */}
        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-2">
          {project.title}
        </h4>

        {/* Video Description */}
        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description || 'No description provided.'}
        </p>

        {/* Metadata Details Grid */}
        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 mb-4 text-xs">
          {/* File Name */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <span>📁</span> File:
            </span>
            <span
              className="font-mono text-zinc-300 truncate max-w-[170px]"
              title={project.fileName}
            >
              {project.fileName}
            </span>
          </div>

          {/* Target Audience */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <span>🎯</span> Audience:
            </span>
            <span className="text-zinc-300 font-medium">
              {project.targetAudience || 'General'}
            </span>
          </div>

          {/* Upload Date */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <span>📅</span> Date:
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">
              {project.uploadDate || '--'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Edit & Delete */}
      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 transition-all cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Edit Project</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(project)}
          className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-red-400 bg-zinc-800/60 hover:bg-red-950/50 border border-zinc-700/60 hover:border-red-600/50 transition-all cursor-pointer"
          title="Delete Project"
          aria-label="Delete Project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

    </div>
  );
}
