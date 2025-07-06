
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Trash2, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { handlePayPalCheckout } from "@/services/paypalService";

interface CartSheetProps {
  cart: any[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  totalAmount: number;
}

const CartSheet = ({ cart, isOpen, onClose, onRemoveItem, totalAmount }: CartSheetProps) => {
  const handleCheckout = () => {
    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price
      })),
      totalAmount
    };
    
    handlePayPalCheckout(orderData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-right">سبد خرید شما</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-lg text-gray-500 mb-2">سبد خرید شما خالی است</p>
                <p className="text-sm text-gray-400">کتاب‌های مورد علاقه خود را اضافه کنید</p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-20 bg-gradient-to-br from-persian-100 to-persian-200 rounded flex-shrink-0">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-persian-900 line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">{item.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-persian-600">${item.price}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Total */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>مجموع:</span>
                  <span className="text-persian-600">${totalAmount.toFixed(2)}</span>
                </div>

                {/* PayPal Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  size="lg"
                >
                  <CreditCard className="w-5 h-5 ml-2" />
                  پرداخت با PayPal
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  پرداخت امن از طریق PayPal
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
