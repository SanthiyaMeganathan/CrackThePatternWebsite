# 🚀 Getting Started – Crack The Pattern

This project has two parts that run simultaneously:

| Part | Directory | Port |
|---|---|---|
| **Frontend** (React + Vite) | `/` (project root) | `http://localhost:5173` |
| **Backend** (Node.js + Express) | `backend/` | `http://localhost:4000` |

---

## Prerequisites

Make sure these are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- A [Supabase](https://supabase.com) project with the schema applied

---

## 1 — Clone & Install Dependencies

```bash
# Install frontend dependencies (from project root)
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

## 2 — Set Up Environment Variables

### Backend `.env`

> ⚠️ The backend **will crash** without this file. `nodemon server.js` failing with  
> `"supabaseUrl is required"` means this file is missing.

```bash
cd backend
cp .env.example .env
```

Then open `backend/.env` and fill in your real values:

```env
# ─── Supabase ───────────────────────────────────────────
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─── Razorpay ───────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ─── Resend (email OTP) ─────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@crackthepattern.com

# ─── App ────────────────────────────────────────────────
PORT=4000
FRONTEND_URL=http://localhost:5173
COURSE_PRICE_INR=4999

# ─── Session ────────────────────────────────────────────
SESSION_SECRET=change_this_to_a_long_random_string_in_production
```

> **Where to find Supabase keys:**  
> Supabase Dashboard → Your Project → Settings → API  
> Copy **Project URL** and **service_role** secret key.

---

### Frontend `.env.local`

```bash
# From the project root
cp .env.example .env.local
```

Open `.env.local` and fill in:

```env
VITE_API_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
VITE_COURSE_PRICE_INR=4999

# Your YouTube embed URL or Vimeo player URL
VITE_DEMO_VIDEO_URL=https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1
```

> **Note:** `VITE_RAZORPAY_KEY_ID` is the **public** key (safe to expose). Never put the secret key in frontend env files.

---

## 3 — Set Up the Database

1. Go to your [Supabase](https://supabase.com) project
2. Open the **SQL Editor**
3. Paste the entire contents of `backend/db/schema.sql` and click **Run**

This creates the `users`, `leaderboard_scores`, `course_modules`, and `leads` tables.

---

## 4 — Start the Application

Open **two terminal windows** and run each command in its own window.

### Terminal 1 — Backend

```bash
cd /path/to/CrackThePatternWebsite/backend
nodemon server.js
```

You should see:
```
✅ CTP Backend running on http://localhost:4000
```

### Terminal 2 — Frontend

```bash
cd /path/to/CrackThePatternWebsite
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser. ✅

---

## 5 — Verify Everything is Working

| Check | How |
|---|---|
| Backend is live | Visit `http://localhost:4000/health` — should return `{ "status": "ok" }` |
| Frontend loads | Open `http://localhost:5173` — homepage renders |
| API connected | Click "Watch Free Demo" → fill the form → should submit without errors |
| Auth works | Click "Sign In" → enter a registered email → OTP email arrives |

---

## 6 — Common Errors & Fixes

### `supabaseUrl is required`
**Cause:** `backend/.env` file is missing or `SUPABASE_URL` is not set.  
**Fix:** Run `cp .env.example .env` inside the `backend/` folder and fill in your Supabase URL.

---

### `EADDRINUSE: address already in use :::4000`
**Cause:** Port 4000 is already taken.  
**Fix:** Either kill the process using that port, or change `PORT` in `backend/.env`.

```bash
# Find and kill the process on port 4000
lsof -ti:4000 | xargs kill -9
```

---

### Frontend shows blank page / API errors
**Cause:** Frontend `.env.local` is missing or `VITE_API_URL` points to the wrong port.  
**Fix:** Ensure `VITE_API_URL=http://localhost:4000/api/v1` in `.env.local` and restart the dev server.

---

### Razorpay payment popup doesn't open
**Cause:** `VITE_RAZORPAY_KEY_ID` is not set in frontend `.env.local`.  
**Fix:** Add your Razorpay test key (`rzp_test_...`) to `.env.local`.

---

## Project Structure (Quick Reference)

```
CrackThePatternWebsite/
├── src/                    ← React frontend (Vite + Tailwind)
│   ├── context/            ← AuthContext, AuthModalContext, DemoModalContext
│   ├── hooks/              ← useEnrollGate
│   ├── components/         ← Navbar, AuthModal, DemoModal, ProtectedRoute
│   └── pages/              ← Home, TheCourse, Leaderboard, MyLearning, Checkout, Login…
│
├── backend/                ← Node.js / Express API
│   ├── db/
│   │   ├── schema.sql      ← Run this in Supabase SQL Editor
│   │   └── supabase.js     ← Supabase client (service role)
│   ├── middleware/
│   │   └── sessionGuard.js ← Token validation + paid guard
│   ├── routes/
│   │   ├── auth.js         ← Signup, OTP login, session validation
│   │   ├── payment.js      ← Razorpay order creation + webhook
│   │   ├── leads.js        ← Demo form lead capture
│   │   ├── leaderboard.js  ← Public weekly scores
│   │   └── dashboard.js    ← Signed course content URLs
│   ├── server.js           ← Express entry point
│   ├── .env.example        ← Template — copy to .env
│   └── package.json
│
├── .env.example            ← Frontend template — copy to .env.local
└── package.json
```
