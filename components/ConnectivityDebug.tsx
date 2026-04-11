'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'ok' | 'fail'

export default function ConnectivityDebug() {
  const [pingStatus, setPingStatus] = useState<Status>('idle')
  const [callbackReachable, setCallbackReachable] = useState<Status>('idle')
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }

    const test = async () => {
      try {
        const r = await fetch('/api/ping', { cache: 'no-store' })
        setPingStatus(r.ok ? 'ok' : 'fail')
      } catch {
        setPingStatus('fail')
      }

      try {
        const r2 = await fetch('/auth/callback', { method: 'GET' })
        // The callback page will render HTML; status 200 means route is reachable
        setCallbackReachable(r2.ok ? 'ok' : 'fail')
      } catch {
        setCallbackReachable('fail')
      }
    }

    test()
  }, [])

  return (
    <div className="mt-6">
      <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <summary className="cursor-pointer select-none text-sm text-gray-700 font-medium">Connection diagnostics</summary>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${pingStatus === 'ok' ? 'bg-green-500' : pingStatus === 'fail' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
            <span>/api/ping reachable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${callbackReachable === 'ok' ? 'bg-green-500' : callbackReachable === 'fail' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
            <span>/auth/callback route reachable</span>
          </div>
          <div className="text-gray-600">Origin: <code className="bg-white border px-1 py-0.5 rounded">{origin || 'detecting...'}</code></div>
          <div className="text-gray-600">Expected redirect: <code className="bg-white border px-1 py-0.5 rounded">{origin ? `${origin}/auth/callback` : '...'}</code></div>
          <div className="pt-2 text-gray-600">
            <p>If either check is red from another device:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Ensure both devices are on the same Wi‑Fi (no VPN/cellular).</li>
              <li>Use the exact IP shown on the dev machine banner.</li>
              <li>On macOS, allow incoming connections for Node/Terminal in System Settings → Network → Firewall.</li>
              <li>If Google returns to HTTPS then redirects to HTTP, some browsers may block it. Consider using a tunnel (e.g., ngrok/cloudflared) to get an HTTPS dev URL and add it to Supabase Redirect URLs.</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  )
}
