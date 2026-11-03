import { Student } from '../types';

/**
 * Formats a Date object to YYYY-MM-DD in local time
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates updated streak count when an active learning event happens
 */
export function calculateUpdatedStreak(currentStreak: number, lastActiveDate: string): { newStreak: number; newDate: string; streakIncreased: boolean } {
  const todayStr = getTodayDateString();
  
  if (!lastActiveDate) {
    return { newStreak: 1, newDate: todayStr, streakIncreased: true };
  }

  if (lastActiveDate === todayStr) {
    // Already studied today; streak holds steady
    return { newStreak: Math.max(1, currentStreak), newDate: todayStr, streakIncreased: false };
  }

  const today = new Date(todayStr);
  const lastActive = new Date(lastActiveDate);
  const diffTime = Math.abs(today.getTime() - lastActive.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day study!
    return { newStreak: currentStreak + 1, newDate: todayStr, streakIncreased: true };
  } else {
    // Missed at least one day, reset to 1
    return { newStreak: 1, newDate: todayStr, streakIncreased: true };
  }
}
