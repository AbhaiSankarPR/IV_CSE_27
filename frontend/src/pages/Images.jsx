import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";

export default function Images() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageLoad = () => setLoadedCount((prev) => prev + 1);
  const allLoaded = loadedCount === imageUrls.length;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/images/public`)
      .then((res) => res.json())
      .then((data) => {
        setImageUrls(data.urls);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative min-h-screen">
      {!allLoaded && <Loading message="Loading images..." />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {imageUrls.map((img, i) => (
          <div className="w-full h-64" key={i}>
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              onLoad={handleImageLoad}
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
