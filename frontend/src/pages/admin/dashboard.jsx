import { useState, useEffect } from "react";
import { useAuth } from "../AuthPage/AuthContext";
import Loading from "../../components/Loading";
import QRCode from "react-qr-code";
import teaImg from "../../assets/tea.svg";
import api from "../../utils/api";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const { user, logout } = useAuth();

  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);

  useEffect(() => {
    if (activeTab === "essentials") {
      setLoadingSections(true);
      fetch(`${import.meta.env.VITE_BACKEND_URL}/static/utensils`)
        .then((res) => res.json())
        .then((data) => {
          setSections(data);
          setLoadingSections(false);
        })
        .catch(() => setLoadingSections(false));
    }
  }, [activeTab]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map((f) => f.name));
  };

  const handleUpload = async (bucket) => {
    if (!files.length) {
      alert("Please select images");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await api.post(
        formData,
        `${import.meta.env.VITE_BACKEND_URL}/images/upload?bucket=${bucket}`
      );

      const data = await res.json();

      if (res.ok) {
        alert("Images uploaded successfully");
        setFiles([]);
        setFileNames([]);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Something went wrong");
    }

    setIsUploading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full text-white font-[Poppins]">
      <div
        className={`bg-black/30 backdrop-blur-md border-r border-white/10 p-5 flex flex-col gap-6 md:w-64 w-full transition-all duration-300 ${
          sidebarOpen ? "max-h-screen" : "h-auto"
        }`}
      >
        <div
          onClick={() => setActiveTab("profile")}
          className="bg-white/10 rounded-lg p-4 text-sm cursor-pointer hover:bg-white/20 transition flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-lg">{user?.name || "User"}</p>
            <p className="text-gray-300">{user?.email}</p>
          </div>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "✖" : "☰"}
          </button>
        </div>

        <div
          className={`flex flex-col gap-2 ${
            sidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <button
            onClick={() => setActiveTab("essentials")}
            className={`p-3 rounded-lg text-left transition text-sm ${
              activeTab === "essentials" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            IV Essentials
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`p-3 rounded-lg text-left transition text-sm ${
              activeTab === "upload" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Upload Image
          </button>
        </div>

        <button
          onClick={logout}
          className="mt-4 px-5 py-2 bg-red-500 hover:bg-red-400 rounded-lg font-semibold text-sm transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === "profile" && (
          <>
            <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Welcome,{" "}
                <span className="text-green-400">
                  {user?.name || "User"}
                </span>
              </h1>
              <p className="text-gray-300 mb-2 text-base md:text-lg">
                You are successfully logged in.
              </p>
              <p className="text-base md:text-lg font-semibold text-green-300">
                Enjoy the journey!
              </p>
            </div>

            <div className="max-w-xl mx-auto mt-4 bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-lg flex flex-col justify-center items-center gap-3">
              <button
                onClick={() => {
                  if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
                    window.location.href = `upi://pay?pa=abhaisankarpr@oksbi&pn=Abhai%20Sankar%20P%20R&aid=uGICAgMDuns7SVQu`;
                  } else {
                    alert("Can't pay on Desktop. Please use the QR Code below to pay. Thank you!");
                    setShowQRCode(true);
                  }
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  background: "transparent",
                }}
              >
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                  <img
                    src={teaImg}
                    alt="Buy me a tea"
                    className="w-[36px] h-[36px] object-contain"
                    style={{ filter: "invert(1) brightness(2)" }}
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold cursor-pointer">
                  Buy me a tea ☕
                </span>
              </button>

              {showQRCode && (
                <div className="mt-4 flex flex-col items-center">
                  <QRCode
                    value="upi://pay?pa=abhaisankarpr@oksbi&pn=Abhai%20Sankar%20P%20R&aid=uGICAgMDuns7SVQu"
                    size={180}
                    bgColor="transparent"
                    fgColor="white"
                  />
                  <p className="text-sm text-gray-300 mt-2 text-center">
                    Scan to pay via UPI
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "essentials" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
              IV Essentials Checklist
            </h1>

            {loadingSections ? (
              <Loading message="Loading essentials..." />
            ) : (
              <div className="space-y-6">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg"
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-2 text-gray-200 text-sm">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-green-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "upload" && (
          <div className="max-w-xl mx-auto space-y-10">
            <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
              Upload Images
            </h1>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-green-300">
                Personal Uploads
              </h2>
              <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
                <label
                  htmlFor="personalUpload"
                  className="block w-full cursor-pointer px-4 py-2 border border-white/40 rounded-lg text-center text-white hover:bg-white/10 transition"
                >
                  Choose Files
                </label>
                <input
                  id="personalUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />

                {fileNames.length > 0 && (
                  <div className="mt-3 text-sm text-gray-300 space-y-1">
                    {fileNames.map((name, idx) => (
                      <p key={idx}>• {name}</p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleUpload("Memories")}
                  disabled={isUploading}
                  className={`mt-5 px-5 py-2 rounded-lg font-semibold text-sm ${
                    isUploading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Personal"}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-green-300">
                Public Uploads
              </h2>
              <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
                <label
                  htmlFor="publicUpload"
                  className="block w-full cursor-pointer px-4 py-2 border border-white/40 rounded-lg text-center text-white hover:bg-white/10 transition"
                >
                  Choose Files
                </label>
                <input
                  id="publicUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />

                {fileNames.length > 0 && (
                  <div className="mt-3 text-sm text-gray-300 space-y-1">
                    {fileNames.map((name, idx) => (
                      <p key={idx}>• {name}</p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleUpload("Images")}
                  disabled={isUploading}
                  className={`mt-5 px-5 py-2 rounded-lg font-semibold text-sm ${
                    isUploading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Public"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
