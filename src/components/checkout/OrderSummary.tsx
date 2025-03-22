
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/products";

interface OrderSummaryProps {
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  totalPrice: number;
}

const OrderSummary = ({ items, totalPrice }: OrderSummaryProps) => {
  const shippingCost = 0; // Free shipping
  const taxRate = 0.08; // 8% tax
  const taxAmount = totalPrice * taxRate;
  const orderTotal = totalPrice + taxAmount + shippingCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Subtotal */}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Total */}
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
