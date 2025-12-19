import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, Shield, TrendingUp } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { translations } = useContext(LanguageContext);

  const stats = [
    { icon: Clock, value: '10+', label: translations.about.stats.years },
    { icon: Award, value: '500+', label: translations.about.stats.partners },
    { icon: Shield, value: '0%', label: translations.about.stats.brokerage },
    { icon: TrendingUp, value: '150', label: translations.about.stats.sold },
  ];

  const values = translations.about.values;

  return (
    <section id="about" ref={ref} className="pt-12 pb-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            {translations.about.title1} <span className="text-gradient-gold">ZeroBrokr</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            {translations.about.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-lg shadow-premium border border-border hover:shadow-gold transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <div className="font-poppins text-4xl md:text-5xl font-bold mb-2 text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="p-8 bg-gradient-to-br from-card to-muted/30 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <h3 className="font-poppins text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center max-w-4xl mx-auto p-10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/20"
        >
          <h3 className="font-poppins text-3xl font-bold mb-4">{translations.about.mission.title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {translations.about.mission.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
