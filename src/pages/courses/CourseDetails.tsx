import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Star,
  CheckCircle2,
  PlayCircle,
  FileQuestion,
  Bookmark,
  ArrowLeft,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
  Sparkles
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useStudent } from '../../context/StudentContext';
import { calculateCourseProgress, getCurrentOrNextLesson } from '../../utils/progress';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const {
    student,
    isCourseEnrolled,
    isCourseSaved,
    enrollCourse,
    toggleSaveCourse,
    isLessonCompleted
  } = useStudent();

  const [activeTab, setActiveTab] = useState<'curriculum' | 'overview' | 'instructor' | 'reviews'>('curriculum');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const course = getCourseById(courseId || '');

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Course Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested course could not be located.</p>
        <Button onClick={() => navigate('/explore')}>Return to Explore</Button>
      </div>
    );
  }

  const enrolled = isCourseEnrolled(course.id);
  const saved = isCourseSaved(course.id);
  const progress = calculateCourseProgress(student?.completedLessons || [], course);
  const nextLesson = getCurrentOrNextLesson(student?.completedLessons || [], course);
  const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: prev[modId] === undefined ? false : !prev[modId]
    }));
  };

  const handleStartOrContinue = () => {
    if (!enrolled) {
      enrollCourse(course.id);
    }
    if (nextLesson) {
      navigate(`/courses/${course.id}/lessons/${nextLesson.id}`);
    } else if (course.modules[0]?.lessons[0]) {
      navigate(`/courses/${course.id}/lessons/${course.modules[0].lessons[0].id}`);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Top Back Navigation */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to courses</span>
        </button>
      </div>

      {/* Hero Banner Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Info Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">{course.category}</Badge>
              <Badge variant="amber">{course.difficulty}</Badge>
              {course.badge && <Badge variant="emerald">{course.badge}</Badge>}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{totalLessonsCount} lessons</span>
              </div>
            </div>

            {/* Instructor snippet */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <span className="text-xs text-slate-400">Created by</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {course.instructor.name} • {course.instructor.role}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Action / Preview Box */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Progress bar if enrolled */}
            {enrolled && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">Your Progress</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {progress.percentage}%
                  </span>
                </div>
                <ProgressBar
                  value={progress.percentage}
                  color={progress.isCompleted ? 'emerald' : 'indigo'}
                  size="md"
                />
                <p className="text-[11px] text-slate-400">
                  {progress.completed} of {progress.total} lessons completed
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                size="lg"
                onClick={handleStartOrContinue}
                className="w-full shadow-md shadow-indigo-600/20"
                leftIcon={<PlayCircle className="w-5 h-5" />}
              >
                {enrolled
                  ? progress.isCompleted
                    ? 'Review Course'
                    : 'Continue Learning'
                  : 'Enroll Now Free'}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSaveCourse(course.id)}
                  className="flex-1"
                  leftIcon={
                    <Bookmark
                      className={`w-4 h-4 ${saved ? 'text-indigo-600 fill-current' : ''}`}
                    />
                  }
                >
                  {saved ? 'Saved' : 'Save Course'}
                </Button>

                {course.quizId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/courses/${course.id}/quiz`)}
                    className="flex-1"
                    leftIcon={<FileQuestion className="w-4 h-4 text-indigo-600" />}
                  >
                    Take Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 text-sm font-semibold">
        {(['curriculum', 'overview', 'instructor', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition-colors relative ${
              activeTab === tab
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>{tab === 'curriculum' ? `Curriculum (${course.modules.length} Modules)` : tab}</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: CURRICULUM */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Course Modules & Lessons
            </h3>
            <span className="text-xs text-slate-400">
              {totalLessonsCount} total lessons • {course.duration}
            </span>
          </div>

          <div className="space-y-3">
            {course.modules.map((module, mIdx) => {
              const isExpanded = expandedModules[module.id] !== false; // expanded by default
              return (
                <div
                  key={module.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <div
                    onClick={() => toggleModule(module.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 select-none transition-colors"
                  >
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        Module {mIdx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {module.title}
                      </h4>
                      <p className="text-xs text-slate-500">{module.description}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0 ml-4">
                      <span>{module.lessons.length} lessons</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800/80 divide-y divide-slate-100 dark:divide-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
                      {module.lessons.map((lesson) => {
                        const completed = isLessonCompleted(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() =>
                              navigate(`/courses/${course.id}/lessons/${lesson.id}`)
                            }
                            className="p-3.5 sm:px-5 flex items-center justify-between hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span
                                className={`text-xs font-medium truncate ${
                                  completed
                                    ? 'text-slate-900 dark:text-slate-100 font-semibold'
                                    : 'text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 ml-4">
                              <span>{lesson.durationMinutes} min</span>
                              {completed && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                  Done
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Course Description
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              What You Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningOutcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Requirements & Prerequisites
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {course.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: INSTRUCTOR */}
      {activeTab === 'instructor' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {course.instructor.name}
              </h3>
              <p className="text-xs text-slate-500">{course.instructor.role}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {course.instructor.bio}
          </p>
        </div>
      )}

      {/* TAB 4: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {course.rating.toFixed(1)}
            </div>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Course Rating based on {course.reviewsCount} student reviews
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Marcus Vance</span>
                <span className="text-slate-400">2 weeks ago</span>
              </div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Incredible course! The pacing was spot-on, and the interactive quizzes helped solidify the tricky concepts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Sophia Chen</span>
                <span className="text-slate-400">1 month ago</span>
              </div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The lessons are practical and direct without fluff. Having persistent notes attached to each lesson was super helpful.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
