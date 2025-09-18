import React from 'react';
import { MapPin, Clock, ThumbsUp, ThumbsDown, User, Star, AlertCircle } from 'lucide-react';
import { Issue } from '../context/IssueContext';

interface IssueCardProps {
  issue: Issue;
  isAdmin?: boolean;
  showVoting?: boolean;
  onStatusUpdate?: (id: string, status: Issue['status']) => void;
}

export function IssueCard({ issue, isAdmin, showVoting, onStatusUpdate }: IssueCardProps) {
  const statusColors = {
    reported: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    acknowledged: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
              {issue.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              #{issue.id}
            </span>
            <div className="flex items-center space-x-1">
              <AlertCircle className={`w-3 h-3 ${priorityColors[issue.priority]}`} />
              <span className={`text-xs font-medium ${priorityColors[issue.priority]}`}>
                {issue.priority.toUpperCase()}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {issue.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {issue.description}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{issue.address}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{issue.reportedAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{issue.reportedBy}</span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex items-center space-x-2">
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                AI Score: {issue.aiScore}%
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Category: {issue.category}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showVoting && (
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{issue.votes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-red-600 transition-colors">
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isAdmin && onStatusUpdate && (
          <div className="flex items-center space-x-2">
            <select
              value={issue.status}
              onChange={(e) => onStatusUpdate(issue.id, e.target.value as Issue['status'])}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="reported">Reported</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}