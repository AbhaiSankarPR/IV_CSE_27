import { useState } from "react";
import { useAuth } from "../../context/auth";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "../admin/dashboard";

export default function Index() {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen pt-10 md:pt-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 font-[Poppins] text-white overflow-hidden">
      <div className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
        <div
          className={`flex flex-col items-center justify-center w-full lg:w-1/2 px-6 sm:px-10 transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-0" : "lg:translate-x-full"
          }`}
        >
          {isLogin ? (
            <Signin onToggleMode={toggleAuthMode} />
          ) : (
            <Signup onToggleMode={toggleAuthMode} />
          )}
        </div>

        <div
          className={`hidden lg:flex absolute top-0 left-0 h-full w-1/2 bg-green-500 flex-col justify-center items-center text-black font-semibold text-center p-10 transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-5xl mb-4">
            {isLogin ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="text-black/80 mb-6 text-lg max-w-md">
            {isLogin
              ? "Sign up and start your journey with us."
              : "To stay connected, please login with your info."}
          </p>
          <button
            onClick={toggleAuthMode}
            className="border-2 border-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-green-500 transition cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
