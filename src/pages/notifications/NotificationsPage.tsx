import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
  Sparkles,
  Trophy,
  BookOpen
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { student, markNotificationRead, markAllNotificationsRead } = useStudent();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications = student?.notifications || [];
  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Activity Inbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Stay updated with course progress, assignment feedback, and community milestones.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
            leftIcon={<CheckCheck className="w-4 h-4 text-indigo-600" />}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === 'unread'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => {
            const isUnread = !notif.read;
            return (
              <div
                key={notif.id}
                onClick={() => {
                  if (isUnread) markNotificationRead(notif.id);
                  if (notif.actionUrl) navigate(notif.actionUrl);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isUnread
                    ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800/80 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/60'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isUnread
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold truncate ${
                          isUnread
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      {new Date(notif.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                {notif.actionUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    View
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="w-8 h-8 text-indigo-600" />}
          title="No notifications to show"
          description="You're completely up to date with your studies and announcements."
        />
      )}
    </div>
  );
};
