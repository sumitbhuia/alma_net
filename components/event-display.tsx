"use client";

import React from "react";
import { useTheme } from "next-themes";

const EventCard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full max-w-xs p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 border ${
        theme === "dark"
          ? "bg-opacity-50 bg-black text-gray-100 border-gray-700"
          : "bg-opacity-50 bg-white text-gray-900 border-gray-300"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Event Name */}
      <h2 className="text-xl font-semibold mb-4">
        {/* Event Name - To be fetched from backend */}
        Upcoming Webinar: AI & Future
      </h2>

      {/* Speaker Info */}
      <div className="flex items-center mb-4">
        {/* Speaker Profile Image */}
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
          {/* Speaker Profile Image - To be fetched from backend */}
        </div>
        <div>
          {/* Speaker Name - To be fetched from backend */}
          <p className="font-semibold">John Doe</p>
          {/* Event Date & Time - To be fetched from backend */}
          <p className="text-sm text-gray-500">Sep 10, 2024, 10:00 AM</p>
        </div>
      </div>

      {/* Join Now Button */}
      <a
        href="#"
        className="block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors"
        // Webinar Link - To be fetched from backend
      >
        Join Now
      </a>
    </div>
  );
};

export default EventCard;