'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { BpTrendChart } from '@/components/charts/BpTrendChart';
import { CareTeamNotes } from './CareTeamNotes';
import { 
  Heart, 
  Activity, 
  Target, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Lock, 
  Sparkles, 
  FileText,
  User,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Stethoscope
} from 'lucide-react';

interface PatientDetailViewProps {
  onOpenPlanBuilder: () => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({ onOpenPlanBuilder }) => {
  const { 
    patient, 
    vitals, 
    messages, 
    sendDoctorUpdate, 
    selectedClinicPatientId, 
    clinicPatients 
  } = useCare();

  const [doctorUpdateText, setDoctorUpdateText] = useState('');
  const [doctorUpdateTitle, setDoctorUpdateTitle] = useState('Clinician Review: 60-Day Progress & Next Steps');
  const [activeSubTab, setActiveSubTab] = useState<'summary' | 'messages' | 'notes' | 'vitals'>('summary');

  // Currently viewed patient profile
  const selectedPatient = clinicPatients.find(p => p.id === selectedClinicPatientId) || patient;
  const isSaira = selectedPatient.id === 'patient_saira_01';

  const handleSendDoctorUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorUpdateText.trim()) return;
    sendDoctorUpdate(doctorUpdateText, doctorUpdateTitle);
    setDoctorUpdateText('');
  };

  // Shared messages thread (excluding care team notes)
  const sharedMessages = messages.filter(m => !m.isCareTeamOnly);

  return (
    <div className="space-y-6">
      {/* Patient Header Card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pulse-900 text-white flex items-center justify-center font-bold text-xl shadow-card">
              {selectedPatient.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h1>
                <span className="text-xs text-gray-500 font-medium">({selectedPatient.age}y, {selectedPatient.gender}, {selectedPatient.location})</span>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Day 72 of 90-Day Protocol
                </span>
              </div>

              <p className="text-xs text-gray-700 mt-1 font-medium">
                <strong>Primary:</strong> {selectedPatient.primaryDiagnosis} &bull; <strong>Secondary:</strong> {selectedPatient.secondaryDiagnosis}
              </p>

              <div className="text-[11px] text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span><strong>Role:</strong> {selectedPatient.occupation}</span>
                <span><strong>Family Context:</strong> {selectedPatient.familyContext}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPlanBuilder}
              className="bg-pulse-800 hover:bg-pulse-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-pulse-200" />
              <span>Edit Care Plan &amp; Targets</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher inside Patient Detail */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-warm-100 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('summary')}
            className={`px-3.5 py-2 rounded-xl transition ${
              activeSubTab === 'summary' ? 'bg-pulse-900 text-white shadow-sm' : 'text-gray-600 hover:bg-warm-100'
            }`}
          >
            15-Min Consultation Summary
          </button>
          <button
            onClick={() => setActiveSubTab('messages')}
            className={`px-3.5 py-2 rounded-xl transition ${
              activeSubTab === 'messages' ? 'bg-pulse-900 text-white shadow-sm' : 'text-gray-600 hover:bg-warm-100'
            }`}
          >
            Shared Messages &amp; Updates ({sharedMessages.length})
          </button>
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeSubTab === 'notes' ? 'bg-pulse-900 text-white shadow-sm' : 'text-gray-600 hover:bg-warm-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-coral-600" />
            <span>Care-Team-Only Notes</span>
          </button>
          <button
            onClick={() => setActiveSubTab('vitals')}
            className={`px-3.5 py-2 rounded-xl transition ${
              activeSubTab === 'vitals' ? 'bg-pulse-900 text-white shadow-sm' : 'text-gray-600 hover:bg-warm-100'
            }`}
          >
            All Telemetry ({vitals.length} Readings)
          </button>
        </div>
      </div>

      {activeSubTab === 'summary' && (
        <div className="space-y-6">
          {/* Top Row: Clinical Outcome BP Trend + Follow-up Snapshot */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <BpTrendChart vitals={vitals} clinicianTarget={selectedPatient.clinicianTarget} />
            </div>

            {/* Concise 15-Minute Follow-up Snapshot */}
            <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-1.5 rounded-lg bg-pulse-50 text-pulse-800">
                    <FileText className="w-4 h-4 text-pulse-700" />
                  </span>
                  <h3 className="font-bold text-sm text-gray-900">
                    15-Minute Consultation Digest
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Ambulatory Trajectory</span>
                    <div className="text-base font-bold font-mono text-pulse-950 mt-0.5">
                      142/91 &rarr; 132/83 mmHg
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                      -10 mmHg systolic drop &bull; Approaching &lt;128 target
                    </span>
                  </div>

                  <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Routine Adherence</span>
                    <div className="text-base font-bold font-mono text-gray-900 mt-0.5">
                      78% Execution
                    </div>
                    <span className="text-[11px] text-gray-600 mt-0.5 block">
                      Rebounded from 42% after routine schedule shift
                    </span>
                  </div>

                  <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Next Clinical Visit</span>
                    <div className="font-bold text-gray-900 mt-0.5">
                      Nov 4, 2026 at 05:30 PM
                    </div>
                    <span className="text-[11px] text-pulse-800 font-medium mt-0.5 block">
                      Formal 90-day medication titration review
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-warm-100 text-[11px] text-gray-500">
                Pulse pre-consultation synthesis saves ~8 mins of raw data review.
              </div>
            </div>
          </div>

          {/* Everyday Barriers Reported & Routine Support Tried */}
          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-warm-200">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Everyday Life Context &bull; Practical Barriers &amp; Routine Adaptations
                </h3>
                <p className="text-xs text-gray-500">
                  What practical barriers occurred, what routine support was tried, and what happened afterward
                </p>
              </div>
              <span className="text-xs bg-pulse-50 text-pulse-800 font-semibold px-2.5 py-1 rounded-full border border-pulse-200">
                Shared by Patient
              </span>
            </div>

            <div className="space-y-3">
              {selectedPatient.barrierLogs.map((b) => (
                <div key={b.id} className="p-4 rounded-xl border border-warm-200 bg-warm-50/40 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-warm-200">
                        {b.barrierLabel}
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        {new Date(b.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Adaptation Accepted by Saira
                    </span>
                  </div>

                  <p className="text-gray-700 italic">
                    <strong>Patient reported note:</strong> &ldquo;{b.userNote}&rdquo;
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-warm-200 space-y-1">
                    <div className="font-bold text-pulse-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pulse-700" />
                      <span>Routine Adaptation Tried: {b.suggestedAdaptation.title}</span>
                    </div>
                    <p className="text-gray-600 text-[11px]">
                      {b.suggestedAdaptation.rationale}
                    </p>
                    {b.outcomeAfterDays && (
                      <div className="mt-2 text-[11px] text-emerald-900 font-semibold bg-emerald-50/80 p-2 rounded border border-emerald-200">
                        &bull; Measured Outcome Afterward: {b.outcomeAfterDays}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Action: Send Shared Update */}
          <form onSubmit={handleSendDoctorUpdate} className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
              <Send className="w-4 h-4 text-pulse-700" />
              <h3 className="font-bold text-xs text-gray-900">
                Send Shared Care Update to Saira (Visible in Patient App)
              </h3>
            </div>

            <input
              type="text"
              value={doctorUpdateTitle}
              onChange={(e) => setDoctorUpdateTitle(e.target.value)}
              placeholder="Update Subject"
              className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
            />

            <textarea
              value={doctorUpdateText}
              onChange={(e) => setDoctorUpdateText(e.target.value)}
              placeholder="e.g. Reviewed your latest 14-day readings. Systolic average is down to 132 mmHg. The morning walk adaptation is working well. Keep current medication unchanged until our Nov 4 clinic appointment."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
              required
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Shared immediately to Saira&apos;s &ldquo;Messages &amp; care updates&rdquo; thread
              </span>
              <button
                type="submit"
                className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Shared Update</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeSubTab === 'messages' && (
        <div className="space-y-6">
          {/* Shared Messages Thread */}
          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <h3 className="font-bold text-sm text-gray-900">
                Chronological Care Thread (Visible to Doctor &amp; Patient)
              </h3>
              <span className="text-xs text-gray-400 font-mono">
                {sharedMessages.length} Messages
              </span>
            </div>

            <div className="space-y-3">
              {sharedMessages.map((m) => {
                const isDoc = m.senderRole === 'doctor';
                const isSys = m.senderRole === 'system';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border ${
                      isDoc 
                        ? 'bg-pulse-50/40 border-pulse-200' 
                        : isSys 
                          ? 'bg-warm-50 border-warm-200' 
                          : 'bg-white border-warm-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="font-bold text-gray-900 flex items-center gap-1.5">
                        <span>{m.senderName}</span>
                        {isDoc && <span className="text-[10px] bg-pulse-100 text-pulse-800 px-2 py-0.2 rounded font-semibold">Clinician</span>}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {new Date(m.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {m.title && <div className="font-bold text-xs text-pulse-950 mb-1">{m.title}</div>}
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Doctor Composer */}
          <form onSubmit={handleSendDoctorUpdate} className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-xs text-gray-900">Post Follow-Up Note to Saira:</h4>
            <textarea
              value={doctorUpdateText}
              onChange={(e) => setDoctorUpdateText(e.target.value)}
              placeholder="Type update message..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
            >
              Post Shared Update
            </button>
          </form>
        </div>
      )}

      {activeSubTab === 'notes' && (
        <CareTeamNotes />
      )}

      {activeSubTab === 'vitals' && (
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
          <h3 className="font-bold text-sm text-gray-900 mb-3 pb-2 border-b border-warm-200">
            All Ambulatory Readings &amp; Verification Sources
          </h3>
          <div className="divide-y divide-warm-100 text-xs">
            {vitals.map(v => (
              <div key={v.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-gray-900">
                    {v.type === 'blood_pressure' ? `${v.systolic}/${v.diastolic} mmHg` : `${v.glucose} mg/dL`}
                  </span>
                  <span className="text-[11px] text-gray-500 ml-2">({v.sourceLabel})</span>
                  {v.notes && <span className="text-[10px] text-gray-400 italic ml-2">&ldquo;{v.notes}&rdquo;</span>}
                </div>
                <div className="font-mono text-[11px] text-gray-500">
                  {new Date(v.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
