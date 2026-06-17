import { db } from '@/lib/db/client';
import { projects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 DEBUG: Fetching all projects...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');

    const allProjects = await db.select().from(projects);
    console.log(`✓ Found ${allProjects.length} projects`);

    const featured = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.sortOrder))
      .limit(2);

    console.log(`✓ Found ${featured.length} featured projects`);

    return NextResponse.json({
      status: 'success',
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      allProjectsCount: allProjects.length,
      featuredProjectsCount: featured.length,
      allProjects,
      featured,
    });
  } catch (error) {
    console.error('❌ Database error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      },
      { status: 500 }
    );
  }
}
