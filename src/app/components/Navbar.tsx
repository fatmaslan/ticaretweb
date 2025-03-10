"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartItem } from "../cart/page";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openShop,setOpenShop]=useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm,setSearchTerm]=useState("")



  const handleSearch = ()=>{
    if(searchTerm.trim()){
      router.push(`/search/${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }
    const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      handleSearch();
      setSearchTerm("")
    }
  }

  useEffect(() => {
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
          setCartItems(data.items);
        }
      } catch (error) {
        console.error("Sepet verisi alinamadi:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false); 
    router.push("/"); 
  };

  return (
    <div>
      <div className="w-full h-20 flex items-center justify-between opacity-85 fixed z-20">
        <Link
          href={"/"}
          className="text-black font-serif font-bold text-3xl p-5 hover:text-red-600 cursor-pointer"
        >
          ModaTek
        </Link>
        <div className="relative">
          <Input
            className="border border-gray-300 m-0 w-[300px] pl-3 pr-10 h-10 rounded-2xl"
            placeholder="Bir şeyler ara..."
            onChange={(e)=>setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <RiSearchLine
          onClick={handleSearch}
            size={25}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 text-lg"
          />
        </div>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-2 hover:text-red-600 cursor-pointer"
            >
              <FaRegUser size={34} />
              <div className="flex flex-col items-center justify-center ">
                <p className="font-semibold text-xs">Hoş geldiniz!</p>
                <p className="mt-1 text-xs">Giriş yap / Kayit Ol</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
            <DropdownMenuLabel className="flex items-center justify-center">
              Hesabim
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/login">Giriş yap</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Üye ol</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <div className="gap-5">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profilim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Siparişlerim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button className="h-6 mt-5" variant="myButton" onClick={handleLogout}>Çikiş Yap</Button>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu open={openShop} onOpenChange={setOpenShop}>
  <DropdownMenuTrigger asChild>
    <div className="flex items-center justify-center cursor-pointer">
      <FiShoppingCart size={34} />
      {cartItems.length > 0 && (
        <span className="bg-red-600 text-white rounded-full h-5 p-2 absolute top-2 right-7 flex items-center justify-center text-xs font-bold ">{cartItems.length}</span>
      )}
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs">Sepetim</p>
      </div>
    </div>
  </DropdownMenuTrigger>

  {/* Dropdown İçeriği */}
  <DropdownMenuContent 
    side="bottom" 
    align="end" 
    className="w-72 bg-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto"
  >
    <DropdownMenuLabel className="text-lg font-semibold text-center mb-3">
      Sepetiniz
    </DropdownMenuLabel>

    {/* Sepet İçeriği */}
    {cartItems.length === 0 ? (
      <p className="text-center text-gray-500">Sepetiniz boş</p>
    ) : (
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b pb-2">
            {/* Ürün Resmi */}
            <div className="w-14 h-14 relative">
              <Image
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            
            {/* Ürün Bilgileri */}
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product.title}</p>
              <p className="text-xs text-gray-500">{item.quantity} x {item.product.price}₺</p>
            </div>
          </div>
               ))}
               </div>
             )}

    {/* Sepeti Görüntüle Butonu */}
    <div className="mt-3">
      <Link href="/cart">
        <Button variant="myButton" className="w-full text-sm">
          Sepeti Görüntüle
        </Button>
      </Link>
    </div>
  </DropdownMenuContent>
</DropdownMenu>

      </div>
    </div>
  );
};

export default Navbar;
