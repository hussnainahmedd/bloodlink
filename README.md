# 🩸 BloodLink — AI-Driven Emergency Blood Donor Matching & Demand Forecasting System

> **Final Year Project (FYP) — BS Computer Science, Air University, Islamabad**

![Status](https://img.shields.io/badge/status-proposal%20%2F%20design%20phase-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Problem Statement](#2-problem-statement)
3. [Objectives](#3-objectives)
4. [Scope](#4-scope)
5. [Key Features](#5-key-features)
6. [System Architecture](#6-system-architecture)
7. [Technology Stack (Proposed)](#7-technology-stack-proposed)
8. [AI / ML Components](#8-ai--ml-components)
9. [Database Design](#9-database-design)
10. [Methodology](#10-methodology)
11. [Project Structure](#11-project-structure)
12. [Installation & Setup](#12-installation--setup)
13. [Usage](#13-usage)
14. [API Overview](#14-api-overview)
15. [Testing Strategy](#15-testing-strategy)
16. [Project Timeline](#16-project-timeline)
17. [Future Work](#17-future-work)
18. [Team](#18-team)
19. [References](#19-references)
20. [License](#20-license)

---

## 1. Abstract

BloodLink is an AI-driven emergency blood donor matching and demand forecasting platform designed specifically for Pakistan. Every day, patients in need of urgent blood transfusions — accident victims, surgery patients, mothers in childbirth, dengue patients, and thalassemia patients requiring lifelong transfusions — depend on a chaotic, informal network of forwarded WhatsApp messages and Facebook posts to find donors. This process is slow, unreliable, and often fails when time matters most.

BloodLink replaces this chaos with a unified system: donors register once with verified contact details; patients or families post a blood request in under a minute; an **AI matching engine** scores and ranks compatible donors by proximity, availability, eligibility, and historical responsiveness; and instant alerts go out over **WhatsApp/SMS** in Urdu and English. A **demand forecasting module** predicts blood requirement by city and blood group so hospitals and blood banks can prepare in advance. Verified hospital and blood-bank accounts, a public request board, and a trust scoring system complete the platform.

The system is built **WhatsApp-first, Urdu-first, and low-bandwidth friendly**, reflecting how Pakistan actually communicates during emergencies.

---

## 2. Problem Statement

In Pakistan, there is no centralized, reliable mechanism to connect blood donors with recipients in real time:

- **Fragmented communication** — blood requests spread as forwarded WhatsApp messages and social media posts. Contact numbers are often dead, details incomplete, and no one knows which requests are still open.
- **No searchable donor registry** — willing donors are invisible to the people who need them, and donors are never notified when someone nearby needs their blood group.
- **Rare blood groups are critically hard to source** — AB−, B−, and O− requests frequently go unanswered in emergencies.
- **Chronic patients suffer continuously** — thalassemia patients need regular transfusions for life and must repeat the same desperate search every few weeks.
- **Hospitals and blood banks operate blind** — with no demand data by city and blood group, stocking is reactive instead of planned.
- **Trust deficit** — fake, duplicate, and outdated requests circulate freely; donor privacy is unprotected.

**Core research question:** *How can AI-driven matching and demand forecasting, delivered through channels Pakistanis already use (WhatsApp/SMS), measurably reduce the time between a blood request and a confirmed donor?*

---

## 3. Objectives

1. Build a verified, searchable national donor registry with OTP-verified contact details.
2. Design and implement an **AI donor–request matching engine** that ranks compatible donors using distance, availability, eligibility window, urgency, and historical response behavior.
3. Develop a **blood demand forecasting model** (per city × blood group) to help hospitals and blood banks plan inventory.
4. Deliver a **WhatsApp/SMS alert pipeline** so matched donors are notified instantly in Urdu or English.
5. Provide verified accounts and analytics dashboards for hospitals, blood banks, and NGOs.
6. Implement a trust layer: donor reliability scoring, fake-request detection, and privacy-preserving contact sharing.
7. Launch a pilot in **Islamabad/Rawalpindi, Lahore, and Karachi**, and evaluate the system on response time, match success rate, and user satisfaction.

---

## 4. Scope

### In Scope
- Donor registration, verification (OTP), and availability management
- Blood request creation, matching, alerting, and fulfillment tracking
- AI matching engine and demand forecasting model
- WhatsApp/SMS notification pipeline (Urdu + English)
- Public open-request board with shareable WhatsApp message format
- Verified hospital / blood bank / NGO accounts with dashboards
- Donor mobile app (Android-first) and responsive web platform
- Admin panel for moderation, reporting, and analytics

### Out of Scope (for the FYP)
- Actual blood collection, storage, or transportation logistics
- Integration with NADRA/CNIC verification (proposed as future work)
- iOS app (proposed as future work)
- Payment processing — the platform is strictly voluntary and non-commercial

---

## 5. Key Features

### 🧍 Donor Side
- One-time registration: name, blood group, city/area, mobile/WhatsApp, last donation date
- OTP phone verification
- Availability toggle (available / unavailable / temporarily deferred)
- Eligibility reminders (donors become eligible again ~3 months after donation)
- Instant WhatsApp/SMS alerts for matching requests nearby
- One-tap accept/decline; contact shared **only** on accept
- Donation history and reliability badge

### 🆘 Requester Side (patients & families)
- Post a request in under a minute: blood group, units, city, hospital, contact, urgency
- Automatic compatibility expansion (e.g. O+ request also matches O− donors)
- Live status tracking: notified → accepted → fulfilled
- One-tap **Share on WhatsApp** with a clean formatted message
- Mark fulfilled / cancel; expired requests auto-close

### 🏥 Hospital / Blood Bank / NGO Dashboard
- Verified institutional accounts
- Post official requests with priority flagging
- Demand forecast charts by blood group and time period
- Donor turnout analytics for blood-drive planning
- Recurring donor programs (e.g. for thalassemia patients)

### 🤖 Intelligent Layer
- AI matching score for every donor–request pair
- Urgency triage: critical requests broadcast city-wide
- Fake/duplicate request detection
- Demand forecasting per city × blood group

### 🛡️ Trust & Safety
- OTP verification for all users
- Donor reliability score based on accept/show-up history
- Report fake requests; admin moderation queue
- Privacy: numbers hidden until donor accepts
- Strictly non-commercial — selling blood is prohibited and blocked

---

## 6. System Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
│  Donor App   │      │  Web Portal  │      │ Hospital/NGO     │
│  (Android)   │      │ (Requesters) │      │ Dashboard        │
└──────┬───────┘      └──────┬───────┘      └────────┬─────────┘
       │                     │                       │
       └─────────────┬───────┴───────────────────────┘
                     ▼
            ┌─────────────────┐
            │   API Gateway   │  (REST)
            └────────┬────────┘
                     ▼
   ┌─────────────────────────────────────┐
   │          Core Services              │
   │  • User & Auth Service (OTP)        │
   │  • Donor Registry Service           │
   │  • Request Management Service       │
   │  • Notification Service (WA/SMS)    │
   │  • Trust & Moderation Service       │
   └──────┬──────────────────┬───────────┘
          ▼                  ▼
 ┌────────────────┐  ┌──────────────────┐
 │ AI Matching    │  │ Demand Forecast  │
 │ Engine         │  │ Model            │
 └───────┬────────┘  └────────┬─────────┘
         ▼                    ▼
 ┌──────────────────────────────────────┐
 │        Data Layer                    │
 │  Relational DB + Cache + Object      │
 │  storage + Analytics store           │
 └──────────────────────────────────────┘
```

---

## 7. Technology Stack (Proposed)

> ⚠️ The final stack is under discussion and will be confirmed before implementation. The proposal below reflects the current leading option.

| Layer | Proposed Technology | Rationale |
|---|---|---|
| Mobile app | Flutter | Single codebase, Android-first (Pakistan is Android-dominated) |
| Web frontend | React / Next.js | Dashboards, request board, admin panel |
| Backend API | Python (FastAPI) or Node.js | FastAPI preferred — strong ML ecosystem integration |
| Database | PostgreSQL + PostGIS | Relational integrity + geospatial queries for proximity matching |
| Cache / Queue | Redis + Celery/RQ | Alert fan-out, background jobs |
| ML / Forecasting | scikit-learn, XGBoost / Prophet | Matching model + time-series demand forecasting |
| Notifications | WhatsApp Business API, SMS gateway | WhatsApp-first alerting |
| Auth | OTP via SMS gateway, JWT | Phone-verified identity |
| Hosting | VPS / cloud (Docker) | Containerized deployment |
| Maps | OpenStreetMap / Leaflet | Low-cost geospatial visualization |

---

## 8. AI / ML Components

### 8.1 Donor–Request Matching Engine
Each (request, donor) pair receives a composite match score:

```
match_score = w1·blood_compatibility
            + w2·proximity_score
            + w3·availability
            + w4·eligibility_window
            + w5·urgency_boost
            + w6·reliability_score
```

- **Blood compatibility** — hard medical compatibility matrix (ABO/Rh).
- **Proximity** — haversine distance between donor area and hospital, decayed exponentially.
- **Eligibility window** — donors within ~3 months of last donation are excluded or down-ranked.
- **Reliability score** — learned from accept rate and confirmed donations; cold-start defaults applied for new donors.
- Weights tuned via offline evaluation on simulated request logs and validated during pilot.

### 8.2 Demand Forecasting Model
- **Input:** historical request logs (timestamp, city, blood group, units, urgency), seasonality features, public-holiday calendar.
- **Model:** gradient-boosted trees (XGBoost) and/or Prophet-style time-series per (city × blood group).
- **Output:** 7-day and 30-day demand forecast per blood group per pilot city, surfaced on hospital dashboards.
- **Evaluation:** MAE/RMSE on held-out weeks; backtesting before pilot.

### 8.3 Fake / Duplicate Request Detection
- Text similarity (TF-IDF / embeddings) + metadata matching (same hospital, blood group, contact within time window) to flag duplicates.
- Heuristic + supervised classifier for suspicious requests; flagged items enter admin moderation queue.

---

## 9. Database Design

Core entities (simplified):

- **users** — id, name, phone (unique, OTP-verified), role (donor/requester/hospital/admin), language pref, created_at
- **donors** — user_id (FK), blood_group, city, area, geo_point, last_donation_date, availability_status, reliability_score
- **requests** — id, requester_id (FK), patient_name, blood_group, units_needed, city, hospital, geo_point, contact_phone, urgency (normal/urgent/critical), status (open/matched/fulfilled/expired/cancelled), expires_at
- **matches** — id, request_id (FK), donor_id (FK), match_score, notified_at, responded_at, response (accepted/declined/none)
- **donations** — id, donor_id (FK), request_id (FK), donated_at, verified_by
- **institutions** — id, name, type (hospital/blood_bank/ngo), city, verified, contact
- **notifications** — id, user_id (FK), channel (whatsapp/sms), template, status, sent_at
- **reports** — id, reporter_id (FK), request_id (FK), reason, status

---

## 10. Methodology

1. **Requirement analysis** — interviews with thalassemia foundations, hospital blood banks, and frequent donors; survey of existing informal request flows.
2. **Literature review** — existing blood-donation platforms (local and international), donor-matching research, mHealth alert systems.
3. **System design** — architecture, DB schema, API contracts, UI/UX wireframes (Urdu + English).
4. **Module-wise implementation** — auth/registry → requests → matching engine → notifications → forecasting → dashboards → mobile app.
5. **Model training & tuning** — matching weights and forecasting models trained on synthesized + pilot data.
6. **Testing** — unit, integration, UAT with real users in pilot cities.
7. **Deployment & pilot** — staged rollout: Islamabad/Rawalpindi → Lahore → Karachi.
8. **Evaluation** — response time, match success rate, forecast accuracy, user satisfaction surveys.
9. **Documentation** — thesis report, user manuals, API docs.

---

## 11. Project Structure

> Proposed — will be finalized once the stack is confirmed.

```
bloodlink/
├── mobile/                  # Flutter donor app
├── web/                     # React/Next.js portal + dashboards
├── backend/
│   ├── api/                 # REST API (auth, donors, requests, institutions)
│   ├── matching/            # AI matching engine
│   ├── forecasting/         # Demand forecasting models + training pipelines
│   ├── notifications/       # WhatsApp/SMS workers
│   └── moderation/          # Fake-request detection + admin tools
├── ml/
│   ├── notebooks/           # Experiments and evaluation
│   └── models/              # Trained artifacts
├── infra/                   # Docker, deployment configs
└── docs/                    # Thesis chapters, API docs, manuals
```

---

## 12. Installation & Setup

> 🚧 Implementation has not started. These steps are placeholders and will be completed once the stack is finalized.

```bash
# 1. Clone the repository
git clone https://github.com/hussnainahmedd/bloodlink.git
cd bloodlink

# 2. Backend setup (proposed)
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DB + WhatsApp/SMS credentials
alembic upgrade head
uvicorn api.main:app --reload

# 3. Web frontend (proposed)
cd ../web && npm install && npm run dev

# 4. Mobile app (proposed)
cd ../mobile && flutter pub get && flutter run
```

---

## 13. Usage

> 🚧 To be documented during implementation.

**Typical flows:**

1. **Donor:** install app → register → verify OTP → set availability → receive alerts → accept → donate.
2. **Requester:** open web portal → post request → system notifies matched donors → track responses → mark fulfilled.
3. **Hospital:** log in to dashboard → post verified request → view demand forecast → manage recurring patient programs.
4. **Admin:** moderate flagged requests → verify institutions → view platform analytics.

---

## 14. API Overview

> Proposed REST endpoints (to be finalized):

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/request-otp` | Send OTP to phone |
| POST | `/api/auth/verify-otp` | Verify OTP, issue JWT |
| POST | `/api/donors` | Register donor profile |
| GET | `/api/donors/search?blood_group=O%2B&city=Lahore` | Search compatible donors |
| POST | `/api/requests` | Create blood request |
| GET | `/api/requests?city=Islamabad&status=open` | List open requests |
| POST | `/api/requests/{id}/fulfill` | Mark request fulfilled |
| GET | `/api/forecast?city=Karachi&blood_group=B-` | Demand forecast |
| POST | `/api/institutions` | Register hospital/blood bank (admin-verified) |

---

## 15. Testing Strategy

- **Unit tests** — matching-score components, compatibility matrix, eligibility logic.
- **Integration tests** — API flows: register → request → match → notify → fulfill.
- **Model evaluation** — precision/recall of matching on simulated logs; MAE/RMSE for forecasts.
- **Load tests** — alert fan-out under simulated emergency spikes.
- **UAT** — real donors and a partner hospital/blood bank in the pilot city.
- **Security tests** — OTP abuse prevention, rate limiting, PII handling.

---

## 16. Project Timeline

> FYP spans two semesters (FYP-I: design & proposal, FYP-II: implementation & evaluation).

**FYP-I — Analysis & Design**
- Months 1–2: requirement gathering, stakeholder interviews, literature review
- Month 3: system design — architecture, DB schema, API contracts, wireframes
- Month 4: matching-engine prototype + proposal documentation, mid defense

**FYP-II — Implementation & Evaluation**
- Months 1–2: core platform — auth, registry, requests, request board
- Month 3: AI matching engine + WhatsApp/SMS pipeline
- Month 4: forecasting model + hospital dashboards + mobile app
- Month 5: pilot launch, testing, bug fixing
- Month 6: evaluation, thesis writing, final defense

---

## 17. Future Work

- NADRA/CNIC-based donor identity verification
- iOS app
- Regional languages (Punjabi, Sindhi, Pashto interfaces + voice)
- Integration with national blood-bank inventory systems
- AI chatbot for request intake in Roman Urdu
- Cross-border expansion model for similar developing countries

---

## 18. Team

| Name | Role | Affiliation |
|---|---|---|
| **Hussnain Ahmad** | Project Lead / Developer | BS Computer Science, Air University, Islamabad |
| *TBD* | Team Member | — |
| *TBD* | Team Member | — |
| *TBD* | Supervisor | Faculty, Air University |

---

## 19. References

1. World Health Organization — Global status report on blood safety and availability.
2. Pakistan National Blood Transfusion Service — national blood policy documents.
3. Sundas Foundation / Fatimid Foundation — thalassemia care in Pakistan (stakeholder interviews, planned).
4. Existing platforms: BloodLink clones, Facebook Blood Donations feature — gap analysis (to be documented in thesis).
5. Relevant literature on donor-matching algorithms and mHealth emergency alert systems (to be compiled during FYP-I).

---

## 20. License

MIT License — see `LICENSE` (to be added).

---

*BloodLink — because in Pakistan, no family should lose hours searching for blood while a loved one waits.*
