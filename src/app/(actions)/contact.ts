'use server';

import { contactFormSchema } from '@/app/schemas/contact-schema';
import { z } from 'zod';

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  // This is a server action.
  // In a real application, you would process the form data here.
  // For example, send an email, save to a database, etc.
  console.log('Contact form submitted:', values);

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // You can return a success or error message
  return {
    success: true,
    message: "Thank you for your message! We'll get back to you soon.",
  };
}
