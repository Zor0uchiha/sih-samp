import React, { useState } from 'react';
import { BarChart3, Clock, CheckCircle, AlertTriangle, Users, MapPin, Filter, Search } from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { IssueCard } from './IssueCard';

export function AdminDashboard() {
  const { issues, updateIssueStatus } = useIssues();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'reported' || i.status === 'acknowledged').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    avgResponseTime: '2.3 hours',
    citizenSatisfaction: '94%'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs opacity-75">Total Reports</div>
            </div>
            <BarChart3 className="w-8 h-8 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <div className="text-xs opacity-75">Pending</div>
            </div>
            <Clock className="w-8 h-8 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <div className="text-xs opacity-75">In Progress</div>
            </div>
            <AlertTriangle className="w-8 h-8 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <div className="text-xs opacity-75">Resolved</div>
            </div>
            <CheckCircle className="w-8 h-8 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{stats.avgResponseTime}</div>
              <div className="text-xs opacity-75">Avg Response</div>
            </div>
            <Clock className="w-6 h-6 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{stats.citizenSatisfaction}</div>
              <div className="text-xs opacity-75">Satisfaction</div>
            </div>
            <Users className="w-6 h-6 opacity-75" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border-0 bg-transparent focus:outline-none dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="reported">Reported</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Issues ({filteredIssues.length})
          </h3>
        </div>
        
        <div className="grid gap-6">
          {filteredIssues.map(issue => (
            <IssueCard 
              key={issue.id} 
              issue={issue} 
              isAdmin 
              onStatusUpdate={(id, status) => updateIssueStatus(id, status)}
            />
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No issues found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}