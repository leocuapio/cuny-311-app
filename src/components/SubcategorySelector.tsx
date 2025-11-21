// src/components/SubcategorySelector.tsx
import type { Campus, MainCategoryId } from "../types";
import { MAIN_CATEGORIES, SUBCATEGORIES } from "../constants";
import Header from "./Header";

interface SubcategorySelectorProps {
  campus: Campus;
  mainCategoryId: MainCategoryId;
  onSubcategorySelect: (sub: string) => void;
  onBackToCategories: () => void;
  onChangeCampus: () => void;
  onViewHistory: () => void;
}

export default function SubcategorySelector({
  campus,
  mainCategoryId,
  onSubcategorySelect,
  onBackToCategories,
  onChangeCampus,
  onViewHistory,
}: SubcategorySelectorProps) {
  const mainCategory = MAIN_CATEGORIES.find((m) => m.id === mainCategoryId)!;
  const subcategories = SUBCATEGORIES[mainCategoryId];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
      <Header onViewHistory={onViewHistory} />
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">
              Campus: <span className="font-semibold">{campus}</span>
            </p>
            <h2 className="text-2xl font-semibold">
              Choose a subcategory under {mainCategory.title}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onBackToCategories}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              ← Back to categories
            </button>
            <button
              onClick={onChangeCampus}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Change campus
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onSubcategorySelect(sub)}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-base shadow-md hover:-translate-y-1 hover:shadow-lg transition"
            >
              {sub}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

