'use server';

import { z } from 'zod';
import { generatePropertyDescription } from '@/ai/flows/generate-property-description';
import { properties, Property } from '@/app/data/properties';

const recommendationSchema = z.object({
  propertyType: z.string().min(1, 'Property type is required.'),
  location: z.string().min(1, 'Location is required.'),
  bedrooms: z.number().min(0, 'Bedrooms must be a positive number.'),
  bathrooms: z.number().min(0, 'Bathrooms must be a positive number.'),
  amenities: z.string().optional(),
  uniqueFeatures: z.string().optional(),
});

export type RecommendationResult = {
  description: string;
  recommendedProperty: Property | null;
};

export async function findRecommendation(
  input: z.infer<typeof recommendationSchema>
): Promise<RecommendationResult> {
  try {
    const validatedInput = recommendationSchema.parse(input);
    
    // Default empty strings for optional fields if they are undefined
    const aiInput = {
      ...validatedInput,
      squareFootage: (validatedInput.bedrooms + validatedInput.bathrooms) * 700, // Estimate sq footage
      amenities: validatedInput.amenities || 'standard amenities',
      uniqueFeatures: validatedInput.uniqueFeatures || 'modern finishes',
    };

    const aiResult = await generatePropertyDescription(aiInput);

    let bestMatch: Property | null = null;
    let minDiff = Infinity;

    properties.forEach(property => {
      const diff =
        Math.abs(property.bedrooms - validatedInput.bedrooms) * 2 +
        Math.abs(property.bathrooms - validatedInput.bathrooms);
      
      if (diff < minDiff) {
        minDiff = diff;
        bestMatch = property;
      }
    });

    return {
      description: aiResult.description,
      recommendedProperty: bestMatch,
    };
  } catch (error) {
    console.error('Error finding recommendation:', error);
    return {
      description: 'We encountered an error while generating your recommendation. Please try again.',
      recommendedProperty: properties[0] || null, // Fallback property
    };
  }
}
