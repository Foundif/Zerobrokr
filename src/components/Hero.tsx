'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroBg}
          alt="Luxury modern house"
          layout="fill"
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
        <h1 className="font-poppins text-4xl md:text-7xl font-extrabold leading-tight mb-4">
          {translations.hero.title1} <span className="text-gradient-gold">{translations.hero.title2}</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {translations.hero.subtitle}
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-secondary font-semibold shadow-gold hover:scale-105 transition-transform">
            <Link href="/#contact">{translations.hero.enquireNow}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-semibold hover:scale-105 transition-transform">
            <Link href="/#projects">{translations.hero.viewProjects}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
