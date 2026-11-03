export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type DailyGoal = 15 | 30 | 60 | 120; // in minutes

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12 min"
  durationMinutes: number;
  type: 'video' | 'reading' | 'interactive';
  videoUrl?: string;
  summary: string;
  content: string;
  resources?: { title: string; url: string; size?: string }[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  rating: number;
  reviewsCount: number;
  students: number;
  difficulty: SkillLevel;
  duration: string; // e.g. "18 hours"
  totalMinutes: number;
  thumbnail: string;
  badge?: string;
  overview: string[];
  learningOutcomes: string[];
  requirements: string[];
  modules: Module[];
  quizId?: string;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  passingScore: number; // e.g. 70
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  courseId: string;
  courseTitle: string;
  score: number; // 0-100
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  instructions: string[];
  dueDate: string; // YYYY-MM-DD
  points: number;
  rubric: { criteria: string; points: number }[];
}

export interface StudentAssignmentSubmission {
  assignmentId: string;
  courseId: string;
  status: 'submitted' | 'graded';
  submissionText: string;
  fileName?: string;
  fileSize?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export interface LessonNote {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  content: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'course' | 'streak' | 'quiz' | 'time' | 'note';
  icon: string;
  targetValue: number;
  unlockedAt?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  gradePercent?: number;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'course' | 'quiz' | 'assignment' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'study' | 'course';
  date: string; // YYYY-MM-DD
  time?: string;
  courseId?: string;
  courseTitle?: string;
  completed?: boolean;
  notes?: string;
}

export interface StudentSettings {
  theme: 'light' | 'dark' | 'system';
  assignmentReminders: boolean;
  courseUpdates: boolean;
  achievementNotifications: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string; // Stored in localStorage for client-side demo purposes only
  profileImage: string | null;
  bio: string;
  onboardingCompleted: boolean;
  interests: string[];
  skillLevel: SkillLevel;
  learningGoal: string;
  dailyGoal: number; // in minutes
  enrolledCourses: string[]; // Course IDs
  savedCourses: string[]; // Course IDs
  completedLessons: string[]; // Lesson IDs
  quizResults: QuizResult[];
  assignments: StudentAssignmentSubmission[];
  notes: LessonNote[];
  achievements: Achievement[];
  certificates: Certificate[];
  notifications: StudentNotification[];
  calendarEvents: CalendarEvent[];
  learningStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalLearningMinutes: number;
  settings: StudentSettings;
  createdAt: string;
}
