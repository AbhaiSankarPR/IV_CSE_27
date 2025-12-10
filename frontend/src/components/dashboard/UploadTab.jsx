export default function UploadTab({
  fileNames,
  handleFileChange,
  handleUpload,
  isUploadingprivate,
  isUploadingpublic,
}) {
  return (
    <div className="max-w-xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-6 text-center bodoni-moda md:text-left">Upload Images</h1>

      <div>
        <h2 className="text-lg font-semibold mb-3 bodoni-moda text-green-300">Personal Uploads</h2>
        <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
          <label
            htmlFor="personalUpload"
            className="block w-full cursor-pointer px-4 py-2 border border-white/40 rounded-lg text-center hover:bg-white/10"
          >
            Choose Files
          </label>
          <input id="personalUpload" type="file" multiple onChange={handleFileChange} className="hidden" />

          {fileNames.length > 0 &&
            fileNames.map((name, idx) => <p key={idx} className="text-sm text-gray-300">• {name}</p>)}

          <button
            onClick={() => handleUpload("Memories")}
            disabled={isUploadingprivate}
            className={`mt-5 px-5 py-2 cursor-pointer rounded-lg ${
              isUploadingprivate ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploadingprivate ? "Uploading..." : "Upload Personal"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 bodoni-moda text-green-300">Public Uploads</h2>
        <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
          <label
            htmlFor="publicUpload"
            className="block w-full cursor-pointer px-4 py-2 border border-white/40 rounded-lg text-center hover:bg-white/10"
          >
            Choose Files
          </label>
          <input id="publicUpload" type="file" multiple onChange={handleFileChange} className="hidden" />

          {fileNames.length > 0 &&
            fileNames.map((name, idx) => <p key={idx} className="text-sm text-gray-300">• {name}</p>)}

          <button
            onClick={() => handleUpload("Images")}
            disabled={isUploadingpublic}
            className={`mt-5 px-5 py-2 cursor-pointer rounded-lg ${
              isUploadingpublic ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploadingpublic ? "Uploading..." : "Upload Public"}
          </button>
        </div>
      </div>
    </div>
  );
}
