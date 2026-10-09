'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Role, 
  PatientProfile, 
  VitalsReading, 
  CareMessage, 
  ConnectedDevice,
  PilotMetricSummary,
  BarrierCategory,
  CarePlanAction,
  PrivacySettings
} from '@/types';
import { 
  INITIAL_PATIENT, 
  INITIAL_VITALS, 
  INITIAL_MESSAGES, 
  INITIAL_DEVICES, 
  CLINIC_PATIENTS_LIST,
  PILOT_OUTCOME_SUMMARY 
} from '@/data/seedData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CareContextType {
  role: Role;
  setRole: (role: Role) => void;
  patient: PatientProfile;
  selectedClinicPatientId: string;
  setSelectedClinicPatientId: (id: string) => void;
  clinicPatients: PatientProfile[];
  vitals: VitalsReading[];
  messages: CareMessage[];
  devices: ConnectedDevice[];
  pilotMetrics: PilotMetricSummary;
  toastNotification: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: () => void;
  
  // Patient interactions
  toggleCareAction: (actionId: string, dateStr?: string) => void;
  logBarrier: (category: BarrierCategory, userNote: string, shareWithDoctor: boolean) => void;
  acceptAdaptation: (barrierId: string) => void;
  declineAdaptation: (barrierId: string) => void;
  addVitalsReading: (reading: Omit<VitalsReading, 'id'>) => void;
  simulateDeviceSync: (deviceCategory: 'blood_pressure' | 'blood_glucose') => void;
  sendPatientMessage: (content: string, title?: string) => void;
  requestAppointment: (date: string, time: string, reason: string) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;

  // Clinician interactions
  sendDoctorUpdate: (content: string, title?: string) => void;
  addCareTeamOnlyNote: (note: string) => void;
  updateCarePlanByDoctor: (
    systolicTarget: number, 
    diastolicTarget: number, 
    actions: CarePlanAction[], 
    doctorSummaryNote: string
  ) => void;
  
  // System / Demo reset
  resetToDemoDefaults: () => void;
}

const STORAGE_KEY = 'pulse_continuity_app_state_v1';

const CareContext = createContext<CareContextType | undefined>(undefined);

export function CareProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>('patient');
  const [patient, setPatient] = useState<PatientProfile>(INITIAL_PATIENT);
  const [selectedClinicPatientId, setSelectedClinicPatientId] = useState<string>('patient_saira_01');
  const [clinicPatients, setClinicPatients] = useState<PatientProfile[]>(CLINIC_PATIENTS_LIST);
  const [vitals, setVitals] = useState<VitalsReading[]>(INITIAL_VITALS);
  const [messages, setMessages] = useState<CareMessage[]>(INITIAL_MESSAGES);
  const [devices, setDevices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);
  const [pilotMetrics] = useState<PilotMetricSummary>(PILOT_OUTCOME_SUMMARY);
  const [toastNotification, setToastNotification] = useState<ToastNotification | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.patient) setPatient(parsed.patient);
        if (parsed.vitals) setVitals(parsed.vitals);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.devices) setDevices(parsed.devices);
        if (parsed.clinicPatients) setClinicPatients(parsed.clinicPatients);
        if (parsed.role) setRoleState(parsed.role);
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        role,
        patient,
        clinicPatients,
        vitals,
        messages,
        devices
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not persist state to localStorage', e);
    }
  }, [role, patient, clinicPatients, vitals, messages, devices, isLoaded]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToastNotification({ id, message, type });
    setTimeout(() => {
      setToastNotification((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const dismissToast = () => {
    setToastNotification(null);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    showToast(`Switched to ${newRole === 'patient' ? 'Patient Workspace (Saira)' : 'Clinician Workspace (Dr. Mehta)'}`, 'info');
  };

  const toggleCareAction = (actionId: string, dateStr: string = '2026-10-09') => {
    setPatient((prev) => {
      const updatedActions = prev.actions.map((act) => {
        if (act.id !== actionId) return act;
        const exists = act.completedDates.includes(dateStr);
        const newDates = exists 
          ? act.completedDates.filter(d => d !== dateStr)
          : [...act.completedDates, dateStr];
        return { ...act, completedDates: newDates };
      });
      return { ...prev, actions: updatedActions };
    });
    showToast('Care action status updated for today', 'success');
  };

  const logBarrier = (category: BarrierCategory, userNote: string, shareWithDoctor: boolean) => {
    const labels: Record<BarrierCategory, string> = {
      work_schedule: 'Work schedule & late shifts',
      family_responsibilities: 'Family caregiving & home routine',
      travel: 'Transit & out-of-city travel',
      sleep_energy: 'Sleep fatigue & low energy',
      medication_hesitancy: 'Medication timing friction',
      other: 'Other routine friction'
    };

    const adaptationTemplates: Record<BarrierCategory, { title: string; rationale: string; proposedSchedule: string; actionId: string }> = {
      work_schedule: {
        title: 'Move 20-min brisk walk to early morning slot (6:30 AM)',
        rationale: 'Protect movement before work emails and evening client meetings start. Keeps clinician 20-min aerobic prescription 100% intact.',
        proposedSchedule: '06:30 AM before school run',
        actionId: 'act_movement_walk'
      },
      family_responsibilities: {
        title: 'Split movement into two 10-min post-meal intervals',
        rationale: 'Fit two short 10-min strolls after lunch and after family dinner without interfering with evening cooking.',
        proposedSchedule: '10 min at 2:00 PM + 10 min at 9:00 PM',
        actionId: 'act_movement_walk'
      },
      travel: {
        title: 'Set pocket-strip reminder with commute water bottle',
        rationale: 'Pair midday routine with travel kit. Preserves doctor-directed dosing without missing transit windows.',
        proposedSchedule: 'Anchor to morning departure',
        actionId: 'act_med_morning'
      },
      sleep_energy: {
        title: 'Anchor wind-down routine 30 mins before sleep',
        rationale: 'Shift resting vitals check to morning post-rest to avoid evening fatigue confounders.',
        proposedSchedule: '07:30 AM resting window',
        actionId: 'act_vitals_bp_check'
      },
      medication_hesitancy: {
        title: 'Align dose with morning family breakfast',
        rationale: 'Avoid empty stomach nausea by pairing Telmisartan/Amlodipine with breakfast poha/toast.',
        proposedSchedule: '08:15 AM post-breakfast',
        actionId: 'act_med_morning'
      },
      other: {
        title: 'Adjust reminder notification interval',
        rationale: 'Gentle nudge 15 minutes ahead of scheduled care action.',
        proposedSchedule: 'Custom flexible slot',
        actionId: 'act_movement_walk'
      }
    };

    const template = adaptationTemplates[category];
    const newBarrierId = 'bar_' + Date.now();

    const newBarrier = {
      id: newBarrierId,
      timestamp: new Date().toISOString(),
      barrierCategory: category,
      barrierLabel: labels[category],
      userNote: userNote || `Experienced routine friction around ${labels[category]}.`,
      sharedWithDoctor: shareWithDoctor,
      suggestedAdaptation: {
        id: 'adapt_' + Date.now(),
        title: template.title,
        rationale: template.rationale,
        actionId: template.actionId,
        proposedSchedule: template.proposedSchedule,
        preservesClinicalGoal: true,
        status: 'pending' as const
      }
    };

    setPatient((prev) => ({
      ...prev,
      barrierLogs: [newBarrier, ...prev.barrierLogs]
    }));

    showToast('Check-in saved. Practical routine adaptation suggested below.', 'success');
  };

  const acceptAdaptation = (barrierId: string) => {
    let adaptationTitle = '';
    let targetActionId = '';
    let proposedSchedule = '';

    setPatient((prev) => {
      const updatedLogs = prev.barrierLogs.map((b) => {
        if (b.id !== barrierId) return b;
        adaptationTitle = b.suggestedAdaptation.title;
        targetActionId = b.suggestedAdaptation.actionId;
        proposedSchedule = b.suggestedAdaptation.proposedSchedule;
        return {
          ...b,
          suggestedAdaptation: {
            ...b.suggestedAdaptation,
            status: 'accepted' as const,
            appliedDate: new Date().toISOString()
          },
          outcomeAfterDays: 'Routine adaptation activated. Preserves clinician target while shifting everyday schedule.'
        };
      });

      const updatedActions = prev.actions.map((act) => {
        if (act.id !== targetActionId) return act;
        return {
          ...act,
          frequency: proposedSchedule ? `Daily (${proposedSchedule})` : act.frequency,
          adaptationNote: `Routine schedule adapted via Pulse: ${adaptationTitle}. Doctor medical goal preserved.`
        };
      });

      return {
        ...prev,
        barrierLogs: updatedLogs,
        actions: updatedActions
      };
    });

    // Add shared care update message
    const adaptationMsg: CareMessage = {
      id: 'msg_adapt_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'system',
      senderRole: 'system',
      senderName: 'Pulse Routine Adaptation',
      type: 'routine_adaptation',
      title: 'Routine Adaptation Applied',
      content: `Saira accepted routine adaptation: "${adaptationTitle}". Schedule updated to ${proposedSchedule || 'adjusted slot'}. Note: Doctor's clinical goal remains strictly unchanged.`,
      tags: ['Routine Adaptation', 'Patient Accepted'],
      isCareTeamOnly: false
    };

    setMessages((prev) => [adaptationMsg, ...prev]);
    showToast('Adaptation accepted! Routine updated; doctor clinical goal unchanged.', 'success');
  };

  const declineAdaptation = (barrierId: string) => {
    setPatient((prev) => ({
      ...prev,
      barrierLogs: prev.barrierLogs.map((b) => 
        b.id === barrierId 
          ? { ...b, suggestedAdaptation: { ...b.suggestedAdaptation, status: 'declined' as const } } 
          : b
      )
    }));
    showToast('Adaptation dismissed. Current care plan schedule maintained.', 'info');
  };

  const addVitalsReading = (readingData: Omit<VitalsReading, 'id'>) => {
    const newReading: VitalsReading = {
      ...readingData,
      id: 'v_' + Date.now()
    };
    setVitals((prev) => [newReading, ...prev]);

    // Update patient current avg if BP
    if (newReading.type === 'blood_pressure' && newReading.systolic) {
      setPatient((prev) => ({
        ...prev,
        currentSystolicAvg: Math.round((prev.currentSystolicAvg * 4 + (newReading.systolic || 132)) / 5),
        currentDiastolicAvg: Math.round((prev.currentDiastolicAvg * 4 + (newReading.diastolic || 83)) / 5)
      }));
    }

    showToast(`Reading recorded: ${readingData.type === 'blood_pressure' ? `${readingData.systolic}/${readingData.diastolic} mmHg` : `${readingData.glucose} mg/dL`}`, 'success');
  };

  const simulateDeviceSync = (category: 'blood_pressure' | 'blood_glucose') => {
    const now = new Date();
    if (category === 'blood_pressure') {
      // Simulate realistic systolic around 130-133
      const sys = Math.floor(Math.random() * 4) + 130;
      const dia = Math.floor(Math.random() * 3) + 81;
      const pulse = Math.floor(Math.random() * 6) + 70;
      
      const newReading: VitalsReading = {
        id: 'v_sync_' + Date.now(),
        timestamp: now.toISOString(),
        type: 'blood_pressure',
        systolic: sys,
        diastolic: dia,
        pulse: pulse,
        source: 'omron_sync',
        sourceLabel: 'Omron HEM-7156T (Simulated sync)',
        isSimulated: true,
        notes: 'Simulated automatic Bluetooth cuff sync. Demo data.'
      };
      setVitals((prev) => [newReading, ...prev]);
      
      // Update device last sync
      setDevices((prev) => prev.map(d => d.category === 'blood_pressure' ? { ...d, lastSync: 'Just now', status: 'connected' } : d));
      
      showToast(`Device Sync Complete: ${sys}/${dia} mmHg synced from Omron BP cuff`, 'success');
    } else {
      const gluc = Math.floor(Math.random() * 6) + 101;
      const newReading: VitalsReading = {
        id: 'g_sync_' + Date.now(),
        timestamp: now.toISOString(),
        type: 'blood_glucose',
        glucose: gluc,
        glucoseContext: 'fasting',
        source: 'contour_sync',
        sourceLabel: 'Contour TS Plus (Simulated sync)',
        isSimulated: true,
        notes: 'Simulated NFC glucometer tap. Fasting glucose demo.'
      };
      setVitals((prev) => [newReading, ...prev]);

      setDevices((prev) => prev.map(d => d.category === 'blood_glucose' ? { ...d, lastSync: 'Just now', status: 'connected' } : d));

      showToast(`Device Sync Complete: Fasting glucose ${gluc} mg/dL synced`, 'success');
    }
  };

  const sendPatientMessage = (content: string, title?: string) => {
    const newMsg: CareMessage = {
      id: 'msg_pat_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'saira',
      senderRole: 'patient',
      senderName: 'Saira',
      type: 'patient_message',
      title: title || 'Patient Update',
      content: content.trim(),
      tags: ['Patient Message'],
      isCareTeamOnly: false
    };

    setMessages((prev) => [newMsg, ...prev]);
    showToast('Message posted to shared care thread (Demo browser storage)', 'success');
  };

  const sendDoctorUpdate = (content: string, title: string = 'Clinician Review & Update') => {
    const newMsg: CareMessage = {
      id: 'msg_doc_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'dr_mehta',
      senderRole: 'doctor',
      senderName: 'Dr. Aniruddh Mehta, MD',
      type: 'clinician_review',
      title,
      content: content.trim(),
      tags: ['Clinician Review', 'Shared Update'],
      isCareTeamOnly: false
    };

    setMessages((prev) => [newMsg, ...prev]);
    showToast('Clinician update sent to Saira (visible in shared thread)', 'success');
  };

  const addCareTeamOnlyNote = (note: string) => {
    const formatted = `${new Date().toISOString().split('T')[0]} (Private Clinician Note): ${note.trim()}`;
    setPatient((prev) => ({
      ...prev,
      careTeamNotes: [formatted, ...prev.careTeamNotes]
    }));

    // Also optionally append to messages with isCareTeamOnly: true
    const privateMsg: CareMessage = {
      id: 'msg_priv_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'dr_mehta',
      senderRole: 'doctor',
      senderName: 'Dr. Aniruddh Mehta, MD',
      type: 'clinician_review',
      title: 'Private Care-Team Note',
      content: note.trim(),
      tags: ['Care-Team Only', 'Private Note'],
      isCareTeamOnly: true // STRICT PRIVACY BOUNDARY
    };
    setMessages((prev) => [privateMsg, ...prev]);

    showToast('Private care-team note saved (strictly hidden from patient)', 'warning');
  };

  const updateCarePlanByDoctor = (
    systolicTarget: number, 
    diastolicTarget: number, 
    actions: CarePlanAction[], 
    doctorSummaryNote: string
  ) => {
    setPatient((prev) => ({
      ...prev,
      clinicianTarget: {
        ...prev.clinicianTarget,
        systolicTarget,
        diastolicTarget,
        setDate: new Date().toISOString().split('T')[0]
      },
      actions: actions
    }));

    // Append a shared care update message visible to patient
    const updateMsg: CareMessage = {
      id: 'msg_plan_upd_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'dr_mehta',
      senderRole: 'doctor',
      senderName: 'Dr. Aniruddh Mehta, MD',
      type: 'care_plan_update',
      title: 'Care Plan Updated by Clinician',
      content: doctorSummaryNote || `Dr. Mehta updated your care plan. Clinician target updated to <${systolicTarget}/${diastolicTarget} mmHg. Actions and timings reviewed for clinical suitability.`,
      tags: ['Care Plan Change', 'Doctor Approved'],
      isCareTeamOnly: false
    };

    setMessages((prev) => [updateMsg, ...prev]);
    showToast('Care plan saved and patient-visible update posted to care thread!', 'success');
  };

  const requestAppointment = (date: string, time: string, reason: string) => {
    setPatient((prev) => ({
      ...prev,
      appointment: {
        ...prev.appointment,
        scheduledDate: date,
        scheduledTime: time,
        reason: reason,
        status: 'requested_reschedule'
      }
    }));

    const apptMsg: CareMessage = {
      id: 'msg_appt_' + Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'saira',
      senderRole: 'patient',
      senderName: 'Saira',
      type: 'patient_message',
      title: 'Appointment Reschedule Request',
      content: `Requested visit reschedule to ${date} at ${time}. Reason: ${reason}. (Demo: No real clinic booking transmitted)`,
      tags: ['Appointment Request'],
      isCareTeamOnly: false
    };

    setMessages((prev) => [apptMsg, ...prev]);
    showToast('Appointment request logged in demo mode', 'info');
  };

  const updatePrivacySettings = (settings: Partial<PrivacySettings>) => {
    setPatient((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...settings }
    }));
    showToast('Privacy and sharing consent updated', 'success');
  };

  const resetToDemoDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPatient(INITIAL_PATIENT);
    setVitals(INITIAL_VITALS);
    setMessages(INITIAL_MESSAGES);
    setDevices(INITIAL_DEVICES);
    setClinicPatients(CLINIC_PATIENTS_LIST);
    setRoleState('patient');
    showToast('Demo data reset to clean initial baseline', 'info');
  };

  return (
    <CareContext.Provider
      value={{
        role,
        setRole,
        patient,
        selectedClinicPatientId,
        setSelectedClinicPatientId,
        clinicPatients,
        vitals,
        messages,
        devices,
        pilotMetrics,
        toastNotification,
        showToast,
        dismissToast,
        toggleCareAction,
        logBarrier,
        acceptAdaptation,
        declineAdaptation,
        addVitalsReading,
        simulateDeviceSync,
        sendPatientMessage,
        requestAppointment,
        updatePrivacySettings,
        sendDoctorUpdate,
        addCareTeamOnlyNote,
        updateCarePlanByDoctor,
        resetToDemoDefaults
      }}
    >
      {children}
    </CareContext.Provider>
  );
}

export function useCare() {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCare must be used within a CareProvider');
  }
  return context;
}
