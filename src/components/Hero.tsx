'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const heroImages = [
    "https://picsum.photos/seed/hero1/1920/1080",
    "https://picsum.photos/seed/hero2/1920/1080",
    "https://picsum.photos/seed/hero3/1920/1080",
    "https://picsum.photos/seed/hero4/1920/1080",
    "https://picsum.photos/seed/hero5/1920/1080"
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
    }
    autoplayInterval.current = setInterval(() => {
      api?.scrollNext();
    }, 5000);
  }, [api]);
  
  useEffect(() => {
    if (!api) {
      return;
    }
  
    setCurrent(api.selectedScrollSnap());
    startAutoplay();
  
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      startAutoplay();
    };
  
    api.on("select", onSelect);
    api.on("pointerDown", () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    });
    
    return () => {
      api.off("select", onSelect);
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [api, startAutoplay]);
  

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-0 h-full">
          {heroImages.map((img, index) => (
            <CarouselItem key={index} className="pl-0 h-full">
              <div className="relative h-full w-full">
                <Image 
                  src={img}
                  alt={`Hero background ${index + 1}`}
                  fill
                  style={{objectFit: 'cover'}}
                  className="bg-center"
                  priority={index === 0}
                  data-ai-hint="modern house"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index ? "w-6 bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
