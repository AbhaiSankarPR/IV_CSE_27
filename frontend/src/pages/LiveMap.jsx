import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "./AuthPage/AuthContext";

// Fix Leaflet marker paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

// Smooth fly to live location
function FlyToLocation({ liveLocation, trigger }) {
  const map = useMap();
  useEffect(() => {
    if (liveLocation && trigger) {
      map.flyTo([liveLocation.lat, liveLocation.lon], 13, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [trigger]);
  return null;
}

export default function JourneyMap() {
  const { user } = useAuth();
  const [liveLocation, setLiveLocation] = useState(null);
  const [savedLocation, setSavedLocation] = useState(
    JSON.parse(localStorage.getItem("savedLocation")) || null
  );
  const [routeToSaved, setRouteToSaved] = useState(null);
  const [error, setError] = useState(null);
  const [flyTrigger, setFlyTrigger] = useState(false);

  const routePoints = [
    { city: "Trivandrum", lat: 8.5241, lon: 76.9366 },
    { city: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
    { city: "Jaisalmer", lat: 26.9157, lon: 70.9083 },
    { city: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { city: "Chandigarh", lat: 30.7333, lon: 76.7794 },
    { city: "Shimla", lat: 31.1048, lon: 77.1734 },
    { city: "Chandigarh (Return)", lat: 30.7333, lon: 76.7794 },
    { city: "Agra", lat: 27.1767, lon: 78.0081 },
    { city: "Delhi", lat: 28.6139, lon: 77.209 },
  ];

  const cityEvents = [
    "Departure from Kochuveli to Ahmedabad by train.",
    "Arrival and sightseeing in Ahmedabad.",
    "Desert camp and fort visit in Jaisalmer.",
    "Amber Fort and Hawa Mahal tour in Jaipur.",
    "Transit stop before heading to Shimla.",
    "Shimla and Kufri sightseeing.",
    "Return via Chandigarh.",
    "Taj Mahal visit in Agra.",
    "Delhi sightseeing and trip end.",
  ];

  const mainRoute = routePoints.map((p) => [p.lat, p.lon]);

  // Watch precise user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLiveLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Save location (for rep)
  const handleSaveLocation = async () => {
    if (liveLocation) {
      // Save locally
      localStorage.setItem("savedLocation", JSON.stringify(liveLocation));
      setSavedLocation(liveLocation);
      alert("📍 Current location saved as meeting point!");

      // Send to backend
      try {
        const response = await fetch(`https://${import.meta.env.VITE_BACKEND_URL}.com/api/save-location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: liveLocation.lat,
            longitude: liveLocation.lng,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Failed to save location");
        console.log("Location saved to backend!");
      } catch (error) {
        console.error("Error saving location:", error);
        alert("Couldn't save location to backend.");
      }
    } else {
      alert("Live location not detected yet.");
    }
  };


  const handleZoomToMe = () => {
    if (liveLocation) setFlyTrigger((p) => !p);
    else alert("Live location not detected yet.");
  };

  // Fetch route from live → saved
  const handleGetDirections = async () => {
    if (!liveLocation || !savedLocation) {
      alert("Both your live and saved locations are required.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${import.meta.env.VITE_ORS_KEY
        }&start=${liveLocation.lon},${liveLocation.lat}&end=${savedLocation.lon
        },${savedLocation.lat}`
      );
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map(([lon, lat]) => [
        lat,
        lon,
      ]);
      setRouteToSaved(coords);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch route. Check your API key or network.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-[Poppins] py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">IV Journey Map</h1>

      <div className="relative w-[90%] md:w-[80%] h-[75vh] rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <MapContainer
          center={[23.5, 78.5]}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}@2x.webp?key=${import.meta.env.VITE_MAPTILER_KEY
              }`}
            detectRetina={true}
            attribution='&copy; MapTiler &copy; OpenStreetMap contributors'
          />

          {/* Main trip route */}
          <Polyline positions={mainRoute} color="deepskyblue" weight={4} />

          {routePoints.map((point, i) => (
            <Marker key={i} position={[point.lat, point.lon]}>
              <Popup>
                <div className="font-semibold text-lg">{point.city}</div>
                <p className="text-sm text-gray-700 mt-1">{cityEvents[i]}</p>
              </Popup>
            </Marker>
          ))}

          {liveLocation && (
            <Marker position={[liveLocation.lat, liveLocation.lon]} icon={redIcon}>
              <Popup>
                <div className="font-semibold">You’re here</div>
                <p className="text-sm text-gray-700 mt-1">Live location updating...</p>
              </Popup>
            </Marker>
          )}

          {savedLocation && (
            <Marker
              position={[savedLocation.lat, savedLocation.lon]}
              icon={greenIcon}
            >
              <Popup>
                <div className="font-semibold">Meeting Point</div>
                <p className="text-sm text-gray-700 mt-1">
                  Updated by class rep.
                </p>
              </Popup>
            </Marker>
          )}

          {/* Show route to saved location */}
          {routeToSaved && (
            <Polyline positions={routeToSaved} color="orange" weight={4} />
          )}

          <FlyToLocation liveLocation={liveLocation} trigger={flyTrigger} />
        </MapContainer>

        {/* Floating buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[1000]">
          <button
            onClick={handleZoomToMe}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md text-sm"
          >
            🎯 My Location
          </button>

          <button
            onClick={handleGetDirections}
            className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-lg shadow-md text-sm"
          >
            🧭 Get Directions
          </button>
        </div>
      </div>

      <p className="text-gray-400 mt-4 text-center text-sm">
        Blue = trip route | Red = you | Green = meeting point | Orange = driving path
      </p>

      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}

      {user && (
        <button
          onClick={handleSaveLocation}
          className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-400 text-black rounded-lg font-semibold transition"
        >
          Update Location
        </button>
      )}
    </div>
  );
}
