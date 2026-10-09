'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  CalendarCheck
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { patient, requestAppointment } = useCare();
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-11-08');
  const [selectedTime, setSelectedTime] = useState('06:00 PM');
  const [reason, setReason] = useState('Rescheduling due to late client reviews during early November');

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestAppointment(selectedDate, selectedTime, reason);
    setShowRescheduleForm(false);
  };

  const currentApt = patient.appointment;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <Calendar className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Clinic Appointments &amp; Review Schedule
              </h2>
              <p className="text-xs text-gray-500">
                Mehta Heart &amp; Chronic Care &bull; Vijay Nagar, Indore
              </p>
            </div>
          </div>

          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            currentApt.status === 'confirmed'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {currentApt.status === 'confirmed' ? 'Visit Confirmed' : 'Reschedule Requested (Demo)'}
          </span>
        </div>

        {/* Demo Disclaimer */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200/80 text-xs text-gray-600 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-pulse-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Simulation:</strong> Appointment requests and reschedules in this prototype update the local demo state and shared thread. <em>No real clinic booking or SMS is sent to an external clinic management system.</em>
          </div>
        </div>
      </div>

      {/* Current Appointment Card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-warm-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pulse-800 bg-pulse-50 px-2.5 py-1 rounded-md border border-pulse-200">
              {currentApt.visitType}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-2">
              {new Date(currentApt.scheduledDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            <p className="text-sm font-semibold text-pulse-900 mt-0.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-pulse-700" />
              <span>{currentApt.scheduledTime} IST</span>
            </p>
          </div>

          <button
            onClick={() => setShowRescheduleForm(!showRescheduleForm)}
            className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            {showRescheduleForm ? 'Close Form' : 'Request Reschedule'}
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
            <span className="text-gray-500 flex items-center gap-1.5 mb-1">
              <Stethoscope className="w-3.5 h-3.5 text-pulse-700" />
              Clinician &amp; Facility:
            </span>
            <p className="font-bold text-gray-900">{currentApt.doctorName}</p>
            <p className="text-gray-600 mt-0.5">{currentApt.clinicName}</p>
          </div>

          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
            <span className="text-gray-500 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-pulse-700" />
              Location &amp; Access:
            </span>
            <p className="font-bold text-gray-900">AB Road, Vijay Nagar Corridor</p>
            <p className="text-gray-600 mt-0.5">Indore, Madhya Pradesh &bull; In-Person Consultation</p>
          </div>
        </div>

        {/* Clinical Prep Brief */}
        <div className="p-3.5 bg-pulse-50/70 rounded-xl border border-pulse-200 text-xs text-pulse-950">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <CalendarCheck className="w-4 h-4 text-pulse-800" />
            <span>Consultation Objective &amp; Pulse Brief:</span>
          </div>
          <p className="text-gray-700 leading-relaxed text-xs">
            {currentApt.reason}
          </p>
          {currentApt.clinicianPrepSummary && (
            <div className="mt-2 text-[11px] text-pulse-800 font-mono bg-white/80 p-2 rounded border border-pulse-200">
              {currentApt.clinicianPrepSummary}
            </div>
          )}
        </div>
      </div>

      {/* Reschedule Form (Conditional) */}
      {showRescheduleForm && (
        <form onSubmit={handleRescheduleSubmit} className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-warm-200 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">
              Request Appointment Reschedule with Dr. Mehta
            </h3>
            <span className="text-xs text-gray-400">Demo Action</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Preferred Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
              >
                <option value="10:30 AM">10:30 AM (Morning Slot)</option>
                <option value="12:00 PM">12:00 PM (Noon Slot)</option>
                <option value="05:30 PM">05:30 PM (Evening Slot)</option>
                <option value="06:30 PM">06:30 PM (Evening Post-Work)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Reason for Reschedule Request
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Work travel to Pune or late client meetings"
              className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRescheduleForm(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition"
            >
              Submit Reschedule Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
