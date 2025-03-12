"use client"
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";


export interface sliderItem{
  id:number
  image:string
}


const SalePage = () => {
  const [slider,setSlider]=useState<sliderItem[]>([])
  const [loading,setLoading]=useState(true)
  const [error, setError] = useState<Error | null >(null);

  useEffect(()=>{
    const fetchSlider = async ()=>{
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('http://127.0.0.1:8000/api/sliderImages/')
        if(!response.ok){
          throw new Error('Veri alinirken hat aoluştu')
        }
        const data =await response.json();
        setSlider(data)
      } catch (error) {
        console.error("Hata var",error)
        setError(null)
      }
      finally{
        setLoading(false)
      }
    };
    fetchSlider();
  },[])

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className=" w-full my-auto"
    >
       <CarouselContent>
        {slider.map((item) => (
          <CarouselItem key={item.id} className="flex justify-center">
            <div className="relative w-full h-50">
              <Image
                src={item.image}
                alt={`Slider ${item.id}`}
                fill
                className="object-cover  shadow-lg"
                priority
                unoptimized 
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
    </Carousel>
  );
};

export default SalePage;
