'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    image: project1,
    title: 'Skyline Residences',
    location: 'Downtown Metro',
    type: 'Luxury Apartments',
    beds: '2-4 BHK',
    baths: '2-3',
    area: '1200-2800 sq.ft',
    status: 'Under Construction',
    completion: 'Dec 2025',
    amenities: ['Swimming Pool', 'Gym', 'Sky Garden', 'Security 24/7']
  },
  {
    id: 2,
    image: project2,
    title: 'Royal Villas',
    location: 'Lakeside Estate',
    type: 'Premium Villas',
    beds: '4-5 BHK',
    baths: '4-5',
    area: '3500-5000 sq.ft',
    status: 'Booking Open',
    completion: 'Jun 2026',
    amenities: ['Private Garden', 'Club House', 'Kids Play Area', 'Smart Home']
  },
  {
    id: 3,
    image: project3,
    title: 'Business Park Tower',
    location: 'Financial District',
    type: 'Commercial Complex',
    beds: 'Office Spaces',
    baths: 'Multiple',
    area: '800-5000 sq.ft',
    status: 'Pre-Launch',
    completion: 'Mar 2027',
    amenities: ['High-speed Elevators', 'Conference Halls', 'Food Court', 'Parking']
  },
];

const CurrentProjects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Current <span className="text-gradient-gold">Ongoing Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Exclusive developments currently shaping the skyline
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2 flex flex-col w-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-accent text-secondary px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="font-poppins text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <div className="mb-4 text-sm text-accent font-semibold">{project.type}</div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
                    <div className="text-center">
                      <Bed className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm font-semibold">{project.beds}</div>
                    </div>
                    <div className="text-center">
                      <Bath className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm font-semibold">{project.baths}</div>
                    </div>
                    <div className="text-center">
                      <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-xs font-semibold">{project.area}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4 flex-grow">
                    <div className="text-sm font-semibold mb-2">Key Amenities:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-xs bg-muted px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    Expected Completion: <span className="font-semibold text-foreground">{project.completion}</span>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group mt-auto"
                    asChild
                  >
                    <Link href={`/project/${project.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
