import { Logo } from '@/components/logo';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { href: '#properties', label: 'Properties' },
    { href: '#agents', label: 'Agents' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#' },
    { icon: <Twitter className="h-5 w-5" />, href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  ]

  return (
    <footer className="bg-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Your trusted partner in finding the perfect property. Experience excellence in real estate with ZeroBrokr.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.icon}
                  <span className="sr-only">Social media link</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} ZeroBrokr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
