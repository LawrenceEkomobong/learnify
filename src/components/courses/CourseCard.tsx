import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { Star, Clock, Users, Bookmark, Play, CheckCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { useStudent } from '../../context/StudentContext';
import { calculateCourseProgress } from '../../utils/progress';

export interface CourseCardProps {
  course: Course;
  viewMode?: 'grid' | 'list';
  showProgress?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  viewMode = 'grid',
  showProgress = false
}) => {
  const navigate = useNavigate();
  const { student, isCourseEnrolled, isCourseSaved, enrollCourse, toggleSaveCourse } = useStudent();

  const enrolled = isCourseEnrolled(course.id);
  const saved = isCourseSaved(course.id);
  const progress = calculateCourseProgress(student?.completedLessons || [], course);

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!enrolled) {
      enrollCourse(course.id);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveCourse(course.id);
  };

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  const handleContinueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate straight to course details or first lesson
    navigate(`/courses/${course.id}`);
  };

  const difficultyVariant = {
    Beginner: 'emerald',
    Intermediate: 'amber',
    Advanced: 'rose'
  }[course.difficulty] as 'emerald' | 'amber' | 'rose';

  return (
    <div
      id={`course-card-${course.id}`}
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-300 dark:hover:border-indigo-800/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer ${
        viewMode === 'list' ? 'md:flex-row' : ''
      }`}
    >
      {/* Thumbnail area */}
      <div
        className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${
          viewMode === 'list' ? 'md:w-72 shrink-0 h-52 md:h-auto' : 'h-48 w-full'
        }`}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="indigo" size="sm">
            {course.category}
          </Badge>
          {course.badge && (
            <Badge variant="amber" size="sm">
              {course.badge}
            </Badge>
          )}
        </div>

        {/* Bookmark button */}
        <button
          type="button"
          onClick={handleSaveClick}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
            saved
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save course'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Completed overlay badge if 100% */}
        {enrolled && progress.isCompleted && (
          <div className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata badges */}
          <div className="flex items-center gap-2 mb-2.5 text-xs text-slate-500 dark:text-slate-400">
            <Badge variant={difficultyVariant} size="sm">
              {course.difficulty}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.students.toLocaleString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Bottom stats / progress */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          {/* If showing student progress for enrolled course */}
          {(showProgress || enrolled) && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {progress.completed} of {progress.total} lessons
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {progress.percentage}%
                </span>
              </div>
              <ProgressBar
                value={progress.percentage}
                color={progress.isCompleted ? 'emerald' : 'indigo'}
                size="sm"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-2">
            {/* Instructor */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                {course.instructor.name}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-4 flex gap-2">
            {enrolled ? (
              <Button
                variant={progress.isCompleted ? 'outline' : 'primary'}
                size="sm"
                className="w-full"
                onClick={handleContinueClick}
                leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              >
                {progress.isCompleted ? 'Review Course' : 'Continue Learning'}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
