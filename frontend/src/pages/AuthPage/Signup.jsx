import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";

export default function Signup({ onToggleMode }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { login } = useAuth();

  const onSignupSubmit = async (data) => {
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
        console.log("User created:", result);
      } else {
        alert(result.error || "Signup failed. Check your passkey or details.");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Create Account
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSignupSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <input
          type="password"
          placeholder="Passkey"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          {...register("passkey", {
            required: "PassKey is required",
          })}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded font-semibold transition ${
            !isValid
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
          onClick={onToggleMode}
          className="text-green-400 hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </div>
  );
}
