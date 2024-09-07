// "use client"; // Ensure this is included for Client Components

// import React, { useState } from "react";
// import { useTheme } from "next-themes";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const ProfilePage: React.FC = () => {
//   const { theme } = useTheme();
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [experienceList, setExperienceList] = useState([{ company: "", startDate: new Date(), endDate: new Date() }]);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           setProfileImage(e.target.result as string);
//         }
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const addExperience = () => {
//     setExperienceList([...experienceList, { company: "", startDate: new Date(), endDate: new Date() }]);
//   };

//   const removeExperience = (index: number) => {
//     const updatedList = experienceList.filter((_, i) => i !== index);
//     setExperienceList(updatedList);
//   };

//   const updateExperience = (index: number, field: string, value: any) => {
//     const updatedList = experienceList.map((exp, i) =>
//       i === index ? { ...exp, [field]: value } : exp
//     );
//     setExperienceList(updatedList);
//   };

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-center ${
//         theme === "dark" ? "text-gray-100" : "text-gray-900"
//       }`}
//     >
//       <div className="flex w-full max-w-5xl">
//         {/* Left Section (40%) */}
//         <div className="w-2/5 p-4 space-y-6">
//           {/* Profile Image */}
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div
//                 className="w-24 h-24 bg-gray-300 rounded-full shadow-lg"
//                 style={{
//                   backgroundImage: `url(${profileImage || ""})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
//                 onChange={handleImageUpload}
//               />
//             </div>
//           </div>

//           {/* Bio */}
//           <div
//             className="glass p-4 rounded-lg"
//             style={{
//               background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
//             }}
//           >
//             <h1>Bio</h1>
//             <textarea
//               placeholder="Let others know about you"
//               rows={3}
//               className="w-full p-3 rounded-lg"
//               style={{
//                 background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                 border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//               }}
//             />
//           </div>

//           {/* Experience */}
//           <div
//             className="glass p-4 rounded-lg"
//             style={{
//               background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
//             }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <label className="font-semibold">Experience</label>
//               <button
//                 onClick={addExperience}
//                 className="text-blue-500 hover:text-blue-700 font-bold"
//               >
//                 +
//               </button>
//             </div>

//             {experienceList.map((experience, index) => (
//               <div key={index} className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Company"
//                   value={experience.company}
//                   onChange={(e) => updateExperience(index, "company", e.target.value)}
//                   className="w-full p-2 rounded-lg mb-2"
//                   style={{
//                     background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                     border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                   }}
//                 />
//                 <div className="flex space-x-2">
//                   <DatePicker
//                     selected={experience.startDate}
//                     onChange={(date) => updateExperience(index, "startDate", date)}
//                     className="w-1/2 p-2 rounded-lg"
//                     placeholderText="Start Date"
//                     style={{
//                       background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                       border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                     }}
//                   />
//                   <DatePicker
//                     selected={experience.endDate}
//                     onChange={(date) => updateExperience(index, "endDate", date)}
//                     className="w-1/2 p-2 rounded-lg"
//                     placeholderText="End Date"
//                     style={{
//                       background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                       border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                     }}
//                   />
//                 </div>
//                 <button
//                   onClick={() => removeExperience(index)}
//                   className="text-red-500 hover:text-red-700 mt-2 font-bold"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div
//             className="glass p-4 rounded-lg"
//             style={{
//               background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
//             }}
//           >
//             <label className="font-semibold">Social Links</label>
//             <div className="mb-4">
//                 <h1>GitHub</h1>
//               <input
//                 type="text"
//                 placeholder="Enter GitHub URL"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//                 <h1>LinkedIn</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your LinkedIn URL"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>

        

//         {/* Right Section (60%) */}
//         <div className="w-3/5 p-4 space-y-6">
//           {/* Personal Details */}
//           <div
//             className="glass p-4 rounded-lg"
//             style={{
//               background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
//             }}
//           >
//             <label className="font-semibold">Personal Details</label>
//             <div className="mb-4">
//             <h1>Location</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your location"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//                 <h1>Phone No.</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your phone no."
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//             <h1>College email</h1>
//               <input
//                 type="email"
//                 placeholder="College Email"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//             <h1>Roll No.</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your roll number"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//                 <h1>Passing Year</h1>
//               <input
//                 type="text"
//                 placeholder="YYYY"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//                 <h1>College</h1>
//               <select
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               >
//                 <option value="">Select your college</option>
//                 <option value="college1">College 1</option>
//                 <option value="college2">College 2</option>
//                 <option value="college3">College 3</option>
//               </select>
//             </div>

            
//           </div>

//           {/* Professional Details */}
//           <div
//             className="glass p-4 rounded-lg"
//             style={{
//               background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
//               boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//               border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
//             }}
//           >
//             <label className="font-semibold">Professional Details</label>
//             <div className="mb-4">
//                 <h1>Current Role</h1>
//               <input
//                 type="text"
//                 placeholder="Enter current role"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//                 <h1>Company/Organization</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your current organization"
//                 className="w-full p-3 rounded-lg"
//                 style={{
//                   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
//                   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfilePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [experienceList, setExperienceList] = useState([{ company: "", startDate: new Date(), endDate: new Date() }]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const addExperience = () => {
    setExperienceList([...experienceList, { company: "", startDate: new Date(), endDate: new Date() }]);
  };

  const removeExperience = (index: number) => {
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedList = experienceList.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperienceList(updatedList);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {<div className="flex w-full max-w-5xl">
        {/* Left Section (40%) */}
        <div className="w-2/5 p-4 space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="w-24 h-24 bg-gray-300 rounded-full shadow-lg"
                style={{
                  backgroundImage: `url(${profileImage || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Bio */}
          <div
            className="glass p-4 rounded-lg"
            style={{
              background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
            }}
          >
            <h1>Bio</h1>
            <textarea
              placeholder="Let others know about you"
              rows={6}
              className="w-full p-2 rounded-lg"
              style={{
                background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
              }}
            />
          </div>

          {/* Experience */}
          <div
            className="glass p-4 rounded-lg"
            style={{
              background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <label className="font-semibold">Experience</label>
              <button
                onClick={addExperience}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                +
              </button>
            </div>

            {experienceList.map((experience, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={experience.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="w-full p-2 rounded-lg mb-2"
                  style={{
                    background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                    border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                  }}
                />
                <div className="flex space-x-2">
                  <DatePicker
                    selected={experience.startDate}
                    onChange={(date) => updateExperience(index, "startDate", date)}
                    className="w-1/2 p-2 rounded-lg"
                    placeholderText="Start Date"
                    // style={{
                    //   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                    //   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                    // }}
                    
                  />
                  
                  <DatePicker
                    selected={experience.endDate}
                    onChange={(date) => updateExperience(index, "endDate", date)}
                    className="w-1/2 p-2 rounded-lg"
                    placeholderText="End Date"
                    // style={{
                    //   background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                    //   border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                    // }}
                  />
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 mt-2 font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div
            className="glass p-4 rounded-lg"
            style={{
              background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
            }}
          >
            <label className="font-semibold">Social Links</label>
            <div className="mb-4">
                <h1>GitHub</h1>
              <input
                type="text"
                placeholder="Enter GitHub URL"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
                <h1>LinkedIn</h1>
              <input
                type="text"
                placeholder="Enter your LinkedIn URL"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>
          </div>
        </div>

        

        {/* Right Section (60%) */}
        <div className="w-3/5 p-4 space-y-6">
          {/* Personal Details */}
          <div
            className="glass p-4 rounded-lg"
            style={{
              background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
            }}
          >
            <label className="font-semibold ">Personal Details</label>
            <div className="mb-4">
            <h1>Location</h1>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
                <h1>Phone No.</h1>
              <input
                type="text"
                placeholder="Enter your phone no."
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
            <h1>College email</h1>
              <input
                type="email"
                placeholder="College Email"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
            <h1>Roll No.</h1>
              <input
                type="text"
                placeholder="Enter your roll number"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
                <h1>Passing Year</h1>
              <input
                type="text"
                placeholder="YYYY"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
                <h1>College</h1>
              <select
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              >
                <option value="">Select your college</option>
                <option value="college1">College 1</option>
                <option value="college2">College 2</option>
                <option value="college3">College 3</option>
              </select>
            </div>

            
          </div>

          {/* Professional Details */}
          <div
            className="glass p-4 rounded-lg"
            style={{
              background: `${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.18)"}`,
            }}
          >
            <label className="font-semibold">Professional Details</label>
            <div className="mb-4">
                <h1>Current Role</h1>
              <input
                type="text"
                placeholder="Enter current role"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>

            <div className="mb-4">
                <h1>Company/Organization</h1>
              <input
                type="text"
                placeholder="Enter your current organization"
                className="w-full p-3 rounded-lg"
                style={{
                  background: `${theme === "dark" ? "#1a1a1a" : "#f5f5f5"}`,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              />
            </div>
          </div>
          {/* Submit Button */}
        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-blue-600 transition-colors"
        >
          Create
        </button>
        </div>
      </div>}
    </div>
  );
};

export default ProfilePage;



