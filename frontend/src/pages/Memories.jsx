import { useState, useEffect } from "react";
import { useAuth } from "./AuthPage/AuthContext";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import api from "../utils/api";

export default function Memories() {
  const { user } = useAuth();

  const [imageUrls, setImageUrls] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [overallLoading, setOverallLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  async function fetchPrivateImages() {
    setOverallLoading(true);
    setLoadedImages(0);

    try {
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/images/private`
      );
      const data = await res.json();
      setImageUrls(data.urls);
    } catch (err) {
      console.error("Error loading images", err);
      setOverallLoading(false);
    }
  }

  useEffect(() => {
    fetchPrivateImages();
    const interval = setInterval(fetchPrivateImages, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setOverallLoading(false);
      return;
    }

    let loaded = 0;
    let cancelled = false;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (cancelled) return;

        loaded++;
        setLoadedImages(loaded);

        if (loaded === imageUrls.length) {
          setOverallLoading(false);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        console.error("Image load error — refreshing...");
        fetchPrivateImages();
      };
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl shadow-md max-w-md text-center">
          <p className="text-white text-lg font-medium">
            You need to login to view Memories
          </p>
        </div>
      </div>
    );
  }

  const allImagesPreloaded =
    imageUrls.length > 0 && loadedImages === imageUrls.length;

  if (overallLoading || (imageUrls.length > 0 && !allImagesPreloaded)) {
    return <Loading message="Loading Memories..." />;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {imageUrls.map((img, i) => (
          <div className="w-full h-64" key={i}>
            <img
              src={img}
              alt={`Memory ${i + 1}`}
              onClick={() => setSelectedIndex(i)}
              className="w-full h-full object-cover rounded-xl shadow-lg shadow-black/30 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            />
          </div>
        ))}
      </div>

      <ImageGallery
        images={imageUrls}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        refreshImages={fetchPrivateImages}
      />
    </div>
  );
}
