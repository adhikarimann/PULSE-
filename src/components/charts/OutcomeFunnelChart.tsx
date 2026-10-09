'use client';

import React from 'react';
import { PilotMetricSummary } from '@/types';
import { 
  HeartPulse, 
  CheckCircle, 
  Users, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface OutcomeFunnelChartProps {
  metrics: PilotMetricSummary;
}

export const OutcomeFunnelChart: React.FC<OutcomeFunnelChartProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-base">
              The 3-Step Metrics Chain &bull; Health Outcome First
            </h3>
            <span className="text-[11px] bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
              Illustrative Demo Data
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Defensible causal chain: Health outcome drives patient continuation and clinic retention
          </p>
        </div>

        <div className="text-xs font-mono text-gray-500 bg-warm-50 px-3 py-1.5 rounded-lg border border-warm-200">
          Cohort: N={metrics.pilotCohortSize} Indore Patients (Simulated)
        </div>
      </div>

      {/* The 3 Cards Chain */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Step 1: Clinical Outcome */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-pulse-50/60 to-white border-2 border-pulse-600/60 shadow-sm relative">
          <div className="absolute -top-3 left-4 bg-pulse-800 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Step 1 &bull; North Star
          </div>
          <div className="flex items-center justify-between mt-1 mb-2">
            <span className="text-xs font-bold text-pulse-950 uppercase tracking-wide">
              Clinical Outcome
            </span>
            <HeartPulse className="w-5 h-5 text-pulse-700" />
          </div>
          <div className="text-2xl font-black text-pulse-950 mb-1">
            {metrics.meanSystolicDelta}
          </div>
          <p className="text-xs font-semibold text-emerald-800 mb-2">
            {metrics.targetAttainmentRate}
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed border-t border-pulse-100 pt-2">
            <strong>Definition:</strong> Clinician-reviewed change in ambulatory/clinic systolic BP over 90 days. Health improvement is the core guardrail.
          </p>
        </div>

        {/* Step 2: Leading Behavior Signal */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-warm-50 to-white border border-warm-300 shadow-sm relative">
          <div className="absolute -top-3 left-4 bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Step 2 &bull; Leading Signal
          </div>
          <div className="flex items-center justify-between mt-1 mb-2">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              Behavior Execution
            </span>
            <CheckCircle className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            77.4%
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-2">
            {metrics.carePlanCompletionAverage}
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed border-t border-warm-200 pt-2">
            <strong>Definition:</strong> Prescribed care actions completed daily. Supporting signal that routines are fitting into Saira&apos;s working life.
          </p>
        </div>

        {/* Step 3: Continuation / Business Metric */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-warm-50 to-white border border-warm-300 shadow-sm relative">
          <div className="absolute -top-3 left-4 bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Step 3 &bull; Continuation
          </div>
          <div className="flex items-center justify-between mt-1 mb-2">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              90-Day Retention
            </span>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            81.3%
          </div>
          <p className="text-xs font-semibold text-emerald-800 mb-2">
            vs. ~12% Case Benchmark
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed border-t border-warm-200 pt-2">
            <strong>Definition:</strong> Active patient continuation at Day 90 follow-up. Demonstrates that care continuity prevents drop-off without vanity gamification.
          </p>
        </div>
      </div>

      {/* Causal Link Explanation */}
      <div className="mt-4 p-3.5 bg-pulse-50/70 rounded-xl border border-pulse-200 text-xs text-pulse-950">
        <div className="font-bold flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-pulse-800" />
          <span>The Causal Hypothesis &bull; Why moving Health Outcome moves the Business</span>
        </div>
        <p className="text-[11px] text-gray-700 leading-relaxed">
          When everyday barriers are solved (e.g. adapting walk timings to avoid late office calls), care actions are completed consistently. When care actions are completed, systolic blood pressure moves toward target. When patients and Dr. Mehta see validated clinical improvement at the 90-day review, trust is established, consultation value multiplies, and the patient stays enrolled.
        </p>
      </div>

      {/* Validation Requirements Footnote */}
      <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200 text-[11px] text-gray-600">
        <div className="font-semibold text-gray-800 flex items-center gap-1.5 mb-1">
          <FileCheck className="w-3.5 h-3.5 text-gray-600" />
          <span>Required For Clinical Validation (Real Pilot Protocol)</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-gray-600 pl-1">
          {metrics.validationRequirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
