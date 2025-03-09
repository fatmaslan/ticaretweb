"use client"
import React, { useEffect, useState } from 'react'
import ProductItems from '../components/ProductItems';
import { Loader2 } from 'lucide-react';



export interface ProductProps {
  title:string
  id:number
}
const Allpage = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [loading,setLoading]=useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        
        if (!response.ok) {
          throw new Error("Veri alinirken bir hata oluştu");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error:any) {
        console.error("Hata", error);
        setError(error,);
      }finally {
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='mt-24 flex '>
    {loading ? (
      <p className='flex items-center justify-center mt-32'><span><Loader2 size={40}/></span></p> 
    ) : error ? (
      <p style={{ color: 'red' }}>{error}</p>
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
