import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { analyticsHelper } from "@/utils/analytics";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    analyticsHelper.pushAddToCart(product);
  };

  const handleProductClick = () => {
    analyticsHelper.pushViewItem(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100 mb-4">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isImageLoaded ? "blur-0" : "blur-sm"
          } ${isHovered ? "scale-105" : "scale-100"}`}
        />
        
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 rounded-full w-10 h-10 p-0 bg-white text-black shadow-md hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          size="icon"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <h3 className="text-base font-medium mb-1 truncate">{product.name}</h3>
      
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm truncate">{product.category}</p>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
