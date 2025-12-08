import { useState } from "react";
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";

export default function Images() {
  const imageUrls = [
    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
  ];

  const [loadedCount, setLoadedCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageLoad = () => setLoadedCount(prev => prev + 1);
  const allLoaded = loadedCount === imageUrls.length;

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
