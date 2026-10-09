'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { Header } from '@/components/common/Header';
import { SafetyBanner } from '@/components/common/SafetyBanner';
import { NotificationToast } from '@/components/common/NotificationToast';
import { PatientWorkspace } from '@/components/patient/PatientWorkspace';
import { ClinicWorkspace } from '@/components/clinic/ClinicWorkspace';
import { 
  Heart, 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  Info, 
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

export default function Home() {
  const { role, setRole } = useCare();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <SafetyBanner />

        <main className="pb-16">
          {role === 'patient' ? (
            <PatientWorkspace />
          ) : (
            <ClinicWorkspace />
          )}
        </main>
      </div>

      <NotificationToast />

      {/* Structured Prototype Footer */}
      <footer className="bg-white border-t border-warm-200 py-10 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-warm-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pulse-900 text-white flex items-center justify-center font-bold">
                <Activity className="w-5 h-5 text-pulse-300" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">
                  Project Pulse &bull; Chronic Care Continuity
                </div>
                <div className="text-[11px] text-gray-500">
                  Closing the 89-day gap between appointments for time-poor professionals in Indore
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRole(role === 'patient' ? 'doctor' : 'patient')}
                className="bg-warm-100 hover:bg-warm-200 text-pulse-950 font-bold px-3 py-1.5 rounded-lg border border-warm-300 transition flex items-center gap-1.5"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Switch to {role === 'patient' ? 'Doctor View (Dr. Mehta)' : 'Patient View (Saira)'}</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-[11px] leading-relaxed">
            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Clinical Outcome Guardrail
              </span>
              <p>
                Health outcome (clinician-reviewed systolic BP over 90 days) is the sole proof of clinical impact. Care plan execution and app usage are supporting signals only. Pulse never presents engagement as clinical success.
              </p>
            </div>

            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Beachhead &amp; Persona Consistency
              </span>
              <p>
                Focused on time-poor working professionals aged 35–50 managing hypertension in Indore. Primary prototype persona: <strong>Saira (42, Senior Logistics Ops Manager)</strong>, balancing joint-family dinner prep and school runs along the AB Road corridor.
              </p>
            </div>

            <div>
              <span className="font-bold text-gray-900 block mb-1">
                Prototype Boundaries &amp; Data Storage
              </span>
              <p>
                All records, readings, barrier logs, and shared updates are maintained in local browser storage (localStorage). No external secrets or real patient data are transmitted. The role switcher demonstrates cross-workspace continuity on shared records.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-warm-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
            <div>
              &copy; 2026 Project Pulse &bull; Stealth HealthTech Sprint &bull; Indore Chronic Continuity Pilot
            </div>
            <div>
              Emergency: 108 / 112 &bull; Medical diagnosis strictly by Registered Medical Practitioners
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
