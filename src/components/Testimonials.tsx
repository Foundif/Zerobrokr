import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aravind',
    role: 'Buyer',
    content: 'Found my dream villa without paying any brokerage. Super smooth process!',
    rating: 5,
    project: 'Premium Villa Purchase',
  },
  {
    id: 2,
    name: 'Vel Builders',
    role: 'Builder Partner',
    content: 'Their marketing sold our plots faster than expected. Highly recommended.',
    rating: 5,
    project: 'DTCP Plot Sales',
  },
  {
    id: 3,
    name: 'Rajesh',
    role: 'Property Seller',
    content: 'Professional team. Fast results. Hassle-free experience.',
    rating: 5,
    project: 'Commercial Building Sale',
  },
  {
    id: 4,
    name: 'First-time Buyer',
    role: 'Homeowner',
    content: 'Got my dream home under budget with their loan coordination support. Amazing service!',
    rating: 5,
    project: '2BHK Apartment Purchase',
  },
];

const clientLogos = [
  { name: 'Tech Corp', width: 120 },
  { name: 'Finance Group', width: 140 },
  { name: 'Retail Chain', width: 100 },
  { name: 'Healthcare', width: 130 },
  { name: 'Education', width: 110 },
  { name: 'Hospitality', width: 125 },
];

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Client <span className="text-gradient-gold">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Hear what our valued clients say about their experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card p-6 md:p-8 rounded-2xl shadow-premium hover:shadow-gold transition-all duration-500 border border-border relative group hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/20 group-hover:text-accent/40 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="border-t border-border pt-4">
                <div className="font-poppins font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{testimonial.role}</div>
                <div className="text-xs text-accent font-semibold">
                  Project: {testimonial.project}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-8">
            300+ Builder Partners With Us
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div 
                  className="bg-muted px-8 py-4 rounded-lg font-bold text-muted-foreground hover:text-foreground transition-colors"
                  style={{ width: logo.width }}
                >
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
