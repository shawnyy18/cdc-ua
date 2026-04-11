# Development & Deployment: Learn Quiz AI Integration

This project includes an AI-backed quiz generator used by the Learn feature. This document explains required environment variables, how to run locally, test the feature, and deploy with environment secrets.

## Required environment variables

- `OPENAI_API_KEY` (preferred) — API key for OpenAI-compatible endpoints (used by default).
- `OPENAI_MODEL` (optional) — model to use, e.g. `gpt-4o-mini` or `gpt-4o`. Defaults to `gpt-4o-mini`.
- `GEMINI_API_KEY` / `GOOGLE_GEMINI_API_KEY` (optional) — alternative provider; the server also checks these if OPENAI_API_KEY is not set.
- `GEMINI_MODEL` (optional) — model name for Gemini if used.

Notes:

- If none of these are set, the server will return safe mocked quiz questions for local development.
- AI calls may incur costs; set usage limits or test with mocked responses when iterating.

## Local development

1. Install dependencies

```bash
npm install
```

2. Create a `.env.local` in the project root (example):

```env
# For real AI-backed generation
OPENAI_API_KEY=sk_your_openai_key_here
OPENAI_MODEL=gpt-4o-mini

# Optional: Gemini
# GEMINI_API_KEY=ya29.your_google_key_here
# GEMINI_MODEL=gemini-mini
```

3. Start the dev server

```bash
npm run dev
```

4. Open your browser at `http://localhost:3000/learn` and click a module. If you provided an API key, AI-generated questions should appear. If not, you'll see mocked/sample questions with the option to Retry.

## Manual smoke test checklist

- Open `/learn`, pick a module.
- Confirm a modal opens and at least 1 question is shown.
- Submit an answer — confirm feedback appears (AI when key present, fallback text otherwise).
- If generation fails, click Retry to re-run generation.

## Deployment (Vercel or similar)

1. Push your branch to the repository.
2. In Vercel (or your host), set environment variables (OPENAI_API_KEY, OPENAI_MODEL) in the project settings under Environment Variables.
3. Deploy to Production.

Important considerations:

- Keep your API keys secret and use platform-provided secret storage (Vercel environment variables, AWS Secrets Manager, etc.).
- Monitor usage and cost — consider restricting the model to cheaper options or adding server-side rate limits.

## Optional: switching providers

Current server code targets an OpenAI-compatible chat endpoint (`/v1/chat/completions`). If you prefer Google Gemini REST specifics, the code can be adapted to call Gemini's REST API and pass its auth and model names. Please ask if you'd like that adapter added.

## Troubleshooting

- If you see `No quiz questions available.` and the Retry button fails, check the server logs for AI provider errors and verify your `OPENAI_API_KEY`.
- To test without incurring cost, remove or unset the API key — the route will return local mock questions.

## Security & Rate-limiting (recommended)

- Add server-side rate limiting (IP or user-based) on `/api/generate-quiz` to avoid abuse and unexpected charges.
- Consider caching generated quizzes per `moduleId` for a short TTL to reduce repeated AI calls for the same module.

### What I implemented for this repo

- A simple in-memory cache (5 minute TTL) is used to store generated quizzes per `moduleId` or per module content. This reduces repeated AI calls for the same module while developing.
- A basic per-IP in-memory rate limiter (20 requests per minute) is applied to `/api/generate-quiz` to reduce accidental or malicious overuse.

These primitives are intentionally simple and live only in-process. They work well for local development and small deployments, but have limitations in production (they do not share state across instances or persist across restarts).

### Production recommendations

- Replace the in-memory cache and rate limiter with a shared solution like Redis. Use a short TTL (e.g., 300s) for quiz caching and a leaky-bucket or sliding-window algorithm for rate limiting.
- Monitor AI API usage and set alerts; consider middling costs with heavier models and tune `OPENAI_MODEL` to a cheaper model if necessary.

---

If you'd like, I can add server-side caching (in-memory or Redis) and a basic rate-limiter middleware as a follow-up.
