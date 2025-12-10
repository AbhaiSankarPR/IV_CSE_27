import Loading from "../../components/Loading";

export default function EssentialsTab({ sections, loading }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">IV Essentials Checklist</h1>

      {loading ? (
        <Loading message="Loading essentials..." />
      ) : (
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-2 text-gray-200 text-sm">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
