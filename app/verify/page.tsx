"use client";

import { useState } from 'react';
import Image from 'next/image';

interface VerificationDocumentsProps {
  userType: 'student' | 'alumni';
}

export default function VerificationDocuments({ userType }: VerificationDocumentsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full relative min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-6">
      <div className=" w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Upload proof of your academic status</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We need a little more proof to verify your academic status. What we need to see:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
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
          </div>

          {/* Right Column */}
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

          {/* Choose File Button */}
          <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            className="mt-2 py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold cursor-pointer transition-all mx-auto"
          />

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
          <button className="bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold">
            Process my documents
          </button>
        </div>
      </div>
    </div>
  );
}
