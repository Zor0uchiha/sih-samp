import React, { createContext, useContext, useState } from 'react';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'reported' | 'acknowledged' | 'in-progress' | 'resolved';
  location: { lat: number; lng: number };
  address: string;
  reportedAt: Date;
  reportedBy: string;
  votes: number;
  aiScore: number;
  images?: string[];
}

interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: Issue['status']) => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export function IssueProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      title: 'Large pothole on MG Road causing traffic issues',
      description: 'There is a significant pothole near the traffic signal that is causing vehicles to swerve dangerously. It has been growing larger due to recent rains.',
      category: 'Pothole',
      priority: 'high',
      status: 'acknowledged',
      location: { lat: 23.3441, lng: 85.3096 },
      address: 'MG Road, near City Center, Ranchi',
      reportedAt: new Date('2024-01-15T10:30:00'),
      reportedBy: 'Rajesh Kumar',
      votes: 23,
      aiScore: 85
    },
    {
      id: '2',
      title: 'Street light not working in residential area',
      description: 'The street light has been non-functional for over a week, making the area unsafe for pedestrians at night.',
      category: 'Street Light',
      priority: 'medium',
      status: 'in-progress',
      location: { lat: 23.3525, lng: 85.3125 },
      address: 'Sector 2, HEC Colony, Ranchi',
      reportedAt: new Date('2024-01-14T18:45:00'),
      reportedBy: 'Priya Singh',
      votes: 18,
      aiScore: 78
    },
    {
      id: '3',
      title: 'Overflowing garbage bin attracting stray animals',
      description: 'The municipal garbage bin has been overflowing for several days, attracting stray dogs and creating unhygienic conditions.',
      category: 'Garbage',
      priority: 'high',
      status: 'reported',
      location: { lat: 23.3367, lng: 85.3199 },
      address: 'Market Road, Lalpur, Ranchi',
      reportedAt: new Date('2024-01-16T09:15:00'),
      reportedBy: 'Amit Sharma',
      votes: 31,
      aiScore: 92
    },
    {
      id: '4',
      title: 'Water logging issue after rain',
      description: 'Heavy water logging occurs in this area during monsoon, affecting daily commute and causing health hazards.',
      category: 'Drainage',
      priority: 'high',
      status: 'resolved',
      location: { lat: 23.3289, lng: 85.3067 },
      address: 'Station Road, Ranchi',
      reportedAt: new Date('2024-01-10T14:20:00'),
      reportedBy: 'Sunita Devi',
      votes: 45,
      aiScore: 88
    },
    {
      id: '5',
      title: 'Broken traffic signal causing confusion',
      description: 'The traffic signal is stuck on red, causing confusion among drivers and pedestrians.',
      category: 'Traffic Signal',
      priority: 'medium',
      status: 'acknowledged',
      location: { lat: 23.3458, lng: 85.3189 },
      address: 'Albert Ekka Chowk, Ranchi',
      reportedAt: new Date('2024-01-13T16:30:00'),
      reportedBy: 'Deepak Singh',
      votes: 27,
      aiScore: 76
    }
  ]);

  const addIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssueStatus = (id: string, status: Issue['status']) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, status } : issue
      )
    );
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue, updateIssueStatus }}>
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}