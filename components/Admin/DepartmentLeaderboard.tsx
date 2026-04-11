"use client";

import React from 'react';
import { supabase } from '@/lib/supabase';

type Row = {
  rank: number;
  id: string;
  name: string;
  municipality?: string;
  eco_points: number;
  total_donations: number;
  total_co2_saved?: number;
  donated_devices?: number;
  recycled_devices?: number;
  contributors?: number;
  scorePercent: number;
};

export default function DepartmentLeaderboard() {
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // include the current user's access token so the server can verify is_admin
        const { data: { session } } = await supabase.auth.getSession();
        const token = (session as any)?.access_token || null;

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/admin/department-leaderboard', {
          method: 'POST',
          headers,
          body: JSON.stringify({})
        });
        const data = await res.json();
        if (!mounted) return;
        if (!data.success) {
          setError(data.error || 'Failed to load leaderboard');
          setRows([]);
        } else {
          setRows(data.leaderboard || []);
        }
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => { mounted = false };
  }, []);

  if (loading) return (
    <div className="py-12 text-center">
      <div className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-green-200 to-green-400 animate-pulse opacity-80" />
      <div className="mt-4 text-gray-600">Loading leaderboard…</div>
    </div>
  );
  if (error) return <div className="py-8 text-center text-red-600">{error}</div>;
  if (!rows || rows.length === 0) return <div className="py-8 text-center">No data available</div>;

  // project color palette: use green shades
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Department Leaderboard</h2>
            <p className="text-sm text-gray-500 mt-1">Top CDC departments by combined eco points and e-waste impact</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Updated</div>
            <div className="text-lg font-medium text-green-700">Live</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {rows.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 flex-shrink-0 text-center">
              <div className="text-2xl font-bold text-green-600">#{r.rank}</div>
              <div className="text-xs text-gray-500 mt-1">{r.contributors || 0} contributors</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{r.name}{r.municipality ? `, ${r.municipality}` : ''}</div>
                  <div className="text-xs text-gray-500 mt-1">Donations: <span className="font-medium text-gray-800">{r.total_donations}</span> • CO₂ saved: <span className="font-medium text-gray-800">{r.total_co2_saved || 0}kg</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-700">{r.eco_points} pts</div>
                  <div className="text-xs text-gray-400">{r.donated_devices || 0} devices</div>
                </div>
              </div>

              <div className="mt-3 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                  style={{ width: `${r.scorePercent}%`, transitionDuration: '700ms' }}
                  title={`${r.scorePercent}% of top score`}
                />
              </div>

              <div className="mt-2 text-xs text-gray-400 flex gap-4">
                <div>Recycled: <span className="font-medium text-gray-700">{r.recycled_devices || 0}</span></div>
                <div>Donated: <span className="font-medium text-gray-700">{r.donated_devices || 0}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
