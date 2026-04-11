"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Small client-side helper that runs on every page and clears expired tokens.
export default function AuthChecker() {
  const router = useRouter();

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem('ecokonek_token');
      if (!token) return;

      // Decode JWT payload (no verification) to check exp
      const parts = token.split('.');
      if (parts.length !== 3) return;
      const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))));

      if (payload && payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now) {
          // Token expired: clear local storage and redirect to login
          localStorage.removeItem('ecokonek_token');
          localStorage.removeItem('ecokonek_user');
          // also remove the Supabase storage key if present
          try { localStorage.removeItem('sb-yxoxxrbukjyioyfveaml-auth-token'); } catch(e) {}
          // navigation after a short tick to avoid hydration conflicts
          setTimeout(() => router.push('/login'), 50);
        }
      }
    } catch (err) {
      // ignore decoding errors
      // If decoding fails, don't block the app
      console.warn('[AuthChecker] token decode failed', err);
    }
  }, [router]);

  return null;
}
