import { properties, Property } from '@/app/data/properties';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, Frame, MapPin } from 'lucide-react';

function PropertyCard({ property }: { property: Property }) {
  const propertyImage = PlaceHolderImages.find((img) => img.id === property.image);

  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        {propertyImage && (
          <Image
            src={propertyImage.imageUrl}
            alt={property.title}
            width={600}
            height={400}
            className="object-cover aspect-[3/2] w-full"
            data-ai-hint={propertyImage.imageHint}
          />
        )}
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{property.price}</Badge>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{property.title}</CardTitle>
        <div className="text-muted-foreground flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.address}</span>
        </div>
        <div className="flex justify-around text-sm text-muted-foreground border-t border-b py-4">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-primary" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-primary" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Frame className="w-5 h-5 text-primary" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export function Properties() {
  return (
    <section id="properties" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Featured Properties</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Explore a selection of our finest properties, thoughtfully chosen for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
