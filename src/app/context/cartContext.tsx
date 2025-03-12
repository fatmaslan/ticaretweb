"use client";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string; 
};

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCart: () => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);


  const fetchCartItems = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/carts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.items);
      }
    } catch (error) {
      console.error("Sepet verisi alinamadi:", error);
    }
  };


  useEffect(() => {
    fetchCartItems();
  }, []);


  const addToCart = async (product: CartItem) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/carts/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });

      if (response.ok) {
        fetchCartItems(); 
      }
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };


  const removeFromCart = async (productId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/carts/remove/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchCartItems(); 
      }
    } catch (error) {
      console.error("Ürün sepetten çıkarılırken hata oluştu:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart: fetchCartItems }}>
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
