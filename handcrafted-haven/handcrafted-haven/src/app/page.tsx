import Image from "next/image";
import styles from "./page.module.css";
import AboutSection from "@/app/ui/aboutSection";
import Footer from "@/app/ui/footer";
import Navbar from '@/app/ui/navbar';
import HeroSection from "@/app/ui/heroSection";
import CallToAction from "@/app/ui/callToAction";
import CommunityValues from '@/app/ui/communityValues';


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