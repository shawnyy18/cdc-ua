# EcoKonek — E-Waste Management System

A full-stack web application for managing electronic waste (e-waste) donations, device condition assessments, hazardous material submissions, and community engagement within the Clark Development Corporation (CDC).

## Tech Stack

- **Frontend:** Next.js 16, React 18, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI Integration:** Google Gemini API (chatbot, quiz generation)
- **Real-time:** Socket.IO (live notifications and community updates)

## Key Features

- **E-Waste Donation Flow** — Users submit devices for donation with condition assessments and accountability forms
- **Device Condition Assessment** — Guided evaluation of device status before donation
- **Hazardous Material Submission** — Separate workflow for hazardous e-waste items
- **Admin Dashboard** — CDC inventory management, department leaderboards, user management, and SQL editor
- **User Dashboard** — Personal donation history, points tracking, and statistics
- **Community Feed** — Social features with posts, likes, comments, follows, and notifications
- **AI Chatbot** — Gemini-powered assistant for e-waste education and guidance
- **AI Quiz Generation** — Auto-generated quizzes for e-waste awareness
- **Authentication** — Supabase Auth with Google OAuth, email/password, and password recovery
- **Department-Scoped Administration** — Role-based access by organizational department

## Project Structure

```
├── app/                    # Next.js App Router pages and API routes
│   ├── admin/              # Admin panel (CDC inventory, leaderboard, SQL editor)
│   ├── api/                # API routes (chatbot, quiz, stats, admin, health)
│   ├── auth/               # Auth callback handler
│   ├── dashboard/          # User dashboard
│   ├── device-condition/   # Device condition assessment flow
│   ├── donate/             # Donation submission flow
│   ├── hazardous-submission/ # Hazardous item submission flow
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── profile/            # User profile
│   ├── forgot-password/    # Password recovery
│   ├── reset-password/     # Password reset
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── Admin/              # Admin-specific components (CDCDashboard, Leaderboard)
│   ├── Navbar.tsx          # Navigation bar
│   ├── ProfileDropdown.tsx # Profile dropdown menu
│   ├── AuthChecker.tsx     # Auth state checker
│   └── ModuleCard.tsx      # Dashboard module cards
├── lib/                    # Shared utilities and services
│   ├── supabase.ts         # Supabase client initialization
│   ├── auth.ts             # Auth helper functions
│   ├── adminAuth.ts        # Admin auth utilities
│   ├── storage.ts          # File storage utilities
│   ├── seedQuizzes.ts      # Quiz seed data
│   └── searchUsers.ts      # User search utility
├── supabase/               # Database schema and migrations
│   ├── migrations/         # Numbered SQL migrations (01–40)
│   ├── setup/              # Initial schema, RLS policies, functions/triggers
│   ├── functions/          # Supabase Edge Functions
│   └── sql/                # SQL optimization scripts
├── pages/api/              # Pages Router API routes (Socket.IO)
├── scripts/                # Utility scripts
├── public/                 # Static assets (images)
└── middleware.ts           # Next.js middleware (auth redirect)
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase URL, anon key, and optionally a Gemini API key. See `.env.example` for all available configuration options.

3. **Set up the database:**
   Run the SQL files in `supabase/setup/` in order (01 → 02 → 03) against your Supabase project, then apply migrations from `supabase/migrations/` sequentially.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

Proprietary — All rights reserved.
