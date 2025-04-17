import { Sixtyfour} from "next/font/google";
import Link from "next/link";

const sixtyfour = Sixtyfour({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  style: "normal",
  variable: true,
});

export default function Logo()  {
    return (
        <a href="/">
            <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-5xl text-transparent text-center text-transparent mt-10 mb-6 ${sixtyfour.className} bg-gradient-to-t from-red-500 from-15% via-red-400 via-40% to-red-600 to-75% bg-clip-text`}>O Buscador...</h1>
        </a>
    )
}