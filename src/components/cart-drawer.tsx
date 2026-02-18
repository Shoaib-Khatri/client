"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleOpenCart = () => setIsOpen(true);
    document.addEventListener("open-cart-drawer", handleOpenCart);
    return () =>
      document.removeEventListener("open-cart-drawer", handleOpenCart);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    // Close drawer logic handled by SheetClose wrapper in button if needed,
    // or routing will naturally navigate away.
    // For now, just route.
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Your Basket ({cartItems.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <ShoppingCart size={48} className="opacity-20" />
              <p>Your basket is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="w-16 h-10 bg-yellow-400 rounded flex items-center justify-center font-bold text-xs border border-black/10 shrink-0 uppercase">
                    {item.reg}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{item.reg}</h4>
                    <p className="text-xs text-gray-500">
                      {item.config.style.toUpperCase()} •{" "}
                      {item.config.sizeFront !== "standard" ||
                      item.config.sizeRear !== "standard"
                        ? "Custom Size"
                        : "Standard"}
                    </p>
                    <p className="font-bold text-sm mt-1">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-lg">£{total.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#1176C8] hover:bg-[#0c5999] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  Checkout Now <ArrowRight size={18} />
                </button>
              </SheetClose>
              <SheetClose asChild>
                <button
                  onClick={() => router.push("/cart")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-bold transition-colors text-sm"
                >
                  View Full Basket
                </button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
