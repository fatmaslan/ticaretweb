
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
        <Navbar/>
        <div className='flex flex-col min-h-screen'> 
        {children}
        </div>
        <Footer/>
      </body>
      
    </html>
  );
}
