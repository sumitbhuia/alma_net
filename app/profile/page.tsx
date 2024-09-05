"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../utils/supabase/client";
import useProfile from "../hook/useProfile";

  const ProfilePage: React.FC = () => {
    const supabase = createClient();
    const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfile();
    const [userType, setUserType] = useState<"student" | "alumni">("student");
    const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [colleges, setColleges] = useState<{ id: string; college_name: string }[]>([]);




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
      userType: "",
    });
  


    // Implementing colleges names and id drop-down
    useEffect(() => {
      const fetchColleges = async () => {
        const { data, error } = await supabase.from('colleges').select('id, college_name');

        if (error) {
          console.error(error);
          setColleges([]); // In case of error, set an empty array
        } else {
          setColleges(data || []);
        }
      };

      fetchColleges();
    }, []);

    


    useEffect(() => {
      if (profile) {
        setFormData({
          name: profile.display_name || "",
          course: profile.course || "",
          collegeName: profile.college_id || "",
          rollNumber: profile.roll_no || "",
          duration: profile.passing_year?.toString() || "",
          profession: "", // Assuming this field is only for alumni
          company: "", // Assuming this field is only for alumni
          bio: profile.bio || "",
          contact: profile.phone || "",
          github: profile.github_url || "",
          linkedin: profile.linkedin_url || "",
          userType: profile.user_role || "student",
        });
        setUserType(profile.user_role as "student" | "alumni");
      }
    }, [profile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
      }
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
    };

    const handleSave = async () => {


      const userId = profile?.id;
  
      const contentType = selectedFile?.type || "application/octet-stream";
  
      const { data, error } = await supabase.storage
        .from("user_files")
        .upload(`/${userId}/profilepic/${selectedFile?.name}`, selectedFile as File, {
          contentType,
        });
  
      if (data) {
        console.log(`Successfully uploaded`);
      }

      if (!profile) {
        console.error("No profile data available for update.");
        return;
      }
  
      try {
        const updates = {
          display_name: formData.name,
          course: formData.course,
          roll_no: formData.rollNumber,
          bio: formData.bio,
          phone: formData.contact,
          github_url: formData.github,
          linkedin_url: formData.linkedin,
          user_role: userType,
          college_id: selectedCollege,
          passing_year: formData.duration ? parseInt(formData.duration) : null,
        };
  
        const { data, error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", profile.id);
  
        if (error) {
          console.error("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
        }
      } catch (error) {
        console.error("Unexpected error:", (error as Error).message);
      }
    };

    if (isProfileLoading) {
      return <div className="flex items-center justify-center">Loading...</div>;
    }

    if (profileError) {
      return <div className="flex items-center justify-center">Error loading profile: {profileError.message}</div>;
    }

  return (
    <div className="w-full min-h-screen px-20 bg-white dark:bg-neutral-950 text-gray-800 dark:text-white ">
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
                onChange={handleFileUpload}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold cursor-pointer transition-all"
              />

              {/* Remove Photo Button */}
              {selectedFile && (
                <button
                  onClick={handleRemoveFile}
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
                    Phone
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

            {/* Card Component inside it all course , roll etc. */}
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
                  />
                </div>

                {/* course */}
                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* college */}
                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">College Name</label>
                    <select
                      className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setSelectedCollege(e.target.value)}
                    >
                      {colleges.map((college) => (
                        <option key={college.id} value={college.id}>
                          
                          {college.college_name}
                        </option>
                      ))}
                      
                    </select>
                </div>

                  {/* roll number */}
                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                  {/* passing year */}
                <div className="space-y-2">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                  {/* profession and position  are only available to alumni */}
                {userType === "alumni" && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-gray-600 dark:text-gray-300 font-semibold">Profession</label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-800 dark:text-white rounded-lg p-3 border border-gray-600 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      />
                    </div>
                  </>
                )}
              </div>
            </div>


            {/* save button */}
            <div className="w-full flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-8 rounded-lg transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
