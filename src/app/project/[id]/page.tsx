'use client'
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone, Compass } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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

import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';
import project4 from '@/assets/project4.jpeg';
import project5 from '@/assets/project5.jpeg';

const projectsData = [
    {
      id: 1,
      images: [project1, project2, project3],
      title: 'Kadachanendhal – Near House',
      location: 'Madurai – Kadachanendhal',
      type: 'Residential House',
      landArea: '2.75 Cents',
      buildingArea: '1050 Sq.ft',
      facing: 'South Facing',
      price: '₹57 Lakhs',
      amenities: ['Borewell', 'Car Parking', 'Sweet Water', 'Gated Community', '24/7 Security'],
      completion: 'Ready to Occupy',
      status: 'Ready to Occupy',
      description: 'A charming and affordable residential house located in the peaceful neighborhood of Kadachanendhal, Madurai. Perfect for small families, this south-facing home is built on a 2.75 cent plot with a building area of 1050 sq.ft. Enjoy essential amenities like a borewell for sweet water and dedicated car parking. The property is ready for immediate occupation.',
      highlights: [
        'Affordable pricing in a growing residential area.',
        'South-facing property ensuring ample sunlight.',
        'Reliable sweet water supply from a private borewell.',
        'Ready for immediate move-in.'
      ]
    },
    {
      id: 2,
      images: [project2, project3, project1],
      title: 'Suriyanagar – House for Sale',
      location: 'Madurai – Suriyanagar',
      type: 'Residential House',
      landArea: '3.25 Cents',
      buildingArea: '1600 Sq.ft',
      facing: 'East Facing',
      price: '₹80 Lakhs',
      amenities: ['Covered Car Parking', 'Modular Kitchen', 'Borewell', 'Private Terrace', 'Wardrobes'],
      completion: 'Ready to Occupy',
      status: 'Ready to Occupy',
      description: 'This beautiful east-facing house in the desirable Suriyanagar area of Madurai offers a spacious living experience. With a land area of 3.25 cents and a generous 1600 sq.ft building area, this home features a modern modular kitchen, covered car parking, and a private borewell. It is an ideal choice for families looking for a ready-to-occupy home in a prime location.',
      highlights: [
        'Prime location in Suriyanagar.',
        'East-facing for positive energy and morning sun.',
        'Modern amenities including a modular kitchen.',
        'Spacious build with immediate availability.'
      ]
    },
    {
      id: 3,
      images: [project3, project1, project2],
      title: 'Kadachanendhal – House for Sale',
      location: 'Madurai – Kadachanendhal',
      type: 'Residential House',
      landArea: '2 Cents',
      buildingArea: '1175 Sq.ft',
      facing: 'North Facing',
      price: '₹61 Lakhs',
      amenities: ['Car Parking', 'Borewell', 'Peaceful Residential Area', 'Good Ventilation', 'Near Main Road'],
      completion: 'Ready to Occupy',
      status: 'Ready to Occupy',
      description: 'A well-designed north-facing house situated in a peaceful residential pocket of Kadachanendhal. Built on a 2-cent plot, this 1175 sq.ft home is perfect for those who value tranquility and convenience. It comes with car parking and a borewell. Its proximity to the main road makes it an accessible and attractive option. The house is ready for you to move in.',
      highlights: [
        'North-facing property in a calm, residential area.',
        'Compact and efficient design.',
        'Easy access to main roads and transportation.',
        'Ready to occupy with essential amenities.'
      ]
    },
    {
      id: 4,
      images: [project4, project5, project1],
      title: 'Kadachanendhal – Near House for Sale',
      location: 'Madurai – Kadachanendhal',
      type: 'Compact House',
      landArea: '2.4 Cents',
      buildingArea: '750 Sq.ft',
      facing: 'East Facing',
      price: '₹47 Lakhs',
      amenities: ['Borewell', 'Road Access', 'Compact Budget-Friendly Home', 'Good Neighborhood'],
      completion: 'Ready to Occupy',
      status: 'Ready to Occupy',
      description: 'This compact, budget-friendly home in Kadachanendhal is an excellent opportunity for first-time homebuyers. The east-facing house has a building area of 750 sq.ft on a 2.4-cent plot. It offers great value with essential amenities like a borewell and good road access in a friendly neighborhood. The property is ready for immediate occupation, offering a cozy and affordable living solution.',
      highlights: [
        'Extremely budget-friendly option.',
        'East-facing for a bright and airy feel.',
        'Located in a good, developing neighborhood.',
        'Ideal for individuals or small families.'
      ]
    },
    {
      id: 5,
      images: [project5, project1, project2],
      title: 'Kadachanendhal – Luxury House',
      location: 'Madurai – Kadachanendhal',
      type: 'Premium Spacious House',
      landArea: '5 Cents',
      buildingArea: '3250 Sq.ft',
      facing: 'North Facing',
      price: '₹2.30 Crore',
      amenities: ['Spacious Car Parking', 'High-end Interiors', 'Borewell + Corporation Water', 'Prime Residential Zone', 'Private Garden', 'Home Theatre Room'],
      completion: 'Ready to Occupy',
      status: 'Ready to Occupy',
      description: 'Indulge in luxury with this premium, spacious north-facing house in a prime residential zone of Kadachanendhal. Sprawled across a 5-cent plot with a massive 3250 sq.ft built-up area, this home is designed for an opulent lifestyle. It features high-end interiors, spacious car parking, and the convenience of both borewell and corporation water supply. This is a ready-to-occupy dream home for those who seek luxury and space.',
      highlights: [
        'Located in a prime, high-demand residential zone.',
        'Extremely spacious with a 3250 sq.ft build area.',
        'Luxurious high-end interiors and finishes.',
        'Dual water source (Borewell and Corporation).',
        'Perfect for large families seeking a premium lifestyle.'
      ]
    },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const project = projectsData.find(p => p.id === Number(id));
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


  if (!project) {
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
                      alt={`${project.title} image ${i + 1}`}
                      layout="fill"
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
                {project.status}
              </div>
              <h1 className="font-poppins text-4xl md:text-6xl font-bold text-white mb-2">
                {project.title}
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
                  {project.description}
                </p>

                {/* Specifications */}
                <div className="bg-card rounded-2xl p-6 md:p-8 mb-8 shadow-premium">
                  <h3 className="font-poppins text-2xl font-bold mb-6">Specifications</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <AspectRatio ratio={1} className="w-8 h-8 mx-auto mb-2 text-primary" />
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
                      <div className="font-semibold mb-1">{project.completion}</div>
                      <div className="text-sm text-muted-foreground">Availability</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="font-poppins text-2xl font-bold mb-6">World-Class Amenities</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.amenities.map((amenity, index) => (
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
                    {project.highlights.map((highlight, index) => (
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
                      <span className="font-semibold">{project.type}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-semibold text-accent">{project.status}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Possession</span>
                      <span className="font-semibold">{project.completion}</span>
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
                      onClick={() => window.location.href = 'tel:+911234567890'}
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
