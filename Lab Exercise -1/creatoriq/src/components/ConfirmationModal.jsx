import React from 'react';

/**
 * ConfirmationModal Component
 * Reusable modal for confirming video analysis and confirming project deletion.
 * Styled with CreatorIQ's signature dark/red theme, backdrop blur, and smooth scaling.
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Video',
  message = 'Are you sure this is the video you want to analyze?',
  type = 'video', // 'video' | 'delete'
  videoDetails = null, // { fileName, fileSize, format }
  projectDetails = null, // { title, fileName, category }
  confirmText = 'Yes, Analyze',
  cancelText = 'Cancel'
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md bg-zinc-950 border rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.2)] transform transition-all duration-300 ease-out text-center space-y-5 ${
          type === 'delete' ? 'border-red-600/70' : 'border-zinc-800 hover:border-red-500/40'
        }`}
      >
        {/* Icon */}
        <div
          className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
            type === 'delete'
              ? 'bg-red-950/80 border border-red-500/50 text-red-400 shadow-red-950/50'
              : 'bg-red-950/40 border border-red-600/30 text-red-400 shadow-red-900/30'
          }`}
        >
          <span>{type === 'delete' ? '🗑️' : '🎬'}</span>
        </div>

        {/* Title & Prompt */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Video File Details Card (when type is 'video') */}
        {type === 'video' && videoDetails && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 font-medium">Video:</span>
              <span
                className="font-mono font-semibold text-white truncate max-w-[200px]"
                title={videoDetails.fileName}
              >
                {videoDetails.fileName}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-zinc-400 font-medium">Size:</span>
              <span className="font-semibold text-white">
                {videoDetails.fileSize}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-medium">Format:</span>
              <span className="font-semibold text-emerald-400 uppercase">
                {videoDetails.format}
              </span>
            </div>
          </div>
        )}

        {/* Project Details Card (when type is 'delete') */}
        {type === 'delete' && projectDetails && (
          <div className="bg-zinc-900/70 border border-red-900/40 rounded-xl p-4 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
              <span className="text-zinc-400">Project Title:</span>
              <span className="font-bold text-white truncate max-w-[200px]">
                {projectDetails.title}
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
              <span className="text-zinc-400">File Name:</span>
              <span className="font-mono text-zinc-300 truncate max-w-[200px]">
                {projectDetails.fileName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Category:</span>
              <span className="text-red-400 font-semibold">
                {projectDetails.category}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white shadow-lg transition-all cursor-pointer ${
              type === 'delete'
                ? 'bg-red-700 hover:bg-red-600 shadow-red-700/30 hover:scale-[1.02]'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
