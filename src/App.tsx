/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { CourseProvider } from './context/CourseContext';

// Layout & Route Protection
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Onboarding
import { Onboarding } from './pages/onboarding/Onboarding';

// Protected App Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { ExploreCourses } from './pages/courses/ExploreCourses';
import { MyCourses } from './pages/courses/MyCourses';
import { CourseDetails } from './pages/courses/CourseDetails';
import { LessonPlayer } from './pages/courses/LessonPlayer';
import { QuizPage } from './pages/quiz/QuizPage';
import { AssignmentsPage } from './pages/assignments/AssignmentsPage';
import { AssignmentDetailPage } from './pages/assignments/AssignmentDetailPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { AchievementsPage } from './pages/achievements/AchievementsPage';
import { CertificatesPage } from './pages/certificates/CertificatesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <StudentProvider>
              <CourseProvider>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Onboarding Flow (Authenticated, but doesn't require onboarding complete) */}
                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute requireOnboarding={false}>
                        <Onboarding />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Student Portal inside AppLayout */}
                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/explore" element={<ExploreCourses />} />
                    <Route path="/courses" element={<MyCourses />} />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route
                      path="/courses/:courseId/lessons/:lessonId"
                      element={<LessonPlayer />}
                    />
                    <Route path="/courses/:courseId/quiz" element={<QuizPage />} />
                    <Route path="/assignments" element={<AssignmentsPage />} />
                    <Route
                      path="/assignments/:assignmentId"
                      element={<AssignmentDetailPage />}
                    />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/certificates" element={<CertificatesPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Route>

                  {/* Catch-all fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </CourseProvider>
            </StudentProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
