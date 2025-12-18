'use client';
import { motion, AnimatePresence } from 'framer-motion';
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
import heroBg1 from '@/assets/1.png';
import heroBg2 from '@/assets/2.png';
import heroBg3 from '@/assets/3.png';
import heroBg4 from '@/assets/4.png';
import heroBg5 from '@/assets/5.png';
import heroBg6 from '@/assets/6.png';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: heroBg1, alt: 'Modern house exterior', href: '/#about' },
  { src: heroBg2, alt: 'Spacious living room with a view', href: '/#projects' },
  { src: heroBg3, alt: 'Luxury kitchen with island', href: '/#services' },
  { src: heroBg4, alt: 'Elegant bedroom with large window', href: '/#testimonials' },
  { src: heroBg5, alt: 'Backyard with swimming pool', href: '/#contact' },
  { src: heroBg6, alt: 'Another beautiful property', href: '/#contact' },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

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
    }, AUTOPLAY_INTERVAL);
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
    <section id="hero" className="relative h-screen flex items-center justify-center text-white group">
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
                      style={{ objectFit: "contain" }}
                      priority={index === 0}
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-12 w-12 flex items-center justify-center">
             <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-12 w-12 flex items-center justify-center">
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2 p-2 bg-black/20 backdrop-blur-sm rounded-full">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (autoplayRef.current) clearInterval(autoplayRef.current);
              api?.scrollTo(index);
              startAutoplay();
            }}
            className={cn(
              "w-12 h-1 rounded-full bg-white/30 overflow-hidden"
            )}
          >
            <AnimatePresence>
              {current === index && (
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  exit={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
