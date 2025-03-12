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
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, updateCart } = useCart(); 

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    setIsAuthenticated(false);
    updateCart(); 
    router.push("/login");
  };

  return (
    <div className="w-full fixed top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-black font-serif font-bold text-2xl md:text-3xl hover:text-red-600">
          ModaTek
        </Link>

       
        <div className="hidden md:flex relative w-64 lg:w-80">
          <Input
            className="border border-gray-300 w-full pl-3 pr-10 h-10 rounded-full"
            placeholder="Bir şeyler ara..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <RiSearchLine
            onClick={handleSearch}
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-4">
     
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center gap-2">
                <FaRegUser size={24} />
                <p className="hidden md:block text-xs font-semibold">
                  {isAuthenticated ? "Profilim" : "Giriş Yap"}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
              <DropdownMenuLabel className="text-center">Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Giriş Yap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Üye Ol</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Siparişlerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button className="w-full" onClick={handleLogout}>Çıkış Yap</Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu open={openShop} onOpenChange={setOpenShop}>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <FiShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                    {cart.length}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="text-center font-semibold">Sepetiniz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Sepetiniz boş</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border-b pb-2">
                      <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.title} width={50} height={50} className="rounded-md" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.quantity} x {item.price}₺</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <Link href="/cart">
                  <Button className="w-full text-sm">Sepeti Görüntüle</Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
