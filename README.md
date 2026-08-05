This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Demo credentials

For local development and testing there is a seeded demo account you can use to sign in to the protected admin/dashboard pages:

- Email: owner@example.com

The demo account password is NOT stored in the repository. To run locally, copy `.env.example` to `.env.local` and set `OWNER_PASSWORD_HASH` to a bcrypt hash of your chosen password. For example:

```bash
cp .env.example .env.local
node -e "console.log(require('bcryptjs').hashSync('Password123!', 10))"
# paste the printed hash into .env.local as OWNER_PASSWORD_HASH
```

Do NOT commit your real `.env.local` file — it should contain secrets and is intended to remain local. Use `.env.example` as a template for collaborators.
