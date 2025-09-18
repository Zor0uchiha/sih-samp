import React from 'react';
import { Menu, Bell, User, Map, Users, BarChart3, Home, LogOut } from 'lucide-react';
import { UserRole, ActiveView } from '../App';

interface HeaderProps {
  userRole: UserRole;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onLogout: () => void;
}

export function Header({ userRole, activeView, onViewChange, onLogout }: HeaderProps) {
  const navItems = userRole === 'citizen' 
    ? [
        { id: 'citizen' as ActiveView, icon: Home, label: 'Report' },
        { id: 'map' as ActiveView, icon: Map, label: 'Map' },
        { id: 'community' as ActiveView, icon: Users, label: 'Community' },
      ]
    : [
        { id: 'admin' as ActiveView, icon: Home, label: 'Dashboard' },
        { id: 'map' as ActiveView, icon: Map, label: 'Live Map' },
        { id: 'analytics' as ActiveView, icon: BarChart3, label: 'Analytics' },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NS</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">NagarSeva</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart Civic Platform</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeView === id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">3</span>
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userRole === 'citizen' ? 'Citizen User' : 'Municipal Officer'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole === 'citizen' ? 'Level 5 Reporter' : 'Admin'}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around py-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`flex flex-col items-center py-2 px-4 text-xs transition-colors ${
                activeView === id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}