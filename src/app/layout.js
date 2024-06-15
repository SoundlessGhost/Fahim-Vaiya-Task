import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/provider/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fahim Vaiya Task",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Toaster />
          <Header />
          {children}
        </StoreProvider>
        \
      </body>
    </html>
  );
}
