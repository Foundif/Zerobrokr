'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import zeroBrokrLogo from '@/assets/zerobrokr-logo.png';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    {
      'bg-transparent': !isScrolled,
      'bg-background/95 backdrop-blur-lg shadow-premium border-b border-border': isScrolled,
    }
  );
  
  const textColorClass = cn({
    'text-white': !isScrolled,
    'text-foreground': isScrolled,
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={headerClasses}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image 
                src={zeroBrokrLogo}
                alt="ZeroBrokr - No Commission"
                className="h-16 w-auto"
                unoptimized
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors relative group",
                    textColorClass,
                    isScrolled ? "hover:bg-muted" : "hover:bg-white/10"
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex items-center space-x-4"
            >
              <a href="tel:+919087048878" className={cn("text-sm flex items-center gap-2 transition-colors hover:text-accent", textColorClass)}>
                <Phone className="w-4 h-4" />
                <span className="font-semibold">+91 90870 48878</span>
              </a>
              <Button 
                className="bg-accent hover:bg-accent/90 text-secondary font-semibold shadow-gold"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Quote
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("lg:hidden", textColorClass, !isScrolled && "hover:bg-white/10 hover:text-white")}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-gradient-to-b from-background via-background to-muted/50 backdrop-blur-xl border-l-2 border-accent/20">
                <div className="flex flex-col h-full pt-8 relative">
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  {/* Mobile Logo */}
                  <div className="flex items-center mb-12 relative z-10">
                    <Image 
                      src={zeroBrokrLogo}
                      alt="ZeroBrokr - No Commission"
                      className="h-14 w-auto"
                      unoptimized
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-2 relative z-10">
                    {navigation.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left px-6 py-4 text-lg font-medium rounded-xl hover:bg-muted transition-all duration-300 group"
                      >
                        <span className="flex items-center justify-between">
                          {item.name}
                          <span className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </motion.button>
                    ))}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="border-t border-border/50 pt-6 space-y-4 relative z-10">
                    <a
                      href="tel:+919087048878"
                      className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Call Us</div>
                        <div className="font-semibold">+91 90870 48878</div>
                      </div>
                    </a>
                    <a
                      href="mailto:contact@zerobrokr.com"
                      className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="font-semibold">contact@zerobrokr.com</div>
                      </div>
                    </a>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-secondary font-semibold py-6 shadow-gold"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get Free Quote
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  );
};

export default Header;
