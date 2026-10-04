# BloodLink — Data & Functions Reference

BloodLink has **no backend API yet**. The app runs entirely on the fictional
demo data in `lib/demo.ts`. This document describes the intended data layer
and Cloud Functions so contributors can build against a shared plan. See
`docs/ARCHITECTURE.md` for the codebase map and `docs/DATA_MODEL.md`
(issue #9) for the Firestore design task.

## Intended data layer (`lib/`)

| Module | Purpose | Status |
|---|---|---|
| `lib/demo.ts` | Fictional donors, requests, drives, stories, articles | ✅ Implemented |
| `lib/blood-groups.ts` | Compatibility helpers (`canDonateTo`, …) | 🚧 Issue #2 |
| `lib/validators.ts` | Form validation (email, phone, units, …) | 🚧 Issue #3 |
| `lib/format.ts` | Relative time, distance, donation labels | 🚧 Issue #4 |
| `lib/firebase.ts` | Firebase app initialization from `.env` | 🚧 Issue #10 |
| `lib/auth.tsx` | Auth state + roles (donor / hospital / admin) | 🚧 Issue #10 |
| `lib/firestore.ts` | Firestore reads/writes behind demo interfaces | 🚧 After #9 |
| `lib/api.ts` | App-facing data API (demo today, Firestore later) | 🚧 After #9 |
| `lib/matching.ts` | Client-side matching helpers | 🚧 Issue #12 |
| `lib/messaging.ts` | Push + simulated WhatsApp-style alerts | 🚧 Later |
| `lib/constants.ts` | Shared constants | 🚧 Stub |

Screens must keep working on demo data until the Firebase swap for that
screen is explicitly implemented — see CONTRIBUTING.md.

## Intended Cloud Functions (`functions/src/`)

| Function module | Purpose | Status |
|---|---|---|
| `matching.ts` | Score donors: compatibility × proximity × availability × recency | 🚧 Issue #12 |
| `alerts.ts` | Push (FCM) + simulated WhatsApp-style alert on match | 🚧 Later |
| `forecasting.ts` | Demand forecast by blood group and city | 🚧 Later |
| `fraud.ts` | Duplicate / fake-request checks | 🚧 Later |
| `index.ts` | Function exports entry point | 🚧 Stub |

## Privacy rule (non-negotiable)

A donor's phone number is readable **only** by the request owner and by that
donor after they accept the request. This is enforced by Firestore Security
Rules (issue #11) — never by client code alone. See `SECURITY.md`.
