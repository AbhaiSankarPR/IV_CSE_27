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

export default function Schedule() {
  const [scheduled, setSchedule] = useState([]);
  const [query, setQuery] = useState("");
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    const data = [
  {
    day: "DAY 1 • Dec 21 2025 : Trivandrum",
    events: [
      {
        title: "Departure to Ahmedabad",
        time: "9:10 AM",
        desc: "Depart from Kochuveli railway station by KCVL PBR EXPRESS (20909). (Sunday only trains)",
        train: {
          name: "KCVL PBR EXPRESS",
          number: "20909",
          from: "Kochuveli",
          to: "Ahmedabad Jn.",
          dep: "9:10 AM (Dec 21)",
          arr: "10:35 PM (Dec 22)",
          class: "Sleeper / 3A / 2A",
        },
      },
    ],
  },
  {
    day: "DAY 2 • Dec 22 2025 : Ahmedabad",
    events: [
      {
        title: "Arrival at Ahmedabad Jn.",
        time: "10:35 PM",
        desc: "Pick up from railway station and transfer to hotel. Overnight stay in hotel.",
      },
    ],
  },
  {
    day: "DAY 3 • Dec 23 2025 : Ahmedabad",
    events: [
      {
        title: "Hotel Checkout and Institute Visit",
        time: "Morning",
        desc: "After breakfast, checkout from hotel. Institute visit and proceed for sightseeing.",
      },
      {
        title: "Adalaj Step Well",
        time: "Afternoon",
        desc: "Explore the architectural marvel of Adalaj Step Well.",
      },
      {
        title: "Sabarmathi Ashram & Riverfront",
        time: "Evening",
        desc: "Visit Sabarmathi Ashram and enjoy Sabarmathi Riverfront.",
      },
      {
        title: "Departure to Jaisalmer",
        time: "10:15 PM",
        desc: "Drop at Sabarmati Bg railway station at 9:00 PM. Depart by SBIB JSM EXP (20492).",
        train: {
          name: "SBIB JSM EXPRESS",
          number: "20492",
          from: "Sabarmati Bg",
          to: "Jaisalmer",
          dep: "10:15 PM (Dec 23)",
          arr: "12:30 PM (Dec 24)",
          class: "Sleeper / 3A / 2A",
        },
      },
    ],
  },
  {
    day: "DAY 4 • Dec 24 2025 : Jaisalmer",
    events: [
      {
        title: "Arrival at Jaisalmer",
        time: "12:30 PM",
        desc: "Pick up from railway station and proceed for lunch near Jaisalmer fort.",
      },
      {
        title: "Check-in to Desert Camp",
        time: "Afternoon",
        desc: "Experience Rajasthan’s culture with folk dance, singing performances, and local cuisine. Overnight stay in mud-hut camp. (Dinner included)",
      },
    ],
  },
  {
    day: "DAY 5 • Dec 25 2025 : Jaisalmer",
    events: [
      {
        title: "Sightseeing Tour",
        time: "After Breakfast",
        desc: "Visit Kuldhara Village, Jaisalmer Fort, Gadisar Lake, and War Museum (if time permits).",
      },
      {
        title: "Departure to Jaipur",
        time: "11:00 PM",
        desc: "Drop at railway station. Depart by LEELAN EXPRESS (12467) at 12:30 AM. (Breakfast included)",
        train: {
          name: "LEELAN EXPRESS",
          number: "12467",
          from: "Jaisalmer",
          to: "Jaipur",
          dep: "12:30 AM (Dec 26)",
          arr: "1:20 PM (Dec 26)",
          class: "Sleeper / 3A / 2A",
        },
      },
    ],
  },
  {
    day: "DAY 6 • Dec 26 2025 : Jaipur",
    events: [
      {
        title: "Arrival at Jaipur",
        time: "1:20 PM",
        desc: "Pick up from railway station, transfer to hotel for freshen up.",
      },
      {
        title: "Sightseeing Tour",
        time: "Evening",
        desc: "Visit Amber Fort and Jal Mahal. Overnight stay in hotel.",
      },
    ],
  },
  {
    day: "DAY 7 • Dec 27 2025 : Jaipur",
    events: [
      {
        title: "Sightseeing Tour",
        time: "After Breakfast",
        desc: "Visit City Palace, Jantar Mantar, Hawa Mahal, and Albert Hall Museum or Nahargarh Fort.",
      },
      {
        title: "Departure to Chandigarh",
        time: "8:20 PM",
        desc: "Drop at railway station at 7:00 PM. Depart by GNC DLPC EXP (19411).",
        train: {
          name: "GNC DLPC EXPRESS",
          number: "19411",
          from: "Jaipur",
          to: "Chandigarh",
          dep: "8:20 PM (Dec 27)",
          arr: "7:30 AM (Dec 28)",
          class: "Sleeper / 3A / 2A",
        },
      },
    ],
  },
  {
    day: "DAY 8 • Dec 28 2025 : Shimla",
    events: [
      {
        title: "Arrival at Chandigarh",
        time: "7:30 AM",
        desc: "Pick up from railway station and proceed to Shimla (5 hrs journey).",
      },
      {
        title: "Local Sightseeing",
        time: "Afternoon & Evening",
        desc: "Explore Mall Road, Scandal Point, Christ Church, Kali Bari Temple, and Jakhoo Temple. Overnight stay in hotel.",
      },
    ],
  },
  {
    day: "DAY 9 • Dec 29 2025 : Shimla",
    events: [
      {
        title: "Sightseeing Tour",
        time: "After Breakfast",
        desc: "Visit Indian Institute of Advanced Studies, Kufri, and shop at Mall Road.",
      },
      {
        title: "Departure to Chandigarh",
        time: "8:00 PM",
        desc: "Proceed to Chandigarh (5 hrs journey). Arrival and transfer to railway station.",
      },
    ],
  },
  {
    day: "DAY 10 • Dec 30 2025 : Agra",
    events: [
      {
        title: "Arrival at Agra",
        time: "10:50 AM",
        desc: "Depart from Chandigarh at 3:00 AM by HSX AGC EXPRESS (11906). Pick up from Agra Cant. railway station, transfer to hotel for freshen up.",
        train: {
          name: "HSX AGC EXPRESS",
          number: "11906",
          from: "Chandigarh",
          to: "Agra Cantt",
          dep: "3:00 AM (Dec 30)",
          arr: "10:50 AM (Dec 30)",
          class: "Sleeper / 3A / 2A",
        },
      },
      {
        title: "Sightseeing Tour",
        time: "Afternoon",
        desc: "Visit Taj Mahal and Agra Fort. Overnight stay in hotel.",
      },
    ],
  },
  {
    day: "DAY 11 • Dec 31 2025 : Delhi",
    events: [
      {
        title: "Travel to Delhi",
        time: "5:00 AM",
        desc: "Proceed to Delhi (5 hrs journey).",
      },
      {
        title: "Sightseeing Tour",
        time: "Daytime",
        desc: "Visit Raj Ghat, Lotus Temple (if time permits), and shop at Paalika Bazaar / Karol Bagh / Sarojini Bazaar. Overnight stay in hotel.",
      },
    ],
  },
  {
    day: "DAY 12 • Jan 01 2026 : Delhi",
    events: [
      {
        title: "Final Sightseeing & Departure",
        time: "Morning to Evening",
        desc: "Visit India Gate, Rashtrapathi Bhavan, Qutab Minar, and Akshardham Temple. Drop at airport in the evening. Trip ends here — memories loaded.",
      },
    ],
  },
];



    setSchedule(data);
  }, []);

  const getIcon = (title) => {
    title = title.toLowerCase();
    if (title.includes("departure") || title.includes("arrival"))
      return <Train className="w-5 h-5 text-blue-400" />;
    if (title.includes("hotel") || title.includes("stay") || title.includes("check-in"))
      return <Bed className="w-5 h-5 text-yellow-400" />;
    if (title.includes("visit") || title.includes("tour") || title.includes("sightseeing"))
      return <Camera className="w-5 h-5 text-pink-400" />;
    if (title.includes("lunch") || title.includes("dinner") || title.includes("breakfast"))
      return <Utensils className="w-5 h-5 text-green-400" />;
    if (title.includes("transfer") || title.includes("proceed"))
      return <MapPin className="w-5 h-5 text-purple-400" />;
    if (title.includes("institute"))
      return <Briefcase className="w-5 h-5 text-orange-400" />;
    if (title.includes("airport"))
      return <Plane className="w-5 h-5 text-cyan-400" />;
    return <Calendar className="w-5 h-5 text-gray-400" />;
  };

  const filteredSchedule = scheduled
    .map((day) => ({
      ...day,
      events: day.events.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.desc.toLowerCase().includes(query.toLowerCase()) ||
          day.day.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((day) => day.events.length > 0);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 px-6 md:px-16 py-16 font-[Poppins] relative">
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
                      onClick={() => event.train && setSelectedTrain(event.train)}
                      onMouseEnter={() => event.train && setHoverInfo(event.train)}
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      {event.title}
                    </p>
                    <p className="text-gray-400 text-sm">{event.time}</p>
                    <p className="text-gray-500 text-sm mt-1">{event.desc}</p>

                    {/* Tooltip on Hover */}
                    {hoverInfo === event.train && (
                      <div className="absolute bg-gray-900 border border-gray-700 text-sm rounded-lg p-3 mt-1 ml-2 w-64 shadow-xl z-20">
                        <p className="font-semibold text-blue-400">{event.train.name}</p>
                        <p>Train No: {event.train.number}</p>
                        <p>
                          {event.train.source} → {event.train.destination}
                        </p>
                        <p>
                          Departure: {event.train.departure} | Arrival: {event.train.arrival}
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

      {/* Modal on Click */}
      {selectedTrain && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
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
            <p className="text-gray-400 mt-2">
              Departure: {selectedTrain.dep}
            </p>
            <p className="text-gray-400">
              Arrival: {selectedTrain.arr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
