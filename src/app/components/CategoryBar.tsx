"use client";

import { Category, NavMenu } from "@/lib";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const CategoryBar = () => {
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);


  const handleCategoryClick = (categoryTitle: string)=>{
    setLoadingCategory(categoryTitle)
  }
  return (
    <div className="w-full  py-3 mt-22">
      <div className="container mx-auto flex justify-center gap-10 overflow-x-auto px-4">
        {/* Dropdown Menü */}
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-gray-700 font-semibold hover:text-red-600 transition-all cursor-pointer border-none outline-none">
            Tüm Kategoriler <FaChevronDown size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md mt-2">
            {NavMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem key={index} asChild>
                  <Link href={`/category/${encodeURIComponent(item.title)}`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"  onClick={() => handleCategoryClick(item.title)}>
                    <Icon  /> {item.title}
                    {loadingCategory === item.title && (
                      <Loader2 className="ml-2 animate-spin" size={16} />
                    )}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Kategori Linkleri */}
        {Category.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={`/category/${encodeURIComponent(item.title)}`} 
              className="flex items-center gap-2 text-gray-700 font-semibold hover:text-red-600 transition-all" onClick={() => handleCategoryClick(item.title)}
            >
              <Icon/>
              {item.title}
                    {loadingCategory === item.title && (
                      <Loader2 className="ml-2 animate-spin" size={16} />
                    )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
