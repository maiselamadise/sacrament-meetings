// app/projects/[id]/edit/page.tsx
import { updateProject } from '@/app/lib/actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // Fetch project by id and render the edit form...
  return <form action={updateProject.bind(null, id)}>...</form>;
}