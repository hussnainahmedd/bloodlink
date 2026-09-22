# 🩸 BloodLink — AI-Driven Emergency Blood Donor Matching

> **Showcase project by Hussnain Ahmad** — turning a student's idea into a fully functional product.

![Status](https://img.shields.io/badge/status-in%20active%20development-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## The Idea

In emergencies, finding a blood donor in Pakistan still runs on phone calls, WhatsApp forwards, and luck. **BloodLink** finds the right donors within minutes — an AI matching engine scores nearby donors by blood compatibility, distance, and availability, then alerts them instantly.

**One-line pitch:** *BloodLink is an AI-powered system that finds blood donors for emergency patients in Pakistan within minutes, by alerting the right donors on WhatsApp.*

---

## Platforms

One codebase, three apps — **React Native + Expo**:

| Platform | Target |
|----------|--------|
| 🤖 Android | Native app (Play Store) |
| 🍎 iOS | Native app (App Store) |
| 🌐 Web | Responsive web app |

## Tech Stack

- **Mobile + Web:** React Native (TypeScript) with Expo — single codebase for Android, iOS, and web
- **Backend:** Firebase — Authentication, Firestore (realtime database), Cloud Messaging (push alerts)
- **AI Matching Engine:** Python service — donor scoring (blood compatibility × proximity × availability), demand forecasting, fake-request detection
- **Alerts:** Push notifications + WhatsApp Business API

## Key Features

1. **Donor registration** — blood group, location, availability schedule, donation history
2. **Emergency requests** — hospital or patient posts a request with blood group, units needed, and location
3. **AI donor matching** — every request is scored against donors:
   - Blood compatibility (e.g. an O+ request matches O+ and O− donors)
   - Distance / proximity
   - Donor availability and recency of last donation
4. **Instant alerts** — top-matched donors get push + WhatsApp alerts within seconds
5. **Demand forecasting** — predicts blood demand by region so hospitals can prepare
6. **Fake-request detection** — flags suspicious or duplicate emergency requests
7. **Hospital dashboard** (web) — manage requests, track responses, view forecasts

## Project Status

🚧 **In active development** — currently in the design phase. The app is being built screen by screen, starting with onboarding, donor registration, and the emergency request flow.

## Roadmap

- [x] Concept, pitch, and system design
- [ ] UI/UX design preview (mobile + web)
- [ ] Project scaffolding (Expo + Firebase)
- [ ] Auth + donor registration
- [ ] Emergency request flow
- [ ] AI matching engine (Python service)
- [ ] Push + WhatsApp alerts
- [ ] Demand forecasting dashboard
- [ ] Beta release (Android, iOS, Web)

---

## About

Built by **Hussnain Ahmad** — BSCS student at Air University, Islamabad, working at the intersection of AI and real-world problems.

- GitHub: [@hussnainahmedd](https://github.com/hussnainahmedd)
- LinkedIn: [hussnainn](https://www.linkedin.com/in/hussnainn)

## License

MIT — free to learn from and build upon.
