import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import Sidebar from "../../components/dashboard/Sidebar";
import ProfileTab from "../../components/dashboard/ProfileTab";
import EssentialsTab from "../../components/dashboard/EssentialsTab";
import UploadTab from "../../components/dashboard/UploadTab";
import ExpensesTab from "../../components/dashboard/ExpensesTab";

import api from "../../utils/api";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);

  const [files, setFiles] = useState([]);
  const [fileNamespersonal, setFileNamespersonal] = useState([]);
  const [fileNamespublic, setFileNamespublic] = useState([]);

  const [isUploadingprivate, setIsUploadingprivate] = useState(false);
  const [isUploadingpublic, setIsUploadingpublic] = useState(false);

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

  const handleFileChange = (e, bucket) => {
    const selected = Array.from(e.target.files);
    const hasNonImage = selected.some(
      (file) => !file.type.startsWith("image/")
    );

    if (hasNonImage) {
      alert("Only image files are allowed.");
      e.target.value = "";
      return;
    }

    if (bucket === "Memories") {
      setFileNamespersonal(selected.map((f) => f.name));
    }

    if (bucket === "Images") {
      setFileNamespublic(selected.map((f) => f.name));
    }

    setFiles(selected);
  };

  const handleUpload = async (bucket) => {
    if (files.length === 0) {
      alert("No images Selected!!");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    if (bucket === "Memories") setIsUploadingprivate(true);
    if (bucket === "Images") setIsUploadingpublic(true);

    try {
      await api.post(
        formData,
        `${import.meta.env.VITE_BACKEND_URL}/images/upload?bucket=${bucket}`
      );
      alert("Upload complete!");
      if (bucket === "Memories") {
        setFileNamespersonal([]);
      }

      if (bucket === "Images") {
        setFileNamespublic([]);
      }
    } catch {
      alert("Upload failed.");
    }

    if (bucket === "Memories") setIsUploadingprivate(false);
    if (bucket === "Images") setIsUploadingpublic(false);
  };

  return (
    <div className="flex min-h-screen w-full text-white">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === "profile" && <ProfileTab user={user} />}
        {activeTab === "essentials" && (
          <EssentialsTab sections={sections} loading={loadingSections} />
        )}
        {activeTab === "upload" && (
          <UploadTab
            fileNamespersonal={fileNamespersonal}
            fileNamespublic={fileNamespublic}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            isUploadingprivate={isUploadingprivate}
            isUploadingpublic={isUploadingpublic}
          />
        )}
        {activeTab === "expenses" && <ExpensesTab />}
      </div>
    </div>
  );
}
