'use client';

import { useActionState } from 'react';
import { createMeeting, updateMeeting, type State } from '@/app/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type MeetingFormProps = {
  mode: 'create' | 'edit';
  meetingId?: number;
  initialValues?: SacramentMeeting;
};

const initialState: State = {
  message: null,
  errors: {},
};

function ErrorList({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div aria-live="polite" className="mt-1 text-sm text-red-600">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export function MeetingForm({ mode, meetingId, initialValues }: MeetingFormProps) {
  const action =
    mode === 'edit' && meetingId
      ? async (prevState: State, formData: FormData) => updateMeeting(prevState, String(meetingId), formData)
      : createMeeting;

  const [state, formAction, isPending] = useActionState<State, FormData>(action, initialState);

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          {mode === 'edit' ? 'Edit meeting' : 'Create meeting'}
        </h1>
        <p className="text-sm text-slate-600">
          {mode === 'edit'
            ? 'Update the meeting details below and keep the archive accurate.'
            : 'Fill in the meeting details below to add a new sacrament meeting record.'}
        </p>
      </div>

      {state.message ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="date">
            Meeting date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialValues?.date ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="date-error"
            required
          />
          <div id="date-error" aria-live="polite">
            <ErrorList errors={state.errors?.date} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="meetingType">
            Meeting type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={initialValues?.meetingType ?? 'regular'}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="meetingType-error"
            required
          >
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
            <option value="testimony">Testimony</option>
          </select>
          <div id="meetingType-error" aria-live="polite">
            <ErrorList errors={state.errors?.meetingType} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="presiding">
            Presiding leader
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={initialValues?.presiding ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="presiding-error"
            required
          />
          <div id="presiding-error" aria-live="polite">
            <ErrorList errors={state.errors?.presiding} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="conducting">
            Conducting leader
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={initialValues?.conducting ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="conducting-error"
            required
          />
          <div id="conducting-error" aria-live="polite">
            <ErrorList errors={state.errors?.conducting} />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="announcements">
          Announcements
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={initialValues?.announcements?.join('\n') ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          aria-describedby="announcements-error"
        />
        <div id="announcements-error" aria-live="polite">
          <ErrorList errors={state.errors?.announcements} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="openingHymnNumber">
            Opening hymn number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            defaultValue={initialValues?.openingHymn?.number ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="openingHymnNumber-error"
          />
          <div id="openingHymnNumber-error" aria-live="polite">
            <ErrorList errors={state.errors?.openingHymnNumber} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="openingHymnTitle">
            Opening hymn title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={initialValues?.openingHymn?.title ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="openingHymnTitle-error"
          />
          <div id="openingHymnTitle-error" aria-live="polite">
            <ErrorList errors={state.errors?.openingHymnTitle} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="sacramentHymnNumber">
            Sacrament hymn number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            defaultValue={initialValues?.sacramentHymn?.number ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="sacramentHymnNumber-error"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite">
            <ErrorList errors={state.errors?.sacramentHymnNumber} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="sacramentHymnTitle">
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={initialValues?.sacramentHymn?.title ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="sacramentHymnTitle-error"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite">
            <ErrorList errors={state.errors?.sacramentHymnTitle} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="closingHymnNumber">
            Closing hymn number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            defaultValue={initialValues?.closingHymn?.number ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="closingHymnNumber-error"
          />
          <div id="closingHymnNumber-error" aria-live="polite">
            <ErrorList errors={state.errors?.closingHymnNumber} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="closingHymnTitle">
            Closing hymn title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={initialValues?.closingHymn?.title ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="closingHymnTitle-error"
          />
          <div id="closingHymnTitle-error" aria-live="polite">
            <ErrorList errors={state.errors?.closingHymnTitle} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="openingPrayer">
            Opening prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={initialValues?.openingPrayer ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="openingPrayer-error"
            required
          />
          <div id="openingPrayer-error" aria-live="polite">
            <ErrorList errors={state.errors?.openingPrayer} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="closingPrayer">
            Closing prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={initialValues?.closingPrayer ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="closingPrayer-error"
            required
          />
          <div id="closingPrayer-error" aria-live="polite">
            <ErrorList errors={state.errors?.closingPrayer} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-sky-800 px-4 py-2 font-semibold text-white transition hover:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
        >
          {isPending ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create meeting'}
        </button>
      </div>
    </form>
  );
}
