# Database Setup Guide

This guide covers setting up and managing the Neon PostgreSQL database for the Aaron Pharrell Personal Website.

## Overview

The project uses:
- **Neon PostgreSQL** for database hosting
- **Drizzle ORM** for database schema and migrations
- **Node.js pg driver** for connections

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Neon account (free tier available at https://neon.tech)

## Neon PostgreSQL Setup

### Step 1: Create a Neon Project

1. Go to [https://neon.tech](https://neon.tech) and sign up/login
2. Click "New Project"
3. Configure your project:
   - **Project name**: aaron-pharrell-portfolio (or similar)
   - **Region**: Choose closest to your location
   - **Postgres version**: 15 or later recommended
4. Click "Create project"

### Step 2: Get Your Connection String

1. Once the project is created, navigate to the "Connection string" tab
2. Copy the full PostgreSQL connection string (looks like):
   ```
   postgresql://[user]:[password]@[host]:5432/[database]?sslmode=require
   ```
3. Save this string securely

### Step 3: Update Environment Variables

1. Open `.env.local` in the project root
2. Replace the placeholder `DATABASE_URL` with your actual Neon connection string:
   ```
   DATABASE_URL=postgresql://your-user:your-password@host.neon.tech:5432/your-database?sslmode=require
   ```
3. Ensure `.env.local` is listed in `.gitignore` (it should be by default)

## Running Migrations

Migrations are pre-defined in `lib/db/schema.ts` using Drizzle ORM.

### Push Schema to Database

To create tables and apply the schema to your Neon database:

```bash
npm run db:push
```

This command:
- Generates SQL from your Drizzle schema
- Creates tables: `projects`, `experience`, `blog_posts`, `contact_messages`, `cv_file`
- Applies migrations without creating migration files (introspection mode)

### Generate Migration Files (Optional)

To generate explicit migration files instead:

```bash
npm run db:migrate
```

This creates migration files in the `drizzle` folder for version control.

## Seeding Initial Data

The project includes seed data for projects and experience entries.

### Run Seed Script

To populate the database with initial data (2 experience entries + 3 projects):

```bash
npm run db:seed
```

The seed script will:
- Insert TraceCorp Solutions (current role) and ISBAT University (education)
- Insert 3 featured projects: EchoTwin, HAIQ Bakery Platform, and AceGuru

**Note**: The seed script is idempotent—running it multiple times will insert duplicate records. To clear data, use SQL directly or delete rows before re-seeding.

## Database Schema

### Tables

#### projects
- `id` (serial, primary key)
- `title` (varchar)
- `slug` (varchar, unique)
- `description` (text)
- `content` (text, markdown)
- `imageUrl` (varchar)
- `imageAlt` (varchar)
- `techStack` (json array)
- `githubUrl` (varchar, nullable)
- `liveUrl` (varchar, nullable)
- `featured` (boolean)
- `sortOrder` (integer)
- `createdAt`, `updatedAt` (timestamps)

#### experience
- `id` (serial, primary key)
- `company` (varchar)
- `role` (varchar)
- `description` (text)
- `descriptionBullets` (json array)
- `logoUrl` (varchar)
- `logoAlt` (varchar)
- `startDate` (varchar, e.g., "Jan 2026")
- `endDate` (varchar, nullable for current roles)
- `sortOrder` (integer)
- `createdAt`, `updatedAt` (timestamps)

#### blog_posts
- `id` (serial, primary key)
- `title` (varchar)
- `slug` (varchar, unique)
- `content` (text, markdown)
- `coverImageUrl` (varchar)
- `coverImageAlt` (varchar)
- `excerpt` (varchar)
- `tags` (json array)
- `status` (varchar, enum: 'draft' | 'published')
- `publishedAt` (timestamp, nullable)
- `createdAt`, `updatedAt` (timestamps)

#### contact_messages
- `id` (serial, primary key)
- `name` (varchar)
- `email` (varchar)
- `subject` (varchar)
- `message` (text)
- `read` (boolean)
- `createdAt` (timestamp)

#### cv_file
- `id` (serial, primary key)
- `cloudinaryUrl` (varchar)
- `cloudinaryPublicId` (varchar)
- `uploadedAt` (timestamp)

## Connection Pooling

The database client (`lib/db/client.ts`) uses the `pg` library's built-in connection pooling:

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

Default pool settings:
- Max connections: 10
- Min connections: 0
- Idle timeout: 30 seconds

For production, you may want to configure pool settings in `lib/db/client.ts`:

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                  // max connections
  idleTimeoutMillis: 30000, // idle timeout
  connectionTimeoutMillis: 2000,
});
```

## Testing Connection

To verify your database connection is working:

```bash
npm run dev
```

Check the console for a successful connection message. You can also use the test function in `lib/db/client.ts`:

```typescript
import { testConnection } from '@/lib/db/client';

const isConnected = await testConnection();
```

## Troubleshooting

### Connection refused error
- Verify the `DATABASE_URL` is correct in `.env.local`
- Ensure Neon project is active and not paused
- Check your IP is whitelisted (Neon allows all by default in free tier)

### SSL connection error
- Ensure `sslmode=require` is in your connection string
- If using Neon, SSL is required for security

### Table already exists error
- This occurs if you run migrations multiple times
- Safe to ignore, tables are already created
- To reset: delete all tables in Neon dashboard and re-run migrations

### Seed data duplication
- The seed script will insert duplicates if run multiple times
- Manually delete rows or reset the database before re-seeding

## Environment Variables Reference

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js session encryption | Yes (dev) |
| `NEXTAUTH_URL` | NextAuth.js callback URL | Yes (dev) |
| `ADMIN_EMAIL` | Admin account email | Yes |
| `ADMIN_PASSWORD` | Admin account password | Yes |

## Next Steps

After setup:
1. Run migrations: `npm run db:push`
2. Seed initial data: `npm run db:seed`
3. Start development: `npm run dev`
4. Create admin account via authentication system
5. Access admin dashboard at `/admin`

## References

- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Database Integration](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
