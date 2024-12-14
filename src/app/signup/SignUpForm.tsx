"use client";

import { signup } from "./actions";
import { useState, useTransition, useRef } from "react";

export function SignUpForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
  
      startTransition(async () => {
        const result = await signup(formData);
        if (result?.errors) {
          setErrors(result.errors);
          setIsSubscribed(false); 
        } else {
          setErrors({});
          setIsSubscribed(true);
        }
        if (formRef.current) {
          formRef.current.reset();
        }
      });
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
          <div>
            <input className="input-field" name="name" placeholder="Name" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
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
            className={`w-full font-bold py-2 px-4 rounded transition ${
              isSubscribed
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={isPending || isSubscribed}
          >
            {isSubscribed
              ? "Subscribed"
              : isPending
              ? "Signing up..."
              : "Sign Up"}
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