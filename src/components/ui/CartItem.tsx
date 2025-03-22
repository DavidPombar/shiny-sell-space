import { Minus, Plus, X } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { analyticsHelper } from "@/utils/analytics";

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityUpdate = (newQuantity: number) => {
    const quantityDiff = newQuantity - quantity;
    if (quantityDiff > 0) {
      analyticsHelper.pushAddToCart(product, quantityDiff);
    } else if (quantityDiff < 0) {
      analyticsHelper.pushRemoveFromCart(product, Math.abs(quantityDiff));
    }
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    analyticsHelper.pushRemoveFromCart(product, quantity);
    removeItem(product.id);
  };

  return (
    <div className="flex py-4 border-b border-gray-100 animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-black -mt-1 -mr-1"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-gray-500 text-xs mb-2">{product.category}</p>
        
        {/* Price and Quantity */}
        <div className="flex justify-between items-center">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center border border-gray-200 rounded">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-black"
              onClick={() => handleQuantityUpdate(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">{quantity}</span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-black"
              onClick={() => handleQuantityUpdate(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
