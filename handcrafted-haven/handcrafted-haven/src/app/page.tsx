import Image from "next/image";
import styles from "./page.module.css";
import AboutSection from "@/app/ui/aboutSection";
import Footer from '@/app/ui/footer'

export default function Home() {
  return (
    <>
      <AboutSection />

      {/* <CallToAction /> */}

      <Footer />
    </>
  );
}
