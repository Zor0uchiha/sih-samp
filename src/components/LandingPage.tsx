import React from 'react';
import { MapPin, Users, Shield, TrendingUp, Camera, Zap, Award, Globe } from 'lucide-react';
import { UserRole } from '../App';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                नागरसेवा
                <span className="block text-lg lg:text-xl font-normal mt-2 opacity-90">
                  Smart Civic Issue Reporting Platform
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Empowering citizens and municipalities with AI-powered issue detection, 
                community verification, and predictive governance for a better Jharkhand.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => onRoleSelect('citizen')}
                className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>I'm a Citizen</span>
              </button>
              <button
                onClick={() => onRoleSelect('admin')}
                className="group px-8 py-4 bg-blue-800/80 backdrop-blur-md text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-blue-700/80 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Municipal Officer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-sm">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">72h</div>
                <div className="text-sm">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Revolutionary Civic Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of civic engagement with cutting-edge features designed for modern governance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Camera,
                title: 'AI-Powered Detection',
                description: 'Automatic issue categorization using computer vision and machine learning'
              },
              {
                icon: Users,
                title: 'Community Verification',
                description: 'Citizen-driven validation system with reputation scoring and voting'
              },
              {
                icon: TrendingUp,
                title: 'Predictive Analytics',
                description: 'Proactive maintenance alerts based on historical data and weather patterns'
              },
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Voice-to-text in Hindi, English, and regional languages of Jharkhand'
              },
              {
                icon: Award,
                title: 'Gamification',
                description: 'Achievement badges and leaderboards to encourage civic participation'
              },
              {
                icon: Zap,
                title: 'Real-Time Updates',
                description: 'Live notifications and progress tracking from report to resolution'
              },
              {
                icon: MapPin,
                title: 'Smart Mapping',
                description: 'Interactive heat maps with priority zones and trend visualization'
              },
              {
                icon: Shield,
                title: 'Transparency Ledger',
                description: 'Immutable audit trail for complete accountability and trust'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your City?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of citizens and municipal officers making their communities better
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onRoleSelect('citizen')}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Reporting Issues
            </button>
            <button
              onClick={() => onRoleSelect('admin')}
              className="px-8 py-4 bg-green-800/80 backdrop-blur-md text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-green-700/80 transform hover:-translate-y-1 transition-all duration-300"
            >
              Municipal Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}