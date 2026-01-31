import Image from "next/image";
import styles from "./page.module.css";
import AboutSection from "@/app/ui/aboutSection";
import Footer from "@/app/ui/footer";
import Navbar from "@/app/ui/Navbar";
import SampleGalery from "@/app/ui/sampleGalery";
import HeroSection from "@/app/ui/heroSection";
import CallToAction from "@/app/ui/callToAction";

export default function Home() {
  return (
    <main className="bg-yellow-50">
      <Navbar />
      <HeroSection />
      <SampleGalery />
      <AboutSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
