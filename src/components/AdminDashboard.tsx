// src/components/AdminDashboard.tsx
import { useMemo, useState } from "react";
import { FiFilter, FiRefreshCw, FiDownloadCloud } from "react-icons/fi";
import type { Campus, MainCategoryId, Request, RequestStatus } from "../types";
import {
  CAMPUSES,
  MAIN_CATEGORIES,
  STATUS_ORDER,
  STATUS_STYLES,
} from "../constants";
import { exportToCSV } from "../utils/csv";
import Header from "./Header";

interface AdminDashboardProps {
  requests: Request[];
  onStatusChange: (id: number, status: RequestStatus) => void;
  onCancelRequest: (id: number) => void;
  onBackToCampusSelection: () => void;
  onViewHistory: () => void;
}

export default function AdminDashboard({
  requests,
  onStatusChange,
  onCancelRequest,
  onBackToCampusSelection,
  onViewHistory,
}: AdminDashboardProps) {
  const [filterCampus, setFilterCampus] = useState<Campus | "all">("all");
  const [filterMainCategory, setFilterMainCategory] = useState<
    MainCategoryId | "all"
  >("all");
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [historyNotice, setHistoryNotice] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (filterCampus !== "all" && r.campus !== filterCampus) return false;
      if (
        filterMainCategory !== "all" &&
        r.mainCategory !== filterMainCategory
      )
        return false;
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          r.description.toLowerCase().includes(term) ||
          r.campus.toLowerCase().includes(term) ||
          r.subCategory.toLowerCase().includes(term) ||
          r.location?.toLowerCase().includes(term) ||
          r.name.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [requests, filterCampus, filterMainCategory, filterStatus, searchTerm]);

  const resetFilters = () => {
    setFilterCampus("all");
    setFilterMainCategory("all");
    setFilterStatus("all");
    setSearchTerm("");
    setHistoryNotice("Filters reset.");
    setTimeout(() => setHistoryNotice(null), 2000);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredRequests);
    setHistoryNotice(`Exported ${filteredRequests.length} request(s) as CSV.`);
    setTimeout(() => setHistoryNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white text-slate-900">
      <Header onViewHistory={onViewHistory} />
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
            onClick={onBackToCampusSelection}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
          >
            ← Back to campus selection
          </button>
        </div>

        {/* Filters Section */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Campus Filter */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Campus
              </label>
              <select
                value={filterCampus}
                onChange={(e) =>
                  setFilterCampus(
                    e.target.value === "all"
                      ? "all"
                      : (e.target.value as Campus)
                  )
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

            {/* Category Filter */}
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

            {/* Status Filter */}
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

            {/* Search */}
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

          {/* Action Buttons */}
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

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <p className="text-sm text-slate-500">
            No requests match the current filters.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((r) => {
              const mainCategory = MAIN_CATEGORIES.find(
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
                      {mainCategory?.title} · {r.subCategory}
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
                        onStatusChange(r.id, e.target.value as RequestStatus)
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
                        onClick={() => onCancelRequest(r.id)}
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

