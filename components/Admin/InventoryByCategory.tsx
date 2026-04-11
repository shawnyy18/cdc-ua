"use client"

import React from 'react'
import { supabase } from '@/lib/supabase'

type DepartmentData = {
  id: string
  name?: string
  municipality?: string
  categories: Record<string, number>
  total: number
}

export default function InventoryByCategory() {
  const [data, setData] = React.useState<{ departments?: DepartmentData[]; department?: DepartmentData; totals?: Record<string, number> } | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const token = (session as any)?.access_token || null
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch('/api/admin/inventory-by-category', {
          method: 'POST',
          headers,
          body: JSON.stringify({})
        })
        const json = await res.json()
        if (!mounted) return
        if (!json.success) {
          setError(json.error || 'Failed to load inventory')
        } else {
          setData(json)
        }
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message || String(e))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="bg-white rounded-lg shadow p-6">Loading inventory…</div>
  if (error) return <div className="bg-white rounded-lg shadow p-6 text-red-600">{error}</div>
  if (!data) return null

  const departments = data.departments || (data.department ? [data.department] : [])

  // Build canonical category list
  const categorySet = new Set<string>()
  departments.forEach((b) => Object.keys(b.categories || {}).forEach((c) => categorySet.add(c)))
  Object.keys(data.totals || {}).forEach((c) => categorySet.add(c))
  const categories = Array.from(categorySet).sort()

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Inventory by Device Category</h2>
          <p className="text-sm text-gray-500 mt-1">Shows counts of submitted devices grouped by device category per department.</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="px-3 py-2 text-left">Department</th>
              {categories.map((c) => (
                <th key={c} className="px-3 py-2 text-right">{c}</th>
              ))}
              <th className="px-3 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-3 py-2 text-sm">{b.name ? `${b.name}${b.municipality ? `, ${b.municipality}` : ''}` : 'Unassigned'}</td>
                {categories.map((c) => (
                  <td key={c} className="px-3 py-2 text-sm text-right">{b.categories?.[c] || 0}</td>
                ))}
                <td className="px-3 py-2 text-sm text-right font-semibold">{b.total || 0}</td>
              </tr>
            ))}

            <tr className="border-t bg-gray-50">
              <td className="px-3 py-2 text-sm font-semibold">Totals</td>
              {categories.map((c) => (
                <td key={c} className="px-3 py-2 text-sm text-right font-semibold">{data.totals?.[c] || 0}</td>
              ))}
              <td className="px-3 py-2 text-sm text-right font-semibold">{departments.reduce((s, b) => s + (b.total || 0), 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
