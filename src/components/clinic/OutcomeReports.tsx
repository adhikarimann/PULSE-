'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { OutcomeFunnelChart } from '@/components/charts/OutcomeFunnelChart';
import { 
  HeartPulse, 
  FileCheck, 
  TrendingDown, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Building,
  Target
} from 'lucide-react';

export const OutcomeReports: React.FC = () => {
  const { pilotMetrics } = useCare();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <BarChart3 className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Clinic Pilot Outcomes &amp; Evidence Validation
              </h2>
              <p className="text-xs text-gray-500">
                Mehta Heart &amp; Chronic Care &bull; 90-Day Indore Continuity Cohort (N=64)
              </p>
            </div>
          </div>

          <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200">
            Illustrative Sample Data &bull; Unvalidated Pilot
          </span>
        </div>

        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          Pulse puts health improvement first. Rather than reporting daily app opens or vanity retention, we track the verified causal chain from systolic blood pressure reduction to routine feasibility and clinic retention.
        </p>
      </div>

      {/* Embedded 3-Step Metrics Chain */}
      <OutcomeFunnelChart metrics={pilotMetrics} />

      {/* Clinical Evidence Boundary vs Sample Trends */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-warm-200 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-pulse-700" />
          <span>Distinguishing Sample Trends from Clinically Validated Outcomes</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 space-y-2">
            <div className="font-bold text-gray-900 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-pulse-700" />
              <span>Available Sample Prototype Trends</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-[11px]">
              The prototype displays Saira&apos;s ambulatory readings moving from 142 down to ~132 mmHg alongside routine completion logs. These values demonstrate product mechanics and data flows in browser storage; they are illustrative and do not constitute peer-reviewed clinical proof.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-pulse-50/70 border border-pulse-200 space-y-2">
            <div className="font-bold text-pulse-950 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-pulse-800" />
              <span>Rigorous Pilot Validation Protocol Required</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-[11px]">
              To claim causal clinical impact in a real pilot, Pulse mandates:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-[11px] pl-1">
              <li>Standardized dual-cuff baseline measurements at Day 0 and Day 90.</li>
              <li>Intent-to-treat analysis across pre-specified Indore working cohorts.</li>
              <li>Independent cardiologist verification of readings and drug changes.</li>
              <li>Pre-registered IRB approval and patient informed consent under Indian DPDP law.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Business Model & Sustainability Grounding */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-warm-200 flex items-center gap-2">
          <Building className="w-4 h-4 text-pulse-700" />
          <span>Business Model Grounding &bull; Who Pays and Why</span>
        </h3>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-warm-50 rounded-xl border border-warm-200">
            <span className="font-bold text-gray-900 block mb-1">1. Patient Subscription</span>
            <div className="text-sm font-black text-pulse-950 font-mono mb-1">₹399 / month</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Well below the case study limit of ₹500/month. Covers routine continuity scaffolding, device pairing, and 15-minute consultation prep.
            </p>
          </div>

          <div className="p-3.5 bg-warm-50 rounded-xl border border-warm-200">
            <span className="font-bold text-gray-900 block mb-1">2. Clinic Practice SaaS</span>
            <div className="text-sm font-black text-pulse-950 font-mono mb-1">₹2,499 / doctor / mo</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Dr. Mehta pays for patient panel continuity digest, reducing consultation prep time while increasing 90-day follow-up retention.
            </p>
          </div>

          <div className="p-3.5 bg-warm-50 rounded-xl border border-warm-200">
            <span className="font-bold text-gray-900 block mb-1">3. Employer Wellness</span>
            <div className="text-sm font-black text-pulse-950 font-mono mb-1">₹149 / employee / mo</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Sponsored chronic care benefit for time-poor professionals like Saira in Tier-2 corporate logistics and manufacturing firms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
