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
  type CarouselApi,
} from '@/components/ui/carousel';
import heroBg1 from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg-2.jpeg';
import heroBg3 from '@/assets/hero-bg-3.jpeg';
import heroBg4 from '@/assets/hero-bg-4.jpeg';
import heroBg5 from '@/assets/hero-bg-5.jpeg';

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
                <div className="relative h-screen w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    objectFit="cover"
                    priority={index === 0}
                    className="filter brightness-50"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
          <span dangerouslySetInnerHTML={{ __html: heroTranslations.title.replace('{gradient}', '<span class="text-gradient-gold">').replace('{/gradient}', '</span>') }} />
        </h1>
        <p className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {heroTranslations.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-secondary font-semibold shadow-gold hover:scale-105 transition-transform">
            <Link href="/#contact">{heroTranslations.enquireNow}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-semibold hover:scale-105 transition-transform">
            <Link href="/#projects">{heroTranslations.viewProjects}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
