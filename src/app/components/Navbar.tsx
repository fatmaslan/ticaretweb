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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = ()=>{
    localStorage.removeItem("accessToke")
    setIsAuthenticated(false)
    router.push('/')
  }
  return (
    <div>
      <div>
        <div className="w-full h-20 flex items-center justify-between opacity-85 fixed z-0">
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
            />
            <RiSearchLine
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
                    <Button onClick={handleLogout}>Çikiş Yap</Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Siparişlerim</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="login">Giriş yap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Üye ol</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={"/cart"}
            className="flex gap-2 pr-10 hover:text-red-600 cursor-pointer"
          >
            <FiShoppingCart size={34} />
            <div className="flex flex-col items-center justify-center">
              <p>Sepetim</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
