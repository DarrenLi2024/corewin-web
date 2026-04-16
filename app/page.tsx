import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import AboutSection from '@/components/AboutSection';
import CategoryPreview from '@/components/CategoryPreview';
import ApplicationSection from '@/components/ApplicationSection';
import WhyCoreWinSection from '@/components/WhyCoreWinSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main
      style={{
        background: 'var(--color-bg-deep)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <CategoryPreview />
      <ApplicationSection />
      <WhyCoreWinSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
