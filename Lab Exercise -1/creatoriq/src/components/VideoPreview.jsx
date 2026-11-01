import React, { useState, useRef, useEffect } from 'react';

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 MB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatDuration(seconds) {
  if (isNaN(seconds) || seconds === Infinity || seconds < 0) return '--:--';
  const totalSecs = Math.round(seconds);
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const padMins = mins.toString().padStart(2, '0');
  const padSecs = secs.toString().padStart(2, '0');

  if (hrs > 0) {
    const padHrs = hrs.toString().padStart(2, '0');
    return `${padHrs}:${padMins}:${padSecs}`;
  }
  return `${padMins}:${padSecs}`;
}

/**
 * VideoPreview Component
 * Displays the HTML5 video preview player, live playback status, metadata grid,
 * analysis progress simulation, and action buttons.
 */
export default function VideoPreview({
  file,
  previewUrl,
  onRemoveVideo,
  onAnalyze,
  onAddToProjects,
  isAnalyzing = false,
  analysisProgress = 0,
  analysisMessage = ''
}) {
  const videoRef = useRef(null);
  const [playerState, setPlayerState] = useState('Ready for Analysis');
  const [metadata, setMetadata] = useState({
    duration: 'Calculating...',
    resolution: '-- × --'
  });

  const fileName = file?.name || 'video.mp4';
  const fileSize = formatBytes(file?.size);
  const format = (fileName.includes('.') ? fileName.split('.').pop() : 'MP4').toUpperCase();

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      const w = videoRef.current.videoWidth;
      const h = videoRef.current.videoHeight;

      setMetadata({
        duration: formatDuration(dur),
        resolution: w && h ? `${w} × ${h}` : '-- × --'
      });
    }
  };

  const handlePlay = () => setPlayerState('Playing');
  const handlePause = () => setPlayerState('Paused');
  const handleEnded = () => setPlayerState('Video finished');

  const getStatusBadgeStyle = () => {
    switch (playerState) {
      case 'Playing':
        return 'text-emerald-400 font-semibold';
      case 'Paused':
        return 'text-amber-400 font-semibold';
      case 'Video finished':
        return 'text-zinc-400 font-semibold';
      default:
        return 'text-zinc-400';
    }
  };

  const getStatusDotStyle = () => {
    switch (playerState) {
      case 'Playing':
        return 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
      case 'Paused':
        return 'w-2.5 h-2.5 rounded-full bg-amber-400';
      case 'Video finished':
        return 'w-2.5 h-2.5 rounded-full bg-zinc-500';
      default:
        return 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Preview Player Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className={getStatusDotStyle()}></span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Video Preview
          </span>
        </div>
        <span className={`text-xs font-mono ${getStatusBadgeStyle()}`}>
          {playerState}
        </span>
      </div>

      {/* Embedded HTML5 Video Player */}
      <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex items-center justify-center">
        {previewUrl ? (
          <video
            ref={videoRef}
            src={previewUrl}
            controls
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            className="w-full max-h-[380px] bg-black object-contain"
          />
        ) : (
          <div className="py-20 text-zinc-500 text-sm">No preview available</div>
        )}
      </div>

      {/* Video File Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metadata 1: Filename */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
            <span>📁</span> FILENAME
          </div>
          <div className="font-mono text-xs font-semibold text-white truncate" title={fileName}>
            {fileName}
          </div>
        </div>

        {/* Metadata 2: File Size */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
            <span>💾</span> FILE SIZE
          </div>
          <div className="text-xs font-semibold text-white">{fileSize}</div>
        </div>

        {/* Metadata 3: Duration */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
            <span>⏱️</span> DURATION
          </div>
          <div className="text-xs font-semibold text-white">{metadata.duration}</div>
        </div>

        {/* Metadata 4: Format & Resolution */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🎬</span> FORMAT
            </span>
            <span className="text-[9px] text-zinc-400 font-normal">RESOLUTION</span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <div className="text-xs font-semibold text-emerald-400 uppercase">{format}</div>
            <div className="text-xs font-mono text-zinc-300">{metadata.resolution}</div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onRemoveVideo}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/50 transition-all cursor-pointer"
        >
          <span>✕ Remove Video</span>
        </button>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
          {onAddToProjects && (
            <button
              type="button"
              onClick={onAddToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer"
            >
              <span>＋ Save to Projects</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer ${
              isAnalyzing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <span>{isAnalyzing ? 'Preparing Video...' : 'Analyze My Video →'}</span>
          </button>
        </div>
      </div>

      {/* Upload / Analysis API Status Feedback Box */}
      {(isAnalyzing || analysisProgress > 0) && (
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {analysisProgress === 100
                ? '✓ Video Payload Ready'
                : 'Preparing video for analysis...'}
            </span>
            <span className="font-mono text-zinc-400">{analysisProgress}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-rose-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
          <div className="text-[11px] text-zinc-400">
            {analysisMessage ||
              'Packaging video metadata and connecting to diagnostic pipeline...'}
          </div>
          {analysisProgress === 100 && (
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-amber-400 font-semibold">
                ● AI Analysis Pending (No fake predictions)
              </span>
              <button
                type="button"
                onClick={onRemoveVideo}
                className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-4 cursor-pointer"
              >
                ↺ Upload Another Video
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
