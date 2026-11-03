import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  Edit2,
  Save,
  CheckCircle2,
  Trophy,
  Award,
  BookOpen,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';
import { SkillLevel } from '../../types';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ProfilePage: React.FC = () => {
  const { student, updateProfile } = useStudent();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student?.name || '');
  const [bio, setBio] = useState(student?.bio || '');
  const [profileImage, setProfileImage] = useState(student?.profileImage || '');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(student?.skillLevel || 'Beginner');
  const [learningGoal, setLearningGoal] = useState(student?.learningGoal || 'Build projects');
  const [dailyGoal, setDailyGoal] = useState(student?.dailyGoal || 30);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      profileImage,
      skillLevel,
      learningGoal,
      dailyGoal
    });
    setIsEditing(false);
    showToast('Student profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal learning identity, preferences, and goals.
          </p>
        </div>

        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" />}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {!isEditing ? (
          /* Read-only View */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar
                src={student?.profileImage}
                name={student?.name}
                size="xl"
                className="w-24 h-24 text-2xl shadow-md"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {student?.name}
                  </h2>
                  <Badge variant="indigo">{student?.skillLevel}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono">{student?.email}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed pt-1">
                  {student?.bio ||
                    'Aspiring developer and lifelong learner building skills on Learnify.'}
                </p>
              </div>
            </div>

            {/* Metrics Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                <span className="text-xs text-slate-400 block mb-1">Enrolled</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  {student?.enrolledCourses.length || 0}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                <span className="text-xs text-slate-400 block mb-1">Certificates</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {student?.certificates.length || 0}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                <span className="text-xs text-slate-400 block mb-1">Trophies</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {student?.achievements.length || 0}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                <span className="text-xs text-slate-400 block mb-1">Study Streak</span>
                <span className="text-xl font-black text-orange-600 dark:text-orange-400">
                  {student?.learningStreak || 1}d 🔥
                </span>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Learning Pathways & Targets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-400 block mb-1">Primary Objective</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {student?.learningGoal}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-400 block mb-1">Daily Study Target</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {student?.dailyGoal} minutes per day
                  </span>
                </div>
              </div>

              {student?.interests && (
                <div className="pt-2">
                  <span className="text-slate-400 block mb-2">Topics of Interest:</span>
                  <div className="flex flex-wrap gap-2">
                    {student.interests.map((topic) => (
                      <Badge key={topic} variant="neutral">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit Profile Form */
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Edit Student Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Bio & Career Summary
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Skill Level
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Objective
                </label>
                <input
                  type="text"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Daily Target (mins)
                </label>
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseInt(e.target.value) || 30)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                Save Profile
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
