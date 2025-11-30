import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, Shield, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Clock, value: '5+', label: 'Years in Real Estate' },
  { icon: Award, value: '300+', label: 'Builder Partners' },
  { icon: Shield, value: '0%', label: 'Brokerage Fee' },
  { icon: TrendingUp, value: '45', label: 'Properties Sold' },
];

const values = [
  { title: 'Zero Brokerage', description: 'Direct owner deals with no hidden charges or commissions' },
  { title: 'Verified Properties', description: 'All listings thoroughly verified for authenticity' },
  { title: 'Full Support', description: 'Complete A to Z assistance from search to handover' },
  { title: 'Fast Closing', description: 'Quick property transactions with hassle-free process' },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            About <span className="text-gradient-gold">ZeroBrokr</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            More than 5 years in real estate with 300+ builder partnerships
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
              <div className="font-playfair text-4xl md:text-5xl font-bold mb-2 text-primary">
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
              <h3 className="font-playfair text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
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
          <h3 className="font-playfair text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To revolutionize property transactions by eliminating brokerage fees and providing transparent, 
            efficient service. We help you buy, sell, and invest with confidence, speed, and zero commission.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
