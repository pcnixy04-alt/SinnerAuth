# SinnerAuth

Enterprise authentication platform built for developers who demand performance, security, and control.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **Animation:** Framer Motion
- **Icons:** Lucide Icons
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth + JWT
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier)
- PostgreSQL database

### Environment Variables

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```

### Installation

```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

### Database Setup

1. Create a Supabase project
2. Run the migration file in `supabase/migrations/001_initial_schema.sql`
3. Update your environment variables

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   ├── docs/            # Documentation pages
│   └── api/             # API routes
├── components/
│   ├── ui/              # UI components
│   ├── layout/          # Layout components
│   ├── landing/         # Landing page components
│   └── dashboard/       # Dashboard components
├── lib/                 # Utilities and libraries
├── hooks/               # Custom hooks
└── types/               # TypeScript types
```

## Features

- **Authentication:** Email/password authentication with Supabase
- **Dashboard:** Real-time analytics, user management, license management
- **Documentation:** Complete API docs with search
- **Security:** HWID fingerprinting, session management, audit logging
- **Pricing:** Tiered pricing with feature comparison
- **Responsive:** Fully responsive across all devices
- **Animations:** Smooth Framer Motion animations
- **SEO:** Meta tags, Open Graph, Twitter Cards, sitemap

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sinnerauth/sinnerauth)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the contents of `supabase/migrations/001_initial_schema.sql`
4. Copy your project URL and anon key to `.env.local`

## Lighthouse Scores

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## License

MIT
