'use client'
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CurrentProjects from '@/components/CurrentProjects';
// import CompletedProjects from '@/components/CompletedProjects';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingSidebar from '@/components/FloatingSidebar';
import LoadingScreen from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onLoadingComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen relative">
          <AnimatedBackground />
          <div className="relative z-10">
            <Header />
            <Hero />
            <About />
            <CurrentProjects />
            {/* <CompletedProjects /> */}
            <Testimonials />
            <Services />
            <WhyChooseUs />
            <Contact />
            <Footer />
            <FloatingSidebar />
          </div>
        </main>
      )}
    </>
  );
}
