import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Cart from "./Cart";
import { trackPageView } from "@/lib/analytics";

const Index = () => {
  // Track page view on component mount
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <Helmet>
        <title>MINIMAL - Premium Tech Products</title>
        <meta name="description" content="Discover premium tech products with an emphasis on design, quality, and simplicity." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <FeaturedProducts />
          
          {/* Additional sections can be added here */}
        </main>
        
        <Footer />
        <Cart />
      </div>
    </>
  );
};

export default Index;
