"""BloodLink — a small prototype that connects blood donors with patients in need.

Run:  .venv/bin/python app.py
Then open http://127.0.0.1:5000
"""
import os
import sqlite3
from flask import Flask, g, render_template, request, redirect, url_for

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "bloodlink.db")

BLOOD_GROUPS = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]

# A patient with blood group X can receive from the groups in the list.
COMPATIBLE = {
    "O-": ["O-"],
    "O+": ["O-", "O+"],
    "A-": ["O-", "A-"],
    "A+": ["O-", "O+", "A-", "A+"],
    "B-": ["O-", "B-"],
    "B+": ["O-", "O+", "B-", "B+"],
    "AB-": ["O-", "A-", "B-", "AB-"],
    "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
}

app = Flask(__name__)


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(DB_PATH)
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            city TEXT NOT NULL,
            phone TEXT NOT NULL,
            available INTEGER NOT NULL DEFAULT 1
        );
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            city TEXT NOT NULL,
            hospital TEXT NOT NULL,
            contact_phone TEXT NOT NULL,
            units INTEGER NOT NULL DEFAULT 1,
            status TEXT NOT NULL DEFAULT 'open'
        );
        """
    )
    count = db.execute("SELECT COUNT(*) FROM donors").fetchone()[0]
    if count == 0:
        # Sample data so the prototype is demo-ready on first run.
        db.executemany(
            "INSERT INTO donors (name, blood_group, city, phone) VALUES (?,?,?,?)",
            [
                ("Ali Raza", "O+", "Islamabad", "0300-1111111"),
                ("Fatima Khan", "A+", "Islamabad", "0300-2222222"),
                ("Bilal Ahmed", "B+", "Lahore", "0300-3333333"),
                ("Sara Malik", "AB+", "Karachi", "0300-4444444"),
                ("Usman Tariq", "O-", "Islamabad", "0300-5555555"),
            ],
        )
    db.commit()
    db.close()


@app.route("/")
def index():
    blood_group = request.args.get("blood_group", "")
    city = request.args.get("city", "").strip()
    donors = []
    searched = False
    if blood_group:
        searched = True
        groups = COMPATIBLE.get(blood_group, [blood_group])
        q = """SELECT * FROM donors
               WHERE available = 1 AND blood_group IN (%s)""" % ",".join("?" * len(groups))
        params = list(groups)
        if city:
            q += " AND city LIKE ?"
            params.append(f"%{city}%")
        q += " ORDER BY name"
        donors = get_db().execute(q, params).fetchall()
    return render_template(
        "index.html",
        blood_groups=BLOOD_GROUPS,
        blood_group=blood_group,
        city=city,
        donors=donors,
        searched=searched,
    )


@app.route("/donors/new", methods=["GET", "POST"])
def new_donor():
    if request.method == "POST":
        db = get_db()
        db.execute(
            "INSERT INTO donors (name, blood_group, city, phone) VALUES (?,?,?,?)",
            (
                request.form["name"].strip(),
                request.form["blood_group"],
                request.form["city"].strip(),
                request.form["phone"].strip(),
            ),
        )
        db.commit()
        return redirect(url_for("index"))
    return render_template("donor_form.html", blood_groups=BLOOD_GROUPS)


@app.route("/requests", methods=["GET"])
def list_requests():
    reqs = get_db().execute(
        "SELECT * FROM requests WHERE status = 'open' ORDER BY id DESC"
    ).fetchall()
    return render_template("requests.html", requests=reqs)


@app.route("/requests/new", methods=["GET", "POST"])
def new_request():
    if request.method == "POST":
        db = get_db()
        db.execute(
            """INSERT INTO requests
               (patient_name, blood_group, city, hospital, contact_phone, units)
               VALUES (?,?,?,?,?,?)""",
            (
                request.form["patient_name"].strip(),
                request.form["blood_group"],
                request.form["city"].strip(),
                request.form["hospital"].strip(),
                request.form["contact_phone"].strip(),
                int(request.form.get("units", 1) or 1),
            ),
        )
        db.commit()
        return redirect(url_for("list_requests"))
    return render_template("request_form.html", blood_groups=BLOOD_GROUPS)


@app.route("/requests/<int:req_id>/close", methods=["POST"])
def close_request(req_id):
    db = get_db()
    db.execute("UPDATE requests SET status = 'fulfilled' WHERE id = ?", (req_id,))
    db.commit()
    return redirect(url_for("list_requests"))


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
