'use client'
import { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone, Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSidebar from '@/components/FloatingSidebar';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { staticProjectsData } from '@/app/data/projects';
import { LanguageContext } from '@/app/contexts/language-context';


export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  
  const { translations } = useContext(LanguageContext);

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  const project = id ? staticProjectsData.find(p => p.id === Number(id)) : null;
  const projectTranslation = id ? translations.projects.find(p => p.id === Number(id)) : null;

  const [api, setApi] = useState<CarouselApi>()
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      }, 3000);
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


  if (!project || !projectTranslation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-poppins text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => router.push('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Carousel */}
        <motion.div
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent>
              {project.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="relative h-[50vh] md:h-[60vh] w-full">
                    <Image 
                      src={img} 
                      alt={`${projectTranslation.title} image ${i + 1}`}
                      fill
                      objectFit="cover"
                      priority={i === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-white/20"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-block bg-accent text-secondary px-4 py-2 rounded-full font-semibold text-sm mb-4">
                {projectTranslation.status}
              </div>
              <h1 className="font-poppins text-4xl md:text-6xl font-bold text-white mb-2">
                {projectTranslation.title}
              </h1>
              <div className="flex items-center text-white/90 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{project.location}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-poppins text-3xl font-bold mb-4">About This Project</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {projectTranslation.description}
                </p>

                {/* Specifications */}
                <div className="bg-card rounded-2xl p-6 md:p-8 mb-8 shadow-premium">
                  <h3 className="font-poppins text-2xl font-bold mb-6">Specifications</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Home className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.landArea}</div>
                      <div className="text-sm text-muted-foreground">Land Area</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Square className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.buildingArea}</div>
                      <div className="text-sm text-muted-foreground">Building Area</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Compass className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.facing}</div>
                      <div className="text-sm text-muted-foreground">Facing</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{projectTranslation.completion}</div>
                      <div className="text-sm text-muted-foreground">Availability</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="font-poppins text-2xl font-bold mb-6">World-Class Amenities</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {projectTranslation.amenities.map((amenity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl"
                      >
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="font-medium">{amenity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-poppins text-2xl font-bold mb-6">Key Highlights</h3>
                  <div className="space-y-3">
                    {projectTranslation.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="sticky top-24"
              >
                <div className="bg-card rounded-2xl p-6 shadow-premium">
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Price</div>
                    <div className="font-poppins text-3xl font-bold text-accent">
                      {project.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-semibold">{projectTranslation.type}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-semibold text-accent">{projectTranslation.status}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Possession</span>
                      <span className="font-semibold">{projectTranslation.completion}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-secondary font-semibold"
                      size="lg"
                      asChild
                    >
                      <Link href="/#contact">Schedule Site Visit</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Please inform 5 hours before for booking.</p>
                    <Button 
                      variant="outline"
                      className="w-full border-foreground/50 hover:border-accent"
                      size="lg"
                      onClick={() => window.location.href = 'tel:+918807970430'}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground text-center">
                      Get detailed brochure and floor plans
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSidebar />
    </div>
  );
}
