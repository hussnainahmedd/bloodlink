# Changelog

All notable changes to BloodLink are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Open-source launch package: MIT license, contributing guide, code of
  conduct, security policy, roadmap, issue/PR templates, CI typecheck
  workflow, Dependabot, and 13 starter issues (`good first issue`,
  `hacktoberfest`, Firebase track).
- Screenshots in README / `docs/screenshots/`.

### Planned (see ROADMAP.md and GitHub issues)
- Firebase Auth + Firestore data layer behind the demo-data interfaces
- Donor matching engine (TypeScript Cloud Functions)
- Firestore Security Rules (donor contact hidden until acceptance)
- Urdu localization

## [1.0.0] — 2026-09-24

### Added
- Frontend v1: complete Expo (React Native + TypeScript) UI for Android,
  iOS, and Web from one codebase — home, find donors, emergency request
  flow, blood-group compatibility guide, eligibility checker, donation
  drives, donor stories, knowledge hub, donor & hospital dashboards.
- Demo data layer (`lib/demo.ts`): the whole app runs with no backend.
- Physics-based motion system with `prefers-reduced-motion` support.
- Warm editorial design system (Fraunces / Inter / IBM Plex Mono).
