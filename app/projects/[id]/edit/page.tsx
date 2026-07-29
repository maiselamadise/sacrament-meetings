// app/projects/[id]/edit/page.tsx
import { updateProject, type State } from '@/app/lib/actions';

async function updateProjectFormAction(id: string, formData: FormData): Promise<void> {
  await updateProject({} as State, id, formData);
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return <form action={async (formData: FormData) => updateProjectFormAction(id, formData)}>...</form>;
}