import React, { useState } from 'react';
import { Users, MessageCircle, Trophy, Star, ThumbsUp, Calendar, Award } from 'lucide-react';
import { useIssues } from '../context/IssueContext';

export function CommunityHub() {
  const { issues } = useIssues();
  const [activeTab, setActiveTab] = useState<'discussions' | 'leaderboard' | 'achievements'>('discussions');

  const discussions = [
    {
      id: 1,
      title: 'Pothole on Main Street - Community Update',
      author: 'Rajesh Kumar',
      replies: 12,
      lastActivity: '2 hours ago',
      category: 'Road Issues',
      isHot: true
    },
    {
      id: 2,
      title: 'Street Light Repair Initiative',
      author: 'Priya Singh',
      replies: 8,
      lastActivity: '4 hours ago',
      category: 'Lighting',
      isHot: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Amit Sharma', points: 3250, reports: 45, level: 8 },
    { rank: 2, name: 'Sunita Devi', points: 2890, reports: 38, level: 7 },
    { rank: 3, name: 'Ravi Kumar', points: 2650, reports: 35, level: 7 },
    { rank: 4, name: 'Meera Gupta', points: 2400, reports: 32, level: 6 },
    { rank: 5, name: 'Deepak Singh', points: 2100, reports: 28, level: 6 }
  ];

  const achievements = [
    { name: 'First Reporter', description: 'Submit your first issue report', icon: '🎯', unlocked: true },
    { name: 'Community Helper', description: 'Help verify 10 issues', icon: '🤝', unlocked: true },
    { name: 'Streak Master', description: 'Report issues for 7 consecutive days', icon: '🔥', unlocked: false },
    { name: 'Photo Detective', description: 'Submit 50 photos with reports', icon: '📸', unlocked: false },
    { name: 'Civic Champion', description: 'Reach level 10', icon: '👑', unlocked: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Hub</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Connect with fellow citizens, share insights, and build a stronger community together.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
          <Users className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm opacity-75">Active Citizens</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <MessageCircle className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">3,892</div>
          <div className="text-sm opacity-75">Discussions</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <Trophy className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm opacity-75">Champions</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <Star className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">12,450</div>
          <div className="text-sm opacity-75">Total Points</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageCircle },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-b-2 border-blue-600'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'discussions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Discussions
                </h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Discussion
                </button>
              </div>

              <div className="space-y-4">
                {discussions.map(discussion => (
                  <div
                    key={discussion.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {discussion.title}
                          </h4>
                          {discussion.isHot && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                              🔥 Hot
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          by {discussion.author} • {discussion.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies} replies</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{discussion.lastActivity}</span>
                        </span>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline">
                        Join Discussion
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Top Contributors This Month
              </h3>

              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`p-4 rounded-lg border ${
                      index < 3 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {user.rank}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Level {user.level} • {user.reports} reports
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          points
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Your Achievements
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.unlocked
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-2xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.unlocked 
                            ? 'text-green-800 dark:text-green-300' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <span className="inline-block mt-2 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                            ✓ Unlocked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}