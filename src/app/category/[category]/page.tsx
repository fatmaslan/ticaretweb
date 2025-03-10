"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export interface Categoryİtem {
  id: number;
  title: string;
  price: number;
  images: { image: string; product: number; id: number }[];
}

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Categoryİtem[]>([]);

  useEffect(() => {
    if (category) {
      const formattedCategory = Array.isArray(category) ? category[0] : category;
      const encodedCategory = encodeURIComponent(formattedCategory);
      let apiUrl = `http://127.0.0.1:8000/api/products/category/${encodedCategory}/`;

      if(encodedCategory === "all"){
        apiUrl = "http://127.0.0.1:8000/api/products/"; 
      }else if (encodedCategory.toLowerCase() === "brands"){
        apiUrl = "http://127.0.0.1:8000/api/brands/";
      }
      fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (encodedCategory.toLowerCase() === "brands") {
          console.log(data.brands);  
          setProducts(data.brands);  
        } else {
          console.log(data);  
          setProducts(data);  
        }
      })
      .catch((error) => console.error("API Hatasi:", error));
    }
  }, [category]);

  return (
    <div className="mt-22 p-3 gap-3">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="shadow-md rounded-lg overflow-hidden">
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-[220px]">
                  {product.images.length > 0 ? (
                    <Image
                      key={product.images[0].id}
                      src={product.images[0].image}
                      alt={product.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <p>Bir resim bulunamadi</p>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="font-bold">{product.title}</h2>
                  <h2 className="font-bold text-red-600 flex justify-end">{product.price} TL</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Bu kategoride ürün bulunamadi.</p>
      )}
    </div>
  );
};

export default CategoryPage;
