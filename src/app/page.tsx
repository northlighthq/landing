import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/landing/Contact";
import { Hero } from "@/components/landing/Hero";
import { Boreal } from "@/components/landing/Boreal";
import { Principles } from "@/components/landing/Principles";
import { Process } from "@/components/landing/Process";
import { Statement } from "@/components/landing/Statement";
import { Services } from "@/components/landing/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Boreal />
        <Process />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
