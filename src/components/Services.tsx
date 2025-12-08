import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Home, Ruler, Palette, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';

const serviceIcons = [Building2, Home, Ruler, Palette];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { translations } = useContext(LanguageContext);
  const services = translations.services.packages;

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
            {translations.services.title.split(' ')[0]} <span className="text-gradient-gold">{translations.services.title.split(' ')[1]}</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            {translations.services.subtitle}
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
              {translations.services.notice}
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
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
                      <Icon className="w-7 h-7 text-white" />
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
                    {translations.services.choosePlan}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-16 text-center max-w-3xl mx-auto p-8 md:p-10 bg-gradient-to-r from-primary via-primary/90 to-primary rounded-2xl md:rounded-3xl text-white shadow-2xl"
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            {translations.services.cta.title}
          </h3>
          <p className="text-white/90 mb-5 md:mb-6 text-base md:text-lg">
            {translations.services.cta.subtitle}
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90 text-secondary font-semibold px-8 py-4 rounded-full shadow-gold transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {translations.services.cta.button}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
