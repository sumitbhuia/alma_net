"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ClientSideLogo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial dark mode based on the media query
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isDarkMode]);

  return (
    <Link href="/" className="flex items-center">
      <span>
        <img
          src={isDarkMode ? "/asset/almanet-high-resolution-logo-white-transparent.svg" : "/asset/almanet-high-resolution-logo-transparent.svg"}
          alt="Almanet"
          className="h-4 sm:h-5 md:h-6 lg:h-7 xl:h-7"
        />
      </span>
    </Link>
  );
}
