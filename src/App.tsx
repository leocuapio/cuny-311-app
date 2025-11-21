// src/App.tsx
import { useState } from "react";
import type { Campus, MainCategoryId, Request, RequestStatus, Step } from "./types";
import CampusSelector from "./components/CampusSelector";
import CategorySelector from "./components/CategorySelector";
import SubcategorySelector from "./components/SubcategorySelector";
import RequestForm from "./components/RequestForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [step, setStep] = useState<Step>("selectCampus");
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [selectedMain, setSelectedMain] = useState<MainCategoryId | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
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
    setStep("fillForm");
  };

  const handleSubmitRequest = (
    requestData: Omit<Request, "id" | "submittedAt" | "status">
  ) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now(),
      submittedAt: "Just now",
      status: "Open",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setMessage("Your request has been submitted and added to history.");
    setStep("selectMain");
    setSelectedMain(null);
    setSelectedSub(null);
  };

  const handleStatusChange = (id: number, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleCancelRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id && r.status !== "Cancelled"
          ? { ...r, status: "Cancelled" }
          : r
      )
    );
  };

  /* Render appropriate step component */
  if (step === "selectCampus") {
    return (
      <CampusSelector
        onCampusSelect={handleCampusSelect}
        onViewHistory={openHistory}
      />
    );
  }

  if (step === "selectMain" && selectedCampus) {
    return (
      <CategorySelector
        campus={selectedCampus}
        message={message}
        onCategorySelect={handleSelectMain}
        onChangeCampus={goHome}
        onViewHistory={openHistory}
      />
    );
  }

  if (step === "selectSub" && selectedCampus && selectedMain) {
    return (
      <SubcategorySelector
        campus={selectedCampus}
        mainCategoryId={selectedMain}
        onSubcategorySelect={handleSelectSub}
        onBackToCategories={() => setStep("selectMain")}
        onChangeCampus={goHome}
        onViewHistory={openHistory}
      />
    );
  }

  if (
    step === "fillForm" &&
    selectedCampus &&
    selectedMain &&
    selectedSub
  ) {
    return (
      <RequestForm
        campus={selectedCampus}
        mainCategoryId={selectedMain}
        subCategory={selectedSub}
        onSubmit={handleSubmitRequest}
        onBackToSubcategories={() => setStep("selectSub")}
        onStartOver={goHome}
        onViewHistory={openHistory}
      />
    );
  }

  if (step === "history") {
    return (
      <AdminDashboard
        requests={requests}
        onStatusChange={handleStatusChange}
        onCancelRequest={handleCancelRequest}
        onBackToCampusSelection={goHome}
        onViewHistory={openHistory}
      />
    );
  }

  return null;
}

export default App;
