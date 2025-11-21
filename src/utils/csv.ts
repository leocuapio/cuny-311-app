// src/utils/csv.ts
import type { Request } from "../types";

export function exportToCSV(requests: Request[], filename: string = "cuny-311-requests.csv"): void {
  if (requests.length === 0) {
    alert("No requests to export.");
    return;
  }

  const headers = [
    "ID",
    "Campus",
    "Main Category",
    "Subcategory",
    "Name",
    "Email",
    "Location",
    "Description",
    "Priority",
    "Submitted At",
    "Status",
  ];

  const csvRows = [
    headers.join(","),
    ...requests.map((r) =>
      [
        r.id,
        `"${r.campus}"`,
        `"${r.mainCategory}"`,
        `"${r.subCategory}"`,
        `"${r.name}"`,
        r.email ? `"${r.email}"` : '""',
        r.location ? `"${r.location}"` : '""',
        `"${r.description.replace(/"/g, '""')}"`,
        r.isPriority ? "Yes" : "No",
        `"${r.submittedAt}"`,
        r.status,
      ].join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

