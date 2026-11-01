import React, { useState, useRef } from 'react';

const SUPPORTED_EXTENSIONS = ['mp4', 'mov', 'webm'];
const SUPPORTED_MIME_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];
const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 MB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * VideoUpload Component
 * Implements React Drag-and-Drop and File API with 500 MB and format validation.
 */
export default function VideoUpload({ onFileSelect, onError }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const validateAndProcessFile = (file) => {
    if (!file) return;

    const fileName = file.name || '';
    const extension = fileName.includes('.')
      ? fileName.split('.').pop().toLowerCase()
      : '';
    const mimeType = (file.type || '').toLowerCase();

    const isExtensionValid = SUPPORTED_EXTENSIONS.includes(extension);
    const isMimeValid = SUPPORTED_MIME_TYPES.some(
      (type) => mimeType === type || mimeType.includes(type)
    );

    // Format validation
    if (!isExtensionValid && !isMimeValid) {
      onError({
        title: '⚠ Unsupported File',
        message:
          'Please upload an MP4, MOV, or WebM video format. Other formats are not supported.',
        icon: '⚠'
      });
      return;
    }

    // Size validation: Max 500 MB
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const formattedActual = formatBytes(file.size);
      onError({
        title: '⚠ Video Too Large',
        message: `Your selected video is ${formattedActual}. Please upload a video within the 500 MB limit.`,
        icon: '⚠'
      });
      return;
    }

    // Valid file
    onFileSelect(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragOver(false);

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndProcessFile(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const chosenFile = e.target.files[0];
      validateAndProcessFile(chosenFile);
      // Reset input value so same file can be re-selected if removed
      e.target.value = '';
    }
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Hidden native HTML file input triggered by dropzone or button */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
      />

      {/* Dashed Upload Dropzone Area */}
      <div
        onClick={handleBrowseClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 sm:p-14 transition-all duration-300 cursor-pointer text-center ${
          isDragOver
            ? 'border-red-500 bg-red-950/20 shadow-[0_0_35px_rgba(220,38,38,0.4)]'
            : 'border-zinc-700 hover:border-red-500/80 bg-zinc-950/40 hover:bg-zinc-900/30'
        }`}
      >
        {/* Ambient Glow */}
        <div
          className={`absolute inset-0 bg-red-600/5 rounded-2xl transition-opacity pointer-events-none ${
            isDragOver ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        ></div>

        {/* Upload Arrow Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-red-500 transition-all duration-300 shadow-lg shadow-black/60 ${
            isDragOver
              ? 'bg-red-600/25 border border-red-500 scale-110'
              : 'bg-zinc-900 group-hover:bg-red-600/20 border border-zinc-700 group-hover:border-red-500/50 group-hover:scale-110'
          }`}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Upload Text */}
        <h4
          className={`text-lg font-bold mb-1 transition-colors ${
            isDragOver ? 'text-red-400' : 'text-white group-hover:text-red-400'
          }`}
        >
          {isDragOver ? 'Drop your video here' : 'Upload Your Edited Video'}
        </h4>
        <p className="text-sm text-zinc-400 mb-6 transition-colors">
          {isDragOver
            ? 'Release to start pre-upload inspection'
            : 'Drag & drop your video here or browse your files'}
        </p>

        {/* Choose Video Button UI */}
        <button
          type="button"
          onClick={handleBrowseClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 group-hover:scale-105 transition-all"
        >
          <span>Choose Video</span>
        </button>

        <span className="text-[11px] text-zinc-400 mt-4">
          MP4, MOV, or WebM up to 500 MB • Fully confidential analysis
        </span>
      </div>
    </form>
  );
}
