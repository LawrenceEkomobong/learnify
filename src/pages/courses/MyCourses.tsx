import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, CheckCircle2, Clock, Play, ArrowRight } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { COURSES } from '../../data/courses';
import { calculateCourseProgress } from '../../utils/progress';
import { CourseCard } from '../../components/courses/CourseCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';

type TabType = 'enrolled' | 'in-progress' | 'completed' | 'saved';

export const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState<TabType>('enrolled');

  const enrolledList = useMemo(() => {
    if (!student?.enrolledCourses) return [];
    return COURSES.filter((c) => student.enrolledCourses.includes(c.id));
  }, [student?.enrolledCourses]);

  const inProgressList = useMemo(() => {
    if (!student) return [];
    return enrolledList.filter((c) => {
      const p = calculateCourseProgress(student.completedLessons, c);
      return !p.isCompleted;
    });
  }, [enrolledList, student?.completedLessons]);

  const completedList = useMemo(() => {
    if (!student) return [];
    return enrolledList.filter((c) => {
      const p = calculateCourseProgress(student.completedLessons, c);
      return p.isCompleted;
    });
  }, [enrolledList, student?.completedLessons]);

  const savedList = useMemo(() => {
    if (!student?.savedCourses) return [];
    return COURSES.filter((c) => student.savedCourses.includes(c.id));
  }, [student?.savedCourses]);

  const currentList = {
    enrolled: enrolledList,
    'in-progress': inProgressList,
    completed: completedList,
    saved: savedList
  }[activeTab];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track your ongoing courses, completed certifications, and saved bookmarks.
          </p>
        </div>

        <Button
          onClick={() => navigate('/explore')}
          size="sm"
          leftIcon={<BookOpen className="w-4 h-4" />}
        >
          Explore More Courses
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('enrolled')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'enrolled'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>All Enrolled</span>
          <span
            className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
              activeTab === 'enrolled'
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {enrolledList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('in-progress')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'in-progress'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>In Progress</span>
          <span
            className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
              activeTab === 'in-progress'
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {inProgressList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'completed'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Completed</span>
          <span
            className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
              activeTab === 'completed'
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {completedList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'saved'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Saved</span>
          <span
            className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
              activeTab === 'saved'
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {savedList.length}
          </span>
        </button>
      </div>

      {/* Grid or Empty */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showProgress={activeTab !== 'saved'}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            activeTab === 'saved'
              ? 'No saved courses yet'
              : activeTab === 'completed'
              ? 'No completed courses yet'
              : activeTab === 'in-progress'
              ? 'No active courses in progress'
              : 'No courses enrolled yet'
          }
          description={
            activeTab === 'saved'
              ? 'Click the bookmark icon on any course card to save it for future study.'
              : activeTab === 'completed'
              ? 'Finish all lessons in a course to claim your verified certificate.'
              : 'Browse our catalog of 12+ industry courses and start learning today.'
          }
          actionLabel="Explore Catalog"
          onAction={() => navigate('/explore')}
        />
      )}
    </div>
  );
};
