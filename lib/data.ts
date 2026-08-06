export type OwnerUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const ownerEmail = process.env.OWNER_EMAIL ?? 'owner@example.com';
const DEFAULT_OWNER_PASSWORD_HASH = '$2b$10$eRe6bOBJZh56WNGYeWel4exjrDG2.CFNHSAYcFB6NQlBNwnnEzk.6';

const rawOwnerPasswordHash = process.env.OWNER_PASSWORD_HASH_BASE64
  ? Buffer.from(process.env.OWNER_PASSWORD_HASH_BASE64, 'base64').toString('utf8')
  : process.env.OWNER_PASSWORD_HASH ??
    DEFAULT_OWNER_PASSWORD_HASH;

const ownerPasswordHash = rawOwnerPasswordHash.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();

export async function getUserByEmail(email: string): Promise<OwnerUser | null> {
  if (email !== ownerEmail) {
    return null;
  }

    // DEBUG: Log env and resolved owner hash
  try {
    console.log('[data][debug] OWNER_PASSWORD_HASH env len:', String(process.env.OWNER_PASSWORD_HASH ?? '').length);
    console.log('[data][debug] OWNER_PASSWORD_HASH_BASE64 env len:', String(process.env.OWNER_PASSWORD_HASH_BASE64 ?? '').length);
    console.log('[data][debug] ownerPasswordHash len:', String(ownerPasswordHash).length);
  } catch (e: unknown) {
    const message =
      typeof e === 'object' && e !== null && 'message' in e && typeof (e as { message: unknown }).message === 'string'
        ? (e as { message: string }).message
        : String(e);
    console.log('[data][debug] ownerPasswordHash inspect error', message);
  }

  return {
    id: 'owner',
    name: 'Portfolio Owner',
    email,
    passwordHash: ownerPasswordHash,
  };
}
