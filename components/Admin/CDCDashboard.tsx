'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type CDCAsset = {
  id: string
  device_type?: string
  brand?: string
  model?: string
  condition?: string
  eco_points_earned?: number
  co2_saved?: number
  status?: string
  created_at?: string
  is_cdc_asset?: boolean
  property_number?: string
  serial_number?: string
  disposition_type?: string
  disposition_notes?: string
  users?: { full_name?: string; email?: string }
}

type StatusKey = 'all' | 'pending_evaluation' | 'reallocated' | 'donated' | 'disposed' | 'voided'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending_evaluation: { label: 'Pending Evaluation', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: 'ri-time-line' },
  reallocated:        { label: 'Reallocated',        color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200',   icon: 'ri-swap-box-line' },
  donated:            { label: 'Donated',            color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: 'ri-hand-heart-line' },
  disposed:           { label: 'Disposed',           color: 'text-slate-700', bg: 'bg-slate-100 border-slate-300', icon: 'ri-delete-bin-7-line' },
  voided:             { label: 'Voided',             color: 'text-red-700',   bg: 'bg-red-50 border-red-200',     icon: 'ri-close-circle-line' },
}

/* ─── Toast Notification ─── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  const colors = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  }
  const icons = {
    success: (
      <svg className="h-5 w-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-2 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors[type]}`}>
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ─── Delete Confirmation Modal ─── */
function DeleteModal({
  asset,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  asset: CDCAsset
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) onCancel()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onCancel, isDeleting])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={!isDeleting ? onCancel : undefined}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="flex flex-col items-center pt-8 pb-2 px-6">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Delete Asset Record</h3>
          <p className="text-sm text-gray-500 mt-1 text-center">
            This action cannot be undone. This will permanently remove the asset record.
          </p>
        </div>

        <div className="mx-6 my-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {asset.property_number && (
              <>
                <span className="text-gray-500">Property #</span>
                <span className="font-semibold text-gray-900">{asset.property_number}</span>
              </>
            )}
            {asset.serial_number && (
              <>
                <span className="text-gray-500">Serial #</span>
                <span className="font-mono text-gray-900">{asset.serial_number}</span>
              </>
            )}
            {asset.device_type && (
              <>
                <span className="text-gray-500">Type</span>
                <span className="capitalize text-gray-900">{asset.device_type}</span>
              </>
            )}
            {asset.users?.full_name && (
              <>
                <span className="text-gray-500">Submitted by</span>
                <span className="text-gray-900">{asset.users.full_name}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            ref={cancelRef}
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              'Delete permanently'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Download Forms Dropdown ─── */
export function DownloadFormsDropdown({
  onToast,
}: {
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void
}) {
  const [open, setOpen] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  async function handleDownload(formKey: string, label: string) {
    setDownloading(formKey)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) throw new Error('Not authenticated')

      const res = await fetch(`/api/admin/download-form?form=${formKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Download failed' }))
        throw new Error(err.error || `Download failed (${res.status})`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      // Extract filename from Content-Disposition or use a default
      const disposition = res.headers.get('Content-Disposition')
      const filenameMatch = disposition?.match(/filename="(.+?)"/) 
      link.download = filenameMatch?.[1] || `${formKey}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      onToast(`${label} downloaded successfully.`, 'success')
    } catch (err: any) {
      onToast(err.message || 'Failed to download form.', 'error')
    } finally {
      setDownloading(null)
      setOpen(false)
    }
  }

  const forms = [
    { key: 'waste_material_report', label: 'Waste Material Report', icon: 'ri-file-text-line' },
    { key: 'request_for_entry_to_cdc_warehouse', label: 'Request for Entry to CDC Warehouse', icon: 'ri-building-2-line' },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
        title="Download accountability forms"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Forms
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Accountability Forms</p>
          </div>
          {forms.map(form => (
            <button
              key={form.key}
              onClick={() => handleDownload(form.key, form.label)}
              disabled={downloading === form.key}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-wait transition-colors"
            >
              {downloading === form.key ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin flex-shrink-0" />
              ) : (
                <i className={`${form.icon} text-gray-400 flex-shrink-0`}></i>
              )}
              <span className="truncate">{form.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Process Asset Modal ─── */
function ProcessAssetModal({
  asset,
  isProcessing,
  onConfirm,
  onCancel,
}: {
  asset: CDCAsset
  isProcessing: boolean
  onConfirm: (data: { conditionOverride: string; dispositionType: string; notes: string }) => void
  onCancel: () => void
}) {
  const [conditionOverride, setConditionOverride] = useState<string>(asset.condition === 'broken' ? 'defective' : 'working')
  const [dispositionType, setDispositionType] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  // Keyboard: Escape to cancel
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel, isProcessing])

  const dispositionOptions = conditionOverride === 'working'
    ? [
        { value: 'reallocate', label: 'Reallocate', desc: 'Reassign to another CDC department', icon: 'ri-swap-box-line', activeBorder: 'border-blue-400', activeBg: 'bg-blue-50', activeText: 'text-blue-800', iconBg: 'bg-blue-100 text-blue-600' },
        { value: 'donate', label: 'Donate', desc: 'Forward to an external beneficiary', icon: 'ri-hand-heart-line', activeBorder: 'border-green-400', activeBg: 'bg-green-50', activeText: 'text-green-800', iconBg: 'bg-green-100 text-green-600' },
      ]
    : [
        { value: 'dispose', label: 'Dispose', desc: 'Send to e-waste disposal', icon: 'ri-delete-bin-7-line', activeBorder: 'border-slate-400', activeBg: 'bg-slate-50', activeText: 'text-slate-800', iconBg: 'bg-slate-200 text-slate-600' },
      ]

  useEffect(() => { setDispositionType('') }, [conditionOverride])

  const dispositionLabel: Record<string, string> = { reallocate: 'Reallocate', donate: 'Donate', dispose: 'Dispose', void: 'Void' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_150ms_ease]" onClick={!isProcessing ? onCancel : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col animate-[slideUp_200ms_ease]">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-5 sm:px-6 py-4 sm:py-5 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <i className="ri-clipboard-line text-white text-lg sm:text-xl"></i>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">Process Asset Evaluation</h3>
                <p className="text-xs sm:text-sm text-slate-300">Assess condition &amp; assign disposition</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 space-y-4">

          {/* Step 1 — Asset Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Asset Details</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                {asset.property_number && (
                  <>
                    <span className="text-gray-400 text-xs font-medium whitespace-nowrap">Property #</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{asset.property_number}</span>
                  </>
                )}
                {asset.serial_number && (
                  <>
                    <span className="text-gray-400 text-xs font-medium whitespace-nowrap">Serial #</span>
                    <span className="font-mono text-gray-900 text-xs sm:text-sm">{asset.serial_number}</span>
                  </>
                )}
                <span className="text-gray-400 text-xs font-medium">Device</span>
                <span className="text-gray-900 capitalize text-xs sm:text-sm">{asset.device_type} — {asset.brand} {asset.model}</span>
                <span className="text-gray-400 text-xs font-medium">Submitted By</span>
                <span className="text-gray-900 text-xs sm:text-sm">{asset.users?.full_name || '—'}</span>
                <span className="text-gray-400 text-xs font-medium">Condition</span>
                <span className="capitalize text-xs sm:text-sm">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    asset.condition === 'working' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <i className={asset.condition === 'working' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}></i>
                    {asset.condition || '—'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 — Evaluated Condition */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evaluated Condition</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConditionOverride('working')}
                className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                  conditionOverride === 'working'
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-sm ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500'
                }`}
              >
                <i className="ri-checkbox-circle-line text-base"></i>Working
              </button>
              <button
                type="button"
                onClick={() => setConditionOverride('defective')}
                className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                  conditionOverride === 'defective'
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-2 ring-orange-500/20'
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500'
                }`}
              >
                <i className="ri-error-warning-line text-base"></i>Defective
              </button>
            </div>
          </div>

          {/* Step 3 — Disposition Action */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${dispositionType ? 'bg-slate-700 text-white' : 'bg-gray-300 text-white'}`}>3</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Disposition Action</span>
            </div>
            <div className="space-y-2">
              {dispositionOptions.map(opt => {
                const isActive = dispositionType === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDispositionType(opt.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? `${opt.activeBorder} ${opt.activeBg} ${opt.activeText} shadow-sm ring-2 ring-opacity-20`
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? opt.iconBg : 'bg-gray-100 text-gray-400'}`}>
                      <i className={`${opt.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs opacity-70 leading-tight">{opt.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive ? `${opt.activeBorder} ${opt.activeBg}` : 'border-gray-300'
                    }`}>
                      {isActive && <div className={`w-2.5 h-2.5 rounded-full ${opt.activeBorder.replace('border-', 'bg-')}`}></div>}
                    </div>
                  </button>
                )
              })}
              {/* Void — always available */}
              <button
                type="button"
                onClick={() => setDispositionType('void')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                  dispositionType === 'void'
                    ? 'border-red-400 bg-red-50 text-red-800 shadow-sm ring-2 ring-red-500/20'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${dispositionType === 'void' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                  <i className="ri-close-circle-line text-lg"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">Void</div>
                  <div className="text-xs opacity-70 leading-tight">Submission was an error or duplicate</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  dispositionType === 'void' ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}>
                  {dispositionType === 'void' && <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>}
                </div>
              </button>
            </div>
          </div>

          {/* Step 4 — Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-gray-300 text-white text-[10px] font-bold flex items-center justify-center">4</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evaluation Notes</span>
              <span className="text-[10px] text-gray-400 ml-auto">Optional</span>
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="Any additional remarks..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-shadow"
            />
          </div>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="flex-shrink-0 px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          {dispositionType && (
            <div className="mb-3 px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-arrow-right-line text-gray-400"></i>
              <span>
                This asset will be marked as <strong className="text-gray-900">{conditionOverride}</strong> and routed to <strong className="text-gray-900">{dispositionLabel[dispositionType] || dispositionType}</strong>.
              </span>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm({ conditionOverride, dispositionType, notes })}
              disabled={isProcessing || !dispositionType}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-300 border-t-white rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <i className="ri-check-double-line"></i>
                  Confirm &amp; Process
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}

export default function CDCDashboard() {
  const [assets, setAssets] = useState<CDCAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusKey>('all')

  // Modal & toast state
  const [deleteTarget, setDeleteTarget] = useState<CDCAsset | null>(null)
  const [processTarget, setProcessTarget] = useState<CDCAsset | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const fetchCDCAssets = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*, users!donations_user_id_fkey ( full_name, email )')
        .eq('is_cdc_asset', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase CDC query error:', JSON.stringify(error))
        throw error
      }
      console.log('✅ Fetched CDC assets:', data?.length || 0, 'records')
      setAssets((data as CDCAsset[]) || [])
    } catch (err) {
      console.error('Error fetching CDC assets:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCDCAssets()
  }, [fetchCDCAssets])

  async function handleDeleteConfirm() {
    if (!deleteTarget) return
    const id = deleteTarget.id

    setDeletingId(id)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const res = await fetch('/api/admin/cdc-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id }),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete record')
      }

      setAssets(prev => prev.filter(a => a.id !== id))
      setDeleteTarget(null)
      setToast({ message: 'Asset record deleted successfully.', type: 'success' })
    } catch (err: any) {
      console.error('Error deleting asset:', err)
      setDeleteTarget(null)
      setToast({ message: err.message || 'Failed to delete record. Please try again.', type: 'error' })
    } finally {
      setDeletingId(null)
    }
  }

  async function handleProcessConfirm(data: { conditionOverride: string; dispositionType: string; notes: string }) {
    if (!processTarget) return

    setIsProcessing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const res = await fetch('/api/admin/cdc-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id: processTarget.id,
          dispositionType: data.dispositionType,
          conditionOverride: data.conditionOverride,
          notes: data.notes,
        }),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to process asset')
      }

      const statusLabel = STATUS_CONFIG[result.data?.status]?.label || data.dispositionType
      setToast({ message: `Asset successfully routed to ${statusLabel}`, type: 'success' })
      setProcessTarget(null)
      fetchCDCAssets()
    } catch (err: any) {
      console.error('Error processing asset:', err)
      setToast({ message: err.message || 'Failed to process asset. Please try again.', type: 'error' })
    } finally {
      setIsProcessing(false)
    }
  }

  function handleExportCSV() {
    if (filtered.length === 0) {
      setToast({ message: 'No assets to export.', type: 'info' })
      return
    }

    const headers = ['Date Received', 'Property Number', 'Serial Number', 'Item Type', 'Brand', 'Model', 'Condition', 'Status', 'Disposition', 'Remarks', 'Submitted By', 'Eco Points', 'CO₂ Saved (kg)']
    const rows = filtered.map(a => [
      a.created_at ? new Date(a.created_at).toISOString().slice(0, 10) : '',
      a.property_number || '',
      a.serial_number || '',
      a.device_type || '',
      a.brand || '',
      a.model || '',
      a.condition || '',
      STATUS_CONFIG[a.status || '']?.label || a.status || '',
      a.disposition_type || '',
      a.disposition_notes || '',
      a.users?.full_name || '',
      String(a.eco_points_earned ?? 0),
      String(a.co2_saved ?? 0),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cdc-asset-registry-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Derived data
  const filtered = assets.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    const matchesSearch = !searchTerm || [
      a.property_number,
      a.serial_number,
      a.brand,
      a.model,
      a.device_type,
      a.users?.full_name,
    ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const totalAssets = assets.length
  const pendingCount = assets.filter(a => a.status === 'pending_evaluation').length
  const reallocatedCount = assets.filter(a => a.status === 'reallocated').length
  const donatedCount = assets.filter(a => a.status === 'donated').length
  const disposedCount = assets.filter(a => a.status === 'disposed').length
  const totalEcoPoints = assets.reduce((sum, a) => sum + (a.eco_points_earned ?? 0), 0)
  const totalCO2 = assets.reduce((sum, a) => sum + (a.co2_saved ?? 0), 0)

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Assets</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">{totalAssets}</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</div>
          <div className="mt-1 text-2xl font-bold text-amber-700">{pendingCount}</div>
        </div>
        <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Reallocated</div>
          <div className="mt-1 text-2xl font-bold text-blue-700">{reallocatedCount}</div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-green-600 uppercase tracking-wide">Donated</div>
          <div className="mt-1 text-2xl font-bold text-green-700">{donatedCount}</div>
        </div>
        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Disposed</div>
          <div className="mt-1 text-2xl font-bold text-slate-700">{disposedCount}</div>
        </div>
        <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide">CO₂ Saved (kg)</div>
          <div className="mt-1 text-2xl font-bold text-emerald-700">{totalCO2.toFixed(1)}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'pending_evaluation', 'reallocated', 'donated', 'disposed', 'voided'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label || s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search property #, serial #, brand..."
              className="w-full sm:w-72 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>

          <button
            onClick={fetchCDCAssets}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm">Loading asset records…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <i className="ri-archive-line text-4xl text-gray-300 mb-3 block"></i>
            <p className="text-gray-500 font-medium">No asset records found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Asset surrenders will appear here when submitted.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Property #</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Serial #</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Device</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Submitted By</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Condition</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(asset => {
                  const sc = STATUS_CONFIG[asset.status || ''] || STATUS_CONFIG['pending_evaluation']

                  const isProcessed = asset.status !== 'pending_evaluation'
                  const hasRemarks = isProcessed && (asset.disposition_type || asset.disposition_notes)

                  return (
                    <React.Fragment key={asset.id}>
                      <tr className="hover:bg-green-50/40 transition-colors">
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {asset.created_at
                            ? new Date(asset.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : '—'}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                          {asset.property_number || '—'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <code className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-800">
                            {asset.serial_number || '—'}
                          </code>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-900 capitalize">{asset.device_type || '—'}</div>
                          <div className="text-xs text-gray-400">{asset.brand} {asset.model}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {asset.users?.full_name || '—'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            asset.condition === 'working' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {asset.condition === 'working' ? 'Working' : 'Defective'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${sc.bg} ${sc.color}`}>
                            <i className={sc.icon}></i>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            {asset.status === 'pending_evaluation' && (
                              <button
                                onClick={() => setProcessTarget(asset)}
                                disabled={deletingId === asset.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50"
                              >
                                <i className="ri-clipboard-line"></i>
                                Process
                              </button>
                            )}
                            {asset.status !== 'pending_evaluation' && (
                              <DownloadFormsDropdown
                                onToast={(msg, type) => setToast({ message: msg, type })}
                              />
                            )}
                            <button
                              onClick={() => setDeleteTarget(asset)}
                              disabled={deletingId === asset.id || isProcessing}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              title="Delete this asset"
                            >
                              {deletingId === asset.id ? (
                                <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Evaluation remarks sub-row */}
                      {hasRemarks && (
                        <tr className="bg-slate-50/60">
                          <td colSpan={8} className="px-4 py-2">
                            <div className="flex items-start gap-3 ml-1">
                              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-file-text-line text-slate-500 text-xs"></i>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                                {asset.disposition_type && (
                                  <span className="text-gray-500">
                                    Disposition: <strong className="text-gray-700 capitalize">{asset.disposition_type}</strong>
                                  </span>
                                )}
                                {asset.disposition_notes && (
                                  <span className="text-gray-500">
                                    Remarks: <span className="text-gray-700">&ldquo;{asset.disposition_notes}&rdquo;</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!isLoading && filtered.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {filtered.length} of {totalAssets} asset{totalAssets !== 1 ? 's' : ''}</span>
            <span>{pendingCount} awaiting evaluation · <strong className="text-gray-700">{totalCO2.toFixed(1)} kg CO₂ saved</strong></span>
          </div>
        )}
      </div>

      {/* Process Asset Modal */}
      {processTarget && (
        <ProcessAssetModal
          asset={processTarget}
          isProcessing={isProcessing}
          onConfirm={handleProcessConfirm}
          onCancel={() => setProcessTarget(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteModal
          asset={deleteTarget}
          isDeleting={deletingId === deleteTarget.id}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
