import React from 'react';
import { Trophy, Lock, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/achievements';
import { useStudent } from '../../context/StudentContext';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export const AchievementsPage: React.FC = () => {
  const { student } = useStudent();

  const unlockedIds =
    student?.achievements?.map((a: any) => (typeof a === 'string' ? a : a.id)) || [];
  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Milestones</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Achievements & Badges
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Earn recognition for consistency, exam excellence, and course completions.
        </p>
      </div>

      {/* Stats Summary Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-cyan-500/10 rounded-3xl border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
            🏆
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {unlockedCount} of {totalCount} Badges Unlocked
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Keep learning and finishing coursework to unlock the remaining milestones!
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-300">Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {completionPercentage}%
            </span>
          </div>
          <ProgressBar value={completionPercentage} color="amber" size="md" />
        </div>
      </div>

      {/* Grid of Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedIds.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`rounded-3xl border p-6 transition-all flex flex-col justify-between select-none ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-amber-300/80 dark:border-amber-800/80 shadow-sm'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                      isUnlocked
                        ? 'bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-200 dark:bg-slate-800 grayscale text-slate-400'
                    }`}
                  >
                    {isUnlocked ? ach.icon : '🔒'}
                  </div>
                  {isUnlocked ? (
                    <Badge variant="amber" size="sm">
                      Unlocked ✓
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      Locked
                    </Badge>
                  )}
                </div>

                <h3
                  className={`text-base font-bold mb-1.5 ${
                    isUnlocked
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Category: {ach.category}</span>
                {isUnlocked && (
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    Earned
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
