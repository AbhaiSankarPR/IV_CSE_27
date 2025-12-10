import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react";
import api from "../utils/api";

function extractSupabaseFilePath(url) {
  try {
    const withoutQuery = url.split("?")[0];
    const afterObject = withoutQuery.split("/object/")[1];
    if (!afterObject) return null;

    const parts = afterObject.split("/");
    parts.shift();

    const bucket = parts.shift();
    const filePath = parts.join("/");

    return { bucket, filePath };
  } catch (e) {
    console.error("Invalid Supabase URL:", e);
    return null;
  }
}

async function deleteImage(url) {
  const fullPath = extractSupabaseFilePath(url);
  if (!fullPath) return;

  const { bucket, filePath } = fullPath;
  return await api.delete(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/images/delete?bucket=${bucket}&file=${filePath}`
  );
}

export default function ImageGallery({
  images,
  selectedIndex,
  setSelectedIndex,
  refreshImages,
  isAdmin,
}) {
  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, setSelectedIndex]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, setSelectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeys = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [selectedIndex, showPrev, showNext, setSelectedIndex]);

  if (selectedIndex === null) return null;

  const handleError = async () => {
    if (refreshImages) await refreshImages();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-10"
      onClick={() => setSelectedIndex(null)}
    >
      <button
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/20 w-12 h-12 flex items-center justify-center
                   rounded-full shadow-lg hover:bg-white/40 transition-colors duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          showPrev();
        }}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      <img
        src={images[selectedIndex]}
        className="max-w-full max-h-full rounded-xl shadow-2xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
        onError={handleError}
      />

      <button
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/20 w-12 h-12 flex items-center justify-center 
                   rounded-full shadow-lg hover:bg-white/40 transition-colors duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          showNext();
        }}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      <a
        onClick={async (e) => {
          e.stopPropagation();
          try {
            const res = await fetch(images[selectedIndex], { mode: "cors" });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `image-${selectedIndex + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (err) {
            console.error("Download failed", err);
          }
        }}
        className="absolute top-5 right-5 bg-white/20 w-10 h-10 flex items-center justify-center 
                   rounded-full shadow-lg hover:bg-white/40 transition-colors duration-200 cursor-pointer"
      >
        <Download className="w-5 h-5 text-white" />
      </a>

      {isAdmin && (
        <button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              await deleteImage(images[selectedIndex]);
              if (refreshImages) await refreshImages();
              setSelectedIndex(null);
            } catch (err) {
              console.error("Delete failed", err);
            }
          }}
          className="absolute top-5 right-20 bg-red-500/70 w-10 h-10 flex items-center justify-center 
               rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
