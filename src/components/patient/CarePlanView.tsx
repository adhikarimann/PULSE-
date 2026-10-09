'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { BehaviorChart } from '@/components/charts/BehaviorChart';
import { ActionCategory } from '@/types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  AlertCircle,
  Filter,
  Info
} from 'lucide-react';

export const CarePlanView: React.FC = () => {
  const { patient, toggleCareAction } = useCare();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const todayStr = '2026-10-09';

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Actions' },
    { key: 'medication', label: 'Medication' },
    { key: 'movement', label: 'Movement' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'monitoring', label: 'Monitoring' },
  ];

  const filteredActions = selectedCategory === 'all'
    ? patient.actions
    : patient.actions.filter(a => a.category === selectedCategory);

  const completedToday = patient.actions.filter(a => a.completedDates.includes(todayStr)).length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Clinician Ownership vs Routine Scaffolding */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Stethoscope className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Doctor-Prescribed Care Plan &bull; 90-Day Execution
              </h2>
              <p className="text-xs text-gray-500">
                Prescribed by {patient.clinicianTarget.setBy} &bull; Mehta Heart &amp; Chronic Care, Indore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-pulse-50 text-pulse-800 font-semibold px-3 py-1 rounded-full border border-pulse-200">
              {completedToday} of {patient.actions.length} Completed Today
            </span>
          </div>
        </div>

        {/* Clear Ownership Boundary */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200/80 grid sm:grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-pulse-800 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-pulse-950">Clinician Medical Goal:</strong> Medical diagnosis, target blood pressure (&lt;128/80 mmHg), medication molecules, and dosage are strictly configured and owned by Dr. Mehta. Pulse never alters medical goals.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-pulse-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-pulse-950">Pulse Routine Support:</strong> Pulse helps adapt schedule timing, reminder cues, and behavioral anchors to fit your everyday work and family routines in Indore.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Behavior Chart (Leading Behavior Signal) */}
      <BehaviorChart />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.key
                  ? 'bg-pulse-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-warm-100 border border-warm-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-500">
          Showing {filteredActions.length} actions &bull; Tap checkmark to log execution
        </div>
      </div>

      {/* Actions List with Clear Ownership Tags */}
      <div className="space-y-4">
        {filteredActions.map((action) => {
          const isDone = action.completedDates.includes(todayStr);

          return (
            <div
              key={action.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-soft ${
                isDone ? 'border-pulse-300 bg-pulse-50/20' : 'border-warm-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => toggleCareAction(action.id, todayStr)}
                    className={`mt-1 flex-shrink-0 transition-transform active:scale-90 ${
                      isDone ? 'text-pulse-700' : 'text-gray-300 hover:text-gray-500'
                    }`}
                    title={isDone ? 'Mark Incomplete' : 'Mark Completed for Today'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-pulse-100" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1">
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-pulse-100 text-pulse-900 px-2.5 py-0.5 rounded-full border border-pulse-200 flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-pulse-700" />
                        Clinician-Prescribed
                      </span>
                      <span className="text-[10px] font-mono bg-warm-100 text-gray-700 px-2 py-0.5 rounded border border-warm-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {action.frequency}
                      </span>
                      {action.adaptationNote && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                          Routine Adapted
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-bold ${isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {action.title}
                    </h3>

                    {/* Doctor Prescribed Instruction */}
                    <div className="mt-2 text-xs text-gray-700 bg-warm-50 p-3 rounded-xl border border-warm-200/70">
                      <div className="font-semibold text-gray-900 text-[11px] mb-0.5 flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-pulse-700" />
                        <span>Doctor&apos;s Clinical Prescription:</span>
                      </div>
                      <p className="leading-relaxed">{action.doctorInstructions}</p>
                    </div>

                    {/* Routine Support Tip from Pulse */}
                    {action.routineSupportTip && (
                      <div className="mt-2.5 text-xs text-pulse-950 bg-pulse-50/70 p-3 rounded-xl border border-pulse-200/80">
                        <div className="font-semibold text-pulse-800 text-[11px] mb-0.5 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-pulse-600" />
                          <span>Pulse Routine Adaptation &amp; Habit Anchor:</span>
                        </div>
                        <p className="leading-relaxed text-gray-700">{action.routineSupportTip}</p>
                        {action.adaptationNote && (
                          <div className="mt-1 text-[10px] font-mono text-pulse-800 bg-white/70 px-2 py-0.5 rounded border border-pulse-200">
                            {action.adaptationNote}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono font-bold text-gray-500">
                    {action.completedDates.length} days logged
                  </div>
                  <span className="text-[10px] text-gray-400">Total in 90d</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
