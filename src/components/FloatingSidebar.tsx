'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, ArrowUp, X, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QRCode from 'qrcode.react';

const FloatingSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const quickActions = [
    {
      icon: Share2,
      label: 'Share Website',
      href: '#',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: () => setShowQrCode(true)
    },
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+919087048878',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      icon: Mail,
      label: 'Email Us',
      href: 'mailto:contact@zerobrokr.com',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/919087048878',
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
    },
  ];

  return (
    <>
      {/* This is a hack to make sure tailwind includes these classes */}
      <div className="hidden bg-blue-500 hover:bg-blue-600 bg-green-500 hover:bg-green-600 bg-red-500 hover:bg-red-600 bg-emerald-500 hover:bg-emerald-600"></div>

      {/* QR Code Dialog */}
      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins">Share ZeroBrokr</DialogTitle>
            <DialogDescription>
              Scan the QR code below to open zerobrokr.com on another device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCode value="https://zerobrokr.com" size={200} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed right-4 md:right-6 bottom-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-secondary shadow-2xl shadow-accent/50 hover:scale-110 transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed right-4 md:right-6 bottom-24 z-40 flex flex-col items-end gap-3"
          >
            {/* Scroll to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="group"
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Scroll to Top
                    </motion.span>
                    <Button
                      onClick={scrollToTop}
                      size="icon"
                      className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium hover:scale-110 transition-all duration-300"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3, delay: (quickActions.length - 1 - index) * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (quickActions.length - 1 - index) * 0.1 }}
                    className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {action.label}
                  </motion.span>
                  <Button
                    size="icon"
                    onClick={action.action}
                    asChild={!action.action}
                    className={`w-12 h-12 rounded-full ${action.color} ${action.hoverColor} text-white shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer`}
                  >
                    {action.action ? (
                        <action.icon className="w-5 h-5" />
                    ) : (
                      <a href={action.href} target="_blank" rel="noopener noreferrer">
                        <action.icon className="w-5 h-5" />
                      </a>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSidebar;
