import { Student } from '../types';

export const DEMO_STUDENT: Student = {
  id: 'student_alex_001',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  password: 'demoPassword', // Stored for client-side demo purposes only
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  bio: 'Full-stack software enthusiast and product designer currently leveling up React, TypeScript, and modern UI architectures.',
  onboardingCompleted: true,
  interests: ['Web Development', 'UI/UX Design', 'Programming'],
  skillLevel: 'Intermediate',
  learningGoal: 'Build projects',
  dailyGoal: 30, // 30 mins
  enrolledCourses: ['course-1', 'course-2', 'course-3'],
  savedCourses: ['course-4', 'course-5'],
  completedLessons: ['les-1-1-1', 'les-1-1-2', 'les-2-1-1'],
  quizResults: [
    {
      id: 'qr-1',
      quizId: 'quiz-course-2',
      courseId: 'course-2',
      courseTitle: 'UI/UX Design Fundamentals',
      score: 100,
      correctAnswers: 4,
      totalQuestions: 4,
      passed: true,
      timeSpentSeconds: 145,
      completedAt: '2026-08-25T16:45:00.000Z',
      answers: [
        { questionId: 'q-2-1', selectedIndex: 1, isCorrect: true },
        { questionId: 'q-2-2', selectedIndex: 1, isCorrect: true },
        { questionId: 'q-2-3', selectedIndex: 1, isCorrect: true },
        { questionId: 'q-2-4', selectedIndex: 2, isCorrect: true }
      ]
    }
  ],
  assignments: [
    {
      assignmentId: 'asg-2',
      courseId: 'course-2',
      status: 'submitted',
      submissionText: 'I built an interactive 6-frame Figma mobile banking prototype focusing on frictionless one-tap payment confirmation and clear visual feedback for success and insufficient fund states.',
      fileName: 'alex_johnson_banking_case_study.fig',
      fileSize: '4.2 MB',
      submittedAt: '2026-08-26T11:20:00.000Z',
      grade: 95,
      feedback: 'Exceptional attention to the 8pt grid and micro-interaction states. The rationale clearly explains the friction reduction.'
    }
  ],
  notes: [
    {
      id: 'note-1',
      courseId: 'course-1',
      courseTitle: 'Complete Modern Web Development',
      lessonId: 'les-1-1-1',
      lessonTitle: 'How the Web Works & Development Setup',
      content: 'DNS resolution traverses Root -> TLD (.com) -> Authoritative Nameserver. Browser then initiates TLS handshake over TCP port 443.',
      updatedAt: '2026-08-24T10:15:00.000Z'
    },
    {
      id: 'note-2',
      courseId: 'course-2',
      courseTitle: 'UI/UX Design Fundamentals',
      lessonId: 'les-2-1-1',
      lessonTitle: 'Visual Hierarchy & The 8pt Spacing Grid',
      content: 'Never use random pixel padding like 13px or 17px. Always step by 4px or 8px increments (4, 8, 12, 16, 24, 32, 48, 64) for optical rhythm.',
      updatedAt: '2026-08-25T14:30:00.000Z'
    }
  ],
  achievements: [
    {
      id: 'ach-first-lesson',
      title: 'First Step Forward',
      description: 'Complete your very first lesson on Learnify.',
      category: 'course',
      icon: 'Footprints',
      targetValue: 1,
      unlockedAt: '2026-08-24T10:30:00.000Z'
    },
    {
      id: 'ach-7-streak',
      title: '7-Day Learning Streak',
      description: 'Study for 7 consecutive days without breaking your streak.',
      category: 'streak',
      icon: 'Flame',
      targetValue: 7,
      unlockedAt: '2026-08-27T09:00:00.000Z'
    },
    {
      id: 'ach-high-score',
      title: 'Quiz Master (90%+)',
      description: 'Score 90% or higher on any course quiz assessment.',
      category: 'quiz',
      icon: 'Target',
      targetValue: 90,
      unlockedAt: '2026-08-25T16:45:00.000Z'
    }
  ],
  certificates: [],
  notifications: [
    {
      id: 'notif-1',
      title: 'Assignment Graded! 🎉',
      message: 'Your submission for "Mobile Banking App Micro-Interactions" scored 95/100.',
      type: 'assignment',
      read: false,
      createdAt: '2026-08-27T12:00:00.000Z',
      actionUrl: '/assignments'
    },
    {
      id: 'notif-2',
      title: '7-Day Streak Unlocked 🔥',
      message: 'Congratulations! You have maintained a continuous 7-day study habit.',
      type: 'achievement',
      read: false,
      createdAt: '2026-08-27T09:00:00.000Z',
      actionUrl: '/achievements'
    },
    {
      id: 'notif-3',
      title: 'Welcome to Learnify!',
      message: 'Start exploring courses in your selected interests: Web Dev & UI/UX Design.',
      type: 'system',
      read: true,
      createdAt: '2026-08-20T08:00:00.000Z',
      actionUrl: '/explore'
    }
  ],
  calendarEvents: [
    {
      id: 'evt-1',
      title: 'Web Dev Cap-Stone Due',
      type: 'assignment',
      date: '2026-09-15',
      time: '23:59',
      courseId: 'course-1',
      courseTitle: 'Complete Modern Web Development'
    },
    {
      id: 'evt-2',
      title: 'Python Study Sprint',
      type: 'study',
      date: '2026-08-29',
      time: '14:00',
      courseId: 'course-3',
      courseTitle: 'Python for Beginners',
      notes: 'Focus on dictionaries and list comprehensions.'
    },
    {
      id: 'evt-3',
      title: 'React Architecture Quiz',
      type: 'quiz',
      date: '2026-09-02',
      time: '10:00',
      courseId: 'course-5',
      courseTitle: 'React.js Masterclass'
    }
  ],
  learningStreak: 7,
  lastActiveDate: '2026-08-28',
  totalLearningMinutes: 420, // 7 hours
  settings: {
    theme: 'light',
    assignmentReminders: true,
    courseUpdates: true,
    achievementNotifications: true
  },
  createdAt: '2026-08-20'
};
