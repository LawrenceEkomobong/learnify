import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Compass, Filter, Grid, List, Sparkles, X } from 'lucide-react';
import { useCourses, CourseSortOption } from '../../context/CourseContext';
import { CourseCard } from '../../components/courses/CourseCard';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { SkillLevel } from '../../types';

const CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'Design',
  'Mobile Development',
  'Cybersecurity',
  'Cloud Computing',
  'AI & Machine Learning'
];

const DIFFICULTIES: (SkillLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const ExploreCourses: React.FC = () => {
  const location = useLocation();
  const {
    courses,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    filteredCourses
  } = useCourses();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Handle ?q= query param from global navbar search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [location.search, setSearchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSortBy('popular');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Course Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Explore Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Discover {courses.length} in-demand skills taught by top industry specialists.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, topic, or instructor name..."
          />
        </div>

        {/* Sort dropdown */}
        <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as CourseSortOption)}
            className="w-full sm:w-auto px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="duration-asc">Duration: Short to Long</option>
            <option value="duration-desc">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all select-none cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Difficulty Sub-filter & Active Filter Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Difficulty:</span>
          <div className="flex items-center gap-1.5">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Course Cards Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No courses matched your filters"
          description="Try modifying your search terms or clearing your selected category and difficulty filters."
          actionLabel="Reset Filters"
          onAction={clearAllFilters}
        />
      )}
    </div>
  );
};
