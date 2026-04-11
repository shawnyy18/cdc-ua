module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/generate-quiz/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Simple in-memory cache and rate limiter for dev / small-scale usage.
// NOTE: This is per-process only. For production, replace with a shared
// cache and rate-limiter (Redis, Memcached, etc.).
const CACHE_TTL = 1000 * 60 * 5 // 5 minutes
;
const cache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
;
const RATE_LIMIT_MAX = 20 // max requests per window per IP
;
const rateMap = new Map();
function getClientKey(req) {
    // Try common headers set by proxies; fall back to 'unknown'
    const xf = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    if (xf) return xf.split(',')[0].trim();
    return 'unknown';
}
function checkRateLimit(req) {
    const key = getClientKey(req);
    const now = Date.now();
    const entry = rateMap.get(key);
    if (!entry || entry.reset <= now) {
        rateMap.set(key, {
            count: 1,
            reset: now + RATE_LIMIT_WINDOW
        });
        return true;
    }
    if (entry.count >= RATE_LIMIT_MAX) return false;
    entry.count += 1;
    return true;
}
function cacheGet(key) {
    const hit = cache.get(key);
    if (!hit) return null;
    if (hit.expires < Date.now()) {
        cache.delete(key);
        return null;
    }
    return hit.data;
}
function cacheSet(key, data) {
    cache.set(key, {
        data,
        expires: Date.now() + CACHE_TTL
    });
}
async function callAI(prompt, apiKey, model = 'gpt-4o-mini') {
    // Check if using Gemini (Google)
    const isGemini = model.toLowerCase().includes('gemini');
    if (isGemini) {
        // Robust fallback list for Gemini models (aligned with working chatbot configuration)
        const models = [
            // v1 preferred (stable) - EXACTLY matching chatbot/route.ts which is working
            {
                base: 'v1',
                model: 'gemini-1.5-flash-002'
            },
            {
                base: 'v1',
                model: 'gemini-1.5-pro-002'
            },
            {
                base: 'v1',
                model: 'gemini-1.5-flash'
            },
            {
                base: 'v1',
                model: 'gemini-1.5-pro'
            },
            {
                base: 'v1',
                model: 'gemini-1.0-pro'
            },
            // v1beta fallbacks
            {
                base: 'v1beta',
                model: 'gemini-1.5-flash'
            },
            {
                base: 'v1beta',
                model: 'gemini-1.5-pro'
            },
            {
                base: 'v1beta',
                model: 'gemini-1.0-pro'
            },
            {
                base: 'v1beta',
                model: 'gemini-pro'
            }
        ];
        // Deduplicate models list based on base+model key to avoid retrying same endpoint
        const uniqueModels = models.filter((m, index, self)=>index === self.findIndex((t)=>t.base === m.base && t.model === m.model));
        let lastError = null;
        for (const m of uniqueModels){
            try {
                const url = `https://generativelanguage.googleapis.com/${m.base}/models/${m.model}:generateContent?key=${apiKey}`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [
                                    {
                                        text: prompt
                                    }
                                ]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.1,
                            maxOutputTokens: 800
                        }
                    })
                });
                if (!res.ok) {
                    const text = await res.text().catch(()=>'');
                    // If 404 or not found, try next model
                    if (res.status === 404 || text.includes('not found') || text.includes('not supported')) {
                        console.log(`[generate-quiz] Model ${m.model} (${m.base}) failed, trying next...`);
                        continue;
                    }
                    throw new Error(`Gemini API error: ${res.status} ${res.statusText} ${text}`);
                }
                const data = await res.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                return text;
            } catch (e) {
                lastError = e;
                console.error(`[generate-quiz] Error with ${m.model}:`, e);
            }
        }
        throw lastError || new Error('All Gemini models failed');
    }
    // Uses OpenAI-compatible chat completions endpoint.
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'system',
                    content: 'You are an educational assistant. Respond ONLY with a single valid JSON object (no surrounding markdown or commentary). If you cannot produce the requested JSON, respond with {"error":"<reason>"}.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            // Use very low temperature for more deterministic output suitable for parsing
            temperature: 0.0,
            max_tokens: 800
        })
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>'');
        throw new Error(`AI provider error: ${res.status} ${res.statusText} ${text}`);
    }
    const data = await res.json();
    // Chat completions: pick assistant message
    const assistant = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;
    return String(assistant || '');
}
function tryParseJson(s) {
    try {
        return JSON.parse(s);
    } catch (e) {
        // Attempt to extract JSON substring
        const m = s.match(/\{[\s\S]*\}/);
        if (!m) return null;
        try {
            return JSON.parse(m[0]);
        } catch (_) {
            return null;
        }
    }
}
async function POST(req) {
    const body = await req.json().catch(()=>({}));
    const { moduleId, moduleTitle = 'Module', moduleContent = '', feedbackFor, question, selected, correctIndex } = body;
    // Allow forcing mock mode to avoid provider calls / charges during dev.
    // - Set env FORCE_MOCK=true to always return mocks.
    // - Or send { forceMock: true } in the request body for a per-request override.
    const forceMock = process.env.FORCE_MOCK === 'true' || Boolean(body?.forceMock);
    // Basic per-IP rate limiting to avoid abuse and unexpected charges.
    if (!checkRateLimit(req)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'rate_limited',
            message: 'Too many requests, please try again later.',
            source: 'rate_limited'
        }, {
            status: 429
        });
    }
    // Prioritize Gemini/Google if available (Free Tier)
    let API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    // Fallback to 'gemini-pro' if 1.5-flash is not available for this key/region
    let MODEL = process.env.GEMINI_MODEL || 'gemini-pro';
    // Fallback to OpenAI only if no Google key is found
    if (!API_KEY) {
        API_KEY = process.env.OPENAI_API_KEY;
        MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    }
    const debugAllowed = ("TURBOPACK compile-time value", "development") !== 'production' || Boolean(body?.debug);
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const preview = API_KEY ? `${String(API_KEY).slice(0, 12)}...` : 'none';
            console.log('[generate-quiz] API_KEY present:', Boolean(API_KEY), 'preview:', preview);
        } catch (e) {
            console.log('[generate-quiz] API_KEY check failed');
        }
    }
    if (feedbackFor) {
        // If no API key, return a helpful local fallback
        if (!API_KEY) {
            const isCorrect = selected === correctIndex;
            const feedback = isCorrect ? `That's right! Good job — ${moduleTitle} highlights this point.` : `Not quite. The correct answer is ${String.fromCharCode(65 + correctIndex)}. Review the material and try to remember the key fact.`;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                feedback
            });
        }
        // Ask the model to return a short explanation targeted to the user's answer.
        const prompt = `You are a concise teacher. Given the module content:\n${moduleContent}\n\nQuestion: ${question}\nThe student selected option index ${selected} (A=0). The correct index is ${correctIndex}. Provide a short (1-2 sentence) friendly explanation of why the selected option is correct or incorrect. Include a 1-line tip for remembering the concept. Return only a JSON object: {"feedback":"..."}.`;
        try {
            const text = await callAI(prompt, API_KEY, MODEL);
            if ("TURBOPACK compile-time truthy", 1) console.log('[generate-quiz][feedback] AI raw output:', text);
            const parsed = tryParseJson(text);
            if (parsed && typeof parsed.feedback === 'string') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                feedback: parsed.feedback
            });
            // Fallback if model didn't return strict JSON
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                feedback: text.trim()
            });
        } catch (err) {
            console.error('feedback generation failed', err);
            const isCorrect = selected === correctIndex;
            const feedback = isCorrect ? `That's right! ${moduleTitle} highlights this point.` : `Not quite. The correct answer is ${String.fromCharCode(65 + correctIndex)}.`;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                feedback
            });
        }
    }
    // Quiz generation
    const cacheKey = moduleId ? `module:${moduleId}` : `content:${JSON.stringify([
        moduleTitle,
        moduleContent
    ])}`;
    // If we have a cached result for this module/content, return it (covers both mock and AI results)
    try {
        const cached = cacheGet(cacheKey);
        if (cached && Array.isArray(cached.questions) && cached.questions.length > 0) {
            // Do not expose internal cache origin to non-debug clients.
            if ("TURBOPACK compile-time truthy", 1) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                questions: cached.questions,
                source: 'cache'
            });
            //TURBOPACK unreachable
            ;
        }
    } catch (e) {
    // ignore cache errors
    }
    // Local heuristic-based quiz generator used for forced mocks and quota fallbacks.
    const generateLocalFromContent = (title, content)=>{
        if (!content || content.trim().length === 0) {
            return [
                {
                    id: 'q1',
                    question: `Which statement best describes ${title.toLowerCase()}?`,
                    options: [
                        'Option A',
                        'Option B',
                        'Option C',
                        'Option D'
                    ],
                    correctIndex: 1,
                    explanation: 'Because B references the core idea.'
                }
            ];
        }
        const examplesMatch = content.match(/(?:such as|includes|including)\s*([^\.\n]+)/i);
        const commonDistractors = [
            'Paper documents',
            'Plastic bottles',
            'Food waste',
            'Scrap metal'
        ];
        const cleanOption = (s)=>s.replace(/[^\w\s\-]/g, '').trim();
        if (examplesMatch) {
            const listText = examplesMatch[1];
            const items = listText.split(/,| and | & /i).map((x)=>cleanOption(x)).filter(Boolean);
            if (items.length >= 2) {
                const questions = [];
                for(let i = 0; i < Math.min(3, items.length); i++){
                    const correct = items[i];
                    const others = items.filter((_, idx)=>idx !== i);
                    const options = [
                        correct,
                        ...others.slice(0, 3)
                    ];
                    while(options.length < 4)options.push(commonDistractors[(options.length - others.length) % commonDistractors.length]);
                    const opts = options.slice(0, 4);
                    questions.push({
                        id: `q${i + 1}`,
                        question: `Which of the following is mentioned as an example in the text about ${title}?`,
                        options: opts,
                        correctIndex: 0,
                        explanation: `${correct} is explicitly mentioned in the text.`
                    });
                }
                return questions;
            }
        }
        const sentences = content.split(/[\.\n]/).map((s)=>s.trim()).filter(Boolean);
        const questions = [];
        if (sentences.length > 0) {
            const keywordSent = sentences.find((s)=>/recycl|prevent|recover|contaminat|include|example|such as/i.test(s)) || sentences[0];
            const truncated = keywordSent.replace(/[^\w\s]/g, '').slice(0, 60) + '...';
            questions.push({
                id: 'q1',
                question: `According to the text, what is one key point about ${title.toLowerCase()}?`,
                options: [
                    truncated,
                    ...commonDistractors.slice(0, 3)
                ],
                correctIndex: 0,
                explanation: `The text states: "${keywordSent.trim()}".`
            });
        }
        if (questions.length === 0) {
            return [
                {
                    id: 'q1',
                    question: `Which statement best describes ${title.toLowerCase()}?`,
                    options: [
                        'Option A',
                        'Option B',
                        'Option C',
                        'Option D'
                    ],
                    correctIndex: 1,
                    explanation: 'Because B references the core idea.'
                }
            ];
        }
        return questions;
    };
    if (!API_KEY) {
        // Return a safe mock for local development
        const questions = [
            {
                id: 'q1',
                question: `Which statement best describes ${moduleTitle.toLowerCase()}?`,
                options: [
                    'Option A',
                    'Option B',
                    'Option C',
                    'Option D'
                ],
                correctIndex: 1,
                explanation: 'Because B references the core idea.'
            },
            {
                id: 'q2',
                question: `What is a recommended action related to ${moduleTitle.toLowerCase()}?`,
                options: [
                    'Action A',
                    'Action B',
                    'Action C',
                    'Action D'
                ],
                correctIndex: 2,
                explanation: 'C is recommended because...'
            },
            {
                id: 'q3',
                question: `Which outcome results from following ${moduleTitle.toLowerCase()}?`,
                options: [
                    'Outcome A',
                    'Outcome B',
                    'Outcome C',
                    'Outcome D'
                ],
                correctIndex: 0,
                explanation: 'A is correct because...'
            }
        ];
        try {
            cacheSet(cacheKey, {
                questions
            });
        } catch (e) {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            questions,
            source: 'mock'
        });
    }
    // If developer explicitly forces mock mode, return a safe mock even when an API key exists.
    // Use a small local generator to produce slightly more meaningful quizzes from the module content.
    if (forceMock) {
        const generateLocalFromContent = (title, content)=>{
            if (!content || content.trim().length === 0) {
                return [
                    {
                        id: 'q1',
                        question: `Which statement best describes ${title.toLowerCase()}?`,
                        options: [
                            'Option A',
                            'Option B',
                            'Option C',
                            'Option D'
                        ],
                        correctIndex: 1,
                        explanation: 'Because B references the core idea.'
                    }
                ];
            }
            // Try to extract example lists from phrases like "such as phones, laptops, and batteries" or "includes X, Y and Z"
            const examplesMatch = content.match(/(?:such as|includes|including)\s*([^\.\n]+)/i);
            const commonDistractors = [
                'Paper documents',
                'Plastic bottles',
                'Food waste',
                'Scrap metal'
            ];
            const cleanOption = (s)=>s.replace(/[^\w\s\-]/g, '').trim();
            if (examplesMatch) {
                const listText = examplesMatch[1];
                const items = listText.split(/,| and | & /i).map((x)=>cleanOption(x)).filter(Boolean);
                if (items.length >= 2) {
                    const questions = [];
                    for(let i = 0; i < Math.min(3, items.length); i++){
                        const correct = items[i];
                        const others = items.filter((_, idx)=>idx !== i);
                        const options = [
                            correct,
                            ...others.slice(0, 3)
                        ];
                        while(options.length < 4)options.push(commonDistractors[(options.length - others.length) % commonDistractors.length]);
                        const opts = options.slice(0, 4);
                        questions.push({
                            id: `q${i + 1}`,
                            question: `Which of the following is mentioned as an example in the text about ${title}?`,
                            options: opts,
                            correctIndex: 0,
                            explanation: `${correct} is explicitly mentioned in the text.`
                        });
                    }
                    return questions;
                }
            }
            // Fallback: craft a question from a key sentence
            const sentences = content.split(/[\.\n]/).map((s)=>s.trim()).filter(Boolean);
            const questions = [];
            if (sentences.length > 0) {
                const keywordSent = sentences.find((s)=>/recycl|prevent|recover|contaminat|include|example|such as/i.test(s)) || sentences[0];
                const truncated = keywordSent.replace(/[^\w\s]/g, '').slice(0, 60) + '...';
                questions.push({
                    id: 'q1',
                    question: `According to the text, what is one key point about ${title.toLowerCase()}?`,
                    options: [
                        truncated,
                        ...commonDistractors.slice(0, 3)
                    ],
                    correctIndex: 0,
                    explanation: `The text states: "${keywordSent.trim()}".`
                });
            }
            if (questions.length === 0) {
                return [
                    {
                        id: 'q1',
                        question: `Which statement best describes ${title.toLowerCase()}?`,
                        options: [
                            'Option A',
                            'Option B',
                            'Option C',
                            'Option D'
                        ],
                        correctIndex: 1,
                        explanation: 'Because B references the core idea.'
                    }
                ];
            }
            return questions;
        };
        const questions = generateLocalFromContent(moduleTitle, moduleContent);
        try {
            cacheSet(cacheKey, {
                questions
            });
        } catch (e) {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            questions,
            source: 'mock_forced_local'
        });
    }
    const prompt = `You are an educational assistant. Based on the following module text, generate 3 multiple-choice questions. Each question should have exactly 4 answer options. For each question include a short explanation and mark the correct option index (0-based). Respond ONLY with a JSON object in this exact shape: {"questions": [{"id":"q1","question":"...","options":[...],"correctIndex":0,"explanation":"..."}, ...]}. Module title: ${moduleTitle}\nModule content:\n${moduleContent}`;
    try {
        const text = await callAI(prompt, API_KEY, MODEL);
        if ("TURBOPACK compile-time truthy", 1) console.log('[generate-quiz][quiz] AI raw output:', text);
        const parsed = tryParseJson(text);
        if (parsed && Array.isArray(parsed.questions)) {
            // Basic validation: ensure structure and types
            const questions = parsed.questions.slice(0, 10).map((q, idx)=>({
                    id: q.id || `q${idx + 1}`,
                    question: String(q.question || '').trim(),
                    options: Array.isArray(q.options) ? q.options.map(String) : [],
                    correctIndex: Number.isFinite(q.correctIndex) ? q.correctIndex : 0,
                    explanation: q.explanation || ''
                }));
            try {
                cacheSet(cacheKey, {
                    questions
                });
            } catch (e) {}
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                questions,
                source: 'ai'
            });
        }
        // If parsing failed, return a fallback empty set so client shows friendly message
        console.warn('AI returned unexpected format for quiz', text);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            questions: [],
            source: 'ai_unexpected'
        });
    } catch (err) {
        console.error('quiz generation failed', err);
        const errMsg = err && err.message ? err.message : String(err);
        // If provider indicates quota/insufficient tokens or rate limit, fallback to local mock
        if (/429|quota|insufficient_quota|Too Many Requests/i.test(errMsg)) {
            try {
                const questions = generateLocalFromContent(moduleTitle, moduleContent);
                try {
                    cacheSet(cacheKey, {
                        questions
                    });
                } catch (e) {}
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    questions,
                    source: 'fallback_quota'
                });
            } catch (e) {
                console.error('fallback generation also failed', e);
            }
        }
        // When debug is allowed, surface the error message in the HTTP response
        if ("TURBOPACK compile-time truthy", 1) {
            const errorMessage = errMsg;
            const apiPreview = API_KEY ? `${String(API_KEY).slice(0, 12)}...` : 'none';
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                questions: [],
                source: 'error',
                debug: {
                    error: errorMessage,
                    apiKeyPreview: apiPreview
                }
            }, {
                status: 500
            });
        }
        //TURBOPACK unreachable
        ;
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9d0290ff._.js.map