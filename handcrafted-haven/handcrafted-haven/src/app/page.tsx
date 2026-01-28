import Image from "next/image";
import styles from "./page.module.css";
import AboutSection from './ui/AboutSection';
import Footer from './ui/Footer';
import Navbar from './ui/Navbar';
import HeroSection from './ui/HeroSection';
import CallToAction from './ui/CallToAction';
import CommunityValues from './ui/CommunityValues';


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