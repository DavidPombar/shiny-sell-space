import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629429407135-9c6cf301b327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Hero background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-sm font-medium tracking-wide mb-6 animate-fade-in">
            Discover the New Collection
          </span>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium leading-tight tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Technology with Intention
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 max-w-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Discover our thoughtfully designed products that blend seamlessly into your life.
          </p>
          
          <div className="space-x-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/products" onClick={() => window.dataLayer.push({ event: "cta_shop_now" })}>
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/about" onClick={() => window.dataLayer.push({ event: "cta_learn_more" })}>
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
