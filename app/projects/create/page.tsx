// app/projects/create/page.tsx
import { createProject, type State } from '@/app/lib/actions';

async function createProjectFormAction(formData: FormData): Promise<void> {
  await createProject({} as State, formData);
}

export default function Page() {
  return (
    <form action={createProjectFormAction}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" required />

      <label htmlFor="technologies">Technologies (comma-separated)</label>
      <input id="technologies" name="technologies" required />

      <button type="submit">Save Project</button>
    </form>
  );
}