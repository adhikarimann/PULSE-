'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { 
  Heart, 
  Stethoscope, 
  User, 
  RotateCcw, 
  ShieldAlert, 
  ArrowRightLeft,
  Activity,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, resetToDemoDefaults } = useCare();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-200 shadow-soft">
      {/* Top micro bar for demo disclaimer */}
      <div className="bg-pulse-900 text-pulse-100 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-pulse-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">PULSE CONTINUITY PROTOTYPE</span>
          <span className="hidden sm:inline text-pulse-300">|</span>
          <span className="hidden sm:inline text-pulse-200">
            India-First Chronic Care Prototype &bull; Indore Beachhead
          </span>
          <span className="bg-pulse-800 text-pulse-200 px-2 py-0.5 rounded text-[10px] font-mono border border-pulse-700">
            Illustrative Demo Data
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-pulse-200 hidden md:inline">
            Browser-Stored Shared Journey (No External Server)
          </span>
          <button
            onClick={() => {
              if (window.confirm('Reset demo state to baseline initial values? All actions, readings, and messages will reset.')) {
                resetToDemoDefaults();
              }
            }}
            className="flex items-center gap-1 text-[11px] text-pulse-200 hover:text-white bg-pulse-800/80 hover:bg-pulse-700 px-2.5 py-0.5 rounded transition"
            title="Reset to clean baseline data"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main navigation & role switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pulse-700 to-pulse-900 flex items-center justify-center text-white shadow-card">
            <Activity className="w-6 h-6 text-pulse-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-pulse-950 font-sans">
                pulse
              </span>
              <span className="text-xs bg-pulse-100 text-pulse-800 font-semibold px-2 py-0.5 rounded-full border border-pulse-200">
                Care Continuity
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
              Closing the 89-day gap between appointments &bull; Indore Pilot
            </p>
          </div>
        </div>

        {/* Center / Right: Role Switcher & Persona Info */}
        <div className="flex items-center gap-2">
          {/* Desktop Dual Buttons */}
          <div className="hidden sm:flex items-center bg-warm-100 p-1 rounded-xl border border-warm-200">
            <button
              onClick={() => setRole('patient')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                role === 'patient'
                  ? 'bg-white text-pulse-900 shadow-sm border border-pulse-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className={`w-4 h-4 ${role === 'patient' ? 'text-pulse-700' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="leading-tight">Patient Workspace</div>
                <div className="text-[10px] text-gray-400 font-normal">Saira (42, Indore)</div>
              </div>
            </button>

            <button
              onClick={() => setRole('doctor')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                role === 'doctor'
                  ? 'bg-pulse-900 text-white shadow-sm border border-pulse-950'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Stethoscope className={`w-4 h-4 ${role === 'doctor' ? 'text-pulse-300' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="leading-tight">Doctor Workspace</div>
                <div className="text-[10px] opacity-80 font-normal">Dr. Mehta (Clinic)</div>
              </div>
            </button>
          </div>

          {/* Mobile One-Tap Role Toggle Pill */}
          <button
            onClick={() => setRole(role === 'patient' ? 'doctor' : 'patient')}
            className={`sm:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-sm transition ${
              role === 'patient'
                ? 'bg-pulse-50 text-pulse-900 border-pulse-300'
                : 'bg-pulse-900 text-white border-pulse-950'
            }`}
            title="Tap to switch between Patient and Doctor views"
          >
            {role === 'patient' ? (
              <>
                <User className="w-3.5 h-3.5 text-pulse-700" />
                <span className="truncate max-w-[90px]">Saira</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-3.5 h-3.5 text-pulse-300" />
                <span className="truncate max-w-[90px]">Dr. Mehta</span>
              </>
            )}
            <ArrowRightLeft className="w-3 h-3 opacity-60 ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
