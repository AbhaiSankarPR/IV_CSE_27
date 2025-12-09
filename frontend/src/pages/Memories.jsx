import { useState, useEffect } from "react";
import { useAuth } from "./AuthPage/AuthContext";
import Loading from "../components/Loading";
import api from "../utils/api";

export default function Memories() {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0); // initialize as 0
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPrivateImages() {
    setIsLoading(true);
    setLoadedImages(0); // reset loaded count
    try {
      const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/images/private`);
      const data = await res.json();
      const urls = Array.isArray(data.urls) ? data.urls : [];
      setImages(urls);

      // If no images, stop loading immediately
      if (urls.length === 0) setIsLoading(false);
    } catch (error) {
      console.error("Error loading images:", error);
      setImages([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPrivateImages();
  }, []);

  // Preload images
  useEffect(() => {
    if (images.length === 0) return;

    let cancelled = false;
    let loaded = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (cancelled) return;
        loaded++;
        setLoadedImages(loaded);
        if (loaded === images.length) setIsLoading(false);
      };

      img.onerror = () => {
        if (cancelled) return;
        loaded++;
        setLoadedImages(loaded);
        if (loaded === images.length) setIsLoading(false);
        console.error("Failed to load image:", src);
      };
    });

    return () => (cancelled = true);
  }, [images]);

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg">
          <h2 className="text-xl">Please login to continue</h2>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading message="Loading Memories..." />;

  return (
    <div className="min-h-screen text-white px-6 pt-10">
      <h1 className="text-3xl font-bold mb-6">Your Memories</h1>
      {images.length === 0 ? (
        <p className="text-gray-400">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
                alt={`Memory ${index}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
