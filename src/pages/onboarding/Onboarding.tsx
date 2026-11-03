import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Code2,
  Palette,
  Database,
  Terminal,
  Briefcase,
  TrendingUp,
  Camera,
  Shield,
  Smartphone,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';
import { SkillLevel } from '../../types';
import { Button } from '../../components/common/Button';
import { triggerCelebrationConfetti } from '../../utils/confetti';

const ALL_INTERESTS = [
  { id: 'Web Development', icon: Code2, desc: 'HTML, CSS, Modern JavaScript, React' },
  { id: 'UI/UX Design', icon: Palette, desc: 'Figma, Design Systems, UX Research' },
  { id: 'Data Science', icon: Database, desc: 'SQL, Python, Business Analytics, PowerBI' },
  { id: 'Programming', icon: Terminal, desc: 'Python, Algorithms, Software Engineering' },
  { id: 'Business', icon: Briefcase, desc: 'Startups, Product Management, Finance' },
  { id: 'Marketing', icon: TrendingUp, desc: 'SEO, Growth Hacking, Digital Ads' },
  { id: 'Photography', icon: Camera, desc: 'Manual Exposure, Lighting, Lightroom' },
  { id: 'Cybersecurity', icon: Shield, desc: 'Network Security, OWASP, Defense' },
  { id: 'Mobile Development', icon: Smartphone, desc: 'React Native, iOS, Android' },
  { id: 'Personal Development', icon: Compass, desc: 'Study Habits, Productivity, Focus' }
];

const SKILL_LEVELS: { level: SkillLevel; title: string; subtitle: string }[] = [
  {
    level: 'Beginner',
    title: 'Beginner',
    subtitle: 'New to technology or starting a fresh discipline from scratch.'
  },
  {
    level: 'Intermediate',
    title: 'Intermediate',
    subtitle: 'Comfortable with foundational concepts and ready to build real projects.'
  },
  {
    level: 'Advanced',
    title: 'Advanced',
    subtitle: 'Seasoned practitioner aiming to master architecture and performance.'
  }
];

const LEARNING_GOALS = [
  { id: 'Learn a new skill', title: 'Learn a new skill', desc: 'Expand my horizons and explore fresh creative disciplines.' },
  { id: 'Prepare for a career', title: 'Prepare for a career', desc: 'Transition into a high-paying tech or design job.' },
  { id: 'Build projects', title: 'Build projects', desc: 'Create impressive portfolio projects to demonstrate mastery.' },
  { id: 'Pass an exam', title: 'Pass an exam or certification', desc: 'Prepare for professional industry assessments.' },
  { id: 'Improve professional skills', title: 'Improve professional skills', desc: 'Excel in my current company role and get promoted.' }
];

const DAILY_GOALS = [
  { minutes: 15, label: '15 minutes', note: 'Casual • Light daily micro-learning' },
  { minutes: 30, label: '30 minutes', note: 'Recommended • Steady, sustainable progress' },
  { minutes: 60, label: '1 hour', note: 'Intense • Serious career acceleration' },
  { minutes: 120, label: '2 hours', note: 'Hardcore • Immersive full-time sprint' }
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { currentStudent } = useAuth();
  const { completeOnboarding } = useStudent();

  const [step, setStep] = useState<number>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentStudent?.interests?.length ? currentStudent.interests : ['Web Development', 'UI/UX Design']
  );
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel>(
    currentStudent?.skillLevel || 'Beginner'
  );
  const [selectedGoal, setSelectedGoal] = useState<string>(
    currentStudent?.learningGoal || 'Build projects'
  );
  const [selectedDailyGoal, setSelectedDailyGoal] = useState<number>(
    currentStudent?.dailyGoal || 30
  );

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleNext = () => {
    if (step < 6) {
      if (step === 5) {
        // Trigger confetti on entering step 6 finish screen
        triggerCelebrationConfetti();
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      interests: selectedInterests,
      skillLevel: selectedSkillLevel,
      learningGoal: selectedGoal,
      dailyGoal: selectedDailyGoal
    });
    navigate('/dashboard');
  };

  const studentFirstName = currentStudent?.name?.split(' ')[0] || 'Student';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg text-slate-900 dark:text-white">
            Learnify
          </span>
        </div>

        {/* Step Indicator */}
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Step {step} of 6
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto w-full my-4">
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Container */}
      <div className="max-w-2xl mx-auto w-full flex-1 flex items-center justify-center py-6">
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-3xl shadow-sm">
                👋
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Welcome to Learnify, {studentFirstName}!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  We are thrilled to welcome you to the community. Let's personalize your learning
                  pathway in a few quick steps so we can curate the right courses, goals, and milestones for you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-1">
                    Structured
                  </div>
                  <div className="text-[11px] text-slate-500">Step-by-step modular lessons</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-1">
                    Hands-on
                  </div>
                  <div className="text-[11px] text-slate-500">Quizzes, assignments & notes</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                    Certified
                  </div>
                  <div className="text-[11px] text-slate-500">Official proof of completion</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Let's Get Started
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: LEARNING INTERESTS */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  What do you want to learn?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Select all topics that pique your curiosity. We will tailor your dashboard recommendations accordingly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {ALL_INTERESTS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedInterests.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.id}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {item.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: SKILL LEVEL */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  What is your current skill level?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  This helps us match you with appropriately paced courses and assignments.
                </p>
              </div>

              <div className="space-y-3">
                {SKILL_LEVELS.map((item) => {
                  const isSelected = selectedSkillLevel === item.level;
                  return (
                    <div
                      key={item.level}
                      onClick={() => setSelectedSkillLevel(item.level)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.subtitle}
                        </div>
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

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: LEARNING GOAL */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  What is your primary learning goal?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Having a target keeps your motivation high throughout the learning journey.
                </p>
              </div>

              <div className="space-y-3">
                {LEARNING_GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <div
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {goal.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {goal.desc}
                        </div>
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

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: DAILY LEARNING GOAL */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Set your daily study target
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Consistency is the secret to mastery. Even 15–30 minutes a day compounds rapidly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DAILY_GOALS.map((item) => {
                  const isSelected = selectedDailyGoal === item.minutes;
                  return (
                    <div
                      key={item.minutes}
                      onClick={() => setSelectedDailyGoal(item.minutes)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {item.label}
                        </span>
                        <Clock
                          className={`w-4 h-4 ${
                            isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                          }`}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {item.note}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Review & Finalize
                </Button>
              </div>
            </div>
          )}

          {/* STEP 6: FINISH */}
          {step === 6 && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Your personalized learning experience is ready!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  We've configured your curriculum dashboard with recommendations for{' '}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {selectedInterests.join(', ')}
                  </span>
                  , paced at {selectedDailyGoal} minutes per day.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Skill Track:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedSkillLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Core Goal:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedGoal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Daily Target:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedDailyGoal} mins / day</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-10 shadow-md shadow-indigo-600/25"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center text-xs text-slate-400">
        You can always adjust your learning preferences later in Account Settings.
      </div>
    </div>
  );
};
