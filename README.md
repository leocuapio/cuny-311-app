# 🏙️ CUNY 311 App

## 📌 Overview

The **CUNY 311 App** is a full-stack web platform that helps **CUNY students, staff, and faculty** report campus issues quickly and easily.
Users can file complaints **anonymously** or **with contact info**, while administrators can review, filter, export, and mark complaints as resolved from a dashboard.

---

## 🚧 Problem Statement

Campus issues like **broken sinks, AC failures, Wi-Fi outages, or safety concerns** are often reported through slow, inconsistent channels.
This leads to:

* Delays in fixing problems
* Poor accountability and tracking
* Student frustration

The **CUNY 311 App** provides one consistent, digital channel for reporting, reviewing, and resolving issues across all CUNY campuses.

---

## 🎯 MVP Scope

### User-Facing Features

* Campus picker (Hunter, Baruch, Brooklyn, Queens, CCNY, etc.)
* Category selection (Facilities, Technology, Safety, Harassment, Help Desk, Other)
* Anonymous or named submission
* Optional name/email fields
* Success banner after submission

### Admin-Facing Features

* Dashboard with all submitted complaints
* Filter by campus, category, or status
* Mark as **Open** or **Resolved**
* Export complaints as CSV
* Search complaints by keyword

---

## 🧩 Technical Architecture

| Layer          | Technology                                                | Purpose                             |
| -------------- | --------------------------------------------------------- | ----------------------------------- |
| **Frontend**   | React (Vite) + TypeScript + Tailwind CSS                  | Modern, modular UI                  |
| **Backend**    | Node.js + Express                                         | REST API for complaints             |
| **Storage**    | JSON file (MVP) → SQLite (Phase 2)                        | Local persistence, future migration |
| **Testing**    | Vitest (unit), Playwright (optional E2E)                  | Reliability checks                  |
| **Deployment** | Frontend → Vercel / Netlify<br>Backend → Render / Railway | Cloud hosting                       |
| **Docs**       | `/docs/ADR/`, `/docs/standups/`, `/docs/roadmap.md`       | Team documentation                  |

---

## 🧠 Prerequisites

* Node.js 18 or newer
* npm 9 or newer
* GitHub account with Codespaces enabled
* Basic React + TypeScript knowledge

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/cuny-311-app.git
cd cuny-311-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the backend (Express API)

```bash
node server.cjs
```

### 4️⃣ Run the frontend (Vite Dev Server)

```bash
npm run dev
```

### 5️⃣ Access the app

* **User Form:** [http://localhost:5173](http://localhost:5173)
* **Admin Dashboard:** [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 🗺️ 10-Week Roadmap (Current Week: 3)

| Week   | Focus                   | Key Deliverables                                      | Status         |
| ------ | ----------------------- | ----------------------------------------------------- | -------------- |
| **1**  | Project Setup           | Repo init, Codespaces, TypeScript, Tailwind, README   | ✅ Completed    |
| **2**  | UI Foundation           | Base form layout, dropdowns, anonymous toggle         | ✅ Completed    |
| **3**  | Backend MVP             | Express API, JSON storage, functional form submit     | ✅ Completed    |
| **4**  | Design Polish           | Tailwind colors, icons, layout improvements           | 🟡 In Progress |
| **5**  | Functionality Expansion | More categories, email field, validation enhancements | 🔜 Planned     |
| **6**  | Admin Dashboard Upgrade | Filtering, status toggle, CSV export                  | 🔜 Planned     |
| **7**  | QA & Testing            | Functional tests, bug fixes, cross-device checks      | 🔜 Planned     |
| **8**  | Deployment              | Host backend (Render) + frontend (Vercel)             | 🔜 Planned     |
| **9**  | Documentation           | Final ADRs, screenshots, presentation prep            | 🔜 Planned     |
| **10** | Presentation & Wrap-Up  | Final demo and retrospective report                   | 🔜 Planned     |

---

## 🧭 Summary

* Current Progress: **Week 3 – Backend MVP Working**
* Next Focus: **UI polish + admin improvements**
* Final Goal: **Deliver a fully functional, visually polished MVP by early December 2025**

---

## 👥 Team

* **Jason Parmar** – Frontend Development & Documentation
* **Leonardo Cuapio** – UI/UX Design & Integration
* **Hayyan Awan** – Backend Development & API Design

---

## 🤝 Contributing

1. Create a new branch for your feature:

   ```bash
   git checkout -b feature/<short-description>
   ```
2. Make changes and commit with clear messages.
3. Push your branch and open a Pull Request.
4. Discuss and review with teammates before merging.

---

## 🪪 License

This project is open-source and maintained by **CUNY 311 App Team 2025**
for educational and portfolio purposes under the **MIT License**.

---