'use client';
import { useState } from 'react';
import { LandingNavbar} from '@/components/Navbar';
import UIMockup from '@/components/Landing/UIMockup';
import PlannerModal from '@/components/Landing/PlannerModal';
import { Feature } from '@/types/types';

const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Class Schedule',
    description: 'Keep track of your daily classes effortlessly with an intuitive calendar view.',
    icon: 'calendar_month'
  },
  {
    id: '2',
    title: 'Tests & Countdowns',
    description: 'Never miss an exam. Built-in countdowns keep you aware of upcoming deadlines.',
    icon: 'timer'
  },
  {
    id: '3',
    title: 'Presentations & Viva',
    description: 'Organize presentation slots and viva dates seamlessly with your peers.',
    icon: 'co_present'
  },
  {
    id: '4',
    title: 'Extra Class Alerts',
    description: 'Get instant push notifications for rescheduled classes and important announcements.',
    icon: 'notifications_active'
  }
];

const App: React.FC = () => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden font-display">
      <LandingNavbar />

      <main className="relative pt-16 flex-grow">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 z-[-1] pointer-events-none h-[600px] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="absolute w-96 h-96 -top-20 -left-20 blur-3xl rounded-full bg-primary/10 z-[-1]"></div>
        <div className="absolute w-64 h-64 top-40 right-10 blur-2xl rounded-full bg-primary/5 z-[-1]"></div>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 sm:pt-32 sm:pb-24 lg:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Version 2.0 Live
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-main tracking-tight leading-[1.1] mb-6">
              Manage your academic <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">journey with ease.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              ClassFlow is the smart academic activity management system designed to keep students and teachers perfectly synced.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsPlannerOpen(true)}
                className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold rounded-full shadow-soft-blue transition-all duration-200 transform hover:-translate-y-1"
              >
                Try AI Planner
              </button>
              <button className="w-full sm:w-auto h-12 px-8 bg-white border border-neutral-border hover:border-primary/50 text-text-main text-base font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                How it works
              </button>
            </div>
          </div>
          <UIMockup />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-main tracking-tight mb-4">
                  Key Features
                </h2>
                <p className="text-text-muted text-lg">
                  Everything you need to manage your academic life efficiently, all in one place.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div key={feature.id} className="group relative flex flex-col p-6 bg-white border border-neutral-border rounded-xl hover:shadow-hover-card transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Breaker */}
        <section className="py-24 bg-gray-50 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 transform origin-top-right"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                  Ready to streamline your <br/> academic workflow?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="text-text-main">Real-time schedule updates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="text-text-main">Integrated resource sharing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="text-text-main">Mobile-friendly interface</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setIsPlannerOpen(true)}
                  className="inline-flex items-center justify-center h-12 px-8 bg-text-main text-white hover:bg-black text-base font-bold rounded-full transition-colors"
                >
                  Get Started Now
                </button>
              </div>
              <div className="flex-1 w-full max-w-md lg:max-w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-8">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform translate-y-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>task_alt</span>
                      </div>
                      <div className="h-2 w-16 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 w-full bg-gray-100 rounded"></div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>event</span>
                      </div>
                      <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
                      </div>
                      <div className="h-2 w-12 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 w-full bg-gray-100 rounded"></div>
                      <div className="h-2 w-1/2 bg-gray-100 rounded mt-1"></div>
                    </div>
                    <div className="bg-primary p-4 rounded-2xl shadow-lg transform -translate-y-4 text-white">
                      <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bolt</span>
                      </div>
                      <div className="h-2 w-16 bg-white/40 rounded mb-2"></div>
                      <div className="h-2 w-full bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-text-muted opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>school</span>
            <span className="font-bold text-lg">ClassFlow</span>
          </div>
          <p className="text-text-muted text-sm font-medium">
            Developed by Tarikul Islam | © 2024
          </p>
          <div className="flex gap-6 mt-2">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* AI Planner Modal */}
      <PlannerModal 
        isOpen={isPlannerOpen} 
        onClose={() => setIsPlannerOpen(false)} 
      />
    </div>
  );
};

export default App;
