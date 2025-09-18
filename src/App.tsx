import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CitizenPortal } from './components/CitizenPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { LandingPage } from './components/LandingPage';
import { MapView } from './components/MapView';
import { CommunityHub } from './components/CommunityHub';
import { Analytics } from './components/Analytics';
import { IssueProvider } from './context/IssueContext';
import './styles/globals.css';

export type UserRole = 'citizen' | 'admin' | null;
export type ActiveView = 'landing' | 'citizen' | 'admin' | 'map' | 'community' | 'analytics';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'landing':
        return <LandingPage onRoleSelect={(role) => {
          setUserRole(role);
          setActiveView(role === 'citizen' ? 'citizen' : 'admin');
        }} />;
      case 'citizen':
        return <CitizenPortal />;
      case 'admin':
        return <AdminDashboard />;
      case 'map':
        return <MapView />;
      case 'community':
        return <CommunityHub />;
      case 'analytics':
        return <Analytics />;
      default:
        return <LandingPage onRoleSelect={(role) => {
          setUserRole(role);
          setActiveView(role === 'citizen' ? 'citizen' : 'admin');
        }} />;
    }
  };

  return (
    <IssueProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        {!isOnline && (
          <div className="bg-amber-500 text-white text-center py-2 px-4 text-sm">
            ⚠️ You're offline. Some features may be limited.
          </div>
        )}
        
        {activeView !== 'landing' && (
          <Header 
            userRole={userRole}
            activeView={activeView}
            onViewChange={setActiveView}
            onLogout={() => {
              setUserRole(null);
              setActiveView('landing');
            }}
          />
        )}
        
        <main className={activeView !== 'landing' ? 'pt-16' : ''}>
          {renderActiveView()}
        </main>
      </div>
    </IssueProvider>
  );
}

export default App;