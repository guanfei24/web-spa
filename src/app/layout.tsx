// app/layout.tsx (通用布局)
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MenuProvider } from "@/context/MenuContext";
import { ServicesProvider } from "@/context/ServicesContext";

export const metadata = {
  title: "Healing Harmony Spa",
  description: "Where wellness meets luxury.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <ServicesProvider>
            <Header />
            <main className="min-h-screen bg-white text-gray-800">
              {children}
            </main>
            <Footer />
          </ServicesProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
