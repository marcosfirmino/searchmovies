/**
 * Componente de Plataformas de Streaming
 */

import { getImageUrl } from "@/services/tmdb";
import SectionTitle from "@/components/ui/SectionTitle";

export default function StreamingProvidersSection({ watchProviders }) {
  const flatrateProviders = watchProviders?.flatrate || [];

  if (flatrateProviders.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-white/10 pt-6 md:pt-8">
      <SectionTitle>Onde Assistir</SectionTitle>
      <div className="flex flex-wrap gap-4">
        {flatrateProviders.map((provider) => (
          <div
            key={provider.provider_id}
            className="flex items-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-red-600/50 transition-colors"
          >
            {provider.logo_path && (
              <img
                src={getImageUrl(provider.logo_path, "w92")}
                alt={provider.provider_name}
                className="w-8 h-8 object-contain"
              />
            )}
            <span className="text-white text-sm font-medium">{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}