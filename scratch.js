const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('donations').select('*').eq('device_category', 'hazardous-consumables');
  console.log('hazardous device_category records:', data?.length);
  
  const { data: d2 } = await supabase.from('donations').select('*').like('description', '%IMAGE_URL%');
  console.log('image url records:', d2?.length);
  if (d2?.length > 0) {
    console.log(d2[0].description);
  }
}
check();
