'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addMeeting, deleteMeeting as deleteMeetingFromDb, updateMeeting as updateMeetingInDb } from '@/lib/meetings-db';

export type State = {
  message?: string | null;
  errors?: Record<string, string[]>;
};

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.string().min(1, 'Meeting type is required.'),
  presiding: z.string().min(1, 'Presiding leader is required.'),
  conducting: z.string().min(1, 'Conducting leader is required.'),
  openingPrayer: z.string().min(1, 'Opening prayer is required.'),
  closingPrayer: z.string().min(1, 'Closing prayer is required.'),
  openingHymnNumber: z.coerce.number().int().positive('Opening hymn number must be a positive number.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Sacrament hymn number must be a positive number.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Closing hymn number must be a positive number.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
});

function toFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

function parseAnnouncements(value: FormDataEntryValue | null) {
  return value
    ? value
        .toString()
        .split(/\n|,/)
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
  });

  if (!validatedFields.success) {
    return {
      errors: toFieldErrors(validatedFields.error),
      message: 'Please correct the highlighted fields.',
    };
  }

  try {
    await addMeeting({
      date: validatedFields.data.date,
      meetingType: validatedFields.data.meetingType as 'regular' | 'stake' | 'general' | 'special' | 'testimony',
      presiding: validatedFields.data.presiding,
      conducting: validatedFields.data.conducting,
      announcements: parseAnnouncements(formData.get('announcements')),
      openingHymn: {
        number: validatedFields.data.openingHymnNumber,
        title: validatedFields.data.openingHymnTitle,
      },
      openingPrayer: validatedFields.data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: {
        number: validatedFields.data.sacramentHymnNumber,
        title: validatedFields.data.sacramentHymnTitle,
      },
      speakers: [],
      closingHymn: {
        number: validatedFields.data.closingHymnNumber,
        title: validatedFields.data.closingHymnTitle,
      },
      closingPrayer: validatedFields.data.closingPrayer,
    });

    revalidatePath('/meetings');
  } catch (error) {
    console.error(error);
    return {
      message: 'Unable to save the meeting right now.',
    };
  }

  return { message: 'Meeting created successfully.' };
}

export async function updateMeeting(prevState: State, id: string, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
  });

  if (!validatedFields.success) {
    return {
      errors: toFieldErrors(validatedFields.error),
      message: 'Please correct the highlighted fields.',
    };
  }

  try {
    await updateMeetingInDb(Number(id), {
      date: validatedFields.data.date,
      meetingType: validatedFields.data.meetingType as 'regular' | 'stake' | 'general' | 'special' | 'testimony',
      presiding: validatedFields.data.presiding,
      conducting: validatedFields.data.conducting,
      announcements: parseAnnouncements(formData.get('announcements')),
      openingHymn: {
        number: validatedFields.data.openingHymnNumber,
        title: validatedFields.data.openingHymnTitle,
      },
      openingPrayer: validatedFields.data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: {
        number: validatedFields.data.sacramentHymnNumber,
        title: validatedFields.data.sacramentHymnTitle,
      },
      speakers: [],
      closingHymn: {
        number: validatedFields.data.closingHymnNumber,
        title: validatedFields.data.closingHymnTitle,
      },
      closingPrayer: validatedFields.data.closingPrayer,
    });

    revalidatePath('/meetings');
  } catch (error) {
    console.error(error);
    return {
      message: 'Unable to update the meeting right now.',
    };
  }

  return { message: 'Meeting updated successfully.' };
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const meetingId = Number(formData.get('meetingId'));

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    return;
  }

  try {
    await deleteMeetingFromDb(meetingId);
    revalidatePath('/meetings');
  } catch (error) {
    console.error(error);
  }
}

const ProjectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  technologies: z.string().min(2, 'Add at least one technology.'),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(new Date().getFullYear(), 'Year cannot be greater than the current year.'),
});

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
  });

  if (!validatedFields.success) {
    return {
      errors: toFieldErrors(validatedFields.error),
      message: 'Please correct the highlighted fields.',
    };
  }

  try {
    await sql`
      INSERT INTO projects (title, description, technologies, year_completed)
      VALUES (${validatedFields.data.title}, ${validatedFields.data.description}, ${validatedFields.data.technologies}, ${validatedFields.data.yearCompleted})
    `;

    revalidatePath('/projects');
  } catch (error) {
    console.error(error);
    return {
      message: 'Unable to save the project right now.',
    };
  }

  return { message: 'Project created successfully.' };

  return { message: null };
}

export async function updateProject(prevState: State, id: string, formData: FormData): Promise<State> {
  return updateMeeting(prevState, id, formData);
}