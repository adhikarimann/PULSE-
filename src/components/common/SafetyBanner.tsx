'use client';

import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, PhoneCall, Info } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50/90 border-b border-amber-200 text-amber-950 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="p-1 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            </span>
            <span>
              <strong className="font-semibold text-amber-900">Safety &amp; Clinical Guardrail:</strong> Pulse supports everyday care plan continuity between visits. Pulse is <em>not</em> an emergency monitoring system.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-800 hover:text-amber-950 flex items-center gap-1 font-semibold underline decoration-amber-300 underline-offset-2"
            >
              <span>{isExpanded ? 'Less' : 'Emergency & Clinical Boundary Details'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2.5 pt-2.5 border-t border-amber-200/70 grid sm:grid-cols-2 gap-4 text-xs text-amber-900">
            <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60 shadow-sm">
              <div className="font-bold flex items-center gap-1.5 text-amber-950 mb-1">
                <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                <span>Urgent Symptoms &amp; Emergency Escalation</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-700">
                If you or the patient experience severe symptoms such as chest tightness, acute shortness of breath, sudden numbness, or a hypertensive crisis reading exceeding <strong>180/120 mmHg</strong>, do not rely on this app. Call <strong>108 (India Emergency Ambulance)</strong> or <strong>112 (National Emergency)</strong>, or proceed to the nearest emergency department immediately.
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60 shadow-sm">
              <div className="font-bold flex items-center gap-1.5 text-amber-950 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-pulse-800" />
                <span>Medical Practice Boundary</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-700">
                Only a registered medical practitioner (such as Dr. Mehta) makes diagnoses, prescribes medication, or adjusts dosages. Pulse facilitates behavioral routine tracking and context sharing; software algorithms never autonomously alter medication or make medical decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
