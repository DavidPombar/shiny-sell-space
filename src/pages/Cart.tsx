
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/ui/CartItem";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    totalItems, 
    totalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  // Prevent body scrolling when cart is open
  useEffect(() => {
    const body = document.body;
    if (isCartOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    toggleCart(); // Close the cart
    navigate("/checkout"); // Navigate to checkout page
  };

  return (
    <>
      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-medium">Your Cart</h2>
              {totalItems > 0 && (
                <span className="bg-gray-100 text-xs rounded-full px-2 py-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleCart}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button onClick={toggleCart}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-1">
          {items.map((item, index) => (
            <CartItem
              key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}-${index}`}
              product={item.product}
              quantity={item.quantity}
              selectedVariants={item.selectedVariants}
            />
          ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-4">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <Button className="w-full mb-2" onClick={handleCheckout}>
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
};

export default Cart;
