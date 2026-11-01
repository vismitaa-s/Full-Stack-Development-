import React from 'react';

/**
 * SearchBar Component
 * Bonus Search Functionality:
 * Dynamically filters records by:
 * - Project title
 * - Video filename
 * - Category
 * - Project status
 * Controlled input with onChange event handling.
 */
export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  totalCount,
  filteredCount
}) {
  const categories = [
    'All Categories',
    'Education',
    'Entertainment',
    'Technology',
    'Gaming',
    'Lifestyle',
    'Music',
    'Travel',
    'Other'
  ];

  const statuses = [
    'All Statuses',
    'Draft',
    'Ready for Analysis',
    'Analysis Pending',
    'Ready to Publish',
    'Published'
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input Field */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by project title, file name, category, or status..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm text-white placeholder-zinc-500 transition-all outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white text-xs cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters (Category & Status) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Category Dropdown Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-700/80 text-xs font-medium text-zinc-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All Categories' ? '' : cat} className="bg-zinc-950">
                {cat}
              </option>
            ))}
          </select>

          {/* Status Dropdown Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-700/80 text-xs font-medium text-zinc-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all cursor-pointer"
          >
            {statuses.map((stat) => (
              <option key={stat} value={stat === 'All Statuses' ? '' : stat} className="bg-zinc-950">
                {stat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Filter Summary Stats */}
      <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-white">{filteredCount}</strong> of{' '}
            <strong className="text-zinc-300">{totalCount}</strong> projects
          </span>
          {(searchTerm || selectedCategory || selectedStatus) && (
            <span className="text-red-400 text-[11px] font-semibold">
              (Filtered results)
            </span>
          )}
        </div>

        {(searchTerm || selectedCategory || selectedStatus) && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('');
              onStatusChange('');
            }}
            className="text-xs text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
