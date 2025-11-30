import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export function MapSection() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  return (
    <section id="map" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Explore Our Locations</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Discover properties in prime locations, perfectly situated for your lifestyle.
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
             <Button size="lg" variant="secondary" className="bg-background/80 text-foreground hover:bg-background">
                View Interactive Map
             </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
