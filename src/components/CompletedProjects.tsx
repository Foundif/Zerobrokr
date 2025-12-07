'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
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
    status: 'Sold',
    result: 'Quick closing, zero commission'
  },
];

const CompletedProjects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Our Successful <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Real stories. Real homes. Real results. Explore how we help clients buy, sell, and invest—faster and with zero brokerage.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white/5 rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 right-4 bg-accent text-secondary px-3 py-1 rounded-full font-semibold text-xs">
                  {project.status}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-poppins text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">Client: {project.client}</p>
                <p className="text-gray-400 text-sm mb-4">{project.location}</p>
                
                <div className="bg-white/10 p-4 rounded-lg border border-white/20 mt-auto">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="text-accent font-semibold text-xs mb-1">Result:</div>
                      <p className="text-white text-sm leading-snug">{project.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
