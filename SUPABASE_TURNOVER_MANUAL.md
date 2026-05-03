# EcoKonek Backend Turnover Manual (Supabase)

> [!NOTE]
> This manual is intended for system turnover and serves as a foundational guide for the backend operations of the EcoKonek project. It can be enhanced or expanded upon as the project evolves.

## 1. Introduction
The EcoKonek backend is powered by **Supabase**, an open-source Firebase alternative based on PostgreSQL. It handles authentication, database storage, file storage, and real-time updates.

This guide provides instructions on how to set up the backend, interact with the Supabase interface, and perform routine administrative tasks.

---

## 2. Initial Setup Process

To set up a fresh Supabase environment for this project:

### Step 2.1: Create a Project
1. Log in to [Supabase](https://supabase.com/).
2. Click **New Project** and select your organization.
3. Enter the project name (e.g., `EcoKonek Production`).
4. Generate a strong Database Password and save it securely.
5. Select the region closest to your user base.
6. Click **Create new project** and wait for the database to provision.

### Step 2.2: Retrieve API Keys
1. In the Supabase dashboard, navigate to **Project Settings** (gear icon) > **API**.
2. Locate the **Project URL**, **anon public key**, and **service_role key**.
3. Update your local `.env.local` or production environment variables with these values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # NEVER expose this to the frontend
   ```

> [!WARNING]
> The `service_role` key grants full administrative access bypassing Row Level Security (RLS). Never expose it in public client-side code.

---

## 3. Database Schema & Migrations

The database structure is managed via SQL migrations. 

### Running Migrations via the Supabase Interface
1. Open the Supabase dashboard and go to the **SQL Editor** on the left navigation bar.
2. Click **New Query**.
3. You can copy the contents from your project's `supabase/setup/` or `supabase/migrations/` folders and paste them into the editor.
4. Click **Run** to execute the scripts and build your tables, functions, and RLS policies.

### Key Tables
- **`users`**: Extended profile data for users.
- **`donations`**: Records of electronic devices donated.
- **`drop_off_centers`** / **`barangays`**: Location data for physical drops.
- **`community_posts`**: Posts made in the community feed.

---

## 4. Authentication Setup

Supabase handles user sign-ups and logins automatically.

### Configuring Providers
1. Go to **Authentication** > **Providers** in the dashboard.
2. **Email**: Enabled by default. You can customize email templates in the **Email Templates** tab.
3. **OAuth (e.g., Google)**: Enable the Google provider, and input your Client ID and Client Secret generated from the Google Cloud Console.

### URL Configuration
1. Go to **Authentication** > **URL Configuration**.
2. Set your **Site URL** to your production domain (e.g., `https://www.ecokonek.com`).
3. Under **Redirect URLs**, add the callback routes for successful logins:
   - `https://www.ecokonek.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for local development)

---

## 5. Storage Configuration

Storage buckets are required for profile pictures, post images, and hazardous waste submissions.

### Creating Buckets
1. Navigate to **Storage** on the left menu.
2. Click **New Bucket**.
3. Recommended buckets to create:
   - `profile-images` (Public)
   - `post-images` (Public)
   - `hazardous-waste` (Private or specific RLS)
4. Ensure you set up **Storage Policies** under the configuration for each bucket to restrict who can insert, update, or select images.

---

## 6. Managing Data via the Interface

The Supabase **Table Editor** is your primary tool for managing data manually without writing SQL.

1. Go to the **Table Editor** on the left menu.
2. Select a table (e.g., `users`).
3. **To view data**: Scroll through the rows or use the filter/sort buttons at the top.
4. **To add data**: Click **Insert row** to add a new record manually.
5. **To edit data**: Click on any cell to modify its content, or click the edit icon on the row.
6. **To delete data**: Select the checkbox next to a row and click the **Delete** button at the top.

> [!TIP]
> Always be careful when deleting data directly from the Table Editor, as it may cascade and delete related records (e.g., deleting a user might delete their posts and donations).

---

## 7. Routine Maintenance & Troubleshooting

### Viewing Logs
If you encounter errors on the backend (e.g., API requests failing or Database errors):
- Go to **Logs** on the left menu.
- Use **Postgres Logs** to see database-level errors (like failing triggers or constraints).
- Use **API Edge Logs** to see errors with requests coming from the frontend.

### Row Level Security (RLS)
If data isn't showing up on the frontend, it's usually an RLS issue.
- Go to **Authentication** > **Policies** to review the RLS rules for your tables.
- Ensure there is a policy allowing `SELECT` for authenticated (or anonymous) users where appropriate.

### Backups
- Supabase automatically takes daily backups for Pro tier projects.
- You can manually trigger logical backups or view backup history in **Project Settings** > **Database** > **Backups**.

---
*End of Document. Feel free to enhance and expand upon these guidelines as the project grows.*
