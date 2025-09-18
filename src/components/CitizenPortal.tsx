import React, { useState } from 'react';
import { Camera, MapPin, Mic, Send, Star, Trophy, Target, Upload } from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { IssueCard } from './IssueCard';

export function CitizenPortal() {
  const { issues, addIssue } = useIssues();
  const [isReporting, setIsReporting] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    image: null as File | null
  });

  const categories = [
    'Pothole', 'Street Light', 'Garbage', 'Water Supply', 
    'Drainage', 'Traffic Signal', 'Road Damage', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.title || !reportForm.category) return;

    const newIssue = {
      id: Date.now().toString(),
      title: reportForm.title,
      description: reportForm.description,
      category: reportForm.category,
      priority: reportForm.priority,
      status: 'reported' as const,
      location: { lat: 23.3441 + Math.random() * 0.1, lng: 85.3096 + Math.random() * 0.1 },
      address: 'Ranchi, Jharkhand',
      reportedAt: new Date(),
      reportedBy: 'Current User',
      votes: 0,
      aiScore: Math.floor(Math.random() * 40) + 60
    };

    addIssue(newIssue);
    setReportForm({ title: '', description: '', category: '', priority: 'medium', image: null });
    setIsReporting(false);
  };

  const userStats = {
    level: 5,
    points: 2450,
    reportsSubmitted: 23,
    issuesResolved: 18,
    badges: ['Pothole Detective', 'Community Hero', 'Verified Reporter']
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Dashboard */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Citizen!</h2>
              <p className="opacity-90">Ready to make a difference in your community?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">Level {userStats.level}</div>
              <div className="text-sm opacity-75">{userStats.points} points</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.reportsSubmitted}</div>
              <div className="text-xs opacity-75">Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.issuesResolved}</div>
              <div className="text-xs opacity-75">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{((userStats.issuesResolved / userStats.reportsSubmitted) * 100).toFixed(0)}%</div>
              <div className="text-xs opacity-75">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Achievements
          </h3>
          <div className="space-y-3">
            {userStats.badges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Report Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsReporting(!isReporting)}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <Camera className="w-6 h-6" />
          <span className="text-xl font-semibold">Report an Issue</span>
        </button>
      </div>

      {/* Report Form */}
      {isReporting && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Report New Issue</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                value={reportForm.title}
                onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={reportForm.priority}
                  onChange={(e) => setReportForm({ ...reportForm, priority: e.target.value as any })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={reportForm.description}
                onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Provide additional details about the issue"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <Camera className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Add Photo</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Add Location</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <Mic className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Voice Note</span>
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Report</span>
              </button>
              <button
                type="button"
                onClick={() => setIsReporting(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Reports */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Reports</h3>
        <div className="grid gap-6">
          {issues.slice(0, 5).map(issue => (
            <IssueCard key={issue.id} issue={issue} showVoting />
          ))}
        </div>
      </div>
    </div>
  );
}