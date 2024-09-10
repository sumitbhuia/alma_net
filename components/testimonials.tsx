'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Recent Graduate",
    image: "/image/testi1.png",
    quote: "Almanet helped me connect with amazing mentors who guided me through my job search. I landed my dream job thanks to their advice!"
  },
  {
    name: "Prof. Jimmy Lawrence",
    role: "Alumni Mentor",
    image: "/image/testi2.png",
    quote: "I've had the pleasure of mentoring students on Almanet. It's a great platform for sharing knowledge and helping the next generation of professionals."
  },
  {
    name: "Anita Patel",
    role: "Student",
    image: "/image/testi3.png",
    quote: "The webinars and discussion forums on Almanet have given me invaluable insights into various industries. It's like having a career compass!"
  }
]

export default function Testimonials() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const colors = isDark ? colorScheme.dark : colorScheme.light
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-12"
        >
          <span className={`bg-gradient-to-r ${colors.accent1} text-transparent bg-clip-text`}>
            What Our Community Says
          </span>
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`rounded-lg shadow-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className={`font-semibold text-lg ${colors.text}`}>
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <p className={`text-lg italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonials[currentIndex].quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full ${colors.button2}`}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full ${colors.button2}`}
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? `bg-gradient-to-r ${colors.accent1}`
                  : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
