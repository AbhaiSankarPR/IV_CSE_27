import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Utensils,
  Briefcase,
  Train,
  Plane,
  Bed,
  Camera,
  X,
} from "lucide-react";

import Loading from "../components/Loading";

export default function Schedule() {
  const [scheduled, setSchedule] = useState([]);
  const [query, setQuery] = useState("");
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/static/itinerary`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getIcon = (title) => {
    title = title.toLowerCase();
    if (title.includes("final"))
      return <Plane className="w-5 h-5 text-cyan-400" />;
    if (title.includes("departure") || title.includes("arrival"))
      return <Train className="w-5 h-5 text-blue-400" />;
    if (
      title.includes("hotel") ||
      title.includes("stay") ||
      title.includes("check-in")
    )
      return <Bed className="w-5 h-5 text-yellow-400" />;
    if (
      title.includes("visit") ||
      title.includes("tour") ||
      title.includes("sightseeing")
    )
      return <Camera className="w-5 h-5 text-pink-400" />;
    if (
      title.includes("lunch") ||
      title.includes("dinner") ||
      title.includes("breakfast")
    )
      return <Utensils className="w-5 h-5 text-green-400" />;
    if (title.includes("transfer") || title.includes("proceed"))
      return <MapPin className="w-5 h-5 text-purple-400" />;
    if (title.includes("institute"))
      return <Briefcase className="w-5 h-5 text-orange-400" />;
    return <Calendar className="w-5 h-5 text-gray-400" />;
  };

  const filteredSchedule = scheduled
    .map((day) => ({
      ...day,
      events: (day.events || []).filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.desc.toLowerCase().includes(query.toLowerCase()) ||
          day.day.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((day) => day.events.length > 0);

  if (loading) return <Loading message="Loading Schedule..." />;

  return (
    <div className="min-h-screen bg-[#0d0d0d]/25 backdrop-blur-md text-gray-200 px-6 md:px-16 py-16 font-[Poppins] relative">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-2"
        >
          Schedule
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-6"
        >
          View the itinerary for the industrial visit.
        </motion.p>

        <div className="relative mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, event, or keyword..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {(query ? filteredSchedule : scheduled).map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
              {day.day}
            </h2>

            <div className="relative border-l border-gray-700 pl-10">
              {day.events.map((event, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: j * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-10 flex items-start"
                >
                  <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full border border-gray-600 bg-gray-800 shadow-md z-10">
                    {getIcon(event.title)}
                  </div>

                  <div className="ml-6">
                    <p
                      className={`text-lg font-medium leading-tight ${
                        event.train ? "cursor-pointer hover:text-blue-400" : ""
                      }`}
                      onClick={() =>
                        event.train && setSelectedTrain(event.train)
                      }
                      onMouseEnter={() =>
                        event.train && setHoverInfo(event.train)
                      }
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      {event.title}
                    </p>
                    <p className="text-gray-400 text-sm">{event.time}</p>
                    <p className="text-gray-500 text-sm mt-1">{event.desc}</p>

                    {hoverInfo === event.train && (
                      <div className="absolute bg-gray-900 border border-gray-700 text-sm rounded-lg p-3 mt-1 ml-2 w-64 shadow-xl z-20">
                        <p className="font-semibold text-blue-400">
                          {event.train.name}
                        </p>
                        <p>Train No: {event.train.number}</p>
                        <p>
                          {event.train.from} → {event.train.to}
                        </p>
                        <p>
                          Departure: {event.train.dep} | Arrival:{" "}
                          {event.train.arr}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {query && filteredSchedule.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No results found.</p>
        )}
      </div>

      {selectedTrain && (
<div className="fixed inset-0 bg-black/70 grid place-items-center z-50"
onClick={() => setSelectedTrain(null)}
>
       
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setSelectedTrain(null)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              {selectedTrain.name}
            </h2>
            <p className="text-gray-300">Train No: {selectedTrain.number}</p>
            <p className="text-gray-400">
              {selectedTrain.from} → {selectedTrain.to}
            </p>
            <p className="text-gray-400 mt-2">Departure: {selectedTrain.dep}</p>
            <p className="text-gray-400">Arrival: {selectedTrain.arr}</p>
            <p className="text-gray-400 mt-1">Class: {selectedTrain.class}</p>
          </div>
        </div>
      )}
    </div>
  );
}
