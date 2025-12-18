'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import heroBg1 from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg-2.jpeg';
import heroBg3 from '@/assets/hero-bg-3.jpeg';
import heroBg4 from '@/assets/hero-bg-4.jpeg';
import heroBg5 from '@/assets/hero-bg-5.jpeg';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: heroBg1, alt: 'Modern house exterior', href: '/#about' },
  { src: heroBg2, alt: 'Spacious living room with a view', href: '/#projects' },
  { src: heroBg3, alt: 'Luxury kitchen with island', href: '/#services' },
  { src: heroBg4, alt: 'Elegant bedroom with large window', href: '/#testimonials' },
  { src: heroBg5, alt: 'Backyard with swimming pool', href: '/#contact' },
];

const Hero = () => {
  const { translations } = useContext(LanguageContext);
  const heroTranslations = translations.hero;
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

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
    
    startAutoplay();

    setCurrent(api.selectedScrollSnap());

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
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full h-full"
        >
          <CarouselContent>
            {galleryImages.map((img, index) => (
              <CarouselItem key={index}>
                 <Link href={img.href}>
                  <div className="relative h-screen w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      objectFit="cover"
                      priority={index === 0}
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70 rounded-full h-10 w-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70 rounded-full h-10 w-10" />
        </Carousel>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index ? "p-1.5 bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
