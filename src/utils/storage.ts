import { Student } from '../types';
import { DEMO_STUDENT } from '../data/seedData';

export const STORAGE_KEYS = {
  STUDENTS: 'learnify_students',
  CURRENT_USER: 'learnify_current_user',
  THEME: 'learnify_theme',
  COURSES: 'learnify_courses',
} as const;

/**
 * Initializes localStorage with default demo data if not already present.
 * NOTE: For demonstration purposes only. Passwords and student data are stored
 * in browser localStorage and are not intended for production-grade security.
 */
export function initializeSeedData(): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!existing) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify([DEMO_STUDENT]));
      // Pre-set current user to demo student on very first visit for immediate evaluation experience!
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, DEMO_STUDENT.id);
    }
  } catch (err) {
    console.error('Failed to initialize seed data in localStorage', err);
  }
}

/**
 * Retrieves all registered students from localStorage.
 */
export function getStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!raw) {
      initializeSeedData();
      const fresh = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return fresh ? JSON.parse(fresh) : [DEMO_STUDENT];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to retrieve students from localStorage', err);
    return [DEMO_STUDENT];
  }
}

/**
 * Persists all students to localStorage.
 */
export function saveStudents(students: Student[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save students to localStorage', err);
  }
}

/**
 * Retrieves the current session user ID.
 */
export function getCurrentUserId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  } catch {
    return null;
  }
}

/**
 * Sets the current session user ID.
 */
export function setCurrentUserId(userId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  } catch (err) {
    console.error('Failed to set current user ID in localStorage', err);
  }
}

/**
 * Clears the active session.
 */
export function clearCurrentUserId(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (err) {
    console.error('Failed to clear current user ID from localStorage', err);
  }
}

/**
 * Returns the currently authenticated Student record, or null.
 */
export function getCurrentUser(): Student | null {
  const currentId = getCurrentUserId();
  if (!currentId) return null;
  const students = getStudents();
  return students.find(s => s.id === currentId) || null;
}

/**
 * Updates a specific student record in the storage array.
 */
export function updateStudentInStorage(updatedStudent: Student): void {
  const students = getStudents();
  const index = students.findIndex(s => s.id === updatedStudent.id);
  if (index !== -1) {
    students[index] = updatedStudent;
  } else {
    students.push(updatedStudent);
  }
  saveStudents(students);
}

/**
 * Deletes a student account completely from localStorage.
 */
export function deleteStudentFromStorage(studentId: string): void {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== studentId);
  saveStudents(filtered);
  if (getCurrentUserId() === studentId) {
    clearCurrentUserId();
  }
}
