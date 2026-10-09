'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastNotification, dismissToast } = useCare();

  if (!toastNotification) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-pulse-700 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    warning: 'bg-amber-50 border-amber-300 text-amber-950',
    info: 'bg-pulse-50 border-pulse-300 text-pulse-950',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-xl border shadow-elevated flex items-start gap-3 ${bgStyles[toastNotification.type]}`}>
        {icons[toastNotification.type]}
        <div className="flex-1 text-xs leading-relaxed font-medium">
          {toastNotification.message}
        </div>
        <button
          onClick={dismissToast}
          className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
