'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function LandingPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const services = [
    { title: 'Branding', description: 'Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices', icon: '/images/branding-icon.png' },
    { title: 'Web development', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/webdev-icon.png' },
    { title: 'Digital marketing', description: 'Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est.', icon: '/images/digital-marketing-icon.png' },
    { title: 'Mobile App', description: 'Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices', icon: '/images/mobile-app-icon.png' },
    { title: 'SEO', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/seo-icon.png' },
    { title: 'User testing', description: 'Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est.', icon: '/images/user-testing-icon.png' },
  ];

  return (
    <div className={`w-full h-auto py-20 px-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-center">
        <Image src="/images/placeholder.png" alt="We Offer" width={60} height={60} className="mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">We Offer</h2>
        <p className="text-lg mb-16">
          Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in elit. Morbi rhoncus, tellus, eros consequat magna semper orci a tincidunt.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg
              ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'bg-white'}`}
            >
              <div className="flex items-center mb-4">
                <Image src={service.icon} alt={service.title} width={40} height={40} className="mr-4" />
                <h3 className="text-2xl font-semibold">{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
