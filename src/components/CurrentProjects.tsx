'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Button } from '@/components/ui/button';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Square } from 'lucide-react';

import project1main from '@/assets/project1 main.jpeg';
import project1 from '@/assets/project1.jpeg';
import project2main from '@/assets/project2 main.jpeg';
import project2_1 from '@/assets/project2-1.jpeg';
import project2_2 from '@/assets/project2-2.jpeg';
import project2_3 from '@/assets/project2-3.jpeg';
import project2_4 from '@/assets/project2-4.jpeg';
import project3main from '@/assets/project3 main.jpeg';
import project3_1 from '@/assets/project3-1.jpeg';
import project3_2 from '@/assets/project3-2.jpeg';
import project4main from '@/assets/project4 main.jpeg';
import project4_1 from '@/assets/project4-1.jpeg';
import project4_2 from '@/assets/project4-2.jpeg';
import project5main from '@/assets/project5 main.jpeg';
import project5_1 from '@/assets/project5-1.jpeg';
import project5_2 from '@/assets/project5-2.jpeg';
import project5_3 from '@/assets/project5-3.jpeg';
import project5_4 from '@/assets/project5-4.jpeg';
import project5_5 from '@/assets/project5-5.jpeg';
import project5_6 from '@/assets/project5-6.jpeg';
import project5_7 from '@/assets/project5-7.jpeg';
import project5_8 from '@/assets/project5-8.jpeg';
import project5_9 from '@/assets/project5-9.jpeg';
import project5_10 from '@/assets/project5-10.jpeg';
import project5_11 from '@/assets/project5-11.jpeg';

type Project = {
    id: number;
    images: (string | StaticImageData)[];
    title: string;
    location: string;
    type: string;
    landArea: string;
    buildingArea: string;
    facing: string;
    price: string;
    amenities: string[];
    completion: string;
    status: string;
};

const projects: Project[] = [
    {
    id: 1,
    images: [project1main, project1],
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
    images: [project2main, project2_1, project2_2, project2_3, project2_4],
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
    images: [project3main, project3_1, project3_2],
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
    images: [project4main, project4_1, project4_2],
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
    images: [project5main, project5_1, project5_2, project5_3, project5_4, project5_5, project5_6, project5_7, project5_8, project5_9, project5_10, project5_11],
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
  const [api, setApi] = useState<CarouselApi>()
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) {
      return
    }

    const startAutoplay = () => {
      autoplayInterval.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext()
        } else {
          api.scrollTo(0)
        }
      }, 3000); // 3 seconds delay
    }

    startAutoplay();

    api.on("pointerDown", () => {
      if(autoplayInterval.current) clearInterval(autoplayInterval.current);
    });

    api.on("select", () => {
      if(autoplayInterval.current) clearInterval(autoplayInterval.current);
      startAutoplay();
    });

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    }
  }, [api]);

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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="group bg-card rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row w-full">
                      {/* Image Carousel */}
                      <div className="relative md:w-1/2">
                        <Carousel className="w-full h-full">
                          <CarouselContent>
                            {project.images.map((img, i) => (
                              <CarouselItem key={i}>
                                <div className="relative h-80 md:h-full overflow-hidden">
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
                      <CardContent className="p-5 md:p-6 flex flex-col flex-grow md:w-1/2">
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
                            <AspectRatio ratio={1} className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
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
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentProjects;
