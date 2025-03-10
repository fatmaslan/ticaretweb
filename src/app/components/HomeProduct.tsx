"use client"
import React, { useEffect, useState } from 'react'
import ProductItems from '../components/ProductItems';
import { Loader2 } from 'lucide-react';



export interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    images: {
      id: number;
      image: string;
    }[];
    variants: {
      id: number;
      color: string;
      size: string;
      price: string;
      stock: number;
    }[];
  }
  
const Allpage = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [loading,setLoading]=useState<boolean>(true)
  const [error, setError] = useState<Error | null >(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null); 
        const response = await fetch('http://127.0.0.1:8000/api/products/category/brands/');
        
        if (!response.ok) {
          throw new Error("Veri alinirken bir hata oluştu");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Hata", error);
        setError(null);
      }finally {
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className=' flex '>
    {loading ? (
      <div className="flex items-center justify-center w-full h-screen">
      <Loader2 size={40} className="animate-spin" />
    </div>
    ) : error ? (
      <p style={{ color: 'red' }}>{error.message}</p>
    ) : product.length > 0 ? (
      product.map((item) => (
        <ProductItems key={item.id} item={item} />
      ))
    ) : (
      <p>No products found.</p>
    )}
  </div>
  );
};

export default Allpage;
