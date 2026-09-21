# 🩸 BloodLink

A small prototype that connects **blood donors** with **patients in need** — a problem people face every single day (blood donation requests flood WhatsApp groups across Pakistan constantly, and finding a matching donor in time is often chaotic).

## What it does

- **Find donors**: search by needed blood group + city. Results include medically compatible groups (e.g. an O+ patient matches O− and O+ donors).
- **Register as donor**: name, blood group, city, phone.
- **Post a blood request**: patient, hospital, units needed, contact — visible on the open requests board.
- **Mark fulfilled**: close a request once it's resolved.

## Run it

```bash
python3 -m venv .venv
.venv/bin/pip install flask
.venv/bin/python app.py
```

Then open http://127.0.0.1:5000

Ships with a few sample donors (Islamabad/Lahore/Karachi) so it's demo-ready on first run. Uses SQLite — no setup needed.

## Stack

Python · Flask · SQLite · plain HTML/CSS (no build step, no JS framework)

## Roadmap ideas

- SMS/WhatsApp alerts to nearby matching donors when a request is posted
- Donor availability toggle + last-donation date (donors need ~3 months between donations)
- Hospital accounts with verified requests
