import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cartContext";

interface ProductItemProps {
  item: {
    id: number;
    price: number;
    title: string;
    description: string;
    images: { id: number; image: string }[];
    variants: {
      id: number;
      color: string;
      size: string;
      price: string;
      stock: number;
    }[];
  };
}

const ProductItems: React.FC<ProductItemProps> = ({ item }) => {
  const {addToCart}=useCart();
  return (
    <div className="p-5 gap-4 flex flex-wrap justify-start">
      <div className="w-[230px] h-[300px] flex flex-col shadow-xl rounded-lg">
        <Link href={`product/${item?.id}`} className="flex flex-col h-full">
          <div className="relative w-full h-[300px]">
            {item.images.length > 0 ? (
              <Image
                key={item.images[0].id}
                src={item.images[0].image}
                alt={item.title}
                fill
                className="object-cover rounded-t-lg"
              />
            ) : (
              <p className="flex items-center justify-center h-full text-gray-500">Resim bulunamadi</p>
            )}
          </div>

          <div className="px-3 py-2 flex flex-col justify-between h-full">
            <h2 className="font-bold text-lg text-center">{item.title}</h2>

            <div className="mt-auto">
              <p className="font-bold text-xl text-red-800 text-center">{item.price}₺</p>
              <Button onClick={() => addToCart(item)} className="text-xl h-8 w-full mt-2 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all">Sepete ekle</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductItems;
