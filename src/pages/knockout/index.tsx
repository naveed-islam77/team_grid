"use client";

import { Bracket } from "@/components/knockout/Bracket";
import { KnockoutProvider } from "@/context/knockOutContext";

export default function KnockoutPage() {
  return (
    <KnockoutProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Knockout Stage</h1>
        <Bracket />
      </div>
    </KnockoutProvider>
  );
}
