interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  return <h1 className="text-3xl font-bold text-slate-900">Edit Meeting {id} — Coming in Week 04</h1>;
}
