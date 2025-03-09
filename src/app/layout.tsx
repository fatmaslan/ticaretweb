
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/cartContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider> 
        <Navbar/>
        <div className='flex flex-col min-h-screen'> 
        {children}
        </div>
        <Footer/>
        </CartProvider>
      </body>
      
    </html>
  );
}
