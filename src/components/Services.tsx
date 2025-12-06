import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Home, Ruler, Palette, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Building2,
    title: 'Basic Package',
    price: '₹599',
    description: 'Perfect for nearby properties within 10km.',
    features: ['3 House/Land Site Visits', 'Pickup & Drop Service', '1 Site Visit Support', '1 Register Office Visit', 'Below 10Km Only']
  },
  {
    icon: Home,
    title: 'Standard Package',
    price: '₹799',
    description: 'Extended coverage for properties 10-15km away.',
    features: ['3 House/Land Site Visits', 'Pickup & Drop Service', '1 Site Visit Support', '1 Register Office Visit', 'Above 10Km to 15Km']
  },
  {
    icon: Ruler,
    title: 'Premium Package',
    price: '₹999',
    description: 'More visits, more options nearby.',
    features: ['5 House/Land Site Visits', 'Pickup & Drop Service', '1 Site Visit Support', '1 Register Office Visit', 'Below 10Km Only']
  },
  {
    icon: Palette,
    title: 'Deluxe Package',
    price: '₹1299',
    description: 'Our most comprehensive package.',
    features: ['5 House/Land Site Visits', 'Pickup & Drop Service', '1 Site Visit Support', '1 Register Office Visit', 'Above 10Km to 15Km']
  },
];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" ref={ref} className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Service <span className="text-gradient-gold">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Direct Owner, No Brokerage, 75% Home Loan - We Start With A to Z Support With You
          </p>
        </motion.div>

        {/* Booking Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto bg-primary/10 border-2 border-primary/30 rounded-xl p-4 flex items-center justify-center gap-3">
            <Info className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="font-semibold text-primary text-center">
              Site visits are by appointment only. Please inform 5 hours before booking.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="group"
            >
              <div className="bg-card p-8 rounded-2xl shadow-premium hover:shadow-gold transition-all duration-500 border border-border hover:border-accent/50 h-full flex flex-col">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-gold flex-shrink-0"
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-bold group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="my-4">
                  <span className="text-4xl font-bold font-poppins">{service.price}</span>
                  <span className="text-muted-foreground text-sm">/package</span>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm h-12">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 + 0.5 }}
                      className="flex items-center text-sm gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Button */}
                <Button 
                  className="w-full mt-auto bg-primary hover:bg-primary/90 group-hover:bg-accent group-hover:text-secondary transition-colors"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Choose Plan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-16 text-center max-w-3xl mx-auto p-8 md:p-10 bg-gradient-to-r from-primary via-primary/90 to-primary rounded-2xl md:rounded-3xl text-white shadow-2xl"
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Start Your Property Journey?
          </h3>
          <p className="text-white/90 mb-5 md:mb-6 text-base md:text-lg">
            Let us help you buy & sell, with transparency and speed
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90 text-secondary font-semibold px-8 py-4 rounded-full shadow-gold transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
