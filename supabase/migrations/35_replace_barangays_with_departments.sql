-- Migration: Replace barangays with CDC departments
-- This migration repurposes the existing barangays table as a departments table for CDC.
-- We keep the same table structure and foreign keys (barangay_id on users/donations) to
-- minimise schema changes; we simply replace the rows with CDC department data.

-- 1. Clear existing barangay data
DELETE FROM barangays;

-- 2. Insert all CDC departments
INSERT INTO barangays (id, name, municipality, province, description, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'ACCES',          'Clark Development Corporation', 'Pampanga', 'ACCES', true, now(), now()),
  (gen_random_uuid(), 'AD',             'Clark Development Corporation', 'Pampanga', 'AD', true, now(), now()),
  (gen_random_uuid(), 'AFG',            'Clark Development Corporation', 'Pampanga', 'AFG', true, now(), now()),
  (gen_random_uuid(), 'AMD',            'Clark Development Corporation', 'Pampanga', 'AMD', true, now(), now()),
  (gen_random_uuid(), 'AMD-SRD',        'Clark Development Corporation', 'Pampanga', 'AMD-SRD', true, now(), now()),
  (gen_random_uuid(), 'AMD-TO',         'Clark Development Corporation', 'Pampanga', 'AMD-TO', true, now(), now()),
  (gen_random_uuid(), 'AMD-WH',         'Clark Development Corporation', 'Pampanga', 'AMD-WH', true, now(), now()),
  (gen_random_uuid(), 'BAC',            'Clark Development Corporation', 'Pampanga', 'BAC', true, now(), now()),
  (gen_random_uuid(), 'BDBEG',          'Clark Development Corporation', 'Pampanga', 'BDBEG', true, now(), now()),
  (gen_random_uuid(), 'BDD',            'Clark Development Corporation', 'Pampanga', 'BDD', true, now(), now()),
  (gen_random_uuid(), 'BED',            'Clark Development Corporation', 'Pampanga', 'BED', true, now(), now()),
  (gen_random_uuid(), 'BFMD',           'Clark Development Corporation', 'Pampanga', 'BFMD', true, now(), now()),
  (gen_random_uuid(), 'BFPD',           'Clark Development Corporation', 'Pampanga', 'BFPD', true, now(), now()),
  (gen_random_uuid(), 'BOD',            'Clark Development Corporation', 'Pampanga', 'BOD', true, now(), now()),
  (gen_random_uuid(), 'BRO',            'Clark Development Corporation', 'Pampanga', 'BRO', true, now(), now()),
  (gen_random_uuid(), 'BS',             'Clark Development Corporation', 'Pampanga', 'BS', true, now(), now()),
  (gen_random_uuid(), 'CD',             'Clark Development Corporation', 'Pampanga', 'CD', true, now(), now()),
  (gen_random_uuid(), 'CMD',            'Clark Development Corporation', 'Pampanga', 'CMD', true, now(), now()),
  (gen_random_uuid(), 'COA',            'Clark Development Corporation', 'Pampanga', 'COA', true, now(), now()),
  (gen_random_uuid(), 'CPD',            'Clark Development Corporation', 'Pampanga', 'CPD', true, now(), now()),
  (gen_random_uuid(), 'CSD',            'Clark Development Corporation', 'Pampanga', 'CSD', true, now(), now()),
  (gen_random_uuid(), 'CSRPD',          'Clark Development Corporation', 'Pampanga', 'CSRPD', true, now(), now()),
  (gen_random_uuid(), 'EAD',            'Clark Development Corporation', 'Pampanga', 'EAD', true, now(), now()),
  (gen_random_uuid(), 'EPD',            'Clark Development Corporation', 'Pampanga', 'EPD', true, now(), now()),
  (gen_random_uuid(), 'EPRD',           'Clark Development Corporation', 'Pampanga', 'EPRD', true, now(), now()),
  (gen_random_uuid(), 'ESG',            'Clark Development Corporation', 'Pampanga', 'ESG', true, now(), now()),
  (gen_random_uuid(), 'FIN-AD',         'Clark Development Corporation', 'Pampanga', 'FIN-AD', true, now(), now()),
  (gen_random_uuid(), 'GIS',            'Clark Development Corporation', 'Pampanga', 'GIS', true, now(), now()),
  (gen_random_uuid(), 'HRD',            'Clark Development Corporation', 'Pampanga', 'HRD', true, now(), now()),
  (gen_random_uuid(), 'HSD',            'Clark Development Corporation', 'Pampanga', 'HSD', true, now(), now()),
  (gen_random_uuid(), 'HSDVACCINATION', 'Clark Development Corporation', 'Pampanga', 'HSDVACCINATION', true, now(), now()),
  (gen_random_uuid(), 'HSDVT POLY',     'Clark Development Corporation', 'Pampanga', 'HSDVT POLY', true, now(), now()),
  (gen_random_uuid(), 'IAD',            'Clark Development Corporation', 'Pampanga', 'IAD', true, now(), now()),
  (gen_random_uuid(), 'IPD',            'Clark Development Corporation', 'Pampanga', 'IPD', true, now(), now()),
  (gen_random_uuid(), 'ITD',            'Clark Development Corporation', 'Pampanga', 'ITD', true, now(), now()),
  (gen_random_uuid(), 'LAG',            'Clark Development Corporation', 'Pampanga', 'LAG', true, now(), now()),
  (gen_random_uuid(), 'LD',             'Clark Development Corporation', 'Pampanga', 'LD', true, now(), now()),
  (gen_random_uuid(), 'OAVP/A',         'Clark Development Corporation', 'Pampanga', 'OAVP/A', true, now(), now()),
  (gen_random_uuid(), 'OP',             'Clark Development Corporation', 'Pampanga', 'OP', true, now(), now()),
  (gen_random_uuid(), 'PD',             'Clark Development Corporation', 'Pampanga', 'PD', true, now(), now()),
  (gen_random_uuid(), 'PD-BAC',         'Clark Development Corporation', 'Pampanga', 'PD-BAC', true, now(), now()),
  (gen_random_uuid(), 'PF',             'Clark Development Corporation', 'Pampanga', 'PF', true, now(), now()),
  (gen_random_uuid(), 'PMD',            'Clark Development Corporation', 'Pampanga', 'PMD', true, now(), now()),
  (gen_random_uuid(), 'PSD',            'Clark Development Corporation', 'Pampanga', 'PSD', true, now(), now()),
  (gen_random_uuid(), 'RMD',            'Clark Development Corporation', 'Pampanga', 'RMD', true, now(), now()),
  (gen_random_uuid(), 'SCADC',          'Clark Development Corporation', 'Pampanga', 'SCADC', true, now(), now()),
  (gen_random_uuid(), 'SCD',            'Clark Development Corporation', 'Pampanga', 'SCD', true, now(), now()),
  (gen_random_uuid(), 'SSD',            'Clark Development Corporation', 'Pampanga', 'SSD', true, now(), now()),
  (gen_random_uuid(), 'SSG',            'Clark Development Corporation', 'Pampanga', 'SSG', true, now(), now()),
  (gen_random_uuid(), 'TD',             'Clark Development Corporation', 'Pampanga', 'TD', true, now(), now()),
  (gen_random_uuid(), 'TFD',            'Clark Development Corporation', 'Pampanga', 'TFD', true, now(), now()),
  (gen_random_uuid(), 'TPD',            'Clark Development Corporation', 'Pampanga', 'TPD', true, now(), now()),
  (gen_random_uuid(), 'TSD',            'Clark Development Corporation', 'Pampanga', 'TSD', true, now(), now());

-- 3. Clear any user barangay_id references that now point to deleted barangays
UPDATE users SET barangay_id = NULL WHERE barangay_id IS NOT NULL
  AND barangay_id NOT IN (SELECT id FROM barangays);

-- 4. Clear any donation barangay_id references that now point to deleted barangays
UPDATE donations SET barangay_id = NULL WHERE barangay_id IS NOT NULL
  AND barangay_id NOT IN (SELECT id FROM barangays);

-- 5. Update drop-off centers to use CDC department-based names
DELETE FROM drop_off_centers;
INSERT INTO drop_off_centers (id, name, address, city, location, operating_hours, barangay_id)
SELECT gen_random_uuid(), 
       name || ' - CDC Drop-off', 
       'Clark Freeport Zone, Pampanga', 
       'Clark', 
       'Clark Freeport Zone, Pampanga',
       'Mon-Fri 8AM-5PM',
       id
FROM barangays
WHERE is_active = true;

-- Verify
SELECT name, description FROM barangays ORDER BY name;
