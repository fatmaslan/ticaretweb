"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
interface Product {
  id:number
  title:string
  price:number
  description: string;
  variant:Variant[]
  images: { image: string; product: number }[];
}
interface Variant {
  color:string
  size:number
  id:string
}

export interface CartItem{
  id:number
  product:Product
  image:string
  quantity:number
  variant: Variant;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeCart = async (cartItemId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Kullanici giriş yapmamiş!");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/${cartItemId}/remove/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
      } else {
        console.error("Ürün silinirken hata oluştu!");
      }
    } catch (error) {
      console.error("API çağrisi sirasinda hata oluştu:", error);
    }
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Kullanici giriş yapmamiş!");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/carts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error("Yetkilendirme başarisiz! Token süresi dolmuş olabilir.");
          localStorage.removeItem("accessToken");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          console.log("Sepet Verisi:", data);
          setCartItems(data.items);
        } else {
          console.error("Sepet verileri yüklenirken hata oluştu!");
        }
      } catch (error) {
        console.error("API çağrisi sirasinda hata oluştu:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="p-5 mt-22">
  <h1 className="text-2xl font-bold">Sepetiniz</h1>
  {cartItems.length === 0 ? (
    <p>Sepetiniz boş.</p>
  ) : (
    <ul className="mt-5 space-y-3">
      {cartItems.map((item, index) => (
        <li key={item.id || index} className="flex gap-4 border p-3 rounded-md">
          <div className="relative w-[300px] h-[180px]">
            <Image
              src={`http://127.0.0.1:8000${item.image}`} 
              alt={item.product.title || "Ürün resmi"}  
              layout="fill"
              objectFit="cover"
              className="rounded-md mt-8"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-lg text-center ">{item.product.title}</h2>
            <p className="text-gray-600 mt-5">{item.product.description}</p>  
            <p className=""><span className="text-xl font-bold">Miktar: </span> {item.quantity}</p>


            {item.variant && (
              <p className="">
               <span className="text-xl font-bold">Varyant: </span>{item.variant.color} - {item.variant.size}
              </p>
            )}
            <p className="text-red-600 font-bold text-2xl flex justify-end">{item.product.price}₺</p> 
          </div>
           <div>
            <Button onClick={()=>removeCart(item.id)} className="bg-red-600 text-white text-7xl"><MdDeleteOutline size={50}/></Button>
           </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default CartPage;
