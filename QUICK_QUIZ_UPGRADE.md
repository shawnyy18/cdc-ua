# Quiz Upgrade: Free AI Generation

We have upgraded the quiz generation system to support Google's Gemini API, which offers a generous free tier.

## Changes Made

1.  **Updated `app/api/generate-quiz/route.ts`**:
    - Added support for Google Gemini API via REST endpoint.
    - Added logic to detect `GOOGLE_AI_API_KEY` (which you already have configured).
    - Set default model to `gemini-1.5-flash` for fast, free generation.

## How to Use Free Tier

Your project is already set up with `GOOGLE_AI_API_KEY` in `.env.local`.

- **If you want to use the free Gemini tier:**

  - Ensure `OPENAI_API_KEY` is removed or commented out in your `.env.local` file.
  - The system will automatically fall back to `GOOGLE_AI_API_KEY` and use the `gemini-1.5-flash` model.

- **If you want to keep using OpenAI:**
  - Keep `OPENAI_API_KEY` in your `.env.local`. The system prioritizes OpenAI if the key is present.

## Verification

1.  Go to the **Learn** page.
2.  Click on a module (e.g., "E-Waste Facts").
3.  The quiz modal will open.
4.  If seeded questions exist (defined in `lib/seedQuizzes.ts`), they will be shown first.
5.  To test AI generation, you can temporarily comment out the seeded questions in `lib/seedQuizzes.ts` or add a new module without seeded questions.
