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
import Link from 'next/link';

// Images
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

export default function Gallery() {
  const [api, setApi] = useState<CarouselApi | undefined>();
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
    <section id="gallery" ref={ref} className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((img, index) => (
                <CarouselItem key={index}>
                  <Link href={img.href}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl cursor-pointer">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 100vw"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
