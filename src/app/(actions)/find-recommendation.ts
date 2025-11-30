'use server';

import { z } from 'zod';
import { recommendationSchema } from '@/app/schemas/recommendation-schema';
import { properties, Property } from '@/app/data/properties';

// This is a simplified recommendation logic.
// In a real-world scenario, you might use a more complex algorithm or a true AI/ML model.
function getRecommendation(criteria: z.infer<typeof recommendationSchema>): { description: string; recommendedProperty: Property | null } {
  const { propertyType, location, bedrooms, bathrooms, amenities, uniqueFeatures } = criteria;

  const description = `A ${propertyType} in ${location} with ${bedrooms} bedrooms and ${bathrooms} bathrooms. It should have amenities like ${amenities} and unique features such as ${uniqueFeatures}. This property offers a blend of comfort and style, perfect for modern living.`;

  // Simple matching logic: find the first property that somewhat matches.
  const recommendedProperty =
    properties.find(
      (p) =>
        p.bedrooms >= bedrooms &&
        p.bathrooms >= bathrooms
    ) || null;

  return { description, recommendedProperty };
}

export async function findRecommendation(values: z.infer<typeof recommendationSchema>) {
  console.log('Finding recommendation for:', values);

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const result = getRecommendation(values);

  return result;
}
