-- =====================================================
-- HAZARDOUS ITEMS ADMIN DISPOSITION LOGIC
-- Ensures hazardous items can only be disposed,
-- bypassing reuse/donate workflows
-- =====================================================

-- Step 1: Create a trigger function to auto-lock hazardous items on insert
CREATE OR REPLACE FUNCTION lock_hazardous_items_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a hazardous item, automatically set disposition to 'dispose'
  IF NEW.device_category = 'hazardous-consumables' THEN
    NEW.is_hazardous_locked := true;
    NEW.disposition_type := 'dispose';
    NEW.condition := COALESCE(NEW.condition, 'n/a');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger on INSERT
DROP TRIGGER IF EXISTS trigger_lock_hazardous_items_insert ON donations;
CREATE TRIGGER trigger_lock_hazardous_items_insert
  BEFORE INSERT ON donations
  FOR EACH ROW
  EXECUTE FUNCTION lock_hazardous_items_on_insert();

-- Step 2: Create a trigger function to prevent admins from changing disposition of hazardous items
CREATE OR REPLACE FUNCTION prevent_hazardous_disposition_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a hazardous item and someone tries to change disposition, reject it
  IF NEW.is_hazardous_locked = true AND OLD.disposition_type IS DISTINCT FROM NEW.disposition_type THEN
    IF NEW.disposition_type IS NOT NULL AND NEW.disposition_type != 'dispose' THEN
      RAISE EXCEPTION 'Hazardous items can only be disposed. Current disposition: %', NEW.disposition_type;
    END IF;
  END IF;
  
  -- Ensure hazardous items stay locked
  IF NEW.device_category = 'hazardous-consumables' THEN
    NEW.is_hazardous_locked := true;
    NEW.disposition_type := 'dispose';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger on UPDATE
DROP TRIGGER IF EXISTS trigger_prevent_hazardous_disposition_changes ON donations;
CREATE TRIGGER trigger_prevent_hazardous_disposition_changes
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION prevent_hazardous_disposition_changes();

-- Step 3: Create a function for admins to fetch only disposable hazardous items
CREATE OR REPLACE FUNCTION get_hazardous_items_for_disposal(p_limit INT DEFAULT 50)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  device_type VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  hazard_type VARCHAR,
  quantity_weight VARCHAR,
  condition VARCHAR,
  property_number VARCHAR,
  serial_number VARCHAR,
  is_cdc_asset BOOLEAN,
  status VARCHAR,
  disposition_type VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE,
  user_email VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.user_id,
    d.device_type,
    d.brand,
    d.model,
    d.hazard_type,
    d.quantity_weight,
    d.condition,
    d.property_number,
    d.serial_number,
    d.is_cdc_asset,
    d.status,
    d.disposition_type,
    d.created_at,
    u.email
  FROM donations d
  LEFT JOIN users u ON d.user_id = u.id
  WHERE d.device_category = 'hazardous-consumables'
    AND d.is_hazardous_locked = true
  ORDER BY d.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create a function to update hazardous item disposition (approval/rejection)
CREATE OR REPLACE FUNCTION update_hazardous_disposition(
  p_donation_id UUID,
  p_admin_id UUID,
  p_disposition_notes TEXT,
  p_status VARCHAR
)
RETURNS TABLE(success BOOLEAN, message VARCHAR) AS $$
DECLARE
  v_donation RECORD;
BEGIN
  -- Fetch the donation
  SELECT * INTO v_donation FROM donations WHERE id = p_donation_id;
  
  -- Verify it's a hazardous item
  IF v_donation.device_category != 'hazardous-consumables' THEN
    RETURN QUERY SELECT false, 'Item is not a hazardous item';
    RETURN;
  END IF;
  
  -- Verify it's locked
  IF v_donation.is_hazardous_locked != true THEN
    RETURN QUERY SELECT false, 'Hazardous item is not properly locked';
    RETURN;
  END IF;
  
  -- Update the donation with admin evaluation
  UPDATE donations
  SET
    status = p_status,
    disposition_type = 'dispose',
    disposition_notes = p_disposition_notes,
    evaluated_by = p_admin_id,
    evaluated_at = NOW(),
    updated_at = NOW()
  WHERE id = p_donation_id;
  
  RETURN QUERY SELECT true, format('Hazardous item %s updated to status: %s', p_donation_id::text, p_status);
END;
$$ LANGUAGE plpgsql;

-- Step 5: Add comment explaining the hazardous item rules
COMMENT ON FUNCTION lock_hazardous_items_on_insert() IS 'Auto-lock hazardous items to disposal workflow on submission';
COMMENT ON FUNCTION prevent_hazardous_disposition_changes() IS 'Prevent admins from changing disposal disposition of hazardous items';
COMMENT ON FUNCTION get_hazardous_items_for_disposal(INT) IS 'Fetch hazardous items waiting for admin approval';
COMMENT ON FUNCTION update_hazardous_disposition(UUID, UUID, TEXT, VARCHAR) IS 'Update hazardous item status after admin review';
