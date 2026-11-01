import React from 'react';

/**
 * AnalysisDashboard Component
 * Preserves the authentic CreatorIQ pre-upload analytics dashboard.
 * Explicitly maintains placeholder states ("AI Analysis Pending" / "AI/ML Integration Pending")
 * without generating fake prediction numbers, per lab exercise specifications.
 */
export default function AnalysisDashboard({ onUploadAnother, dbStatus = 'Connected' }) {
  return (
    <div id="analysis-dashboard" className="max-w-6xl mx-auto space-y-6 pt-6">

      {/* ========================================================= */}
      {/* 1. SUBTLE API STATUS SECTION                              */}
      {/* ========================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider uppercase text-zinc-300">
              API & DATABASE CONNECTION
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] text-zinc-400">Lab 5 & 6 Subsystem Architecture</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>REST API Active (Fetch API)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Upload API */}
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <span className="text-emerald-400 text-base leading-none">●</span> Video Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                Ready
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">HTML5 + File API</div>
          </div>

          {/* 2. JSON Server CRUD */}
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <span className="text-emerald-400 text-base leading-none">●</span> JSON Server
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                {dbStatus}
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">http://localhost:3000/projects</div>
          </div>

          {/* 3. Analysis API */}
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <span className="text-amber-400 text-base leading-none">●</span> Analysis API
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 text-amber-400 border border-amber-800/40">
                Ready for ML
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">POST /api/analyze</div>
          </div>

          {/* 4. ML Model Status */}
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <span className="text-rose-500 text-base leading-none">●</span> ML Model
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950/60 text-rose-400 border border-rose-800/40">
                Coming Soon
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">Model Pipeline</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DIAGNOSTIC & ENGAGEMENT OVERVIEW                       */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
            AI-Powered Predictions
          </div>
          <h3 className="text-2xl font-bold text-white">
            Diagnostic & Engagement Overview
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {onUploadAnother && (
            <button
              type="button"
              onClick={onUploadAnother}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-all cursor-pointer"
            >
              <span>↺ Test Another Video</span>
            </button>
          )}
          <p className="text-xs text-zinc-400 max-w-md text-left sm:text-right">
            Predictions are prepared for future ML inference models and YouTube benchmark data.
          </p>
        </div>
      </div>

      {/* Primary Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              VIDEO QUALITY
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div className="bg-zinc-700 h-1.5 rounded-full w-0"></div>
          </div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ENGAGEMENT PREDICTION
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div className="bg-zinc-700 h-1.5 rounded-full w-0"></div>
          </div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ESTIMATED VIEWS
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="text-[11px] text-zinc-400 mb-1">First 72-hour window projection</div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ESTIMATED LIKES
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="text-[11px] text-zinc-400 mb-1">Category benchmark prediction</div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>
      </div>

      {/* Secondary Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 5 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ESTIMATED SHARES
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="text-[11px] text-zinc-400 mb-1">Virality index & hook rating</div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              AUDIENCE ANALYSIS
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="text-[11px] text-zinc-400 mb-1">Demographic & interest targeting</div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>

        {/* Metric 7 */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              VIEWER RETENTION
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
              AI Analysis Pending
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2 mt-2">
            AI Analysis Pending
          </div>
          <div className="text-[11px] text-zinc-400 mb-1">Drop-off pacing curve modeling</div>
          <div className="text-[11px] text-zinc-400">
            Will be available after ML integration
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. AI RECOMMENDATIONS CARD                                */}
      {/* ========================================================= */}
      <div className="mt-8 rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">AI Recommendations</h4>
              <p className="text-xs text-zinc-400">Pre-publication review checklist & action items</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-lg">
            AI/ML Integration Coming Soon
          </span>
        </div>

        {/* Recommendation Checklist Items */}
        <div className="space-y-3">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Video resolution & bitrate inspection</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Will be available after ML integration and FFprobe structural inspection.
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0">
              Pending
            </span>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Visual quality & color consistency</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Will be available after ML integration. Automated neural frame analysis.
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0">
              Pending
            </span>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Audio clarity & loudness compliance (-14 LUFS)</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Will be available after ML integration. FFmpeg audio loudness filter scan.
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0">
              Pending
            </span>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Opening hook pacing & retention prediction</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Will be available after ML integration. First-5-seconds drop rate prediction model.
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0">
              Pending
            </span>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Caption accessibility & phonetic clarity</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Will be available after ML integration. Speech transcription diagnostics.
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 shrink-0">
              Pending
            </span>
          </div>
        </div>

        {/* Overall Recommendation Bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Overall Recommendation
            </div>
            <div className="text-sm text-zinc-300">
              AI recommendations will be generated automatically once the ML pipeline is connected.
            </div>
          </div>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-950/60 border border-amber-600/40 shadow-lg text-amber-400 font-bold text-sm tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>● AI/ML INTEGRATION COMING SOON</span>
          </div>
        </div>
      </div>

    </div>
  );
}
