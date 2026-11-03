import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Award,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  File,
  X
} from 'lucide-react';
import { ASSIGNMENTS } from '../../data/assignments';
import { useStudent } from '../../context/StudentContext';
import { triggerCelebrationConfetti } from '../../utils/confetti';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AssignmentDetailPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const { student, submitAssignment } = useStudent();

  const assignment = useMemo(() => {
    return ASSIGNMENTS.find((a) => a.id === assignmentId);
  }, [assignmentId]);

  const existingSubmission = useMemo(() => {
    return student?.assignments?.find((s) => s.assignmentId === assignmentId);
  }, [student?.assignments, assignmentId]);

  const [textSubmission, setTextSubmission] = useState(
    existingSubmission?.submissionText || ''
  );
  const [attachedFileName, setAttachedFileName] = useState<string | null>(
    existingSubmission?.fileName || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!assignment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assignment Not Found</h2>
        <Button onClick={() => navigate('/assignments')} className="mt-4">
          Back to Assignments
        </Button>
      </div>
    );
  }

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textSubmission.trim() && !attachedFileName) {
      alert('Please provide a text response or attach a project file before submitting.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment({
        assignmentId: assignment.id,
        courseId: assignment.courseId,
        status: 'submitted',
        submissionText: textSubmission,
        fileName: attachedFileName || undefined
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      triggerCelebrationConfetti();
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      <button
        type="button"
        onClick={() => navigate('/assignments')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all assignments</span>
      </button>

      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="indigo">{assignment.courseTitle}</Badge>
          {existingSubmission ? (
            <Badge
              variant={existingSubmission.status === 'graded' ? 'emerald' : 'cyan'}
            >
              {existingSubmission.status === 'graded'
                ? `Graded: ${existingSubmission.grade}%`
                : 'Submitted'}
            </Badge>
          ) : (
            <Badge variant="amber">Not Yet Submitted</Badge>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {assignment.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Due Date: {assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Max Score: {assignment.points} points</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Instructions vs Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Instructions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instructions & Deliverables
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {assignment.description}
            </p>

            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Evaluation Rubric
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Code architecture and modularity (40 pts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Adherence to requirements and edge cases (40 pts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Documentation, comments, and README clarity (20 pts)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feedback Card if graded */}
          {existingSubmission?.feedback && (
            <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-3xl border border-emerald-200 dark:border-emerald-900 p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Instructor Feedback
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  Grade: {existingSubmission.grade}%
                </span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                "{existingSubmission.feedback}"
              </p>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Your Project
              </h3>
              {existingSubmission && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Submitted
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Notes or GitHub Repository URL
                </label>
                <textarea
                  value={textSubmission}
                  onChange={(e) => setTextSubmission(e.target.value)}
                  placeholder="Paste your GitHub repository link or write a brief overview of your solution..."
                  rows={4}
                  className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-mono"
                />
              </div>

              {/* File Attachment Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Attach Solution Archive or PDF (.zip, .pdf, .tar.gz)
                </label>

                {attachedFileName ? (
                  <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-900 dark:text-indigo-200">
                      <File className="w-4 h-4 text-indigo-600" />
                      <span className="truncate max-w-[200px]">{attachedFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFileName(null)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/40 transition-colors">
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Click to browse or drag and drop file here
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">
                      Max file size: 25MB (simulated)
                    </span>
                    <input
                      type="file"
                      onChange={handleSimulatedFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <Button
                type="submit"
                size="md"
                className="w-full mt-2"
                isLoading={isSubmitting}
                leftIcon={<FileCheck className="w-4 h-4" />}
              >
                {existingSubmission ? 'Resubmit Solution' : 'Submit Assignment'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
