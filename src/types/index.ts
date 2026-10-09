export type Role = 'patient' | 'doctor';

export type VitalType = 'blood_pressure' | 'blood_glucose';
export type VitalSource = 'omron_sync' | 'contour_sync' | 'manual_entry' | 'clinic_visit';
export type GlucoseContext = 'fasting' | 'post_prandial' | 'random';

export interface VitalsReading {
  id: string;
  timestamp: string; // ISO string
  type: VitalType;
  systolic?: number;
  diastolic?: number;
  pulse?: number;
  glucose?: number;
  glucoseContext?: GlucoseContext;
  source: VitalSource;
  sourceLabel: string;
  isSimulated: boolean;
  notes?: string;
  reviewedByClinician?: boolean;
}

export interface ClinicianTarget {
  systolicTarget: number; // e.g. 128 mmHg
  systolicUpperLimit: number; // e.g. 135 mmHg
  diastolicTarget: number; // e.g. 80 mmHg
  fastingGlucoseTarget?: number; // e.g. 100 mg/dL
  postPrandialGlucoseTarget?: number; // e.g. 140 mg/dL
  setBy: string; // "Dr. Aniruddh Mehta, MD"
  clinicName: string; // "Mehta Heart & Chronic Care, Vijay Nagar, Indore"
  setDate: string;
  targetPeriodDays: number; // 90
  clinicalRationale: string;
}

export type ActionCategory = 'medication' | 'movement' | 'nutrition' | 'monitoring' | 'stress';

export interface CarePlanAction {
  id: string;
  title: string;
  category: ActionCategory;
  frequency: string;
  scheduledTime: string;
  doctorInstructions: string;
  isDoctorPrescribed: boolean; // Clinical goal owned by clinician
  routineSupportTip?: string; // Pulse behavioral scaffolding
  adaptationNote?: string;
  completedDates: string[]; // ['2026-10-09', ...]
  isActive: boolean;
}

export type BarrierCategory = 
  | 'work_schedule'
  | 'family_responsibilities'
  | 'travel'
  | 'sleep_energy'
  | 'medication_hesitancy'
  | 'other';

export interface SuggestedAdaptation {
  id: string;
  title: string;
  rationale: string;
  actionId: string;
  proposedSchedule: string;
  preservesClinicalGoal: boolean;
  status: 'pending' | 'accepted' | 'declined';
  appliedDate?: string;
}

export interface RoutineBarrierLog {
  id: string;
  timestamp: string;
  barrierCategory: BarrierCategory;
  barrierLabel: string;
  userNote: string;
  sharedWithDoctor: boolean;
  suggestedAdaptation: SuggestedAdaptation;
  outcomeAfterDays?: string; // e.g., "Completion rebounded from 40% to 85% over subsequent 14 days"
}

export type MessageType = 
  | 'patient_message' 
  | 'clinician_review' 
  | 'care_plan_update' 
  | 'routine_adaptation';

export interface CareMessage {
  id: string;
  timestamp: string;
  sender: 'saira' | 'dr_mehta' | 'system';
  senderRole: 'patient' | 'doctor' | 'system';
  senderName: string;
  type: MessageType;
  title?: string;
  content: string;
  tags?: string[];
  isCareTeamOnly: boolean; // CRITICAL PRIVACY: TRUE = DOCTOR ONLY, NEVER VISIBLE TO PATIENT
}

export interface ConnectedDevice {
  id: string;
  name: string;
  brandModel: string;
  category: VitalType;
  status: 'connected' | 'standby' | 'syncing' | 'disconnected';
  lastSync: string;
  batteryPercent: number;
  connectionMethod: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  clinicName: string;
  scheduledDate: string; // ISO date or formatted
  scheduledTime: string;
  status: 'confirmed' | 'requested_reschedule' | 'completed';
  visitType: '90-Day Comprehensive Review' | 'Routine Vitals Check' | 'Medication Review';
  reason: string;
  clinicianPrepSummary?: string;
}

export interface PrivacySettings {
  shareRoutineCompletion: boolean;
  shareBarrierLogs: boolean;
  shareDeviceReadings: boolean;
  shareFamilySupportInvolvement: boolean;
  allowDeidentifiedResearchCohort: boolean;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  baselineSystolic: number;
  baselineDiastolic: number;
  baselineDate: string;
  currentSystolicAvg: number;
  currentDiastolicAvg: number;
  day90ContinuationStatus: 'active' | 'at_risk' | 'discontinued';
  enrollmentDate: string;
  occupation: string;
  familyContext: string;
  clinicianTarget: ClinicianTarget;
  actions: CarePlanAction[];
  barrierLogs: RoutineBarrierLog[];
  appointment: Appointment;
  privacy: PrivacySettings;
  careTeamNotes: string[]; // Strictly clinician only
  lastReviewedDate?: string;
  reviewStatus: 'needs_review' | 'stable' | 'attention_required';
  reviewReason?: string;
}

export interface PilotMetricSummary {
  pilotCohortSize: number;
  meanSystolicDelta: string; // e.g. "-6.8 mmHg"
  targetAttainmentRate: string; // e.g. "68% reached <130 mmHg"
  carePlanCompletionAverage: string; // e.g. "76% daily routine actions"
  day90ContinuationRate: string; // e.g. "82% active at 90 days vs 12% industry benchmark"
  isIllustrative: boolean;
  validationRequirements: string[];
}
