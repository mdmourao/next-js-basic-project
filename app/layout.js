import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EMEL Bicicletas",
  description: "Dashboard de controlo de bicicletas da EMEL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
