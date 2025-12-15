import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/auth";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import api from "../utils/api";

const THROTTLING_THRESHOLD_MS = 5 * 60 * 1000;

export default function Memories() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const LIMIT = 12;

  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadMoreRef = useRef(null);
  const tabHiddenTime = useRef(0);

  async function fetchImagesChunk(offsetValue) {
    try {
      if (offsetValue === 0) setIsLoading(true);
      else setIsFetchingMore(true);

      const res = await api.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/images/private?offset=${offsetValue}&limit=${LIMIT}`
      );

      const data = await res.json();
      const urls = Array.isArray(data.urls) ? data.urls : [];

      if (urls.length < LIMIT) {
        setHasMore(false);
      }

      if (offsetValue === 0) setImages(urls);
      else setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      if (offsetValue === 0) setIsLoading(false);
      else setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    setOffset(0);
    setHasMore(true);
    fetchImagesChunk(0);
  }, [user]);

  useEffect(() => {
    if (offset > 0) {
      fetchImagesChunk(offset);
    }
  }, [offset]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, images.length]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      setOffset(0);
      setHasMore(true);
      fetchImagesChunk(0);
    }, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        const hiddenDuration = Date.now() - tabHiddenTime.current;

        if (
          tabHiddenTime.current > 0 &&
          hiddenDuration > THROTTLING_THRESHOLD_MS
        ) {
          setOffset(0);
          setHasMore(true);
          fetchImagesChunk(0);
        }
        tabHiddenTime.current = 0;
      } else if (document.visibilityState === "hidden") {
        tabHiddenTime.current = Date.now();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

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
            <div
              ref={loadMoreRef}
              className="h-16 flex justify-center items-center text-gray-400"
            >
              {isFetchingMore ? "Loading more..." : ""}
            </div>
          )}
        </>
      )}

      <ImageGallery
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        refreshImages={() => {
          setImages([]);
          setOffset(0);
          setHasMore(true);
          setTimeout(() => {
            fetchImagesChunk(0);
          }, 50);
        }}
        isAdmin={isAdmin} // add this
      />
    </div>
  );
}
