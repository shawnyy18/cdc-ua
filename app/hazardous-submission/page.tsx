'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const HAZARD_TYPES = {
  'Ink/Toner': { icon: '🖨️', description: 'Ink cartridges and toner' },
  'Batteries': { icon: '🔋', description: 'Batteries, accumulators' },
  'Bulbs': { icon: '💡', description: 'Fluorescent, LED, halogen bulbs' },
  'E-waste scrap': { icon: '♻️', description: 'Electronic components, scrap' },
} as const;

const HAZARD_TYPE_OPTIONS = Object.keys(HAZARD_TYPES) as Array<keyof typeof HAZARD_TYPES>;

type RequestOptions = RequestInit & { headers?: Record<string, string> };

export default function HazardousSubmissionPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hazardType, setHazardType] = useState<string>(HAZARD_TYPE_OPTIONS[0]);
  const [quantityWeight, setQuantityWeight] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [propertyNumber, setPropertyNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [hazardImage, setHazardImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasDepartmentAssigned, setHasDepartmentAssigned] = useState<boolean>(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState<boolean>(true);

  const makeAuthenticatedRequest = async (url: string, options: RequestOptions = {}) => {
    const token = localStorage.getItem('ecokonek_token');
    const userJson = localStorage.getItem('ecokonek_user');
    const userId = userJson ? JSON.parse(userJson)?.id : '';

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(userId ? { 'x-user-id': userId } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  useEffect(() => {
    let mounted = true;

    const loadDepartmentAccess = async () => {
      try {
        const profile = await makeAuthenticatedRequest('/api/supabase/functions/user-profile', {
          method: 'POST',
          body: JSON.stringify({ action: 'get-profile' }),
        });
        
        // Ensure the bucket exists early in the background
        fetch('/api/admin/ensure-hazard-bucket', { method: 'POST' }).catch(() => {});

        if (!mounted) return;
        const hasDepartment = Boolean(profile?.user?.department_id || profile?.user?.barangay_id);
        setHasDepartmentAssigned(hasDepartment);
      } catch {
        if (!mounted) return;
        setHasDepartmentAssigned(false);
      } finally {
        if (mounted) {
          setIsCheckingAccess(false);
        }
      }
    };

    loadDepartmentAccess();

    return () => {
      mounted = false;
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors({ ...fieldErrors, hazardImage: 'Image must be under 5MB' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setHazardImage(file);
      setFieldErrors({ ...fieldErrors, hazardImage: '' });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setHazardImage(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateField = (field: string, value: string) => {
    const errors = { ...fieldErrors };
    
    switch (field) {
      case 'quantityWeight':
        errors.quantityWeight = value.trim() ? '' : 'Quantity/Weight is required';
        break;
      case 'itemDescription':
        errors.itemDescription = value.trim() 
          ? (value.length > 500 ? 'Description must be 500 characters or less' : '')
          : 'Item Description is required';
        break;
      case 'brand':
        errors.brand = value.trim() ? '' : 'Brand is required';
        break;
      case 'model':
        errors.model = value.trim() ? '' : 'Model is required';
        break;
      case 'propertyNumber':
        errors.propertyNumber = value.trim() ? '' : 'Property Number is required';
        break;
      case 'serialNumber':
        errors.serialNumber = value.trim() ? '' : 'Serial Number is required';
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleBlur = (field: string, value: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (isCheckingAccess || !hasDepartmentAssigned) {
      setError('Your account must have an assigned department before you can submit hazardous items.');
      return;
    }

    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    if (!quantityWeight.trim()) newErrors.quantityWeight = 'Quantity/Weight is required';
    if (!itemDescription.trim()) newErrors.itemDescription = 'Item Description is required';
    if (!brand.trim()) newErrors.brand = 'Brand is required';
    if (!model.trim()) newErrors.model = 'Model is required';
    if (!propertyNumber.trim()) newErrors.propertyNumber = 'Property Number is required';
    if (!serialNumber.trim()) newErrors.serialNumber = 'Serial Number is required';
    if (!hazardImage) newErrors.hazardImage = 'Hazard photo is required';

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setError('Please complete all required fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert image to base64
      let imageBase64 = '';
      let imageMimeType = '';
      
      if (hazardImage) {
        imageMimeType = hazardImage.type;
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(hazardImage);
        });
      }

      const combinedDescription = [
        `Hazard Type: ${hazardType}`,
        `Quantity/Weight: ${quantityWeight.trim()}`,
        `Item Description: ${itemDescription.trim()}`,
        `Image Filename: ${hazardImage!.name}`,
      ].join(' | ');

      const data = await makeAuthenticatedRequest('/api/supabase/functions/donation-handler', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create-donation',
          donationData: {
            deviceCategory: 'hazardous-consumables',
            deviceType: 'Hazardous Waste & Consumables',
            brand: brand.trim(),
            model: model.trim(),
            condition: 'N/A',
            description: combinedDescription,
            year: null,
            dropOffCenter: null,
            isCDCAsset: true,
            propertyNumber: propertyNumber.trim(),
            serialNumber: serialNumber.trim(),
            hazardousData: {
              hazardType,
              quantityWeight: quantityWeight.trim(),
              itemDescription: itemDescription.trim(),
              imageBase64,
              imageMimeType
            },
          },
        }),
      });

      if (!data?.success) {
        setError(data?.error || 'Failed to submit hazardous item.');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      if (err?.message?.includes('401')) {
        setError('Session expired. Please log in again.');
      } else if (err?.message?.includes('403')) {
        setError('Your account must have an assigned department before you can submit hazardous items.');
      } else {
        setError('Unable to submit right now. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="text-5xl">⚠️</div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hazardous Waste & Consumables</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Submit items flagged for safe disposal</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl border border-green-200 bg-green-50 flex items-start gap-3 animate-pulse">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-semibold text-green-800">Submission Successful!</p>
              <p className="text-sm text-green-700">Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 flex items-start gap-3">
            <div className="text-xl mt-0.5">❌</div>
            <div className="flex-1">
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {!isCheckingAccess && !hasDepartmentAssigned && (
          <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-3">
            <div className="text-xl mt-0.5">⚠️</div>
            <div className="flex-1">
              <p className="font-semibold text-amber-800">Department Required</p>
              <p className="text-sm text-amber-700">
                Your account has no designated department yet. Hazardous submission is locked until an admin assigns your department.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hazard Type Selection */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Hazard Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HAZARD_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setHazardType(type);
                    setTouched({ ...touched, hazardType: true });
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    hazardType === type
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{HAZARD_TYPES[type].icon}</div>
                  <div className="text-xs font-medium text-gray-700 line-clamp-2">{type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Hazard Photo <span className="text-red-500">*</span>
            </label>
            
            {!imagePreview ? (
              <div
                className="border-2 border-dashed border-orange-300 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:bg-orange-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm font-medium text-gray-700">Tap to upload photo</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG • Max 5MB</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-100">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Change Photo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            {fieldErrors.hazardImage && (
              <p className="text-xs text-red-600 mt-2">{fieldErrors.hazardImage}</p>
            )}
          </div>

          {/* Quantity & Description */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Quantity / Weight <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={quantityWeight}
                onChange={(e) => setQuantityWeight(e.target.value)}
                onBlur={() => handleBlur('quantityWeight', quantityWeight)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${
                  fieldErrors.quantityWeight && touched.quantityWeight
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                }`}
                placeholder="e.g., 5 cartridges / 2.3 kg"
                required
              />
              {fieldErrors.quantityWeight && touched.quantityWeight && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.quantityWeight}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Item Description <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs ${itemDescription.length > 500 ? 'text-red-600' : 'text-gray-500'}`}>
                  {itemDescription.length}/500
                </span>
              </div>
              <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                onBlur={() => handleBlur('itemDescription', itemDescription)}
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base resize-none ${
                  fieldErrors.itemDescription && touched.itemDescription
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                }`}
                placeholder="Describe current state (swollen, leaking, damaged, etc.)"
                required
              />
              {fieldErrors.itemDescription && touched.itemDescription && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.itemDescription}</p>
              )}
            </div>
          </div>

          {/* Brand & Model Reference */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <p className="text-sm font-semibold text-gray-900 mb-4">
              Brand / Model Reference <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  onBlur={() => handleBlur('brand', brand)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${
                    fieldErrors.brand && touched.brand
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                  }`}
                  placeholder="e.g., Epson"
                  required
                />
                {fieldErrors.brand && touched.brand && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.brand}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  onBlur={() => handleBlur('model', model)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${
                    fieldErrors.model && touched.model
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                  }`}
                  placeholder="e.g., L14150"
                  required
                />
                {fieldErrors.model && touched.model && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.model}</p>
                )}
              </div>
            </div>
          </div>

          {/* CDC Asset Info */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <p className="text-sm font-semibold text-gray-900 mb-4">
              CDC Asset Information <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Property Number</label>
                <input
                  type="text"
                  value={propertyNumber}
                  onChange={(e) => setPropertyNumber(e.target.value)}
                  onBlur={() => handleBlur('propertyNumber', propertyNumber)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${
                    fieldErrors.propertyNumber && touched.propertyNumber
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                  }`}
                  placeholder="ABC-12345"
                  required
                />
                {fieldErrors.propertyNumber && touched.propertyNumber && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.propertyNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Serial Number</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  onBlur={() => handleBlur('serialNumber', serialNumber)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${
                    fieldErrors.serialNumber && touched.serialNumber
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 focus:border-orange-500 focus:bg-white'
                  }`}
                  placeholder="SN-2024-001"
                  required
                />
                {fieldErrors.serialNumber && touched.serialNumber && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.serialNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => router.push('/donate')}
              className="order-2 sm:order-1 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || success || isCheckingAccess || !hasDepartmentAssigned}
              className="order-1 sm:order-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  Submitting...
                </span>
              ) : success ? (
                '✅ Submitted'
              ) : (
                'Submit Hazardous Item'
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-xl border border-blue-200 bg-blue-50">
          <p className="text-xs sm:text-sm text-blue-700">
            <span className="font-semibold">ℹ️ Note:</span> Hazardous items bypass device condition checks and are automatically routed to CDC's disposal workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
