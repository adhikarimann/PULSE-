'use client';

import React, { useState } from 'react';
import { VitalsReading, ClinicianTarget } from '@/types';
import { Target, Activity, Calendar, Info } from 'lucide-react';

interface BpTrendChartProps {
  vitals: VitalsReading[];
  clinicianTarget: ClinicianTarget;
  isCompact?: boolean;
}

export const BpTrendChart: React.FC<BpTrendChartProps> = ({ vitals, clinicianTarget, isCompact = false }) => {
  const [timeRange, setTimeRange] = useState<'all' | '30d' | '14d'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<VitalsReading | null>(null);

  // Filter blood pressure readings sorted chronologically
  const bpReadings = vitals
    .filter(v => v.type === 'blood_pressure' && v.systolic && v.diastolic)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Filter based on timeRange
  const now = new Date('2026-10-09T10:00:00.000Z');
  const filteredReadings = bpReadings.filter(r => {
    if (timeRange === 'all') return true;
    const diffDays = (now.getTime() - new Date(r.timestamp).getTime()) / (1000 * 3600 * 24);
    if (timeRange === '30d') return diffDays <= 35;
    if (timeRange === '14d') return diffDays <= 16;
    return true;
  });

  const displayList = filteredReadings.length > 0 ? filteredReadings : bpReadings;

  // Chart coordinate calculations
  const minVal = 70;
  const maxVal = 160;
  const chartHeight = isCompact ? 180 : 240;
  const chartWidth = 580;
  const paddingX = 40;
  const paddingY = 24;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const getY = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return chartHeight - paddingY - ((clamped - minVal) / (maxVal - minVal)) * innerHeight;
  };

  const getX = (index: number, total: number) => {
    if (total <= 1) return paddingX + innerWidth / 2;
    return paddingX + (index / (total - 1)) * innerWidth;
  };

  // Generate path data for systolic
  const systolicPoints = displayList.map((r, i) => ({
    x: getX(i, displayList.length),
    y: getY(r.systolic || 130),
    data: r
  }));

  const diastolicPoints = displayList.map((r, i) => ({
    x: getX(i, displayList.length),
    y: getY(r.diastolic || 80),
    data: r
  }));

  const systolicPath = systolicPoints.length > 0 
    ? systolicPoints.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
    : '';

  const diastolicPath = diastolicPoints.length > 0
    ? diastolicPoints.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
    : '';

  const targetSystolicY = getY(clinicianTarget.systolicTarget);
  const baselineY = getY(142); // Baseline for Saira

  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-4 sm:p-5 shadow-soft">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Blood Pressure Trend &bull; 90-Day Trajectory
            </h3>
            <span className="text-[10px] bg-pulse-50 text-pulse-800 border border-pulse-200 px-2 py-0.5 rounded font-medium">
              Illustrative Demo Data
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Measured in mmHg &bull; Solid line shows ambulatory readings vs. clinician target
          </p>
        </div>

        {!isCompact && (
          <div className="flex items-center gap-1 bg-warm-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setTimeRange('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${timeRange === 'all' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All (60d)
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${timeRange === '30d' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Last 30d
            </button>
            <button
              onClick={() => setTimeRange('14d')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${timeRange === '14d' ? 'bg-white shadow-sm text-pulse-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Last 14d
            </button>
          </div>
        )}
      </div>

      {/* Target & Metric Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs mb-3 p-2.5 bg-warm-50 rounded-xl border border-warm-200/60">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-pulse-700"></span>
          <span className="font-medium text-gray-700">Systolic (mmHg)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-pulse-400"></span>
          <span className="font-medium text-gray-700">Diastolic (mmHg)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0.5 border-t-2 border-dashed border-emerald-600"></span>
          <span className="font-medium text-emerald-800">
            Target: &lt;{clinicianTarget.systolicTarget}/{clinicianTarget.diastolicTarget} mmHg (Clinician-Set)
          </span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto text-gray-500 text-[11px]">
          <Info className="w-3 h-3 text-pulse-600" />
          <span>Tap/hover any node for source info</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Background Grid Lines */}
          {[80, 100, 120, 140].map((gridVal) => {
            const y = getY(gridVal);
            return (
              <g key={gridVal}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  fontSize="10"
                  fill="#9CA3AF"
                  textAnchor="end"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Clinician Target Line */}
          <line
            x1={paddingX}
            y1={targetSystolicY}
            x2={chartWidth - paddingX}
            y2={targetSystolicY}
            stroke="#10B981"
            strokeWidth="1.75"
            strokeDasharray="5 4"
          />
          <text
            x={chartWidth - paddingX - 4}
            y={targetSystolicY - 6}
            fontSize="10"
            fill="#059669"
            textAnchor="end"
            fontWeight="600"
          >
            Target &lt; {clinicianTarget.systolicTarget} mmHg
          </text>

          {/* Baseline Indicator Line */}
          <line
            x1={paddingX}
            y1={baselineY}
            x2={chartWidth - paddingX}
            y2={baselineY}
            stroke="#F87171"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          <text
            x={paddingX + 6}
            y={baselineY - 4}
            fontSize="9"
            fill="#DC2626"
            fontWeight="500"
          >
            Baseline: 142 mmHg
          </text>

          {/* Systolic Polyline */}
          <path
            d={systolicPath}
            fill="none"
            stroke="#0D5C58"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Diastolic Polyline */}
          <path
            d={diastolicPath}
            fill="none"
            stroke="#5AAEA4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Systolic Nodes */}
          {systolicPoints.map((pt, i) => (
            <g
              key={'sys-' + i}
              className="cursor-pointer transition-transform hover:scale-125"
              onMouseEnter={() => setHoveredPoint(pt.data)}
              onClick={() => setHoveredPoint(pt.data)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#0D5C58"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Diastolic Nodes */}
          {diastolicPoints.map((pt, i) => (
            <g
              key={'dia-' + i}
              className="cursor-pointer transition-transform hover:scale-125"
              onMouseEnter={() => setHoveredPoint(pt.data)}
              onClick={() => setHoveredPoint(pt.data)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#5AAEA4"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>

        {/* Hover / Selected Point Tooltip */}
        {hoveredPoint && (
          <div className="mt-3 p-3 bg-pulse-950 text-white rounded-xl shadow-elevated text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
            <div>
              <div className="font-bold text-pulse-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-pulse-400" />
                <span>Reading: {hoveredPoint.systolic}/{hoveredPoint.diastolic} mmHg (Pulse: {hoveredPoint.pulse || 72} bpm)</span>
              </div>
              <div className="text-[11px] text-gray-300 mt-0.5">
                Recorded: {new Date(hoveredPoint.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; Source: <span className="text-white font-medium">{hoveredPoint.sourceLabel}</span>
              </div>
              {hoveredPoint.notes && (
                <div className="text-[10px] text-pulse-300 italic mt-0.5">
                  &ldquo;{hoveredPoint.notes}&rdquo;
                </div>
              )}
            </div>
            <button
              onClick={() => setHoveredPoint(null)}
              className="text-[11px] text-pulse-400 hover:text-white underline"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Clinical Context Footnote */}
      <div className="mt-3 text-[11px] text-gray-500 border-t border-warm-100 pt-2 flex items-center justify-between">
        <span>
          Clinician target configured by <strong>{clinicianTarget.setBy}</strong> &bull; Mehta Heart &amp; Chronic Care
        </span>
        <span className="text-pulse-800 font-semibold">
          Progress: -10 mmHg from baseline (142 &rarr; 132)
        </span>
      </div>
    </div>
  );
};
