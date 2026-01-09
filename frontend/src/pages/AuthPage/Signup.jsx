import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signup({ onToggleMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSignupSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `ADMIN ${data.passkey}`,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Profile created successfully!");
        login(result);
        navigate("/dashboard");
      } else {
        alert(
          result.message || "Signup failed. Check your passkey or details."
        );
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Create Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSignupSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          disabled={loading}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          disabled={loading}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            disabled={loading}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
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

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            disabled={loading}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          />

          <button
            type="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-400 cursor-pointer"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-400 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Passkey"
          autoComplete="off"
          {...register("passkey", { required: "PassKey is required" })}
          disabled={loading}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
        />
        {errors.passkey && (
          <p className="text-red-400 text-sm">{errors.passkey.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full py-3 rounded font-semibold transition ${
            !isValid || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 text-black hover:bg-green-400 cursor-pointer"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-green-400 hover:underline cursor-pointer"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </div>
  );
}
