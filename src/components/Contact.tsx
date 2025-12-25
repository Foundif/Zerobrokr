'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { LanguageContext } from '@/app/contexts/language-context';

const Contact = () => {
  const { translations } = useContext(LanguageContext);
  const content = translations.contact;

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
      <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-muted/30 to-background pb-32 md:pb-24">
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
                    <h3 className="font-poppins font-bold text-lg mb-1">{content.phone}</h3>
                    <p className="text-muted-foreground">+91 8807970430</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-premium">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-1">{content.email}</h3>
                    <p className="text-muted-foreground">Zerobrokr@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-premium">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-1">{content.website}</h3>
                    <p className="text-muted-foreground">www.zerobrokr.com</p>
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
                <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-6">{content.form.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">{content.form.name}</label>
                      <Input 
                        placeholder={content.form.namePlaceholder}
                        className="border-border focus:border-accent transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{content.form.phone}</label>
                      <Input 
                        placeholder={content.form.phonePlaceholder}
                        className="border-border focus:border-accent transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{content.form.email}</label>
                    <Input 
                      type="email" 
                      placeholder={content.form.emailPlaceholder}
                      className="border-border focus:border-accent transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{content.form.propertyType}</label>
                    <select 
                      className="w-full px-4 py-3 rounded-md border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 bg-background transition-colors"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    >
                      <option value="">{content.form.propertyTypePlaceholder}</option>
                      {content.form.propertyTypes.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{content.form.message}</label>
                    <Textarea 
                      placeholder={content.form.messagePlaceholder}
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
                    {content.form.submit}
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
            <div className="font-poppins font-bold text-lg">{content.sticky.title}</div>
            <div className="text-sm text-white/80">{content.sticky.subtitle}</div>
          </div>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-secondary font-semibold shadow-gold hover:scale-105 transition-transform"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {content.sticky.button}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;
