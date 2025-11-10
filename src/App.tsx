import { useState } from "react";

/* ================================
   Types & Constants
================================ */

type Campus =
  | "Baruch College"
  | "Borough of Manhattan Community College (BMCC)"
  | "Bronx Community College"
  | "Brooklyn College"
  | "City College of New York (CCNY)"
  | "College of Staten Island (CSI)"
  | "CUNY Graduate Center"
  | "CUNY School of Law"
  | "CUNY School of Labor and Urban Studies"
  | "CUNY School of Professional Studies (SPS)"
  | "Guttman Community College"
  | "Hostos Community College"
  | "Hunter College"
  | "John Jay College of Criminal Justice"
  | "Kingsborough Community College"
  | "LaGuardia Community College"
  | "Lehman College"
  | "Medgar Evers College"
  | "New York City College of Technology (City Tech)"
  | "Queens College"
  | "Queensborough Community College"
  | "York College"
  | "Macaulay Honors College"
  | "Craig Newmark Graduate School of Journalism"
  | "CUNY Graduate School of Public Health & Health Policy"
  | "CUNY Graduate School of Nursing";

const CAMPUSES: Campus[] = [
  "Baruch College",
  "Borough of Manhattan Community College (BMCC)",
  "Bronx Community College",
  "Brooklyn College",
  "City College of New York (CCNY)",
  "College of Staten Island (CSI)",
  "CUNY Graduate Center",
  "CUNY School of Law",
  "CUNY School of Labor and Urban Studies",
  "CUNY School of Professional Studies (SPS)",
  "Guttman Community College",
  "Hostos Community College",
  "Hunter College",
  "John Jay College of Criminal Justice",
  "Kingsborough Community College",
  "LaGuardia Community College",
  "Lehman College",
  "Medgar Evers College",
  "New York City College of Technology (City Tech)",
  "Queens College",
  "Queensborough Community College",
  "York College",
  "Macaulay Honors College",
  "Craig Newmark Graduate School of Journalism",
  "CUNY Graduate School of Public Health & Health Policy",
  "CUNY Graduate School of Nursing",
];

type MainCategoryId =
  | "campusFacilities"
  | "techAccess"
  | "safetyConduct"
  | "campusLife"
  | "suggestions";

const MAIN_CATEGORIES: {
  id: MainCategoryId;
  title: string;
  description: string;
  color: string;
  compact?: boolean;
}[] = [
  {
    id: "campusFacilities",
    title: "Campus & Facilities",
    description:
      "Leaks, heating/cooling, broken fixtures, pests, construction, grounds, restrooms.",
    color: "bg-yellow-500",
  },
  {
    id: "techAccess",
    title: "Technology & Access",
    description:
      "WiFi, portals, computer labs, classroom tech, accounts, ID card access.",
    color: "bg-blue-700",
  },
  {
    id: "safetyConduct",
    title: "Safety & Conduct",
    description:
      "Security, harassment, discrimination, noise, Title IX, threats or concerning behavior.",
    color: "bg-rose-700",
  },
  {
    id: "campusLife",
    title: "Campus Life & Services",
    description:
      "Housing, dining, student services, transportation, events, campus experience issues.",
    color: "bg-emerald-700",
  },
  {
    id: "suggestions",
    title: "Suggestions & Concerns",
    description:
      "Share ideas or non-urgent concerns to improve your campus.",
    color: "bg-purple-700",
    compact: true,
  },
];

const SUBCATEGORIES: Record<MainCategoryId, string[]> = {
  campusFacilities: [
    "Facilities / Maintenance",
    "Custodial / Cleaning",
    "Plumbing",
    "Heating / Cooling",
    "Restrooms",
    "Pest / Rodent Issue",
    "Construction / Renovation",
    "Grounds / Outdoors",
    "Other Facilities Issue",
  ],
  techAccess: [
    "WiFi / Network",
    "Computer Labs",
    "Classroom Technology",
    "Login / Portal Issue",
    "ID / Card Access",
    "Other Technology Issue",
  ],
  safetyConduct: [
    "Security / Public Safety",
    "Noise Complaint",
    "Bullying / Harassment (Non-Sexual)",
    "Discrimination / Bias Incident",
    "Sexual Misconduct / Harassment (Title IX)",
    "Stalking / Threatening Behavior",
    "Other Safety / Conduct Concern",
  ],
  campusLife: [
    "Housing / Dorms",
    "Dining Services",
    "Transportation / Parking",
    "Student Services / Advising",
    "Events / Campus Culture",
    "Mental Health & Wellness Support",
    "Other Campus Life Issue",
  ],
  suggestions: [
    "Campus Improvement Idea",
    "Academic / Classroom Experience",
    "Accessibility Improvement",
    "Dining / Food Options",
    "Sustainability / Green Campus",
    "Mental Health & Wellness Resources",
    "Digital Experience / Portals / Apps",
    "Other Suggestion / Concern",
  ],
};

type RequestStatus = "Open" | "Cancelled";

type Request = {
  id: number;
  campus: Campus;
  mainCategory: MainCategoryId;
  subCategory: string;
  name: string;
  isAnonymous: boolean;
  location?: string;
  description: string;
  isPriority: boolean;
  submittedAt: string;
  status: RequestStatus;
};

/* ================================
   Main App
================================ */

function App() {
  type Step =
    | "selectCampus"
    | "selectMain"
    | "selectSub"
    | "fillForm"
    | "history";

  const [step, setStep] = useState<Step>("selectCampus");
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [selectedMain, setSelectedMain] = useState<MainCategoryId | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [requests, setRequests] = useState<Request[]>([]);

  /* Navigation helpers */

  const goHome = () => {
    setStep("selectCampus");
    setSelectedCampus(null);
    setSelectedMain(null);
    setSelectedSub(null);
    setMessage(null);
  };

  const openHistory = () => {
    setStep("history");
    setMessage(null);
  };

  const handleCampusSelect = (campus: Campus) => {
    setSelectedCampus(campus);
    setSelectedMain(null);
    setSelectedSub(null);
    setMessage(null);
    setStep("selectMain");
  };

  const handleSelectMain = (id: MainCategoryId) => {
    setSelectedMain(id);
    setSelectedSub(null);
    setMessage(null);
    setStep("selectSub");
  };

  const handleSelectSub = (sub: string) => {
    setSelectedSub(sub);
    setMessage(null);
    setName("");
    setAnonymous(false);
    setLocation("");
    setDescription("");
    setPriority(false);
    setStep("fillForm");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampus || !selectedMain || !selectedSub) return;
    if (!description.trim()) {
      setMessage("Please provide a description.");
      return;
    }

    const newRequest: Request = {
      id: Date.now(),
      campus: selectedCampus,
      mainCategory: selectedMain,
      subCategory: selectedSub,
      name: anonymous ? "Anonymous" : name.trim() || "Anonymous",
      isAnonymous: anonymous || !name.trim(),
      location: location.trim() || undefined,
      description: description.trim(),
      isPriority: priority,
      submittedAt: "Just now",
      status: "Open",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setMessage("Your request has been submitted and added to history.");
    setStep("selectMain");
    setSelectedMain(null);
    setSelectedSub(null);
  };

  const handleCancel = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id && r.status === "Open"
          ? { ...r, status: "Cancelled" }
          : r
      )
    );
  };

  /* Shared Header */

  const Header = () => (
    <header className="w-full bg-gradient-to-r from-blue-800 via-blue-700 to-sky-600 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src="/University_Name_Correct_Logo_Usage3.png"
            alt="CUNY Logo"
            className="h-14 w-auto rounded-md shadow-md"
          />
          <h1 className="text-4xl font-extrabold tracking-tight">
            CUNY 311 App
          </h1>
        </div>

        <div className="flex items-center">
          {/* Tagline (non-clickable) */}
          <div className="flex items-center gap-2 text-[10px] font-semibold text-blue-200 uppercase tracking-[0.16em]">
            <span>Report</span>
            <span>•</span>
            <span>Resolve</span>
            <span>•</span>
            <span>Improve</span>
          </div>

          {/* History button - bigger rectangle, spaced out */}
          <button
            onClick={openHistory}
            className="ml-6 rounded-lg bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700 transition shadow-md"
          >
            View History
          </button>
        </div>
      </div>
    </header>
  );

  /* ================================
     Step Views
  ================================= */

  // STEP: Home — campus grid
  if (step === "selectCampus") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
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
                  onClick={() => handleCampusSelect(campus)}
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

  // STEP: Main categories for selected campus
  if (step === "selectMain" && selectedCampus) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Selected campus</p>
              <h2 className="text-2xl font-semibold">
                {selectedCampus}
              </h2>
            </div>
            <button
              onClick={goHome}
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
                onClick={() => handleSelectMain(cat.id)}
                className={`group flex flex-col items-start rounded-2xl text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${cat.color} text-white ${
                  cat.compact ? "p-5" : "p-7"
                }`}
              >
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p className="mt-2 text-sm opacity-90">
                  {cat.description}
                </p>
                <span className="mt-3 text-xs font-semibold text-blue-100 group-hover:text-white">
                  Select →
                </span>
              </button>
            ))}
          </div>

          {message && (
            <p className="text-sm text-slate-600 mt-1">{message}</p>
          )}
        </main>
      </div>
    );
  }

  // STEP: Subcategories
  if (step === "selectSub" && selectedCampus && selectedMain) {
    const main = MAIN_CATEGORIES.find((m) => m.id === selectedMain)!;
    const subs = SUBCATEGORIES[selectedMain];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600">
                Campus:{" "}
                <span className="font-semibold">
                  {selectedCampus}
                </span>
              </p>
              <h2 className="text-2xl font-semibold">
                Choose a subcategory under {main.title}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("selectMain")}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                ← Back to categories
              </button>
              <button
                onClick={goHome}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Change campus
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {subs.map((s) => (
              <button
                key={s}
                onClick={() => handleSelectSub(s)}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-base shadow-md hover:-translate-y-1 hover:shadow-lg transition"
              >
                {s}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // STEP: Form
  if (
    step === "fillForm" &&
    selectedCampus &&
    selectedMain &&
    selectedSub
  ) {
    const main = MAIN_CATEGORIES.find(
      (m) => m.id === selectedMain
    )!;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600">
                Campus:{" "}
                <span className="font-semibold">
                  {selectedCampus}
                </span>
              </p>
              <h2 className="text-2xl font-semibold">
                {main.title} · {selectedSub}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("selectSub")}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                ← Change subcategory
              </button>
              <button
                onClick={goHome}
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
            {/* Name / Anonymous */}
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

            {message && (
              <p className="text-sm text-slate-600">{message}</p>
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

  // STEP: History page (long bar layout, status on right, X cancel)
  if (step === "history") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">
              History of Requests
            </h2>
            <button
              onClick={goHome}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              ← Back to campus selection
            </button>
          </div>

          {requests.length === 0 ? (
            <p className="text-sm text-slate-500">
              No requests have been submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {requests.map((r) => {
                const main = MAIN_CATEGORIES.find(
                  (m) => m.id === r.mainCategory
                );
                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-lg hover:shadow-xl transition"
                  >
                    {/* Left side: info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-indigo-700">
                        {main?.title} · {r.subCategory}
                      </div>
                      <div className="mt-1 text-sm text-slate-700 truncate">
                        {r.description}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        {r.campus} · {r.submittedAt} ·{" "}
                        {r.isAnonymous ? "Anonymous" : r.name}
                        {r.location && ` · Location: ${r.location}`}
                      </div>
                    </div>

                    {/* Right side: status + cancel */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        {r.isPriority && (
                          <span className="rounded-full bg-rose-100 px-3 py-0.5 text-[10px] font-semibold text-rose-700">
                            URGENT
                          </span>
                        )}
                        <span
                          className={
                            "rounded-full px-3 py-0.5 text-[10px] font-semibold border " +
                            (r.status === "Open"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-500 border-slate-200")
                          }
                        >
                          {r.status}
                        </span>
                      </div>

                      {r.status === "Open" && (
                        <button
                          onClick={() => handleCancel(r.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-rose-300 text-[14px] leading-none text-rose-600 hover:bg-rose-50 transition"
                          title="Cancel this request"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    );
  }

  return null;
}

export default App;
