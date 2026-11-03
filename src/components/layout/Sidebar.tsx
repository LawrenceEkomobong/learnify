import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  FileCheck2,
  CalendarDays,
  Trophy,
  Award,
  Bell,
  Settings,
  GraduationCap,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';
import { Avatar } from '../common/Avatar';

export interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { currentStudent, logout } = useAuth();
  const { isCourseEnrolled } = useStudent();

  const unreadCount = currentStudent?.notifications.filter((n) => !n.read).length || 0;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/explore', label: 'Explore Courses', icon: Compass },
    { to: '/courses', label: 'My Courses', icon: BookOpen, count: currentStudent?.enrolledCourses.length },
    { to: '/assignments', label: 'Assignments', icon: FileCheck2 },
    { to: '/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/achievements', label: 'Achievements', icon: Trophy, count: currentStudent?.achievements.length },
    { to: '/certificates', label: 'Certificates', icon: Award, count: currentStudent?.certificates.length },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-5 select-none transition-colors">
      {/* Brand Header */}
      <div>
        <div className="px-6 mb-6 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 dark:text-white"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">
                Learnify
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">
                Student Platform
              </span>
            </div>
          </NavLink>
        </div>

        {/* Navigation list */}
        <nav className="px-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white leading-none">
                        {item.badge}
                      </span>
                    )}

                    {item.count !== undefined && item.count > 0 && !item.badge && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                          isActive
                            ? 'bg-indigo-700/80 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Widget & Streak */}
      <div className="px-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        {/* Streak banner */}
        {currentStudent && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200/80 dark:border-amber-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {currentStudent.learningStreak} Day Streak
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Goal: {currentStudent.dailyGoal || 30}m / day
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Card */}
        {currentStudent && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div
              onClick={() => {
                navigate('/profile');
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer"
            >
              <Avatar
                src={currentStudent.profileImage}
                name={currentStudent.name}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {currentStudent.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {currentStudent.skillLevel} • {currentStudent.enrolledCourses.length} courses
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Log out"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
