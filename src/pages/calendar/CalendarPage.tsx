import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';
import { COURSES } from '../../data/courses';
import { ASSIGNMENTS } from '../../data/assignments';
import { CalendarEvent } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CalendarPage: React.FC = () => {
  const { student, addCalendarEvent, deleteCalendarEvent } = useStudent();
  const { showToast } = useToast();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(selectedDateStr);
  const [eventTime, setEventTime] = useState('14:00');
  const [eventCourseId, setEventCourseId] = useState(COURSES[0]?.id || '');
  const [eventDuration, setEventDuration] = useState('45');

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Compute days in month and padding
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Combine student custom events + assignment due dates
  const allEvents = useMemo(() => {
    const list: CalendarEvent[] = [...(student?.calendarEvents || [])];

    // Map assignments to events
    ASSIGNMENTS.forEach((asg) => {
      // asg.dueDate is like '2025-09-15'
      list.push({
        id: `asg_${asg.id}`,
        title: `Due: ${asg.title}`,
        date: asg.dueDate,
        time: '23:59',
        type: 'assignment',
        courseId: asg.courseId,
        completed: false
      });
    });

    return list;
  }, [student?.calendarEvents]);

  // Events on selected day
  const eventsOnSelectedDay = useMemo(() => {
    return allEvents.filter((ev) => ev.date === selectedDateStr);
  }, [allEvents, selectedDateStr]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      showToast('Please enter a session title', 'error');
      return;
    }

    addCalendarEvent({
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      type: 'study',
      courseId: eventCourseId,
      completed: false
    });

    showToast('Study session scheduled!', 'success');
    setShowAddModal(false);
    setEventTitle('');
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Study Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Learning Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Plan your study sessions and stay on top of upcoming assignment deadlines.
          </p>
        </div>

        <Button
          onClick={() => {
            setEventDate(selectedDateStr);
            setShowAddModal(true);
          }}
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Schedule Session
        </Button>
      </div>

      {/* Main Grid: Calendar Grid + Day Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Month Calendar */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          {/* Month Header controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{monthName}</h2>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Today
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for starting offset */}
            {[...Array(firstDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} className="h-20 sm:h-24 rounded-2xl bg-transparent" />
            ))}

            {/* Day slots */}
            {[...Array(daysInMonth)].map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
                dayNum
              ).padStart(2, '0')}`;
              const isSelected = selectedDateStr === dateStr;
              const isToday =
                new Date().toISOString().split('T')[0] === dateStr;

              // Find events on this day
              const dayEvents = allEvents.filter((e) => e.date === dateStr);

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-20 sm:h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-sm'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-indigo-600 text-white'
                          : isSelected
                          ? 'text-indigo-600 font-extrabold'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>

                  {/* Micro event dots / snippets */}
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-semibold truncate px-1.5 py-0.5 rounded ${
                          ev.type === 'assignment'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300'
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-slate-400 pl-1">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Day Details & Scheduled Sessions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Agenda for
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
              </div>
              <Badge variant="indigo">{eventsOnSelectedDay.length} items</Badge>
            </div>

            {/* List of events */}
            {eventsOnSelectedDay.length > 0 ? (
              <div className="space-y-3">
                {eventsOnSelectedDay.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {ev.title}
                      </h4>
                      {/* Delete button only for student's custom events */}
                      {!ev.id.startsWith('asg_') && (
                        <button
                          type="button"
                          onClick={() => deleteCalendarEvent(ev.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Delete session"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {ev.time}
                      </span>
                      <Badge variant={ev.type === 'assignment' ? 'amber' : 'indigo'} size="sm">
                        {ev.type === 'assignment' ? 'Assignment' : 'Study Session'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 space-y-3">
                <p>No study tasks scheduled for this day.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEventDate(selectedDateStr);
                    setShowAddModal(true);
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Schedule Session
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Study Session Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Schedule Study Session"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Session Title
            </label>
            <input
              type="text"
              required
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="e.g. Master React Hooks & Review State"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Time
              </label>
              <input
                type="time"
                required
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Related Course
            </label>
            <select
              value={eventCourseId}
              onChange={(e) => setEventCourseId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Session
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
