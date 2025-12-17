import { Sixtyfour } from "next/font/google";
import Link from "next/link";

const sixtyfour = Sixtyfour({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  style: "normal",
  variable: true,
});

export default function Logo() {
  return (
    <Link href="/" className="block">
      <h1
                  className={`text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 ${sixtyfour.className}`}
      >
        O BUSCADOR...
      </h1>
    </Link>
  );
}