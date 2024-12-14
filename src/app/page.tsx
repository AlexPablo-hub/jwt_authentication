"use client";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Home</h1>
        <div className="space-y-4">
          <button
            className="w-full font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </button>
          <button
            className="w-full font-bold bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
