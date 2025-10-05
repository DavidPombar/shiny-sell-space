
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/products";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: { [key: string]: string };
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedVariants?: { [key: string]: string }) => void;
  removeItem: (productId: string, selectedVariants?: { [key: string]: string }) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariants?: { [key: string]: string }) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Add an item to the cart
  const addItem = (product: Product, quantity = 1, selectedVariants?: { [key: string]: string }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => {
          if (item.product.id !== product.id) return false;
          if (!selectedVariants && !item.selectedVariants) return true;
          if (!selectedVariants || !item.selectedVariants) return false;
          return JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants);
        }
      );

      if (existingItem) {
        toast.success(`Updated quantity for ${product.name}`);
        return prevItems.map((item) =>
          item.product.id === product.id && 
          JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to your cart`);
        return [...prevItems, { product, quantity, selectedVariants }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (productId: string, selectedVariants?: { [key: string]: string }) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => {
        if (item.product.id !== productId) return false;
        if (!selectedVariants) return true;
        return JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants);
      });
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.product.name} from your cart`);
      }
      return prevItems.filter((item) => {
        if (item.product.id !== productId) return true;
        if (!selectedVariants) return false;
        return JSON.stringify(item.selectedVariants) !== JSON.stringify(selectedVariants);
      });
    });
  };

  // Update quantity of an item
  const updateQuantity = (productId: string, quantity: number, selectedVariants?: { [key: string]: string }) => {
    if (quantity < 1) {
      removeItem(productId, selectedVariants);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id !== productId) return item;
        if (!selectedVariants && !item.selectedVariants) return { ...item, quantity };
        if (JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
