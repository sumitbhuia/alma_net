// 'use client';

// import Image from 'next/image';
// import "../app/globals.css";

// import { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';

// export default function Home() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDarkMode = theme === 'dark';

//   return (
//     <div className={`w-full h-[calc(100vh-4rem)] overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
//       {/* Custom Grid Background */}
//       <div className={`gridBackground pointer-events-none ${isDarkMode ? 'opacity-20' : 'opacity-30'}`} />

//       {/* Diagonal Mesh Gradient */}
//       <div className={`absolute left-0 top-0 w-full h-full bg-gradient-to-br 
//         ${isDarkMode ? 'from-orange-500 via-transparent to-purple-500' : 'from-blue-200 via-transparent to-blue-500'} 
//         opacity-30 pointer-events-none`} />

//       {/* Content */}
//       <div className="relative z-10 flex justify-center items-center w-full h-full">
//         <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-4">
//           <div className="w-full md:w-1/2 flex justify-center md:justify-start">
//             <div className="relative transform -translate-y-9"> {/* Moves the image upwards */}
//               <Image 
//                 src="/image/man.png" 
//                 alt="Man with scope" 
//                 width={650}   // Increased size
//                 height={650}  // Increased size
//               />
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
//             <h1 className={`text-6xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               <span>Connect</span>
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8CED] via-[#9F8CED] to-[#FA7C0B]">Alumni’s</span>
//               <br />
//               <span>like never</span>
//               <br />
//               <span>before</span>
//             </h1>

//             <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Here you can unlock your doubts with a bright path......
//             </p>
//             <div className="mt-8">
//               <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {/* Welcome! Here you will see personalized content based on your profile. */}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import Image from 'next/image';
import "../app/globals.css";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const fullText = "ike never before";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const handleTyping = () => {
        const i = loopNum % fullText.length;
        const updatedText = isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (!isDeleting && updatedText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
          setTypingSpeed(50);
        } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(150);
        }
      };

      const typingInterval = setTimeout(handleTyping, typingSpeed);

      return () => clearTimeout(typingInterval);
    }
  }, [text, isDeleting, loopNum, mounted]);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <div className={`w-full h-[calc(100vh-4rem)] overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Custom Grid Background */}
      <div className={`gridBackground pointer-events-none ${isDarkMode ? 'opacity-20' : 'opacity-30'}`} />

      {/* Diagonal Mesh Gradient */}
      <div className={`absolute left-0 top-0 w-full h-full bg-gradient-to-br 
        ${isDarkMode ? 'from-orange-500 via-transparent to-purple-500' : 'from-blue-200 via-transparent to-blue-500'} 
        opacity-30 pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-4">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative transform -translate-y-9"> {/* Moves the image upwards */}
              <Image 
                src="/image/man.png" 
                alt="Man with scope" 
                width={650}   // Increased size
                height={650}  // Increased size
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h1 className={`text-6xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span>Connect</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F8CED] via-[#9F8CED] to-[#FA7C0B]">Alumni</span>
              <br />
              <span>l</span>
              <span>{text}</span>
            </h1>

            <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Here you can unlock your career with a bright path......
            </p>
            <div className="mt-8">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
