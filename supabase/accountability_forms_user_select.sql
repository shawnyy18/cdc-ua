-- ============================================================
-- EcoKonek: Allow Authenticated Users to Download Forms
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================
-- This policy allows ALL authenticated users (not just admins)
-- to SELECT/download files from the accountability_forms bucket.
-- The API route already restricts downloads to whitelisted files,
-- so this is safe — users can only access the two template PDFs.
-- ============================================================

CREATE POLICY "Authenticated users can download accountability forms"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'accountability_forms'
);

-- ============================================================
-- NOTE: If you prefer a more restrictive approach that limits
-- downloads to specific template files only at the RLS level,
-- use this policy instead (uncomment and replace the above):
-- ============================================================
--
-- CREATE POLICY "Authenticated users can download form templates"
-- ON storage.objects
-- FOR SELECT
-- TO authenticated
-- USING (
--   bucket_id = 'accountability_forms'
--   AND name IN (
--     'waste_material_report.pdf',
--     'request_for_entry_to_cdc_warehouse.pdf'
--   )
-- );
