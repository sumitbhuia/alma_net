// // 'use client'
// // import React, { useState } from 'react';

// // const DonationPage: React.FC = () => {
// //   const [amount, setAmount] = useState<string>('');
// //   const [message, setMessage] = useState<string>('');

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     alert(`Donated ${amount} with message: ${message}`);
// //   };

// //   return (
// //     <div className="min-h-screen w-full bg-black text-white p-4">
// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 text-white p-4 rounded-xl">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <h1 className="text-2xl font-bold bg-center align-middle">Support Your Fellow Students</h1>
          
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="min-h-[calc(100vh-10rem)] flex flex-col justify-between">
// //         {/* Hero Section */}
// //         <section className="bg-gradient-to-r from-orange-500 to-purple-500 text-center py-20 mb-8 rounded-2xl">
// //           <h2 className="text-4xl font-bold mb-4">Help Shape the Future</h2>
// //           <p className="mb-8">Your donation can make a difference in a student's life.</p>
// //           <a href="#donate" className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
// //             Donate Now
// //           </a>
// //         </section>

// //         {/* Student Details */}
// //         <section className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
// //           <h3 className="text-2xl font-bold mb-4">About</h3>
// //           <p className="mb-6">
// //             Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque reiciendis. Qui beatae vel
// //             magnam repudiandae ipsum repellat repudiandae. Voluptate at dolores ut dolor sint occaecati
// //             similique. Velit eius ab delectus temporibus.
// //           </p>
          
// //           {/* Other Donation Methods */}
// //           <h4 className="font-bold mb-4">Other Donation Methods</h4>
// //           <div className="bg-gray-700 p-4 rounded-xl mb-6">
// //             <p className="font-semibold">Directly Bank Transfer</p>
// //             <p>Account Number: 2223330000456987</p>
// //             <p>Beneficiary Name: Organization</p>
// //             <p>IFSC Code: WRDSB10BNKPIS</p>
// //           </div>
// //           <div className="bg-gray-700 p-4 rounded-xl">
// //             <p className="font-semibold">UPI</p>
// //             <p>Mobile Number: 8939406129</p>
// //             <p>UPI ID: 21551</p>
// //             <p>OR Code: <span className="bg-gray-600 p-2 rounded-xl">[QR CODE]</span></p>
// //           </div>

// //           {/* Contact Details */}
// //           <div className="bg-gray-700 p-4 rounded-xl mt-6">
// //             <h4 className="font-bold mb-4">Contact Details</h4>
// //             <p>Name: Mansoor</p>
// //             <p>Relationship: Principle</p>
// //             <p>Contact: 6374949300</p>
// //             <p>Email: mansoor@gmail.com</p>
// //           </div>
// //         </section>

// //         {/* Donation Form */}
        
// //         {/* Recent Contributors */}
        
// //       </main>

// //       {/* Footer */}
     
// //     </div>
// //   );
// // };

// // export default DonationPage;
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
