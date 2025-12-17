'use client'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';


const heroImages = [
    "https://picsum.photos/seed/hero1/1920/1080",
    "https://picsum.photos/seed/hero2/1920/1080",
    "https://picsum.photos/seed/hero3/1920/1080",
    "https://picsum.photos/seed/hero4/1920/1080",
    "https://picsum.photos/seed/hero5/1920/1080"
];

const Hero = () => {
  const { translations } = useContext(LanguageContext);
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
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Carousel
        setApi={setApi}
        className="absolute inset-0 z-0"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {heroImages.map((img, index) => (
            <CarouselItem key={index}>
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              >
                <Image 
                  src={img}
                  alt={`Hero background ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="bg-center bg-fixed"
                  priority={index === 0}
                  data-ai-hint="modern house"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                    backgroundSize: '30px 30px'
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '30px 30px']
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="font-poppins text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="block">{translations.hero.title1}</span>
            <span className="text-gradient-gold block">{translations.hero.title2}</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {translations.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-secondary font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg group shadow-gold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {translations.hero.enquireNow}
              <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              className="w-full sm:w-auto px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {translations.hero.viewProjects}
            </Button>
          </motion.div>
        </motion.div>
      </div>

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
