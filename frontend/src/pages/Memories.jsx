import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthPage/AuthContext";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import api from "../utils/api";

export default function Memories() {
  const { user } = useAuth();

  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadMoreRef = useRef(null);

  async function fetchImagesChunk(offsetValue) {
    try {
      if (offsetValue === 0) setIsLoading(true);
      else setIsFetchingMore(true);

      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/images/private?offset=${offsetValue}&limit=${limit}`
      );

      const data = await res.json();

      const urls = Array.isArray(data.urls) ? data.urls : [];

      if (urls.length < limit) {
        setHasMore(false);
      }

      if (offsetValue === 0) {
        setImages(urls);
      } else {
        setImages((prev) => [...prev, ...urls]);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    fetchImagesChunk(0);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          const newOffset = offset + limit;
          setOffset(newOffset);
          fetchImagesChunk(newOffset);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadMoreRef.current, offset, hasMore, isFetchingMore]);

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
            {images.map((img, i) => (
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

          {hasMore && (
            <div ref={loadMoreRef} className="h-16 flex justify-center items-center text-gray-400">
              {isFetchingMore ? "Loading more..." : ""}
            </div>
          )}
        </>
      )}

      <ImageGallery
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        refreshImages={() => fetchImagesChunk(0)}
      />
    </div>
  );
}
