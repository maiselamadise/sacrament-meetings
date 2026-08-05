// app/login/page.tsx
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/80">
        <div className="mb-6">
          <p className="eyebrow">Leader login</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Sign in to manage meetings</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your credentials to access protected dashboard pages.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}