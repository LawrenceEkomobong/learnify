import React, { createContext, useContext, useCallback } from 'react';
import {
  Student,
  Course,
  LessonNote,
  QuizResult,
  StudentAssignmentSubmission,
  CalendarEvent,
  Certificate,
  StudentSettings,
  Achievement
} from '../types';
import { useAuth } from './AuthContext';
import { updateStudentInStorage } from '../utils/storage';
import { calculateUpdatedStreak } from '../utils/streak';
import { createCertificateForCourse } from '../utils/certificate';
import { calculateCourseProgress } from '../utils/progress';
import { COURSES } from '../data/courses';
import { ALL_ACHIEVEMENTS } from '../data/achievements';
import { useToast } from './ToastContext';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface StudentContextType {
  student: Student | null;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  toggleSaveCourse: (courseId: string) => void;
  isCourseEnrolled: (courseId: string) => boolean;
  isCourseSaved: (courseId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  completeLesson: (
    lessonId: string,
    courseId: string
  ) => { courseCompleted: boolean; certificate?: Certificate };
  saveQuizResult: (
    data: Omit<QuizResult, 'id' | 'completedAt'>
  ) => { unlockedAchievements: Achievement[] };
  submitAssignment: (
    data: Omit<StudentAssignmentSubmission, 'submittedAt'>
  ) => void;
  addOrUpdateNote: (
    courseId: string,
    lessonId: string,
    content: string
  ) => void;
  deleteNote: (noteId: string) => void;
  getNoteForLesson: (courseId: string, lessonId: string) => LessonNote | undefined;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteCalendarEvent: (eventId: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (notifId: string) => void;
  updateProfile: (updates: Partial<Student>) => void;
  updateSettings: (settingsUpdates: Partial<StudentSettings>) => void;
  completeOnboarding: (data: {
    interests: string[];
    skillLevel: Student['skillLevel'];
    learningGoal: string;
    dailyGoal: number;
  }) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentStudent, refreshStudentSession } = useAuth();
  const { showToast } = useToast();

  const persistStudent = useCallback(
    (updated: Student) => {
      updateStudentInStorage(updated);
      refreshStudentSession();
    },
    [refreshStudentSession]
  );

  const isCourseEnrolled = useCallback(
    (courseId: string) => {
      return !!currentStudent?.enrolledCourses.includes(courseId);
    },
    [currentStudent]
  );

  const isCourseSaved = useCallback(
    (courseId: string) => {
      return !!currentStudent?.savedCourses.includes(courseId);
    },
    [currentStudent]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return !!currentStudent?.completedLessons.includes(lessonId);
    },
    [currentStudent]
  );

  const enrollCourse = useCallback(
    (courseId: string) => {
      if (!currentStudent) return;
      if (currentStudent.enrolledCourses.includes(courseId)) {
        showToast('You are already enrolled in this course.', 'info');
        return;
      }

      const course = COURSES.find((c) => c.id === courseId);
      const updatedEnrolled = [...currentStudent.enrolledCourses, courseId];
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'Enrolled in Course 🎓',
        message: `You successfully enrolled in "${course?.title || 'New Course'}". Ready to learn!`,
        type: 'course' as const,
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: `/courses/${courseId}`
      };

      const updatedStudent: Student = {
        ...currentStudent,
        enrolledCourses: updatedEnrolled,
        notifications: [newNotif, ...currentStudent.notifications]
      };

      persistStudent(updatedStudent);
      showToast(`Enrolled in "${course?.title || 'Course'}"!`, 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  const unenrollCourse = useCallback(
    (courseId: string) => {
      if (!currentStudent) return;
      const updated = {
        ...currentStudent,
        enrolledCourses: currentStudent.enrolledCourses.filter((id) => id !== courseId)
      };
      persistStudent(updated);
      showToast('Course removed from your enrollments.', 'info');
    },
    [currentStudent, persistStudent, showToast]
  );

  const toggleSaveCourse = useCallback(
    (courseId: string) => {
      if (!currentStudent) return;
      const exists = currentStudent.savedCourses.includes(courseId);
      const updatedSaved = exists
        ? currentStudent.savedCourses.filter((id) => id !== courseId)
        : [...currentStudent.savedCourses, courseId];

      const updatedStudent: Student = {
        ...currentStudent,
        savedCourses: updatedSaved
      };

      persistStudent(updatedStudent);
      showToast(
        exists ? 'Course removed from saved bookmarks.' : 'Course saved to your bookmarks!',
        'success'
      );
    },
    [currentStudent, persistStudent, showToast]
  );

  /**
   * Complete lesson, calculate progress, update streak, unlock achievements & certificates
   */
  const completeLesson = useCallback(
    (lessonId: string, courseId: string) => {
      if (!currentStudent) return { courseCompleted: false };

      const course = COURSES.find((c) => c.id === courseId);
      if (!course) return { courseCompleted: false };

      const isAlreadyDone = currentStudent.completedLessons.includes(lessonId);
      const newCompletedLessons = isAlreadyDone
        ? currentStudent.completedLessons
        : [...currentStudent.completedLessons, lessonId];

      // Find the lesson duration in minutes
      let lessonDuration = 15;
      for (const m of course.modules) {
        const found = m.lessons.find((l) => l.id === lessonId);
        if (found) {
          lessonDuration = found.durationMinutes || 15;
          break;
        }
      }

      // Calculate streak
      const { newStreak, newDate, streakIncreased } = calculateUpdatedStreak(
        currentStudent.learningStreak,
        currentStudent.lastActiveDate
      );

      // Check course completion status
      const { isCompleted: isCourseNowCompleted } = calculateCourseProgress(
        newCompletedLessons,
        course
      );

      let newCertificates = [...currentStudent.certificates];
      let generatedCert: Certificate | undefined = undefined;
      const newNotifications = [...currentStudent.notifications];
      const newAchievements = [...currentStudent.achievements];

      // Check for first lesson achievement
      if (!currentStudent.achievements.some((a) => a.id === 'ach-first-lesson')) {
        const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-first-lesson');
        if (baseAch) {
          const unlocked = { ...baseAch, unlockedAt: new Date().toISOString() };
          newAchievements.push(unlocked);
          newNotifications.unshift({
            id: `notif-ach-${Date.now()}`,
            title: 'Achievement Unlocked: First Step! 🏆',
            message: 'You completed your very first lesson on Learnify!',
            type: 'achievement',
            read: false,
            createdAt: new Date().toISOString()
          });
        }
      }

      // Check streak achievements
      if (newStreak >= 7 && !newAchievements.some((a) => a.id === 'ach-7-streak')) {
        const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-7-streak');
        if (baseAch) {
          newAchievements.push({ ...baseAch, unlockedAt: new Date().toISOString() });
        }
      }

      // Check if course completed and certificate needs to be minted
      const existingCert = currentStudent.certificates.find((c) => c.courseId === courseId);
      let isBrandNewCompletion = false;

      if (isCourseNowCompleted && !existingCert) {
        isBrandNewCompletion = true;
        generatedCert = createCertificateForCourse(currentStudent, course);
        newCertificates.push(generatedCert);

        // Course completion notification
        newNotifications.unshift({
          id: `notif-course-${Date.now()}`,
          title: `Course Completed: ${course.title} 🎉`,
          message: 'Congratulations! You have completed all lessons and earned your Certificate of Completion.',
          type: 'course',
          read: false,
          createdAt: new Date().toISOString(),
          actionUrl: '/certificates'
        });

        // Course completion achievement
        if (!newAchievements.some((a) => a.id === 'ach-first-course')) {
          const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-first-course');
          if (baseAch) {
            newAchievements.push({ ...baseAch, unlockedAt: new Date().toISOString() });
          }
        }

        // Trigger confetti
        triggerCelebrationConfetti();
      }

      const updatedStudent: Student = {
        ...currentStudent,
        completedLessons: newCompletedLessons,
        learningStreak: newStreak,
        lastActiveDate: newDate,
        totalLearningMinutes: isAlreadyDone
          ? currentStudent.totalLearningMinutes
          : currentStudent.totalLearningMinutes + lessonDuration,
        certificates: newCertificates,
        achievements: newAchievements,
        notifications: newNotifications
      };

      persistStudent(updatedStudent);

      if (isBrandNewCompletion) {
        showToast(`🎉 Congratulations! You completed "${course.title}"!`, 'success', 5000);
      } else if (!isAlreadyDone) {
        showToast('Lesson marked as completed! ✓', 'success');
      }

      return {
        courseCompleted: isBrandNewCompletion,
        certificate: generatedCert
      };
    },
    [currentStudent, persistStudent, showToast]
  );

  /**
   * Save quiz result and evaluate score
   */
  const saveQuizResult = useCallback(
    (data: Omit<QuizResult, 'id' | 'completedAt'>) => {
      if (!currentStudent) return { unlockedAchievements: [] };

      const newResult: QuizResult = {
        ...data,
        id: `qr-${Date.now()}`,
        completedAt: new Date().toISOString()
      };

      const newAchievements = [...currentStudent.achievements];
      const newNotifications = [...currentStudent.notifications];
      const newlyUnlocked: Achievement[] = [];

      // Check high score achievement (90%+)
      if (data.score >= 90 && !newAchievements.some((a) => a.id === 'ach-high-score')) {
        const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-high-score');
        if (baseAch) {
          const unlocked = { ...baseAch, unlockedAt: new Date().toISOString() };
          newAchievements.push(unlocked);
          newlyUnlocked.push(unlocked);
          newNotifications.unshift({
            id: `notif-quiz-ach-${Date.now()}`,
            title: 'Achievement Unlocked: Quiz Master! 🎯',
            message: `Scored ${data.score}% on ${data.courseTitle} assessment!`,
            type: 'achievement',
            read: false,
            createdAt: new Date().toISOString()
          });
          triggerCelebrationConfetti();
        }
      }

      newNotifications.unshift({
        id: `notif-quiz-${Date.now()}`,
        title: `Quiz Results: ${data.courseTitle}`,
        message: `You scored ${data.score}% (${data.correctAnswers}/${data.totalQuestions} correct).`,
        type: 'quiz',
        read: false,
        createdAt: new Date().toISOString()
      });

      const updatedStudent: Student = {
        ...currentStudent,
        quizResults: [newResult, ...currentStudent.quizResults],
        achievements: newAchievements,
        notifications: newNotifications
      };

      persistStudent(updatedStudent);
      showToast(`Quiz completed: ${data.score}%!`, 'success');
      return { unlockedAchievements: newlyUnlocked };
    },
    [currentStudent, persistStudent, showToast]
  );

  /**
   * Submit course assignment
   */
  const submitAssignment = useCallback(
    (data: Omit<StudentAssignmentSubmission, 'submittedAt'>) => {
      if (!currentStudent) return;

      const submission: StudentAssignmentSubmission = {
        ...data,
        submittedAt: new Date().toISOString(),
        grade: 92, // Simulated automated preliminary review grade
        feedback: 'Great job! Strong structural execution and clear attention to design/engineering criteria.'
      };

      const filtered = currentStudent.assignments.filter(
        (a) => a.assignmentId !== data.assignmentId
      );

      const newAchievements = [...currentStudent.achievements];
      if (!newAchievements.some((a) => a.id === 'ach-first-assignment')) {
        const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-first-assignment');
        if (baseAch) {
          newAchievements.push({ ...baseAch, unlockedAt: new Date().toISOString() });
        }
      }

      const newNotif = {
        id: `notif-asg-${Date.now()}`,
        title: 'Assignment Submitted ✓',
        message: `Your submission for Assignment #${data.assignmentId} was received.`,
        type: 'assignment' as const,
        read: false,
        createdAt: new Date().toISOString()
      };

      const updatedStudent: Student = {
        ...currentStudent,
        assignments: [submission, ...filtered],
        achievements: newAchievements,
        notifications: [newNotif, ...currentStudent.notifications]
      };

      persistStudent(updatedStudent);
      showToast('Assignment submitted successfully! ✓', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  /**
   * Add or update personal lesson note
   */
  const addOrUpdateNote = useCallback(
    (courseId: string, lessonId: string, content: string) => {
      if (!currentStudent) return;

      const course = COURSES.find((c) => c.id === courseId);
      let lessonTitle = 'Lesson';
      if (course) {
        for (const m of course.modules) {
          const l = m.lessons.find((les) => les.id === lessonId);
          if (l) {
            lessonTitle = l.title;
            break;
          }
        }
      }

      const existingIndex = currentStudent.notes.findIndex(
        (n) => n.courseId === courseId && n.lessonId === lessonId
      );

      const updatedNotes = [...currentStudent.notes];
      if (existingIndex >= 0) {
        updatedNotes[existingIndex] = {
          ...updatedNotes[existingIndex],
          content,
          updatedAt: new Date().toISOString()
        };
      } else {
        updatedNotes.push({
          id: `note-${Date.now()}`,
          courseId,
          courseTitle: course?.title || 'Course',
          lessonId,
          lessonTitle,
          content,
          updatedAt: new Date().toISOString()
        });
      }

      // Check note taker achievement (3+ notes)
      const newAchievements = [...currentStudent.achievements];
      if (updatedNotes.length >= 3 && !newAchievements.some((a) => a.id === 'ach-note-taker')) {
        const baseAch = ALL_ACHIEVEMENTS.find((a) => a.id === 'ach-note-taker');
        if (baseAch) {
          newAchievements.push({ ...baseAch, unlockedAt: new Date().toISOString() });
        }
      }

      const updatedStudent: Student = {
        ...currentStudent,
        notes: updatedNotes,
        achievements: newAchievements
      };

      persistStudent(updatedStudent);
      showToast('Note saved ✓', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  const deleteNote = useCallback(
    (noteId: string) => {
      if (!currentStudent) return;
      const updatedNotes = currentStudent.notes.filter((n) => n.id !== noteId);
      persistStudent({ ...currentStudent, notes: updatedNotes });
      showToast('Note deleted.', 'info');
    },
    [currentStudent, persistStudent, showToast]
  );

  const getNoteForLesson = useCallback(
    (courseId: string, lessonId: string) => {
      return currentStudent?.notes.find(
        (n) => n.courseId === courseId && n.lessonId === lessonId
      );
    },
    [currentStudent]
  );

  const addCalendarEvent = useCallback(
    (eventData: Omit<CalendarEvent, 'id'>) => {
      if (!currentStudent) return;
      const newEvent: CalendarEvent = {
        ...eventData,
        id: `evt-${Date.now()}`
      };
      const updatedStudent: Student = {
        ...currentStudent,
        calendarEvents: [newEvent, ...currentStudent.calendarEvents]
      };
      persistStudent(updatedStudent);
      showToast('Study event added to your calendar! 📅', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  const deleteCalendarEvent = useCallback(
    (eventId: string) => {
      if (!currentStudent) return;
      const updated = {
        ...currentStudent,
        calendarEvents: currentStudent.calendarEvents.filter((e) => e.id !== eventId)
      };
      persistStudent(updated);
      showToast('Event removed from calendar.', 'info');
    },
    [currentStudent, persistStudent, showToast]
  );

  const markNotificationRead = useCallback(
    (notifId: string) => {
      if (!currentStudent) return;
      const updatedNotifs = currentStudent.notifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      );
      persistStudent({ ...currentStudent, notifications: updatedNotifs });
    },
    [currentStudent, persistStudent]
  );

  const markAllNotificationsRead = useCallback(() => {
    if (!currentStudent) return;
    const updatedNotifs = currentStudent.notifications.map((n) => ({ ...n, read: true }));
    persistStudent({ ...currentStudent, notifications: updatedNotifs });
    showToast('All notifications marked as read.', 'info');
  }, [currentStudent, persistStudent, showToast]);

  const deleteNotification = useCallback(
    (notifId: string) => {
      if (!currentStudent) return;
      const updated = currentStudent.notifications.filter((n) => n.id !== notifId);
      persistStudent({ ...currentStudent, notifications: updated });
    },
    [currentStudent, persistStudent]
  );

  const updateProfile = useCallback(
    (updates: Partial<Student>) => {
      if (!currentStudent) return;
      const updated: Student = {
        ...currentStudent,
        ...updates
      };
      persistStudent(updated);
      showToast('Profile updated successfully! ✓', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  const updateSettings = useCallback(
    (settingsUpdates: Partial<StudentSettings>) => {
      if (!currentStudent) return;
      const updated: Student = {
        ...currentStudent,
        settings: {
          ...currentStudent.settings,
          ...settingsUpdates
        }
      };
      persistStudent(updated);
      showToast('Settings saved ✓', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  const completeOnboarding = useCallback(
    (data: {
      interests: string[];
      skillLevel: Student['skillLevel'];
      learningGoal: string;
      dailyGoal: number;
    }) => {
      if (!currentStudent) return;
      const updated: Student = {
        ...currentStudent,
        interests: data.interests,
        skillLevel: data.skillLevel,
        learningGoal: data.learningGoal,
        dailyGoal: data.dailyGoal,
        onboardingCompleted: true
      };
      persistStudent(updated);
      showToast('Welcome aboard! Your personalized dashboard is ready.', 'success');
    },
    [currentStudent, persistStudent, showToast]
  );

  return (
    <StudentContext.Provider
      value={{
        student: currentStudent,
        enrollCourse,
        unenrollCourse,
        toggleSaveCourse,
        isCourseEnrolled,
        isCourseSaved,
        isLessonCompleted,
        completeLesson,
        saveQuizResult,
        submitAssignment,
        addOrUpdateNote,
        deleteNote,
        getNoteForLesson,
        addCalendarEvent,
        deleteCalendarEvent,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        updateProfile,
        updateSettings,
        completeOnboarding
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
