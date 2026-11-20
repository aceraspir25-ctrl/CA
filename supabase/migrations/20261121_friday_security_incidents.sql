-- ============================================================
-- Migration: 20261121_friday_security_incidents.sql
-- Additive migration — adds security_incidents table for FRIDAY
-- Does NOT modify or drop any existing tables
-- ============================================================

-- Security incidents table for FRIDAY agent
CREATE TABLE IF NOT EXISTS security_incidents (
  id              TEXT PRIMARY KEY DEFAULT 'INC-' || extract(epoch from now())::text || '-' || substr(md5(random()::text), 1, 6),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  severity        TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  category        TEXT NOT NULL,
  title           TEXT NOT NULL,
  detail          TEXT NOT NULL DEFAULT '',
  source          TEXT NOT NULL DEFAULT 'unknown',
  resolved        BOOLEAN NOT NULL DEFAULT false,
  resolved_at     TIMESTAMPTZ,
  resolution_note TEXT,
  resolved_by     UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE security_incidents ENABLE ROW LEVEL SECURITY;

-- Only service_role can read/write security incidents (FRIDAY uses service_role)
-- No client-side access to incident details
CREATE POLICY "security_incidents_service_only"
  ON security_incidents
  USING (false); -- Blocks all client-side access; service_role bypasses RLS

-- Index for fast filtering
CREATE INDEX IF NOT EXISTS idx_security_incidents_severity ON security_incidents (severity);
CREATE INDEX IF NOT EXISTS idx_security_incidents_resolved ON security_incidents (resolved);
CREATE INDEX IF NOT EXISTS idx_security_incidents_created ON security_incidents (created_at DESC);

-- Agent trust scores snapshot table (for trending over time)
CREATE TABLE IF NOT EXISTS agent_trust_snapshots (
  id          BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  audit_id    TEXT NOT NULL,
  agent_code  TEXT NOT NULL,
  trust_score INTEGER NOT NULL CHECK (trust_score BETWEEN 0 AND 100),
  health_score INTEGER NOT NULL CHECK (health_score BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_trust_snapshots_agent ON agent_trust_snapshots (agent_code, recorded_at DESC);

-- Comments
COMMENT ON TABLE security_incidents IS 'FRIDAY Security Agent incident log — service_role access only';
COMMENT ON TABLE agent_trust_snapshots IS 'Historical agent trust score snapshots for security trend analysis';
