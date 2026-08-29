CREATE TABLE IF NOT EXISTS village_risk_state (
  desa TEXT PRIMARY KEY,
  last_level TEXT NOT NULL,
  last_checked_at TEXT NOT NULL,
  last_notified_at TEXT
);