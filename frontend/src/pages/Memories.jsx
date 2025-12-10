import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthPage/AuthContext";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import api from "../utils/api";

export default function Memories() {
  const { user } = useAuth();

  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadMoreRef = useRef(null);

  // Fetch URLs from backend
  async function fetchPrivateImages() {
    setIsLoading(true);
    try {
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/images/private`
      );
      const data = await res.json();

      const urls = Array.isArray(data.urls) ? data.urls : [];
      setImages(urls);
      setVisibleImages(urls.slice(0, itemsToShow));
    } catch (err) {
      console.error("Error fetching private images:", err);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch images initially + refresh every 55 mins
  useEffect(() => {
    fetchPrivateImages();
    const interval = setInterval(fetchPrivateImages, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update visible images whenever images or itemsToShow increases
  useEffect(() => {
    setVisibleImages(images.slice(0, itemsToShow));
  }, [itemsToShow, images]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemsToShow((prev) => prev + 12); // Load 12 more
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadMoreRef.current]);

  // If not logged in
  if (!user) {
    return (
      <div className="flex justify-center mt-10 text-white">
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg">
          <h2 className="text-xl">Please login to continue</h2>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading message="Loading Memories..." />;

  return (
    <div className="relative min-h-screen text-white">
      <h1 className="text-3xl font-bold px-5 pt-5">Your Memories</h1>

      {images.length === 0 ? (
        <div className="flex justify-center mt-10 text-gray-300">
          No private images found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
            {visibleImages.map((img, i) => (
              <div className="w-full h-64" key={i}>
                <img
                  src={img}
                  alt={`Memory ${i + 1}`}
                  onClick={() => setSelectedIndex(i)}
                  className="w-full h-full object-cover rounded-xl shadow-lg shadow-black/30 cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Infinite scroll trigger point */}
          <div ref={loadMoreRef} className="h-10"></div>
        </>
      )}

      <ImageGallery
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        refreshImages={fetchPrivateImages}
      />
    </div>
  );
}
