import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Save,
  FileText,
  Download,
  FileQuestion,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';
import { calculateCourseProgress, getNextLesson, getPreviousLesson } from '../../utils/progress';
import { triggerCelebrationConfetti } from '../../utils/confetti';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const LessonPlayer: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const {
    student,
    isLessonCompleted,
    completeLesson,
    addOrUpdateNote,
    getNoteForLesson,
    enrollCourse,
    isCourseEnrolled
  } = useStudent();
  const { showToast } = useToast();

  const course = getCourseById(courseId || '');

  // Find active lesson and module
  const currentLessonData = React.useMemo(() => {
    if (!course) return null;
    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        if (les.id === lessonId) {
          return { module: mod, lesson: les };
        }
      }
    }
    // Fallback to first lesson if not found
    if (course.modules[0]?.lessons[0]) {
      return { module: course.modules[0], lesson: course.modules[0].lessons[0] };
    }
    return null;
  }, [course, lessonId]);

  const activeLesson = currentLessonData?.lesson;
  const activeModule = currentLessonData?.module;

  // Auto enroll if accessing player
  useEffect(() => {
    if (course && !isCourseEnrolled(course.id)) {
      enrollCourse(course.id);
    }
  }, [course, isCourseEnrolled, enrollCourse]);

  // Video player custom states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0); // 0 to 100
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');

  // Notes state
  const [noteContent, setNoteContent] = useState<string>('');
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  // Completion celebratory modal
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  // Load existing note when lesson changes
  useEffect(() => {
    if (course && activeLesson) {
      const existing = getNoteForLesson(course.id, activeLesson.id);
      setNoteContent(existing?.content || '');
    } else {
      setNoteContent('');
    }
    // Reset video progress to 0 on new lesson
    setIsPlaying(false);
    setCurrentTime(0);
    setVideoProgress(0);
  }, [course?.id, activeLesson?.id, getNoteForLesson]);

  // Simulated video playback timer
  useEffect(() => {
    let interval: any = null;
    const totalDurationSeconds = (activeLesson?.durationMinutes || 10) * 60;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1 * playbackSpeed;
          if (next >= totalDurationSeconds) {
            setIsPlaying(false);
            // Automatically prompt lesson completion if reached end
            if (activeLesson && !isLessonCompleted(activeLesson.id)) {
              handleToggleComplete();
            }
            return totalDurationSeconds;
          }
          setVideoProgress((next / totalDurationSeconds) * 100);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, activeLesson]);

  if (!course || !activeLesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lesson Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested lesson could not be located.</p>
        <Button onClick={() => navigate('/courses')}>View Courses</Button>
      </div>
    );
  }

  const completed = isLessonCompleted(activeLesson.id);
  const courseProgress = calculateCourseProgress(student?.completedLessons || [], course);
  const prevLesson = getPreviousLesson(course, activeLesson.id);
  const nextLesson = getNextLesson(course, activeLesson.id);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleToggleComplete = () => {
    const wasAlreadyDone = completed;
    completeLesson(activeLesson.id, course.id);

    if (!wasAlreadyDone) {
      showToast('Lesson marked as completed!', 'success');
      // Check if this was the last remaining lesson in the course
      const remaining = course.modules
        .flatMap((m) => m.lessons)
        .filter((l) => l.id !== activeLesson.id && !isLessonCompleted(l.id));

      if (remaining.length === 0) {
        // Entire course finished! Trigger confetti and modal
        triggerCelebrationConfetti();
        setShowCelebrationModal(true);
      }
    }
  };

  const handleSaveNotes = () => {
    if (!activeLesson) return;
    setIsSavingNote(true);
    addOrUpdateNote(course.id, activeLesson.id, noteContent);
    setTimeout(() => {
      setIsSavingNote(false);
      showToast('Notes saved for this lesson.', 'success');
    }, 300);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseFloat(e.target.value);
    const totalSecs = (activeLesson?.durationMinutes || 10) * 60;
    setVideoProgress(pct);
    setCurrentTime((pct / 100) * totalSecs);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <Link
            to={`/courses/${course.id}`}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{course.title}</span>
          </Link>
          <span>/</span>
          <span>{activeModule?.title}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
            {activeLesson.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-medium">
            Course Progress: <strong className="text-indigo-600">{courseProgress.percentage}%</strong>
          </span>
          {course.quizId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/courses/${course.id}/quiz`)}
              leftIcon={<FileQuestion className="w-3.5 h-3.5 text-indigo-600" />}
            >
              Course Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Video Player + Curriculum Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Video Player & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Container */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group">
            {/* Screen Canvas Simulation */}
            <div className="aspect-video relative flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 select-none">
              {/* Play Overlay if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 hover:scale-105 transition-all z-20 cursor-pointer"
                  aria-label="Play lesson video"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
              )}

              {/* Background Mock Video Frame Graphic */}
              <div className="absolute inset-0 opacity-40 flex flex-col justify-between p-8 pointer-events-none">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="font-mono">Learnify Interactive Classroom</span>
                  <span className="px-2 py-1 rounded bg-black/60 font-mono text-[10px] text-emerald-400">
                    HD 1080p
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-indigo-300 text-sm font-semibold tracking-wider uppercase">
                    {course.title}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white max-w-md mx-auto">
                    {activeLesson.title}
                  </h3>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-mono">
                  Instructor: {course.instructor.name}
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 space-y-2.5">
              {/* Scrubbing Bar */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                  {formatSeconds(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={videoProgress}
                  onChange={handleScrub}
                  className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[11px] font-mono text-slate-400 w-10">
                  {formatSeconds((activeLesson.durationMinutes || 10) * 60)}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTime(0);
                      setVideoProgress(0);
                    }}
                    className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-slate-800 rounded-lg px-2 py-1 text-xs">
                    <span className="text-slate-400">Speed:</span>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                      className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="0.75" className="bg-slate-900">0.75x</option>
                      <option value="1" className="bg-slate-900">1x</option>
                      <option value="1.25" className="bg-slate-900">1.25x</option>
                      <option value="1.5" className="bg-slate-900">1.5x</option>
                      <option value="2" className="bg-slate-900">2x</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen?.().catch(() => {});
                      } else {
                        document.exitFullscreen?.().catch(() => {});
                      }
                    }}
                    className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar Under Player */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant={completed ? 'secondary' : 'primary'}
                size="md"
                onClick={handleToggleComplete}
                className="w-full sm:w-auto"
                leftIcon={<CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-600' : ''}`} />}
              >
                {completed ? 'Completed ✓' : 'Mark as Completed'}
              </Button>
            </div>

            {/* Prev / Next Lesson Navigation */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {prevLesson && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/courses/${course.id}/lessons/${prevLesson.id}`)}
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
              )}
              {nextLesson && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/courses/${course.id}/lessons/${nextLesson.id}`)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Lesson
                </Button>
              )}
            </div>
          </div>

          {/* Tabs: Overview, Notes, Resources */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex border-b border-slate-100 dark:border-slate-800 gap-6 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'overview'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Lesson Overview
                {activeTab === 'overview' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'notes'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                My Notes {noteContent.trim() ? '•' : ''}
                {activeTab === 'notes' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'resources'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Resources ({activeLesson.resources?.length || 0})
                {activeTab === 'resources' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeLesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Duration: {activeLesson.durationMinutes} minutes • Module: {activeModule?.title}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  In this lesson, you will explore the core principles and hands-on coding patterns
                  required to master this topic. Follow along with the instructor, try out the code in
                  your development environment, and write personal notes to solidify your understanding.
                </p>
              </div>
            )}

            {/* TAB: NOTES (PERSISTENT) */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Lesson Notes & Scratchpad
                    </h4>
                    <p className="text-xs text-slate-500">
                      Notes are saved automatically to your local student profile.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    isLoading={isSavingNote}
                    leftIcon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Notes
                  </Button>
                </div>

                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Type your personal insights, code snippets, or reminders here..."
                  rows={8}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-mono"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{noteContent.length} characters</span>
                  <span>Markdown formatting supported</span>
                </div>
              </div>
            )}

            {/* TAB: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Lesson Files & Downloadables
                </h4>

                {activeLesson.resources && activeLesson.resources.length > 0 ? (
                  <div className="space-y-2">
                    {activeLesson.resources.map((res, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">
                              {res.title}
                            </span>
                            {res.size && (
                              <span className="text-[11px] text-slate-400 ml-2">
                                ({res.size})
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            showToast(`Simulated download: "${res.title}"`, 'info')
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No extra resources attached to this lesson.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Course Curriculum Accordion */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Course Curriculum
                </h3>
                <p className="text-xs text-slate-500">
                  {courseProgress.completed} of {courseProgress.total} completed
                </p>
              </div>
              <Badge variant={courseProgress.isCompleted ? 'emerald' : 'indigo'}>
                {courseProgress.percentage}%
              </Badge>
            </div>

            {/* Modules List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {course.modules.map((mod, mIdx) => (
                <div
                  key={mod.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30"
                >
                  <div className="p-3 bg-slate-100/70 dark:bg-slate-800/70 text-xs font-bold text-slate-800 dark:text-slate-200">
                    Module {mIdx + 1}: {mod.title}
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {mod.lessons.map((les) => {
                      const isCurrent = les.id === activeLesson.id;
                      const isDone = isLessonCompleted(les.id);
                      return (
                        <div
                          key={les.id}
                          onClick={() => navigate(`/courses/${course.id}/lessons/${les.id}`)}
                          className={`p-3 flex items-center justify-between cursor-pointer text-xs transition-colors ${
                            isCurrent
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-700 dark:text-indigo-300'
                              : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : isCurrent ? (
                              <Play className="w-3.5 h-3.5 text-indigo-600 fill-current shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2 font-mono">
                            {les.durationMinutes}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Completion Congratulations Modal */}
      <Modal
        isOpen={showCelebrationModal}
        onClose={() => setShowCelebrationModal(false)}
        title="Congratulations! 🎉"
      >
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 border border-amber-200 dark:border-amber-800 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              You completed {course.title}!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              You finished all lessons and requirements. Your official completion certificate has
              been minted and stored in your profile!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                setShowCelebrationModal(false);
                navigate('/certificates');
              }}
              leftIcon={<Award className="w-4 h-4" />}
            >
              View My Certificate
            </Button>
            {course.quizId && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCelebrationModal(false);
                  navigate(`/courses/${course.id}/quiz`);
                }}
                leftIcon={<FileQuestion className="w-4 h-4" />}
              >
                Take Course Quiz
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
