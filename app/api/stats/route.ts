import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get total devices donated (count of all donations)
    const { count: totalDevices, error: devicesError } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true });

    if (devicesError) {
      console.error('Error fetching donations count:', devicesError);
    }

    // Get total CO2 saved (sum of co2_saved from donations)
    const { data: co2Data, error: co2Error } = await supabase
      .from('donations')
      .select('co2_saved');

    if (co2Error) {
      console.error('Error fetching CO2 data:', co2Error);
    }

    const totalCO2Saved = co2Data?.reduce((sum, row) => sum + (Number(row.co2_saved) || 0), 0) || 0;

    // Get active users count (users who are active)
    const { count: activeUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (usersError) {
      console.error('Error fetching users count:', usersError);
    }

    // Get partner centers count (active drop-off centers)
    const { count: partnerCenters, error: centersError } = await supabase
      .from('drop_off_centers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (centersError) {
      console.error('Error fetching centers count:', centersError);
    }

    return NextResponse.json({
      totalDevices: totalDevices || 0,
      totalCO2Saved: Math.round(totalCO2Saved * 100) / 100,
      activeUsers: activeUsers || 0,
      partnerCenters: partnerCenters || 0
    });
  } catch (error) {
    console.error('Error fetching platform stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch platform stats' },
      { status: 500 }
    );
  }
}
