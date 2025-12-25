'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Shirt, Smartphone, Hotel, Home, Utensils } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import cardImage from '@/assets/card.png';

const discountItems = [
  { icon: Shirt, title: "Dress Shop", discount: "2/3%" },
  { icon: Smartphone, title: "Mobile Shop", discount: "2/3%" },
  { icon: ShoppingCart, title: "Grocery Store", discount: "2/3%" },
  { icon: Hotel, title: "Hotel", discount: "2/3%" },
  { icon: Home, title: "Home Appliances", discount: "2/3%" },
  { icon: Utensils, title: "Metal Store", discount: "2/3%" },
];

const SpecialDiscounts = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="discounts" ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-6xl font-bold mb-4">
            Exclusive <span className="text-gradient-gold">Member Discounts</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Enjoy special discounts at our partner stores with your ₹999 membership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Column */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Image 
                    src={cardImage} 
                    alt="Membership Card"
                    className="rounded-lg shadow-premium"
                />
            </motion.div>

            {/* Content Column */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {discountItems.map((item, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                    <Card className="text-center p-4 md:p-6 bg-card rounded-lg shadow-premium border border-border hover:shadow-gold transition-all duration-300 hover:scale-105 h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            <item.icon className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-accent" />
                            <CardTitle className="text-base md:text-lg font-semibold mb-1 md:mb-2">{item.title}</CardTitle>
                            <div className="font-poppins text-2xl md:text-3xl font-bold text-primary">
                                {item.discount}
                            </div>
                            <div className="text-muted-foreground text-xs md:text-sm">OFF</div>
                        </div>
                    </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialDiscounts;
