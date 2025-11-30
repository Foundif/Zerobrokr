'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2, Building, Map, BedDouble, Bath, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findRecommendation, RecommendationResult } from '@/app/(actions)/find-recommendation';
import { properties, Property } from '@/app/data/properties';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const recommendationSchema = z.object({
  propertyType: z.string().min(1, 'Property type is required.'),
  location: z.string().min(1, 'Location is required.'),
  bedrooms: z.number().min(0, 'Bedrooms must be a positive number.'),
  bathrooms: z.number().min(0, 'Bathrooms must be a positive number.'),
  amenities: z.string().optional(),
  uniqueFeatures: z.string().optional(),
});


type RecommendationFormValues = z.infer<typeof recommendationSchema>;

function RecommendedPropertyCard({ property }: { property: Property }) {
  const propertyImage = PlaceHolderImages.find((img) => img.id === property.image);

  return (
    <Card className="overflow-hidden flex flex-col md:flex-row h-full shadow-lg">
      <div className="md:w-1/3 relative">
        {propertyImage && (
          <Image
            src={propertyImage.imageUrl}
            alt={property.title}
            width={300}
            height={300}
            className="object-cover w-full h-full"
            data-ai-hint={propertyImage.imageHint}
          />
        )}
      </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader>
          <Badge className="w-fit bg-accent text-accent-foreground mb-2">Our Recommendation</Badge>
          <CardTitle className="font-headline text-2xl">{property.title}</CardTitle>
          <CardDescription>{property.address}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex justify-around text-sm text-muted-foreground border-t border-b py-3 my-3">
            <div className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-primary" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-primary" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{property.sqft} sqft</span>
            </div>
          </div>
          <p className="text-lg font-bold text-primary">{property.price}</p>
        </CardContent>
      </div>
    </Card>
  );
}

export function AIRecommendations() {
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      propertyType: 'House',
      location: 'Suburbia',
      bedrooms: 3,
      bathrooms: 2,
      amenities: 'swimming pool, gym',
      uniqueFeatures: 'open floor plan, large backyard',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    const recommendationResult = await findRecommendation(data);
    setResult(recommendationResult);
    setIsLoading(false);
  };

  return (
    <section id="ai-tool" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find Your Perfect Home with AI</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Describe your ideal home, and our AI will craft a vision and find a matching property for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Wand2 className="text-accent" />
                Tell Us Your Dream
              </CardTitle>
              <CardDescription>Fill in the details below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="propertyType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., House, Condo" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., Downtown, Suburbia" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <FormField control={form.control} name="bedrooms" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name="bathrooms" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="amenities" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Amenities</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., pool, gym, parking" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="uniqueFeatures" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unique Features</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., rooftop deck, home office" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                  <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate My Dream Home
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center min-h-[400px]">
            {isLoading && (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-lg">Our AI is crafting your dream...</p>
              </div>
            )}
            {!isLoading && result && (
              <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="text-accent" />
                    Your Ideal Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground italic leading-relaxed">{result.description}</p>
                  {result.recommendedProperty && (
                    <>
                      <Separator />
                      <RecommendedPropertyCard property={result.recommendedProperty} />
                    </>
                  )}
                </CardContent>
              </Card>
            )}
            {!isLoading && !result && (
              <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Wand2 className="h-12 w-12 mx-auto" />
                <p className="mt-4 text-lg">Your AI-powered recommendation will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
