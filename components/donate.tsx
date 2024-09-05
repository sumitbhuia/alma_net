"use client"; // Ensure this is included for Client Components

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Donate: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensures the theme is loaded before rendering

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div
        className="p-10 rounded-2xl transform transition-transform duration-500 hover:scale-105"
        style={{
          width: "90%",
          maxWidth: "1200px", // Adjust the max width as needed
          background: `${theme === "dark" ? "#111111" : "#FFFFFF"}`,
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
          border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}`,
        }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center">Donate for your AlmaMater</h2>
        
        <div className="flex gap-6">
          {/* Left Side (Bank Details and UPI Details) */}
          <div className="flex flex-col gap-14 w-2/3">
            {/* Bank Details Card */}
            <div
              className="p-6 rounded-lg"
              style={{
                background: `${theme === "dark" ? "#222222" : "#F9F9F9"}`,
                border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}`,
              }}
            >
              <h3 className="text-2xl font-semibold mb-4">Bank Details</h3>
              <p>Beneficiary Name: Heritage Institute of Technology</p>
              <p>Bank Name: Punjab National Bank</p>
              <p>Account Number:1426010100000038 </p>
              <p>IFSC Code: PUNB0632300</p>
              <p>MICR Code No: 700024085</p>
              <p>Type: Savings</p>
            </div>

            {/* UPI Details Card */}
            <div
              className="p-6 rounded-lg"
              style={{
                background: `${theme === "dark" ? "#222222" : "#F9F9F9"}`,
                border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}`,
              }}
            >
              <h3 className="text-2xl font-semibold mb-4">UPI Details</h3>
              <p>UPI ID: 9830201234@yapl</p>
              <p>UPI Phone: +91-9830201234</p>
            </div>
          </div>

          {/* Right Side (UPI QR Code) */}
          <div
            className="p-6 flex justify-center items-center rounded-lg"
            style={{
              background: `${theme === "dark" ? "#222222" : "#F9F9F9"}`,
              border: `1px solid ${theme === "dark" ? "#444" : "#DDD"}`,
              width: "100%",
              maxWidth: "400px",
              height: "100%",
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">UPI QR Code</h3>
              {/* QR Code Placeholder */}
              <div
                className="w-full h-full border border-dashed border-gray-500 rounded-lg flex items-center justify-center"
                style={{
                  height: "350px",
                  width: "250px",
                }}
              >
                {/* Replace with QR code image */}
                <img src="https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq" alt="UPI QR Code" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
