import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FarmlandFeatures from "@/components/FarmlandFeatures";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <FarmlandFeatures />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;