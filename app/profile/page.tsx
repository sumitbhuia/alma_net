"use client";

import React, { useState } from "react";
import Image from "next/image";

const ProfilePage: React.FC = () => {
  const [userType, setUserType] = useState<"student" | "alumni">("student");
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    collegeName: "",
    rollNumber: "",
    duration: "",
    profession: "",
    company: "",
    bio: "",
    contact: "",
    github: "",
    linkedin: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const handleRemoveFile = (setFile: (file: File | null) => void) => {
    setFile(null);
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    console.log("Profile Photo:", selectedFile);
    console.log("Resume:", resume);
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Profile Photo and Contact Sections */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Photo Container */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
                {selectedFile ? (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <span className="text-gray-400">No Photo</span>
                )}
              </div>

              {/* Choose File Button */}
              <input
                type="file"
                id="file-upload"
                onChange={(e) => handleFileUpload(e, setSelectedFile)}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold cursor-pointer transition-all"
              />

              {/* Remove Photo Button */}
              {selectedFile && (
                <button
                  onClick={() => handleRemoveFile(setSelectedFile)}
                  className="w-full py-2 px-4 rounded-lg border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-600 hover:text-white dark:hover:bg-red-400 dark:hover:text-black transition-all"
                >
                  Remove Photo
                </button>
              )}
            </div>

            {/* Contact Section */}
            <div className="w-full">
              <div className="flex flex-col space-y-4">
                <div className="mt-3 w-full p-4 rounded-lg shadow-lg space-y-2 border border-gray-300 dark:border-gray-600">
                  <label htmlFor="contact" className="block text-gray-600 dark:text-gray-300 font-semibold">
                    Contact (Gmail)
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="email"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-800 dark:text-white p-3 rounded-lg border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="yourname@gmail.com"
                  />
                </div>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="GitHub"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                />

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="w-full">
              <div className="w-full p-4 rounded-lg shadow-lg space-y-2 border border-gray-300 dark:border-gray-600">
                <label htmlFor="bio" className="block text-gray-600 dark:text-gray-300 font-semibold">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-gray-800 dark:text-white p-3 rounded-lg h-48 resize-none border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your bio here..."
                />
              </div>
            </div>

            {/* Card Component */}
            <div className="p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">User Type</label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as "student" | "alumni")}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="student">Student</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>

              {userType === "student" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Course</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select your course...</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Applied Course">Applied Course</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">College Name</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your College Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="XXXX - XXXX"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Profession</label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your Profession"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Save Button - Centered at the Bottom */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className="py-3 px-6 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-md hover:bg-green-600 dark:hover:bg-green-500 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
