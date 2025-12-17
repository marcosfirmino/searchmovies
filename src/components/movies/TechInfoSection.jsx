/**
 * Componente de Informações Técnicas do Filme
 */

import { formatDate, formatCurrency, formatRuntime } from "@/utils/formatters";
import SectionTitle from "@/components/ui/SectionTitle";

export default function TechInfoSection({ director, releaseDate, budget, revenue, runtime }) {
  return (
    <div className="border-t border-white/10 pt-6 md:pt-8">
      <SectionTitle>Informações Técnicas</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {director && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-lg">
              <span>🎬</span>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Direção</h4>
              <p className="text-white font-medium text-sm">{director}</p>
            </div>
          </div>
        )}
        {releaseDate && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-lg">
              <span>📅</span>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Lançamento</h4>
              <p className="text-white font-medium text-sm">{formatDate(releaseDate)}</p>
            </div>
          </div>
        )}
        {budget > 0 && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-lg">
              <span>💰</span>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Orçamento</h4>
              <p className="text-white font-medium text-sm">{formatCurrency(budget)}</p>
            </div>
          </div>
        )}
        {revenue > 0 && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-lg">
              <span>📈</span>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Receita</h4>
              <p className="text-white font-medium text-sm">{formatCurrency(revenue)}</p>
            </div>
          </div>
        )}
        {runtime > 0 && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1 text-lg">
              <span>⏱️</span>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Duração</h4>
              <p className="text-white font-medium text-sm">{formatRuntime(runtime)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}