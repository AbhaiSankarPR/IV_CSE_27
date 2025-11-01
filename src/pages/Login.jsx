import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    alert("Signup successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 font-[Poppins] text-white overflow-hidden">
      <div className="relative w-full h-screen flex overflow-hidden">
        {/* Form Container */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {isLogin ? (
            // --- LOGIN FORM ---
            <div className="w-[70%] max-w-md">
              <h2 className="text-4xl font-bold mb-6 text-center">Welcome Back</h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />
                <button className="w-full py-3 bg-green-500 text-black rounded font-semibold hover:bg-green-400 transition">
                  Login
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-400 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            // --- SIGNUP FORM ---
            <div className="w-[70%] max-w-md">
              <h2 className="text-4xl font-bold mb-6 text-center">Create Account</h2>
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (confirmPassword && e.target.value !== confirmPassword) {
                      setPasswordError("Passwords do not match");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password && e.target.value !== password) {
                      setPasswordError("Passwords do not match");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                />

                {/* Password Error */}
                {passwordError && (
                  <p className="text-red-400 text-sm">{passwordError}</p>
                )}

                <button
                  type="submit"
                  disabled={passwordError || !password || !confirmPassword}
                  className={`w-full py-3 rounded font-semibold transition ${
                    passwordError || !password || !confirmPassword
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-500 text-black hover:bg-green-400"
                  }`}
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-400 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Sliding Green Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-green-500 flex flex-col justify-center items-center text-black font-semibold text-center p-10 transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-full rounded-l-[0]" : "translate-x-0 rounded-r-[0]"
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
            onClick={() => setIsLogin(!isLogin)}
            className="border-2 border-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-green-500 transition"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
