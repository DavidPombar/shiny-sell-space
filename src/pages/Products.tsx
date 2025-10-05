
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import Cart from "./Cart";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Apply filters
  let filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  useEffect(() => {
    // Close filter sidebar when changes are made on mobile
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  }, [selectedCategory, priceRange]);
  
  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
    setSortBy("featured");
  };

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
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Products
                </Button>
              </div>
              
              {/* Sidebar Filter - Desktop */}
              <div className="w-64 hidden md:block">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Categorías</h3>
                    <ul className="space-y-2">
                      <li>
                        <button
                          className={`text-sm ${
                            selectedCategory === null
                              ? "font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          Todos los productos
                        </button>
                      </li>
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            className={`text-sm capitalize ${
                              selectedCategory === category
                                ? "font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Rango de precio</h3>
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </div>
              
              {/* Mobile Filter Sidebar */}
              <div
                className={`fixed inset-0 z-50 bg-background p-6 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
                  isFilterOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      Categorías
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <button
                          className={`text-base ${
                            selectedCategory === null
                              ? "font-medium text-foreground"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          Todos los productos
                        </button>
                      </li>
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            className={`text-base capitalize ${
                              selectedCategory === category
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      Rango de precio
                    </h4>
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedCategory && (
                      <span className="text-sm bg-secondary py-1 px-3 rounded-full capitalize flex items-center gap-2">
                        {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {(priceRange[0] !== 0 || priceRange[1] !== maxPrice) && (
                      <span className="text-sm bg-secondary py-1 px-3 rounded-full flex items-center gap-2">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button
                          onClick={() => setPriceRange([0, maxPrice])}
                          className="hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                      <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {sortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No se encontraron productos con estos filtros.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Limpiar filtros
                    </Button>
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
