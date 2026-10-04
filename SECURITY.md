# Security Policy

## Status

BloodLink is a **research / showcase prototype**. It runs entirely on fictional
demo data (`lib/demo.ts`). It is **not** a production medical service, is not
connected to any hospital, and must not be used to request or offer real blood
donations.

## Reporting a vulnerability

If you find a security issue, please do **not** open a public issue.

1. Prefer GitHub's private vulnerability reporting for this repository
   (Security tab → "Report a vulnerability"), once enabled.
2. Otherwise, contact the maintainer privately on GitHub:
   [@hussnainahmedd](https://github.com/hussnainahmedd).

Include what you found, how to reproduce it, and what data (if any) it exposes.
You should get an acknowledgement within a few days.

## Secrets

- Never commit API keys, service-account JSON files, `.env` files, or real
  Firebase credentials. Use `.env.example` as the template and keep real values
  in your local `.env` (git-ignored).
- Firebase web configuration is not, by itself, a secret — but every project
  must still be protected with strict Firestore Security Rules and App Check
  before any real deployment. Treat writing those rules as a security task,
  not a formality.
- If a secret is ever committed by accident, rotate it immediately and tell the
  maintainer — removing the commit alone does not un-expose it.

## Data rules for contributors

- Demo and test data must be fictional. No real names paired with blood
  groups, no real phone numbers, no real hospital patient data — in code,
  fixtures, screenshots, or issues.
- Donor phone numbers must stay hidden until a donor explicitly accepts a
  request. Any feature that exposes contact details earlier is a security and
  privacy bug.
