import "./globals.css";
import { Roboto } from "next/font/google";
import Logo from "./_components/Logo";
import CookieConsent from "@/components/ui/CookieConsent";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", 
});

export const metadata = {
  title: "O Buscador",
  description: "Site para buscar filmes e ver informações sobre eles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${roboto.className} overflow-x-hidden`}>
        {/* Header Minimalista */}
        <nav className="absolute top-0 left-0 right-0 w-full z-50 px-8 py-2 flex justify-between items-center bg-gradient-to-b from-[#020617]/95 via-[#020617]/80 to-transparent">
          <Logo />
        </nav>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}