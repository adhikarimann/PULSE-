'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { ClinicOverview } from './ClinicOverview';
import { PatientDetailView } from './PatientDetailView';
import { ReviewQueue } from './ReviewQueue';
import { CarePlanBuilder } from './CarePlanBuilder';
import { OutcomeReports } from './OutcomeReports';
import { 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  Stethoscope, 
  BarChart3, 
  Users, 
  ChevronDown 
} from 'lucide-react';

export const ClinicWorkspace: React.FC = () => {
  const { 
    clinicPatients, 
    selectedClinicPatientId, 
    setSelectedClinicPatientId 
  } = useCare();

  const [activeTab, setActiveTab] = useState<string>('overview');

  const selectedPatient = clinicPatients.find(p => p.id === selectedClinicPatientId) || clinicPatients[0];

  const navItems = [
    { id: 'overview', label: 'Clinic Overview', icon: <Building2 className="w-4 h-4" /> },
    { id: 'detail', label: `Patient: ${selectedPatient.name.split(' ')[0]}`, icon: <UserCheck className="w-4 h-4" /> },
    { id: 'queue', label: 'Review Queue', icon: <AlertTriangle className="w-4 h-4" />, badge: 4 },
    { id: 'builder', label: 'Care Plan Builder', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'outcomes', label: 'Outcome Reports', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Clinic Workspace Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-pulse-950 tracking-tight">
              Clinician Workspace
            </h1>
            <span className="text-xs bg-pulse-900 text-white font-bold px-2.5 py-0.5 rounded-full border border-pulse-950">
              Dr. Aniruddh Mehta &bull; Indore
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Mehta Heart &amp; Chronic Care &bull; Asynchronous 90-day continuity panel
          </p>
        </div>

        {/* Patient Quick Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600 hidden sm:inline">Active Patient:</label>
          <div className="relative">
            <select
              value={selectedClinicPatientId}
              onChange={(e) => {
                setSelectedClinicPatientId(e.target.value);
                if (activeTab === 'overview') setActiveTab('detail');
              }}
              className="bg-white border border-warm-300 rounded-xl px-3 py-1.5 text-xs font-bold text-pulse-950 focus:ring-2 focus:ring-pulse-500 pr-8 shadow-sm cursor-pointer"
            >
              {clinicPatients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age}y, {p.primaryDiagnosis.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max bg-warm-100/90 p-1.5 rounded-2xl border border-warm-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-pulse-900 text-white shadow-sm border border-pulse-950'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <span className={isActive ? 'text-pulse-300' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-pulse-800 text-white' : 'bg-coral-100 text-coral-800'
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
      <div className="transition-all duration-150">
        {activeTab === 'overview' && (
          <ClinicOverview
            onSelectPatient={(id) => {
              setSelectedClinicPatientId(id);
              setActiveTab('detail');
            }}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'detail' && (
          <PatientDetailView
            onOpenPlanBuilder={() => setActiveTab('builder')}
          />
        )}
        {activeTab === 'queue' && (
          <ReviewQueue
            onSelectPatient={(id) => {
              setSelectedClinicPatientId(id);
              setActiveTab('detail');
            }}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'builder' && (
          <CarePlanBuilder
            onDone={() => setActiveTab('detail')}
          />
        )}
        {activeTab === 'outcomes' && (
          <OutcomeReports />
        )}
      </div>
    </div>
  );
};
