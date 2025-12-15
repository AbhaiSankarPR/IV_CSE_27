import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signin({ onToggleMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setLoginError("");
  }, [email, password]);

  const onLoginSubmit = async (data) => {
    setLoading(true);
    setLoginError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        login(result);
        navigate("/dashboard");
      } else {
        setLoginError(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Welcome Back
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onLoginSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            {...register("password", { required: "Password is required" })}
            disabled={loading}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-400 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        {loginError && <p className="text-red-400 text-sm">{loginError}</p>}

        <button
          type="submit"
          className={`w-full py-3 rounded font-semibold transition cursor-pointer 
            ${
              loading
                ? "bg-gray-600 text-gray-300"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Don’t have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-green-400 hover:underline cursor-pointer"
          disabled={loading}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
