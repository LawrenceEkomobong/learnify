import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { ASSIGNMENTS } from '../../data/assignments';
import { useStudent } from '../../context/StudentContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';

type AssignmentFilter = 'all' | 'pending' | 'submitted' | 'graded';

export const AssignmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [filter, setFilter] = useState<AssignmentFilter>('all');

  const filteredAssignments = useMemo(() => {
    return ASSIGNMENTS.filter((asg) => {
      const submission = student?.assignments?.find((s) => s.assignmentId === asg.id);
      const isSubmitted = !!submission;
      const isGraded = submission?.status === 'graded';

      if (filter === 'pending') return !isSubmitted;
      if (filter === 'submitted') return isSubmitted && !isGraded;
      if (filter === 'graded') return isGraded;
      return true;
    });
  }, [filter, student?.assignments]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
          <FileCheck2 className="w-4 h-4" />
          <span>Coursework</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Assignments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Submit practical projects and track feedback from course mentors.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {(['all', 'pending', 'submitted', 'graded'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((asg) => {
            const submission = student?.assignments?.find(
              (s) => s.assignmentId === asg.id
            );
            const isSubmitted = !!submission;
            const isGraded = submission?.status === 'graded';

            return (
              <div
                key={asg.id}
                onClick={() => navigate(`/assignments/${asg.id}`)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {asg.courseTitle}
                    </span>
                    {isGraded ? (
                      <Badge variant="emerald">Graded: {submission.grade}%</Badge>
                    ) : isSubmitted ? (
                      <Badge variant="cyan">Submitted</Badge>
                    ) : (
                      <Badge variant="amber">Pending Submission</Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 mb-1.5">
                    {asg.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {asg.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {asg.dueDate}</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {asg.points} points
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No assignments found"
          description="There are currently no assignments matching your chosen filter status."
        />
      )}
    </div>
  );
};
