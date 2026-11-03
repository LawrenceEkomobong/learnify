import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Trophy,
  Award,
  Target,
  BarChart3,
  Users,
  ShieldCheck,
  Star,
  Clock,
  Play
} from 'lucide-react';
import { COURSES } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  const featuredCourses = COURSES.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Learnify
              </span>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold leading-none mt-0.5">
                Learn smarter. Build your future.
              </p>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Courses
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Reviews
            </a>
          </nav>

          {/* Auth CTA buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 transition-colors"
                >
                  Log in
                </Link>
                <Button onClick={() => navigate('/signup')} size="md">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Call to action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation EdTech Learning Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Turn curiosity into <br />
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                  real-world skills.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learnify helps students learn practical, in-demand industry skills through
                structured courses, interactive video lessons, automated quizzes, hands-on
                assignments, and verifiable certificates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-md shadow-indigo-600/25"
                >
                  Start Learning Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/explore')}
                  leftIcon={<BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  className="w-full sm:w-auto"
                >
                  Explore 12+ Courses
                </Button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Self-paced interactive learning
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Verifiable digital certificates
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  No backend or credit card required
                </span>
              </div>
            </div>

            {/* Right Column: High-end EdTech Abstract Visual Preview */}
            <div className="lg:col-span-5 relative">
              {/* Background ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5">
                {/* Active Learning Card preview */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Complete Web Development
                      </h4>
                      <p className="text-xs text-slate-500">Lesson 14: React Fiber & Hooks</p>
                    </div>
                  </div>
                  <Badge variant="indigo">In Progress</Badge>
                </div>

                {/* Progress Visual */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-300">Course Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400">68%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[68%] h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full" />
                  </div>
                  <p className="text-[11px] text-slate-400">14 of 21 lessons completed</p>
                </div>

                {/* Interactive Achievement preview pill */}
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      Achievement Unlocked!
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-300 truncate">
                      Quiz Master: Scored 100% on UI/UX Assessment
                    </div>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                    <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                      7 Days
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Study Streak</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                    <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                      12.5 hrs
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Time Learned</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      2 Certs
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                50K+
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Active Students</div>
              <p className="text-xs text-slate-400 mt-0.5">Accelerating their careers</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                500+
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Curated Courses</div>
              <p className="text-xs text-slate-400 mt-0.5">Across modern disciplines</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                120+
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expert Instructors</div>
              <p className="text-xs text-slate-400 mt-0.5">Industry practitioners</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                95%
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Student Satisfaction</div>
              <p className="text-xs text-slate-400 mt-0.5">Consistently rated 5-stars</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="indigo" className="mb-2">
                Curated Pathways
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Popular Courses
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
                Explore our highest-rated learning experiences designed to help you land modern roles.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/explore')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All 12 Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="indigo">{course.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{course.difficulty}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {course.instructor.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learnify Features */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="indigo">Platform Highlights</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Learn With Learnify?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              We engineered a modern student environment centered around retention, accountability, and measurable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Structured Learning</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step modular curriculum mapped to real-world software, design, and business practices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Progress Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dynamic calculations updating completed lessons, learning minutes, and streak counters in real time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Interactive Quizzes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Assess conceptual comprehension with instant automated scoring, explanations, and review tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Certified Credentials</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Earn verifiable completion certificates with unique serial numbers, printable directly to high-res PDF.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Personalized Goals</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Set custom daily learning targets (15–120 mins) and tailored recommendations matching your career track.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Achievement System</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Unlock dynamic milestones for continuous study streaks, high exam scores, and project submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="indigo">Simple Process</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              How Learnify Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Your personalized journey from zero to certified master in 5 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Create Account</h4>
              <p className="text-xs text-slate-500">Sign up instantly with your name & email.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Choose Goals</h4>
              <p className="text-xs text-slate-500">Select your skill level and study interests.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Start Courses</h4>
              <p className="text-xs text-slate-500">Enroll in interactive courses and lessons.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Track Progress</h4>
              <p className="text-xs text-slate-500">Take quizzes, submit work, and take notes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                5
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Earn Certificates</h4>
              <p className="text-xs text-slate-500">Download verified PDF proof of mastery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="indigo">Student Stories</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Loved by 50,000+ Students
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Read how Learnify empowered ambitious learners to transition into tech and design roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "The React and UI/UX design modules on Learnify gave me the exact portfolio
                pieces I needed. The progress streak feature genuinely kept me studying every single evening."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Emily Watson"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Emily Watson</h4>
                  <p className="text-[11px] text-slate-500">Frontend Developer at Figma</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "I was intimidated by Python until I took this course. The quizzes test what
                actually trips you up in code reviews, and downloading my certificate felt hugely rewarding."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Devon Brooks"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Devon Brooks</h4>
                  <p className="text-[11px] text-slate-500">Data Analyst at Shopify</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Having my lesson notes stored alongside the curriculum without losing them
                made study sessions effortless. Learnify is by far the cleanest EdTech UI I have used."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Kavita Patel"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Kavita Patel</h4>
                  <p className="text-[11px] text-slate-500">Product Manager at Canva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-700 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Start your learning journey today.
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
                Join thousands of students building real-world skills with our interactive
                courses, automated assessments, and verified credentials.
              </p>
              <div className="pt-2">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  rightIcon={<ArrowRight className="w-4 h-4 text-indigo-700" />}
                >
                  Create Your Free Student Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Learnify
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Modern student learning platform. Turn curiosity into career-defining skills with structured pathways and certificates.
              </p>
              <p className="text-[11px] text-slate-400">
                © {new Date().getFullYear()} Learnify Inc. Frontend Educational Simulation.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Courses
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><Link to="/explore" className="hover:underline">Web Development</Link></li>
                <li><Link to="/explore" className="hover:underline">UI/UX Design</Link></li>
                <li><Link to="/explore" className="hover:underline">Python Mastery</Link></li>
                <li><Link to="/explore" className="hover:underline">Data Analytics</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Platform
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><Link to="/dashboard" className="hover:underline">Student Dashboard</Link></li>
                <li><Link to="/achievements" className="hover:underline">Achievements</Link></li>
                <li><Link to="/certificates" className="hover:underline">Certificates</Link></li>
                <li><Link to="/calendar" className="hover:underline">Study Calendar</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Company
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#how-it-works" className="hover:underline">How it works</a></li>
                <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
                <li><Link to="/settings" className="hover:underline">Privacy & Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
