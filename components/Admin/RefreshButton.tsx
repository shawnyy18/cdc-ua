"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  onRefresh?: () => Promise<void> | void;
  className?: string;
};

export default function RefreshButton({ onRefresh, className = '' }: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      if (onRefresh) {
        await onRefresh();
      } else {
        // Next.js router.refresh() will revalidate the current route
        router.refresh();
      }
    } catch (e) {
      console.error('Refresh failed', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="Refresh"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border text-sm text-gray-700 hover:shadow-sm ${className}`}
    >
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
        </svg>
      )}
      <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
    </button>
  );
}
