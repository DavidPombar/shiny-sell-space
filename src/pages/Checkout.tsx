
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Check, ArrowLeft, CreditCard, Package } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  cardNumber: z.string().min(15, { message: "Card number must be at least 15 characters" }),
  cardHolder: z.string().min(2, { message: "Cardholder name must be at least 2 characters" }),
  expiryDate: z.string().min(5, { message: "Expiry date must be in format MM/YY" }),
  cvv: z.string().min(3, { message: "CVV must be at least 3 characters" }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [activeTab, setActiveTab] = useState("shipping");

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // If cart is empty, redirect to products page
  if (items.length === 0 && !isOrderComplete) {
    navigate("/products");
  }

  const onSubmit = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString();
      setOrderNumber(randomOrderNumber);
      setIsOrderComplete(true);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  const returnToShopping = () => {
    navigate("/products");
  };

  const handleContinueToPayment = async () => {
    // Validate shipping fields only
    const shippingFields = await form.trigger(["fullName", "email", "address", "city", "postalCode"]);
    if (shippingFields) {
      setActiveTab("payment");
    }
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
                  <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <h1 className="text-3xl font-medium mb-2">Checkout</h1>
                  <p className="text-gray-600">
                    Complete your purchase by filling out the information below.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Checkout Tabs */}
                  <div className="lg:col-span-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shipping" className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Shipping
                        </TabsTrigger>
                        <TabsTrigger value="payment" className="flex items-center gap-2" disabled={activeTab === "shipping"}>
                          <CreditCard className="h-4 w-4" />
                          Payment
                        </TabsTrigger>
                      </TabsList>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <TabsContent value="shipping" className="mt-0">
                            <Card className="p-6">
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

                              <Button
                                type="button"
                                className="w-full mt-6"
                                onClick={handleContinueToPayment}
                              >
                                Continue to Payment
                              </Button>
                            </Card>
                          </TabsContent>

                          <TabsContent value="payment" className="mt-0">
                            <Card className="p-6">
                              <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                              
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="cardNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Card Number</FormLabel>
                                      <FormControl>
                                        <Input placeholder="1234 5678 9012 3456" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="cardHolder"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Cardholder Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Expiry Date</FormLabel>
                                        <FormControl>
                                          <Input placeholder="MM/YY" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="cvv"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                          <Input placeholder="123" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="flex gap-4 mt-6">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => setActiveTab("shipping")}
                                >
                                  Back to Shipping
                                </Button>
                                <Button
                                  type="submit"
                                  className="flex-1"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                                </Button>
                              </div>
                            </Card>
                          </TabsContent>
                        </form>
                      </Form>
                    </Tabs>
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
