import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import zeroBrokrLogo from '@/assets/zerobrokr-logo.png';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img 
              src={zeroBrokrLogo}
              alt="ZeroBrokr - No Commission"
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              More than 5 years in real estate. Your trusted partner with 300+ builder partnerships and zero brokerage guarantee.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Our Projects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Zero Brokerage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Pickup & Drop Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Fast Closing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Verified Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Loan Assistance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
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
            <p>&copy; 2024 ZeroBrokr. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
