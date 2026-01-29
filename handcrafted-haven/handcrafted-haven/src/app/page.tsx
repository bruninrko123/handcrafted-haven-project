import Image from "next/image";
import styles from "./page.module.css";
import AboutSection from "@/app/ui/aboutSection";
import Footer from "@/app/ui/footer";
import Navbar from '@/app/ui/Navbar';
import HeroSection from "@/app//ui/HeroSection";
import CallToAction from "@/app/ui/callToAction";
import CommunityValues from '@/app/ui/CommunityValues';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CommunityValues />
      <AboutSection />
      <CallToAction />
      <Footer />
    </main>
  );
}