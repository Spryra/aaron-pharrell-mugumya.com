import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  json,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Projects Table
export const projects = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description').notNull(),
    content: text('content').notNull(), // Markdown content
    imageUrl: varchar('image_url', { length: 500 }).notNull(),
    imageAlt: varchar('image_alt', { length: 255 }).notNull(),
    techStack: json('tech_stack').$type<string[]>().notNull().default(sql`'[]'::json`),
    githubUrl: varchar('github_url', { length: 500 }),
    liveUrl: varchar('live_url', { length: 500 }),
    featured: boolean('featured').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
);

// Experience Table
export const experience = pgTable(
  'experience',
  {
    id: serial('id').primaryKey(),
    company: varchar('company', { length: 255 }).notNull(),
    role: varchar('role', { length: 255 }).notNull(),
    description: text('description').notNull(),
    descriptionBullets: json('description_bullets')
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::json`),
    logoUrl: varchar('logo_url', { length: 500 }).notNull(),
    logoAlt: varchar('logo_alt', { length: 255 }).notNull(),
    startDate: varchar('start_date', { length: 20 }).notNull(), // Format: "MMM YYYY"
    endDate: varchar('end_date', { length: 50 }), // Nullable for current role
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
);

// Blog Posts Table
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: text('content').notNull(), // Markdown content
    coverImageUrl: varchar('cover_image_url', { length: 500 }).notNull(),
    coverImageAlt: varchar('cover_image_alt', { length: 255 }).notNull(),
    excerpt: varchar('excerpt', { length: 500 }).notNull(),
    tags: json('tags').$type<string[]>().notNull().default(sql`'[]'::json`),
    status: varchar('status', { length: 20, enum: ['draft', 'published'] })
      .notNull()
      .default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
);

// Contact Messages Table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// CV File Table
export const cvFile = pgTable('cv_file', {
  id: serial('id').primaryKey(),
  cloudinaryUrl: varchar('cloudinary_url', { length: 500 }).notNull(),
  cloudinaryPublicId: varchar('cloudinary_public_id', { length: 255 }).notNull(),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// TypeScript Types

// Projects Types
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

// Experience Types
export type Experience = typeof experience.$inferSelect;
export type NewExperience = typeof experience.$inferInsert;

// Blog Posts Types
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

// Contact Messages Types
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;

// CV File Types
export type CvFile = typeof cvFile.$inferSelect;
export type NewCvFile = typeof cvFile.$inferInsert;
