"use client"
import { ProductProps } from "@/app/all/page";
import ProductItems from "@/app/components/ProductItems";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Searchpage = () => {
  const { keyword } = useParams();
  const decodedKeyword = decodeURIComponent(keyword);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [error,setError]=useState()

  useEffect(() => {
    const fetchProducts = async () => {
        if (!keyword || keyword.length < 3 ){
            setProduct([])
            setLoading(false);
            return;
        }
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/products/?search=${decodedKeyword}`);

        if (!response.ok) {
          throw new Error("Veri alinirken bir hata oluştu");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error: any) {
        console.error("Hata", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  },  [keyword, decodedKeyword]);
  return (
    <div className="mt-24 flex ">
      {loading ? (
        <p className="flex items-center justify-center mt-32">
          <span>
            <Loader2 size={40} />
          </span>
        </p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : product.length > 0 ? (
        product.map((item) => <ProductItems key={item.id} item={item} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Searchpage;
