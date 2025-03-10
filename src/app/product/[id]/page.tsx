"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDetailProducts } from "../../../../actions/getRooms";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { CartItem } from "@/app/cart/page";
import { useCart } from "@/app/context/cartContext";

const Detailpage = () => {
  const params = useParams();
  const id = params.id;
  const { product, error, loading } = useDetailProducts(Number(id));
  const [variant, setVariant] = useState<CartItem | null>(null); 
  const router = useRouter();
  const { addToCart } = useCart(); 

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!product) return <p>Ürün Bulunamadi</p>;


  const handleVariantChange = (selectedVariant: CartItem) => {
    setVariant(selectedVariant); 

  
  const handleAddToCart = async () => {
    if (!variant) {
      toast.error("Lütfen bir varyant seçin");
      return;
    }

    // Sepete ekle
    addToCart({
      id: product.id,
      product: { title: product.title, price: product.price },
      quantity: 1, 
    });

    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/add/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          product_id: product.id,
          variant_id: variant.id, 
          quantity: 1, 
        }),
      });

      if (response.ok) {
        toast.success('Ürün sepete eklendi');
        router.push('/cart');
      } else {
        toast.error('Bir hata oluştu');
      }
    } catch (error) {
      console.error("Sepete eklerken bir hata oluştu:", error);
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="mt-22">
      <div className="flex flex-row gap-5 p-3">
        <Carousel plugins={[Autoplay({ delay: 5000 })]} className="w-full">
          <CarouselContent className="flex mt-8 p-0 mr-0 ml-0">
            {product.images.map((image, index) => (
              <CarouselItem key={image.id} className="flex-shrink-0 w-full">
                <div key={index} className="relative w-full h-[300px]">
                  <Image
                    src={image.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-red-950 text-center mb-2">
            {product.title}
          </h2>
          <p className="text-xl mt-5 font-mono">
            <span className="font-bold text-red-950">Özellikler: </span>
            {product.description}
          </p>
          <p className="text-red-700 flex justify-end text-2xl font-bold mt-3">
            {product.price}₺
          </p>

          {product?.variants && product.variants.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {product.variants.map((variantOption) => (
                <li
                  key={variantOption.id}
                  className="p-2 rounded-lg flex items-center gap-2"
                  onClick={() => handleVariantChange(variantOption)}
                >
                  <input
                    type="radio"
                    id={`variant-${variantOption.id}`}
                    checked={variant?.id === variantOption.id} 
                    onChange={() => handleVariantChange(variantOption)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`variant-${variantOption.id}`}
                    className="cursor-pointer"
                  >
                    <span className="font-medium">Renk:</span> {variantOption.color},
                    <span className="font-medium"> Beden: </span> {variantOption.size}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>Farkli seçenek yok</p>
          )}

          <div className="flex flex-row gap-3 mt-3">
            <Button className="w-[300px]" variant="myButton">
              Hemen Al
            </Button>
            <Button
              onClick={handleAddToCart} 
              className="w-[300px]"
              variant="myButton"
            >
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default Detailpage;
