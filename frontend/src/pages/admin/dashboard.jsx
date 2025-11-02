import { useAuth } from "../AuthPage/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null; // prevent flicker

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center font-[Poppins]">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, <span className="text-green-400">{user.email}</span>
      </h1>
      <p className="text-gray-400 mb-8 text-lg">You’re successfully logged in.</p>

      <button
        onClick={logout}
        className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
}
