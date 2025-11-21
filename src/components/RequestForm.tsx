// src/components/RequestForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Campus, MainCategoryId, Request } from "../types";
import { MAIN_CATEGORIES } from "../constants";
import { validateEmail } from "../utils/validation";
import Header from "./Header";

interface RequestFormProps {
  campus: Campus;
  mainCategoryId: MainCategoryId;
  subCategory: string;
  onSubmit: (request: Omit<Request, "id" | "submittedAt" | "status">) => void;
  onBackToSubcategories: () => void;
  onStartOver: () => void;
  onViewHistory: () => void;
}

export default function RequestForm({
  campus,
  mainCategoryId,
  subCategory,
  onSubmit,
  onBackToSubcategories,
  onStartOver,
  onViewHistory,
}: RequestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const mainCategory = MAIN_CATEGORIES.find((m) => m.id === mainCategoryId)!;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!description.trim()) {
      errors.push("Please provide a description.");
    }
    if (!anonymous && !name.trim()) {
      errors.push("Please share your name or mark the report as anonymous.");
    }
    if (!anonymous && !email.trim()) {
      errors.push("Email is required for non-anonymous submissions.");
    }
    if (email.trim() && !validateEmail(email.trim())) {
      errors.push("Please enter a valid email address.");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      setMessage(null);
      return;
    }

    onSubmit({
      campus,
      mainCategory: mainCategoryId,
      subCategory,
      name: anonymous ? "Anonymous" : name.trim() || "Anonymous",
      isAnonymous: anonymous || !name.trim(),
      email: anonymous ? undefined : email.trim() || undefined,
      location: location.trim() || undefined,
      description: description.trim(),
      isPriority: priority,
    });

    // Reset form
    setName("");
    setEmail("");
    setLocation("");
    setDescription("");
    setPriority(false);
    setFormErrors([]);
    setMessage("Your request has been submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
      <Header onViewHistory={onViewHistory} />
      <main className="mx-auto max-w-4xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">
              Campus: <span className="font-semibold">{campus}</span>
            </p>
            <h2 className="text-2xl font-semibold">
              {mainCategory.title} · {subCategory}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onBackToSubcategories}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              ← Change subcategory
            </button>
            <button
              onClick={onStartOver}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Start over
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">
              Your name (optional)
            </label>
            <input
              type="text"
              value={anonymous ? "" : name}
              onChange={(e) => setName(e.target.value)}
              disabled={anonymous}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:ring-2 focus:ring-indigo-600 disabled:bg-slate-50"
              placeholder="Enter your name or select anonymous below"
            />
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              Submit as anonymous
            </label>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">
              Contact email {anonymous ? "(disabled when anonymous)" : ""}
              {!anonymous && <span className="ml-1 text-rose-600">*</span>}
            </label>
            <input
              type="email"
              value={anonymous ? "" : email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={anonymous}
              placeholder="you@school.edu"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:ring-2 focus:ring-indigo-600 disabled:bg-slate-50"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">
              Location (if needed)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Building, floor, room, or area"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Description
              <span className="ml-1 text-rose-600">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened? When and where? Include any details that will help staff respond."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
            />
            <span className="text-sm text-rose-700 font-medium">
              Mark as urgent / needs immediate help
            </span>
          </div>

          {message && <p className="text-sm text-slate-600">{message}</p>}
          {formErrors.length > 0 && (
            <ul className="list-disc space-y-1 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {formErrors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-700 py-3 text-white text-lg font-semibold hover:bg-indigo-800 transition"
          >
            Submit Request
          </button>
        </form>
      </main>
    </div>
  );
}

