export default function Sidebar({ user, activeTab, setActiveTab, logout, sidebarOpen, setSidebarOpen }) {
    return (
        <div
            className={`bg-black/30  backdrop-blur-md border-r border-white/10 p-5 flex flex-col gap-6 md:w-64 w-full transition-all duration-300 ${sidebarOpen ? "max-h-screen" : "h-auto"
                }`}
        >
            <div
                onClick={() => setActiveTab("profile")}
                className="bg-white/10 rounded-lg p-4 text-sm cursor-pointer hover:bg-white/20 transition flex justify-between items-center"
            >
                <div>
                    <p className="font-semibold caveat text-3xl">{user?.name || "User"}</p>
                    <p className="text-gray-300 text-xs">{user?.email}</p>
                </div>
                <button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? "✖" : "☰"}
                </button>
            </div>

            <div className={`flex flex-col gap-2 ${sidebarOpen ? "block" : "hidden md:block"}`}>
                <button
                    onClick={() => setActiveTab("essentials")}
                    className={`p-3 rounded-lg text-left cursor-pointer transition text-sm ${activeTab === "essentials" ? "bg-white/20" : "hover:bg-white/10"
                        }`}
                >
                    IV Essentials
                </button>

                <button
                    onClick={() => setActiveTab("upload")}
                    className={`p-3 rounded-lg text-left cursor-pointer transition text-sm ${activeTab === "upload" ? "bg-white/20" : "hover:bg-white/10"
                        }`}
                >
                    Upload Image
                </button>

                <button
                    onClick={() => setActiveTab("expenses")}
                    className={`p-3 rounded-lg cursor-pointer text-left transition text-sm ${activeTab === "expenses" ? "bg-white/20" : "hover:bg-white/10"
                        }`}
                >
                    Expense Details
                </button>
            </div>

            <button
                onClick={logout}
                className="mt-4 px-5 py-2 bg-red-500 hover:bg-red-400 rounded-lg font-semibold text-sm transition cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
}
