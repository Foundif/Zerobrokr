import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Properties } from '@/components/sections/properties';
import { Agents } from '@/components/sections/agents';
import { Testimonials } from '@/components/sections/testimonials';
import { AIRecommendations } from '@/components/sections/ai-recommendations';
import { MapSection } from '@/components/sections/map-section';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Properties />
        <AIRecommendations />
        <MapSection />
        <Agents />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
