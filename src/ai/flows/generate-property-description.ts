// src/ai/flows/generate-property-description.ts
'use server';

/**
 * @fileOverview AI-powered property description generation.
 *
 * - generatePropertyDescription - A function that generates property descriptions based on input parameters.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z
    .string()
    .describe('The type of the property (e.g., house, apartment, condo).'),
  location: z.string().describe('The location of the property (city, neighborhood).'),
  bedrooms: z.number().describe('The number of bedrooms in the property.'),
  bathrooms: z.number().describe('The number of bathrooms in the property.'),
  squareFootage: z.number().describe('The square footage of the property.'),
  amenities: z
    .string()
    .describe(
      'A comma-separated list of amenities offered by the property (e.g., swimming pool, gym, parking).'
    ),
  uniqueFeatures: z
    .string()
    .describe('A description of the unique features of the property.'),
});

export type GeneratePropertyDescriptionInput = z.infer<
  typeof GeneratePropertyDescriptionInputSchema
>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A detailed and engaging description of the property.'),
});

export type GeneratePropertyDescriptionOutput = z.infer<
  typeof GeneratePropertyDescriptionOutputSchema
>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are a real estate expert. Generate a compelling and informative property description based on the following information:

Property Type: {{{propertyType}}}
Location: {{{location}}}
Bedrooms: {{{bedrooms}}}
Bathrooms: {{{bathrooms}}}
Square Footage: {{{squareFootage}}}
Amenities: {{{amenities}}}
Unique Features: {{{uniqueFeatures}}}

Write a description that highlights the best aspects of the property and entices potential buyers or renters.`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
