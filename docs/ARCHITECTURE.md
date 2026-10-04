# BloodLink Architecture

A short map of the codebase so contributors can find things quickly.
BloodLink is one TypeScript codebase end to end.

## App (Expo / React Native + Web)

- `app/` — Expo Router screens
  - `app/(auth)/` — login, signup, forgot password, verify email
  - `app/(donor)/` — donor dashboard, alerts, donation history, profile
  - `app/(hospital)/` — hospital dashboard, request management, forecasts
  - `app/requests/` — emergency request creation and detail/tracking
  - `app/drives/`, `app/stories/`, `app/learn/` — donation drives, community
    stories, knowledge hub
  - Public pages: `index`, `find-donors`, `blood-groups`, `eligibility`,
    `how-it-works`, `about`, `contact`, `help`
- `components/` — reusable UI
  - `components/ui/` — design-system primitives (button, card, modal, …)
  - `components/motion/` — physics-based motion (springs, magnetic, parallax)
  - `components/home|donors|requests|dashboard|layout/` — feature components
- `lib/` — business logic and data (keep this out of screens)
  - `lib/demo.ts` — **fictional demo data; the whole app runs on this today**
  - `lib/firebase.ts`, `lib/firestore.ts`, `lib/api.ts` — backend layer (stubs)
  - `lib/matching.ts` — client-side matching helpers (stub)
  - `lib/blood-groups.ts`, `lib/validators.ts`, `lib/format.ts`,
    `lib/constants.ts`, `lib/messaging.ts`, `lib/auth.tsx` — stubs/helpers
- `styles/`, `hooks/` — global styles (NativeWind) and shared hooks

## Backend (planned — Firebase, free Spark plan)

- Auth: Firebase Authentication (email), roles: donor / hospital / admin
- Data: Firestore collections `users`, `donors`, `requests`, `drives`,
  `stories`, protected by Security Rules; donor contact details are only
  readable after that donor accepts a request
- `functions/` — TypeScript Cloud Functions
  - `functions/src/matching.ts` — donor scoring:
    compatibility × proximity × availability × recency of last donation
  - `functions/src/alerts.ts` — push (FCM) + simulated WhatsApp-style alert
  - `functions/src/forecasting.ts` — demand forecasting by group/city
  - `functions/src/fraud.ts` — duplicate/fake-request checks

## Data flow (target)

```
Request posted → Firestore → matching Cloud Function scores donors
→ alerts (push + simulated WhatsApp) → donor accepts → contact revealed
→ request status timeline updates live → fulfilled
```

Until the backend lands, `lib/demo.ts` simulates every step above so the UI
can be developed, reviewed, and demoed with zero infrastructure.

## Design principles

- $0 budget: free tiers only, no paid APIs
- Privacy by default: contact details hidden until donor consent (accept)
- Calm under stress: an emergency request must be completable in seconds;
  motion is subtle and respects `prefers-reduced-motion`
