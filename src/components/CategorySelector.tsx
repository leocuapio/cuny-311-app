// src/components/CategorySelector.tsx
import type { Campus, MainCategoryId } from "../types";
import { MAIN_CATEGORIES } from "../constants";
import Header from "./Header";

interface CategorySelectorProps {
  campus: Campus;
  message: string | null;
  onCategorySelect: (id: MainCategoryId) => void;
  onChangeCampus: () => void;
  onViewHistory: () => void;
}

export default function CategorySelector({
  campus,
  message,
  onCategorySelect,
  onChangeCampus,
  onViewHistory,
}: CategorySelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
      <Header onViewHistory={onViewHistory} />
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Selected campus</p>
            <h2 className="text-2xl font-semibold">{campus}</h2>
          </div>
          <button
            onClick={onChangeCampus}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            ← Change campus
          </button>
        </div>

        <p className="text-base text-slate-600">
          Choose the area that best matches what you want to report or share.
        </p>

        <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`group flex flex-col items-start rounded-2xl text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${cat.color} text-white ${
                cat.compact ? "p-5" : "p-7"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-3 shadow-inner">
                  <cat.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold">{cat.title}</h3>
              </div>
              <p className="mt-3 text-sm opacity-95">{cat.description}</p>
              <span className="mt-3 text-xs font-semibold text-blue-100 group-hover:text-white">
                Select →
              </span>
            </button>
          ))}
        </div>

        {message && <p className="text-sm text-slate-600 mt-1">{message}</p>}
      </main>
    </div>
  );
}

