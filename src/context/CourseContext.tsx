import React, { createContext, useContext, useState, useMemo } from 'react';
import { Course, SkillLevel } from '../types';
import { COURSES } from '../data/courses';

export type CourseSortOption = 'popular' | 'rating' | 'newest' | 'duration-asc' | 'duration-desc';

interface CourseContextType {
  courses: Course[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDifficulty: SkillLevel | 'All';
  setSelectedDifficulty: (diff: SkillLevel | 'All') => void;
  sortBy: CourseSortOption;
  setSortBy: (sort: CourseSortOption) => void;
  filteredCourses: Course[];
  getCourseById: (courseId: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses] = useState<Course[]>(COURSES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<SkillLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<CourseSortOption>('popular');

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchDesc = c.shortDescription.toLowerCase().includes(q);
          const matchCat = c.category.toLowerCase().includes(q);
          const matchInstructor = c.instructor.name.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat && !matchInstructor) {
            return false;
          }
        }
        // Category match
        if (selectedCategory !== 'All' && c.category !== selectedCategory) {
          return false;
        }
        // Difficulty match
        if (selectedDifficulty !== 'All' && c.difficulty !== selectedDifficulty) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.students - a.students;
          case 'rating':
            return b.rating - a.rating;
          case 'duration-asc':
            return a.totalMinutes - b.totalMinutes;
          case 'duration-desc':
            return b.totalMinutes - a.totalMinutes;
          case 'newest':
          default:
            return 0;
        }
      });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const getCourseById = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        sortBy,
        setSortBy,
        filteredCourses,
        getCourseById
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
