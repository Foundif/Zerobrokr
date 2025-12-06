'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSidebar from '@/components/FloatingSidebar';
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';
import Image from 'next/image';
import Link from 'next/link';

const projectsData = [
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
    price: '₹85 Lakhs - ₹2.5 Cr',
    amenities: ['Swimming Pool', 'Gym', 'Sky Garden', 'Security 24/7', 'Yoga Deck', 'Sports Court', 'Party Hall', 'Kids Play Area'],
    description: 'Experience luxury living at its finest with Skyline Residences. Located in the heart of Downtown Metro, this premium residential project offers world-class amenities and stunning views of the city skyline.',
    highlights: [
      'Prime location with excellent connectivity',
      'Premium specifications and finishes',
      'Spacious layouts with natural ventilation',
      'State-of-the-art security systems',
      'Eco-friendly and sustainable design'
    ]
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
    price: '₹3.5 Cr - ₹6 Cr',
    amenities: ['Private Garden', 'Club House', 'Kids Play Area', 'Smart Home', 'Private Pool', 'Servant Quarter', 'Covered Parking', 'Landscaped Garden'],
    description: 'Royal Villas offers an exclusive collection of premium villas nestled in the serene Lakeside Estate. Each villa is designed to provide ultimate privacy and luxury living experience.',
    highlights: [
      'Spacious villas with private gardens',
      'Premium smart home automation',
      'Gated community with 24/7 security',
      'Close to nature with lake views',
      'High-end specifications throughout'
    ]
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
    price: '₹60 Lakhs - ₹4 Cr',
    amenities: ['High-speed Elevators', 'Conference Halls', 'Food Court', 'Parking', 'Power Backup', 'Central AC', 'Security', 'Cafeteria'],
    description: 'Business Park Tower is a state-of-the-art commercial complex in the Financial District, designed for modern businesses. With premium office spaces and world-class infrastructure.',
    highlights: [
      'Strategic location in business hub',
      'Grade A commercial specifications',
      'Ample parking space',
      'High-speed internet connectivity',
      'Professional property management'
    ]
  },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const project = projectsData.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      
      <main className="pt-24">
        {/* Hero Image */}
        <motion.div 
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image 
            src={project.image} 
            alt={project.title}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
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
                      <Bed className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.beds}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Bath className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.baths}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Square className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.area}</div>
                      <div className="text-sm text-muted-foreground">Area</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">{project.completion}</div>
                      <div className="text-sm text-muted-foreground">Completion</div>
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
                    <div className="text-sm text-muted-foreground mb-2">Starting Price</div>
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
                      className="w-full"
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
