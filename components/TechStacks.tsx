'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useInView } from 'react-intersection-observer'

const colorScheme = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    accent1: 'from-blue-500 to-purple-500',
    accent2: 'from-green-400 to-blue-500',
    button1: 'bg-primary text-primary-foreground hover:bg-primary/90',
    button2: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    accent1: 'from-purple-600 to-pink-500',
    accent2: 'from-orange-500 to-red-500',
    button1: 'bg-primary text-primary-foreground hover:bg-primary/90',
    button2: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  },
}

const logos = [
  { icon: '/logos/huggingface.svg', alt: 'Hugging Face' },
  { icon: '/logos/typescript.svg', alt: 'TypeScript' },
  { icon: '/logos/supabase.svg', alt: 'Supabase' },
  { icon: '/logos/resend.svg', alt: 'Resend' },
  { icon: '/logos/vercel.svg', alt: 'Vercel' },
  { icon: '/logos/postgresql.svg', alt: 'Postgresql' },
  { icon: '/logos/tailwind.svg', alt: 'Tailwind' },
  { icon: '/logos/redis.svg', alt: 'Redis' },
  { icon: '/logos/websocket.svg', alt: 'WebSocket' },
  { icon: '/logos/framer.svg', alt: 'Framer' },
  { icon: '/logos/react.svg', alt: 'React' },
  { icon: '/logos/react-router.svg', alt: 'React-router' },
  { icon: '/logos/git.svg', alt: 'Git' },
  { icon: '/logos/github.svg', alt: 'Github' },
]

export default function TechStacks() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    setMounted(true)
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const colors = isDark ? colorScheme.dark : colorScheme.light

  return (
    <section className={`w-full overflow-hidden relative py-20 ${colors.background} ${colors.text}`}>
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `linear-gradient(45deg, ${isDark ? '#ff00ff' : '#00ffff'}, ${isDark ? '#00ffff' : '#ff00ff'})`,
            `linear-gradient(45deg, ${isDark ? '#ffff00' : '#ff00ff'}, ${isDark ? '#ff00ff' : '#ffff00'})`,
            `linear-gradient(45deg, ${isDark ? '#00ffff' : '#ffff00'}, ${isDark ? '#ffff00' : '#00ffff'})`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className={`bg-gradient-to-r ${colors.accent1} text-transparent bg-clip-text`}>
            Our Awesome Tech Stack
          </span>
        </motion.h2>

        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.8 }
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-20 h-full bg-gradient-to-r from-${colors.background} to-transparent z-10`} />
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full bg-gradient-to-l from-${colors.background} to-transparent z-10`} />
          
          <motion.div
            className="flex space-x-12 py-8"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
                className="flex-shrink-0 cursor-pointer"
              >
                <Image
                  src={logo.icon}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="max-w-full h-auto"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-center mt-12 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          We use cutting-edge technologies to provide the best experience for our users.
          <br />
          <span className="font-bold">Click on a logo to learn more!</span>
        </motion.p>
      </div>
    </section>
  )
}