'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { BpTrendChart } from '@/components/charts/BpTrendChart';
import { 
  Heart, 
  Activity, 
  Target, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  ArrowRight, 
  ShieldAlert, 
  Smartphone, 
  Sparkles,
  MessageSquare,
  Clock,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface CareDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const CareDashboard: React.FC<CareDashboardProps> = ({ onNavigateTab }) => {
  const { 
    patient, 
    vitals, 
    messages, 
    devices, 
    toggleCareAction,
    simulateDeviceSync 
  } = useCare();

  const todayStr = '2026-10-09';
  const latestBpReading = vitals.find(v => v.type === 'blood_pressure') || vitals[0];
  const completedTodayCount = patient.actions.filter(a => a.completedDates.includes(todayStr)).length;
  const totalActionsCount = patient.actions.length;
  const completionPercentage = Math.round((completedTodayCount / totalActionsCount) * 100);

  // Latest shared message (excluding private care-team notes)
  const latestSharedMsg = messages
    .filter(m => !m.isCareTeamOnly)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

  const bpDevice = devices.find(d => d.category === 'blood_pressure');

  return (
    <div className="space-y-6">
      {/* Persona Context Card - Saira's Indore Context */}
      <div className="bg-gradient-to-r from-pulse-900 to-pulse-800 rounded-2xl p-5 text-white shadow-elevated relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-pulse-700/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-pulse-700/80 text-pulse-200 px-2.5 py-0.5 rounded-full font-medium">
                Day 72 of 90-Day Plan &bull; Vijay Nagar, Indore
              </span>
              <span className="text-xs text-pulse-300 font-mono">
                Prescribed by {patient.clinicianTarget.setBy}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Hello, {patient.name}
            </h1>
            <p className="text-xs text-pulse-100 max-w-2xl mt-1 leading-relaxed">
              Balancing your senior logistics role, evening family dinner preparation, and two school routines. Pulse supports your doctor&apos;s care plan in everyday life.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('checkin')}
              className="bg-white text-pulse-900 hover:bg-pulse-50 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-pulse-700" />
              <span>Routine Check-In</span>
            </button>
            <button
              onClick={() => onNavigateTab('messages')}
              className="bg-pulse-800/80 hover:bg-pulse-700 text-white border border-pulse-600 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-pulse-200" />
              <span className="hidden sm:inline">Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. HEALTH OUTCOME FIRST - Clinical Progress Card */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Latest BP & Clinician Target */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-warm-200 p-5 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
                  <Heart className="w-5 h-5 text-pulse-700" />
                </span>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">Health Outcome</h2>
                  <span className="text-[10px] text-gray-500">Ambulatory Blood Pressure</span>
                </div>
              </div>
              <span className="text-[10px] bg-pulse-50 text-pulse-800 border border-pulse-200 px-2 py-0.5 rounded font-medium">
                Demo Data
              </span>
            </div>

            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-pulse-950 font-mono">
                  {latestBpReading.systolic}/{latestBpReading.diastolic}
                </span>
                <span className="text-xs text-gray-500 font-medium">mmHg</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
                <TrendingDown className="w-4 h-4" />
                <span>-10 mmHg systolic reduction vs baseline (142)</span>
              </div>
            </div>

            {/* Clinician-Set Target Box */}
            <div className="p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-pulse-700" />
                  Clinician Target:
                </span>
                <span className="font-bold text-pulse-900 font-mono">
                  &lt; {patient.clinicianTarget.systolicTarget}/{patient.clinicianTarget.diastolicTarget} mmHg
                </span>
              </div>
              <div className="text-[11px] text-gray-500 leading-tight">
                Set by {patient.clinicianTarget.setBy} &bull; Mehta Heart Care, Indore
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-warm-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Source: <strong className="text-gray-700">{latestBpReading.sourceLabel}</strong></span>
            <span>Recorded: {new Date(latestBpReading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* BP Trend Chart Preview */}
        <div className="md:col-span-2">
          <BpTrendChart vitals={vitals} clinicianTarget={patient.clinicianTarget} isCompact={true} />
        </div>
      </div>

      {/* 2. LEADING BEHAVIOR SIGNAL & TODAY'S CARE ACTIONS */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Today's Actions Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-warm-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-base">
                  Today&apos;s Clinician-Defined Care Actions
                </h3>
                <span className="text-[11px] bg-pulse-50 text-pulse-800 font-semibold px-2 py-0.5 rounded-full border border-pulse-200">
                  {completedTodayCount} of {totalActionsCount} completed
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Supporting behavior signal &bull; Tap circle to log execution for today
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('careplan')}
              className="text-xs font-semibold text-pulse-800 hover:text-pulse-950 flex items-center gap-1"
            >
              <span>View Full Plan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action List */}
          <div className="space-y-3">
            {patient.actions.map((act) => {
              const isCompleted = act.completedDates.includes(todayStr);

              return (
                <div
                  key={act.id}
                  onClick={() => toggleCareAction(act.id, todayStr)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isCompleted
                      ? 'bg-pulse-50/50 border-pulse-200 text-pulse-950'
                      : 'bg-warm-50/60 border-warm-200 hover:border-pulse-300 text-gray-900'
                  }`}
                >
                  <button
                    className={`mt-0.5 flex-shrink-0 transition-transform active:scale-90 ${
                      isCompleted ? 'text-pulse-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 fill-pulse-100" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {act.title}
                      </h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-warm-200 text-gray-600">
                        {act.scheduledTime}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {act.doctorInstructions}
                    </p>

                    {act.routineSupportTip && (
                      <div className="mt-2 text-[11px] text-pulse-800 bg-white/80 p-2 rounded-lg border border-pulse-100 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pulse-600 flex-shrink-0" />
                        <span><strong>Routine Tip:</strong> {act.routineSupportTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Supporting Signal Explanation Footnote */}
          <div className="mt-4 p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-[11px] text-gray-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-pulse-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Important Product Principle:</strong> Daily care action completion is a <em>leading behavioral signal</em> showing routine feasibility. It supports your clinical target but is never treated as proof of health improvement without clinician blood pressure review.
            </p>
          </div>
        </div>

        {/* Right Column: Next Step, Device Sync, Follow-Up */}
        <div className="space-y-5">
          {/* Practical Next Best Step */}
          <div className="bg-gradient-to-br from-pulse-50 to-white rounded-2xl border border-pulse-200 p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-pulse-100 text-pulse-800">
                <Sparkles className="w-4 h-4" />
              </span>
              <h4 className="font-bold text-xs uppercase tracking-wide text-pulse-950">
                Practical Next Step
              </h4>
            </div>
            <h5 className="font-bold text-sm text-gray-900 mb-1">
              Early Morning Wind-Down Before School Rush
            </h5>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Take 5 quiet minutes after your 6:30 AM walk before waking the kids. Sit still for your resting cuff reading.
            </p>
            <button
              onClick={() => onNavigateTab('checkin')}
              className="w-full bg-pulse-800 hover:bg-pulse-900 text-white text-xs font-semibold py-2 px-3 rounded-xl transition shadow-sm"
            >
              Check In on Today&apos;s Routine
            </button>
          </div>

          {/* Connected Device Quick Card */}
          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-pulse-700" />
                <h4 className="font-bold text-xs text-gray-900">Connected Device</h4>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                {bpDevice?.status === 'connected' ? 'Connected' : 'Standby'}
              </span>
            </div>

            <div className="text-xs text-gray-700 mb-1 font-semibold">
              {bpDevice?.name || 'Omron Smart BP Monitor'}
            </div>
            <div className="text-[11px] text-gray-500 mb-3">
              Last synced: {bpDevice?.lastSync || 'Today, 07:30 AM'} &bull; Battery: {bpDevice?.batteryPercent || 88}%
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => simulateDeviceSync('blood_pressure')}
                className="flex-1 bg-warm-100 hover:bg-warm-200 text-pulse-950 font-semibold text-xs py-2 px-2.5 rounded-xl border border-warm-300 transition text-center"
                title="Simulate Bluetooth sync of resting reading"
              >
                Simulate Sync (Demo)
              </button>
              <button
                onClick={() => onNavigateTab('devices')}
                className="text-xs font-semibold text-pulse-800 hover:underline px-2 py-2"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Next Clinical Follow-up Card */}
          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-2 text-pulse-900">
              <Calendar className="w-4 h-4 text-pulse-700" />
              <h4 className="font-bold text-xs">Next Doctor Consultation</h4>
            </div>
            <div className="text-sm font-bold text-gray-900">
              {new Date(patient.appointment.scheduledDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} at {patient.appointment.scheduledTime}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {patient.appointment.visitType} &bull; {patient.appointment.doctorName}
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5 leading-tight">
              Dr. Mehta will review your 90-day trajectory and routine barrier history.
            </p>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="mt-3 text-xs font-semibold text-pulse-800 hover:underline block"
            >
              Request Reschedule &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 3. LATEST SHARED CARE UPDATE PREVIEW */}
      {latestSharedMsg && (
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-pulse-700" />
              <h4 className="font-bold text-sm text-gray-900">
                Latest Shared Care Update
              </h4>
              <span className="text-[10px] bg-pulse-50 text-pulse-800 border border-pulse-200 px-2 py-0.5 rounded font-mono">
                {new Date(latestSharedMsg.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-semibold text-pulse-800 hover:text-pulse-950 flex items-center gap-1"
            >
              <span>View Full Thread ({messages.filter(m => !m.isCareTeamOnly).length} updates)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-warm-50/70 p-3.5 rounded-xl border border-warm-200 text-xs">
            <div className="font-bold text-pulse-950 mb-1 flex items-center gap-2">
              <span>{latestSharedMsg.senderName}:</span>
              {latestSharedMsg.title && <span className="text-gray-700 font-semibold">&ldquo;{latestSharedMsg.title}&rdquo;</span>}
            </div>
            <p className="text-gray-700 leading-relaxed text-xs">
              {latestSharedMsg.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
