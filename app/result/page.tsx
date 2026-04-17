"use client";

import { Suspense } from "react";
import ResultPageContent from "./ResultPageContent";

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280] text-sm">Loading your trip plan...</p>
        </div>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
