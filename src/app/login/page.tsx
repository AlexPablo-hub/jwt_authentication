"use client";
import { useState, useTransition } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.errors) {
        setErrors(result.errors);
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input className="input-field" name="email" placeholder="Email" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              className="input-field"
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            className="w-full font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:bg-gray-300"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          <button
            className="w-full font-bold bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
