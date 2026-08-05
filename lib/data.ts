export type OwnerUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const ownerEmail = process.env.OWNER_EMAIL ?? 'owner@example.com';
const ownerPasswordHash =
  process.env.OWNER_PASSWORD_HASH ??
  '$2b$10$RBrH5CRre5Mwgh0X/6TBge2.34qxLiXHS6YoIVxiCwtKaPq3zTtvO';

export async function getUserByEmail(email: string): Promise<OwnerUser | null> {
  if (email !== ownerEmail) {
    return null;
  }

  return {
    id: 'owner',
    name: 'Portfolio Owner',
    email,
    passwordHash: ownerPasswordHash,
  };
}
