import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Página não encontrada!
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          A página que você tentou acessar não existe ou foi movida.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            ← Voltar para Home
          </Button>
        </Link>
      </div>
    </div>
  );
}