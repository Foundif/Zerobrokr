'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState, useContext, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Square } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/app/contexts/language-context';
import { staticProjectsData, Project } from '@/app/data/projects';

const ProjectCard = ({ project }: { project: Project }) => {
  const { translations } = useContext(LanguageContext);
  const cardTranslations = translations.currentProjects.card;
  const projectTranslation = translations.projects.find(p => p.id === project.id);

  if (!projectTranslation) {
    return null;
  }
  
  return (
  <Card className="group bg-card rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-500 hover:-translate-y-2 flex flex-col w-full h-full">
    {/* Image Carousel */}
    <div className="relative h-64 md:h-56">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {project.images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="relative h-64 md:h-56 overflow-hidden">
                <Image 
                  src={img} 
                  alt={`${projectTranslation.title} image ${i + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
    <CardContent className="p-5 flex flex-col flex-grow">
      <h3 className="font-poppins text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {projectTranslation.title}
      </h3>
      
      <div className="flex items-center text-muted-foreground mb-3">
        <MapPin className="w-4 h-4 mr-2" />
        <span className="text-sm">{project.location}</span>
      </div>

      <div className="mb-4 text-sm text-accent font-semibold">{projectTranslation.type}</div>

      {/* Specs */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
        <div className="text-center">
          <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold">{project.landArea}</div>
          <div className="text-xs text-muted-foreground">{cardTranslations.landArea}</div>
        </div>
        <div className="text-center">
          <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold">{project.buildingArea}</div>
          <div className="text-xs text-muted-foreground">{cardTranslations.building}</div>
        </div>
        <div className="text-center">
          <Compass className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold">{project.facing}</div>
            <div className="text-xs text-muted-foreground">{cardTranslations.facing}</div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4 flex-grow">
        <div className="text-sm font-semibold mb-2">{cardTranslations.amenities}</div>
        <div className="flex flex-wrap gap-2">
          {projectTranslation.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-xs bg-muted px-3 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {projectTranslation.amenities.length > 3 && (
            <span className="text-xs bg-muted px-3 py-1 rounded-full">
              +{projectTranslation.amenities.length - 3} {cardTranslations.more}
            </span>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {cardTranslations.availability} <span className="font-semibold text-foreground">{projectTranslation.completion}</span>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group mt-auto"
        asChild
      >
        <Link href={`/project/${project.id}`}>
          {cardTranslations.viewDetails}
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
      </Button>
    </CardContent>
  </Card>
)};

const CurrentProjects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [api, setApi] = useState<CarouselApi>()
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);
  const { translations } = useContext(LanguageContext);


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
            {translations.currentProjects.title.split(' ').slice(0, 2).join(' ')} <span className="text-gradient-gold">{translations.currentProjects.title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            {translations.currentProjects.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <Carousel 
            setApi={setApi} 
            className="w-full" 
            opts={{ 
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {staticProjectsData.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentProjects;
