import { Course, Lesson, Student } from '../types';

/**
 * Extracts all unique lesson IDs from a course.
 */
export function getAllLessonIds(course: Course): string[] {
  const ids: string[] = [];
  course.modules.forEach(mod => {
    mod.lessons.forEach(l => ids.push(l.id));
  });
  return ids;
}

/**
 * Calculates accurate progress metrics for a specific course based on completed lessons.
 */
export function calculateCourseProgress(completedLessons: string[], course: Course) {
  const allIds = getAllLessonIds(course);
  const total = allIds.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0, isCompleted: false };

  const completedCount = allIds.filter(id => completedLessons.includes(id)).length;
  const percentage = Math.min(100, Math.round((completedCount / total) * 100));
  const isCompleted = completedCount === total && total > 0;

  return {
    completed: completedCount,
    total,
    percentage,
    isCompleted
  };
}

/**
 * Finds the first uncompleted lesson in a course, or defaults to the first lesson.
 */
export function getCurrentOrNextLesson(completedLessons: string[], course: Course): Lesson | null {
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return lesson;
      }
    }
  }
  // If all completed or none found, return the very first lesson
  return course.modules[0]?.lessons[0] || null;
}

/**
 * Finds the next lesson in sequence across modules.
 */
export function getNextLesson(course: Course, currentLessonId: string): Lesson | null {
  const allLessons: Lesson[] = [];
  course.modules.forEach(m => m.lessons.forEach(l => allLessons.push(l)));
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1];
  }
  return null;
}

/**
 * Finds the previous lesson in sequence across modules.
 */
export function getPreviousLesson(course: Course, currentLessonId: string): Lesson | null {
  const allLessons: Lesson[] = [];
  course.modules.forEach(m => m.lessons.forEach(l => allLessons.push(l)));
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex > 0) {
    return allLessons[currentIndex - 1];
  }
  return null;
}

/**
 * Calculates overarching platform statistics strictly derived from the current student's data.
 */
export function calculateOverallStats(student: Student, allCourses: Course[]) {
  const enrolledCourses = allCourses.filter(c => student.enrolledCourses.includes(c.id));
  
  let completedCoursesCount = 0;
  let totalLessonsInEnrolled = 0;
  let completedLessonsInEnrolled = 0;

  enrolledCourses.forEach(c => {
    const { isCompleted, total, completed } = calculateCourseProgress(student.completedLessons, c);
    if (isCompleted) {
      completedCoursesCount++;
    }
    totalLessonsInEnrolled += total;
    completedLessonsInEnrolled += completed;
  });

  const overallProgressPercentage = totalLessonsInEnrolled > 0
    ? Math.round((completedLessonsInEnrolled / totalLessonsInEnrolled) * 100)
    : 0;

  const learningHours = (student.totalLearningMinutes / 60).toFixed(1);

  return {
    enrolledCount: enrolledCourses.length,
    completedCoursesCount,
    totalLessonsCompleted: student.completedLessons.length,
    overallProgressPercentage,
    learningHours,
    learningStreak: student.learningStreak,
    quizzesCompletedCount: student.quizResults.length,
    assignmentsSubmittedCount: student.assignments.length,
    certificatesEarnedCount: student.certificates.length,
    achievementsUnlockedCount: student.achievements.length
  };
}
