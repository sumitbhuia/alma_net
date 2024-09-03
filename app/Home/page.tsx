'use client';

import Image from 'next/image';
import "../globals.css";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <div className={`w-full h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Custom Grid Background */}
      <div className={`absolute inset-0 gridBackground pointer-events-none ${isDarkMode ? 'opacity-20' : 'opacity-30'}`} />

      {/* Diagonal Mesh Gradient */}
      <div className={`absolute left-0 top-0 w-full h-full bg-gradient-to-br 
        ${isDarkMode ? 'from-orange-500 via-transparent to-purple-500' : 'from-blue-200 via-transparent to-blue-500'} 
        opacity-30 pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="text-center w-full">
          <Image src="/image/man.png" alt="Man with scope" width={500} height={500} />

          <h1 className={`text-6xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span>Connect</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8CED] via-[#9F8CED] to-[#FA7C0B]">Alumni’s</span>
            <br />
            <span>like never</span>
            <br />
            <span>before</span>
          </h1>

          <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here you can unlock your doubts with a bright path......
          </p>

          {/* Placeholder for future user-specific content */}
          <div className="mt-8">
            {/*
              This will be replaced with your card component later.
              Use conditional rendering to show different content based on the user type (student or alumni).
            */}
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {/* Welcome! Here you will see personalized content based on your profile. */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
