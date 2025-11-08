import { useEffect, useState } from "react";

// Types
type Campus =
  | "Hunter College"
  | "City College"
  | "Baruch College"
  | "Brooklyn College";

type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

type Request = {
  id: number;
  title: string;
  campus: Campus;
  category: string;
  status: Status;
  submitted: string;
};

type NewRequestInput = {
  campus: Campus;
  category: string;
  description: string;
};

// ---- In-memory mock "API" ----

let REQUESTS_DB: Request[] = [
  {
    id: 1,
    title: "Water leak in North Building – 5th floor hallway",
    campus: "Hunter College",
    category: "Facilities",
    status: "OPEN",
    submitted: "2 hours ago",
  },
  {
    id: 2,
    title: "Broken elevator in Library Building",
    campus: "City College",
    category: "Accessibility",
    status: "RESOLVED",
    submitted: "Resolved yesterday",
  },
  {
    id: 3,
    title: "Slow WiFi in student lounge",
    campus: "Baruch College",
    category: "IT / WiFi",
    status: "IN_PROGRESS",
    submitted: "Submitted 1 day ago",
  },
  {
    id: 4,
    title: "Outdoor lighting not working near main entrance",
    campus: "Brooklyn College",
    category: "Security",
    status: "OPEN",
    submitted: "Submitted 3 days ago",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function apiGetRequests(): Promise<Request[]> {
  await delay(200);
  return REQUESTS_DB;
}

async function apiCreateRequest(input: NewRequestInput): Promise<Request> {
  await delay(300);
  const newRequest: Request = {
    id: REQUESTS_DB.length + 1,
    title:
      input.description.trim().slice(0, 80) || "New service request",
    campus: input.campus,
    category: input.category,
    status: "OPEN",
    submitted: "Just now",
  };
  REQUESTS_DB = [newRequest, ...REQUESTS_DB];
  return newRequest;
}

// ---- Component ----

function App() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [query, setQuery] = useState("");
  const [campusFilter, setCampusFilter] = useState<Campus | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const [formCampus, setFormCampus] =
    useState<Campus>("Hunter College");
  const [formCategory, setFormCategory] =
    useState<string>("Facilities");
  const [formDescription, setFormDescription] = useState("");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  // load "from API"
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGetRequests();
        setRequests(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = requests.filter((r) => {
    const q = query.toLowerCase().trim();
    const matchesQuery =
      q.length === 0 ||
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);

    const matchesCampus =
      campusFilter === "All" || r.campus === campusFilter;
    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;

    return matchesQuery && matchesCampus && matchesStatus;
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormMessage(null);

    if (!formDescription.trim()) {
      setFormMessage("Please add a short description of the issue.");
      return;
    }

    try {
      setSubmitting(true);
      const created = await apiCreateRequest({
        campus: formCampus,
        category: formCategory,
        description: formDescription,
      });
      setRequests((prev) => [created, ...prev]);
      setFormDescription("");
      setFormMessage(
        "Request submitted (mock) and added to the list."
      );
    } catch {
      setFormMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
              CUNY
            </span>
            <h1 className="text-xl font-semibold tracking-tight">
              311 Service Portal
            </h1>
          </div>
          <span className="text-xs text-slate-500">
            Prototype · CUNY Tech Prep
          </span>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto flex max-w-6xl gap-6 px-6 py-8">
        {/* Left: search + results */}
        <section className="flex-1 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Search Requests</h2>
            <p className="text-sm text-slate-500">
              Filter issues by keyword, campus, and status.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. 'wifi', 'elevator', 'leak'..."
              className="flex-1 min-w-[180px] rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select
              value={campusFilter}
              onChange={(e) =>
                setCampusFilter(e.target.value as Campus | "All")
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Campuses</option>
              <option value="Hunter College">Hunter College</option>
              <option value="City College">City College</option>
              <option value="Baruch College">Baruch College</option>
              <option value="Brooklyn College">Brooklyn College</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Status | "All")
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Results */}
          <div className="mt-2 space-y-3">
            {loading && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 shadow-sm">
                Loading requests…
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500">
                No requests match your filters yet.
              </div>
            )}

            {!loading &&
              filtered.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {r.title}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {r.campus} · {r.category} · {r.submitted}
                      </p>
                    </div>
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                        (r.status === "OPEN"
                          ? "bg-amber-100 text-amber-700"
                          : r.status === "IN_PROGRESS"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-emerald-100 text-emerald-700")
                      }
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Right: submit form */}
        <aside className="w-80 space-y-3">
          <h2 className="text-lg font-semibold">Submit a New Request</h2>
          <p className="text-xs text-slate-500">
            This form currently calls a mock in-memory API.
          </p>

          <form
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Campus
              </label>
              <select
                value={formCampus}
                onChange={(e) =>
                  setFormCampus(e.target.value as Campus)
                }
                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option>Hunter College</option>
                <option>City College</option>
                <option>Baruch College</option>
                <option>Brooklyn College</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option>Facilities</option>
                <option>IT / WiFi</option>
                <option>Security</option>
                <option>Accessibility</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Description
              </label>
              <textarea
                rows={3}
                value={formDescription}
                onChange={(e) =>
                  setFormDescription(e.target.value)
                }
                placeholder="Briefly describe the issue..."
                className="w-full resize-none rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {formMessage && (
              <p className="text-[10px] text-slate-500">
                {formMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Request (mock)"}
            </button>
          </form>
        </aside>
      </main>
    </div>
  );
}

export default App;
