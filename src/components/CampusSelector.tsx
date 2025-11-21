// src/components/CampusSelector.tsx
import type { Campus } from "../types";
import { CAMPUSES } from "../constants";
import Header from "./Header";

interface CampusSelectorProps {
  onCampusSelect: (campus: Campus) => void;
  onViewHistory: () => void;
}

export default function CampusSelector({
  onCampusSelect,
  onViewHistory,
}: CampusSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
      <Header onViewHistory={onViewHistory} />
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-2">
            Start by selecting your campus
          </h2>
          <p className="mb-6 text-base text-slate-600">
            Choose where this issue, concern, or suggestion applies.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUSES.map((campus) => (
              <button
                key={campus}
                onClick={() => onCampusSelect(campus)}
                className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-left text-sm font-medium text-slate-800 shadow-sm hover:-translate-y-1 hover:border-indigo-600 hover:shadow-lg transition"
              >
                {campus}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

