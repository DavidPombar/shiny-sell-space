
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/products";

interface OrderSummaryProps {
  items: Array<{
    product: Product;
    quantity: number;
    selectedVariants?: { [key: string]: string };
  }>;
  totalPrice: number;
}

const OrderSummary = ({ items, totalPrice }: OrderSummaryProps) => {
  const shippingCost: number = 0; // Free shipping
  const taxRate: number = 0.08; // 8% tax
  const taxAmount: number = totalPrice * taxRate;
  const orderTotal: number = totalPrice + taxAmount + shippingCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${index}`} className="flex justify-between text-sm">
                <div className="flex-1">
                  <div>{item.product.name} x {item.quantity}</div>
                  {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                    <div className="text-xs text-gray-400">
                      {Object.entries(item.selectedVariants).map(([key, value]) => `${key}: ${value}`).join(", ")}
                    </div>
                  )}
                </div>
                <span className="font-medium ml-2">
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
