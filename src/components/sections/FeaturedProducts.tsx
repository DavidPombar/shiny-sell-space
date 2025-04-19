import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("featured-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section 
      id="featured-section"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h5 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Curated Selection</h5>
            <h2 className="text-3xl md:text-4xl font-medium">Featured Products</h2>
          </div>
          
          <Link 
            to="/products" 
            className="hidden md:flex items-center text-sm font-medium hover:underline"
            onClick={() => window.dataLayer.push({ event: "cta_view_all" })}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`transform ${
                isVisible 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-8 opacity-0"
              } transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/products" 
            className="inline-flex items-center text-sm font-medium hover:underline"
            onClick={() => window.dataLayer.push({ event: "cta_view_all" })}
          >
            View All Products
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
