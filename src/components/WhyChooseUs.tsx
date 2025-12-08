import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Clock, DollarSign, Award, Leaf, Users } from 'lucide-react';
import StatsCounter from './StatsCounter';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { translations } = useContext(LanguageContext);
  const content = translations.whyChooseUs;

  const usps = [
    { icon: Shield, ...content.usps[0] },
    { icon: Users, ...content.usps[1] },
    { icon: Clock, ...content.usps[2] },
    { icon: Award, ...content.usps[3] },
    { icon: DollarSign, ...content.usps[4] },
    { icon: Leaf, ...content.usps[5] },
  ];

  const counters = [
    { target: 5, label: translations.about.stats.years, suffix: '+' },
    { target: 300, label: translations.about.stats.partners, suffix: '+' },
    { target: 45, label: translations.about.stats.sold, suffix: '' },
    { target: 0, label: translations.about.stats.brokerage, suffix: '%' },
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            {content.title.split(' ')[0]} <span className="text-gradient-gold">{content.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* USPs Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 bg-gradient-to-br from-card to-muted/20 rounded-2xl border border-border hover:border-accent/50 transition-all duration-500 h-full hover:shadow-gold hover:-translate-y-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500 shadow-premium"
                >
                  <usp.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-poppins text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {usp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 p-6 md:p-10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl md:rounded-3xl border border-primary/20"
        >
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="mb-1 md:mb-2 font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                <StatsCounter end={counter.target} suffix={counter.suffix} />
              </div>
              <div className="text-muted-foreground font-medium text-sm md:text-base">{counter.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="font-poppins text-3xl font-bold mb-8">
            {content.guaranteesTitle.split(' ')[0]} <span className="text-gradient-gold">{content.guaranteesTitle.split(' ')[1]}</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {content.guarantees.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="px-6 py-3 bg-card border-2 border-accent/30 rounded-full font-semibold text-sm hover:bg-accent/10 transition-colors"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
