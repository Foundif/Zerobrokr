'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Marquee from '@/components/Marquee';
import Link from 'next/link';
import logo from '@/assets/zerobrokr-logo.png';

const navigation = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
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
        <Marquee text="Site visits by appointment only. Please inform 5 hours before for booking." />
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="/">
                <Image 
                  src={logo}
                  alt="ZeroBrokr - No Commission"
                  width={224}
                  height={56}
                  className={cn(
                    "h-14 w-auto transition-all duration-300",
                    !isScrolled && "brightness-[10] grayscale"
                  )}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors relative group",
                      textColorClass,
                      isScrolled ? "hover:bg-muted" : "hover:bg-white/10"
                    )}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
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
                asChild
              >
                <Link href="/#contact">Get Quote</Link>
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
              <SheetContent side="right" className="w-full sm:w-80 bg-gradient-to-b from-background via-background to-muted/50 backdrop-blur-xl border-l-2 border-accent/20 p-0">
                <div className="flex flex-col h-full pt-8 relative">
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center mb-8 relative z-10 px-6">
                    <Image 
                      src={logo}
                      alt="ZeroBrokr - No Commission"
                      width={224}
                      height={56}
                      className="h-14 w-auto"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-2 relative z-10 overflow-y-auto px-6">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-left px-4 py-4 text-lg font-medium rounded-xl hover:bg-muted transition-all duration-300 group block"
                        >
                          <span className="flex items-center justify-between">
                            {item.name}
                            <span className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="border-t border-border/50 p-6 space-y-4 relative z-10 mt-auto">
                    <a
                      href="tel:+919087048878"
                      className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="font-semibold">contact@zerobrokr.com</div>
                      </div>
                    </a>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-secondary font-semibold py-6 shadow-gold"
                      asChild
                    >
                      <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Get Free Quote</Link>
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
