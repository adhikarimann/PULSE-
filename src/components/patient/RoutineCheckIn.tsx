'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { BarrierCategory } from '@/types';
import { 
  Sparkles, 
  Briefcase, 
  Home, 
  Plane, 
  Moon, 
  Pill, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Lock,
  Eye,
  AlertCircle
} from 'lucide-react';

export const RoutineCheckIn: React.FC = () => {
  const { 
    patient, 
    logBarrier, 
    acceptAdaptation, 
    declineAdaptation 
  } = useCare();

  const [selectedCategory, setSelectedCategory] = useState<BarrierCategory>('work_schedule');
  const [userNote, setUserNote] = useState('');
  const [shareWithDoctor, setShareWithDoctor] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);

  const barrierOptions: { id: BarrierCategory; label: string; icon: React.ReactNode; example: string }[] = [
    {
      id: 'work_schedule',
      label: 'Work schedule & late hours',
      icon: <Briefcase className="w-4 h-4 text-blue-600" />,
      example: 'Late client calls on AB Road or sudden shifts pushing meals past 9 PM'
    },
    {
      id: 'family_responsibilities',
      label: 'Family & caregiving demands',
      icon: <Home className="w-4 h-4 text-emerald-600" />,
      example: 'Preparing joint-family dinner, looking after children or in-laws'
    },
    {
      id: 'travel',
      label: 'Transit & travel in Indore',
      icon: <Plane className="w-4 h-4 text-indigo-600" />,
      example: 'Out-of-office transit or out-of-town trips making routine inconvenient'
    },
    {
      id: 'sleep_energy',
      label: 'Fatigue & irregular sleep',
      icon: <Moon className="w-4 h-4 text-purple-600" />,
      example: 'Exhausted by bedtime; no energy left for late evening routines'
    },
    {
      id: 'medication_hesitancy',
      label: 'Medicine timing friction',
      icon: <Pill className="w-4 h-4 text-coral-600" />,
      example: 'Forgetting morning dose during rush or stomach discomfort'
    },
    {
      id: 'other',
      label: 'Other life friction',
      icon: <HelpCircle className="w-4 h-4 text-gray-600" />,
      example: 'Seasonal festival commitments, illness, or general disruption'
    }
  ];

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logBarrier(selectedCategory, userNote, shareWithDoctor);
    setUserNote('');
    setShowNewForm(false);
  };

  // Find any pending adaptations
  const pendingBarrier = patient.barrierLogs.find(b => b.suggestedAdaptation.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Sparkles className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Insights &amp; Everyday Routine Check-In
              </h2>
              <p className="text-xs text-gray-500">
                Understand practical barriers &bull; Adapt schedules without changing doctor&apos;s medical goals
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="bg-pulse-800 hover:bg-pulse-900 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow-sm"
          >
            {showNewForm ? 'Close Form' : '+ Log Today\'s Barrier'}
          </button>
        </div>

        {/* Guardrail Statement */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-xs text-gray-600 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-pulse-800 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Care Continuity Guarantee:</strong> When life gets in the way of your plan, Pulse never tells you to abandon your doctor&apos;s goal. Instead, it suggests practical timing and reminder adjustments to fit your routine. <em>Medical goals, diagnoses, and medication prescriptions are strictly owned by Dr. Mehta.</em>
          </div>
        </div>
      </div>

      {/* Pending Practical Adaptation Callout (If Any) */}
      {pendingBarrier && (
        <div className="bg-gradient-to-br from-pulse-50/90 to-white rounded-2xl border-2 border-pulse-600 p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-pulse-200 text-pulse-900 rounded-lg">
                <Sparkles className="w-4 h-4 text-pulse-800" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-pulse-950">
                Recommended Routine Adaptation (Next Best Action)
              </span>
            </div>
            <span className="text-[10px] bg-pulse-100 text-pulse-800 font-mono px-2 py-0.5 rounded border border-pulse-200">
              Preserves Clinical Goal
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-1">
            {pendingBarrier.suggestedAdaptation.title}
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">
            {pendingBarrier.suggestedAdaptation.rationale}
          </p>

          <div className="p-3 bg-white rounded-xl border border-pulse-200 mb-4 text-xs">
            <div className="text-[11px] text-gray-500 mb-1 font-medium">Proposed Schedule Adjustment:</div>
            <div className="font-bold text-pulse-900 font-mono text-sm">
              &rarr; {pendingBarrier.suggestedAdaptation.proposedSchedule}
            </div>
            <div className="text-[11px] text-emerald-800 font-medium mt-1">
              &bull; 100% compliant with Dr. Mehta&apos;s medical prescription.
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => acceptAdaptation(pendingBarrier.id)}
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept Adaptation</span>
            </button>
            <button
              onClick={() => declineAdaptation(pendingBarrier.id)}
              className="bg-warm-100 hover:bg-warm-200 text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition"
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      {/* Log A Barrier Form */}
      {showNewForm && (
        <form onSubmit={handleLogSubmit} className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-warm-200 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">
              What made it difficult to complete your care actions today?
            </h3>
            <span className="text-xs text-gray-400">Step 1 of 2</span>
          </div>

          {/* Barrier choices */}
          <div className="grid sm:grid-cols-2 gap-3">
            {barrierOptions.map((opt) => (
              <label
                key={opt.id}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  selectedCategory === opt.id
                    ? 'border-pulse-600 bg-pulse-50/40 shadow-sm'
                    : 'border-warm-200 hover:border-warm-300 bg-warm-50/40'
                }`}
              >
                <input
                  type="radio"
                  name="barrier"
                  value={opt.id}
                  checked={selectedCategory === opt.id}
                  onChange={() => setSelectedCategory(opt.id)}
                  className="mt-1 text-pulse-800 focus:ring-pulse-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                    {opt.example}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* User note */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Add Context for Yourself and Dr. Mehta (Optional):
            </label>
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="e.g. Today had 3 back-to-back late evening client meetings. By 9 PM I was exhausted and couldn't step out for a walk."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
            />
          </div>

          {/* Privacy & Doctor Sharing Toggle */}
          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-pulse-700" />
              <div className="text-xs">
                <span className="font-semibold text-gray-900">Share barrier summary with Dr. Mehta</span>
                <p className="text-[11px] text-gray-500">Dr. Mehta will see this context in your 90-day clinical continuity summary</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={shareWithDoctor}
              onChange={(e) => setShareWithDoctor(e.target.checked)}
              className="w-4 h-4 text-pulse-800 rounded focus:ring-pulse-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition"
            >
              Save Check-In &amp; Generate Next Best Action
            </button>
          </div>
        </form>
      )}

      {/* Routine Adaptation History & Behavioral Rebound Story */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-warm-200">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Routine Barrier History &amp; Adaptation Outcomes
            </h3>
            <p className="text-xs text-gray-500">
              Verified outcomes from routine timing adaptations
            </p>
          </div>
          <span className="text-[10px] bg-warm-100 text-gray-700 px-2 py-0.5 rounded font-mono">
            {patient.barrierLogs.length} Logged Entries
          </span>
        </div>

        <div className="space-y-4">
          {patient.barrierLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-xl border border-warm-200 bg-warm-50/50 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 bg-white px-2.5 py-0.5 rounded-md border border-warm-200">
                    {log.barrierLabel}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">
                    {new Date(log.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  log.suggestedAdaptation.status === 'accepted' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : log.suggestedAdaptation.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {log.suggestedAdaptation.status === 'accepted' ? 'Adaptation Active' : log.suggestedAdaptation.status}
                </span>
              </div>

              <p className="text-xs text-gray-700 italic">
                &ldquo;{log.userNote}&rdquo;
              </p>

              <div className="p-3 bg-white rounded-lg border border-warm-200 text-xs">
                <div className="font-semibold text-pulse-950 flex items-center gap-1.5 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-pulse-700" />
                  <span>Routine Support Action: {log.suggestedAdaptation.title}</span>
                </div>
                <p className="text-[11px] text-gray-600">{log.suggestedAdaptation.rationale}</p>
                {log.outcomeAfterDays && (
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium">
                    <strong>Measured Follow-Up:</strong> {log.outcomeAfterDays}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                <span>Shared with Dr. Mehta: <strong>{log.sharedWithDoctor ? 'Yes (Included in clinic summary)' : 'Private to patient'}</strong></span>
                <span>Clinical goal: <strong>Preserved</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
