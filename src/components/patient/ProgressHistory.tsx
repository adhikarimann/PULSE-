'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { BpTrendChart } from '@/components/charts/BpTrendChart';
import { 
  Activity, 
  Target, 
  ShieldCheck, 
  Heart, 
  Droplet, 
  Calendar, 
  Info,
  TrendingDown,
  FileText
} from 'lucide-react';

export const ProgressHistory: React.FC = () => {
  const { vitals, patient } = useCare();
  const [filterType, setFilterType] = useState<'all' | 'bp' | 'glucose'>('all');

  const filteredVitals = vitals.filter(v => {
    if (filterType === 'bp') return v.type === 'blood_pressure';
    if (filterType === 'glucose') return v.type === 'blood_glucose';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Clinical Interpretation Boundary */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Activity className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Health Progress &amp; Clinical Vitals Trajectory
              </h2>
              <p className="text-xs text-gray-500">
                Ambulatory readings recorded across 60 days &bull; Indore Pilot
              </p>
            </div>
          </div>

          <span className="text-xs bg-pulse-50 text-pulse-800 font-mono px-3 py-1 rounded-full border border-pulse-200">
            Target: &lt; {patient.clinicianTarget.systolicTarget}/{patient.clinicianTarget.diastolicTarget} mmHg
          </span>
        </div>

        {/* EXPLICIT CLINICAL INTERPRETATION BOUNDARY BANNER */}
        <div className="mt-3 p-3.5 bg-pulse-50/80 rounded-xl border border-pulse-200 text-xs text-pulse-950 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-pulse-800 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-pulse-900 font-bold">Clinical Interpretation Boundary:</strong> Pulse displays ambulatory readings and routine data to prepare you and your clinician for informed discussions. <em>Only a registered medical practitioner (such as Dr. Mehta) interprets clinical trends, diagnoses conditions, or decides medical treatment plans.</em> All displayed values are illustrative demo data.
          </div>
        </div>
      </div>

      {/* Main Interactive BP Trend Chart */}
      <BpTrendChart vitals={vitals} clinicianTarget={patient.clinicianTarget} isCompact={false} />

      {/* Historical Telemetry Table */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-warm-200">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Comprehensive Readings Ledger
            </h3>
            <p className="text-xs text-gray-500">
              Timestamped records with verification sources and clinician target status
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-warm-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md font-semibold transition ${filterType === 'all' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600'}`}
            >
              All Readings
            </button>
            <button
              onClick={() => setFilterType('bp')}
              className={`px-3 py-1 rounded-md font-semibold transition ${filterType === 'bp' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600'}`}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setFilterType('glucose')}
              className={`px-3 py-1 rounded-md font-semibold transition ${filterType === 'glucose' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600'}`}
            >
              Glucose
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-warm-200 text-gray-400 font-mono text-[11px]">
                <th className="pb-2 font-normal">Date &amp; Time</th>
                <th className="pb-2 font-normal">Vital Type</th>
                <th className="pb-2 font-normal">Value (Unit)</th>
                <th className="pb-2 font-normal">Clinician Target Status</th>
                <th className="pb-2 font-normal">Source &amp; Device</th>
                <th className="pb-2 font-normal">Clinical Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {filteredVitals.map((r) => {
                const isBp = r.type === 'blood_pressure';
                const isWithinTarget = isBp 
                  ? (r.systolic || 140) <= patient.clinicianTarget.systolicUpperLimit
                  : (r.glucose || 120) <= 105;

                return (
                  <tr key={r.id} className="hover:bg-warm-50/50 transition">
                    <td className="py-3 font-mono text-gray-600 whitespace-nowrap">
                      {new Date(r.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="text-[10px] text-gray-400 ml-1.5">
                        {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-gray-800">
                      {isBp ? 'Blood Pressure' : 'Blood Glucose'}
                    </td>
                    <td className="py-3 font-bold font-mono text-sm text-pulse-950">
                      {isBp ? `${r.systolic}/${r.diastolic} mmHg` : `${r.glucose} mg/dL (${r.glucoseContext})`}
                      {r.pulse && <span className="text-[10px] text-gray-400 font-normal ml-1.5">({r.pulse} bpm)</span>}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        isWithinTarget 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {isWithinTarget ? 'Within Target' : 'Elevated'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600 font-medium">
                      {r.sourceLabel}
                    </td>
                    <td className="py-3 text-gray-500 text-[11px] max-w-xs truncate">
                      {r.notes || 'Routine check'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
