// app/projects/create/page.tsx
import CreateProjectForm from './create-project-form';

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Create project</h1>
      <p className="mt-2 text-slate-600">Add a new project with clear validation feedback.</p>
      <div className="mt-6">
        <CreateProjectForm />
      </div>
    </main>
  );
}