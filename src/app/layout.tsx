import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from './contexts/language-context';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'ZeroBrokr – Smart Real Estate Platform',
  description: 'ZeroBrokr is a modern real estate platform offering seamless property discovery, listing management, and advanced customer engagement tools.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body className={poppins.className}>
        <LanguageProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <SonnerToaster />
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
