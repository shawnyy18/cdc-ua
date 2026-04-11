(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/DonationSuccessModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonationSuccessModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DonationSuccessModal({ isOpen, onClose, donationData }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonationSuccessModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                // Auto close after 8 seconds
                const timer = setTimeout({
                    "DonationSuccessModal.useEffect.timer": ()=>{
                        onClose();
                    }
                }["DonationSuccessModal.useEffect.timer"], 8000);
                return ({
                    "DonationSuccessModal.useEffect": ()=>{
                        clearTimeout(timer);
                        document.body.style.overflow = 'unset';
                    }
                })["DonationSuccessModal.useEffect"];
            } else {
                document.body.style.overflow = 'unset';
            }
        }
    }["DonationSuccessModal.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen || !donationData) return null;
    const isDonated = donationData.donationType === 'donated';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-609e2ed005b9ad3e" + " " + "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-609e2ed005b9ad3e" + " " + "bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-609e2ed005b9ad3e" + " " + `p-6 rounded-t-2xl ${isDonated ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'} text-white text-center`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "jsx-609e2ed005b9ad3e" + " " + `${isDonated ? 'ri-gift-line' : 'ri-recycle-line'} text-3xl`
                                }, void 0, false, {
                                    fileName: "[project]/components/DonationSuccessModal.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "text-2xl font-bold mb-2",
                                children: isDonated ? 'Device Donated!' : 'Device Recycled!'
                            }, void 0, false, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "text-white text-opacity-90",
                                children: "Thank you for making a difference!"
                            }, void 0, false, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DonationSuccessModal.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-609e2ed005b9ad3e" + " " + "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "text-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-609e2ed005b9ad3e" + " " + "text-lg font-semibold text-gray-800 mb-2",
                                        children: donationData.deviceName
                                    }, void 0, false, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-609e2ed005b9ad3e" + " " + "text-gray-600",
                                        children: isDonated ? 'Your device will help someone in our community' : 'Your device will be responsibly recycled'
                                    }, void 0, false, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "grid grid-cols-2 gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-609e2ed005b9ad3e" + " " + "text-center p-4 bg-green-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-609e2ed005b9ad3e" + " " + "text-2xl font-bold text-green-600 mb-1",
                                                children: [
                                                    "+",
                                                    donationData.ecoPoints
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-609e2ed005b9ad3e" + " " + "text-sm text-gray-600",
                                                children: "Eco Points"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-609e2ed005b9ad3e" + " " + "text-center p-4 bg-blue-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-609e2ed005b9ad3e" + " " + "text-2xl font-bold text-blue-600 mb-1",
                                                children: [
                                                    donationData.co2Saved,
                                                    "kg"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                                lineNumber: 80,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-609e2ed005b9ad3e" + " " + "text-sm text-gray-600",
                                                children: "CO₂ Saved"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-609e2ed005b9ad3e" + " " + `p-4 rounded-xl mb-6 ${isDonated ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-609e2ed005b9ad3e" + " " + "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-609e2ed005b9ad3e" + " " + `w-10 h-10 rounded-full flex items-center justify-center ${isDonated ? 'bg-green-500' : 'bg-orange-500'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "jsx-609e2ed005b9ad3e" + " " + `${isDonated ? 'ri-user-heart-line' : 'ri-plant-line'} text-white`
                                            }, void 0, false, {
                                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/DonationSuccessModal.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-609e2ed005b9ad3e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-609e2ed005b9ad3e" + " " + "font-semibold text-gray-800",
                                                    children: isDonated ? 'Going to Community' : 'Going to Recycling'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DonationSuccessModal.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-609e2ed005b9ad3e" + " " + "text-sm text-gray-600",
                                                    children: isDonated ? 'A community member will receive your device' : 'Materials will be recovered and reused'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/DonationSuccessModal.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/DonationSuccessModal.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/DonationSuccessModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-609e2ed005b9ad3e" + " " + "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "jsx-609e2ed005b9ad3e" + " " + "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-colors whitespace-nowrap",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onClose();
                                            window.location.href = '/dashboard';
                                        },
                                        className: "jsx-609e2ed005b9ad3e" + " " + "flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors whitespace-nowrap",
                                        children: "View Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/components/DonationSuccessModal.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DonationSuccessModal.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DonationSuccessModal.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "jsx-609e2ed005b9ad3e" + " " + "absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "jsx-609e2ed005b9ad3e" + " " + "ri-close-line"
                        }, void 0, false, {
                            fileName: "[project]/components/DonationSuccessModal.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DonationSuccessModal.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-609e2ed005b9ad3e" + " " + "absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                animation: 'progress 8s linear forwards'
                            },
                            className: "jsx-609e2ed005b9ad3e" + " " + "h-full bg-green-500 transition-all duration-8000 ease-linear"
                        }, void 0, false, {
                            fileName: "[project]/components/DonationSuccessModal.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DonationSuccessModal.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/DonationSuccessModal.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "609e2ed005b9ad3e",
                children: "@keyframes progress{0%{width:100%}to{width:0%}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DonationSuccessModal.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(DonationSuccessModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = DonationSuccessModal;
var _c;
__turbopack_context__.k.register(_c, "DonationSuccessModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/redirectAdmin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redirectIfAdmin",
    ()=>redirectIfAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://yxoxxrbukjyioyfveaml.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3h4cmJ1a2p5aW95ZnZlYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODYyNDUsImV4cCI6MjA3NjE2MjI0NX0.hbJzB2u6v4BB1Q1BYCPpazbxcXc-YOXlMgCiY0ZTP1o"));
async function redirectIfAdmin() {
    try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return false;
        }
        // Fetch user profile to check is_admin flag
        const { data: userProfile, error } = await supabase.from('users').select('is_admin').eq('id', session.user.id).single();
        if (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
        // If user is admin, redirect to admin dashboard
        if (userProfile?.is_admin === true) {
            console.log('Admin user detected, redirecting to admin dashboard');
            if ("TURBOPACK compile-time truthy", 1) {
                window.location.href = '/admin';
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in redirectIfAdmin:', error);
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/donate/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
// ProfileDropdown is now provided by the global Navbar in app/layout.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DonationSuccessModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DonationSuccessModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redirectAdmin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redirectAdmin.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function DonatePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deviceCondition, setDeviceCondition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deviceDetails, setDeviceDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        brand: '',
        model: '',
        year: '',
        description: ''
    });
    const [dropOffCenters, setDropOffCenters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCenter, setSelectedCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // CDC (Clark Development Corporation) asset fields
    const [isCDCAsset, setIsCDCAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [propertyNumber, setPropertyNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [serialNumber, setSerialNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // refreshTrigger was previously only used for the page-level ProfileDropdown
    // which is now provided globally by the Navbar.
    const [isLoadingCenters, setIsLoadingCenters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showSuccessModal, setShowSuccessModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [donationResult, setDonationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Refs to prevent infinite loops
    const userDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const makeAuthenticatedRequest = async (url, options = {})=>{
        try {
            const token = localStorage.getItem('ecokonek_token');
            // Try to read user id for x-user-id fallback
            let userId = '';
            try {
                const storedUser = localStorage.getItem('ecokonek_user');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    userId = parsed?.id || '';
                }
            } catch (e) {
            // ignore parse error
            }
            if (!token) {
                // No token, but include x-user-id if available so backend can proceed
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...userId ? {
                            'x-user-id': userId
                        } : {},
                        ...options.headers || {}
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return await response.json();
            }
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    ...userId ? {
                        'x-user-id': userId
                    } : {},
                    ...options.headers || {}
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    };
    // Check authentication without invalidating token
    const checkAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DonatePage.useCallback[checkAuth]": ()=>{
            const token = localStorage.getItem('ecokonek_token');
            const userData = localStorage.getItem('ecokonek_user');
            if (!token || !userData) {
                router.push('/login');
                return null;
            }
            try {
                const parsedUser = JSON.parse(userData);
                return {
                    token,
                    userData: parsedUser
                };
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('ecokonek_token');
                localStorage.removeItem('ecokonek_user');
                router.push('/login');
                return null;
            }
        }
    }["DonatePage.useCallback[checkAuth]"], [
        router
    ]);
    // Enhanced user data loading with memoization
    const loadUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DonatePage.useCallback[loadUserData]": async ()=>{
            if (isInitialized) return;
            try {
                // Check if user is admin and redirect if so
                const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redirectAdmin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirectIfAdmin"])();
                if (isAdmin) {
                    console.log('Admin user redirected to admin dashboard');
                    return;
                }
                const auth = checkAuth();
                if (!auth) return;
                setUser(auth.userData);
                userDataRef.current = auth.userData;
                // Fetch real user data from backend
                try {
                    const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
                        method: 'POST',
                        body: JSON.stringify({
                            action: 'get-profile'
                        })
                    });
                    if (data.success && data.user) {
                        const updatedUser = {
                            ...auth.userData,
                            ...data.user,
                            eco_points: data.user.eco_points || 0,
                            total_donations: data.user.total_donations || 0,
                            total_co2_saved: data.user.total_co2_saved || data.user.co2_saved || 0,
                            donated_devices: data.user.donated_devices || 0,
                            recycled_devices: data.user.recycled_devices || 0,
                            profile_image_url: data.user.profile_image_url || auth.userData.profile_image_url,
                            barangay_id: data.user.barangay_id || null,
                            barangays: data.user.barangays || null
                        };
                        console.log('👤 Donate page: User loaded with barangay:', {
                            barangay_id: updatedUser.barangay_id,
                            has_barangay: !!updatedUser.barangay_id
                        });
                        setUser(updatedUser);
                        userDataRef.current = updatedUser;
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserToLocalStorage"])(updatedUser);
                    }
                } catch (error) {
                    console.error('Failed to fetch real user data:', error);
                // Continue with stored user data
                }
                await fetchDropOffCenters();
                setIsInitialized(true);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }["DonatePage.useCallback[loadUserData]"], [
        checkAuth,
        isInitialized
    ]);
    // Initialize on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePage.useEffect": ()=>{
            loadUserData();
        }
    }["DonatePage.useEffect"], [
        loadUserData
    ]);
    // Improved storage listener: always refetch user data from backend after localStorage changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePage.useEffect": ()=>{
            if (!isInitialized) return;
            const refetchUserData = {
                "DonatePage.useEffect.refetchUserData": async ()=>{
                    await loadUserData();
                }
            }["DonatePage.useEffect.refetchUserData"];
            const handleStorageChange = {
                "DonatePage.useEffect.handleStorageChange": ()=>{
                    refetchUserData();
                }
            }["DonatePage.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            // Cleanup any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            // Check for updates periodically with longer interval
            intervalRef.current = setInterval({
                "DonatePage.useEffect": ()=>{
                    refetchUserData();
                }
            }["DonatePage.useEffect"], 5000); // Increased interval to 5 seconds
            return ({
                "DonatePage.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorageChange);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["DonatePage.useEffect"];
        }
    }["DonatePage.useEffect"], [
        isInitialized,
        loadUserData
    ]);
    const fetchDropOffCenters = async ()=>{
        // Always use the five barangays for drop-off centers
        const barangayCenters = [
            {
                id: 'lagundi',
                name: 'Lagundi Barangay Drop-off',
                location: 'Lagundi, Mexico, Pampanga',
                address: 'Lagundi',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'parian',
                name: 'Parian Barangay Drop-off',
                location: 'Parian, Mexico, Pampanga',
                address: 'Parian',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'san-carlos',
                name: 'San Carlos Barangay Drop-off',
                location: 'San Carlos, Mexico, Pampanga',
                address: 'San Carlos',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'sto-rosario',
                name: 'Sto. Rosario Barangay Drop-off',
                location: 'Sto. Rosario, Mexico, Pampanga',
                address: 'Sto. Rosario',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'san-lorenzo',
                name: 'San Lorenzo Barangay Drop-off',
                location: 'San Lorenzo, Mexico, Pampanga',
                address: 'San Lorenzo',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            }
        ];
        setDropOffCenters(barangayCenters);
        setSelectedCenter(barangayCenters[0].id);
        setIsLoadingCenters(false);
    };
    const setFallbackCenters = ()=>{
        const fallbackCenters = [
            {
                id: 'lagundi',
                name: 'Lagundi Barangay Drop-off',
                location: 'Lagundi, Mexico, Pampanga',
                address: 'Lagundi',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'parian',
                name: 'Parian Barangay Drop-off',
                location: 'Parian, Mexico, Pampanga',
                address: 'Parian',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'san-carlos',
                name: 'San Carlos Barangay Drop-off',
                location: 'San Carlos, Mexico, Pampanga',
                address: 'San Carlos',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'sto-rosario',
                name: 'Sto. Rosario Barangay Drop-off',
                location: 'Sto. Rosario, Mexico, Pampanga',
                address: 'Sto. Rosario',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
                id: 'san-lorenzo',
                name: 'San Lorenzo Barangay Drop-off',
                location: 'San Lorenzo, Mexico, Pampanga',
                address: 'San Lorenzo',
                city: 'Mexico',
                phone: '',
                email: '',
                operating_hours: 'Mon-Sat 8AM-6PM'
            }
        ];
        setDropOffCenters(fallbackCenters);
        setSelectedCenter(fallbackCenters[0].id);
    };
    const calculatePoints = ()=>{
        const category = deviceCategories.find((cat)=>cat.id === selectedCategory);
        if (!category) return 0;
        return deviceCondition === 'working' ? category.workingPoints : category.brokenPoints;
    };
    const calculateCO2 = ()=>{
        const co2Map = {
            'smartphone': {
                working: 8.5,
                broken: 4.2
            },
            'laptop': {
                working: 18.7,
                broken: 9.4
            },
            'tablet': {
                working: 11.3,
                broken: 5.7
            },
            'desktop': {
                working: 22.1,
                broken: 11.1
            },
            'appliance': {
                working: 7.8,
                broken: 3.9
            },
            'battery': {
                working: 3.2,
                broken: 1.6
            },
            'cable': {
                working: 1.5,
                broken: 0.8
            },
            'headphones': {
                working: 5.4,
                broken: 2.7
            }
        };
        const key = selectedCategory;
        const co2Data = co2Map[key];
        if (!co2Data) return 0;
        return Math.round((deviceCondition === 'working' ? co2Data.working : co2Data.broken) * 100) / 100;
    };
    const handleSubmitDonation = async ()=>{
        // Check if user has set their barangay (not required for CDC asset surrenders)
        if (!isCDCAsset && !user?.barangay_id) {
            setError('⚠️ Please set your barangay in your profile before donating. Go to Profile → Edit Profile → Select Barangay.');
            return;
        }
        // Enhanced validation with better error messages
        if (!deviceDetails.brand?.trim()) {
            setError('Please enter the device brand.');
            return;
        }
        if (!deviceDetails.model?.trim()) {
            setError('Please enter the device model.');
            return;
        }
        if (!isCDCAsset && !selectedCenter) {
            setError('Please select a drop-off center.');
            return;
        }
        if (!selectedCategory) {
            setError('Please select a device category.');
            return;
        }
        if (!deviceCondition) {
            setError('Please select device condition.');
            return;
        }
        // CDC asset validation: property number and serial number are required
        if (isCDCAsset) {
            if (!propertyNumber.trim()) {
                setError('Property Number is required for CDC assets.');
                return;
            }
            if (!serialNumber.trim()) {
                setError('Serial Number is required for CDC assets.');
                return;
            }
        }
        setIsSubmitting(true);
        setError('');
        try {
            // Enhanced authentication check
            const auth = checkAuth();
            if (!auth) {
                setError('Please log in to continue.');
                setIsSubmitting(false);
                return;
            }
            const selectedCenterData = dropOffCenters.find((center)=>center.id === selectedCenter);
            // Enhanced request with better error handling
            const requestData = {
                action: 'create-donation',
                donationData: {
                    deviceCategory: selectedCategory,
                    deviceType: deviceCategories.find((cat)=>cat.id === selectedCategory)?.name || selectedCategory,
                    brand: deviceDetails.brand.trim(),
                    model: deviceDetails.model.trim(),
                    condition: deviceCondition,
                    description: deviceDetails.description?.trim() || '',
                    year: isCDCAsset ? null : deviceDetails.year || null,
                    dropOffCenter: isCDCAsset ? null : selectedCenterData?.name || 'EcoKonek Central Hub',
                    isCDCAsset: isCDCAsset,
                    propertyNumber: isCDCAsset ? propertyNumber.trim() : null,
                    serialNumber: isCDCAsset ? serialNumber.trim() : null
                }
            };
            const data = await makeAuthenticatedRequest(`/api/supabase/functions/donation-handler`, {
                method: 'POST',
                headers: {
                    'x-user-id': auth.userData.id // Add user ID header for better auth
                },
                body: JSON.stringify(requestData)
            });
            if (data.success) {
                // Update user data in localStorage with new stats
                const updatedUser = {
                    ...auth.userData
                };
                if (data.newStats) {
                    updatedUser.eco_points = data.newStats.eco_points;
                    updatedUser.total_donations = data.newStats.total_donations;
                    updatedUser.total_co2_saved = data.newStats.total_co2_saved;
                    updatedUser.donated_devices = data.newStats.donated_devices;
                    updatedUser.recycled_devices = data.newStats.recycled_devices;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserToLocalStorage"])(updatedUser);
                    setUser(updatedUser);
                    userDataRef.current = updatedUser;
                }
                // Prepare success modal data
                setDonationResult({
                    deviceName: data.deviceName || `${deviceDetails.brand} ${deviceDetails.model}`,
                    ecoPoints: data.ecoPoints || calculatePoints(),
                    co2Saved: data.co2Saved || calculateCO2(),
                    donationType: data.donationType || (deviceCondition === 'working' ? 'donated' : 'recycled'),
                    destinationPath: data.destinationPath || (deviceCondition === 'working' ? 'Community Donation' : 'Recycling Center')
                });
                // Show success modal
                setShowSuccessModal(true);
                // Reset form
                setStep(1);
                setSelectedCategory('');
                setDeviceCondition('');
                setDeviceDetails({
                    brand: '',
                    model: '',
                    year: '',
                    description: ''
                });
                setSelectedCenter(dropOffCenters[0]?.id || '');
                setIsCDCAsset(false);
                setPropertyNumber('');
                setSerialNumber('');
                // Trigger storage event for other components
                window.dispatchEvent(new Event('storage'));
            } else {
                setError(data.error || 'Failed to submit donation. Please try again.');
            }
        } catch (err) {
            console.error('Donation submission error:', err);
            if (err.message.includes('HTTP 400')) {
                setError('Invalid submission data. Please check all fields and try again.');
            } else if (err.message.includes('HTTP 401')) {
                setError('Session expired. Please log in again.');
                setTimeout(()=>{
                    localStorage.removeItem('ecokonek_token');
                    localStorage.removeItem('ecokonek_user');
                    router.push('/login');
                }, 2000);
            } else if (err.message.includes('HTTP 500')) {
                setError('Server error. Please try again in a moment.');
            } else {
                setError('Network error. Please check your connection and try again.');
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    // Logout is handled by the global ProfileDropdown in the Navbar.
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePage.useEffect": ()=>{
            return ({
                "DonatePage.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["DonatePage.useEffect"];
        }
    }["DonatePage.useEffect"], []);
    if (!user || !isInitialized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 525,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/donate/page.tsx",
            lineNumber: 523,
            columnNumber: 12
        }, this);
    }
    // Check if submit button should be enabled
    const isSubmitEnabled = selectedCategory && deviceCondition && deviceDetails.brand?.trim() && deviceDetails.model?.trim() && (isCDCAsset || selectedCenter) && // Drop-off not required for CDC assets
    !isSubmitting && (isCDCAsset || user?.barangay_id) && // Barangay not required for CDC assets
    (!isCDCAsset || propertyNumber.trim() && serialNumber.trim()); // CDC fields required when toggled
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50",
        children: [
            (()=>{
                console.log('🟡 Barangay check:', user);
                return user && !user.barangay_id;
            })() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-50 border-l-4 border-amber-500 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "ri-alert-line text-amber-500 text-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 554,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 553,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-amber-800",
                                        children: "Barangay Required for Donation"
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 557,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm text-amber-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "You must set your barangay before you can donate. This helps us assign your donation to the correct barangay for tracking and community impact."
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 561,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 560,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/profile",
                                            className: "inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-user-settings-line mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/donate/page.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 21
                                                }, this),
                                                "Set Barangay in Profile"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 566,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 565,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 556,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 552,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/donate/page.tsx",
                    lineNumber: 551,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 550,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-6 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setStep(1),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition-all hover:scale-105 ${step >= 1 ? 'bg-green-500' : 'bg-gray-300'}`,
                                            children: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-24 h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 591,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>selectedCategory && setStep(2),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 2 ? 'bg-green-500 cursor-pointer' : selectedCategory ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`,
                                            children: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-24 h-1 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 598,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>selectedCategory && deviceCondition && setStep(3),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 3 ? 'bg-green-500 cursor-pointer' : selectedCategory && deviceCondition ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`,
                                            children: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 599,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 584,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold text-gray-800 mb-2",
                                        children: [
                                            step === 1 && 'Choose Device Category',
                                            step === 2 && 'Assess Condition',
                                            step === 3 && 'Device Details & Submit'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: [
                                            step === 1 && 'Select the type of device you want to donate',
                                            step === 2 && 'Help us determine the best path for your device',
                                            step === 3 && 'Provide additional information and complete your donation'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 608,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 582,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "ri-error-warning-line text-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 626,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-700 text-sm",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 625,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, this),
                            step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                                        children: deviceCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setSelectedCategory(category.id),
                                                className: `p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${selectedCategory === category.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 flex items-center justify-center mx-auto mb-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: `${category.icon} text-3xl ${selectedCategory === category.id ? 'text-green-500' : 'text-gray-400'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-gray-800 mb-2",
                                                        children: category.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-green-600",
                                                        children: [
                                                            category.brokenPoints,
                                                            "-",
                                                            category.workingPoints,
                                                            " points"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, category.id, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 637,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 635,
                                        columnNumber: 15
                                    }, this),
                                    selectedCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setStep(2),
                                            className: "bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap",
                                            children: "Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 657,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 634,
                                columnNumber: 13
                            }, this),
                            step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setDeviceCondition('working'),
                                                className: `p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${deviceCondition === 'working' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-gift-line text-white text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 681,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 680,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-center mb-4",
                                                        children: "Working Device"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Powers on and functions normally"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 685,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 690,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Screen/display works properly"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 694,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "No major physical damage"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center mt-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-bold text-green-600",
                                                                children: [
                                                                    deviceCategories.find((cat)=>cat.id === selectedCategory)?.workingPoints,
                                                                    " Points"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 699,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600 font-semibold",
                                                                children: "Will be DONATED to community"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setDeviceCondition('broken'),
                                                className: `p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${deviceCondition === 'broken' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-recycle-line text-white text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 712,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-center mb-4",
                                                        children: "Broken Device"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Doesn't power on or has major issues"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 722,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Cracked screen or damaged parts"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 726,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Not suitable for reuse"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center mt-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-bold text-orange-600",
                                                                children: [
                                                                    deviceCategories.find((cat)=>cat.id === selectedCategory)?.brokenPoints,
                                                                    " Points"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 731,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600 font-semibold",
                                                                children: "Will be RECYCLED responsibly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 732,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 730,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 704,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this),
                                    deviceCondition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setStep(3),
                                            className: "bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap",
                                            children: "Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 739,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 738,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 670,
                                columnNumber: 13
                            }, this),
                            step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-6 p-4 rounded-xl border border-gray-200 bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🏢"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 757,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-800",
                                                                children: "Official CDC Asset?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 759,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: "Enable for Clark Development Corporation internal asset surrender"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 760,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "switch",
                                                "aria-checked": isCDCAsset,
                                                onClick: ()=>{
                                                    setIsCDCAsset(!isCDCAsset);
                                                    if (isCDCAsset) {
                                                        setPropertyNumber('');
                                                        setSerialNumber('');
                                                    }
                                                },
                                                className: `relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isCDCAsset ? 'bg-blue-600' : 'bg-gray-300'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${isCDCAsset ? 'translate-x-5' : 'translate-x-0'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/donate/page.tsx",
                                                    lineNumber: 778,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 755,
                                        columnNumber: 15
                                    }, this),
                                    isCDCAsset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-8 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-building-2-line text-blue-600 text-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 790,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-blue-800",
                                                        children: "CDC Internal Asset Surrender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 789,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-blue-700 mb-5",
                                                children: "Enter the official CDC property and serial numbers found on the asset tag."
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 793,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-blue-800 mb-2",
                                                                children: "Property Number *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 798,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: propertyNumber,
                                                                onChange: (e)=>setPropertyNumber(e.target.value),
                                                                className: "w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
                                                                placeholder: "e.g., 66975",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 799,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-blue-800 mb-2",
                                                                children: "Serial Number *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: serialNumber,
                                                                onChange: (e)=>setSerialNumber(e.target.value),
                                                                className: "w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
                                                                placeholder: "e.g., 1H35310JDG",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 810,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 808,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-8 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Brand *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 825,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: deviceDetails.brand,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                brand: e.target.value
                                                            }),
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "e.g., Samsung, Apple, HP",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Model *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 837,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: deviceDetails.model,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                model: e.target.value
                                                            }),
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "e.g., Galaxy S21, iPhone 12, Pavilion",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 838,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this),
                                            !isCDCAsset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "Year Purchased"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: deviceDetails.year,
                                                                onChange: (e)=>setDeviceDetails({
                                                                        ...deviceDetails,
                                                                        year: e.target.value
                                                                    }),
                                                                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                                placeholder: "e.g., 2020",
                                                                min: "1990",
                                                                max: new Date().getFullYear()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 853,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "Drop-off Center *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 865,
                                                                columnNumber: 23
                                                            }, this),
                                                            isLoadingCenters ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 868,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: "Loading centers..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 869,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 867,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: selectedCenter,
                                                                        onChange: (e)=>setSelectedCenter(e.target.value),
                                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8 appearance-none bg-white",
                                                                        required: true,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                children: "Select a drop-off center"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/donate/page.tsx",
                                                                                lineNumber: 879,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            dropOffCenters.map((center)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: center.id,
                                                                                    children: [
                                                                                        center.name,
                                                                                        " - ",
                                                                                        center.location
                                                                                    ]
                                                                                }, center.id, true, {
                                                                                    fileName: "[project]/app/donate/page.tsx",
                                                                                    lineNumber: 881,
                                                                                    columnNumber: 31
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 873,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-arrow-down-s-line text-gray-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/donate/page.tsx",
                                                                            lineNumber: 887,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 886,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 872,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 864,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Additional Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 896,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: deviceDetails.description,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                description: e.target.value
                                                            }),
                                                        rows: 4,
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "Any additional details about the device condition, accessories included, etc.",
                                                        maxLength: 500
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 897,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mt-1",
                                                        children: [
                                                            deviceDetails.description.length,
                                                            "/500 characters"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 895,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 823,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 bg-green-50 rounded-xl mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-lg font-semibold text-gray-800 mb-4",
                                                children: "Your Impact Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 911,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: calculatePoints()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 914,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "Eco Points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 915,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 913,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: calculateCO2()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 918,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "kg CO₂ Saved"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 919,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 917,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: deviceCondition === 'working' ? 'Donated' : 'Recycled'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 922,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "Device Path"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 921,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 912,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 910,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSubmitDonation,
                                                disabled: !isSubmitEnabled,
                                                className: "bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap text-lg flex items-center justify-center gap-2 mx-auto",
                                                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 938,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Processing..."
                                                    ]
                                                }, void 0, true) : !isCDCAsset && !user?.barangay_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-alert-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 943,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Set Barangay to Continue"
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-recycle-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 948,
                                                            columnNumber: 23
                                                        }, this),
                                                        isCDCAsset ? 'Submit CDC Asset Surrender' : `Complete ${deviceCondition === 'working' ? 'Donation' : 'Recycle'}`
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 931,
                                                columnNumber: 17
                                            }, this),
                                            !isCDCAsset && !user?.barangay_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-amber-600 mt-4 font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-information-line"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 21
                                                    }, this),
                                                    " You must set your barangay in your profile before donating"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 954,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-4",
                                                children: deviceCondition === 'working' ? 'Your working device will be donated to help someone in need.' : 'Your device will be recycled responsibly to protect the environment.'
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 958,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 930,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 752,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 580,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DonationSuccessModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showSuccessModal,
                onClose: ()=>setShowSuccessModal(false),
                donationData: donationResult
            }, void 0, false, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 971,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/donate/page.tsx",
        lineNumber: 542,
        columnNumber: 5
    }, this);
}
_s(DonatePage, "oo2H91xfUEdtA9+YePIrhnP3dIQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DonatePage;
const deviceCategories = [
    {
        id: 'smartphone',
        name: 'Smartphone',
        icon: 'ri-smartphone-line',
        workingPoints: 75,
        brokenPoints: 35
    },
    {
        id: 'laptop',
        name: 'Laptop',
        icon: 'ri-computer-line',
        workingPoints: 150,
        brokenPoints: 75
    },
    {
        id: 'tablet',
        name: 'Tablet',
        icon: 'ri-tablet-line',
        workingPoints: 90,
        brokenPoints: 45
    },
    {
        id: 'desktop',
        name: 'Desktop',
        icon: 'ri-computer-line',
        workingPoints: 120,
        brokenPoints: 60
    },
    {
        id: 'appliance',
        name: 'Small Appliance',
        icon: 'ri-device-line',
        workingPoints: 60,
        brokenPoints: 30
    },
    {
        id: 'battery',
        name: 'Battery',
        icon: 'ri-battery-line',
        workingPoints: 25,
        brokenPoints: 15
    },
    {
        id: 'cable',
        name: 'Cables/Chargers',
        icon: 'ri-usb-line',
        workingPoints: 15,
        brokenPoints: 8
    },
    {
        id: 'headphones',
        name: 'Headphones',
        icon: 'ri-headphone-line',
        workingPoints: 40,
        brokenPoints: 20
    }
];
var _c;
__turbopack_context__.k.register(_c, "DonatePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f9777fd9._.js.map