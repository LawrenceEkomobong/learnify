import { Achievement } from '../types';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-lesson',
    title: 'First Step Forward',
    description: 'Complete your very first lesson on Learnify.',
    category: 'course',
    icon: 'Footprints',
    targetValue: 1
  },
  {
    id: 'ach-first-course',
    title: 'First Course Completed',
    description: 'Complete 100% of the lessons in any enrolled course.',
    category: 'course',
    icon: 'Trophy',
    targetValue: 1
  },
  {
    id: 'ach-five-courses',
    title: 'Dedicated Scholar',
    description: 'Complete 5 full courses on the platform.',
    category: 'course',
    icon: 'GraduationCap',
    targetValue: 5
  },
  {
    id: 'ach-7-streak',
    title: '7-Day Learning Streak',
    description: 'Study for 7 consecutive days without breaking your streak.',
    category: 'streak',
    icon: 'Flame',
    targetValue: 7
  },
  {
    id: 'ach-30-streak',
    title: 'Habit of Excellence',
    description: 'Reach an extraordinary 30-day continuous learning streak.',
    category: 'streak',
    icon: 'Sparkles',
    targetValue: 30
  },
  {
    id: 'ach-high-score',
    title: 'Quiz Master (90%+)',
    description: 'Score 90% or higher on any course quiz assessment.',
    category: 'quiz',
    icon: 'Target',
    targetValue: 90
  },
  {
    id: 'ach-ten-hours',
    title: 'Deep Focus (10 Hours)',
    description: 'Accumulate over 10 hours of active learning time.',
    category: 'time',
    icon: 'Clock',
    targetValue: 600 // 600 minutes
  },
  {
    id: 'ach-note-taker',
    title: 'Diligent Note Taker',
    description: 'Record 3 or more personal study notes during lessons.',
    category: 'note',
    icon: 'BookOpen',
    targetValue: 3
  },
  {
    id: 'ach-first-assignment',
    title: 'Project Builder',
    description: 'Submit your first course project assignment for review.',
    category: 'course',
    icon: 'FolderCheck',
    targetValue: 1
  }
];

export const ACHIEVEMENTS = ALL_ACHIEVEMENTS;
