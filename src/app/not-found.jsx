import Link from "next/link";


export default function NotFound() {
    return (
        <div>
            <h1>Pagina nao encontrada!</h1>
            <p>A pagina que voce tentou acessar nao exister!</p>
            <Link href="/">Voltar para home</Link>
        </div>
    )
}