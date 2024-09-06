// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { useTheme } from 'next-themes';

// export default function LandingPage() {
//   const { theme } = useTheme();
//   const isDarkMode = theme === 'dark';

//   const services = [
//     { title: 'Discussion Forum', description: 'Dynamic forum for fostering meaningful connections and discussions between alumni and students.', icon: '/images/branding-icon.png' },
//     { title: 'Career Guidance', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/webdev-icon.png' },
//     { title: 'Intearactive Chatbot', description: 'Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est.', icon: '/images/digital-marketing-icon.png' },
//     { title: 'Live Webinar', description: 'Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices', icon: '/images/mobile-app-icon.png' },
//     { title: 'Chat', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/seo-icon.png' },
//     { title: 'Donation', description: 'Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est.', icon: '/images/user-testing-icon.png' },
//   ];

//   return (
//     <div className={`w-full h-auto py-20 px-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto text-center">
//         <Image src="/images/placeholder.png" alt="We Offer" width={60} height={60} className="mx-auto mb-4" />
//         <h2 className="text-4xl font-bold mb-4">We Offer</h2>
//         <p className="text-lg mb-16">
//           AlumNet is commited for bridging the experience gap by providing the best student alumni connect through various services.
//         </p>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className={`p-6 border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg
//               ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'bg-white'}`}
//             >
//               <div className="flex items-centre mb-4">
//                 <Image src={service.icon} alt={service.title} width={40} height={40} className="mr-4" />
//                 <h3 className="text-2xl font-semibold">{service.title}</h3>
//               </div>
//               <p>{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensures the theme is loaded before rendering

  const isDarkMode = theme === 'dark';

  const services = [
    { title: 'Discussion Forum', description: 'Dynamic forum for fostering meaningful connections and discussions between alumni and students.', icon: '/images/branding-icon.png' },
    { title: 'Career Guidance', description: 'Personalized advice and mentorship to guide students in making informed career decisions.', icon: '/images/webdev-icon.png' },
    { title: 'Interactive Chatbot', description: 'AI-driven chatbot for seamless platform navigation and instant answers to user queries.', icon: '/images/digital-marketing-icon.png' },
    { title: 'Live Webinar', description: 'Interactive live sessions connecting students with alumni for real-time learning and networking.', icon: '/images/mobile-app-icon.png' },
    { title: 'Chat', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/seo-icon.png' },
    { title: 'Donation', description: 'Support your alma mater through a secure and easy-to-use donation platform.', icon: '/images/user-testing-icon.png' },
    { title: 'Startup Funding', description: 'Empower student innovation with funding opportunities for promising startup ideas.', icon: '/images/mobile-app-icon.png' },
    { title: 'AI Recommendation', description: 'Integer ante non nunc, eget est justo vel semper nunc. Lacus', icon: '/images/seo-icon.png' },
    { title: 'OCR Verfication', description: 'Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est.', icon: '/images/user-testing-icon.png' },
  ];

  return (
    <div className={`w-full h-auto py-20 px-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-center">
        <Image src="/images/placeholder.png" alt="We Offer" width={60} height={60} className="mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">We Offer</h2>
        <p className="text-lg mb-16">
          AlumNet is committed to bridging the experience gap by providing the best student-alumni connect through various services.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg
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



