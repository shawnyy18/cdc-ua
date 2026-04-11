export const metadata = {
  title: 'Admin SQL Editor (Removed)'
}

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin SQL Editor — removed</h1>

      <p className="mb-4 text-sm text-gray-600">
        The in-app SQL editor was removed. To run SQL directly, use the Supabase SQL editor or
        the supabase CLI. If you need the previous helper scripts, they are available in the
        repository under <code>supabase/sql/</code> (if present).
      </p>
    </div>
  )
}
