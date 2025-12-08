import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";

export default function Images() {
  const [imageUrls, setImageUrls] = useState([]);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setIsReadyToDisplay(false);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/images/public`)
      .then((res) => res.json())
      .then((data) => {
        setImageUrls(data.urls);
        if (data.urls.length === 0) {
          setIsReadyToDisplay(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setImageUrls([]);
        setIsReadyToDisplay(true);
      });
  }, []);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    let loaded = 0;
    let cancelled = false;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (cancelled) return;
        loaded++;
        if (loaded === imageUrls.length) {
          setIsReadyToDisplay(true);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        console.error("Failed to preload image:", src);
        loaded++;
        if (loaded === imageUrls.length) {
          setIsReadyToDisplay(true);
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  if (!isReadyToDisplay) {
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
              className="w-full h-full object-cover rounded-xl shadow-lg shadow-black/30 cursor-pointer transition-transform duration-300 hover:scale-105"
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
