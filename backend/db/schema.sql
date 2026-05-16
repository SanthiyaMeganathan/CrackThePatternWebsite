-- ============================================================
-- Crack The Pattern – Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users / Students ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT,
  email                 TEXT UNIQUE NOT NULL,
  phone                 TEXT,
  -- 'Lead' | 'Paid'
  account_status        TEXT NOT NULL DEFAULT 'Lead',
  current_session_token TEXT,
  otp_code              TEXT,
  otp_expires_at        TIMESTAMPTZ,
  razorpay_payment_id   TEXT,
  razorpay_order_id     TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Leaderboard Scores ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS leaderboard_scores (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES users(id) ON DELETE CASCADE,
  student_display_name TEXT NOT NULL,          -- anonymised or real name per user preference
  week_number          INTEGER NOT NULL,        -- 1-based week of the batch
  score                INTEGER NOT NULL,
  max_score            INTEGER NOT NULL DEFAULT 100,
  percentage           NUMERIC(5,2) GENERATED ALWAYS AS (score::NUMERIC / max_score * 100) STORED,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Course Modules ───────────────────────────────────────────
-- Storage paths live here; signed URLs generated server-side only
CREATE TABLE IF NOT EXISTS course_modules (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  description    TEXT,
  -- 'video' | 'pdf' | 'link'
  type           TEXT NOT NULL DEFAULT 'video',
  storage_path   TEXT NOT NULL,    -- Supabase Storage path (never exposed to client)
  module_order   INTEGER NOT NULL DEFAULT 0,
  week_number    INTEGER,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Leads (demo form submissions) ───────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT NOT NULL,
  source     TEXT DEFAULT 'demo_modal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Row-Level Security ──────────────────────────────────────
-- We use the service-role key on the backend, so RLS is
-- informational here. Enable for extra safety if you add
-- Supabase Auth in the future.

ALTER TABLE users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules    ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads             ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically.
-- Public read for leaderboard:
CREATE POLICY "Public leaderboard read"
  ON leaderboard_scores FOR SELECT
  USING (true);

-- ─── Seed: Sample leaderboard data ───────────────────────────
-- Remove after real batch begins
INSERT INTO leaderboard_scores (user_id, student_display_name, week_number, score, max_score)
VALUES
  (gen_random_uuid(), 'Priya S.', 1, 92, 100),
  (gen_random_uuid(), 'Arjun M.', 1, 88, 100),
  (gen_random_uuid(), 'Divya K.', 1, 85, 100),
  (gen_random_uuid(), 'Karthik R.', 1, 82, 100),
  (gen_random_uuid(), 'Sneha L.', 1, 79, 100),
  (gen_random_uuid(), 'Rahul V.', 1, 75, 100),
  (gen_random_uuid(), 'Meena T.', 1, 72, 100),
  (gen_random_uuid(), 'Arun B.', 1, 68, 100);
