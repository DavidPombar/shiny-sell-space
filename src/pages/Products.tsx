import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import Cart from "./Cart";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  useEffect(() => {
    window.dataLayer.push({ event: "page_view", page: "products" });
    // Close filter sidebar when selecting a category on mobile
    if (selectedCategory && window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  }, [selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Products - MINIMAL</title>
        <meta name="description" content="Browse our collection of premium tech products." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">All Products</h1>
              <p className="text-gray-600 max-w-2xl">
                Browse our curated collection of premium tech products designed with an emphasis on quality, functionality, and minimalist aesthetics.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center" 
                  onClick={() => {
                    setIsFilterOpen(true);
                    window.dataLayer.push({ event: "filter_open" });
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Products
                </Button>
              </div>
              
              {/* Sidebar Filter - Desktop */}
              <div className="w-64 hidden md:block">
                <div className="sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        className={`text-sm ${selectedCategory === null ? "font-medium text-black" : "text-gray-600 hover:text-black"}`}
                        onClick={() => {
                          setSelectedCategory(null);
                          window.dataLayer.push({ event: "filter_clear" });
                        }}
                      >
                        All Products
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={`text-sm capitalize ${selectedCategory === category ? "font-medium text-black" : "text-gray-600 hover:text-black"}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            window.dataLayer.push({ event: "filter_category", category });
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Mobile Filter Sidebar */}
              <div
                className={`fixed inset-0 z-50 bg-white p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
                  isFilterOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Filter</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                  Categories
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      className={`text-base ${selectedCategory === null ? "font-medium text-black" : "text-gray-600"}`}
                      onClick={() => {
                        setSelectedCategory(null);
                        window.dataLayer.push({ event: "filter_clear" });
                      }}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`text-base capitalize ${selectedCategory === category ? "font-medium text-black" : "text-gray-600"}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          window.dataLayer.push({ event: "filter_category", category });
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Products Grid */}
              <div className="flex-1">
                {selectedCategory && (
                  <div className="mb-6 flex items-center">
                    <span className="text-sm bg-gray-100 py-1 px-3 rounded-full capitalize">
                      {selectedCategory}
                    </span>
                    <button
                      className="ml-2 text-xs text-gray-500 hover:text-black"
                      onClick={() => {
                        setSelectedCategory(null);
                        window.dataLayer.push({ event: "filter_clear" });
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No products found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        <Cart />
      </div>
    </>
  );
};

export default Products;
