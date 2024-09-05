'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const FundraiserPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    pptLink: '',
    thumbnail: null as File | null,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensure theme is loaded before rendering

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Header */}
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Turn Vision into Reality</h1>
        <p className="text-lg text-gray-600">Share your business idea, and let alma support you!</p>
      </header>

      {/* Fundraiser Form Section */}
      <section className="my-8 flex justify-center items-center">
        {/* Form Container */}
        <div
            className={`p-8 rounded-xl w-full max-w-3xl transform transition-transform duration-500 hover:scale-105 ${
            theme === 'dark'
            ? 'bg-gray-800 border-gray-700 glass'
            : 'bg-white border-gray-300'
        } border shadow-md space-y-4`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Fundraiser</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Idea Title Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-transparent border-gray-700 text-gray-100 focus:ring-purple-500'
                      : 'border-gray-300 text-gray-900 focus:ring-purple-500'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Idea Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-transparent border-gray-700 text-gray-100 focus:ring-purple-500'
                      : 'border-gray-300 text-gray-900 focus:ring-purple-500'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full h-32 px-4 py-3 border rounded-md focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-transparent border-gray-700 text-gray-100 focus:ring-purple-500'
                    : 'border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                required
              />
            </div>

            {/* Idea PPT and Poster Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Idea PPT</label>
                <input
                  type="url"
                  name="pptLink"
                  value={formData.pptLink}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-transparent border-gray-700 text-gray-100 focus:ring-purple-500'
                      : 'border-gray-300 text-gray-900 focus:ring-purple-500'
                  }`}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Idea Poster</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-transparent border-gray-700 text-gray-100 focus:ring-purple-500'
                      : 'border-gray-300 text-gray-900 focus:ring-purple-500'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md font-semibold shadow-md hover:from-indigo-600 hover:to-blue-600 transition-colors"
            >
              Submit Fundraiser
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FundraiserPage;
