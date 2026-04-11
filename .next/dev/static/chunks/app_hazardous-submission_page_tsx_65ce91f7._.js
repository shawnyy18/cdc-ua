(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/hazardous-submission/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HazardousSubmissionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const HAZARD_TYPES = {
    'Ink/Toner': {
        icon: '🖨️',
        description: 'Ink cartridges and toner'
    },
    'Batteries': {
        icon: '🔋',
        description: 'Batteries, accumulators'
    },
    'Bulbs': {
        icon: '💡',
        description: 'Fluorescent, LED, halogen bulbs'
    },
    'E-waste scrap': {
        icon: '♻️',
        description: 'Electronic components, scrap'
    }
};
const HAZARD_TYPE_OPTIONS = Object.keys(HAZARD_TYPES);
_c = HAZARD_TYPE_OPTIONS;
function HazardousSubmissionPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hazardType, setHazardType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(HAZARD_TYPE_OPTIONS[0]);
    const [quantityWeight, setQuantityWeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemDescription, setItemDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [brand, setBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [propertyNumber, setPropertyNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [serialNumber, setSerialNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hazardImage, setHazardImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [touched, setTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hasDepartmentAssigned, setHasDepartmentAssigned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCheckingAccess, setIsCheckingAccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const makeAuthenticatedRequest = async (url, options = {})=>{
        const token = localStorage.getItem('ecokonek_token');
        const userJson = localStorage.getItem('ecokonek_user');
        const userId = userJson ? JSON.parse(userJson)?.id : '';
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...token ? {
                    Authorization: `Bearer ${token}`
                } : {},
                ...userId ? {
                    'x-user-id': userId
                } : {},
                ...options.headers || {}
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HazardousSubmissionPage.useEffect": ()=>{
            let mounted = true;
            const loadDepartmentAccess = {
                "HazardousSubmissionPage.useEffect.loadDepartmentAccess": async ()=>{
                    try {
                        const profile = await makeAuthenticatedRequest('/api/supabase/functions/user-profile', {
                            method: 'POST',
                            body: JSON.stringify({
                                action: 'get-profile'
                            })
                        });
                        // Ensure the bucket exists early in the background
                        fetch('/api/admin/ensure-hazard-bucket', {
                            method: 'POST'
                        }).catch({
                            "HazardousSubmissionPage.useEffect.loadDepartmentAccess": ()=>{}
                        }["HazardousSubmissionPage.useEffect.loadDepartmentAccess"]);
                        if (!mounted) return;
                        const hasDepartment = Boolean(profile?.user?.department_id || profile?.user?.barangay_id);
                        setHasDepartmentAssigned(hasDepartment);
                    } catch  {
                        if (!mounted) return;
                        setHasDepartmentAssigned(false);
                    } finally{
                        if (mounted) {
                            setIsCheckingAccess(false);
                        }
                    }
                }
            }["HazardousSubmissionPage.useEffect.loadDepartmentAccess"];
            loadDepartmentAccess();
            return ({
                "HazardousSubmissionPage.useEffect": ()=>{
                    mounted = false;
                }
            })["HazardousSubmissionPage.useEffect"];
        }
    }["HazardousSubmissionPage.useEffect"], []);
    const handleImageChange = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setFieldErrors({
                ...fieldErrors,
                hazardImage: 'Image must be under 5MB'
            });
            return;
        }
        const reader = new FileReader();
        reader.onload = (event)=>{
            setImagePreview(event.target?.result);
            setHazardImage(file);
            setFieldErrors({
                ...fieldErrors,
                hazardImage: ''
            });
        };
        reader.readAsDataURL(file);
    };
    const removeImage = ()=>{
        setHazardImage(null);
        setImagePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    const validateField = (field, value)=>{
        const errors = {
            ...fieldErrors
        };
        switch(field){
            case 'quantityWeight':
                errors.quantityWeight = value.trim() ? '' : 'Quantity/Weight is required';
                break;
            case 'itemDescription':
                errors.itemDescription = value.trim() ? value.length > 500 ? 'Description must be 500 characters or less' : '' : 'Item Description is required';
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
    const handleBlur = (field, value)=>{
        setTouched({
            ...touched,
            [field]: true
        });
        validateField(field, value);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        if (isCheckingAccess || !hasDepartmentAssigned) {
            setError('Your account must have an assigned department before you can submit hazardous items.');
            return;
        }
        // Validate all fields
        const newErrors = {};
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        setIsSubmitting(true);
        try {
            // Convert image to base64
            let imageBase64 = '';
            let imageMimeType = '';
            if (hazardImage) {
                imageMimeType = hazardImage.type;
                imageBase64 = await new Promise((resolve, reject)=>{
                    const reader = new FileReader();
                    reader.onload = ()=>resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(hazardImage);
                });
            }
            const combinedDescription = [
                `Hazard Type: ${hazardType}`,
                `Quantity/Weight: ${quantityWeight.trim()}`,
                `Item Description: ${itemDescription.trim()}`,
                `Image Filename: ${hazardImage.name}`
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
                        }
                    }
                })
            });
            if (!data?.success) {
                setError(data?.error || 'Failed to submit hazardous item.');
                setIsSubmitting(false);
                return;
            }
            setSuccess(true);
            setTimeout(()=>{
                router.push('/dashboard');
            }, 1500);
        } catch (err) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4 sm:py-12 sm:px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl",
                                children: "⚠️"
                            }, void 0, false, {
                                fileName: "[project]/app/hazardous-submission/page.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl sm:text-3xl font-bold text-gray-900",
                            children: "Hazardous Waste & Consumables"
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base text-gray-600 mt-2",
                            children: "Submit items flagged for safe disposal"
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this),
                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 rounded-xl border border-green-200 bg-green-50 flex items-start gap-3 animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-2xl",
                            children: "✅"
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-green-800",
                                    children: "Submission Successful!"
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-green-700",
                                    children: "Redirecting to dashboard..."
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 rounded-xl border border-red-200 bg-red-50 flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xl mt-0.5",
                            children: "❌"
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-red-800",
                                    children: "Error"
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-700",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 276,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 274,
                    columnNumber: 11
                }, this),
                !isCheckingAccess && !hasDepartmentAssigned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xl mt-0.5",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-amber-800",
                                    children: "Department Required"
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-amber-700",
                                    children: "Your account has no designated department yet. Hazardous submission is locked until an admin assigns your department."
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 284,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-md p-5 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-900 mb-4",
                                    children: [
                                        "Hazard Type ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                                    children: HAZARD_TYPE_OPTIONS.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setHazardType(type);
                                                setTouched({
                                                    ...touched,
                                                    hazardType: true
                                                });
                                            },
                                            className: `p-4 rounded-xl border-2 transition-all duration-200 ${hazardType === type ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 bg-white hover:border-orange-300'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl mb-2",
                                                    children: HAZARD_TYPES[type].icon
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-medium text-gray-700 line-clamp-2",
                                                    children: type
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, type, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-md p-5 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-900 mb-4",
                                    children: [
                                        "Hazard Photo ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this),
                                !imagePreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-2 border-dashed border-orange-300 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:bg-orange-50 transition-colors",
                                    onClick: ()=>fileInputRef.current?.click(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl mb-2",
                                            children: "📸"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: "Tap to upload photo"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: "JPG, PNG • Max 5MB"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: imagePreview,
                                                    alt: "Preview",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: removeImage,
                                                    className: "absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "w-full px-4 py-2 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors",
                                            children: "Change Photo"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: fileInputRef,
                                    type: "file",
                                    accept: "image/jpeg,image/png,image/webp",
                                    onChange: handleImageChange,
                                    className: "hidden",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 360,
                                    columnNumber: 13
                                }, this),
                                fieldErrors.hazardImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600 mt-2",
                                    children: fieldErrors.hazardImage
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-md p-5 sm:p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-900 mb-2",
                                            children: [
                                                "Quantity / Weight ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: quantityWeight,
                                            onChange: (e)=>setQuantityWeight(e.target.value),
                                            onBlur: ()=>handleBlur('quantityWeight', quantityWeight),
                                            className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${fieldErrors.quantityWeight && touched.quantityWeight ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                            placeholder: "e.g., 5 cartridges / 2.3 kg",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        fieldErrors.quantityWeight && touched.quantityWeight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-red-600 mt-1",
                                            children: fieldErrors.quantityWeight
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-900",
                                                    children: [
                                                        "Item Description ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs ${itemDescription.length > 500 ? 'text-red-600' : 'text-gray-500'}`,
                                                    children: [
                                                        itemDescription.length,
                                                        "/500"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: itemDescription,
                                            onChange: (e)=>setItemDescription(e.target.value),
                                            onBlur: ()=>handleBlur('itemDescription', itemDescription),
                                            rows: 4,
                                            maxLength: 500,
                                            className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base resize-none ${fieldErrors.itemDescription && touched.itemDescription ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                            placeholder: "Describe current state (swollen, leaking, damaged, etc.)",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 15
                                        }, this),
                                        fieldErrors.itemDescription && touched.itemDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-red-600 mt-1",
                                            children: fieldErrors.itemDescription
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 421,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-md p-5 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-900 mb-4",
                                    children: [
                                        "Brand / Model Reference ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-medium text-gray-600 mb-2",
                                                    children: "Brand"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 433,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: brand,
                                                    onChange: (e)=>setBrand(e.target.value),
                                                    onBlur: ()=>handleBlur('brand', brand),
                                                    className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${fieldErrors.brand && touched.brand ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                                    placeholder: "e.g., Epson",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 17
                                                }, this),
                                                fieldErrors.brand && touched.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 mt-1",
                                                    children: fieldErrors.brand
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 448,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-medium text-gray-600 mb-2",
                                                    children: "Model"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: model,
                                                    onChange: (e)=>setModel(e.target.value),
                                                    onBlur: ()=>handleBlur('model', model),
                                                    className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${fieldErrors.model && touched.model ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                                    placeholder: "e.g., L14150",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 17
                                                }, this),
                                                fieldErrors.model && touched.model && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 mt-1",
                                                    children: fieldErrors.model
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 427,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-md p-5 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-900 mb-4",
                                    children: [
                                        "CDC Asset Information ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-medium text-gray-600 mb-2",
                                                    children: "Property Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: propertyNumber,
                                                    onChange: (e)=>setPropertyNumber(e.target.value),
                                                    onBlur: ()=>handleBlur('propertyNumber', propertyNumber),
                                                    className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${fieldErrors.propertyNumber && touched.propertyNumber ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                                    placeholder: "ABC-12345",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 17
                                                }, this),
                                                fieldErrors.propertyNumber && touched.propertyNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 mt-1",
                                                    children: fieldErrors.propertyNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-medium text-gray-600 mb-2",
                                                    children: "Serial Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: serialNumber,
                                                    onChange: (e)=>setSerialNumber(e.target.value),
                                                    onBlur: ()=>handleBlur('serialNumber', serialNumber),
                                                    className: `w-full px-4 py-3 rounded-lg border-2 transition-colors text-base ${fieldErrors.serialNumber && touched.serialNumber ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:bg-white'}`,
                                                    placeholder: "SN-2024-001",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 17
                                                }, this),
                                                fieldErrors.serialNumber && touched.serialNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 mt-1",
                                                    children: fieldErrors.serialNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/hazardous-submission/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-3 justify-end pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>router.push('/donate'),
                                    className: "order-2 sm:order-1 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 522,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting || success || isCheckingAccess || !hasDepartmentAssigned,
                                    className: "order-1 sm:order-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-95",
                                    children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block animate-spin",
                                                children: "⏳"
                                            }, void 0, false, {
                                                fileName: "[project]/app/hazardous-submission/page.tsx",
                                                lineNumber: 536,
                                                columnNumber: 19
                                            }, this),
                                            "Submitting..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/hazardous-submission/page.tsx",
                                        lineNumber: 535,
                                        columnNumber: 17
                                    }, this) : success ? '✅ Submitted' : 'Submit Hazardous Item'
                                }, void 0, false, {
                                    fileName: "[project]/app/hazardous-submission/page.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/hazardous-submission/page.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 295,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 p-4 rounded-xl border border-blue-200 bg-blue-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs sm:text-sm text-blue-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: "ℹ️ Note:"
                            }, void 0, false, {
                                fileName: "[project]/app/hazardous-submission/page.tsx",
                                lineNumber: 551,
                                columnNumber: 13
                            }, this),
                            " Hazardous items bypass device condition checks and are automatically routed to CDC's disposal workflow."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/hazardous-submission/page.tsx",
                        lineNumber: 550,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/hazardous-submission/page.tsx",
                    lineNumber: 549,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/hazardous-submission/page.tsx",
            lineNumber: 251,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/hazardous-submission/page.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
_s(HazardousSubmissionPage, "WDj9xWdbz9vHMd5cyUVYFtLrjco=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = HazardousSubmissionPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "HAZARD_TYPE_OPTIONS");
__turbopack_context__.k.register(_c1, "HazardousSubmissionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_hazardous-submission_page_tsx_65ce91f7._.js.map