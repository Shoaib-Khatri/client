"use client";

import { Provider } from "react-redux";
import { store } from "../store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {<PersistenceWrapper>{children}</PersistenceWrapper>}
    </Provider>
  );
}

import { useEffect, useRef } from "react";
import { setCart } from "../store/cartSlice";

function PersistenceWrapper({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          store.dispatch(setCart(JSON.parse(savedCart)));
        }
      } catch (e) {
        console.error("Failed to load cart from localStorage", e);
      }
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem("cart", JSON.stringify(state.cart.items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
