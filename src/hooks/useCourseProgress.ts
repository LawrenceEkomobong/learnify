import { useMemo } from 'react';
import { Course } from '../types';
import { useStudent } from '../context/StudentContext';
import { calculateCourseProgress, getCurrentOrNextLesson } from '../utils/progress';

export function useCourseProgress(course?: Course) {
  const { student } = useStudent();

  return useMemo(() => {
    if (!course || !student) {
      return {
        completed: 0,
        total: 0,
        percentage: 0,
        isCompleted: false,
        nextLesson: null
      };
    }

    const progress = calculateCourseProgress(student.completedLessons, course);
    const nextLesson = getCurrentOrNextLesson(student.completedLessons, course);

    return {
      ...progress,
      nextLesson
    };
  }, [course, student?.completedLessons]);
}
