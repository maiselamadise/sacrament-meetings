'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';

type ProjectFormValues = {
  title?: string;
  description?: string;
  technologies?: string;
  yearCompleted?: string | number;
};

type CreateProjectState = State & {
  values: ProjectFormValues;
};

const initialState: CreateProjectState = {
  message: null,
  errors: {},
  values: {},
};

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState<
    CreateProjectState,
    FormData
  >(
    createProject as unknown as (
      state: CreateProjectState,
      formData: FormData,
    ) => Promise<CreateProjectState>,
    initialState,
  );

  const currentState = state ?? initialState;

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Project Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={state.values?.title}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          aria-describedby="title-error"
        />

        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={state.values?.description}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          aria-describedby="description-error"
        />

        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label
          htmlFor="technologies"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Technologies (comma separated)
        </label>

        <input
          id="technologies"
          name="technologies"
          type="text"
          defaultValue={state.values?.technologies}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          aria-describedby="technologies-error"
        />

        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <label
          htmlFor="yearCompleted"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Year Completed
        </label>

        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min="2000"
          max="2099"
          defaultValue={state.values?.yearCompleted}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          aria-describedby="yearCompleted-error"
        />

        <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Save Project'}
      </button>
    </form>
  );
}