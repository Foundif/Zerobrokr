import { z } from 'zod';
import { Property } from '@/app/data/properties';

export const recommendationSchema = z.object({
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
