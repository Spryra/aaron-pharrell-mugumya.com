'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils/cn';

// Validation Schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject must be at most 150 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters')
    .trim(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setSubmitStatus({
          type: 'error',
          message:
            'You have reached the message limit. Please try again in an hour.',
        });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your message! I will get back to you within 24-48 hours.',
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Status Messages */}
      {submitStatus.type === 'success' && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <p className="text-emerald-800 dark:text-emerald-200 font-medium">
            {submitStatus.message}
          </p>
        </div>
      )}

      {submitStatus.type === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 font-medium">
            {submitStatus.message}
          </p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2"
        >
          Your Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="John Doe"
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-all duration-200',
            'bg-white dark:bg-dark-bg',
            'text-light-text dark:text-dark-text',
            'placeholder-light-text-secondary dark:placeholder-dark-text-secondary',
            errors.name
              ? 'border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
              : 'border-light-border dark:border-dark-border focus:border-light-accent dark:focus:border-dark-accent focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20'
          )}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2"
        >
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="john@example.com"
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-all duration-200',
            'bg-white dark:bg-dark-bg',
            'text-light-text dark:text-dark-text',
            'placeholder-light-text-secondary dark:placeholder-dark-text-secondary',
            errors.email
              ? 'border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
              : 'border-light-border dark:border-dark-border focus:border-light-accent dark:focus:border-dark-accent focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20'
          )}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2"
        >
          Subject
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          placeholder="Project Collaboration"
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-all duration-200',
            'bg-white dark:bg-dark-bg',
            'text-light-text dark:text-dark-text',
            'placeholder-light-text-secondary dark:placeholder-dark-text-secondary',
            errors.subject
              ? 'border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
              : 'border-light-border dark:border-dark-border focus:border-light-accent dark:focus:border-dark-accent focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20'
          )}
          aria-invalid={errors.subject ? 'true' : 'false'}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2"
        >
          Your Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          placeholder="Tell me about your project..."
          rows={6}
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none',
            'bg-white dark:bg-dark-bg',
            'text-light-text dark:text-dark-text',
            'placeholder-light-text-secondary dark:placeholder-dark-text-secondary',
            errors.message
              ? 'border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
              : 'border-light-border dark:border-dark-border focus:border-light-accent dark:focus:border-dark-accent focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20'
          )}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200',
          'bg-light-accent dark:bg-dark-accent',
          'text-white',
          isSubmitting
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:opacity-90 active:scale-95'
        )}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
