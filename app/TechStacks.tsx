// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useTheme } from 'next-themes';

// export default function TechStacks() {
//   const logos = [
//     '/images/logo1.png',
//     '/images/logo2.png',
//     '/images/logo3.png',
//     '/images/logo4.png',
//     '/images/logo5.png',
//     '/images/logo6.png',
//     '/images/logo7.png',
//     '/images/logo8.png',
//     '/images/logo9.png',
//   ];

//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDarkMode = theme === 'dark';

//   return (
//     <div className={`w-full overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
//       {/* Diagonal Mesh Gradient */}
//       <div
//         className={`absolute left-0 top-0 w-full h-full bg-gradient-to-br ${
//           isDarkMode
//             ? 'from-orange-500 via-transparent to-purple-500'
//             : 'from-blue-200 via-transparent to-blue-500'
//         } opacity-30 pointer-events-none`}
//       />

//       <div className="max-w-7xl mx-auto text-left py-20 px-4">
//         <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#897bc2] to-[#9F8CED] via-[#dc6700]">
//           TechStacks
//         </h2>

//         {/* Marquee with Logos */}
//         <div className="relative overflow-hidden whitespace-nowrap py-8">
//           <motion.div
//             animate={{ x: '-100%' }}
//             transition={{
//               repeat: Infinity,
//               ease: 'linear',
//               duration: 5,
//               repeatType: 'loop',
//             }}
//             className="flex space-x-8"
//           >
//             {logos.map((logo, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg bg-gray-800"
//               >
//                 <Image src={logo} alt={`Logo ${index + 1}`} width={80} height={80} className="max-w-full h-auto" />
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function TechStacks() {
  const logos = [
    '/image/huggingface.png',
    '/images/chat.png',
    '/images/logo3.png',
    '/images/logo4.png',
    '/images/logo5.png',
    '/images/logo6.png',
    '/images/logo7.png',
    '/images/logo8.png',
    '/images/logo9.png',
  ];

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <div className={`w-full overflow-hidden relative ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Diagonal Mesh Gradient */}
      <div
        className={`absolute left-0 top-0 w-full h-full bg-gradient-to-br ${
          isDarkMode
            ? 'from-orange-500 via-transparent to-purple-500'
            : 'from-blue-200 via-transparent to-blue-500'
        } opacity-30 pointer-events-none`}
      />

      <div className="max-w-7xl mx-auto text-left py-20 px-4">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#897bc2] to-[#9F8CED] via-[#dc6700]">
          TechStacks
        </h2>

        {/* Continuous Marquee with Logos */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex logo-container"
            animate={{ x: '-100%' }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 20, // Adjust the duration as needed
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex items-center justify-center px-4 py-2 mx-2">
                <Image src={logo} alt={`Logo ${index + 1}`} width={80} height={80} className="max-w-full h-auto" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
