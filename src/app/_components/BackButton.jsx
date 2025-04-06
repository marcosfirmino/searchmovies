"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "Voltar" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-md text-white hover:bg-white/10 transition duration-200 text-sm md:text-base cursor-pointer"
      aria-label={label}
    >
      <span className="text-base">⬅️​</span>
      {label}
    </button>
  );
}