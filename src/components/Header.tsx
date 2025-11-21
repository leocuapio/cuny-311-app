// src/components/Header.tsx

interface HeaderProps {
  onViewHistory: () => void;
}

export default function Header({ onViewHistory }: HeaderProps) {
  return (
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
          {/* Tagline */}
          <div className="flex items-center gap-2 text-[10px] font-semibold text-blue-200 uppercase tracking-[0.16em]">
            <span>Report</span>
            <span>•</span>
            <span>Resolve</span>
            <span>•</span>
            <span>Improve</span>
          </div>

          {/* History button */}
          <button
            onClick={onViewHistory}
            className="ml-6 rounded-lg bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700 transition shadow-md"
          >
            View History
          </button>
        </div>
      </div>
    </header>
  );
}

