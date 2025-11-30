import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signin({ onToggleMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onLoginSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        login(result);
        navigate("/dashboard");
      } else {
        setLoginError(result.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Please try again later.");
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
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        {loginError && <p className="text-red-400 text-sm">{loginError}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-black rounded font-semibold hover:bg-green-400 transition cursor-pointer "
        >
          Login
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Don’t have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-green-400 hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
