import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Success message (in a real app, you'd send this to a backend)
    toast.success('Thank you! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
  };

  return (
    <>
      <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Let's discuss how we can bring your vision to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-premium">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 90870 48878</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-premium">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@zerobrokr.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-premium">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Website</h3>
                    <p className="text-muted-foreground">www.zerobrokr.com</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden border border-border shadow-premium">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-accent" />
                    <div className="font-semibold">Interactive Map</div>
                    <div className="text-sm">Visit us at our office</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card p-6 md:p-8 lg:p-10 rounded-2xl shadow-premium border border-border">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <Input 
                        placeholder="John Doe" 
                        className="border-border focus:border-accent transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <Input 
                        placeholder="+1 (555) 000-0000" 
                        className="border-border focus:border-accent transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="border-border focus:border-accent transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Property Type</label>
                    <select 
                      className="w-full px-4 py-3 rounded-md border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 bg-background transition-colors"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    >
                      <option value="">Select Property Type</option>
                      <option value="house">House Purchase</option>
                      <option value="land">Land Purchase</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="villa">Villa/Premium Property</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Message *</label>
                    <Textarea 
                      placeholder="Tell us about your property requirements..." 
                      rows={5}
                      className="border-border focus:border-accent transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold shadow-premium group hover:shadow-gold transition-all"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Hidden on mobile when floating sidebar is present */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showStickyCTA ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block fixed bottom-0 left-0 right-0 bg-primary text-white py-4 px-4 shadow-2xl z-40 border-t-4 border-accent"
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-playfair font-bold text-lg">Ready to Find Your Dream Property?</div>
            <div className="text-sm text-white/80">Zero brokerage - Get started today</div>
          </div>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-secondary font-semibold shadow-gold hover:scale-105 transition-transform"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Property Details
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;
