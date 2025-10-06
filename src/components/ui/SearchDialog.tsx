import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/products";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const navigate = useNavigate();

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  
  const maxPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = products.filter((product) => {
    const textMatch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return textMatch && categoryMatch && priceMatch;
  });

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    onOpenChange(false);
    setSearchQuery("");
  };
  
  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="sr-only">Buscar productos</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="px-6 pb-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Filtros</h3>
            <button 
              onClick={resetFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Limpiar
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Categoría
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Rango de precio
              </label>
              <div className="space-y-2">
                <Slider
                  min={0}
                  max={maxPrice}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-240px)] px-6 pb-6">
          {searchQuery && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-3">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </p>
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate capitalize">
                          {product.category}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron productos con estos filtros
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              Escribe para buscar productos
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
