'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const colorScheme = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    cardBg: 'bg-white/50',
    cardText: 'text-gray-800',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    cardBg: 'bg-gray-800/50',
    cardText: 'text-gray-200',
  },
}

const visionPoints = [
  {
    text: "Bridging the gap between students and alumni",
    image: "/vision/mentor.png?height=200&width=200"
  },
  {
    text: "Fostering a culture of mentorship and knowledge sharing",
    image: "/vision/sharing.png?height=200&width=200"
  },
  {
    text: "Empowering students with real-world insights",
    image: "/vision/insight.png?height=200&width=200"
  },
  {
    text: "Creating a thriving, supportive community",
    image: "/vision/community.png?height=200&width=200"
  },
  {
    text: "Driving innovation through collaboration",
    image: "/vision/collab.png?height=200&width=200"
  },
  {
    text: "Creating a better future for students and alumni",
    image: "/vision/future.png?height=200&width=200"
  }
]

export default function Vision() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const colors = isDark ? colorScheme.dark : colorScheme.light

  return (
    <section className={`w-full py-20  ${colors.background} ${colors.text} relative overflow-hidden`}>
      <motion.div 
        className="absolute inset-0 opacity-30 "
        animate={{
          background: [
            `linear-gradient(45deg, ${isDark ? '#ff00ff' : '#00ffff'}, ${isDark ? '#00ffff' : '#ff00ff'})`,
            `linear-gradient(45deg, ${isDark ? '#ffff00' : '#ff00ff'}, ${isDark ? '#ff00ff' : '#ffff00'})`,
            `linear-gradient(45deg, ${isDark ? '#00ffff' : '#ffff00'}, ${isDark ? '#ffff00' : '#00ffff'})`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10 ">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Vision
        </motion.h2>
        <motion.p 
          className={`text-xl mb-12 text-center px-4 ${colors.text}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          At Almanet, we're committed to creating a vibrant ecosystem where students and alumni thrive together.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${colors.cardBg} backdrop-blur-sm shadow-lg flex flex-col items-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={point.image}
                alt={`Vision point ${index + 1}`}
                width={300}
                height={100}
                className="mb-4 rounded-lg"
              />
              <p className={`text-lg font-semibold text-center ${colors.cardText}`}>
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className={`font-bold px-10 mb-6 ${colors.text}`}>
            Join us in shaping the future of education and career development!
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}