import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Trash2,
  Users,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Student } from '../../types';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { student, updateProfile } = useStudent();
  const { allStudents, switchStudent, logout } = useAuth();
  const { showToast } = useToast();

  const [courseAlerts, setCourseAlerts] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetProgress = () => {
    if (!student) return;
    updateProfile({
      completedLessons: [],
      quizResults: [],
      certificates: [],
      learningStreak: 1,
      achievements: []
    });
    setShowResetModal(false);
    showToast('Learning progress and completed lessons have been reset.', 'info');
  };

  const handleSwitchAccount = (email: string) => {
    const success = switchStudent(email);
    if (success) {
      showToast(`Switched account to ${email}`, 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
          <SettingsIcon className="w-4 h-4" />
          <span>Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Settings & Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure app appearance, notification delivery, and account data isolation.
        </p>
      </div>

      {/* SECTION 1: APPEARANCE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Appearance & Theme
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                Dark Mode
              </span>
              <span className="text-xs text-slate-500">
                Current theme is {theme === 'dark' ? 'Dark' : 'Light'}. Toggle anytime.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
            aria-label="Toggle theme"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                theme === 'dark' ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* SECTION 2: NOTIFICATIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Email & App Notifications
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                Course Announcements & Updates
              </span>
              <span className="text-xs text-slate-500">
                Receive notifications when new lessons or modules are released.
              </span>
            </div>
            <input
              type="checkbox"
              checked={courseAlerts}
              onChange={(e) => setCourseAlerts(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                Assignment Deadlines & Reminders
              </span>
              <span className="text-xs text-slate-500">
                Get alerted 24 hours before assignment due dates.
              </span>
            </div>
            <input
              type="checkbox"
              checked={assignmentAlerts}
              onChange={(e) => setAssignmentAlerts(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                Weekly Study Progress Summary
              </span>
              <span className="text-xs text-slate-500">
                Weekly digest of total hours studied, quizzes passed, and streak status.
              </span>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MULTI-STUDENT SIMULATION SWITCHER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Simulate Multi-Student Accounts
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Demonstrates complete client-side data isolation. Student A never sees Student B's courses or progress.
            </p>
          </div>
          <Users className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {allStudents.map((s: Student) => {
            const isCurrent = s.id === student?.id;
            return (
              <div
                key={s.id}
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {s.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{s.email}</span>
                </div>

                {!isCurrent && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSwitchAccount(s.email)}
                  >
                    Switch
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: DATA RESET & DANGER ZONE */}
      <div className="bg-rose-50/40 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/80 p-6 space-y-4">
        <h3 className="text-base font-bold text-rose-900 dark:text-rose-300">
          Data Management & Reset
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Reset Learning History
            </span>
            <span className="text-xs text-slate-500">
              Clear your lesson completions and quiz records while keeping your account intact.
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResetModal(true)}
            className="border-rose-300 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 shrink-0"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Progress
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Learning Progress?"
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Are you sure?
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              This will reset all your completed lessons, quiz scores, and certificates for this account.
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResetModal(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleResetProgress}
              className="bg-rose-600 hover:bg-rose-700 text-white border-none"
            >
              Yes, Reset Progress
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
