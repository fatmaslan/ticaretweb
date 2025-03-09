"use client"
import {ReactNode, createContext, useContext, useState } from "react";


type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product:CartItem) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context; 
};

