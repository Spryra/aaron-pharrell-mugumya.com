import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { contactMessages } from '@/lib/db/schema';
import { checkRateLimit } from '@/lib/utils/rate-limit';
import { sendContactNotificationEmail } from '@/lib/utils/email';

// Validation Schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Invalid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject must be at most 150 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
});

function getClientIpAddress(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = request.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (clientIp) {
    return clientIp;
  }

  // Fallback for development
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Get client IP address
    const ipAddress = getClientIpAddress(request);

    // Check rate limit (5 requests per IP per hour)
    const rateLimitResult = await checkRateLimit(ipAddress, 5, 3600);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.reset,
        },
        { status: 429 }
      );
    }

    // Save to database
    const submittedAt = new Date();
    const dbResult = await db
      .insert(contactMessages)
      .values({
        name,
        email,
        subject,
        message,
        ipAddress,
        read: false,
        submittedAt,
        createdAt: submittedAt,
      })
      .returning({ id: contactMessages.id });

    if (!dbResult || dbResult.length === 0) {
      return NextResponse.json(
        { error: 'Failed to save message to database' },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking)
    try {
      await sendContactNotificationEmail({
        name,
        email,
        subject,
        message,
        ipAddress,
        submittedAt,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
      // The message is still saved in the database
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contact message received. Thank you!',
        messageId: dbResult[0].id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
