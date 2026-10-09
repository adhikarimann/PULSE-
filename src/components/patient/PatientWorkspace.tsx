'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { CareDashboard } from './CareDashboard';
import { CarePlanView } from './CarePlanView';
import { RoutineCheckIn } from './RoutineCheckIn';
import { MessagesThread } from './MessagesThread';
import { DevicesReadings } from './DevicesReadings';
import { ProgressHistory } from './ProgressHistory';
import { AppointmentModal } from './AppointmentModal';
import { PrivacySharing } from './PrivacySharing';
import { 
  Heart, 
  ListChecks, 
  Sparkles, 
  MessageSquare, 
  Smartphone, 
  Activity, 
  Calendar, 
  ShieldCheck,
  SmartphoneNfc
} from 'lucide-react';

export const PatientWorkspace: React.FC = () => {
  const { messages } = useCare();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Number of shared messages (excluding private notes)
  const sharedMsgCount = messages.filter(m => !m.isCareTeamOnly).length;

  const navItems = [
    { id: 'dashboard', label: 'My Care Dashboard', icon: <Heart className="w-4 h-4" /> },
    { id: 'careplan', label: 'Care Plan', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'checkin', label: 'Insights & Check-In', icon: <Sparkles className="w-4 h-4" /> },
    { 
      id: 'messages', 
      label: 'Messages & Updates', 
      icon: <MessageSquare className="w-4 h-4" />,
      badge: sharedMsgCount 
    },
    { id: 'devices', label: 'Devices & Readings', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'history', label: 'Progress History', icon: <Activity className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Sharing', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Workspace Top Bar with Viewport Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-pulse-950 tracking-tight">
              Patient Workspace
            </h1>
            <span className="text-xs bg-pulse-100 text-pulse-900 font-bold px-2.5 py-0.5 rounded-full border border-pulse-200">
              Saira &bull; Indore
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Dr. Mehta&apos;s prescribed plan &bull; Continuous routine scaffolding between visits
          </p>
        </div>

        {/* Viewport Simulation Pill (for desktop demo testing) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isMobileFrame
                ? 'bg-pulse-900 text-white border-pulse-950 shadow-sm'
                : 'bg-white text-gray-700 hover:bg-warm-100 border-warm-200'
            }`}
            title="Toggle simulated smartphone viewport preview"
          >
            <SmartphoneNfc className="w-3.5 h-3.5" />
            <span>{isMobileFrame ? 'Exit Phone View' : 'Simulate Phone Frame (390px)'}</span>
          </button>
        </div>
      </div>

      {/* Outer Container with optional mobile frame */}
      <div className={`${isMobileFrame ? 'max-w-[420px] mx-auto border-8 border-gray-900 rounded-[40px] p-4 bg-warm-50 shadow-2xl min-h-[820px]' : ''}`}>
        {/* Subnavigation Bar */}
        <div className="mb-6 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max bg-warm-100/90 p-1.5 rounded-2xl border border-warm-200">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-pulse-900 shadow-sm border border-warm-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className={isActive ? 'text-pulse-700' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-pulse-100 text-pulse-800' : 'bg-warm-200 text-gray-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-150 pb-20 sm:pb-0">
          {activeTab === 'dashboard' && <CareDashboard onNavigateTab={setActiveTab} />}
          {activeTab === 'careplan' && <CarePlanView />}
          {activeTab === 'checkin' && <RoutineCheckIn />}
          {activeTab === 'messages' && <MessagesThread />}
          {activeTab === 'devices' && <DevicesReadings />}
          {activeTab === 'history' && <ProgressHistory />}
          {activeTab === 'appointments' && <AppointmentModal />}
          {activeTab === 'privacy' && <PrivacySharing />}
        </div>

        {/* Mobile App Bottom Navigation Bar (Visible on phones & simulated frame) */}
        <div className={`${isMobileFrame ? 'block' : 'sm:hidden'} fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-warm-200 px-3 py-2 shadow-elevated flex items-center justify-around`}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              activeTab === 'dashboard' ? 'text-pulse-800 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-pulse-700' : ''}`} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('careplan')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              activeTab === 'careplan' ? 'text-pulse-800 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ListChecks className={`w-5 h-5 ${activeTab === 'careplan' ? 'text-pulse-700' : ''}`} />
            <span>Care Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              activeTab === 'checkin' ? 'text-pulse-800 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${activeTab === 'checkin' ? 'text-pulse-700' : ''}`} />
            <span>Check-In</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold relative transition ${
              activeTab === 'messages' ? 'text-pulse-800 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'text-pulse-700' : ''}`} />
            <span>Messages</span>
            {sharedMsgCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-pulse-600 ring-2 ring-white"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              activeTab === 'devices' || activeTab === 'history' || activeTab === 'appointments' || activeTab === 'privacy'
                ? 'text-pulse-800 font-bold' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Smartphone className={`w-5 h-5 ${activeTab === 'devices' ? 'text-pulse-700' : ''}`} />
            <span>Devices</span>
          </button>
        </div>
      </div>
    </div>
  );
};
