import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Check,
  HelpCircle
} from 'lucide-react';
import { QUIZZES } from '../../data/quizzes';
import { COURSES } from '../../data/courses';
import { useStudent } from '../../context/StudentContext';
import { triggerCelebrationConfetti } from '../../utils/confetti';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export const QuizPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { saveQuizResult } = useStudent();

  const quiz = useMemo(() => {
    const quizList = Object.values(QUIZZES);
    return quizList.find((q) => q.courseId === courseId) || quizList[0];
  }, [courseId]);

  const course = useMemo(() => {
    return COURSES.find((c) => c.id === quiz?.courseId);
  }, [quiz]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIdx];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Calculate score upon submission
  const quizResults = useMemo(() => {
    if (!isSubmitted) return null;

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= quiz.passingScore;

    return {
      correctCount,
      totalCount: totalQuestions,
      scorePercentage,
      passed
    };
  }, [isSubmitted, quiz, selectedAnswers, totalQuestions]);

  const handleSubmit = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Do you still wish to submit?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);

    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct++;
    });

    const pct = Math.round((correct / totalQuestions) * 100);

    saveQuizResult({
      quizId: quiz.id,
      courseId: quiz.courseId,
      courseTitle: course?.title || quiz.title,
      score: pct,
      correctAnswers: correct,
      totalQuestions,
      passed: pct >= quiz.passingScore,
      timeSpentSeconds: 180,
      answers: quiz.questions.map((q, idx) => ({
        questionId: q.id,
        selectedIndex: selectedAnswers[idx] ?? -1,
        isCorrect: selectedAnswers[idx] === q.correctIndex
      }))
    });

    if (pct >= quiz.passingScore) {
      triggerCelebrationConfetti();
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowReview(false);
    setCurrentIdx(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(`/courses/${courseId || ''}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course</span>
        </button>

        <Badge variant="indigo">Passing Score: {quiz.passingScore}%</Badge>
      </div>

      {/* Quiz Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
        {/* If NOT submitted: Active Quiz view */}
        {!isSubmitted ? (
          <>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {quiz.title}
              </span>
              <div className="flex items-center justify-between mt-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Question {currentIdx + 1} of {totalQuestions}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {Object.keys(selectedAnswers).length}/{totalQuestions} Answered
                </span>
              </div>
              <ProgressBar
                value={((currentIdx + 1) / totalQuestions) * 100}
                size="sm"
                className="mt-3"
              />
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {letter}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{option}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentIdx < totalQuestions - 1 ? (
                  <Button
                    size="md"
                    onClick={handleNext}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    size="md"
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-bold shadow-md shadow-emerald-600/25"
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* RESULT SCREEN */
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 py-4">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl shadow-md ${
                  quizResults?.passed
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {quizResults?.passed ? '🎉' : '✍️'}
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {quizResults?.passed ? 'Assessment Passed!' : 'Needs Improvement'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  {quizResults?.passed
                    ? `Great job! You achieved ${quizResults.scorePercentage}%, meeting the ${quiz.passingScore}% passing threshold.`
                    : `You scored ${quizResults?.scorePercentage}%. Review the answers below and try again to improve your score.`}
                </p>
              </div>

              {/* Score Display Card */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] text-slate-400">Score</span>
                  <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {quizResults?.scorePercentage}%
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] text-slate-400">Correct</span>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {quizResults?.correctCount} / {quizResults?.totalCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] text-slate-400">Status</span>
                  <div
                    className={`text-sm font-extrabold mt-1 ${
                      quizResults?.passed ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {quizResults?.passed ? 'PASSED' : 'RETRY'}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRetake}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Retake Quiz
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowReview(!showReview)}
              >
                {showReview ? 'Hide Answers Review' : 'Review Questions & Answers'}
              </Button>
              <Button
                className="flex-1"
                onClick={() => navigate(`/courses/${courseId || ''}`)}
              >
                Return to Course
              </Button>
            </div>

            {/* DETAILED QUESTION REVIEW */}
            {showReview && (
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Answer Explanations
                </h4>

                <div className="space-y-4">
                  {quiz.questions.map((q, qIdx) => {
                    const studentChoice = selectedAnswers[qIdx];
                    const isCorrect = studentChoice === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border ${
                          isCorrect
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                            : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {qIdx + 1}. {q.question}
                          </span>
                          {isCorrect ? (
                            <Badge variant="emerald" size="sm">
                              Correct
                            </Badge>
                          ) : (
                            <Badge variant="rose" size="sm">
                              Incorrect
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs space-y-1 mt-2 text-slate-600 dark:text-slate-400">
                          <div>
                            Your Answer:{' '}
                            <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                              {studentChoice !== undefined
                                ? q.options[studentChoice]
                                : 'None selected'}
                            </strong>
                          </div>
                          {!isCorrect && (
                            <div>
                              Correct Answer:{' '}
                              <strong className="text-emerald-600">
                                {q.options[q.correctIndex]}
                              </strong>
                            </div>
                          )}
                        </div>

                        {q.explanation && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-start gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
