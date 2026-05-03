-- ============================================================
-- EcoKonek: Accountability Forms Storage Bucket + RLS Policies
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'accountability_forms',
  'accountability_forms',
  false,  -- private bucket (requires auth)
  10485760,  -- 10 MB max file size
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- 2. RLS Policy: Allow authenticated admins to UPLOAD (INSERT) files
CREATE POLICY "Admins can upload accountability forms"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'accountability_forms'
  AND EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- 3. RLS Policy: Allow authenticated admins to READ (SELECT/download) files
CREATE POLICY "Admins can download accountability forms"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'accountability_forms'
  AND EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- 4. RLS Policy: Allow authenticated admins to UPDATE (overwrite) files
CREATE POLICY "Admins can update accountability forms"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'accountability_forms'
  AND EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- 5. RLS Policy: Allow authenticated admins to DELETE files
CREATE POLICY "Admins can delete accountability forms"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'accountability_forms'
  AND EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- ============================================================
-- USAGE INSTRUCTIONS:
-- After running this script, upload your form templates via:
--   Supabase Dashboard > Storage > accountability_forms
--
-- Recommended file names:
--   waste_material_report.pdf
--   request_for_entry_to_cdc_warehouse.pdf
-- ============================================================
