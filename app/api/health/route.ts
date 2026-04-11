import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: {
      status: 'up' | 'down';
      responseTime?: number;
      error?: string;
    };
    authentication: {
      status: 'up' | 'down';
      error?: string;
    };
    realtime: {
      status: 'up' | 'down';
      error?: string;
    };
  };
  environment: {
    nodeEnv: string;
    supabaseConfigured: boolean;
  };
}

export async function GET() {
  const startTime = Date.now();
  const healthCheck: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: { status: 'down' },
      authentication: { status: 'down' },
      realtime: { status: 'down' }
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      supabaseConfigured: !!(supabaseUrl && supabaseServiceKey)
    }
  };

  try {
    // Check Database Connection
    const dbCheckStart = Date.now();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    try {
      // Simple query to check database connectivity - just check if we can connect
      const { error } = await supabase
        .from('notifications')
        .select('id')
        .limit(1);
      
      if (error) {
        healthCheck.services.database.status = 'down';
        healthCheck.services.database.error = error.message;
        healthCheck.status = 'degraded';
      } else {
        healthCheck.services.database.status = 'up';
        healthCheck.services.database.responseTime = Date.now() - dbCheckStart;
      }
    } catch (dbError: any) {
      healthCheck.services.database.status = 'down';
      healthCheck.services.database.error = dbError.message || 'Database connection failed';
      healthCheck.status = 'unhealthy';
    }

    // Check Authentication Service
    try {
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1
      });
      
      if (authError) {
        healthCheck.services.authentication.status = 'down';
        healthCheck.services.authentication.error = authError.message;
        healthCheck.status = 'degraded';
      } else {
        healthCheck.services.authentication.status = 'up';
      }
    } catch (authError: any) {
      healthCheck.services.authentication.status = 'down';
      healthCheck.services.authentication.error = authError.message || 'Auth service check failed';
      healthCheck.status = 'degraded';
    }

    // Check Realtime/Notifications Table
    try {
      const { error: realtimeError } = await supabase
        .from('notifications')
        .select('id')
        .limit(1);
      
      if (realtimeError) {
        healthCheck.services.realtime.status = 'down';
        healthCheck.services.realtime.error = realtimeError.message;
        healthCheck.status = 'degraded';
      } else {
        healthCheck.services.realtime.status = 'up';
      }
    } catch (realtimeError: any) {
      healthCheck.services.realtime.status = 'down';
      healthCheck.services.realtime.error = realtimeError.message || 'Realtime service check failed';
      healthCheck.status = 'degraded';
    }

  } catch (error: any) {
    healthCheck.status = 'unhealthy';
    console.error('Health check failed:', error);
  }

  const statusCode = healthCheck.status === 'healthy' ? 200 : 
                     healthCheck.status === 'degraded' ? 207 : 503;

  return NextResponse.json(healthCheck, { status: statusCode });
}
