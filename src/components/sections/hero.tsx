import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg">
          Find Your Dream Home
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-md">
          Discover a curated selection of the finest properties. Your next chapter starts here.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#properties">
              Explore Properties
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
