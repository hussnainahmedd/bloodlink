# BloodLink Roadmap

BloodLink is built in the open. This roadmap is honest about what exists today
and what is planned — nothing here is claimed as done until it is merged and
verified.

## ✅ Done

- [x] Concept, pitch ([PITCH.md](PITCH.md)), and system design
- [x] Frontend v1 — complete Expo (React Native + TypeScript) UI for Android,
      iOS, and Web from one codebase: home, find donors, emergency request
      flow, blood-group compatibility guide, eligibility checker, donation
      drives, donor stories, knowledge hub, donor dashboard, hospital dashboard
- [x] Demo data layer (`lib/demo.ts`) — every screen runs with no backend
- [x] Physics-based motion system (springs, inertia, parallax) with
      `prefers-reduced-motion` support
- [x] Open-source launch package (license, contributing guide, templates)

## 🚧 Next: backend foundation

- [ ] Firebase project setup guide (free Spark plan) + `.env.example`
- [ ] Firebase Authentication (email) with the three roles: donor,
      hospital/requester, admin
- [ ] Firestore data model: `users`, `donors`, `requests`, `drives`, `stories`
- [ ] Firestore Security Rules — donor contact details hidden until a donor
      accepts a request (see [SECURITY.md](SECURITY.md))
- [ ] Swap `lib/demo.ts` reads for a real data layer (`lib/firestore.ts`,
      `lib/api.ts`) behind the same interfaces, so screens don't change

## 🔜 Then: the matching engine

- [ ] Implement `functions/src/matching.ts` (TypeScript Cloud Function):
      score = blood compatibility × proximity × availability × recency of
      last donation; unit-test the compatibility matrix against
      `CAN_DONATE_TO` / `CAN_RECEIVE_FROM` in `lib/demo.ts`
- [ ] Request lifecycle in Cloud Functions: requested → matching → alerted →
      responding → fulfilled, with duplicate/fake-request checks
      (`functions/src/fraud.ts`)
- [ ] Push alerts via Firebase Cloud Messaging; in-app simulated
      WhatsApp-style alert stays as the v1 fallback
- [ ] Donor accept/decline flow that reveals contact details only on accept

## 🔭 Later

- [ ] Hospital demand forecasting (`functions/src/forecasting.ts`) —
      predicted need by blood group and city
- [ ] Urdu localization (the UI is English-only today)
- [ ] Accessibility audit: screen readers, contrast, keyboard navigation on web
- [ ] Test suite: unit tests for matching/validators, component tests for the
      request flow
- [ ] Real WhatsApp Business API behind the existing alerts module
      (interface first; the API itself is paid, so this stays optional)
- [ ] Android APK release via GitHub Releases

## Hard constraints (please respect these in proposals)

- **$0 budget.** Free tiers only. No paid APIs, hosting, or services.
- **Full TypeScript stack.** No Python services.
- **Demo data is fictional** until a real, consented deployment exists — never
  invent real hospitals, donors, or statistics.
- **Privacy first.** Donor phone numbers are hidden until the donor accepts.

Want to pick something up? See
[docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md) and
[CONTRIBUTING.md](CONTRIBUTING.md).
