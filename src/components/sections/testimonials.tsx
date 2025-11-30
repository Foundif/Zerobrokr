import { testimonials, Testimonial } from '@/app/data/testimonials';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const testimonialImage = PlaceHolderImages.find((img) => img.id === testimonial.image);

  return (
    <Card className="h-full shadow-lg">
      <CardHeader className="items-center text-center">
        {testimonialImage && (
          <Image
            src={testimonialImage.imageUrl}
            alt={testimonial.name}
            width={80}
            height={80}
            className="rounded-full"
            data-ai-hint={testimonialImage.imageHint}
          />
        )}
        <div className="mt-2">
          <p className="font-bold font-headline text-lg">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
        <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Real stories from satisfied homeowners and investors.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 p-4">
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
