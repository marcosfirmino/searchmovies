/**
 * Componente ErrorMessage para exibir erros
 * 
 * POR QUÊ ESTE COMPONENTE?
 * - Padroniza mensagens de erro em toda a aplicação
 * - Facilita manutenção (mudar estilo em um só lugar)
 * - Consistência visual
 */

export default function ErrorMessage({ 
  message = "Ocorreu um erro. Tente novamente.", 
  className = "" 
}) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4 text-center">
        <p className="text-red-400 font-medium">⚠️ {message}</p>
      </div>
    </div>
  );
}

