import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Carousel3D from "@/components/Carousel3D";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Carousel3D />
      <Services />
      <Benefits />
      <Testimonials />
      <CTA />
      <QuoteForm />
      <Footer />
    </main>
  );
}
