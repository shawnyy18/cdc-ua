-- =====================================================
-- CLEANUP SCRIPT FOR CDC DEPARTMENTS
-- Run this to reset departments to the canonical 54 CDC abbreviations
-- =====================================================

-- 1. Delete all existing departments
DELETE FROM barangays;

-- 2. Re-insert all 54 CDC departments (abbreviation only)
INSERT INTO barangays (name, municipality, province, description, is_active) VALUES
  ('ACCES',          'Clark Development Corporation', 'Pampanga', 'ACCES',          true),
  ('AD',             'Clark Development Corporation', 'Pampanga', 'AD',             true),
  ('AFG',            'Clark Development Corporation', 'Pampanga', 'AFG',            true),
  ('AMD',            'Clark Development Corporation', 'Pampanga', 'AMD',            true),
  ('AMD-SRD',        'Clark Development Corporation', 'Pampanga', 'AMD-SRD',        true),
  ('AMD-TO',         'Clark Development Corporation', 'Pampanga', 'AMD-TO',         true),
  ('AMD-WH',         'Clark Development Corporation', 'Pampanga', 'AMD-WH',         true),
  ('BAC',            'Clark Development Corporation', 'Pampanga', 'BAC',            true),
  ('BDBEG',          'Clark Development Corporation', 'Pampanga', 'BDBEG',          true),
  ('BDD',            'Clark Development Corporation', 'Pampanga', 'BDD',            true),
  ('BED',            'Clark Development Corporation', 'Pampanga', 'BED',            true),
  ('BFMD',           'Clark Development Corporation', 'Pampanga', 'BFMD',           true),
  ('BFPD',           'Clark Development Corporation', 'Pampanga', 'BFPD',           true),
  ('BOD',            'Clark Development Corporation', 'Pampanga', 'BOD',            true),
  ('BRO',            'Clark Development Corporation', 'Pampanga', 'BRO',            true),
  ('BS',             'Clark Development Corporation', 'Pampanga', 'BS',             true),
  ('CD',             'Clark Development Corporation', 'Pampanga', 'CD',             true),
  ('CMD',            'Clark Development Corporation', 'Pampanga', 'CMD',            true),
  ('COA',            'Clark Development Corporation', 'Pampanga', 'COA',            true),
  ('CPD',            'Clark Development Corporation', 'Pampanga', 'CPD',            true),
  ('CSD',            'Clark Development Corporation', 'Pampanga', 'CSD',            true),
  ('CSRPD',          'Clark Development Corporation', 'Pampanga', 'CSRPD',          true),
  ('EAD',            'Clark Development Corporation', 'Pampanga', 'EAD',            true),
  ('EPD',            'Clark Development Corporation', 'Pampanga', 'EPD',            true),
  ('EPRD',           'Clark Development Corporation', 'Pampanga', 'EPRD',           true),
  ('ESG',            'Clark Development Corporation', 'Pampanga', 'ESG',            true),
  ('FIN-AD',         'Clark Development Corporation', 'Pampanga', 'FIN-AD',         true),
  ('GIS',            'Clark Development Corporation', 'Pampanga', 'GIS',            true),
  ('HRD',            'Clark Development Corporation', 'Pampanga', 'HRD',            true),
  ('HSD',            'Clark Development Corporation', 'Pampanga', 'HSD',            true),
  ('HSDVACCINATION', 'Clark Development Corporation', 'Pampanga', 'HSDVACCINATION', true),
  ('HSDVT POLY',     'Clark Development Corporation', 'Pampanga', 'HSDVT POLY',     true),
  ('IAD',            'Clark Development Corporation', 'Pampanga', 'IAD',            true),
  ('IPD',            'Clark Development Corporation', 'Pampanga', 'IPD',            true),
  ('ITD',            'Clark Development Corporation', 'Pampanga', 'ITD',            true),
  ('LAG',            'Clark Development Corporation', 'Pampanga', 'LAG',            true),
  ('LD',             'Clark Development Corporation', 'Pampanga', 'LD',             true),
  ('OAVP/A',         'Clark Development Corporation', 'Pampanga', 'OAVP/A',         true),
  ('OP',             'Clark Development Corporation', 'Pampanga', 'OP',             true),
  ('PD',             'Clark Development Corporation', 'Pampanga', 'PD',             true),
  ('PD-BAC',         'Clark Development Corporation', 'Pampanga', 'PD-BAC',         true),
  ('PF',             'Clark Development Corporation', 'Pampanga', 'PF',             true),
  ('PMD',            'Clark Development Corporation', 'Pampanga', 'PMD',            true),
  ('PSD',            'Clark Development Corporation', 'Pampanga', 'PSD',            true),
  ('RMD',            'Clark Development Corporation', 'Pampanga', 'RMD',            true),
  ('SCADC',          'Clark Development Corporation', 'Pampanga', 'SCADC',          true),
  ('SCD',            'Clark Development Corporation', 'Pampanga', 'SCD',            true),
  ('SSD',            'Clark Development Corporation', 'Pampanga', 'SSD',            true),
  ('SSG',            'Clark Development Corporation', 'Pampanga', 'SSG',            true),
  ('TD',             'Clark Development Corporation', 'Pampanga', 'TD',             true),
  ('TFD',            'Clark Development Corporation', 'Pampanga', 'TFD',            true),
  ('TPD',            'Clark Development Corporation', 'Pampanga', 'TPD',            true),
  ('TSD',            'Clark Development Corporation', 'Pampanga', 'TSD',            true)
ON CONFLICT (name) DO UPDATE SET
  municipality = EXCLUDED.municipality,
  province = EXCLUDED.province,
  description = EXCLUDED.description,
  is_active = true;

-- 3. Clear user/donation refs that point to deleted departments
UPDATE users SET barangay_id = NULL
  WHERE barangay_id IS NOT NULL AND barangay_id NOT IN (SELECT id FROM barangays);

UPDATE donations SET barangay_id = NULL
  WHERE barangay_id IS NOT NULL AND barangay_id NOT IN (SELECT id FROM barangays);

-- 4. Verify 54 departments
SELECT name FROM barangays ORDER BY name;
