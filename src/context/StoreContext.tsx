"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS } from "../data/products";

interface Order {
  id: string;
  date: string;
  status: string;
  amount: number;
  items: Product[];
}

interface StoreContextType {
  cart: Product[];
  purchasedAssets: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: (customerInfo: { firstName: string; lastName: string; email: string }) => boolean;
  isInCart: (productId: string) => boolean;
  isPurchased: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [purchasedAssets, setPurchasedAssets] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mb_cart");
      const savedPurchased = localStorage.getItem("mb_purchased");
      const savedOrders = localStorage.getItem("mb_orders");

      if (savedCart) setCart(JSON.parse(savedCart));
      
      // Default pre-populated assets if none purchased yet
      if (savedPurchased) {
        setPurchasedAssets(JSON.parse(savedPurchased));
      } else {
        const defaultAssets = [
          PRODUCTS.find(p => p.id === "vogue-storefront") || PRODUCTS[1],
          PRODUCTS.find(p => p.id === "alpha-convert") || PRODUCTS[3]
        ].filter(Boolean) as Product[];
        setPurchasedAssets(defaultAssets);
      }

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Pre-populate some history
        const defaultOrders: Order[] = [
          {
            id: "#MB-49201",
            date: "Nov 12, 2024",
            status: "Completed",
            amount: 35.00,
            items: [PRODUCTS[1]]
          },
          {
            id: "#MB-49185",
            date: "Oct 28, 2024",
            status: "Completed",
            amount: 19.00,
            items: [PRODUCTS[3]]
          }
        ];
        setOrders(defaultOrders);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mb_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mb_purchased", JSON.stringify(purchasedAssets));
    }
  }, [purchasedAssets, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mb_orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const addToCart = (product: Product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = (customerInfo: { firstName: string; lastName: string; email: string }) => {
    if (cart.length === 0) return false;

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const processingFee = 2.50;
    const totalAmount = subtotal + processingFee;

    const newOrder: Order = {
      id: `#MB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Completed",
      amount: parseFloat(totalAmount.toFixed(2)),
      items: [...cart],
    };

    setOrders([newOrder, ...orders]);
    
    // Add unique cart items to purchased assets
    const newPurchased = [...purchasedAssets];
    cart.forEach(cartItem => {
      if (!newPurchased.some(item => item.id === cartItem.id)) {
        newPurchased.push(cartItem);
      }
    });
    setPurchasedAssets(newPurchased);
    
    setCart([]);
    return true;
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  const isPurchased = (productId: string) => {
    return purchasedAssets.some((item) => item.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        purchasedAssets,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        isInCart,
        isPurchased,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
