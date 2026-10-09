'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { CarePlanAction, ActionCategory } from '@/types';
import { 
  Stethoscope, 
  ShieldCheck, 
  Save, 
  Plus, 
  Trash2, 
  Clock, 
  Target, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface CarePlanBuilderProps {
  onDone: () => void;
}

export const CarePlanBuilder: React.FC<CarePlanBuilderProps> = ({ onDone }) => {
  const { patient, updateCarePlanByDoctor } = useCare();

  const [systolicTarget, setSystolicTarget] = useState(patient.clinicianTarget.systolicTarget.toString());
  const [diastolicTarget, setDiastolicTarget] = useState(patient.clinicianTarget.diastolicTarget.toString());
  const [actions, setActions] = useState<CarePlanAction[]>(patient.actions);
  const [doctorNote, setDoctorNote] = useState(
    'Reviewed 60-day ambulatory BP response. Target systolic maintained < 128 mmHg. Actions aligned with patient routine.'
  );

  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionCategory, setNewActionCategory] = useState<ActionCategory>('medication');
  const [newActionFreq, setNewActionFreq] = useState('Daily at 8:00 AM');
  const [newActionInstr, setNewActionInstr] = useState('');

  const handleAddAction = () => {
    if (!newActionTitle.trim()) return;

    const newAct: CarePlanAction = {
      id: 'act_' + Date.now(),
      title: newActionTitle.trim(),
      category: newActionCategory,
      frequency: newActionFreq,
      scheduledTime: newActionFreq.split('at ')[1] || '08:00 AM',
      doctorInstructions: newActionInstr.trim() || 'Follow prescribed routine strictly.',
      isDoctorPrescribed: true,
      routineSupportTip: 'Pulse reminder configured to anchor this routine.',
      completedDates: [],
      isActive: true
    };

    setActions([...actions, newAct]);
    setNewActionTitle('');
    setNewActionInstr('');
  };

  const handleRemoveAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const sys = parseInt(systolicTarget, 10) || 128;
    const dia = parseInt(diastolicTarget, 10) || 80;

    updateCarePlanByDoctor(sys, dia, actions, doctorNote);
    onDone();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Stethoscope className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Clinician Care Plan Builder &bull; Saira (42, Indore)
              </h2>
              <p className="text-xs text-gray-500">
                Prescribe medical targets, medications, and clinical actions &bull; Dr. Aniruddh Mehta
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-pulse-800 bg-pulse-50 px-3 py-1 rounded-full border border-pulse-200">
            Clinician Owned Medical Plan
          </span>
        </div>

        {/* Clear Medical Authority Statement */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-xs text-gray-700 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-pulse-800 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Medical Ownership Principle:</strong> The clinician defines the clinical targets, pharmaceutical doses, and clinical instructions. Pulse provides behavioral habit scaffolding between appointments. Saving changes here immediately updates Saira&apos;s active care plan and posts a shared update to her timeline.
          </div>
        </div>
      </div>

      {/* Targets Configuration Form */}
      <form onSubmit={handleSavePlan} className="space-y-6">
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-warm-200 flex items-center gap-2">
            <Target className="w-4 h-4 text-pulse-700" />
            <span>Clinician-Defined Target Blood Pressure</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Systolic Target (mmHg)
              </label>
              <input
                type="number"
                value={systolicTarget}
                onChange={(e) => setSystolicTarget(e.target.value)}
                min="100"
                max="180"
                className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                required
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Default: &lt; 128 mmHg (AHA/ESH Stage 1 target)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Diastolic Target (mmHg)
              </label>
              <input
                type="number"
                value={diastolicTarget}
                onChange={(e) => setDiastolicTarget(e.target.value)}
                min="60"
                max="120"
                className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                required
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Default: &lt; 80 mmHg
              </span>
            </div>
          </div>
        </div>

        {/* Existing Prescribed Actions List */}
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-warm-200">
            <div>
              <h3 className="font-bold text-sm text-gray-900">
                Prescribed Care Actions ({actions.length})
              </h3>
              <p className="text-xs text-gray-500">
                Clinician-directed daily actions carried out by patient
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {actions.map((act) => (
              <div key={act.id} className="p-4 rounded-xl border border-warm-200 bg-warm-50/40 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{act.title}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-pulse-100 text-pulse-800 border border-pulse-200 font-semibold">
                      {act.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">({act.frequency})</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {act.doctorInstructions}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveAction(act.id)}
                  className="text-gray-400 hover:text-coral-600 p-1.5 transition"
                  title="Remove Action"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Action Sub-form */}
          <div className="mt-4 p-4 rounded-xl border border-pulse-200 bg-pulse-50/30 space-y-3">
            <h4 className="font-bold text-xs text-pulse-950 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-pulse-700" />
              <span>Add New Clinician-Prescribed Action</span>
            </h4>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Action Title</label>
                <input
                  type="text"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  placeholder="e.g. Evening Blood Pressure Reading"
                  className="w-full text-xs p-2 rounded-lg border border-warm-300 focus:ring-1 focus:ring-pulse-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newActionCategory}
                  onChange={(e) => setNewActionCategory(e.target.value as ActionCategory)}
                  className="w-full text-xs p-2 rounded-lg border border-warm-300 focus:ring-1 focus:ring-pulse-500"
                >
                  <option value="medication">Medication</option>
                  <option value="movement">Movement</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="monitoring">Monitoring</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Timing / Frequency</label>
                <input
                  type="text"
                  value={newActionFreq}
                  onChange={(e) => setNewActionFreq(e.target.value)}
                  placeholder="e.g. Daily at 08:00 PM"
                  className="w-full text-xs p-2 rounded-lg border border-warm-300 focus:ring-1 focus:ring-pulse-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Doctor&apos;s Prescription Instructions</label>
              <input
                type="text"
                value={newActionInstr}
                onChange={(e) => setNewActionInstr(e.target.value)}
                placeholder="e.g. Take reading before dinner seated quietly for 5 minutes."
                className="w-full text-xs p-2 rounded-lg border border-warm-300 focus:ring-1 focus:ring-pulse-500"
              />
            </div>

            <button
              type="button"
              onClick={handleAddAction}
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
            >
              + Add to Prescribed List
            </button>
          </div>
        </div>

        {/* Doctor Summary Note to Patient */}
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-3">
          <label className="block text-xs font-bold text-gray-900">
            Care Plan Update Note (Visible to Saira in Shared Updates Thread):
          </label>
          <textarea
            value={doctorNote}
            onChange={(e) => setDoctorNote(e.target.value)}
            rows={2}
            className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
            required
          />
        </div>

        {/* Save & Cancel Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onDone}
            className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pulse-900 hover:bg-pulse-950 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Updated Care Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
