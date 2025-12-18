'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';
import heroBg from '@/assets/image.jpg';

const Hero = () => {
  const { translations } = useContext(LanguageContext);
  const heroTranslations = translations.hero;

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Luxury modern house"
          fill
          objectFit="cover"
          priority
          className="filter brightness-50"
        />
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
