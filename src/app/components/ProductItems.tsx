import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="mt-2 p-5 gap-4 flex flex-wrap justify-start"> 
      <Link
        href={`product/${item?.id}`}
        className="w-[230px] h-[360px] shadow-xl flex flex-col"
      >
        <div className="relative w-[230px] h-[250px]">
          {item.images.length > 0 ? (
            <Image
              key={item.images[0].id}
              src={item.images[0].image}
              alt={item.title}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            <p>Bir resim bulunamadi</p>
          )}
        </div>
        <div className="mt-1 text-center w-full px-3">
          <h2 className="font-bold text-lg text-center">{item.title}</h2>
          <p className="font-bold text-xl text-red-800 flex justify-end">
            {item.price}₺
          </p>
          <Button variant="myButton" className="text-xl mt-3 h-8">
            Sepete ekle
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductItems;
