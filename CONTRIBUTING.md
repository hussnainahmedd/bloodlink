# Contributing to BloodLink

Thanks for wanting to help. BloodLink is a student-led, open-source prototype
with a real mission: making emergency blood-donor matching faster in Pakistan.
Contributions of every size are welcome — code, tests, docs, Urdu translation,
accessibility, and design polish.

## Before you start

- BloodLink is a **prototype on fictional demo data**. It is not a live medical
  service. Read the disclaimer in [README.md](README.md) and the privacy rules
  in [SECURITY.md](SECURITY.md) first — they shape what can be built.
- **$0 budget, free tiers only.** Please don't add paid services or APIs.
- **TypeScript only.** The whole stack (app + Cloud Functions) is TypeScript.

## Ways to contribute

1. **Pick an issue.** Start with the `good first issue` label or
   [docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md). Comment on the
   issue saying you'd like to work on it, so two people don't do the same work.
2. **Report a bug** with the bug-report template. Screenshots help.
3. **Suggest a feature** with the feature-request template. Explain the problem
   first, the solution second.
4. **Improve docs.** Typos, unclear steps, missing setup notes — all fair game.

## Development setup

```bash
git clone https://github.com/hussnainahmedd/bloodlink.git
cd bloodlink
npm install
npm run web         # web
npm start           # Expo dev server (Android/iOS via Expo Go)
npm run typecheck   # must pass before you open a PR
```

No `.env` is needed yet — the app runs on `lib/demo.ts`. When you work on the
Firebase layer, copy `.env.example` to `.env` and use **your own** free-tier
Firebase project. Never commit real credentials.

## Branch and PR flow

1. Fork the repo (or branch, if you have write access).
2. Create a branch: `feat/short-name`, `fix/short-name`, or `docs/short-name`.
3. Keep the change small and focused — one issue per PR.
4. Run `npm run typecheck` and make sure the app still runs (`npm run web`).
5. Open a PR using the PR template. Link the issue (`Closes #123`).
6. A maintainer reviews; expect friendly, specific feedback. Address review
   comments with new commits — don't force-push during review unless asked.

## Code guidelines

- TypeScript strict; no `any` without a comment explaining why.
- Keep business logic out of screens: data access goes in `lib/`, reusable UI
  in `components/`, Cloud Functions in `functions/src/`.
- Screens must keep working on demo data unless the PR is explicitly the
  Firebase swap for that screen.
- Respect `prefers-reduced-motion` in any new animation; keep motion subtle —
  a stressed user in an emergency must be able to act in seconds.
- Accessibility matters: semantic elements, visible focus states, labels on
  form fields, sufficient contrast.
- Never hard-code real-looking personal data. Use fictional demo data, and
  keep donor phone numbers hidden until a donor accepts a request.

## Commit messages

Short, present-tense, and specific:

```
feat: add blood-group filter to find-donors
fix: hide donor contact until request is accepted
docs: add Firebase setup guide
```

## Review and merging

The maintainer ([@hussnainahmedd](https://github.com/hussnainahmedd)) reviews
and merges PRs. Small, well-described PRs get reviewed fastest. If a PR sits
for more than a week without a review, a polite ping on the PR is welcome.

By contributing, you agree your contributions are licensed under the MIT
License (see [LICENSE](LICENSE)), and that you follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

Open a discussion or ask on the issue you're looking at. No question is too
basic — most of BloodLink was built by a student learning in public.
