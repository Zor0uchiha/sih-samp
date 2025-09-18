import React from 'react';
import { TrendingUp, Clock, MapPin, Users, BarChart3, PieChart } from 'lucide-react';
import { useIssues } from '../context/IssueContext';

export function Analytics() {
  const { issues } = useIssues();

  // Calculate analytics data
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;
  const avgResolutionTime = '2.5 days';
  const resolutionRate = ((resolvedIssues / totalIssues) * 100).toFixed(1);

  const categoryData = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = issues.reduce((acc, issue) => {
    acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyTrends = [
    { month: 'Jan', reported: 45, resolved: 38 },
    { month: 'Feb', reported: 52, resolved: 45 },
    { month: 'Mar', reported: 61, resolved: 52 },
    { month: 'Apr', reported: 48, resolved: 58 },
    { month: 'May', reported: 67, resolved: 61 },
    { month: 'Jun', reported: 72, resolved: 65 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive insights into civic issue reporting and resolution trends.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{totalIssues}</span>
          </div>
          <h3 className="font-semibold">Total Issues</h3>
          <p className="text-sm opacity-75 mt-1">+12% from last month</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{resolutionRate}%</span>
          </div>
          <h3 className="font-semibold">Resolution Rate</h3>
          <p className="text-sm opacity-75 mt-1">+5% from last month</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{avgResolutionTime}</span>
          </div>
          <h3 className="font-semibold">Avg Resolution Time</h3>
          <p className="text-sm opacity-75 mt-1">-8% from last month</p>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">1,247</span>
          </div>
          <h3 className="font-semibold">Active Citizens</h3>
          <p className="text-sm opacity-75 mt-1">+18% from last month</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trends Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Monthly Trends
          </h3>
          
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                  {month.month}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                      <div 
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${(month.reported / 80) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        {month.reported}
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                      <div 
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${(month.resolved / 80) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        {month.resolved}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">Reported</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">Resolved</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Issues by Category
          </h3>
          
          <div className="space-y-3">
            {Object.entries(categoryData)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 6)
              .map(([category, count], index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
                const percentage = ((count / totalIssues) * 100).toFixed(1);
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Geographic Distribution
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {['Central Ranchi', 'Doranda', 'Harmu'].map((area, index) => {
            const issueCount = Math.floor(Math.random() * 50) + 20;
            const resolvedCount = Math.floor(issueCount * 0.7);
            const resolutionRate = ((resolvedCount / issueCount) * 100).toFixed(1);
            
            return (
              <div key={area} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{area}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Issues</span>
                    <span className="font-medium text-gray-900 dark:text-white">{issueCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Resolved</span>
                    <span className="font-medium text-green-600">{resolvedCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Resolution Rate</span>
                    <span className="font-medium text-blue-600">{resolutionRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Time Analysis */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Response Time Analysis
        </h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { timeframe: '< 1 hour', percentage: 15, color: 'bg-green-500' },
            { timeframe: '1-24 hours', percentage: 45, color: 'bg-blue-500' },
            { timeframe: '1-3 days', percentage: 30, color: 'bg-yellow-500' },
            { timeframe: '> 3 days', percentage: 10, color: 'bg-red-500' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                {item.percentage}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.timeframe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}