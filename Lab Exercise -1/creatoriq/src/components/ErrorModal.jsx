import React from 'react';

/**
 * ErrorModal Component
 * Reusable modal for error handling (size limit > 500MB, unsupported format, validation).
 * Preserves the red glow aesthetic, warning icon, and dismiss OK button.
 */
export default function ErrorModal({
  isOpen,
  onClose,
  title = 'Validation Error',
  message = 'An unexpected error occurred. Please check your inputs.',
  icon = '⚠'
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-zinc-950 border border-red-500/50 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.25)] transform scale-100 transition-all duration-300 ease-out text-center space-y-5"
      >
        {/* Icon with Red Accent Glow */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-red-950/60 border border-red-600/40 flex items-center justify-center text-red-500 text-2xl shadow-lg shadow-red-900/40">
          <span>{icon}</span>
        </div>

        {/* Modal Title & Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
          <div className="text-sm text-zinc-300 leading-relaxed">
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
        </div>

        {/* Action Button: OK */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
