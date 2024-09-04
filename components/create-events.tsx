"use client"; // Ensure this is included for Client Components

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const CreateEvent: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensures the theme is loaded before rendering

  return (
    <div
      className={`flex justify-center items-center ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div
        className="p-8 rounded-xl transform transition-transform duration-500 hover:scale-105"
        style={{
          background: `${theme === "dark" ? "#000000" : "#FFFFFF"}`,
          boxShadow: "none",
          border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}`,
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Event</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Event Name */}
          <div>
            <label htmlFor="eventName" className="block text-sm font-semibold">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              className={`mt-2 block w-full py-2 px-4 ${
                theme === "dark"
                  ? "border-gray-700 bg-transparent text-gray-100"
                  : "border-gray-300 bg-transparent text-gray-800"
              } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter event name"
              style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
            />
          </div>

          {/* Event Link */}
          <div>
            <label htmlFor="eventLink" className="block text-sm font-semibold">
              Event Link
            </label>
            <input
              type="text"
              id="eventLink"
              className={`mt-2 block w-full py-2 px-4 ${
                theme === "dark"
                  ? "border-gray-700 bg-transparent text-gray-100"
                  : "border-gray-300 bg-transparent text-gray-800"
              } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter event link"
              style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold">
              Date
            </label>
            <input
              type="date"
              id="date"
              className={`mt-2 block w-full py-2 px-4 ${
                theme === "dark"
                  ? "border-gray-700 bg-transparent text-gray-100"
                  : "border-gray-300 bg-transparent text-gray-800"
              } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-semibold">
              Time
            </label>
            <input
              type="time"
              id="time"
              className={`mt-2 block w-full py-2 px-4 ${
                theme === "dark"
                  ? "border-gray-700 bg-transparent text-gray-100"
                  : "border-gray-300 bg-transparent text-gray-800"
              } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
            />
          </div>
        </div>

        {/* Event Mode */}
        <div>
          <label htmlFor="eventMode" className="block text-sm font-semibold">
            Event Mode
          </label>
          <select
            id="eventMode"
            className={`mt-2 mb-4 block w-full py-2 px-4 ${
              theme === "dark"
                ? "border-gray-700 bg-transparent text-gray-100"
                : "border-gray-300 bg-transparent text-gray-800"
            } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className={`mt-2 block w-full py-2 px-4 ${
              theme === "dark"
                ? "border-gray-700 bg-transparent text-gray-100"
                : "border-gray-300 bg-transparent text-gray-800"
            } rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter event description"
            style={{ border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}` }}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-blue-600 transition-colors"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;