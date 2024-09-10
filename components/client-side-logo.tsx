"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientSideLogo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('Initial dark mode detection:', mediaQuery.matches);

    // Set initial dark mode based on the media query
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      console.log('Dark mode changed to:', e.matches);
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isDarkMode]);

  console.log('Current dark mode state:', isDarkMode);

  return (
    <Link href="/" className="flex items-center">
      <span>
        <img
          src={isDarkMode ? "/asset/almanet-high-resolution-logo-white-transparent.svg" : "/asset/almanet-high-resolution-logo-transparent.svg"}
          alt="Almanet"
          className="h-8"
        />
      </span>
    </Link>
  );
}
