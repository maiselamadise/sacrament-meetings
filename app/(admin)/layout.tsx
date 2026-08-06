export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section aria-label="Administration">
      <div className="mb-8 border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Leader tools — sign in to manage meetings.
      </div>
      {children}
    </section>
  );
}
