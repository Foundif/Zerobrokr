'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Images
import heroBg1 from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg-2.jpeg';
import heroBg3 from '@/assets/hero-bg-3.jpeg';
import heroBg4 from '@/assets/hero-bg-4.jpeg';
import heroBg5 from '@/assets/hero-bg-5.jpeg';

const galleryImages = [
  { src: heroBg1, alt: 'Modern house exterior' },
  { src: heroBg2, alt: 'Spacious living room with a view' },
  { src: heroBg3, alt: 'Luxury kitchen with island' },
  { src: heroBg4, alt: 'Elegant bedroom with large window' },
  { src: heroBg5, alt: 'Backyard with swimming pool' },
];

export default function Gallery() {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const startAutoplay = useCallback(() => {
    if (!api) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    startAutoplay();

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      startAutoplay();
    };

    api.on('select', onSelect);
    api.on('pointerDown', () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    });

    return () => {
      api.off('select', onSelect);
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [api, startAutoplay]);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-gradient-gold">Property Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            A glimpse into the quality and style of homes we offer.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-premium"
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((img, index) => (
                <CarouselItem key={index} className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  current === index ? 'w-6 bg-white' : 'bg-white/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
