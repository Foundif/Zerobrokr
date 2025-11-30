'use server';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    // Zod validation is handled by react-hook-form, but we can re-validate on server
    contactFormSchema.parse(data);

    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just log it.
    console.log('Contact form submitted successfully:', data);
    
    // Simulate network delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Thank you! Your message has been sent successfully.' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    // In a real app, you might want to log this error to a monitoring service.
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  }
}
