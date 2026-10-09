'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { 
  MessageSquare, 
  Send, 
  User, 
  Stethoscope, 
  Sparkles, 
  ShieldAlert, 
  Lock, 
  CheckCircle2,
  Calendar,
  Info
} from 'lucide-react';

export const MessagesThread: React.FC = () => {
  const { messages, sendPatientMessage } = useCare();
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  // FILTER OUT ANY CARE-TEAM-ONLY NOTES!
  // CRITICAL ACCEPTANCE CRITERIA: A care-team-only note must NEVER appear in the patient history!
  const patientVisibleMessages = messages
    .filter(m => !m.isCareTeamOnly)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendPatientMessage(inputText, inputTitle || undefined);
    setInputText('');
    setInputTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Thread Header & Explicit Demo Notice */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pulse-50 text-pulse-800">
              <MessageSquare className="w-5 h-5 text-pulse-700" />
            </span>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Messages &amp; Shared Care Updates
              </h2>
              <p className="text-xs text-gray-500">
                Shared continuity thread with Dr. Mehta &bull; Mehta Heart &amp; Chronic Care, Indore
              </p>
            </div>
          </div>

          <span className="text-xs font-mono bg-warm-100 text-gray-700 px-3 py-1 rounded-full border border-warm-200">
            {patientVisibleMessages.length} Shared Updates
          </span>
        </div>

        {/* Demo Storage & Non-Emergency Notice */}
        <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Demonstration Notice:</strong> Messages and care updates in this prototype are stored in your browser&apos;s local demo storage. They are <em>not</em> transmitted to a real hospital, clinician, or emergency dispatch. For urgent clinical assistance in Indore, call 108 or visit an emergency department.
          </div>
        </div>
      </div>

      {/* Message Timeline */}
      <div className="space-y-4">
        {patientVisibleMessages.map((msg) => {
          const isFromDoctor = msg.senderRole === 'doctor';
          const isFromSystem = msg.senderRole === 'system';
          const isFromPatient = msg.senderRole === 'patient';

          return (
            <div
              key={msg.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isFromDoctor
                  ? 'bg-pulse-50/40 border-pulse-200 ml-0 sm:mr-8'
                  : isFromSystem
                    ? 'bg-warm-50 border-warm-200 mx-2 sm:mx-6'
                    : 'bg-white border-warm-200 ml-0 sm:ml-8 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isFromDoctor 
                      ? 'bg-pulse-800 text-white' 
                      : isFromSystem 
                        ? 'bg-pulse-200 text-pulse-900' 
                        : 'bg-warm-200 text-gray-800'
                  }`}>
                    {isFromDoctor ? <Stethoscope className="w-4 h-4" /> : isFromSystem ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span>{msg.senderName}</span>
                      {isFromDoctor && (
                        <span className="text-[10px] bg-pulse-100 text-pulse-800 px-2 py-0.2 rounded-full font-medium">
                          Clinician
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {new Date(msg.timestamp).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                {msg.tags && msg.tags.length > 0 && (
                  <div className="flex gap-1">
                    {msg.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-white border border-warm-200 text-gray-600 px-2 py-0.5 rounded font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {msg.title && (
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {msg.title}
                </h4>
              )}

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Message Composer for Saira */}
      <form onSubmit={handleSend} className="bg-white rounded-2xl border border-warm-200 p-4 sm:p-5 shadow-soft space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-warm-100">
          <User className="w-4 h-4 text-pulse-700" />
          <h3 className="font-bold text-xs text-gray-900">
            Send Care Update or Routine Note to Dr. Mehta
          </h3>
        </div>

        <input
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Topic (e.g. Question about morning walking time or medicine refill)"
          className="w-full text-xs p-2.5 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
        />

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write your note here... (e.g. Morning medication is consistent. Wondering if I can walk in 2 segments on busy days?)"
          rows={3}
          className="w-full text-xs p-3 rounded-xl border border-warm-300 focus:ring-2 focus:ring-pulse-500 focus:outline-none"
          required
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-gray-400">
            Will be visible in Dr. Mehta&apos;s workspace on next sync
          </span>

          <button
            type="submit"
            className="bg-pulse-800 hover:bg-pulse-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};
