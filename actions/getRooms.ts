import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images?: string[];  
  color?: string;
  size?: number;
  image?:string;
  variants?:string
}

interface ProductProps {
  title: string;
  id: number;
  description: string;
  images: string[];
  color: string;
  size: number;
  price:number;
  variants: Variant[];
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
): { product: ProductProps; variant:Variant | null; error: string | null; loading: boolean  } => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product>(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        console.log("API Yaniti:", response.data);  // Veri kontrolü için
        const { variants } = response.data;
        if (!variants || variants.length === 0) {
          setError("Variant verisi bulunamadi.");
          setLoading(false)
          return;
        }
        const data = response.data;
        // Variants formatını kontrol et
        const formattedVariants: Variant[] = data.variants
          ? data.variants.map((variant: any) => ({
              id: variant.id,
              color: variant.color,
              size: variant.size,
              price: variant.price,
              stock: variant.stock,
            }))
          : [];
        const formattedProduct: ProductProps = {
          id: data.id,
          title: data.title,
          description: data.description,
          images: data.images || [],
          color: data.color || "Bilinmiyor",
          size: data.size || 0,
          price: data.price,
          variants: formattedVariants,
        };
  
        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  return { product, loading, error };
};
