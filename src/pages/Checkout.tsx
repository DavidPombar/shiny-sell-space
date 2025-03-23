import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Check, ArrowLeft } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { trackPageView, trackEcommerceEvent, trackUserInteraction } from "@/lib/analytics";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Track page view and checkout steps
  useEffect(() => {
    // Track page view
    trackPageView();

    // Track checkout step 1 (shipping info)
    if (items.length > 0) {
      trackEcommerceEvent('begin_checkout', {
        currency: 'EUR',
        value: totalPrice,
        items: items.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          item_category: item.product.category
        }))
      });
    }
  }, []);

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  // If cart is empty, redirect to products page
  if (items.length === 0 && !isOrderComplete) {
    navigate("/products");
  }

  const onSubmit = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Track shipping info submission
    trackEcommerceEvent('add_shipping_info', {
      currency: 'EUR',
      value: totalPrice,
      items: items.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        item_category: item.product.category
      })),
      shipping_tier: 'standard'
    });
    
    // Simulate order processing
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
      setOrderNumber(randomOrderNumber);
      
      // Track successful purchase
      trackEcommerceEvent('purchase', {
        transaction_id: randomOrderNumber,
        currency: 'EUR',
        value: totalPrice,
        items: items.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          item_category: item.product.category
        }))
      });

      setIsOrderComplete(true);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  const returnToShopping = () => {
    trackUserInteraction('post_purchase_action', {
      element_type: 'button',
      element_text: 'Continue Shopping',
      order_number: orderNumber
    });
    navigate("/products");
  };

  const handleBackClick = () => {
    trackUserInteraction('navigation', {
      element_type: 'button',
      element_text: 'Back',
      from_page: 'checkout'
    });
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Checkout - MINIMAL</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {isOrderComplete ? (
              <Card className="p-8 max-w-2xl mx-auto text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600 w-8 h-8" />
                </div>
                <h1 className="text-2xl font-medium mb-4">Order Confirmed!</h1>
                <p className="text-gray-600 mb-4">
                  Thank you for your purchase. Your order number is <span className="font-medium">{orderNumber}</span>.
                </p>
                <p className="text-gray-600 mb-8">
                  We've sent a confirmation email with your order details.
                </p>
                <Button onClick={returnToShopping} className="mx-auto">
                  Continue Shopping
                </Button>
              </Card>
            ) : (
              <>
                <div className="mb-8">
                  <Button variant="ghost" onClick={handleBackClick} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <h1 className="text-3xl font-medium mb-2">Checkout</h1>
                  <p className="text-gray-600">
                    Complete your purchase by filling out the information below.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Shipping Information */}
                  <div className="lg:col-span-2">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                          <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                          
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your@email.com" type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input placeholder="New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                      <Input placeholder="10001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full md:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Complete Purchase"}
                        </Button>
                      </form>
                    </Form>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <OrderSummary items={items} totalPrice={totalPrice} />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
