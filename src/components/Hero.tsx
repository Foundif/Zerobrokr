
'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageContext } from '@/app/contexts/language-context';

import heroBg1 from '@/assets/1.png';
import heroBg2 from '@/assets/2.png';
import heroBg3 from '@/assets/3.png';
import heroBg4 from '@/assets/4.png';
import heroBg5 from '@/assets/5.png';
import heroBg6 from '@/assets/6.png';

import desktopImg1 from '@/assets/100.jpg';
import desktopImg2 from '@/assets/101.jpg';
import desktopImg3 from '@/assets/102.jpg';
import desktopImg4 from '@/assets/103.jpg';
import desktopImg5 from '@/assets/104.jpg';
import desktopImg6 from '@/assets/105.jpg';

import { useIsMobile } from '@/hooks/use-mobile';


type GalleryImage = {
  src: StaticImageData;
  alt: string;
  href: string;
};

const mobileImages: GalleryImage[] = [
  { src: heroBg1, alt: 'Modern house exterior', href: '/#about' },
  { src: heroBg2, alt: 'Spacious living room with a view', href: '/#projects' },
  { src: heroBg3, alt: 'Luxury kitchen with island', href: '/#services' },
  { src: heroBg4, alt: 'Elegant bedroom with large window', href: '/#testimonials' },
  { src: heroBg5, alt: 'Backyard with swimming pool', href: '/#contact' },
  { src: heroBg6, alt: 'Another beautiful property', href: '/#contact' },
];

const desktopImages: GalleryImage[] = [
    { src: desktopImg1, alt: 'Desktop image 1', href: '/#about' },
    { src: desktopImg2, alt: 'Desktop image 2', href: '/#projects' },
    { src: desktopImg3, alt: 'Desktop image 3', href: '/#services' },
    { src: desktopImg4, alt: 'Desktop image 4', href: '/#testimonials' },
    { src: desktopImg5, alt: 'Desktop image 5', href: '/#contact' },
    { src: desktopImg6, alt: 'Desktop image 6', href: '/#contact' },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const Hero = () => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const { translations } = useContext(LanguageContext);
  const isMobile = useIsMobile();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // We need to wait for the isMobile value to be determined on the client
    if (isMobile === undefined) return;
    setImages(isMobile ? mobileImages : desktopImages);
  }, [isMobile]);

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

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    api?.scrollNext();
  };

  if (isMobile === undefined) {
    // Render a placeholder or nothing during server-side rendering
    // and initial client-side rendering before isMobile is determined.
    return <div className="pt-[120px] w-full aspect-[16/9] md:h-[80vh] h-[50vh] bg-muted" />;
  }

  return (
    <section id="hero" className="relative group w-full flex items-center justify-center pt-[120px]">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full overflow-hidden"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
               <Link href={img.href}>
                <div className="relative w-full aspect-[16/9] md:h-[80vh] h-[50vh] bg-white">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain md:rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-12 w-12 flex items-center justify-center"
        >
           <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-12 w-12 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </Carousel>
    </section>
  );
};

export default Hero;
