'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { Lock, ShieldAlert, Plus, Stethoscope, AlertCircle, FileText } from 'lucide-react';

export const CareTeamNotes: React.FC = () => {
  const { patient, addCareTeamOnlyNote } = useCare();
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCareTeamOnlyNote(newNote);
    setNewNote('');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-pulse-900/40 p-5 shadow-soft space-y-4">
      {/* Explicit Privacy Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-warm-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pulse-950 text-white flex items-center justify-center">
            <Lock className="w-4 h-4 text-pulse-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-sm">
                Care-Team-Only Clinical Notes
              </h3>
              <span className="text-[10px] bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Strictly Private &bull; Never Visible to Patient</span>
              </span>
            </div>
            <p className="text-xs text-gray-500">
              For Dr. Mehta &amp; clinic staff internal documentation, medication titration notes, and lab flags.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-gray-500">
          {patient.careTeamNotes.length} Private Entries
        </span>
      </div>

      {/* Strict Privacy Notice */}
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <strong>Privacy Boundary Guarantee:</strong> Any notes recorded here are stored securely with <code className="bg-amber-100 px-1 py-0.2 rounded font-mono">isCareTeamOnly: true</code>. They will <em>never</em> be rendered or accessible within Saira&apos;s patient workspace or shared threads.
        </div>
      </div>

      {/* Existing Notes List */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {patient.careTeamNotes.map((note, index) => (
          <div key={index} className="p-3 rounded-xl bg-warm-50 border border-warm-200 text-xs text-gray-800 leading-relaxed font-sans">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-pulse-900 mb-1">
              <Stethoscope className="w-3 h-3 text-pulse-700" />
              <span>Internal Clinic Entry #{index + 1}</span>
            </div>
            <p>{note}</p>
          </div>
        ))}
      </div>

      {/* Add New Care Team Note */}
      <form onSubmit={handleSubmit} className="pt-2 border-t border-warm-200 space-y-3">
        <label className="block text-xs font-bold text-gray-800">
          Add Private Clinician Observation / Titration Strategy:
        </label>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="e.g. Discussed with clinic nurse: Saira's systolic trend is stabilizing (~132 mmHg). Avoid adding thiazide diuretic at Day 90 review if fasting glucose remains borderline (104 mg/dL). Recheck urine microalbumin."
          rows={3}
          className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
          required
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Saved exclusively to clinician profile
          </span>
          <button
            type="submit"
            className="bg-pulse-900 hover:bg-pulse-950 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save Private Note</span>
          </button>
        </div>
      </form>
    </div>
  );
};
