'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, AspectRatio, Compass, ArrowRight, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const projects = [
  {
    id: 1,
    images: ['/project1.jpg', '/project2.jpg', '/project3.jpg'],
    title: 'Kadachanendhal – Near House',
    location: 'Madurai – Kadachanendhal',
    type: 'Residential House',
    landArea: '2.75 Cents',
    buildingArea: '1050 Sq.ft',
    facing: 'South Facing',
    price: '₹57 Lakhs',
    amenities: ['Borewell', 'Car Parking', 'Sweet Water'],
    completion: 'Ready to Occupy',
    status: 'Ready to Occupy',
  },
  {
    id: 2,
    images: ['/project2.jpg', '/project3.jpg', '/project1.jpg'],
    title: 'Suriyanagar – House for Sale',
    location: 'Madurai – Suriyanagar',
    type: 'Residential House',
    landArea: '3.25 Cents',
    buildingArea: '1600 Sq.ft',
    facing: 'East Facing',
    price: '₹80 Lakhs',
    amenities: ['Covered Car Parking', 'Modular Kitchen', 'Borewell'],
    completion: 'Ready to Occupy',
    status: 'Ready to Occupy',
  },
  {
    id: 3,
    images: ['/project3.jpg', '/project1.jpg', '/project2.jpg'],
    title: 'Kadachanendhal – House for Sale',
    location: 'Madurai – Kadachanendhal',
    type: 'Residential House',
    landArea: '2 Cents',
    buildingArea: '1175 Sq.ft',
    facing: 'North Facing',
    price: '₹61 Lakhs',
    amenities: ['Car Parking', 'Borewell', 'Peaceful Residential Area'],
    completion: 'Ready to Occupy',
    status: 'Ready to Occupy',
  },
  {
    id: 4,
    images: ['/project4.jpeg', '/project5.jpeg', '/project1.jpg'],
    title: 'Kadachanendhal – Near House for Sale',
    location: 'Madurai – Kadachanendhal',
    type: 'Compact House',
    landArea: '2.4 Cents',
    buildingArea: '750 Sq.ft',
    facing: 'East Facing',
    price: '₹47 Lakhs',
    amenities: ['Borewell', 'Road Access', 'Compact Budget-Friendly Home'],
    completion: 'Ready to Occupy',
    status: 'Ready to Occupy',
  },
  {
    id: 5,
    images: ['/project5.jpeg', '/project1.jpg', '/project2.jpg'],
    title: 'Kadachanendhal – Luxury House',
    location: 'Madurai – Kadachanendhal',
    type: 'Premium Spacious House',
    landArea: '5 Cents',
    buildingArea: '3250 Sq.ft',
    facing: 'North Facing',
    price: '₹2.30 Crore',
    amenities: ['Spacious Car Parking', 'High-end Interiors', 'Borewell + Corporation Water', 'Prime Residential Zone'],
    completion: 'Ready to Occupy',
    status: 'Ready to Occupy',
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
            Exclusive developments currently available for you
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2 flex flex-col w-full">
                {/* Image Carousel */}
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((img, i) => (
                        <CarouselItem key={i}>
                          <div className="relative h-64 overflow-hidden">
                            <Image 
                              src={img} 
                              alt={`${project.title} image ${i + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="group-hover:scale-110 transition-transform duration-700"
                              
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
                  </Carousel>
                  <div className="absolute top-4 right-4 bg-accent text-secondary px-4 py-2 rounded-full font-semibold text-sm shadow-lg z-10">
                    {project.price}
                  </div>
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
                      <AspectRatio className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm font-semibold">{project.landArea}</div>
                      <div className="text-xs text-muted-foreground">Land Area</div>
                    </div>
                    <div className="text-center">
                      <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm font-semibold">{project.buildingArea}</div>
                      <div className="text-xs text-muted-foreground">Building</div>
                    </div>
                    <div className="text-center">
                      <Compass className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm font-semibold">{project.facing}</div>
                       <div className="text-xs text-muted-foreground">Facing</div>
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
                      {project.amenities.length > 3 && (
                        <span className="text-xs bg-muted px-3 py-1 rounded-full">
                          +{project.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    Availability: <span className="font-semibold text-foreground">{project.completion}</span>
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
