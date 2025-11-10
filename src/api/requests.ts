// src/api/requests.ts

export type Campus =
  | "Hunter College"
  | "City College"
  | "Baruch College"
  | "Brooklyn College";

export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export type Request = {
  id: number;
  title: string;
  campus: Campus;
  category: string;
  status: Status;
  submitted: string; // human readable for now
};

export type NewRequestInput = {
  campus: Campus;
  category: string;
  description: string;
};

// --- In-memory mock DB ---
// (In real life this would be your database / API.)

let REQUESTS: Request[] = [
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

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getRequests(): Promise<Request[]> {
  await delay(200); // fake latency
  return REQUESTS;
}

export async function createRequest(input: NewRequestInput): Promise<Request> {
  await delay(300);

  const newRequest: Request = {
    id: REQUESTS.length + 1,
    title: input.description.trim().slice(0, 80) || "New service request",
    campus: input.campus,
    category: input.category,
    status: "OPEN",
    submitted: "Just now",
  };

  REQUESTS = [newRequest, ...REQUESTS];
  return newRequest;
}
