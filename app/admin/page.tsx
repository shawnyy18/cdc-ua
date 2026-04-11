'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import RefreshButton from '@/components/Admin/RefreshButton'
import InventoryByCategory from '@/components/Admin/InventoryByCategory'
import { supabase } from '@/lib/supabase'
import { checkAdminAccess } from '@/lib/adminAuth'

/* ─── Types ─── */
type DonationRequest = {
  id: string
  users?: { full_name?: string; email?: string; phone?: string; barangay_id?: string; barangays?: { name?: string } | { name?: string }[] }
  device_type?: string
  device_category?: string
  brand?: string
  model?: string
  condition?: string
  description?: string
  drop_off_center?: string
  eco_points_earned?: number
  co2_saved?: number
  status?: string
  created_at?: string
  is_cdc_asset?: boolean
  property_number?: string
  serial_number?: string
  disposition_type?: string
  disposition_notes?: string
  barangays?: { name?: string } | { name?: string }[]
}

type StatusKey = 'all' | 'pending_evaluation' | 'reallocated' | 'donated' | 'disposed' | 'voided'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending_evaluation: { label: 'Pending Evaluation', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: 'ri-time-line' },
  reallocated:        { label: 'Reallocated',        color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200',   icon: 'ri-swap-box-line' },
  donated:            { label: 'Donated',            color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: 'ri-hand-heart-line' },
  disposed:           { label: 'Disposed',           color: 'text-slate-700', bg: 'bg-slate-100 border-slate-300', icon: 'ri-delete-bin-7-line' },
  voided:             { label: 'Voided',             color: 'text-red-700',   bg: 'bg-red-50 border-red-200',     icon: 'ri-close-circle-line' },
}

/* ─── Toast Component ─── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500)
    return () => clearTimeout(t)
  }, [onClose])

  const styles = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error:   'bg-red-50 border-red-300 text-red-800',
    info:    'bg-blue-50 border-blue-300 text-blue-800',
  }

  return (
    <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-auto sm:right-6 z-[100] animate-bounce-in">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg ${styles[type]}`}>
        <i className={`${type === 'success' ? 'ri-checkbox-circle-line' : type === 'error' ? 'ri-error-warning-line' : 'ri-information-line'} text-lg`}></i>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70"><i className="ri-close-line"></i></button>
      </div>
    </div>
  )
}

/* ─── Helper: Parse Hazardous Data ─── */
function parseHazardousData(description: string = '') {
  const imageUrlMatch = description.match(/\[IMAGE_URL:(.*?)\]/);
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
  
  let cleanDesc = description.replace(/ \| \[IMAGE_URL:.*?\]/g, '');
  
  let hazardType = null;
  let quantity = null;
  
  const typeMatch = cleanDesc.match(/Hazard Type: (.*?)(?: \||$)/);
  if (typeMatch) hazardType = typeMatch[1];
  
  const qtyMatch = cleanDesc.match(/Quantity\/Weight: (.*?)(?: \||$)/);
  if (qtyMatch) quantity = qtyMatch[1];
  
  return { imageUrl, cleanDescription: cleanDesc, hazardType, quantity };
}

/* ─── Lightbox Component ─── */
function HazardPhotoLightbox({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_150ms_ease]" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
        <i className="ri-close-line text-2xl"></i>
      </button>
      <img src={imageUrl} alt="Hazard photo" className="max-w-full max-h-full object-contain rounded-lg animate-[slideUp_200ms_ease]" onClick={e => e.stopPropagation()} />
    </div>
  )
}

/* ─── Process Asset Modal ─── */
function ProcessAssetModal({
  asset,
  isProcessing,
  onConfirm,
  onCancel,
  onPhotoClick,
}: {
  asset: DonationRequest
  isProcessing: boolean
  onConfirm: (data: { conditionOverride: string; dispositionType: string; notes: string }) => void
  onCancel: () => void
  onPhotoClick?: (url: string) => void
}) {
  const normalizedCategory = (asset.device_category || asset.device_type || '').toLowerCase()
  const hazData = parseHazardousData(asset.description)
  const isHazardousAsset = normalizedCategory === 'hazardous-consumables' || Boolean(hazData.hazardType)
  const [conditionOverride, setConditionOverride] = useState<string>(isHazardousAsset ? 'defective' : (asset.condition === 'broken' ? 'defective' : 'working'))
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

  // Disposition options based on evaluated condition
  const dispositionOptions = isHazardousAsset
    ? [
        { value: 'dispose', label: 'Dispose', desc: 'Hazardous items are locked to disposal workflow', icon: 'ri-delete-bin-7-line', activeBorder: 'border-slate-400', activeBg: 'bg-slate-50', activeText: 'text-slate-800', iconBg: 'bg-slate-200 text-slate-600' },
      ]
    : conditionOverride === 'working'
    ? [
        { value: 'reallocate', label: 'Reallocate', desc: 'Reassign to another CDC department for reuse', icon: 'ri-swap-box-line', activeBorder: 'border-blue-400', activeBg: 'bg-blue-50', activeText: 'text-blue-800', iconBg: 'bg-blue-100 text-blue-600' },
        { value: 'donate', label: 'Donate', desc: 'Forward to an external beneficiary', icon: 'ri-hand-heart-line', activeBorder: 'border-green-400', activeBg: 'bg-green-50', activeText: 'text-green-800', iconBg: 'bg-green-100 text-green-600' },
      ]
    : [
        { value: 'dispose', label: 'Dispose', desc: 'Send to scrap / e-waste disposal', icon: 'ri-delete-bin-7-line', activeBorder: 'border-slate-400', activeBg: 'bg-slate-50', activeText: 'text-slate-800', iconBg: 'bg-slate-200 text-slate-600' },
      ]

  // Reset disposition when condition changes
  useEffect(() => {
    if (isHazardousAsset) {
      setDispositionType('dispose')
      return
    }
    setDispositionType('')
  }, [conditionOverride, isHazardousAsset])

    const userDept = asset.users?.barangays
  const deptName = userDept ? (Array.isArray(userDept) ? userDept[0]?.name : userDept?.name) : null

  const isProcessed = asset.status !== 'pending_evaluation'

  // Summary label for confirm button
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
                <i className={`ri-${isProcessed ? 'file-info-line' : 'clipboard-line'} text-white text-lg sm:text-xl`}></i>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{isProcessed ? 'Asset Details' : 'Process Asset Evaluation'}</h3>
                <p className="text-xs sm:text-sm text-slate-300">{isProcessed ? 'View historical submission' : 'Assess condition & assign disposition'}</p>
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
            
            {isHazardousAsset && (
              <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-2">
                  <i className="ri-error-warning-fill"></i> Hazardous Submission
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <span className="text-amber-700/70 font-medium">Type</span>
                  <span className="text-amber-900">{hazData.hazardType || 'Unknown'}</span>
                  <span className="text-amber-700/70 font-medium">Quantity/Weight</span>
                  <span className="text-amber-900">{hazData.quantity || '—'}</span>
                </div>
              </div>
            )}
            
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
                <span className="text-gray-400 text-xs font-medium">Department</span>
                <span className="text-gray-900 text-xs sm:text-sm">{deptName || 'Not assigned'}</span>
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
                
                {hazData.imageUrl && (
                  <>
                    <span className="text-gray-400 text-xs font-medium mt-2 block">Photo</span>
                    <div
                      onClick={(e) => {
                        if (onPhotoClick) {
                          e.stopPropagation()
                          onPhotoClick(hazData.imageUrl!)
                        }
                      }}
                      className={`mt-2 block w-full aspect-video rounded-lg overflow-hidden border-2 border-amber-200 hover:border-amber-400 transition-colors bg-gray-100 relative group ${onPhotoClick ? 'cursor-pointer' : ''}`}
                    >
                      <img src={hazData.imageUrl!} alt="Hazard photo" className="w-full h-full object-cover" />
                      {onPhotoClick && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="ri-zoom-in-line text-white text-2xl"></i>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Step 2+ if evaluated, else show process records */}
          {isProcessed ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-history-line text-slate-500"></i>
                <h4 className="text-sm font-semibold text-slate-700">Evaluation Record</h4>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="grid grid-cols-[100px_1fr] gap-x-2">
                  <span className="font-medium text-slate-500">Status</span>
                  <span className="font-semibold capitalize text-slate-900">{asset.status?.replace('_', ' ')}</span>
                </div>
                {asset.disposition_type && (
                  <div className="grid grid-cols-[100px_1fr] gap-x-2">
                    <span className="font-medium text-slate-500">Disposition</span>
                    <span className="font-semibold capitalize text-slate-900">{asset.disposition_type}</span>
                  </div>
                )}
                {asset.disposition_notes && (
                  <div className="grid grid-cols-[100px_1fr] gap-x-2">
                    <span className="font-medium text-slate-500">Remarks</span>
                    <span className="text-slate-900 leading-tight">{asset.disposition_notes}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Step 2 — Evaluated Condition */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evaluated Condition</span>
                </div>
                {isHazardousAsset && (
                  <p className="text-xs text-slate-500 mb-2">Hazardous submissions skip reuse/donate and are automatically treated as defective for disposal routing.</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConditionOverride('working')}
                    disabled={isHazardousAsset}
                    className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                      conditionOverride === 'working'
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm ring-2 ring-green-500/20'
                        : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500'
                    } ${isHazardousAsset ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <i className="ri-checkbox-circle-line text-base"></i>Working
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionOverride('defective')}
                    disabled={isHazardousAsset}
                    className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                      conditionOverride === 'defective'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-2 ring-orange-500/20'
                        : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500'
                    } ${isHazardousAsset ? 'opacity-90' : ''}`}
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
                  {!isHazardousAsset && (
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
                  )}
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
                  placeholder="Any additional remarks for the record..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-shadow"
                />
              </div>
            </>
          )}
        </div>

        {/* ── Sticky Footer ── */}
        <div className="flex-shrink-0 px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          {/* Summary preview */}
          {!isProcessed && dispositionType && (
            <div className="mb-3 px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-arrow-right-line text-gray-400"></i>
              <span>
                This asset will be marked as <strong className="text-gray-900">{conditionOverride}</strong> and routed to <strong className="text-gray-900">{dispositionLabel[dispositionType] || dispositionType}</strong>.
              </span>
            </div>
          )}
          <div className="flex gap-3">
            {!isProcessed ? (
              <>
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
              </>
            ) : (
              <button
                onClick={onCancel}
                className="w-full px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
              >
                Close Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}

/* ─── Main Dashboard ─── */
export default function AdminDashboard() {
  const router = useRouter()
  const [requests, setRequests] = useState<DonationRequest[]>([])
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<StatusKey>('all')
  const [adminDepartment, setAdminDepartment] = useState<string | null>(null)
  const [departmentName, setDepartmentName] = useState<string>('')
  const [processTarget, setProcessTarget] = useState<DonationRequest | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return router.push('/login')

        const adminCheck = await checkAdminAccess(user.id)
        if (!adminCheck) return router.push('/dashboard')

        const { data: userData } = await supabase
          .from('users')
          .select('barangay_id, barangays(name, municipality)')
          .eq('id', user.id)
          .single()

        if (userData?.barangay_id) {
          setAdminDepartment(userData.barangay_id)
          const dept = Array.isArray(userData.barangays) ? userData.barangays[0] : userData.barangays
          if (dept) setDepartmentName(`${dept.name} Department`)
        } else {
          setDepartmentName('IT Asset Manager (All Departments)')
        }

        setIsCheckingAuth(false)
      } catch (err) {
        console.error('Error verifying admin:', err)
        router.push('/login')
      }
    }

    verifyAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isCheckingAuth) fetchRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckingAuth, adminDepartment])

  async function fetchRequests() {
    setIsLoading(true)
    try {
      let query = supabase
        .from('donations')
        .select('*, users!donations_user_id_fkey ( full_name, email, phone, barangay_id, barangays ( name ) )')
        .neq('status', 'voided')
        .neq('status', 'deleted')
        .order('created_at', { ascending: false })

      if (adminDepartment) query = query.eq('barangay_id', adminDepartment)

      const { data, error } = await query
      if (error) {
        console.error('Supabase query error details:', JSON.stringify(error))
        throw error
      }
      console.log('✅ Fetched donations:', data?.length || 0, 'records')
      setRequests((data as any) || [])
    } catch (err) {
      console.error('Error fetching requests:', err)
    } finally {
      setIsLoading(false)
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
      if (!res.ok || !result.success) throw new Error(result.error || 'Failed to process asset')

      const statusLabel = STATUS_CONFIG[result.data?.status]?.label || data.dispositionType
      setToast({ message: `Asset successfully routed to ${statusLabel}`, type: 'success' })
      setProcessTarget(null)
      fetchRequests()
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to process asset', type: 'error' })
    } finally {
      setIsProcessing(false)
    }
  }

  function handleExport() {
    const cdcAssets = requests.filter(r => r.is_cdc_asset)
    if (cdcAssets.length === 0) {
      setToast({ message: 'No CDC assets to export.', type: 'info' })
      return
    }

    const headers = ['Date', 'Submitted By', 'Department', 'Category', 'Brand', 'Model', 'Condition', 'Property Number', 'Serial Number', 'Status', 'Disposition', 'Remarks']
    const rows = cdcAssets.map(r => {
      const userDept = r.users?.barangays
      const deptName = userDept ? (Array.isArray(userDept) ? userDept[0]?.name : userDept?.name) : ''
      return [
        r.created_at ? new Date(r.created_at).toLocaleDateString() : '',
        r.users?.full_name || '',
        deptName || '',
        r.device_type || '',
        r.brand || '',
        r.model || '',
        r.condition || '',
        r.property_number || '',
        r.serial_number || '',
        STATUS_CONFIG[r.status || '']?.label || r.status || '',
        r.disposition_type || '',
        r.disposition_notes || '',
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cdc-asset-report-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (isCheckingAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-600">Verifying access...</p>
      </div>
    </div>
  )

  const stats = {
    total: requests.length,
    pending_evaluation: requests.filter(r => r.status === 'pending_evaluation').length,
    reallocated: requests.filter(r => r.status === 'reallocated').length,
    donated: requests.filter(r => r.status === 'donated').length,
    disposed: requests.filter(r => r.status === 'disposed').length,
    voided: requests.filter(r => r.status === 'voided').length,
  }

  const filtered = requests.filter(r => filter === 'all' || r.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="ri-shield-check-line text-green-600"></i>
                IT Asset Manager Dashboard
              </h1>
              <div className="text-sm text-gray-500 mt-0.5">{departmentName}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Link
                href="/admin/cdc-inventory"
                className="px-3 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors shadow-sm"
              >
                <i className="ri-archive-line"></i>
                <span className="hidden sm:inline">Asset Registry</span>
              </Link>
              <button
                onClick={handleExport}
                className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors shadow-sm"
              >
                <i className="ri-file-download-line"></i>
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <RefreshButton onRefresh={fetchRequests} />
              <button
                onClick={async () => {
                  try { await supabase.auth.signOut() } catch (err) { console.error('Sign out error', err) }
                  router.push('/login')
                }}
                className="px-3 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
                aria-label="Log out"
              >
                <i className="ri-logout-box-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
            <div className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</div>
            <div className="mt-1 text-2xl font-bold text-amber-700">{stats.pending_evaluation}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Reallocated</div>
            <div className="mt-1 text-2xl font-bold text-blue-700">{stats.reallocated}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
            <div className="text-xs font-medium text-green-600 uppercase tracking-wide">Donated</div>
            <div className="mt-1 text-2xl font-bold text-green-700">{stats.donated}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-300 shadow-sm">
            <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Disposed</div>
            <div className="mt-1 text-2xl font-bold text-slate-700">{stats.disposed}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
            <div className="text-xs font-medium text-red-600 uppercase tracking-wide">Voided</div>
            <div className="mt-1 text-2xl font-bold text-red-700">{stats.voided}</div>
          </div>
        </div>

        {/* Inventory Section */}
        <div>
          <InventoryByCategory />
        </div>

        {/* Asset Submissions Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900">Asset Submissions</h2>
            <div className="flex flex-wrap sm:flex-nowrap gap-1.5 overflow-x-auto pb-1">
              {(['all', 'pending_evaluation', 'reallocated', 'donated', 'disposed', 'voided'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                    filter === s
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label || s}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500 text-sm">Loading asset submissions…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <i className="ri-inbox-line text-4xl text-gray-300 mb-3 block"></i>
              <p className="text-gray-500 font-medium">No submissions found</p>
              <p className="text-gray-400 text-sm mt-1">Asset surrenders will appear here when submitted by department staff.</p>
            </div>
          ) : (
            <>
              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map(r => {
                  const userDept = r.users?.barangays
                  const deptName = userDept ? (Array.isArray(userDept) ? userDept[0]?.name : userDept?.name) : null
                  const sc = STATUS_CONFIG[r.status || ''] || STATUS_CONFIG['pending_evaluation']
                  const isProcessed = r.status !== 'pending_evaluation'

                  return (
                    <div 
                      key={r.id} 
                      onClick={() => setProcessTarget(r)}
                      className="p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-gray-500">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                          </p>
                          <p className="font-semibold text-gray-900">{r.users?.full_name || '—'}</p>
                          {deptName && <p className="text-xs text-gray-500">{deptName}</p>}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${sc.bg} ${sc.color}`}>
                          <i className={sc.icon}></i>
                          {sc.label}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
                        <div>
                          <span className="text-gray-500 text-xs">Device</span>
                          <div className="flex gap-2 items-start justify-between">
                            <div>
                              <p className="text-gray-900 capitalize leading-tight flex items-center flex-wrap gap-1.5">
                                {r.device_type || '—'}
                                {parseHazardousData(r.description).hazardType && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 text-amber-800">
                                    Hazardous
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">{r.brand} {r.model}</p>
                            </div>
                            {parseHazardousData(r.description).imageUrl && (
                              <img 
                                src={parseHazardousData(r.description).imageUrl!} 
                                className="w-10 h-10 object-cover rounded shadow-sm border border-amber-200 cursor-pointer hover:opacity-80 transition-opacity shrink-0 bg-white" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setLightboxImage(parseHazardousData(r.description).imageUrl!)
                                }} 
                                alt="Thumbnail" 
                              />
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500 text-xs">Property #</span>
                            <p className="font-semibold text-gray-900 break-words">{r.property_number || '—'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs">Serial #</span>
                            <p className="font-mono text-xs text-gray-900 break-all">{r.serial_number || '—'}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Condition</span>
                          <div>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                              r.condition === 'working' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {r.condition === 'working' ? 'Working' : 'Defective'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isProcessed && (r.disposition_type || r.disposition_notes) && (
                        <div className="text-xs text-gray-600 bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                          {r.disposition_type && (
                            <p>
                              Disposition: <strong className="text-gray-800 capitalize">{r.disposition_type}</strong>
                            </p>
                          )}
                          {r.disposition_notes && (
                            <p>
                              Remarks: <span className="text-gray-800">&ldquo;{r.disposition_notes}&rdquo;</span>
                            </p>
                          )}
                        </div>
                      )}

                      <div>
                        {r.status === 'pending_evaluation' ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setProcessTarget(r); }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-sm"
                          >
                            <i className="ri-clipboard-line"></i>
                            Process Asset
                          </button>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setProcessTarget(r); }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                          >
                            <i className="ri-file-info-line"></i>
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Submitted By</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Device</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Property #</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Serial #</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Condition</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(r => {
                      const userDept = r.users?.barangays
                      const deptName = userDept ? (Array.isArray(userDept) ? userDept[0]?.name : userDept?.name) : null
                      const sc = STATUS_CONFIG[r.status || ''] || STATUS_CONFIG['pending_evaluation']

                      const isProcessed = r.status !== 'pending_evaluation'
                      const hasRemarks = isProcessed && (r.disposition_type || r.disposition_notes)

                      return (
                        <React.Fragment key={r.id}>
                          <tr 
                            onClick={() => setProcessTarget(r)}
                            className="hover:bg-green-50/40 transition-colors cursor-pointer group"
                          >
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-semibold text-gray-900">{r.users?.full_name || '—'}</div>
                              {deptName && <div className="text-xs text-gray-500">{deptName}</div>}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="text-gray-900 capitalize flex items-center gap-1.5">
                                    {r.device_type || '—'}
                                    {parseHazardousData(r.description).hazardType && (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 text-amber-800">
                                        Hazardous
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400">{r.brand} {r.model}</div>
                                </div>
                                {parseHazardousData(r.description).imageUrl && (
                                  <img 
                                    src={parseHazardousData(r.description).imageUrl!} 
                                    className="w-8 h-8 object-cover rounded shadow-sm border border-amber-200 cursor-pointer hover:opacity-80 transition-opacity shrink-0 bg-white" 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLightboxImage(parseHazardousData(r.description).imageUrl!)
                                    }} 
                                    alt="Thumbnail" 
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{r.property_number || '—'}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <code className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{r.serial_number || '—'}</code>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                                r.condition === 'working' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {r.condition === 'working' ? 'Working' : 'Defective'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${sc.bg} ${sc.color}`}>
                                <i className={sc.icon}></i>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              {r.status === 'pending_evaluation' ? (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setProcessTarget(r); }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-sm hover:shadow"
                                >
                                  <i className="ri-clipboard-line"></i>
                                  Process Asset
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setProcessTarget(r); }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                                >
                                  <i className="ri-file-info-line"></i>
                                  View Details
                                </button>
                              )}
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
                                    {r.disposition_type && (
                                      <span className="text-gray-500">
                                        Disposition: <strong className="text-gray-700 capitalize">{r.disposition_type}</strong>
                                      </span>
                                    )}
                                    {r.disposition_notes && (
                                      <span className="text-gray-500">
                                        Remarks: <span className="text-gray-700">&ldquo;{r.disposition_notes}&rdquo;</span>
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
            </>
          )}

          {/* Footer */}
          {!isLoading && filtered.length > 0 && (
            <div className="hidden md:flex px-5 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 justify-between items-center">
              <span>Showing {filtered.length} of {requests.length} submission{requests.length !== 1 ? 's' : ''}</span>
              <span>{stats.pending_evaluation} awaiting evaluation</span>
            </div>
          )}
        </div>
      </div>

      {/* Process Asset Modal */}
      {processTarget && (
        <ProcessAssetModal
          asset={processTarget}
          isProcessing={isProcessing}
          onConfirm={handleProcessConfirm}
          onCancel={() => setProcessTarget(null)}
          onPhotoClick={(url) => setLightboxImage(url)}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <HazardPhotoLightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
