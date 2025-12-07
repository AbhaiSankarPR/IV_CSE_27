import { useState } from "react";
import { useAuth } from "./AuthPage/AuthContext";
import Loading from "../components/Loading";

export default function Memories() {
  const { user } = useAuth();
  const [loadedImages, setLoadedImages] = useState(0);

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

  const imageUrls = [
    "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0",
    "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
  ];

  // Show loading page until all images are loaded
  if (loadedImages < imageUrls.length) {
    return (
      <>
        <Loading message="Loading Memories..." />
        {imageUrls.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="hidden"
            onLoad={() => setLoadedImages(prev => prev + 1)}
          />
        ))}
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {imageUrls.map((img, i) => (
        <div className="w-full h-64" key={i}>
          <img
            src={img}
            alt={`Memory ${i + 1}`}
            className="w-full h-full object-cover rounded-xl shadow-lg shadow-black/30 transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
