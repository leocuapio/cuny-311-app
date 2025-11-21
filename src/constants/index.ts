// src/constants/index.ts
import type { IconType } from "react-icons";
import {
  FiTool,
  FiWifi,
  FiShield,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import type { Campus, MainCategoryId, RequestStatus } from "../types";

export const CAMPUSES: Campus[] = [
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

export const MAIN_CATEGORIES: {
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
    icon: FiZap,
    compact: true,
  },
];

export const SUBCATEGORIES: Record<MainCategoryId, string[]> = {
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

export const STATUS_ORDER: RequestStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
  "Cancelled",
];

export const STATUS_STYLES: Record<RequestStatus, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Resolved: "bg-slate-100 text-slate-600 border-slate-200",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-200",
};

