import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import {
  FiTool,
  FiWifi,
  FiShield,
  FiUsers,
  FiBulb,
  FiFilter,
  FiRefreshCw,
  FiDownloadCloud,
} from "react-icons/fi";

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
  accent: string;
  icon: IconType;
  compact?: boolean;
}[] = [
  {
    id: "campusFacilities",
    title: "Campus & Facilities",
    description:
      "Leaks, heating/cooling, broken fixtures, pests, construction, grounds, restrooms.",
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
    accent: "from-amber-400/80 to-orange-500/80",
    icon: FiTool,
  },
  {
    id: "techAccess",
    title: "Technology & Access",
    description:
      "WiFi, portals, computer labs, classroom tech, accounts, ID card access.",
    color: "bg-gradient-to-br from-blue-600 to-sky-500",
    accent: "from-blue-500/80 to-sky-400/80",
    icon: FiWifi,
  },
  {
    id: "safetyConduct",
    title: "Safety & Conduct",
    description:
      "Security, harassment, discrimination, noise, Title IX, threats or concerning behavior.",
    color: "bg-gradient-to-br from-rose-600 to-fuchsia-600",
    accent: "from-rose-500/80 to-fuchsia-500/80",
    icon: FiShield,
  },
  {
    id: "campusLife",
    title: "Campus Life & Services",
    description:
      "Housing, dining, student services, transportation, events, campus experience issues.",
    color: "bg-gradient-to-br from-emerald-600 to-teal-500",
    accent: "from-emerald-500/80 to-teal-400/80",
    icon: FiUsers,
  },
  {
    id: "suggestions",
    title: "Suggestions & Concerns",
    description:
      "Share ideas or non-urgent concerns to improve your campus.",
    color: "bg-gradient-to-br from-violet-600 to-purple-500",
    accent: "from-violet-500/80 to-purple-400/80",
    icon: FiBulb,
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
    "Accessibility / Elevators",
    "Emergency Power / Generators",
    "Other Facilities Issue",
  ],
  techAccess: [
    "WiFi / Network",
    "Computer Labs",
    "Classroom Technology",
    "Login / Portal Issue",
    "ID / Card Access",
    "Software / Licensing",
    "Digital Accessibility",
    "Other Technology Issue",
  ],
  safetyConduct: [
    "Security / Public Safety",
    "Noise Complaint",
    "Bullying / Harassment (Non-Sexual)",
    "Discrimination / Bias Incident",
    "Sexual Misconduct / Harassment (Title IX)",
    "Stalking / Threatening Behavior",
    "Mental Health Crisis Concern",
    "Other Safety / Conduct Concern",
  ],
  campusLife: [
    "Housing / Dorms",
    "Dining Services",
    "Transportation / Parking",
    "Student Services / Advising",
    "Events / Campus Culture",
    "Mental Health & Wellness Support",
    "Financial Aid / Bursar",
    "Career Services / Internships",
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
    "Campus Partnerships / Community",
    "Other Suggestion / Concern",
  ],
};

type RequestStatus = "Open" | "In Progress" | "Resolved" | "Cancelled";

type Request = {
  id: number;
  campus: Campus;
  mainCategory: MainCategoryId;
  subCategory: string;
  name: string;
  isAnonymous: boolean;
  email?: string;
  location?: string;
  description: string;
  isPriority: boolean;
  submittedAt: string;
  status: RequestStatus;
};

const STATUS_ORDER: RequestStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
  "Cancelled",
];

const STATUS_STYLES: Record<RequestStatus, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Resolved: "bg-sky-50 text-sky-700 border-sky-200",
  Cancelled: "bg-slate-100 text-slate-500 border-slate-200",
};

const INITIAL_REQUESTS: Request[] = [
  {
    id: 1,
    campus: "Hunter College",
    mainCategory: "campusFacilities",
    subCategory: "Plumbing",
    name: "Anonymous",
    isAnonymous: true,
    description: "Water leak in North Building – 5th floor hallway",
    isPriority: true,
    submittedAt: "2 hours ago",
    status: "Open",
  },
  {
    id: 2,
    campus: "City College of New York (CCNY)",
    mainCategory: "techAccess",
    subCategory: "Accessibility / Elevators",
    name: "John Doe",
    email: "john@example.com",
    isAnonymous: false,
    description: "Broken elevator in Library Building",
    isPriority: false,
    submittedAt: "Resolved yesterday",
    status: "Resolved",
  },
  {
    id: 3,
    campus: "Baruch College",
    mainCategory: "techAccess",
    subCategory: "WiFi / Network",
    name: "Anonymous",
    isAnonymous: true,
    description: "Slow WiFi in student lounge",
    isPriority: false,
    submittedAt: "Submitted 1 day ago",
    status: "In Progress",
  },
  {
    id: 4,
    campus: "Brooklyn College",
    mainCategory: "safetyConduct",
    subCategory: "Security / Public Safety",
    name: "Jane Smith",
    email: "jane@example.com",
    isAnonymous: false,
    description: "Outdoor lighting not working near main entrance",
    isPriority: true,
    submittedAt: "Submitted 3 days ago",
    status: "Open",
  },
];

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
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
  const [historyNotice, setHistoryNotice] = useState<string | null>(null);
  const [filterCampus, setFilterCampus] = useState<Campus | "all">("all");
  const [filterMainCategory, setFilterMainCategory] =
    useState<MainCategoryId | "all">("all");
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return requests.filter((request) => {
      const matchesCampus =
        filterCampus === "all" || request.campus === filterCampus;
      const matchesMain =
        filterMainCategory === "all" ||
        request.mainCategory === filterMainCategory;
      const matchesStatus =
        filterStatus === "all" || request.status === filterStatus;
      const matchesTerm =
        term.length === 0 ||
        [
          request.description,
          request.subCategory,
          request.name,
          request.location ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(term);

      return matchesCampus && matchesMain && matchesStatus && matchesTerm;
    });
  }, [requests, filterCampus, filterMainCategory, filterStatus, searchTerm]);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resetFilters = () => {
    setFilterCampus("all");
    setFilterMainCategory("all");
    setFilterStatus("all");
    setSearchTerm("");
    setHistoryNotice(null);
  };

  const handleStatusChange = (id: number, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const handleExportCSV = () => {
    if (filteredRequests.length === 0) {
      setHistoryNotice("No matching requests to export with current filters.");
      return;
    }

    const headers = [
      "ID",
      "Campus",
      "Category",
      "Subcategory",
      "Name",
      "Email",
      "Location",
      "Description",
      "Priority",
      "Submitted",
      "Status",
    ];

    const toCsvValue = (value: string | number | boolean | undefined) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredRequests.map((r) => [
      r.id,
      r.campus,
      r.mainCategory,
      r.subCategory,
      r.name,
      r.email ?? "",
      r.location ?? "",
      r.description,
      r.isPriority ? "Yes" : "No",
      r.submittedAt,
      r.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(toCsvValue).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cuny311-requests-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setHistoryNotice(`Exported ${filteredRequests.length} requests to CSV.`);
  };

  /* Navigation helpers */

  const goHome = () => {
    setStep("selectCampus");
    setSelectedCampus(null);
    setSelectedMain(null);
    setSelectedSub(null);
    setMessage(null);
    setHistoryNotice(null);
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
    setEmail("");
    setAnonymous(false);
    setLocation("");
    setDescription("");
    setPriority(false);
    setFormErrors([]);
    setStep("fillForm");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampus || !selectedMain || !selectedSub) return;

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

    const newRequest: Request = {
      id: Date.now(),
      campus: selectedCampus,
      mainCategory: selectedMain,
      subCategory: selectedSub,
      name: anonymous ? "Anonymous" : name.trim() || "Anonymous",
      isAnonymous: anonymous || !name.trim(),
      email: anonymous ? undefined : email.trim() || undefined,
      location: location.trim() || undefined,
      description: description.trim(),
      isPriority: priority,
      submittedAt: "Just now",
      status: "Open",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setFormErrors([]);
    setMessage("Your request has been submitted and added to history.");
    setStep("selectMain");
    setSelectedMain(null);
    setSelectedSub(null);
    setName("");
    setEmail("");
    setLocation("");
    setDescription("");
    setPriority(false);
  };

  const handleCancel = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id && r.status !== "Cancelled"
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
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3 shadow-inner">
                    <cat.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{cat.title}</h3>
                </div>
                <p className="mt-3 text-sm opacity-95">
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

            {message && (
              <p className="text-sm text-slate-600">{message}</p>
            )}
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

  // STEP: History page (long bar layout, status on right, X cancel)
  if (step === "history") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">
                Admin Dashboard & History
              </h2>
              <p className="text-sm text-slate-500">
                Track submissions, adjust statuses, and export CSV snapshots.
              </p>
            </div>
            <button
              onClick={goHome}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
            >
              ← Back to campus selection
            </button>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Campus
                </label>
                <select
                  value={filterCampus}
                  onChange={(e) =>
                    setFilterCampus(e.target.value === "all"
                      ? "all"
                      : (e.target.value as Campus))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="all">All campuses</option>
                  {CAMPUSES.map((campus) => (
                    <option key={campus} value={campus}>
                      {campus}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Category
                </label>
                <select
                  value={filterMainCategory}
                  onChange={(e) =>
                    setFilterMainCategory(
                      e.target.value === "all"
                        ? "all"
                        : (e.target.value as MainCategoryId)
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="all">All categories</option>
                  {MAIN_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value === "all"
                        ? "all"
                        : (e.target.value as RequestStatus)
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="all">All statuses</option>
                  {STATUS_ORDER.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Search
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                  <FiFilter className="text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="keyword, location, etc."
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                <FiDownloadCloud />
                Export CSV
              </button>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <FiRefreshCw />
                Reset filters
              </button>
              {historyNotice && (
                <p className="text-xs text-slate-500">{historyNotice}</p>
              )}
            </div>
          </section>

          {filteredRequests.length === 0 ? (
            <p className="text-sm text-slate-500">
              No requests match the current filters.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((r) => {
                const main = MAIN_CATEGORIES.find(
                  (m) => m.id === r.mainCategory
                );
                return (
                  <div
                    key={r.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg transition hover:shadow-xl md:flex-row md:items-center md:justify-between"
                  >
                    {/* Left side: info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-indigo-700">
                        {main?.title} · {r.subCategory}
                      </div>
                      <div className="mt-1 text-sm text-slate-700">
                        {r.description}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 space-x-1">
                        <span>{r.campus}</span>
                        <span>·</span>
                        <span>{r.submittedAt}</span>
                        <span>·</span>
                        <span>{r.isAnonymous ? "Anonymous" : r.name}</span>
                        {r.email && (
                          <>
                            <span>·</span>
                            <span>{r.email}</span>
                          </>
                        )}
                        {r.location && (
                          <>
                            <span>·</span>
                            <span>Location: {r.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right side: status + actions */}
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <div className="flex flex-wrap items-center gap-2">
                        {r.isPriority && (
                          <span className="rounded-full bg-rose-100 px-3 py-0.5 text-[10px] font-semibold text-rose-700">
                            URGENT
                          </span>
                        )}
                        <span
                          className={`rounded-full border px-3 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[r.status]}`}
                        >
                          {r.status}
                        </span>
                      </div>
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(
                            r.id,
                            e.target.value as RequestStatus
                          )
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700"
                      >
                        {STATUS_ORDER.map((status) => (
                          <option key={status} value={status}>
                            Set to {status}
                          </option>
                        ))}
                      </select>
                      {r.status !== "Cancelled" && (
                        <button
                          onClick={() => handleCancel(r.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                        >
                          Cancel request
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
