import { useState } from "react";

export default function Sidebar({ user, activeTab, setActiveTab, logout, navbarHeight = 77 }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = (tab) => {
    if (tab === "logout") {
      logout();
    } else {
      setActiveTab(tab);
    }

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-5 left-5 z-300 md:hidden text-2xl bg-black/40 p-3 rounded-xl shadow-lg hover:bg-black/60 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed left-0 h-screen w-full md:w-64 bg-black/30 backdrop-blur-md border-r border-white/10 p-5 flex flex-col gap-6 z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}
        style={{ top: `${navbarHeight}px` }}
      >
        <div
          onClick={() => handleClick("profile")}
          className="bg-white/10 rounded-lg p-4 text-sm cursor-pointer hover:bg-white/20 transition flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-3xl font-caveat">{user?.name || "User"}</p>
            <p className="text-gray-300 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        <div className={`flex flex-col gap-2 mt-2 ${sidebarOpen ? "block" : "hidden md:block"}`}>
          <button
            onClick={() => handleClick("essentials")}
            className={`p-3 rounded-lg text-left cursor-pointer text-sm transition ${activeTab === "essentials" ? "bg-white/20 text-white font-medium" : "hover:bg-white/10 text-white"
              }`}
          >
            IV Essentials
          </button>

          <button
            onClick={() => handleClick("upload")}
            className={`p-3 rounded-lg text-left cursor-pointer text-sm transition ${activeTab === "upload" ? "bg-white/20 text-white font-medium" : "hover:bg-white/10 text-white"
              }`}
          >
            Upload Image
          </button>

          <button
            onClick={() => handleClick("expenses")}
            className={`p-3 rounded-lg cursor-pointer text-left text-sm transition ${activeTab === "expenses" ? "bg-white/20 text-white font-medium" : "hover:bg-white/10 text-white"
              }`}
          >
            Expense Details
          </button>
        </div>

        <button
          onClick={() => handleClick("logout")}
          className="mt-4 w-full px-5 cursor-pointer py-3 bg-red-500 hover:bg-red-400 rounded-lg font-semibold text-sm text-white transition"
        >
          Logout
        </button>
      </div>
    </>
  );
}
