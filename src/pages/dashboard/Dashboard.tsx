import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  Play,
  Trophy,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';
import { COURSES } from '../../data/courses';
import { ASSIGNMENTS } from '../../data/assignments';
import { ACHIEVEMENTS } from '../../data/achievements';
import { calculateCourseProgress, getCurrentOrNextLesson } from '../../utils/progress';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { CourseCard } from '../../components/courses/CourseCard';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentStudent } = useAuth();
  const { student, isCourseEnrolled } = useStudent();

  // Dynamic greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const studentName = student?.name?.split(' ')[0] || 'Student';

  // 1. Enrolled Courses
  const enrolledCourses = useMemo(() => {
    if (!student?.enrolledCourses) return [];
    return COURSES.filter((c) => student.enrolledCourses.includes(c.id));
  }, [student?.enrolledCourses]);

  // 2. Completed Courses (progress === 100%)
  const completedCourses = useMemo(() => {
    if (!student) return [];
    return enrolledCourses.filter((c) => {
      const p = calculateCourseProgress(student.completedLessons, c);
      return p.isCompleted;
    });
  }, [enrolledCourses, student?.completedLessons]);

  // 3. Total learning hours calculated from completed lessons
  const totalLearningHours = useMemo(() => {
    if (!student?.completedLessons?.length) return 0;
    let totalMinutes = 0;
    for (const course of COURSES) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          if (student.completedLessons.includes(lesson.id)) {
            totalMinutes += lesson.durationMinutes;
          }
        }
      }
    }
    const hours = totalMinutes / 60;
    return hours > 0 ? Number(hours.toFixed(1)) : 0.5;
  }, [student?.completedLessons]);

  // 4. Continue Learning target (first in-progress course or first enrolled)
  const continueCourseData = useMemo(() => {
    if (!student || enrolledCourses.length === 0) return null;

    // Find first course not 100% complete
    for (const course of enrolledCourses) {
      const progress = calculateCourseProgress(student.completedLessons, course);
      if (!progress.isCompleted) {
        const nextLesson = getCurrentOrNextLesson(student.completedLessons, course);
        return { course, progress, nextLesson };
      }
    }

    // If all completed, return first
    const firstCourse = enrolledCourses[0];
    const progress = calculateCourseProgress(student.completedLessons, firstCourse);
    const nextLesson = getCurrentOrNextLesson(student.completedLessons, firstCourse);
    return { course: firstCourse, progress, nextLesson };
  }, [enrolledCourses, student?.completedLessons]);

  // 5. Recommended courses based on student interests & skill level
  const recommendedCourses = useMemo(() => {
    const userInterests = student?.interests || ['Web Development', 'UI/UX Design'];
    const userLevel = student?.skillLevel || 'Beginner';

    return COURSES.filter((c) => !student?.enrolledCourses.includes(c.id))
      .sort((a, b) => {
        // Prioritize match with interests or difficulty
        const aMatches = userInterests.includes(a.category) || a.difficulty === userLevel;
        const bMatches = userInterests.includes(b.category) || b.difficulty === userLevel;
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return b.students - a.students;
      })
      .slice(0, 3);
  }, [student?.interests, student?.skillLevel, student?.enrolledCourses]);

  // 6. Upcoming assignments
  const upcomingAssignments = useMemo(() => {
    return ASSIGNMENTS.slice(0, 3);
  }, []);

  // 7. Recent achievement showcase
  const unlockedAchievementsCount = student?.achievements?.length || 0;
  const recentAchievement = useMemo(() => {
    if (!student?.achievements?.length) return null;
    const last = student.achievements[student.achievements.length - 1];
    if (!last) return null;
    const lastId = typeof last === 'string' ? last : last.id;
    return ACHIEVEMENTS.find((a) => a.id === lastId) || (typeof last !== 'string' ? last : null);
  }, [student?.achievements]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner & Dynamic Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {greeting}, {studentName}! 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ready to continue your learning journey? You're on track for your{' '}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {student?.dailyGoal || 30}-minute daily goal
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/explore')}
            leftIcon={<BookOpen className="w-4 h-4 text-indigo-600" />}
          >
            Explore Catalog
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (continueCourseData) {
                const { course, nextLesson } = continueCourseData;
                if (nextLesson) {
                  navigate(`/courses/${course.id}/lessons/${nextLesson.id}`);
                } else {
                  navigate(`/courses/${course.id}`);
                }
              } else {
                navigate('/explore');
              }
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Resume Learning
          </Button>
        </div>
      </div>

      {/* 4 Key Dynamic Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Enrolled Courses */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Enrolled Courses
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {enrolledCourses.length}
            </div>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              {enrolledCourses.length - completedCourses.length} active in progress
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Completed Courses */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Completed Courses
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {completedCourses.length}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              {student?.certificates?.length || 0} certified credentials
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-100 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Learning Hours */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Study Time Logged
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {totalLearningHours}h
            </div>
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
              {student?.completedLessons?.length || 0} lessons finished
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-100 dark:border-cyan-900/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Learning Streak */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Learning Streak
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-1">
              <span>{student?.learningStreak || 1}</span>
              <span className="text-amber-500 text-xl">🔥</span>
            </div>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              Daily habit intact
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-100 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Continue Learning + Quick Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Continue Learning Banner & In Progress Courses */}
        <div className="lg:col-span-8 space-y-6">
          {/* Continue Learning Featured Card */}
          {continueCourseData ? (
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-800/40">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold tracking-wide">
                    CONTINUE LEARNING
                  </span>
                  <span className="text-xs text-slate-300">
                    {continueCourseData.course.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {continueCourseData.course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200 line-clamp-1">
                    Next up:{' '}
                    <span className="font-semibold text-white">
                      {continueCourseData.nextLesson
                        ? continueCourseData.nextLesson.title
                        : 'Course Modules & Quizzes'}
                    </span>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 max-w-lg">
                  <div className="flex justify-between text-xs font-medium text-indigo-200">
                    <span>
                      {continueCourseData.progress.completed} of{' '}
                      {continueCourseData.progress.total} lessons
                    </span>
                    <span className="font-bold text-white">
                      {continueCourseData.progress.percentage}% completed
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-indigo-950/80 rounded-full overflow-hidden border border-indigo-800/40">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${continueCourseData.progress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <Button
                    size="md"
                    onClick={() => {
                      if (continueCourseData.nextLesson) {
                        navigate(
                          `/courses/${continueCourseData.course.id}/lessons/${continueCourseData.nextLesson.id}`
                        );
                      } else {
                        navigate(`/courses/${continueCourseData.course.id}`);
                      }
                    }}
                    className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold border-none"
                    leftIcon={<Play className="w-4 h-4 fill-current text-indigo-900" />}
                  >
                    Resume Lesson
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No courses enrolled yet!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Start your learning pathway by exploring our catalog of 12+ specialized courses.
                </p>
              </div>
              <Button onClick={() => navigate('/explore')} size="md">
                Browse Courses Catalog
              </Button>
            </div>
          )}

          {/* Enrolled Courses Quick Carousel/Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                My Active Courses ({enrolledCourses.length})
              </h2>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                View all courses <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses.slice(0, 2).map((course) => (
                  <CourseCard key={course.id} course={course} showProgress={true} />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                Enroll in courses from the catalog to track your progress here.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Achievements, Tasks, Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Goal & Streak Progress */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Daily Goal
              </span>
              <Badge variant="amber">
                {student?.learningStreak || 1} Day Streak 🔥
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Target: {student?.dailyGoal || 30} mins
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.min(100, Math.round(((totalLearningHours * 60) % (student?.dailyGoal || 30) / (student?.dailyGoal || 30)) * 100))}%
                </span>
              </div>
              <ProgressBar
                value={Math.min(100, Math.round(((totalLearningHours * 60) % (student?.dailyGoal || 30) / (student?.dailyGoal || 30)) * 100))}
                color="indigo"
                size="sm"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Log in daily and complete lessons to maintain and build your study streak.
            </p>
          </div>

          {/* Upcoming Assignments Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Assignments
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/assignments')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {upcomingAssignments.map((asg) => {
                const sub = student?.assignments?.find((s) => s.assignmentId === asg.id);
                const isSubmitted = !!sub;

                return (
                  <div
                    key={asg.id}
                    onClick={() => navigate(`/assignments/${asg.id}`)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {asg.title}
                      </span>
                      {isSubmitted ? (
                        <Badge variant="emerald" size="sm">
                          Submitted
                        </Badge>
                      ) : (
                        <Badge variant="amber" size="sm">
                          Due soon
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{asg.courseTitle}</span>
                      <span>{asg.points} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievement Trophy Mini Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Achievements
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/achievements')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                {unlockedAchievementsCount} / {ACHIEVEMENTS.length}
              </button>
            </div>

            {recentAchievement ? (
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center gap-3">
                <span className="text-2xl">{recentAchievement.icon}</span>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {recentAchievement.title}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                    {recentAchievement.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center py-2">
                Complete lessons and pass quizzes to unlock your first trophy!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Courses For You */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recommended For Your Goals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized based on your track in{' '}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {student?.interests?.join(', ') || 'Tech & Design'}
              </span>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/explore')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            See All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};
