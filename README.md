# Pulse &bull; Chronic Care Continuity Prototype

> **India-first continuous care stack closing the 89-day gap between appointments for working professionals managing chronic hypertension.**

---

## 1. Product Overview

Traditional chronic healthcare operates as **"Sick Care"**: a 15-minute consultation once every 3 months. For the other 89 days, patients face real-life friction alone at the dinner table, during late office shifts, or amidst joint family demands.

**Pulse is built on a central promise: care continuity.**
- Understands practical, everyday barriers without blaming the patient.
- Helps the patient adapt daily routines without changing clinician-prescribed medical goals.
- Makes health trajectory visible and transparent.
- Prepares concise 15-minute consultation digests for clinicians at follow-up.

---

## 2. Product Guardrails & The 3-Step Metrics Chain

Pulse explicitly puts **health improvement first**. App opens and gamified care-plan completion are **supporting behavioral signals, never proof of clinical success**.

```
┌──────────────────────────────────────┐
│        STEP 1: CLINICAL OUTCOME      │
│  Clinician-reviewed change in        │
│  systolic BP over 90 days (mmHg)     │
└──────────────────┬───────────────────┘
                   │ Causal Link: Routine feasibility enables physiological response
                   ▼
┌──────────────────────────────────────┐
│    STEP 2: LEADING BEHAVIOR SIGNAL   │
│  Daily care-plan actions completed    │
│  over time (adherence trajectory)    │
└──────────────────┬───────────────────┘
                   │ Causal Link: Validated health outcome builds patient trust & retention
                   ▼
┌──────────────────────────────────────┐
│    STEP 3: CONTINUATION / BUSINESS   │
│  90-day active retention & clinic    │
│  follow-up attendance (₹399/mo)      │
└──────────────────────────────────────┘
```

> **Note on Data:** All vitals, cohort numbers, and pilot rates in this prototype are **illustrative demo data** to showcase product mechanics. A real clinical pilot mandates formal baseline and follow-up dual-cuff measurements, an IRB-approved protocol, and independent clinician verification.

---

## 3. Beachhead & Persona

- **Launch Focus:** Time-poor working professionals aged 35–50 with hypertension in Indore, managing a doctor-prescribed care plan alongside corporate work and family responsibilities.
- **Primary Prototype Persona:**
  - **Saira, 42**, Senior Logistics Operations Manager in Vijay Nagar, Indore.
  - **Condition:** Essential Hypertension (Stage 1) and early pre-diabetes.
  - **Everyday Context:** Balancing joint-family dinner preparation, children’s school commutes, and late client calls along the AB Road tech corridor.
  - **Core Challenge:** Saira understands what her doctor asked her to do; the difficulty is fitting it into unpredictable daily schedules.

---

## 4. Key Prototype Workspaces

Pulse provides **two fully realized, responsive workspaces** with an instant role-switch control in the header:

### A. Patient Workspace (Saira)
1. **My Care Dashboard:** Leads with health progress (ambulatory BP trend vs. clinician target `<128/80 mmHg`), today's clinician-defined actions, connected device status, and one practical next step.
2. **Care Plan:** Clear visual separation of doctor-prescribed actions (molecules, doses, aerobic goals) vs. Pulse routine-support tips. Interactive daily logging updates the behavior chart in real time.
3. **Insights & Routine Check-In:** Choose everyday barriers (work schedule, family responsibilities, transit, sleep fatigue) and receive a practical **"Next Best Action"** (e.g. shifting the walk to 6:30 AM before the school run). Working Accept / Not-Now flow updates reminders while preserving medical goals intact.
4. **Messages & Care Updates:** Shared chronological thread with Dr. Mehta for asynchronous review notes and care updates.
5. **Devices & Readings:** Paired Omron BP cuff and Bayer Contour glucometer cards with one-click **Simulate Sync** and manual logging fallbacks.
6. **Progress History:** Comprehensive ledger of ambulatory readings, interactive SVG trend charts, and an explicit **Clinical Interpretation Boundary** banner.
7. **Appointments:** In-clinic 90-day consultation tracker with a working reschedule request flow.
8. **Privacy & Sharing:** Granular consent toggles aligned with India’s Digital Personal Data Protection (DPDP) Act and an instant **Reset Demo Data** control.

### B. Clinician Workspace (Dr. Mehta, Indore)
1. **Clinic Overview:** Panel of enrolled chronic patients (Saira, Rajesh, Priya, Vikram), follow-up dates, review flags, and population BP distribution ahead of app engagement.
2. **Patient Detail View:** 15-minute consultation digest, 60-day ambulatory BP trends, barrier logs, routine adaptations tried, and measured outcomes.
3. **Care-Team-Only Notes:** **Strict privacy boundary.** Clinician notes (differential diagnosis, drug titration considerations) remain confidential and are **strictly excluded from the patient's view**.
4. **Care Plan Builder:** Clinician edits targets, medications, and timing. Saving automatically updates Saira's active plan and posts a shared care update to her timeline.
5. **Review Queue & Safety:** Triage list with explicit clinical rationale (e.g., systolic elevation, barrier reported) with clear guardrails against autonomous medical diagnosis.
6. **Outcome Reports:** Transparent breakdown of the 3-step metrics chain and pilot validation protocol requirements.

---

## 5. End-to-End Demo Walkthrough

Follow this sequence to experience the full continuity journey across roles:

1. **Patient View &ndash; Inspect Health Outcome:**
   - In the header, confirm you are in **Patient Workspace (Saira)**.
   - On **My Care Dashboard**, notice the primary focus on the latest BP reading (`132/83 mmHg`) and Dr. Mehta's target (`<128/80 mmHg`).
2. **Log Today's Action or Reading:**
   - Tap any checkmark under **Today's Clinician-Defined Care Actions** (e.g., *Morning Antihypertensive Dose*).
   - Alternatively, navigate to **Devices & Readings** and click **Simulate Device Sync (BP Cuff)** to import a fresh resting reading.
3. **Log a Routine Barrier & Accept Schedule Adaptation:**
   - Navigate to **Insights & Check-In**.
   - Click **+ Log Today's Barrier**, select **Work schedule & late hours**, add a brief note, and submit.
   - Inspect the recommended **Next Best Action** (*Shift 20-min brisk walk to early morning 6:30 AM*).
   - Click **Accept Adaptation**. Notice that the schedule shifts and a shared update is posted, but Dr. Mehta's 20-minute aerobic medical goal is 100% preserved.
4. **Switch to Clinician Workspace (Dr. Mehta):**
   - In the top bar, click **Doctor Workspace (Dr. Mehta)**.
   - Go to **Patient: Saira** &rarr; view the **15-Minute Consultation Digest**.
   - Notice the recorded barrier and the accepted morning adaptation reflected in the doctor's summary.
5. **Add a Confidential Care-Team Note:**
   - Click the **Care-Team-Only Notes** subtab.
   - Type a private observation (e.g., *"Hold current Telmisartan dosage without escalation; check microalbumin at Day 90"*) and click **Save Private Note**.
6. **Send a Shared Update to Saira:**
   - On the **15-Min Consultation Summary** tab, scroll to **Send Shared Care Update to Saira**.
   - Type a note (e.g., *"Great job on the morning walk adaptation; BP is stabilizing. See you on Nov 4."*) and click **Send Shared Update**.
7. **Switch back to Patient Workspace:**
   - Switch role to **Patient Workspace (Saira)**.
   - Go to **Messages & Updates**.
   - Verify Dr. Mehta's new message appears in the shared thread.
   - Verify that the **Care-Team-Only Note is completely absent** from Saira's timeline.

---

## 6. Running Locally & Vercel Deployment

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### Local Setup
```bash
# Clone or navigate to the project directory
cd pulse

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Verification
```bash
npm run build
```

### Vercel Deployment Instructions
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select the repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (or `pulse` if in a subdirectory).
5. Build Command: `npm run build`.
6. Output Directory: `.next`.
7. **Environment Variables:** None required! The prototype uses client-side browser storage (`localStorage`) and has zero external database or API dependencies.
8. Click **Deploy**.

---

## 7. Safety, Compliance & Regulatory Disclaimers

1. **Not an Emergency Service:** Pulse does not provide continuous emergency telemetry or autonomous clinical intervention. In the event of chest pain, shortness of breath, or a hypertensive crisis reading (`>180/120 mmHg`), users must immediately dial **108** or **112** (India National Emergency) or visit the nearest hospital.
2. **Medical Practice Boundary:** Only registered medical practitioners diagnose conditions, prescribe medications, or adjust dosages. Pulse software algorithms strictly provide routine habit scaffolding and communication tools.
3. **Data Privacy (DPDP Act):** All demo data remains stored in your local browser instance. No telemetry, credentials, or private patient information are sent to external servers.
