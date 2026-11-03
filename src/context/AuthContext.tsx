import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Student } from '../types';
import {
  getStudents,
  saveStudents,
  getCurrentUserId,
  setCurrentUserId,
  clearCurrentUserId,
  initializeSeedData,
  deleteStudentFromStorage
} from '../utils/storage';
import { getTodayDateString } from '../utils/streak';

/**
 * ============================================================================
 * IMPORTANT SECURITY & DEMO NOTICE:
 * This authentication system is strictly a client-side simulation designed
 * for demonstration and evaluation purposes using browser localStorage.
 * In a real production application, authentication, password hashing, and token
 * verification must always be securely executed on a dedicated backend server.
 * ============================================================================
 */

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentStudent: Student | null;
  allStudents: Student[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; student?: Student }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string; student?: Student }>;
  logout: () => void;
  resetPasswordSimulated: (email: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  refreshStudentSession: () => void;
  switchStudent: (emailOrId: string) => boolean;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize seed data on first mount and load current user session
  const refreshStudentSession = useCallback(() => {
    initializeSeedData();
    const students = getStudents();
    setAllStudents(students);
    const currentId = getCurrentUserId();
    if (currentId) {
      const matched = students.find((s) => s.id === currentId);
      if (matched) {
        setCurrentStudent(matched);
      } else {
        clearCurrentUserId();
        setCurrentStudent(null);
      }
    } else {
      setCurrentStudent(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshStudentSession();
  }, [refreshStudentSession]);

  /**
   * Log in an existing student
   */
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; student?: Student }> => {
    const students = getStudents();
    const cleanEmail = email.trim().toLowerCase();
    const found = students.find((s) => s.email.toLowerCase() === cleanEmail);

    // Generic error message to prevent account enumeration
    if (!found || found.password !== password) {
      return { success: false, error: 'Email or password is incorrect.' };
    }

    setCurrentUserId(found.id);
    setCurrentStudent(found);
    return { success: true, student: found };
  };

  /**
   * Register a new student account
   */
  const signup = async (
    data: SignupData
  ): Promise<{ success: boolean; error?: string; student?: Student }> => {
    const students = getStudents();
    const cleanEmail = data.email.trim().toLowerCase();

    // Check duplicate email
    const duplicate = students.some((s) => s.email.toLowerCase() === cleanEmail);
    if (duplicate) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newStudentId = `student_${Date.now()}`;
    const today = getTodayDateString();

    const newStudent: Student = {
      id: newStudentId,
      name: data.name.trim(),
      email: cleanEmail,
      password: data.password, // Local frontend demo only
      profileImage: null,
      bio: '',
      onboardingCompleted: false,
      interests: [],
      skillLevel: 'Beginner',
      learningGoal: 'Learn a new skill',
      dailyGoal: 30,
      enrolledCourses: [],
      savedCourses: [],
      completedLessons: [],
      quizResults: [],
      assignments: [],
      notes: [],
      achievements: [],
      certificates: [],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Welcome to Learnify! 🎓',
          message: 'Complete your onboarding preferences to receive personalized course recommendations.',
          type: 'system',
          read: false,
          createdAt: new Date().toISOString()
        }
      ],
      calendarEvents: [],
      learningStreak: 1,
      lastActiveDate: today,
      totalLearningMinutes: 0,
      settings: {
        theme: 'light',
        assignmentReminders: true,
        courseUpdates: true,
        achievementNotifications: true
      },
      createdAt: today
    };

    const updated = [...students, newStudent];
    saveStudents(updated);
    setCurrentUserId(newStudent.id);
    setCurrentStudent(newStudent);

    return { success: true, student: newStudent };
  };

  /**
   * Log out active student
   */
  const logout = () => {
    clearCurrentUserId();
    setCurrentStudent(null);
  };

  /**
   * Simulated password reset
   */
  const resetPasswordSimulated = async (
    email: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    const students = getStudents();
    const cleanEmail = email.trim().toLowerCase();
    const index = students.findIndex((s) => s.email.toLowerCase() === cleanEmail);

    if (index === -1) {
      return { success: false, error: 'No account found with this email address.' };
    }

    students[index].password = newPassword;
    saveStudents(students);

    if (currentStudent && currentStudent.id === students[index].id) {
      setCurrentStudent({ ...students[index] });
    }

    return { success: true };
  };

  /**
   * Switch between simulated student accounts
   */
  const switchStudent = (emailOrId: string): boolean => {
    const students = getStudents();
    const clean = emailOrId.trim().toLowerCase();
    const found = students.find((s) => s.id === emailOrId || s.email.toLowerCase() === clean);
    if (found) {
      setCurrentUserId(found.id);
      setCurrentStudent(found);
      return true;
    }
    return false;
  };

  /**
   * Delete active student account and its isolated data
   */
  const deleteAccount = () => {
    if (!currentStudent) return;
    deleteStudentFromStorage(currentStudent.id);
    setCurrentStudent(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentStudent,
        allStudents,
        isAuthenticated: !!currentStudent,
        isLoading,
        login,
        signup,
        logout,
        resetPasswordSimulated,
        refreshStudentSession,
        switchStudent,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
