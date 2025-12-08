'use client'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/zerobrokr-logo.png';
import { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/language-context';

const Footer = () => {
  const { translations } = useContext(LanguageContext);
  const content = translations.footer;
  const header = translations.header;

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Image 
              src={logo}
              alt="ZeroBrokr - No Commission"
              width={192}
              height={48}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              {content.description}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/ZeroBrokrcom/61584295989641/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@ZeroBrokr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/zerobrokr/?utm_source=qr&igsh=MWMzbmk2bTlvZjgxeA%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{content.quickLinks}</h4>
            <ul className="space-y-3">
              {content.links.map((link, i) => (
                <li key={i}><a href="#" className="text-gray-300 hover:text-accent transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">{content.ourServices}</h4>
            <ul className="space-y-3">
              {content.services.map((service, i) => (
                 <li key={i}><a href="/#services" className="text-gray-300 hover:text-accent transition-colors">{service}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{content.contactUs}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-300">www.zerobrokr.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-gray-300">+91 90870 48878</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-gray-300">contact@zerobrokr.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-300 text-sm">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-accent transition-colors">{content.privacy}</a>
              <a href="#" className="hover:text-accent transition-colors">{content.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
