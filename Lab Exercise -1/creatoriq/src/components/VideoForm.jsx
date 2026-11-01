import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Education',
  'Entertainment',
  'Technology',
  'Gaming',
  'Lifestyle',
  'Music',
  'Travel',
  'Other'
];

const VIDEO_TYPES = ['Long-form video', 'YouTube Shorts'];

const TARGET_AUDIENCES = [
  'General audience',
  'Students',
  'Professionals',
  'Creators',
  'Other'
];

const PROJECT_STATUSES = [
  'Draft',
  'Ready for Analysis',
  'Analysis Pending',
  'Ready to Publish',
  'Published'
];

const INITIAL_FORM_STATE = {
  title: '',
  fileName: '',
  category: 'Education',
  videoType: 'Long-form video',
  targetAudience: 'General audience',
  description: '',
  uploadDate: new Date().toISOString().split('T')[0],
  status: 'Draft'
};

/**
 * VideoForm Component
 * Form for adding (Create) and modifying (Update) video projects.
 * Supports text inputs, textarea, select dropdowns, radio buttons, and validation.
 */
export default function VideoForm({
  onSubmit,
  editingProject = null,
  onCancelEdit = null,
  currentUploadedFileName = null
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when entering or exiting edit mode
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || '',
        fileName: editingProject.fileName || '',
        category: editingProject.category || 'Education',
        videoType: editingProject.videoType || 'Long-form video',
        targetAudience: editingProject.targetAudience || 'General audience',
        description: editingProject.description || '',
        uploadDate: editingProject.uploadDate || new Date().toISOString().split('T')[0],
        status: editingProject.status || 'Draft'
      });
      setErrors({});
    } else {
      setFormData({
        ...INITIAL_FORM_STATE,
        fileName: currentUploadedFileName || '',
        uploadDate: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  }, [editingProject, currentUploadedFileName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific validation error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    }

    if (!formData.fileName.trim()) {
      newErrors.fileName = 'Video file name is required.';
    } else if (!formData.fileName.includes('.')) {
      newErrors.fileName = 'Please include a valid file extension (e.g. .mp4, .mov).';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Video description is required.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters long.';
    }

    if (!formData.uploadDate) {
      newErrors.uploadDate = 'Upload date is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData, editingProject?.id);
      // If we were adding, clear the form
      if (!editingProject) {
        setFormData(INITIAL_FORM_STATE);
      }
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseCurrentFile = () => {
    if (currentUploadedFileName) {
      setFormData((prev) => ({
        ...prev,
        fileName: currentUploadedFileName
      }));
      if (errors.fileName) {
        setErrors((prev) => ({ ...prev, fileName: null }));
      }
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 shadow-2xl">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white text-lg shadow-lg shadow-red-600/30">
            {editingProject ? '✏️' : '＋'}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">
              {editingProject ? 'Edit Video Project' : 'Add New Video Project'}
            </h3>
            <p className="text-xs text-zinc-400">
              {editingProject
                ? 'Update video project parameters and sync to JSON Server'
                : 'Create and register a new video project before publishing on YouTube'}
            </p>
          </div>
        </div>

        {editingProject && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/50">
            Edit Mode (ID: {editingProject.id})
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Project Title & Video Filename */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Project Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Video Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 10 Mistakes Beginner Programmers Make"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.title
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.title}
              </p>
            )}
          </div>

          {/* 2. Video Filename */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Video File Name <span className="text-red-500">*</span>
              </label>
              {currentUploadedFileName && (
                <button
                  type="button"
                  onClick={handleUseCurrentFile}
                  className="text-[11px] text-red-400 hover:text-red-300 underline cursor-pointer"
                >
                  Use Uploaded ({currentUploadedFileName})
                </button>
              )}
            </div>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleChange}
              placeholder="e.g. beginner_mistakes_v3.mp4"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border font-mono text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.fileName
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              }`}
            />
            {errors.fileName && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.fileName}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Category & Video Type (Radio Buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 3. Category Select Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Video Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-700/80 text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-zinc-950 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Video Type (Radio Buttons) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Video Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {VIDEO_TYPES.map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.videoType === type
                      ? 'border-red-500/80 bg-red-950/20 text-white'
                      : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="videoType"
                    value={type}
                    checked={formData.videoType === type}
                    onChange={handleChange}
                    className="accent-red-600 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-semibold">
                    {type.includes('Short') ? '⚡ ' : '🎥 '}
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Target Audience, Project Status, Upload Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* 5. Target Audience Select Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <select
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-700/80 text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all cursor-pointer"
            >
              {TARGET_AUDIENCES.map((aud) => (
                <option key={aud} value={aud} className="bg-zinc-950 text-white">
                  {aud}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Project Status Select Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Project Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-700/80 text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all cursor-pointer"
            >
              {PROJECT_STATUSES.map((stat) => (
                <option key={stat} value={stat} className="bg-zinc-950 text-white">
                  {stat}
                </option>
              ))}
            </select>
          </div>

          {/* 7. Upload Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Upload Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="uploadDate"
              value={formData.uploadDate}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all ${
                errors.uploadDate ? 'border-red-500' : 'border-zinc-700/80'
              }`}
            />
            {errors.uploadDate && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.uploadDate}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Video Description Textarea */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
            Video Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief overview of the video topic, target keywords, and expected viewer outcome..."
            className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all resize-y ${
              errors.description
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠</span> {errors.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          {editingProject && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer"
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <span>
              {isSubmitting
                ? 'Saving...'
                : editingProject
                ? '✓ Update Video Project'
                : '＋ Save Video Project'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
