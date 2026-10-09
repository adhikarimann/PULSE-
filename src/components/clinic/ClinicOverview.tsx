'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { 
  Stethoscope, 
  Users, 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ClinicOverviewProps {
  onSelectPatient: (patientId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ClinicOverview: React.FC<ClinicOverviewProps> = ({ onSelectPatient, onNavigateTab }) => {
  const { clinicPatients, pilotMetrics } = useCare();

  const needsReviewCount = clinicPatients.filter(p => p.reviewStatus !== 'stable').length;

  return (
    <div className="space-y-6">
      {/* Clinic Header Banner */}
      <div className="bg-gradient-to-r from-pulse-950 via-pulse-900 to-pulse-800 rounded-2xl p-5 text-white shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-pulse-800 text-pulse-200 px-2.5 py-0.5 rounded-full font-medium">
                Clinic Panel &bull; Indore Central
              </span>
              <span className="text-xs text-pulse-300 font-mono">
                Dr. Aniruddh Mehta, MD (Medicine)
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Mehta Heart &amp; Chronic Care Continuity
            </h1>
            <p className="text-xs text-pulse-200 max-w-2xl mt-1 leading-relaxed">
              Monitoring 90-day clinical trajectories between appointments. Synthesizing everyday patient routine context for fast, actionable 15-minute consultations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('queue')}
              className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-2 transition"
            >
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>Review Queue ({needsReviewCount} flagged)</span>
            </button>
            <button
              onClick={() => onNavigateTab('outcomes')}
              className="bg-pulse-800 hover:bg-pulse-700 text-white border border-pulse-600 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition"
            >
              Cohort Outcomes
            </button>
          </div>
        </div>
      </div>

      {/* 1. CLINICAL OUTCOME REPORTING FIRST (Ahead of Engagement) */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-warm-200">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-pulse-700" />
              <h2 className="text-base font-bold text-gray-900">
                Primary Clinical Outcome &bull; Blood Pressure Distribution
              </h2>
              <span className="text-[10px] bg-pulse-50 text-pulse-800 border border-pulse-200 px-2 py-0.5 rounded font-medium">
                Illustrative Demo Metrics
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Health outcomes prioritized ahead of app opens or gamified engagement
            </p>
          </div>

          <span className="text-xs font-mono text-gray-400">
            Cohort N={clinicPatients.length} Active Patients
          </span>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200">
            <span className="text-[10px] uppercase font-bold text-gray-500">Mean Systolic Reduction</span>
            <div className="text-2xl font-black text-pulse-950 mt-1 font-mono">
              -6.8 mmHg
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
              Clinician validated (Illustrative)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200">
            <span className="text-[10px] uppercase font-bold text-gray-500">Target Attainment</span>
            <div className="text-2xl font-black text-pulse-950 mt-1 font-mono">
              67.2%
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
              Reached &lt; 130/80 mmHg
            </span>
          </div>

          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200">
            <span className="text-[10px] uppercase font-bold text-gray-500">Routine Adherence</span>
            <div className="text-2xl font-black text-gray-900 mt-1 font-mono">
              77.4%
            </div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">
              Supporting behavior signal
            </span>
          </div>

          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200">
            <span className="text-[10px] uppercase font-bold text-gray-500">90-Day Retention</span>
            <div className="text-2xl font-black text-gray-900 mt-1 font-mono">
              81.3%
            </div>
            <span className="text-[11px] text-pulse-800 font-semibold mt-0.5 block">
              Active in care plan at 90d
            </span>
          </div>
        </div>
      </div>

      {/* 2. ENROLLED PATIENTS ROSTER */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-warm-200">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Enrolled Chronic Care Patients (Indore Cohort)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any patient to inspect 90-day trajectory, shared barrier logs, and private care-team notes
            </p>
          </div>

          <div className="text-xs font-mono text-gray-500">
            Sorted by consultation schedule
          </div>
        </div>

        {/* Patient Cards Grid */}
        <div className="space-y-3">
          {clinicPatients.map((p) => {
            const isSaira = p.id === 'patient_saira_01';
            const isAttention = p.reviewStatus === 'attention_required';
            const isNeedsReview = p.reviewStatus === 'needs_review';

            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPatient(p.id);
                  onNavigateTab('detail');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-4 hover:shadow-card ${
                  isSaira 
                    ? 'border-pulse-300 bg-pulse-50/20 hover:border-pulse-500' 
                    : 'border-warm-200 hover:border-warm-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isSaira ? 'bg-pulse-800 text-white' : 'bg-warm-200 text-gray-700'
                  }`}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-gray-900">{p.name}</h4>
                      <span className="text-xs text-gray-500">({p.age}y, {p.location})</span>
                      {isSaira && (
                        <span className="text-[10px] bg-pulse-100 text-pulse-800 font-bold px-2 py-0.2 rounded-full border border-pulse-200">
                          Primary Prototype Persona
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      <strong>Diagnosis:</strong> {p.primaryDiagnosis} &bull; {p.secondaryDiagnosis}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Occupation: {p.occupation}
                    </div>
                  </div>
                </div>

                {/* Telemetry Summary */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Baseline &rarr; Current</span>
                    <div className="font-mono font-bold text-sm text-gray-900">
                      {p.baselineSystolic}/{p.baselineDiastolic} &rarr; <span className="text-pulse-900">{p.currentSystolicAvg}/{p.currentDiastolicAvg}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">Target &lt; {p.clinicianTarget.systolicTarget} mmHg</span>
                  </div>

                  {/* Status pill */}
                  <div>
                    {isAttention ? (
                      <span className="text-[11px] bg-coral-100 text-coral-800 font-bold px-2.5 py-1 rounded-full border border-coral-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-coral-700" />
                        <span>Attention Required</span>
                      </span>
                    ) : isNeedsReview ? (
                      <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>Review Due</span>
                      </span>
                    ) : (
                      <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Stable Trajectory</span>
                      </span>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
