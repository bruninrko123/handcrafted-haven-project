
import AboutSection from "@/app/ui/aboutSection";
import SampleGalery from "@/app/ui/sampleGalery";
import HeroSection from "@/app/ui/HeroSection";
import CallToAction from "@/app/ui/callToAction";

export default function Home() {
  return (
    <main className="bg-yellow-50 full-bleed">
      <HeroSection />
      <SampleGalery />
      <AboutSection />
      <CallToAction />
    </main>
  );
}
