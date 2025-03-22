import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import Cart from "./Cart";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyticsHelper } from "@/utils/analytics";

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
    // Track view_item_list event when component mounts or category changes
    analyticsHelper.pushViewItemList(filteredProducts, selectedCategory || "All Products");
  }, [filteredProducts, selectedCategory]);

  useEffect(() => {
    // Close filter sidebar when selecting a category on mobile
    if (selectedCategory && window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    analyticsHelper.pushFilter("category", category || "all");
  };

  return (
    <>
      <Helmet>
        <title>Products | MINIMAL</title>
        <meta name="description" content="Browse our collection of products" />
      </Helmet>

      <Navbar />
      <Cart />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-medium">All Products</h1>
            
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <aside
              className={`fixed inset-y-0 left-0 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 ${
                isFilterOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Categories</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Products;
