"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          phoneNumber: formData.phoneNumber,
          items: [...cartItems, { isAddress: true, ...formData }],
          total,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      dispatch(clearCart());
      router.push("/checkout/success");
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                  1
                </span>
                Contact Information
              </h2>
              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="+44 7000 000000"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    form="checkout-form"
                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    form="checkout-form"
                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      form="checkout-form"
                      className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      form="checkout-form"
                      className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors p-3 bg-gray-50/50 focus:bg-white"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              {error && (
                <p className="text-red-500 mb-4 bg-red-50 p-4 rounded-xl border border-red-100 text-sm font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-gray-900/10 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? "Processing Order..." : `Pay £${total.toFixed(2)}`}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                🔒 Secure SSL Encryption
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 rounded-3xl shadow-none border border-black/5 h-fit sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="w-16 h-8 bg-yellow-400 rounded flex items-center justify-center font-bold text-[10px] border border-black/10 shrink-0 uppercase shadow-inner">
                      {item.reg}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-gray-900">
                          {item.reg}
                        </h4>
                        <p className="font-bold text-sm text-gray-900">
                          £{item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 capitalize mb-2">
                        {item.config.style} Plate
                      </p>
                      <div className="flex gap-2 text-[10px] text-gray-400 font-medium bg-gray-50 p-2 rounded-lg">
                        <span>Front: {item.config.sizeFront}</span>
                        <span className="w-px h-3 bg-gray-200" />
                        <span>Rear: {item.config.sizeRear}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-extrabold text-2xl pt-4 border-t border-gray-900/10 mt-4 text-gray-900">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
