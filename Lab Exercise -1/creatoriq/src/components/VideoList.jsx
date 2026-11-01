import React, { useState, useMemo } from 'react';
import VideoCard from './VideoCard.jsx';
import SearchBar from './SearchBar.jsx';

/**
 * VideoList Component
 * Module: "MY VIDEO PROJECTS"
 * Displays video project cards in a responsive grid (desktop 3 col, tablet 2 col, mobile 1 col),
 * integrates dynamic search and filtering, and handles empty states.
 */
export default function VideoList({
  projects = [],
  isLoading = false,
  onEditProject,
  onDeleteProject,
  onAddNewClick
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Bonus Dynamic Search & Filtering via React state
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const term = searchTerm.toLowerCase().trim();

      // Search matching: title, fileName, category, or status
      const matchesSearch =
        !term ||
        project.title?.toLowerCase().includes(term) ||
        project.fileName?.toLowerCase().includes(term) ||
        project.category?.toLowerCase().includes(term) ||
        project.status?.toLowerCase().includes(term) ||
        project.description?.toLowerCase().includes(term);

      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;

      const matchesStatus =
        !selectedStatus || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Module Title & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            CRUD Data Management
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>MY VIDEO PROJECTS</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {projects.length}
            </span>
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your video projects and pre-upload parameters before publishing on YouTube.
          </p>
        </div>

        {onAddNewClick && (
          <button
            type="button"
            onClick={onAddNewClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer shrink-0"
          >
            <span>＋ Add New Project</span>
          </button>
        )}
      </div>

      {/* Dynamic Search & Filter Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        totalCount={projects.length}
        filteredCount={filteredProjects.length}
      />

      {/* Projects Grid / List */}
      {isLoading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-zinc-400">Loading projects from JSON Server...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-zinc-950/40 border border-zinc-800/80 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl mx-auto text-zinc-500">
            🔍
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">No Video Projects Found</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {searchTerm || selectedCategory || selectedStatus
                ? 'No projects match your current search query or filter criteria. Try resetting your search filters.'
                : 'No video projects have been created yet. Use the form above to add your first YouTube video project.'}
            </p>
          </div>
          {(searchTerm || selectedCategory || selectedStatus) && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedStatus('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
