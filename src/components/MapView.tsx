import React, { useState } from 'react';
import { MapPin, Filter, Search, Layers, Zap } from 'lucide-react';
import { useIssues } from '../context/IssueContext';

export function MapView() {
  const { issues } = useIssues();
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Pothole', 'Street Light', 'Garbage', 'Water Supply', 'Drainage'];
  
  const filteredIssues = issues.filter(issue => 
    selectedCategory === 'all' || issue.category === selectedCategory
  );

  const statusColors = {
    reported: '#3B82F6',
    acknowledged: '#F59E0B',
    'in-progress': '#8B5CF6',
    resolved: '#10B981'
  };

  return (
    <div className="h-screen flex">
      {/* Map Controls */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Issue Map</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Filter
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Heat Map</span>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`p-2 rounded-lg transition-colors ${
                  showHeatmap 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Issue List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Issues on Map ({filteredIssues.length})
            </h3>
            <div className="space-y-3">
              {filteredIssues.slice(0, 10).map(issue => (
                <div
                  key={issue.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {issue.title}
                    </h4>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: statusColors[issue.status] }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {issue.category} • {issue.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {issue.reportedAt.toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-yellow-600">
                      AI: {issue.aiScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
          {/* Mock Map Interface */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Interactive Map View
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                In a production environment, this would show an interactive map with issue markers, 
                heat zones, and real-time updates powered by Google Maps or Mapbox API.
              </p>
              
              {/* Map Legend */}
              <div className="inline-block bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legend</h4>
                <div className="space-y-2">
                  {Object.entries(statusColors).map(([status, color]) => (
                    <div key={status} className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Issue Markers */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-bounce flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <button className="block w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-1">
            +
          </button>
          <button className="block w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            −
          </button>
        </div>
      </div>
    </div>
  );
}