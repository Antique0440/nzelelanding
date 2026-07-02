import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Dynamic transparent-to-solid navigation header */}
      <Header />
      
      <main className="flex-grow">
        {/* Full-bleed hero waitlist section */}
        <Hero />
        
        {/* Asymmetric brand introduction / statement */}
        <About />
        
        {/* Pre-launch artwork previews */}
        <Gallery />
        
        {/* Detailed waitlist signup block */}
        <WaitlistForm />
      </main>
      
      {/* Brand footer */}
      <Footer />
    </>
  );
}
