import React from 'react';
import { Timer, Sparkles } from 'lucide-react';
import AppCard from '../components/AppCard';
import PomodoroApp from '../apps/PomodoroApp';

const Dashboard = () => {
  const apps = [
    {
      title: 'Pomodoro Timer',
      description: 'Stay focused with timed work sessions',
      icon: <Timer className="w-6 h-6" />,
      route: '/pomodoro',
      preview: PomodoroApp,
      color: 'gray'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* <Timer className="w-10 h-10 text-gray-400" /> */}
            <h1 className="text-5xl font-bold text-gray-100">App Catalogue</h1>
          </div>
          {/* <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A minimalist Pomodoro timer to help you stay focused and productive. 
            Click to preview, then open in full screen for your work sessions.
          </p> */}
        </div>
      </div>

      {/* App Preview */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex justify-center">
          {apps.map((app, index) => (
            <AppCard
              key={index}
              title={app.title}
              description={app.description}
              icon={app.icon}
              route={app.route}
              preview={app.preview}
              color={app.color}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Built with React, Tailwind CSS, and focus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
