"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '../../utils/supabase/client';
import useProfile from '../hook/useProfile';

interface VerificationDocumentsProps {
  userType: 'student' | 'alumni';
  email: string;
}

export default function VerificationDocuments() {
  //# TODO - Fetch user data from the profiles table and make this code dynamic & remove hard coded data
  //#TODO - Add user role to backend and frontend and use it here

  //const { data } = useProfile();
  //console.log(data);
  
  // Initialize email and userType (hard-coded for now)
  const [email, setEmail] = useState<string>('sumit.bhuia.ece26@heritageit.edu.in');
  const [userType, setUserType] = useState<'student' | 'alumni'>('student');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'id_card' | 'degree' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the user ID from the profiles table
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await createClient()
        .from('profiles')
        .select('id')
        .eq('email', email) // Replace 'email' with the appropriate unique identifier
        .single();

      if (error) {
        console.error("Error fetching user ID:", error);
      } else if (data) {
        setUserId(data.id);
      }
    };
    
    fetchUserId();
  }, [email]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadType(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadType || !userId) return;

    //const userId = "ae3279df-328e-40c5-b3a1-311d42b0f0ba"; // Replace with dynamic userId if available
    const contentType = selectedFile.type || 'application/octet-stream';
    
    const { data, error } = await createClient().storage
      .from("user_files")
      .upload(`/${userId}/${uploadType}/${selectedFile.name}`, selectedFile, {
        contentType: contentType,
      });

    if (data) {
      console.log(`Uploaded ${uploadType}:`, data);
    } else if (error) {
      console.error(`Error uploading ${uploadType}:`, error);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-6">
      <div className=" w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Upload proof of your academic status</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We need a little more proof to verify your academic status. What we need to see:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ID Card Section */}
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center">
            <Image
              src="/image/id.png" // replace with your actual image path
              alt="Sample Student ID"
              width={400}
              height={240}
              className="mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {userType === 'student' ? 'Your student ID' : 'Your Student ID'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Your ID should include a date that verifies your current enrollment. Make sure the image is clear and
              easy to read; if it looks blurry, please take a new photo and upload it again.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileUpload(e);
                setUploadType('id_card');
              }}
              className="mt-2 py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold cursor-pointer transition-all"
            />
          </div>

          {/* Degree Section */}
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center">
            <Image
              src="/image/degree.png" // replace with your actual image path
              alt="Sample Degree"
              width={400}
              height={240}
              className="mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Or another form of proof</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              If you don't have a student ID, or it doesn't include a date, you can upload a letter on school
              letterhead or any documentation with a date that demonstrates your current enrollment.
            </p>
            <input
              type="file"
              accept="application/pdf, image/*"
              onChange={(e) => {
                handleFileUpload(e);
                setUploadType('degree');
              }}
              className="mt-2 py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold cursor-pointer transition-all"
            />
          </div>
        </div>

        {/* Dotted separation line */}
        <div className="border-t border-dotted border-gray-300 dark:border-gray-700 my-6"></div>

        {/* Upload Proof Box */}
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Please upload proof of your academic status.</h3>

          {/* Upload Photo Box */}
          <div className="w-64 h-64 border border-dotted border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg mx-auto">
            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded Proof"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <span className="text-gray-400 dark:text-gray-500">No Photo</span>
            )}
          </div>

          {/* Remove Photo Button */}
          {selectedFile && (
            <button
              onClick={handleRemoveFile}
              className="mt-2 py-1 px-2 rounded-lg border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-600 hover:text-white dark:hover:bg-red-400 dark:hover:text-white transition-all mx-auto"
            >
              Remove Photo
            </button>
          )}
        </div>

        {/* Process Button */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleUpload}
            className="bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold">
            Process my documents
          </button>
        </div>
      </div>
    </div>
  );
}
