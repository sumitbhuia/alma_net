'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const colorScheme = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    cardBg: 'bg-white',
    cardHover: 'hover:bg-gray-50',
    iconBg: 'bg-gray-100',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    cardBg: 'bg-gray-800',
    cardHover: 'hover:bg-gray-700',
    iconBg: 'bg-gray-700',
  },
}

const services = [
  { title: 'Discussion Forum', description: 'Dynamic forum for fostering meaningful connections and discussions between alumni and students.', icon: '/icons/discussion.svg' },
  { title: 'Career Guidance', description: 'Personalized advice and mentorship to guide students in making informed career decisions.', icon: '/icons/guidance.svg' },
  { title: 'Interactive Chatbot', description: 'AI-driven chatbot for seamless platform navigation and instant answers to user queries.', icon: '/icons/chatbot.svg' },
  { title: 'Live Webinar', description: 'Interactive live sessions connecting students with alumni for real-time learning and networking.', icon: '/icons/webinar.svg' },
  { title: 'Chat', description: 'Career guidance, mentorship and boosted career growth through 1:1 chat portal for students and alumni', icon: '/icons/chat.svg' },
  { title: 'Donation', description: 'Support your alma mater through a secure and easy-to-use donation platform.', icon: '/icons/donation.svg' },
  { title: 'Startup Funding', description: 'Empower student innovation with funding opportunities for promising startup ideas.', icon: '/icons/funding.svg' },
  { title: 'AI Recommendation', description: 'AI powered alumni recommendation based on working industry and skillsets.', icon: '/icons/ai.svg' },
  { title: 'OCR Verification', description: 'Optical character recognition for eliminating fraudlets during user onboarding process.', icon: '/icons/verification.svg' },
]

export default function LandingPage() {
  const { resolvedTheme } = useTheme()
  const [selectedService, setSelectedService] = useState<{ title: string; description: string; icon: string } | null>(null)

  const isDark = resolvedTheme === 'dark'
  const colors = isDark ? colorScheme.dark : colorScheme.light

  return (
    <section className={`w-full py-20 ${colors.background} ${colors.text} relative overflow-hidden`}>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Discover Our Amazing Features
            </span>
          </h2>
          <p className={`mt-4 text-xl ${colors.text}`}>
            Almanet is revolutionizing student-alumni connections with these exciting services!
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg transition-all cursor-pointer ${colors.cardBg} ${colors.cardHover}`}
              onClick={() => setSelectedService(service)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full ${colors.iconBg}`}>
                  <Image src={service.icon} alt={service.title} width={40} height={40} />
                </div>
                <h3 className="ml-4 text-xl font-semibold">{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Join the Almanet Community
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-lg p-6 max-w-md ${colors.cardBg} ${colors.text}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
              <p className={`mb-4 ${colors.text}`}>{selectedService.description}</p>
              <Button
                onClick={() => setSelectedService(null)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}