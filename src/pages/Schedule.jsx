import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Utensils, Briefcase } from "lucide-react";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  // simulate fetch from API
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          day: "Day 1: Arrival and Orientation",
          events: [
            {
              icon: <MapPin className="w-5 h-5 text-gray-400" />,
              title: "Arrival at the Facility",
              time: "9:00 AM - 10:00 AM",
            },
            {
              icon: <Briefcase className="w-5 h-5 text-gray-400" />,
              title: "Orientation and Safety Briefing",
              time: "10:30 AM - 12:00 PM",
            },
            {
              icon: <Utensils className="w-5 h-5 text-gray-400" />,
              title: "Welcome Dinner",
              time: "7:00 PM - 9:00 PM",
            },
          ],
        },
        {
          day: "Day 2: Facility Tour and Workshops",
          events: [
            {
              icon: <MapPin className="w-5 h-5 text-gray-400" />,
              title: "Facility Tour",
              time: "9:00 AM - 12:00 PM",
            },
            {
              icon: <Briefcase className="w-5 h-5 text-gray-400" />,
              title: "Interactive Workshops",
              time: "1:00 PM - 4:00 PM",
            },
            {
              icon: <Users className="w-5 h-5 text-gray-400" />,
              title: "Networking Session",
              time: "5:00 PM - 6:30 PM",
            },
          ],
        },
        {
          day: "Day 3: Project Presentations and Departure",
          events: [
            {
              icon: <Briefcase className="w-5 h-5 text-gray-400" />,
              title: "Project Presentations",
              time: "9:00 AM - 12:00 PM",
            },
            {
              icon: <Calendar className="w-5 h-5 text-gray-400" />,
              title: "Departure",
              time: "1:00 PM",
            },
          ],
        },
      ];
      setSchedule(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 px-6 md:px-16 py-16 font-[Poppins]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Schedule</h1>
        <p className="text-gray-400 mb-10">
          View the itinerary for the industrial visit.
        </p>

        {schedule.map((day, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              {day.day}
            </h2>
            <ul className="space-y-5">
              {day.events.map((event, j) => (
                <li key={j} className="flex items-start gap-4">
                  <div className="mt-1">{event.icon}</div>
                  <div>
                    <p className="text-lg font-medium">{event.title}</p>
                    <p className="text-gray-400 text-sm">{event.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
