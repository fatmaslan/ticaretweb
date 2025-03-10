import { TbGiftCard, TbShoe, TbShirt, TbSoccerField, TbPerfume, TbWoman } from "react-icons/tb";
import { FaTags, FaFire, FaStar } from "react-icons/fa";
import { BsFillBagFill } from "react-icons/bs";


export const NavMenu:{title:string; url:string ;icon: React.ComponentType}[]= [
{
    title:"Aksesuarlar",
    url:"/accessories",
    icon: BsFillBagFill
},
{
    title:"Ayakkabi",
    url:"/shoe",
    icon:TbShoe
},
{
    title:"Erkek Giyim",
    url:"/mens",
    icon:TbShirt
},
{
    title:"Spor ve Eğlence",
    url:"/sports",
    icon:TbSoccerField
},
{
    title:"Kadin Giyim",
    url:"/womans",
    icon:TbWoman
},
{
    title:"Parfüm",
    url:"/perfume",
    icon:TbPerfume
},
]
export const Category:{title:string;url:string; icon: React.ComponentType }[]=[

    {
        title:"Urunler",
        url:"/all",
        icon:FaTags
    },
    {
        title:"Markalar",
        url:"/brands",
        icon:TbGiftCard
    },
   
    {
        title:"Haftanin Enleri",
        url:"/week",
        icon:FaStar
    },
    {
        title:"İyi fiyatlar",
        url:"/suitable",
        icon:FaFire
    },
]