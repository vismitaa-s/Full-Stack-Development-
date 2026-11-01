import React from 'react';

/**
 * LandingPage Component
 * Fully preserves the existing CreatorIQ landing page:
 * - Ambient glow & floating dashboard mockup with satellite badges
 * - Hero section with red YouTube-inspired accents
 * - Features section with 3 core capability cards
 * - How It Works 4-step workflow
 * - About section with live stats and Pre-Upload checklist card
 * - Footer with architecture stack specification
 */
export default function LandingPage({ onGetStarted, onNavigate }) {
  return (
    <div className="transition-all duration-500 ease-out">

      {/* ================================================================= */}
      {/* 1. HERO SECTION                                                   */}
      {/* ================================================================= */}
      <section className="relative z-10 pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              
              {/* Red Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>AI-POWERED YOUTUBE ANALYTICS</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Make Every <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Upload Count.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Analyze your video before publishing. Discover its quality, engagement potential, and what you can improve before it goes live.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Get Started →</span>
                </button>
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-sm text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 transition-all"
                >
                  Explore Features
                </a>
              </div>

              {/* Tagline */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs tracking-widest uppercase font-medium text-zinc-400">
                <span className="text-red-400">Analyze</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200">Improve</span>
                <span className="text-zinc-600">•</span>
                <span className="text-red-400">Upload</span>
              </div>

              {/* Trust Stats Bar */}
              <div className="pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl font-bold text-white">99.4%</div>
                  <div className="text-[11px] text-zinc-400">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">&lt; 30s</div>
                  <div className="text-[11px] text-zinc-400">Full Analysis</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">4K 60fps</div>
                  <div className="text-[11px] text-zinc-400">HDR Support</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard Mockup */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-6">
              
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-3xl pointer-events-none"></div>

              {/* Main Floating Dashboard Card */}
              <div className="relative w-full max-w-lg bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl animate-float hover:border-red-500/40 transition-colors">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-red-500">CreatorIQ Engine</div>
                      <div className="text-sm font-semibold text-white">Video Analysis</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-700/40 text-[11px] font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Scanned
                  </div>
                </div>

                {/* Score Progress */}
                <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-zinc-400">VIDEO QUALITY</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">87</span>
                      <span className="text-sm font-semibold text-zinc-400">/ 100</span>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-rose-500 h-2.5 rounded-full w-[87%]"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] text-zinc-400">
                    <span>Optimal YouTube standard met</span>
                    <span className="text-emerald-400 font-semibold">Top 12% in Category</span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">📺</span>
                      <span className="text-xs font-medium text-zinc-300">Resolution</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-xs font-semibold">Excellent</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">🎙️</span>
                      <span className="text-xs font-medium text-zinc-300">Audio</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold">Good</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">💡</span>
                      <span className="text-xs font-medium text-zinc-300">Lighting</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold">Good</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">🔍</span>
                      <span className="text-xs font-medium text-zinc-300">Sharpness</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-xs font-semibold">Excellent</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Analyzed with Neural Engine 3.2
                  </span>
                  <span className="text-zinc-300 font-mono">sample_vlog_final.mp4</span>
                </div>
              </div>

              {/* Satellite Badge 1: Top Right */}
              <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-6 bg-zinc-900/90 backdrop-blur-md border border-red-500/40 rounded-xl p-3 shadow-xl animate-float-delayed z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-sm">87%</div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Score</div>
                    <div className="text-xs font-bold text-white">87% Quality</div>
                  </div>
                </div>
              </div>

              {/* Satellite Badge 2: Bottom Left */}
              <div className="absolute -bottom-6 -left-3 sm:-left-8 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-xl p-3.5 shadow-xl animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Prediction</div>
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <span>High Engagement</span>
                      <span>🔥</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Satellite Badge 3: Bottom Right */}
              <div className="hidden sm:flex absolute -bottom-5 -right-6 bg-zinc-900/90 backdrop-blur-md border border-red-500/30 rounded-xl p-3 shadow-xl animate-float-delayed z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">🤖</div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">AI Assistant</div>
                    <div className="text-xs font-bold text-white">AI Recommendation</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. FEATURES SECTION                                               */}
      {/* ================================================================= */}
      <section id="features" className="relative z-10 py-20 border-t border-zinc-900 bg-gradient-to-b from-transparent via-zinc-950/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything You Need Before You Upload
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Stop guessing how the YouTube algorithm and viewers will react. Validate your production before making it public.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-red-500/60 p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-zinc-800/80 group-hover:bg-red-600/20 border border-zinc-700/50 group-hover:border-red-500/40 flex items-center justify-center text-2xl mb-6 transition-colors">
                🎥
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                Video Quality
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Check resolution, clarity, lighting and audio quality before publishing. Detect compression artifacts, noise and volume imbalances instantly.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center text-xs font-semibold text-zinc-400 group-hover:text-red-400 transition-colors">
                <span>Automated frame scan</span>
                <span className="ml-auto">→</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-red-500/60 p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-zinc-800/80 group-hover:bg-red-600/20 border border-zinc-700/50 group-hover:border-red-500/40 flex items-center justify-center text-2xl mb-6 transition-colors">
                📊
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                Engagement Prediction
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Estimate potential views, likes and shares using AI-powered analysis trained on millions of high-performing YouTube trends.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center text-xs font-semibold text-zinc-400 group-hover:text-red-400 transition-colors">
                <span>Pacing & retention modeling</span>
                <span className="ml-auto">→</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-red-500/60 p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-zinc-800/80 group-hover:bg-red-600/20 border border-zinc-700/50 group-hover:border-red-500/40 flex items-center justify-center text-2xl mb-6 transition-colors">
                🤖
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                AI Recommendations
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Discover changes that could improve your video's performance. Get actionable advice on hook pacing, audio ducking, and captioning.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center text-xs font-semibold text-zinc-400 group-hover:text-red-400 transition-colors">
                <span>Actionable checklist</span>
                <span className="ml-auto">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. HOW IT WORKS SECTION                                           */}
      {/* ================================================================= */}
      <section id="how-it-works" className="relative z-10 py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider">
              Simple 4-Step Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Edit to Upload
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Integrate CreatorIQ into your export pipeline without adding friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="relative flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">01</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">📁</div>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">UPLOAD</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Upload your edited video.</p>
              <div className="mt-4 text-[11px] text-zinc-400">Supports MP4, MOV, WebM</div>
            </div>

            <div className="relative flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">02</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">⚡</div>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">ANALYZE</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">AI evaluates the video.</p>
              <div className="mt-4 text-[11px] text-zinc-400">Frames, audio & pacing</div>
            </div>

            <div className="relative flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">03</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">🛠️</div>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">IMPROVE</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Follow the recommendations.</p>
              <div className="mt-4 text-[11px] text-zinc-400">Apply AI suggested tweaks</div>
            </div>

            <div className="relative flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">04</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">🚀</div>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">PUBLISH</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Upload your optimized video.</p>
              <div className="mt-4 text-[11px] text-zinc-400">Ship with total confidence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. ABOUT SECTION                                                  */}
      {/* ================================================================= */}
      <section id="about" className="relative z-10 py-20 border-t border-zinc-900 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider">
                Why CreatorIQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for High-Growth YouTube Creators
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Every day, creators spend dozens of hours editing only to have YouTube's initial impressions flatline due to avoidable audio drops, dim lighting, or weak 5-second hook pacing.
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                CreatorIQ acts as your objective AI copilot. By evaluating frame dynamics, audio fidelity, and historical viewer retention heuristics before publication, you never waste an upload opportunity again.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-bold text-white">10M+</div>
                  <div className="text-xs text-zinc-400 mt-1">Data Points Analyzed</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-bold text-white">0%</div>
                  <div className="text-xs text-zinc-400 mt-1">Quality Compromise</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-bold text-red-500">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Creator-Centric</div>
                </div>
              </div>
            </div>

            {/* Right: Pre-Upload Checklist Card */}
            <div className="lg:col-span-5 relative">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-bold uppercase text-zinc-400">Pre-Upload Checklist</span>
                  <span className="text-xs text-red-400 font-semibold">AI Diagnostic Active</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300">Thumbnail / Hook Contrast</span>
                    <span className="text-emerald-400 font-bold">Optimized</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300">Loudness Compliance (-14 LUFS)</span>
                    <span className="text-emerald-400 font-bold">Passed</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300">Bitrate & Compression artifacts</span>
                    <span className="text-emerald-400 font-bold">Clear</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300">Audience Retention Drop Probability</span>
                    <span className="text-zinc-300 font-bold">Low (11%)</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                  >
                    Test Your Video Now <span>→</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. FOOTER                                                         */}
      {/* ================================================================= */}
      <footer className="relative z-10 border-t border-zinc-900 bg-black pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/30">
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Creator
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    IQ
                  </span>
                </span>
              </div>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                AI-powered video diagnostics for modern creators. Analyze quality, anticipate audience engagement, and optimize before going live on YouTube.
              </p>
              <div className="text-xs text-zinc-400">
                Full Stack Development Lab Exercise 5 & 6 — Christ University
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300">Quick Navigation</div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="hover:text-red-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Upload & Workspace
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300">Architecture & Stack</div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-300">Frontend Technology:</span>
                  <span className="text-red-400 font-semibold">React.js (Functional Components + Hooks)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">Styling System:</span>
                  <span className="text-rose-400 font-semibold">Tailwind CSS + Keyframe Animations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">Database Engine:</span>
                  <span className="text-emerald-400 font-semibold">JSON Server REST API (port 3000)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">CRUD Module:</span>
                  <span className="text-white font-semibold">MY VIDEO PROJECTS</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <div>
              &copy; 2026 CreatorIQ Platform. Built for Domain-Based React Lab.
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={onGetStarted}
                className="text-red-400 hover:text-red-300 font-medium cursor-pointer"
              >
                Launch Workspace ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
