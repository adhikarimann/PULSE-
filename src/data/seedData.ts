import { 
  PatientProfile, 
  VitalsReading, 
  CareMessage, 
  ConnectedDevice,
  PilotMetricSummary
} from '@/types';

export const INITIAL_PATIENT: PatientProfile = {
  id: 'patient_saira_01',
  name: 'Saira',
  age: 42,
  gender: 'Female',
  location: 'Vijay Nagar, Indore, Madhya Pradesh',
  primaryDiagnosis: 'Essential Hypertension (Stage 1)',
  secondaryDiagnosis: 'Impaired Fasting Glucose (Early Pre-diabetes)',
  baselineSystolic: 142,
  baselineDiastolic: 91,
  baselineDate: '2026-08-01',
  currentSystolicAvg: 132,
  currentDiastolicAvg: 83,
  day90ContinuationStatus: 'active',
  enrollmentDate: '2026-08-01',
  occupation: 'Senior Logistics Operations Manager',
  familyContext: 'Mother of two (ages 12 and 8); lives in joint family with mother-in-law; manages daily family dinner prep and school schedules.',
  clinicianTarget: {
    systolicTarget: 128,
    systolicUpperLimit: 135,
    diastolicTarget: 80,
    fastingGlucoseTarget: 100,
    postPrandialGlucoseTarget: 140,
    setBy: 'Dr. Aniruddh Mehta, MD (Medicine)',
    clinicName: 'Mehta Heart & Chronic Care, Vijay Nagar, Indore',
    setDate: '2026-08-01',
    targetPeriodDays: 90,
    clinicalRationale: 'Goal is sustained ambulatory systolic BP < 130 mmHg over 90 days to prevent progression to Stage 2 and avert microvascular strain.'
  },
  actions: [
    {
      id: 'act_med_morning',
      title: 'Morning Antihypertensive Dose',
      category: 'medication',
      frequency: 'Daily at 8:00 AM',
      scheduledTime: '08:00 AM',
      doctorInstructions: 'Telmisartan 40mg + Amlodipine 5mg. Take after light breakfast with water.',
      isDoctorPrescribed: true,
      routineSupportTip: 'Pulse reminder synced with post-chai breakfast routine.',
      completedDates: ['2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09'],
      isActive: true
    },
    {
      id: 'act_movement_walk',
      title: '20-Minute Brisk Walk',
      category: 'movement',
      frequency: 'Daily (Adapted to 6:30 AM)',
      scheduledTime: '06:30 AM',
      doctorInstructions: 'Prescribed 20 minutes moderate aerobic movement daily to improve endothelial vascular tone.',
      isDoctorPrescribed: true,
      routineSupportTip: 'Adapted from 8:30 PM to 6:30 AM before school bus arrival to avoid evening work call clashes.',
      adaptationNote: 'Schedule adapted on Sep 18 following barrier check-in. Clinical goal of 20 min preserved.',
      completedDates: ['2026-10-05', '2026-10-07', '2026-10-08', '2026-10-09'],
      isActive: true
    },
    {
      id: 'act_nutrition_sodium',
      title: 'Low-Sodium Meal Routine',
      category: 'nutrition',
      frequency: 'Lunch & Dinner',
      scheduledTime: '01:30 PM & 08:30 PM',
      doctorInstructions: 'Limit added salt to < 4g/day. Avoid papad, pickles (achar), and processed snacks (sev/namkeen).',
      isDoctorPrescribed: true,
      routineSupportTip: 'Family curry cooked with standard spices; portion set aside before extra table salt is added.',
      completedDates: ['2026-10-07', '2026-10-08', '2026-10-09'],
      isActive: true
    },
    {
      id: 'act_vitals_bp_check',
      title: 'Morning BP Reading (Resting)',
      category: 'monitoring',
      frequency: '3x Weekly (Mon, Wed, Fri)',
      scheduledTime: '07:30 AM',
      doctorInstructions: 'Sit quietly for 5 minutes before cuff reading. Take 2 readings 1 minute apart.',
      isDoctorPrescribed: true,
      routineSupportTip: 'Paired with Omron Bluetooth cuff for automatic tap sync.',
      completedDates: ['2026-10-05', '2026-10-07', '2026-10-09'],
      isActive: true
    },
    {
      id: 'act_glucose_biweekly',
      title: 'Fasting Blood Glucose Check',
      category: 'monitoring',
      frequency: 'Alternate Sundays',
      scheduledTime: '07:45 AM',
      doctorInstructions: 'Monitor pre-diabetes fasting level. Target < 100 mg/dL.',
      isDoctorPrescribed: true,
      routineSupportTip: 'Keep test strips and lancet near the morning tea counter.',
      completedDates: ['2026-09-28'],
      isActive: true
    }
  ],
  barrierLogs: [
    {
      id: 'bar_01',
      timestamp: '2026-09-18T20:45:00.000Z',
      barrierCategory: 'work_schedule',
      barrierLabel: 'Late client calls & dinner delay',
      userNote: 'End-of-quarter client meetings often stretch past 9:00 PM. By the time dinner is finished, I have zero energy to walk and collapse into bed.',
      sharedWithDoctor: true,
      suggestedAdaptation: {
        id: 'adapt_01',
        title: 'Shift walking routine to 6:30 AM morning window',
        rationale: 'Moving the 20-minute walk to morning before school bus routine avoids unpredictable evening office overruns while keeping doctor-set aerobic target intact.',
        actionId: 'act_movement_walk',
        proposedSchedule: '06:30 AM Daily',
        preservesClinicalGoal: true,
        status: 'accepted',
        appliedDate: '2026-09-19'
      },
      outcomeAfterDays: 'Walk completion rose from 38% in early Sept to 84% in late Sept/early Oct. Systolic average reduced by 4 mmHg in subsequent 3 weeks.'
    }
  ],
  appointment: {
    id: 'apt_90_review',
    doctorName: 'Dr. Aniruddh Mehta, MD',
    clinicName: 'Mehta Heart & Chronic Care, Vijay Nagar, Indore',
    scheduledDate: '2026-11-04',
    scheduledTime: '05:30 PM',
    status: 'confirmed',
    visitType: '90-Day Comprehensive Review',
    reason: 'Formal 90-day clinical outcome review: ambulatory BP trajectory, HbA1c review, and medication titration decision.',
    clinicianPrepSummary: 'Pulse will generate a 1-page continuity brief summarizing 90-day BP distribution, routine adherence, and verified routine barriers.'
  },
  privacy: {
    shareRoutineCompletion: true,
    shareBarrierLogs: true,
    shareDeviceReadings: true,
    shareFamilySupportInvolvement: true,
    allowDeidentifiedResearchCohort: false
  },
  careTeamNotes: [
    '2026-08-01 (In-clinic baseline): Saira presents with 142/91 mmHg resting BP. Stress markers elevated due to work + caregiving. Started Telmisartan 40mg + Amlodipine 5mg. Advised non-pharmacologic lifestyle support via Pulse continuity tool.',
    '2026-09-20 (Asynchronous review): Reviewed reported barrier regarding late work calls. Patient accepted routine shift to 6:30 AM walk. Excellent behavioral self-awareness. No medication change required at this stage.',
    '2026-10-05 (Clinical prep note): 60-day trend shows sustained reduction from 142 down to ~132 mmHg. If trend persists through Day 90 review, maintain monotherapy/dual low-dose without titration. Order HbA1c and lipid panel 5 days before Nov 4 visit.'
  ],
  lastReviewedDate: '2026-10-05',
  reviewStatus: 'stable',
  reviewReason: 'Steady systolic improvement observed over 60 days. Routine adherence stable at 78%.'
};

export const INITIAL_VITALS: VitalsReading[] = [
  {
    id: 'v_01',
    timestamp: '2026-08-01T09:30:00.000Z',
    type: 'blood_pressure',
    systolic: 142,
    diastolic: 91,
    pulse: 78,
    source: 'clinic_visit',
    sourceLabel: 'In-Clinic Sphygmomanometer (Dr. Mehta)',
    isSimulated: false,
    notes: 'Baseline enrollment reading. Clinician verified.'
  },
  {
    id: 'v_02',
    timestamp: '2026-08-08T07:40:00.000Z',
    type: 'blood_pressure',
    systolic: 140,
    diastolic: 89,
    pulse: 76,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true,
    notes: 'Morning resting reading.'
  },
  {
    id: 'v_03',
    timestamp: '2026-08-15T07:35:00.000Z',
    type: 'blood_pressure',
    systolic: 139,
    diastolic: 88,
    pulse: 74,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'v_04',
    timestamp: '2026-08-22T07:45:00.000Z',
    type: 'blood_pressure',
    systolic: 138,
    diastolic: 87,
    pulse: 75,
    source: 'manual_entry',
    sourceLabel: 'Manual Log (Home cuff)',
    isSimulated: true
  },
  {
    id: 'v_05',
    timestamp: '2026-08-30T07:30:00.000Z',
    type: 'blood_pressure',
    systolic: 138,
    diastolic: 86,
    pulse: 73,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'v_06',
    timestamp: '2026-09-07T07:40:00.000Z',
    type: 'blood_pressure',
    systolic: 139,
    diastolic: 87,
    pulse: 79,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true,
    notes: 'Reported high work stress this week.'
  },
  {
    id: 'v_07',
    timestamp: '2026-09-14T07:30:00.000Z',
    type: 'blood_pressure',
    systolic: 137,
    diastolic: 86,
    pulse: 75,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'v_08',
    timestamp: '2026-09-21T07:35:00.000Z',
    type: 'blood_pressure',
    systolic: 135,
    diastolic: 85,
    pulse: 72,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true,
    notes: 'First week following routine walk timing shift to 6:30 AM.'
  },
  {
    id: 'v_09',
    timestamp: '2026-09-28T07:40:00.000Z',
    type: 'blood_pressure',
    systolic: 133,
    diastolic: 84,
    pulse: 71,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'v_10',
    timestamp: '2026-10-02T07:30:00.000Z',
    type: 'blood_pressure',
    systolic: 134,
    diastolic: 84,
    pulse: 73,
    source: 'manual_entry',
    sourceLabel: 'Manual Log (Home cuff)',
    isSimulated: true
  },
  {
    id: 'v_11',
    timestamp: '2026-10-05T07:30:00.000Z',
    type: 'blood_pressure',
    systolic: 132,
    diastolic: 83,
    pulse: 70,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true,
    notes: 'Consistent morning routine for 2 weeks.'
  },
  {
    id: 'v_12',
    timestamp: '2026-10-07T07:45:00.000Z',
    type: 'blood_pressure',
    systolic: 131,
    diastolic: 82,
    pulse: 69,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'v_13',
    timestamp: '2026-10-09T07:30:00.000Z',
    type: 'blood_pressure',
    systolic: 132,
    diastolic: 83,
    pulse: 71,
    source: 'omron_sync',
    sourceLabel: 'Omron HEM-7156T (Simulated sync)',
    isSimulated: true,
    notes: 'Today morning reading. Clinician target: < 128/80 mmHg.'
  },
  // Fasting glucose entries
  {
    id: 'g_01',
    timestamp: '2026-08-01T08:00:00.000Z',
    type: 'blood_glucose',
    glucose: 114,
    glucoseContext: 'fasting',
    source: 'clinic_visit',
    sourceLabel: 'Lab Report (Thyrocare Indore)',
    isSimulated: false,
    notes: 'Baseline fasting plasma glucose.'
  },
  {
    id: 'g_02',
    timestamp: '2026-08-24T07:50:00.000Z',
    type: 'blood_glucose',
    glucose: 110,
    glucoseContext: 'fasting',
    source: 'contour_sync',
    sourceLabel: 'Contour TS Glucometer (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'g_03',
    timestamp: '2026-09-15T07:45:00.000Z',
    type: 'blood_glucose',
    glucose: 106,
    glucoseContext: 'fasting',
    source: 'contour_sync',
    sourceLabel: 'Contour TS Glucometer (Simulated sync)',
    isSimulated: true
  },
  {
    id: 'g_04',
    timestamp: '2026-09-28T07:50:00.000Z',
    type: 'blood_glucose',
    glucose: 104,
    glucoseContext: 'fasting',
    source: 'contour_sync',
    sourceLabel: 'Contour TS Glucometer (Simulated sync)',
    isSimulated: true,
    notes: 'Target < 100 mg/dL.'
  }
];

export const INITIAL_MESSAGES: CareMessage[] = [
  {
    id: 'msg_01',
    timestamp: '2026-08-01T11:00:00.000Z',
    sender: 'dr_mehta',
    senderRole: 'doctor',
    senderName: 'Dr. Aniruddh Mehta, MD',
    type: 'care_plan_update',
    title: 'Care Plan Initialized: 90-Day Hypertension Target',
    content: 'Welcome to Pulse, Saira. We have set your blood pressure target to <128/80 mmHg over our 90-day review period. Take Telmisartan 40mg + Amlodipine 5mg each morning after breakfast, and aim for a 20-minute daily walk. Let’s focus on sustainable habits rather than extreme changes.',
    tags: ['Care Plan', 'Target Set'],
    isCareTeamOnly: false
  },
  {
    id: 'msg_02',
    timestamp: '2026-09-17T19:30:00.000Z',
    sender: 'saira',
    senderRole: 'patient',
    senderName: 'Saira',
    type: 'patient_message',
    title: 'Routine check-in regarding evening walk',
    content: 'Namaste Dr. Mehta. The morning medicines are going well and I haven’t missed a dose. However, with quarterly shipping deadlines at work, my evenings on AB Road often run late until 9:00 PM. I’ve had to skip the evening walk 3 days this week because of fatigue and joint family dinner responsibilities.',
    tags: ['Routine Barrier', 'Work Schedule'],
    isCareTeamOnly: false
  },
  {
    id: 'msg_03',
    timestamp: '2026-09-19T09:15:00.000Z',
    sender: 'system',
    senderRole: 'system',
    senderName: 'Pulse Routine Adaptation',
    type: 'routine_adaptation',
    title: 'Routine Adjustment Accepted',
    content: 'Saira accepted an adaptation: Daily 20-minute brisk walk shifted from 8:30 PM to 6:30 AM before school bus departure. Note: Doctor-prescribed clinical goal of 20 minutes daily aerobic movement remains unchanged.',
    tags: ['Adaptation', 'Schedule Shift'],
    isCareTeamOnly: false
  },
  {
    id: 'msg_04',
    timestamp: '2026-09-20T16:20:00.000Z',
    sender: 'dr_mehta',
    senderRole: 'doctor',
    senderName: 'Dr. Aniruddh Mehta, MD',
    type: 'clinician_review',
    title: 'Clinician Mid-Term Review & Feedback',
    content: 'Hello Saira. I reviewed your 45-day trend. Your resting systolic BP has moved from 142 down to an average of 135 mmHg. Shifting your walk to the morning window was a sensible practical adjustment—routine adherence is what drives blood pressure control. Continue with current medication without change. We will do a full evaluation at your Nov 4 appointment.',
    tags: ['Clinical Review', 'Feedback'],
    isCareTeamOnly: false
  },
  // Clinician private note (DEMO ONLY: MUST REMAIN FILTERED FROM PATIENT VIEW)
  {
    id: 'msg_private_01',
    timestamp: '2026-10-05T12:00:00.000Z',
    sender: 'dr_mehta',
    senderRole: 'doctor',
    senderName: 'Dr. Aniruddh Mehta, MD',
    type: 'clinician_review',
    title: 'CARE-TEAM INTERNAL: Titration consideration',
    content: 'Care team internal note: Saira’s systolic average is holding at ~132 mmHg. Tolerating dual therapy without peripheral edema. Avoid adding thiazide diuretic at Day 90 review if fasting glucose remains borderline (104 mg/dL). Plan to recheck microalbuminuria at upcoming consultation.',
    tags: ['Care-Team Only', 'Private Note'],
    isCareTeamOnly: true // STRICTLY PRIVATE TO DOCTOR!
  }
];

export const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev_omron_bp',
    name: 'Omron Smart BP Monitor',
    brandModel: 'HEM-7156T Bluetooth Cuff',
    category: 'blood_pressure',
    status: 'connected',
    lastSync: 'Today, 07:30 AM',
    batteryPercent: 88,
    connectionMethod: 'Bluetooth Low Energy'
  },
  {
    id: 'dev_contour_glucose',
    name: 'Contour TS Glucometer',
    brandModel: 'Bayer Contour TS Plus',
    category: 'blood_glucose',
    status: 'standby',
    lastSync: 'Sep 28, 2026',
    batteryPercent: 94,
    connectionMethod: 'NFC Tap Sync'
  }
];

export const CLINIC_PATIENTS_LIST: PatientProfile[] = [
  INITIAL_PATIENT,
  {
    id: 'patient_rajesh_02',
    name: 'Rajesh Sharma',
    age: 48,
    gender: 'Male',
    location: 'Palasia, Indore',
    primaryDiagnosis: 'Essential Hypertension (Stage 2)',
    secondaryDiagnosis: 'Dyslipidemia',
    baselineSystolic: 154,
    baselineDiastolic: 98,
    baselineDate: '2026-07-15',
    currentSystolicAvg: 139,
    currentDiastolicAvg: 89,
    day90ContinuationStatus: 'active',
    enrollmentDate: '2026-07-15',
    occupation: 'Senior IT Project Manager',
    familyContext: 'Nuclear family, high desk time, frequent business travel between Indore and Pune.',
    clinicianTarget: {
      systolicTarget: 130,
      systolicUpperLimit: 138,
      diastolicTarget: 80,
      setBy: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      setDate: '2026-07-15',
      targetPeriodDays: 90,
      clinicalRationale: 'Target < 130/80 mmHg to reduce cumulative cardiovascular hazard.'
    },
    actions: [],
    barrierLogs: [],
    appointment: {
      id: 'apt_rajesh',
      doctorName: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      scheduledDate: '2026-10-18',
      scheduledTime: '06:00 PM',
      status: 'confirmed',
      visitType: '90-Day Comprehensive Review',
      reason: '90-day medication titration review.'
    },
    privacy: {
      shareRoutineCompletion: true,
      shareBarrierLogs: true,
      shareDeviceReadings: true,
      shareFamilySupportInvolvement: false,
      allowDeidentifiedResearchCohort: false
    },
    careTeamNotes: ['Baseline 154/98. Telmisartan 80mg + Chlorthalidone 12.5mg prescribed.'],
    lastReviewedDate: '2026-09-28',
    reviewStatus: 'needs_review',
    reviewReason: 'Consecutive systolic readings > 138 mmHg over past 10 days. May require dose timing check.'
  },
  {
    id: 'patient_priya_03',
    name: 'Priya Verma',
    age: 39,
    gender: 'Female',
    location: 'Geeta Bhavan, Indore',
    primaryDiagnosis: 'Hypertension (Post-partum history)',
    secondaryDiagnosis: 'Mild Anxiety / Chronic Stress',
    baselineSystolic: 138,
    baselineDiastolic: 88,
    baselineDate: '2026-08-10',
    currentSystolicAvg: 125,
    currentDiastolicAvg: 78,
    day90ContinuationStatus: 'active',
    enrollmentDate: '2026-08-10',
    occupation: 'Nationalised Bank Branch Manager',
    familyContext: 'Working mother with toddler; joint family support in Indore.',
    clinicianTarget: {
      systolicTarget: 125,
      systolicUpperLimit: 130,
      diastolicTarget: 80,
      setBy: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      setDate: '2026-08-10',
      targetPeriodDays: 90,
      clinicalRationale: 'Maintenance target < 125/80 mmHg via low-dose therapy and stress mitigation.'
    },
    actions: [],
    barrierLogs: [],
    appointment: {
      id: 'apt_priya',
      doctorName: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      scheduledDate: '2026-11-10',
      scheduledTime: '04:30 PM',
      status: 'confirmed',
      visitType: 'Routine Vitals Check',
      reason: 'Routine quarterly check-in.'
    },
    privacy: {
      shareRoutineCompletion: true,
      shareBarrierLogs: true,
      shareDeviceReadings: true,
      shareFamilySupportInvolvement: true,
      allowDeidentifiedResearchCohort: true
    },
    careTeamNotes: ['Excellent response to morning routine. Blood pressure well-controlled.'],
    lastReviewedDate: '2026-10-02',
    reviewStatus: 'stable',
    reviewReason: 'Ambulatory systolic within target (< 126 mmHg) for 4 consecutive weeks.'
  },
  {
    id: 'patient_vikram_04',
    name: 'Vikram Patel',
    age: 51,
    gender: 'Male',
    location: 'Snehlataganj, Indore',
    primaryDiagnosis: 'Hypertension Stage 2',
    secondaryDiagnosis: 'Hyperuricemia',
    baselineSystolic: 158,
    baselineDiastolic: 102,
    baselineDate: '2026-07-01',
    currentSystolicAvg: 146,
    currentDiastolicAvg: 94,
    day90ContinuationStatus: 'at_risk',
    enrollmentDate: '2026-07-01',
    occupation: 'Grain Merchant (Mandi Trader)',
    familyContext: 'Long hours at grain market, irregular tea/snack times, relies on wife for medicine reminders.',
    clinicianTarget: {
      systolicTarget: 135,
      systolicUpperLimit: 140,
      diastolicTarget: 85,
      setBy: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      setDate: '2026-07-01',
      targetPeriodDays: 90,
      clinicalRationale: 'Initial goal to bring systolic below 140 mmHg and stabilize medication adherence.'
    },
    actions: [],
    barrierLogs: [],
    appointment: {
      id: 'apt_vikram',
      doctorName: 'Dr. Aniruddh Mehta, MD',
      clinicName: 'Mehta Heart & Chronic Care, Indore',
      scheduledDate: '2026-10-12',
      scheduledTime: '07:00 PM',
      status: 'confirmed',
      visitType: 'Medication Review',
      reason: 'Urgent follow-up for suboptimal pressure and adherence dip.'
    },
    privacy: {
      shareRoutineCompletion: true,
      shareBarrierLogs: true,
      shareDeviceReadings: true,
      shareFamilySupportInvolvement: true,
      allowDeidentifiedResearchCohort: false
    },
    careTeamNotes: ['Missed morning dosage 4 days last week during mandi auction season.'],
    lastReviewedDate: '2026-10-06',
    reviewStatus: 'attention_required',
    reviewReason: 'Missed medication alert + systolic uptick to 146 mmHg. Needs family routine anchor.'
  }
];

export const PILOT_OUTCOME_SUMMARY: PilotMetricSummary = {
  pilotCohortSize: 64,
  meanSystolicDelta: '-6.4 mmHg (Illustrative)',
  targetAttainmentRate: '67.2% reached target < 130 mmHg',
  carePlanCompletionAverage: '77.4% daily routine execution',
  day90ContinuationRate: '81.3% active at 90 days (vs ~12% health app industry benchmark)',
  isIllustrative: true,
  validationRequirements: [
    'Formal baseline and follow-up ambulatory/clinic BP measurements under standardized AHA/ESH protocol.',
    'Pre-specified cohort with documented inclusion criteria (Indore 35-50 working adults with primary hypertension).',
    'Independent clinician verification of readings and medication changes.',
    'Clear 90-day protocol window with intent-to-treat and per-protocol statistical analysis.'
  ]
};
