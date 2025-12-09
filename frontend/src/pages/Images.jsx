import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";

export default function Images() {
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/images/public`)
      .then((res) => res.json())
      .then((data) => {
        const urls = Array.isArray(data.urls) ? data.urls : [];
        setImageUrls(urls);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setImageUrls([]);
      })
      .finally(() => {
        setIsLoading(false);   // 🔥 hide loader once URLs are fetched
      });
  }, []);

  // 🔥 Only show loader while URLs are being fetched
  if (isLoading) {
    return <Loading message="Loading images..." />;
  }

  if (imageUrls.length === 0) {
    return (
      <div className="flex justify-center mt-10 text-white">
        No public images found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {imageUrls.map((img, i) => (
          <div className="w-full h-64" key={i}>
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              onClick={() => setSelectedIndex(i)}
              className="
                w-full h-full object-cover rounded-xl shadow-lg shadow-black/30 
                cursor-pointer transition-transform duration-300 hover:scale-105
              "
            />
          </div>
        ))}
      </div>

      <ImageGallery
        images={imageUrls}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}
