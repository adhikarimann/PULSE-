'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileCheck, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';

export const PrivacySharing: React.FC = () => {
  const { patient, updatePrivacySettings, resetToDemoDefaults, showToast } = useCare();
  const privacy = patient.privacy;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
            <ShieldCheck className="w-5 h-5 text-pulse-700" />
          </span>
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Privacy, Consent &amp; Data Sharing Controls
            </h2>
            <p className="text-xs text-gray-500">
              India Digital Personal Data Protection (DPDP) Act Compliance Principles
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          You own your health telemetry. You have granular control over what information is shared with Dr. Mehta&apos;s clinic team and what remains strictly private on your device.
        </p>
      </div>

      {/* Granular Toggles */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-warm-200">
          Clinician Sharing Preferences (Dr. Mehta, Indore)
        </h3>

        {/* Toggle 1: Routine completion */}
        <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-warm-50/50 border border-warm-200">
          <div>
            <div className="text-xs font-bold text-gray-900">Share Daily Care Plan Completion</div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Allows Dr. Mehta to see whether daily routines (e.g. morning Telmisartan, brisk walking) are being completed.
            </p>
          </div>
          <input
            type="checkbox"
            checked={privacy.shareRoutineCompletion}
            onChange={(e) => updatePrivacySettings({ shareRoutineCompletion: e.target.checked })}
            className="w-4 h-4 text-pulse-800 rounded focus:ring-pulse-500 cursor-pointer mt-1"
          />
        </div>

        {/* Toggle 2: Barrier logs */}
        <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-warm-50/50 border border-warm-200">
          <div>
            <div className="text-xs font-bold text-gray-900">Share Everyday Routine Barrier Logs</div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Shares notes about work shifts, dinner delays, and family responsibilities so Dr. Mehta understands real-life context at follow-up.
            </p>
          </div>
          <input
            type="checkbox"
            checked={privacy.shareBarrierLogs}
            onChange={(e) => updatePrivacySettings({ shareBarrierLogs: e.target.checked })}
            className="w-4 h-4 text-pulse-800 rounded focus:ring-pulse-500 cursor-pointer mt-1"
          />
        </div>

        {/* Toggle 3: Device readings */}
        <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-warm-50/50 border border-warm-200">
          <div>
            <div className="text-xs font-bold text-gray-900">Share Blood Pressure &amp; Glucose Telemetry</div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Automatically transmits paired Omron cuff and glucometer readings directly to Dr. Mehta&apos;s review dashboard.
            </p>
          </div>
          <input
            type="checkbox"
            checked={privacy.shareDeviceReadings}
            onChange={(e) => updatePrivacySettings({ shareDeviceReadings: e.target.checked })}
            className="w-4 h-4 text-pulse-800 rounded focus:ring-pulse-500 cursor-pointer mt-1"
          />
        </div>

        {/* Toggle 4: Family Support */}
        <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-warm-50/50 border border-warm-200">
          <div>
            <div className="text-xs font-bold text-gray-900">Family Routine Involvement Note</div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Includes family context (e.g., cooking routines, meal timing) in the doctor&apos;s follow-up briefing.
            </p>
          </div>
          <input
            type="checkbox"
            checked={privacy.shareFamilySupportInvolvement}
            onChange={(e) => updatePrivacySettings({ shareFamilySupportInvolvement: e.target.checked })}
            className="w-4 h-4 text-pulse-800 rounded focus:ring-pulse-500 cursor-pointer mt-1"
          />
        </div>
      </div>

      {/* Patient Data Rights & Export */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-warm-200">
          Your Data Rights &amp; Export
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-warm-200 bg-warm-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-gray-900 mb-1">
                <Download className="w-4 h-4 text-pulse-700" />
                <span>Export 90-Day Continuity Summary</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Download a clean, structured PDF/JSON summary of your blood pressure distribution and routine milestones to take to any clinic.
              </p>
            </div>
            <button
              onClick={() => showToast('Continuity summary exported to clipboard (Demo simulation)', 'success')}
              className="mt-3 bg-white hover:bg-warm-100 text-pulse-900 border border-warm-300 font-semibold text-xs py-2 px-3 rounded-xl transition text-center"
            >
              Export Summary
            </button>
          </div>

          <div className="p-4 rounded-xl border border-coral-200 bg-coral-50/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-coral-900 mb-1">
                <Trash2 className="w-4 h-4 text-coral-600" />
                <span>Right to Erasure / Reset Demo</span>
              </div>
              <p className="text-[11px] text-coral-800 leading-relaxed">
                Permanently erase all local browser-stored records, logs, and readings, resetting to the clean default seed state.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all demo state to baseline initial values?')) {
                  resetToDemoDefaults();
                }
              }}
              className="mt-3 bg-white hover:bg-coral-100 text-coral-700 border border-coral-300 font-semibold text-xs py-2 px-3 rounded-xl transition text-center"
            >
              Reset All Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
