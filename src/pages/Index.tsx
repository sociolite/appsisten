import { useLenis } from '@/hooks/useLenis';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { LogoMarquee } from '@/components/landing/LogoMarquee';
import { SocialProof } from '@/components/landing/SocialProof';
import { AIFeatures } from '@/components/landing/AIFeatures';
import { Integrations } from '@/components/landing/Integrations';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { AnimatedBackground } from '@/components/ui/animated-background';

const Index = () => {
  useLenis();

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <AIFeatures />
        <Integrations />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
