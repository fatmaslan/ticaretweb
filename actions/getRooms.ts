import { useEffect, useState } from "react";
import axios from "axios";

interface ProductProps {
  title: string;
  id: number;
  description: string;
  images: string[];
  color: string;
  size: number;
  price: number;
  variants?: Variant[]; 
}

interface Variant {
  id: number;
  color: string;
  size: string;
  price: string;
  stock: number;
}

export const useDetailProducts = (
  id: number
): { product: ProductProps | null; error: string | null; loading: boolean } => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<ProductProps>(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        const data = response.data;

        if (!data) {
          setError("Ürün verisi alinamadi.");
          setLoading(false);
          return;
        }

 
        const variants = data.variants || [];


        const formattedProduct: ProductProps = {
          id: data.id,
          title: data.title,
          description: data.description,
          images: data.images || [],
          color: data.color || "Bilinmiyor",
          size: data.size || 0,
          price: data.price,
          variants: variants, 
        };

        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error.message);
        setError("API hatasi: " + error.message);
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
};
