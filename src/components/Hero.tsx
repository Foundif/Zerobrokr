
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageContext } from '@/app/contexts/language-context';

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
  const [api, setApi] = useState<CarouselApi | undefined>();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const { translations } = useContext(LanguageContext);

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

    const onSelect = () => {
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
    <section id="hero" className="relative group w-full flex items-center justify-center pt-[100px]">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {galleryImages.map((img, index) => (
            <CarouselItem key={index}>
               <Link href={img.href}>
                <div className="relative w-full aspect-[16/9] md:h-[80vh] h-[50vh] bg-white">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
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
    </section>
  );
};

export default Hero;
