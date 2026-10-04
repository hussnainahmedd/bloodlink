# Good First Issues — draft list for maintainer review

These are **drafts**. None of them exist as GitHub issues yet. When BloodLink
goes public, the maintainer will create the approved ones with the labels
shown (`good first issue`, plus `hacktoberfest` during October).

Each issue is scoped so a new contributor can finish it without designing the
whole system, and every acceptance test can be checked against demo data.

---

## 1. Implement blood-group compatibility helpers in `lib/blood-groups.ts`
**Labels:** `good first issue`, `typescript`
`lib/demo.ts` already contains the verified `CAN_DONATE_TO` /
`CAN_RECEIVE_FROM` tables. Move them into `lib/blood-groups.ts` as typed
helpers (`canDonateTo(donor, recipient)`, `compatibleDonorsFor(group)`),
re-export from `demo.ts` so nothing else breaks.
**Done when:** helpers exist with unit-testable pure functions; screens that
import from `demo.ts` still work; `npm run typecheck` passes.

## 2. Implement form validators in `lib/validators.ts`
**Labels:** `good first issue`, `typescript`
Email, Pakistani mobile format, blood-group selection, units (1–10), and
required-field checks used by the request and signup forms.
**Done when:** validators are pure functions with clear error strings; the
request form shows inline errors instead of failing silently.

## 3. Implement date/format helpers in `lib/format.ts`
**Labels:** `good first issue`, `typescript`
"Posted 12 min ago", last-donation labels, distance formatting (km with one
decimal under 10 km).
**Done when:** helpers replace the hard-coded strings in demo screens where
practical; typecheck passes.

## 4. Add a test runner and unit tests for matching/compatibility
**Labels:** `good first issue`, `testing`, `hacktoberfest`
Add Vitest (free, standard for TS) and tests asserting the full 8×8
compatibility matrix: O− donates to all, AB+ receives from all, etc.
**Done when:** `npm test` runs green in CI-less local flow and covers all
64 donor/recipient pairs.

## 5. Accessibility pass: form labels and focus states
**Labels:** `good first issue`, `accessibility`, `hacktoberfest`
Audit the request form and auth screens: every input has a label, visible
focus state, and sufficient contrast.
**Done when:** keyboard-only completion of the request form is possible on
web; changes listed per screen in the PR.

## 6. `prefers-reduced-motion` audit of motion components
**Labels:** `good first issue`, `accessibility`
Check `components/motion/*` (Magnetic, Parallax, SpringButton, TiltCard)
and confirm each one reduces/disables motion when the OS setting is on;
fix any that don't.
**Done when:** each component is verified or fixed, with a short note in
the PR describing behavior in both modes.

## 7. Firebase setup guide (docs only)
**Labels:** `good first issue`, `documentation`, `hacktoberfest`
Write `docs/FIREBASE_SETUP.md`: creating a free Spark project, enabling
email auth + Firestore, filling `.env` from `.env.example`, and the
security warning from `SECURITY.md`.
**Done when:** a contributor with no Firebase account can follow it end to
end; no real credentials anywhere in the guide.

## 8. Design the Firestore data model (docs + types only)
**Labels:** `enhancement`, `firebase`, `discussion`
Propose TypeScript types + Firestore collections for `users`, `donors`,
`requests`, `drives`, `stories` in `docs/DATA_MODEL.md`, matching the
interfaces already in `lib/demo.ts`. No backend code yet — this unlocks
issues 9–11.
**Done when:** maintainer approves the doc; every demo interface maps to a
collection or a documented exception.

## 9. Firebase Auth wiring (depends on #8)
**Labels:** `enhancement`, `firebase`
Implement `lib/firebase.ts` + `lib/auth.tsx`: initialize from `.env`,
email signup/login, role claim (donor / hospital / admin), keep demo mode
when no `.env` is present.
**Done when:** signup/login/logout work against a contributor's own free
Firebase project; demo mode still works with no `.env`.

## 10. Firestore Security Rules (depends on #8)
**Labels:** `enhancement`, `firebase`, `security`
Rules enforcing: donors read requests without contact details; a request's
contact is visible only to its owner and to donors who accepted it; users
edit only their own profile.
**Done when:** rules file plus emulator tests (or documented manual tests)
prove the contact-hiding rule.

## 11. Implement the matching engine in `functions/src/matching.ts` (depends on #4, #8)
**Labels:** `enhancement`, `firebase`, `typescript`
Score = compatibility × proximity × availability × recency of last
donation. Rank donors for a request; return top N with scores.
**Done when:** unit tests cover universal-donor, no-match, unavailable, and
recently-donated cases; scores are explainable (each factor visible).

## 12. Urdu localization scaffolding
**Labels:** `enhancement`, `i18n`, `hacktoberfest`
Add a simple typed strings file for the home and request-flow screens
(English + Urdu), with a language toggle. Translations by contributors;
machine translation marked as draft.
**Done when:** home + request screens switch fully between EN/UR without
layout breakage, including right-to-left-safe spacing.

---

### For the maintainer (before going public)

- Create issues 1–7 first — they're unblocked today and demo-data safe.
- Hold 9–11 until the data-model discussion (#8) settles.
- Apply labels: `good first issue`, `hacktoberfest`, `firebase`,
  `accessibility`, `documentation`.
- Pin one "Start here 👋" issue linking CONTRIBUTING.md + this list.
