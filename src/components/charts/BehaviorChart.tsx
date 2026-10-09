'use client';

import React from 'react';
import { CheckCircle2, TrendingUp, AlertCircle, Info, ArrowUpRight } from 'lucide-react';

export const BehaviorChart: React.FC = () => {
  // Weekly care plan completion percentages (illustrative sample data)
  const weeklyData = [
    { week: 'W1 (Aug 1)', rate: 82, note: 'Enrollment momentum' },
    { week: 'W2 (Aug 8)', rate: 78, note: 'Medication stable' },
    { week: 'W3 (Aug 15)', rate: 75, note: 'Walking consistent' },
    { week: 'W4 (Aug 22)', rate: 72, note: 'Slight fatigue' },
    { week: 'W5 (Aug 29)', rate: 68, note: 'Workload increasing' },
    { week: 'W6 (Sep 7)', rate: 58, note: 'Late shifts starting' },
    { week: 'W7 (Sep 14)', rate: 42, note: 'Barrier logged (late work calls clash with 8:30 PM walk)' },
    { week: 'W8 (Sep 21)', rate: 76, note: 'Routine adaptation accepted (shifted walk to 6:30 AM)' },
    { week: 'W9 (Sep 28)', rate: 84, note: 'Morning routine stabilized' },
    { week: 'W10 (Oct 5)', rate: 82, note: 'Current week active' }
  ];

  const maxVal = 100;
  const chartHeight = 160;

  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-4 sm:p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Care Plan Execution &bull; Leading Behavior Signal
            </h3>
            <span className="text-[10px] bg-warm-100 text-gray-700 px-2 py-0.5 rounded font-medium border border-warm-200">
              Supporting Signal Only
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Adherence to clinician-prescribed daily actions &bull; Illustrative cohort trajectory
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm font-black text-pulse-800">
            78% Overall Adherence
          </div>
          <div className="text-[10px] text-emerald-700 font-medium flex items-center justify-end gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+40% rebound post-adaptation</span>
          </div>
        </div>
      </div>

      {/* Explanatory Guardrail Callout */}
      <div className="mb-4 p-2.5 rounded-xl bg-warm-50 border border-warm-200 text-xs text-gray-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-pulse-700 flex-shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong>Guardrail Notice:</strong> High care-plan adherence is a <em>supporting behavioral signal</em>, not clinical proof that health improved. It helps Saira and Dr. Mehta see whether daily routines are practically sustainable in Indore’s everyday life.
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2 items-end h-40 pt-4 pb-2 border-b border-warm-200">
        {weeklyData.map((item, idx) => {
          const isDip = idx === 6;
          const isRebound = idx >= 7;
          const barHeightPercent = (item.rate / maxVal) * 100;

          return (
            <div key={item.week} className="flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip on hover */}
              <div className="absolute -top-12 z-20 hidden group-hover:block bg-pulse-950 text-white text-[10px] p-2 rounded-md shadow-elevated whitespace-nowrap pointer-events-none">
                <div className="font-bold">{item.week}: {item.rate}%</div>
                <div className="text-pulse-300">{item.note}</div>
              </div>

              {/* Rate percentage indicator */}
              <span className={`text-[10px] font-semibold mb-1 ${isDip ? 'text-coral-600' : 'text-gray-600'}`}>
                {item.rate}%
              </span>

              {/* Bar */}
              <div className="w-full bg-warm-100 rounded-t-md overflow-hidden flex items-end h-28">
                <div
                  style={{ height: `${barHeightPercent}%` }}
                  className={`w-full transition-all duration-500 rounded-t-md ${
                    isDip 
                      ? 'bg-coral-500 group-hover:bg-coral-600' 
                      : isRebound 
                        ? 'bg-pulse-700 group-hover:bg-pulse-800' 
                        : 'bg-pulse-400 group-hover:bg-pulse-500'
                  }`}
                />
              </div>

              {/* Week Label */}
              <span className="text-[9px] text-gray-400 font-mono mt-1 text-center truncate w-full">
                {item.week.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Key Milestone Markers */}
      <div className="mt-3 grid sm:grid-cols-2 gap-2 text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5 bg-coral-50/70 p-2 rounded-lg border border-coral-200/50">
          <AlertCircle className="w-3.5 h-3.5 text-coral-600 flex-shrink-0" />
          <span><strong>W7 Adherence Drop (42%):</strong> Late client work calls conflicted with 8:30 PM post-dinner walk.</span>
        </div>
        <div className="flex items-center gap-1.5 bg-pulse-50 p-2 rounded-lg border border-pulse-200/60">
          <CheckCircle2 className="w-3.5 h-3.5 text-pulse-700 flex-shrink-0" />
          <span><strong>W8 Rebound (76% &rarr; 84%):</strong> Shifted walk to 6:30 AM before school run; clinical goal preserved.</span>
        </div>
      </div>
    </div>
  );
};
