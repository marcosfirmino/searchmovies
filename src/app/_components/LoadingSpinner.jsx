"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-blue-500"></div>
    </div>
  );
}