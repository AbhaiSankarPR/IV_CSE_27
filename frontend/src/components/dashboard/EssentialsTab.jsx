import Loading from "../../components/Loading";

export default function EssentialsTab({ sections, loading }) {
  return (
    <div className="pl-0 md:pl-80 p-4 min-h-screen bg-[#0d0d0d]/30 transition-all">
      <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left font-bodoni sticky top-6 md:top-10 bg-[#0d0d0d]/30 z-10 pb-4 md:pb-15">
        IV Essentials Checklist
      </h1>
    

      {loading ? (
        <Loading message="Loading essentials..." />
      ) : (
        <div className="flex flex-col items-center md:items-start space-y-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4">{section.title}</h2>

              <ul className="space-y-2 text-gray-200 text-sm md:text-base">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-green-400 font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
