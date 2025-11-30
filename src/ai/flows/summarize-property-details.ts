'use server';

/**
 * @fileOverview Summarizes lengthy property details into concise points.
 *
 * - summarizePropertyDetails - A function that summarizes property details.
 * - SummarizePropertyDetailsInput - The input type for the summarizePropertyDetails function.
 * - SummarizePropertyDetailsOutput - The return type for the summarizePropertyDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePropertyDetailsInputSchema = z.object({
  propertyDetails: z
    .string()
    .describe('The lengthy details of a property.'),
});
type SummarizePropertyDetailsInput = z.infer<typeof SummarizePropertyDetailsInputSchema>;

const SummarizePropertyDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the property details.'),
});
type SummarizePropertyDetailsOutput = z.infer<typeof SummarizePropertyDetailsOutputSchema>;

export async function summarizePropertyDetails(input: SummarizePropertyDetailsInput): Promise<SummarizePropertyDetailsOutput> {
  return summarizePropertyDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePropertyDetailsPrompt',
  input: {schema: SummarizePropertyDetailsInputSchema},
  output: {schema: SummarizePropertyDetailsOutputSchema},
  prompt: `Summarize the following property details into concise points:\n\n{{{propertyDetails}}}`,
});

const summarizePropertyDetailsFlow = ai.defineFlow(
  {
    name: 'summarizePropertyDetailsFlow',
    inputSchema: SummarizePropertyDetailsInputSchema,
    outputSchema: SummarizePropertyDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
