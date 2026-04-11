# EcoKonek Environment Configuration Guide

Complete guide to configuring environment variables for development and production.

## 📋 Environment Files

Your project needs these environment files:

### `.env.local` (Development - Not committed to Git)

Used for local development with real credentials.

### `.env.example` (Template - Committed to Git)

Template file showing required variables without sensitive values.

### `.env.production` (Production - Not committed to Git)

Used in production deployments (Vercel, Netlify, etc.)

## 🔑 Required Environment Variables

### 1. Supabase Configuration

```bash
# Your Supabase project URL
# Found in: Supabase Dashboard > Settings > API > Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anonymous/public key
# Found in: Supabase Dashboard > Settings > API > Project API keys > anon public
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# (Optional) Supabase service role key - NEVER expose to frontend!
# Used for admin operations only
# Found in: Supabase Dashboard > Settings > API > Project API keys > service_role
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Google Gemini AI (Optional - For Chatbot)

```bash
# Google Gemini API key for chatbot functionality
# Get it from: https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
```

### 3. Next.js Configuration (Optional)

```bash
# Base URL for your application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node environment
NODE_ENV=development
```

## 📝 Step-by-Step Setup

### Step 1: Get Supabase Credentials

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL**: Your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: Your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: Your `SUPABASE_SERVICE_ROLE_KEY` (optional)

### Step 2: Create `.env.local` File

1. In your project root, create `.env.local`:

   ```bash
   touch .env.local
   ```

2. Add your credentials:

   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Optional: Google Gemini
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
   ```

3. Save the file

### Step 3: Verify `.gitignore` Includes `.env.local`

Check that your `.gitignore` contains:

```
# Environment variables
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Step 4: Create `.env.example` Template

Create `.env.example` for other developers:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For admin operations (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Google Gemini AI for chatbot
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Test Configuration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Check console for any environment variable errors

3. Try logging in - if successful, configuration is correct!

## 🌍 Production Deployment

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Click **Add**
4. Repeat for each variable
5. Redeploy your application

### Netlify Deployment

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add each variable name and value
4. Save and trigger a new deploy

### Railway / Render

Similar process - add environment variables in their respective dashboards.

## 🔒 Security Best Practices

### ✅ DO:

- Store sensitive keys in `.env.local` (never commit)
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only
- Rotate keys if accidentally exposed
- Use different keys for development and production
- Set up environment variables in your hosting platform

### ❌ DON'T:

- Commit `.env.local` to Git
- Expose service role keys to the frontend
- Hardcode credentials in source code
- Share production keys in team chats
- Use production keys in development
- Store keys in client-side JavaScript

## 🔍 Variable Usage Examples

### Using in Server Components (App Router)

```typescript
// app/api/admin/route.ts
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-side only!
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
```

### Using in Client Components

```typescript
// components/MyComponent.tsx
"use client";
import { supabase } from "@/lib/supabase";

// Supabase client automatically uses NEXT_PUBLIC_* variables
const { data, error } = await supabase.from("users").select();
```

### Using in API Routes

```typescript
// app/api/data/route.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

## 🐛 Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"

**Solution**: Run `npm install`

### Issue: "Invalid API key"

**Solution**:

- Verify you copied the complete key (no spaces)
- Check you're using the correct key for development/production
- Keys should start with `eyJ...`

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Solution**:

- Ensure `.env.local` exists in project root
- Restart development server after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: "CORS errors" or "Failed to fetch"

**Solution**:

- Verify Supabase URL is correct
- Check authentication redirect URLs in Supabase dashboard
- Ensure you're using `NEXT_PUBLIC_` prefix for client-side variables

### Issue: Storage uploads fail

**Solution**:

- Verify storage buckets exist in Supabase
- Check storage policies are configured
- Ensure file size limits aren't exceeded

## 📚 Environment Variable Reference

| Variable                        | Required    | Where Used  | Scope  | Description            |
| ------------------------------- | ----------- | ----------- | ------ | ---------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅ Yes      | Everywhere  | Public | Supabase project URL   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes      | Everywhere  | Public | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY`     | ⚠️ Optional | Server only | Secret | Admin operations       |
| `NEXT_PUBLIC_GEMINI_API_KEY`    | ❌ Optional | Client      | Public | Chatbot AI             |
| `NEXT_PUBLIC_APP_URL`           | ❌ Optional | Client      | Public | App base URL           |

## 🚀 Quick Setup Commands

```bash
# Clone repository
git clone <your-repo-url>
cd ecokonek

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit with your credentials
nano .env.local
# or
code .env.local

# Start development server
npm run dev
```

## 📖 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase API Keys](https://supabase.com/docs/guides/api/api-keys)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Remember**: Never commit `.env.local` or expose service role keys!
