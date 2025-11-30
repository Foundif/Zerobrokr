import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';

const completedProjects = [
  {
    id: 1,
    title: 'Premium 3BHK Villa',
    location: 'Othakadai, Madurai',
    image: project1,
    client: 'Mr. Ajith',
    status: 'Sold',
    result: 'Sold within 14 days at best market price'
  },
  {
    id: 2,
    title: 'DTCP Approved Plots',
    location: 'Kadachanendhal',
    image: project2,
    client: 'Vel Builder',
    status: 'Sold Out',
    result: 'Without brokerage'
  },
  {
    id: 3,
    title: 'Commercial Building',
    location: 'Kadachanendhal',
    image: project3,
    client: 'Rajesh',
    status: 'Sold Out',
    result: 'Quick closing, zero commission'
  },
];

const CompletedProjects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % completedProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + completedProjects.length) % completedProjects.length);
  };

  const currentProject = completedProjects[currentIndex];

  return (
    <section ref={ref} className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            Our Successful <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Real stories. Real homes. Real results. Explore how we help clients buy, sell, and invest—faster and with zero brokerage.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Image */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <motion.img
              key={currentIndex}
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Project Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 lg:p-12">
              <motion.div
                key={`info-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  <span className="text-accent font-semibold text-sm md:text-base">{currentProject.status}</span>
                </div>
                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
                  {currentProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-4 text-gray-300 text-sm md:text-base mb-3">
                  <span>{currentProject.location}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Client: {currentProject.client}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-white/20">
                  <div className="text-accent font-semibold text-xs md:text-sm mb-1">Result:</div>
                  <div className="text-white text-sm md:text-base">{currentProject.result}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/30 text-white hover:scale-110 transition-transform"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/30 text-white hover:scale-110 transition-transform"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {completedProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-accent w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

          {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: '5+', label: 'Years in Real Estate' },
            { value: '300+', label: 'Builder Partners' },
            { value: '45', label: 'Properties Sold' },
            { value: '0%', label: 'Brokerage Fee' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 md:mb-2">{stat.value}</div>
              <div className="text-gray-300 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompletedProjects;
