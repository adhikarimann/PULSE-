'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { VitalType, GlucoseContext } from '@/types';
import { 
  Smartphone, 
  Activity, 
  RotateCw, 
  Plus, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  Heart, 
  Droplet,
  Info,
  Calendar
} from 'lucide-react';

export const DevicesReadings: React.FC = () => {
  const { 
    devices, 
    vitals, 
    simulateDeviceSync, 
    addVitalsReading 
  } = useCare();

  const [activeTab, setActiveTab] = useState<'devices' | 'manual'>('devices');
  const [readingType, setReadingType] = useState<VitalType>('blood_pressure');
  const [systolic, setSystolic] = useState('132');
  const [diastolic, setDiastolic] = useState('83');
  const [pulse, setPulse] = useState('72');
  const [glucose, setGlucose] = useState('102');
  const [glucoseContext, setGlucoseContext] = useState<GlucoseContext>('fasting');
  const [manualNote, setManualNote] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readingType === 'blood_pressure') {
      addVitalsReading({
        timestamp: new Date().toISOString(),
        type: 'blood_pressure',
        systolic: parseInt(systolic, 10),
        diastolic: parseInt(diastolic, 10),
        pulse: parseInt(pulse, 10),
        source: 'manual_entry',
        sourceLabel: 'Manual Entry (Patient Log)',
        isSimulated: true,
        notes: manualNote || 'Manual blood pressure entry'
      });
    } else {
      addVitalsReading({
        timestamp: new Date().toISOString(),
        type: 'blood_glucose',
        glucose: parseInt(glucose, 10),
        glucoseContext,
        source: 'manual_entry',
        sourceLabel: 'Manual Entry (Glucometer Strip)',
        isSimulated: true,
        notes: manualNote || `Manual ${glucoseContext} glucose log`
      });
    }
    setManualNote('');
    setActiveTab('devices');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Smartphone className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Connected Devices &amp; Vitals Telemetry
              </h2>
              <p className="text-xs text-gray-500">
                Omron Bluetooth BP Cuff &bull; Bayer Contour Glucometer &bull; Manual Fallback
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'devices'
                  ? 'bg-pulse-900 text-white shadow-sm'
                  : 'bg-warm-100 text-gray-700 hover:bg-warm-200'
              }`}
            >
              Paired Devices
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'manual'
                  ? 'bg-pulse-900 text-white shadow-sm'
                  : 'bg-warm-100 text-gray-700 hover:bg-warm-200'
              }`}
            >
              + Manual Log
            </button>
          </div>
        </div>

        {/* Disclaimer on Hardware Integration */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-xs text-gray-600 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-pulse-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Illustrative Hardware Sync:</strong> Tap &ldquo;Simulate Sync&rdquo; to demonstrate realistic automated data ingestion. In this prototype, readings are simulated and stored in local browser state; real production relies on Web Bluetooth and Android Health Connect protocols.
          </div>
        </div>
      </div>

      {activeTab === 'devices' ? (
        <div className="grid md:grid-cols-2 gap-5">
          {devices.map((device) => {
            const isBp = device.category === 'blood_pressure';

            return (
              <div
                key={device.id}
                className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-pulse-50 flex items-center justify-center text-pulse-800">
                        {isBp ? <Heart className="w-5 h-5 text-pulse-700" /> : <Droplet className="w-5 h-5 text-emerald-600" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">{device.name}</h3>
                        <p className="text-[11px] text-gray-500 font-mono">{device.brandModel}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Connected</span>
                    </span>
                  </div>

                  <div className="p-3 bg-warm-50 rounded-xl border border-warm-200/80 space-y-2 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Wifi className="w-3.5 h-3.5 text-gray-400" />
                        Protocol:
                      </span>
                      <span className="font-medium text-gray-800">{device.connectionMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Battery className="w-3.5 h-3.5 text-gray-400" />
                        Battery:
                      </span>
                      <span className="font-medium text-gray-800">{device.batteryPercent}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Last Synced:</span>
                      <span className="font-mono text-gray-800">{device.lastSync}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => simulateDeviceSync(device.category)}
                  className="w-full bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Simulate Device Sync ({isBp ? 'BP Cuff' : 'Glucometer'})</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Manual Entry Form */
        <form onSubmit={handleManualSubmit} className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-warm-200 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">
              Manual Vitals Entry (Home Measurement Fallback)
            </h3>
            <span className="text-xs text-gray-400">Illustrative Demo</span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setReadingType('blood_pressure')}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                readingType === 'blood_pressure'
                  ? 'border-pulse-600 bg-pulse-50 text-pulse-900'
                  : 'border-warm-200 bg-white text-gray-600'
              }`}
            >
              Blood Pressure
            </button>
            <button
              type="button"
              onClick={() => setReadingType('blood_glucose')}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                readingType === 'blood_glucose'
                  ? 'border-pulse-600 bg-pulse-50 text-pulse-900'
                  : 'border-warm-200 bg-white text-gray-600'
              }`}
            >
              Blood Glucose
            </button>
          </div>

          {readingType === 'blood_pressure' ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Systolic (mmHg)</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Diastolic (mmHg)</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Pulse (bpm)</label>
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Glucose Level (mg/dL)</label>
                <input
                  type="number"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  className="w-full text-sm font-mono p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Timing Context</label>
                <select
                  value={glucoseContext}
                  onChange={(e) => setGlucoseContext(e.target.value as GlucoseContext)}
                  className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                >
                  <option value="fasting">Fasting (Morning before food)</option>
                  <option value="post_prandial">Post-Prandial (2 hrs post meal)</option>
                  <option value="random">Random check</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Context Note (Optional)</label>
            <input
              type="text"
              value={manualNote}
              onChange={(e) => setManualNote(e.target.value)}
              placeholder="e.g. Measured after 5 mins seated rest"
              className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('devices')}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition"
            >
              Record Reading
            </button>
          </div>
        </form>
      )}

      {/* Recent Telemetry Log */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-warm-200">
          <h3 className="font-bold text-gray-900 text-sm">Recent Readings Stream</h3>
          <span className="text-[10px] text-gray-500 font-mono">{vitals.length} Recorded Readings</span>
        </div>

        <div className="divide-y divide-warm-100">
          {vitals.slice(0, 6).map((reading) => {
            const isBp = reading.type === 'blood_pressure';

            return (
              <div key={reading.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isBp ? 'bg-pulse-50 text-pulse-800' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {isBp ? <Heart className="w-4 h-4 text-pulse-700" /> : <Droplet className="w-4 h-4 text-emerald-700" />}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 font-mono text-sm">
                      {isBp ? `${reading.systolic}/${reading.diastolic} mmHg` : `${reading.glucose} mg/dL (${reading.glucoseContext})`}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {reading.sourceLabel}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-gray-800 font-mono text-[11px]">
                    {new Date(reading.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
