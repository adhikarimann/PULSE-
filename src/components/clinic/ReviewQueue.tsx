'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  User, 
  ArrowRight, 
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';

interface ReviewQueueProps {
  onSelectPatient: (patientId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ReviewQueue: React.FC<ReviewQueueProps> = ({ onSelectPatient, onNavigateTab }) => {
  const { clinicPatients } = useCare();

  const queueItems = [
    {
      patientId: 'patient_saira_01',
      patientName: 'Saira (42, Indore)',
      flagType: 'Routine Barrier Logged',
      severity: 'moderate',
      reason: 'Reported work schedule barrier: late client meetings conflict with 8:30 PM post-dinner walk. Accepted routine adaptation to 6:30 AM.',
      date: 'Today, 08:30 AM',
      thresholdNote: 'Clinician-configured routine flag &bull; Not an automated clinical diagnosis',
      actionLabel: 'Review Context'
    },
    {
      patientId: 'patient_rajesh_02',
      patientName: 'Rajesh Sharma (48, Indore)',
      flagType: 'Systolic Trend Elevation',
      severity: 'high',
      reason: '10-day ambulatory systolic average (139 mmHg) exceeds clinician-configured upper limit of 138 mmHg. May require dose timing review.',
      date: 'Yesterday',
      thresholdNote: 'Clinician-configured threshold (>138 mmHg) &bull; Awaits human medical review',
      actionLabel: 'Evaluate Dosage'
    },
    {
      patientId: 'patient_vikram_04',
      patientName: 'Vikram Patel (51, Indore)',
      flagType: 'Adherence Interruption',
      severity: 'high',
      reason: 'Missed 4 consecutive morning doses during mandi auction week. Blood pressure ticked up to 146 mmHg.',
      date: 'Oct 6, 2026',
      thresholdNote: 'Routine adherence interruption &bull; Requires family anchor',
      actionLabel: 'Schedule Outreach'
    },
    {
      patientId: 'patient_priya_03',
      patientName: 'Priya Verma (39, Indore)',
      flagType: 'Routine 90-Day Follow-Up',
      severity: 'low',
      reason: 'Approaching 90-day milestone. Ambulatory pressure stable at 125/78 mmHg. Eligible for maintenance review.',
      date: 'Oct 2, 2026',
      thresholdNote: 'Scheduled follow-up calendar reminder',
      actionLabel: 'Confirm Maintenance'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-coral-50 text-coral-800">
              <AlertTriangle className="w-5 h-5 text-coral-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Clinician Attention &amp; Review Queue
              </h2>
              <p className="text-xs text-gray-500">
                Prioritizing patient continuity needs between visits &bull; Indore Clinic Panel
              </p>
            </div>
          </div>

          <span className="text-xs bg-coral-100 text-coral-900 font-bold px-3 py-1 rounded-full border border-coral-200">
            {queueItems.length} Queue Items Pending
          </span>
        </div>

        {/* CLINICAL SAFETY & BOUNDARY NOTICE */}
        <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-900 font-bold">Safety &amp; Threshold Guardrails:</strong> This review queue displays asynchronous routine signals to organize clinician workflow. Pulse <em>never performs autonomous diagnosis, automated treatment alterations, or acute clinical triage</em>. All threshold values are clinician-configured sample data, not automated medical claims. Pulse is <em>not</em> an emergency dispatch system.
          </div>
        </div>
      </div>

      {/* Queue Items List */}
      <div className="space-y-3.5">
        {queueItems.map((item, index) => {
          const isHigh = item.severity === 'high';
          const isMod = item.severity === 'moderate';

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border p-5 shadow-soft transition-all hover:shadow-card flex flex-wrap items-start justify-between gap-4 ${
                isHigh ? 'border-coral-300 bg-coral-50/10' : isMod ? 'border-amber-300' : 'border-warm-200'
              }`}
            >
              <div className="space-y-2 flex-1 min-w-[280px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isHigh 
                      ? 'bg-coral-100 text-coral-900 border-coral-200' 
                      : isMod 
                        ? 'bg-amber-100 text-amber-900 border-amber-200' 
                        : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                  }`}>
                    {item.flagType}
                  </span>
                  <span className="font-bold text-sm text-gray-900">{item.patientName}</span>
                  <span className="text-gray-400 font-mono text-xs">&bull; {item.date}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">
                  {item.reason}
                </p>

                <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.thresholdNote}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    onSelectPatient(item.patientId);
                    onNavigateTab('detail');
                  }}
                  className="bg-pulse-900 hover:bg-pulse-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pulse-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
