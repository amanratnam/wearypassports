"use client";

import { Suspense } from "react";
import ResultPageContent from "./ResultPageContent";

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center paper-texture">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-forest-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-3 text-sm">Opening your journal…</p>
        </div>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
