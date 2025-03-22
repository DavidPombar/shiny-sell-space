import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductById } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Cart from "./Cart";
import { trackViewItem, trackAddToCart } from "@/utils/analytics";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  // Get product data
  const product = id ? getProductById(id) : undefined;

  // Redirect if product doesn't exist
  useEffect(() => {
    if (!product) {
      navigate("/products");
    } else {
      // Track product view
      trackViewItem(product);
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  // Handle quantity changes
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart
  const handleAddToCart = () => {
    addItem(product, quantity);
    trackAddToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{product.name} - MINIMAL</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="md:sticky md:top-24 md:self-start">
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div>
                <h5 className="text-gray-500 text-sm capitalize mb-1">{product.category}</h5>
                <h1 className="text-3xl md:text-4xl font-medium mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.reviews.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.reviews.rating} ({product.reviews.count} reviews)
                  </span>
                </div>

                <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
                
                <p className="text-gray-600 mb-8">{product.description}</p>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-6 mb-8">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center border border-gray-200 rounded-md w-fit">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="w-full sm:w-auto px-8"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>

              {/* Product Information Tabs */}
              <Tabs defaultValue="details" className="w-full mt-8">
                <TabsList className="w-full border-b rounded-none bg-transparent justify-start space-x-8">
                  <TabsTrigger 
                    value="details"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-1 pb-2"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specs"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-1 pb-2"
                  >
                    Specifications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <p className="text-gray-600">{product.details}</p>
                </TabsContent>
                
                <TabsContent value="specs" className="pt-6">
                  <div className="space-y-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
    </div>
  );
};

export default ProductDetail;
